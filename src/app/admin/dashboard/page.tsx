'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'

type Registration = {
  id: string
  fullName: string
  email: string
  phone: string
  slot: string
  status: string
  comments?: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [slotFilter, setSlotFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    fetchRegistrations()
  }, [search, slotFilter, statusFilter])

  const fetchRegistrations = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (slotFilter) params.append('slot', slotFilter)
      if (statusFilter) params.append('status', statusFilter)

      const res = await fetch(`/api/admin/registrations?${params}`)

      if (res.status === 401) {
        router.push('/admin/login')
        return
      }

      const data = await res.json()
      setRegistrations(data.registrations || [])
      setCounts(data.counts || {})
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return

    try {
      const res = await fetch(`/api/admin/registration/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setRegistrations(registrations.filter(r => r.id !== id))
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const squadDates: Record<string, string> = {
    squad1: 'Aug 8-9',
    squad2: 'Aug 10-11',
    squad3: 'Aug 17-18',
    squad4: 'Aug 19-20',
  }

  const statusColor: Record<string, string> = {
    pending: '#C8960C',
    approved: '#22c55e',
    rejected: '#dc2626',
    waitlisted: '#f59e0b',
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <div
        className="sticky top-0 z-40 border-b border-[#1e1e1e] bg-black/95 backdrop-blur"
        style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AnchorsArmyLogo className="w-20" />
            <div>
              <h1 className="font-display font-semibold text-text-primary text-lg">
                Registration Manager
              </h1>
              <p className="micro-label text-text-secondary">
                {registrations.length} registrations
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-text-secondary hover:text-gold-primary transition-colors text-sm"
          >
            Logout →
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3 bg-[#060606] text-text-primary border border-[#1e1e1e] font-sans text-sm outline-none focus:border-gold-primary placeholder:text-[#444]"
            />

            {/* Slot Filter */}
            <select
              value={slotFilter}
              onChange={(e) => setSlotFilter(e.target.value)}
              className="px-4 py-3 bg-[#060606] text-text-primary border border-[#1e1e1e] font-sans text-sm outline-none focus:border-gold-primary"
            >
              <option value="">All Squads</option>
              <option value="squad1">Squad 1 (Aug 8-9)</option>
              <option value="squad2">Squad 2 (Aug 10-11)</option>
              <option value="squad3">Squad 3 (Aug 17-18)</option>
              <option value="squad4">Squad 4 (Aug 19-20)</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-[#060606] text-text-primary border border-[#1e1e1e] font-sans text-sm outline-none focus:border-gold-primary"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="waitlisted">Waitlisted</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {['squad1', 'squad2', 'squad3', 'squad4'].map(squad => (
            <div
              key={squad}
              className="p-4 bg-[#0a0a0a] border border-[#1e1e1e]"
            >
              <p className="micro-label text-text-secondary mb-2">
                {squad.charAt(0).toUpperCase() + squad.slice(1)}
              </p>
              <p className="font-display text-xl font-semibold text-gold-primary">
                {counts[squad] || 0}
              </p>
            </div>
          ))}
        </div>

        <GoldDivider className="w-16 mb-8" />

        {/* Registrations Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">Loading registrations...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">No registrations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-[#1e1e1e]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e1e1e] bg-[#0a0a0a]">
                  <th className="px-6 py-4 text-left micro-label text-text-secondary">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left micro-label text-text-secondary">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left micro-label text-text-secondary">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left micro-label text-text-secondary">
                    Squad
                  </th>
                  <th className="px-6 py-4 text-left micro-label text-text-secondary">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left micro-label text-text-secondary">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right micro-label text-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="border-b border-[#1e1e1e] hover:bg-[#0a0a0a] transition-colors"
                  >
                    <td className="px-6 py-4 font-sans text-sm text-text-primary">
                      {reg.fullName}
                    </td>
                    <td className="px-6 py-4 font-sans text-sm text-text-secondary">
                      {reg.email}
                    </td>
                    <td className="px-6 py-4 font-sans text-sm text-text-secondary">
                      {reg.phone}
                    </td>
                    <td className="px-6 py-4 font-sans text-sm text-text-primary">
                      {squadDates[reg.slot] || reg.slot}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded text-xs font-semibold"
                        style={{
                          color: statusColor[reg.status] || '#888',
                          border: `1px solid ${statusColor[reg.status] || '#444'}`,
                          background: `${statusColor[reg.status]}20` || 'transparent',
                        }}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-sans text-xs text-text-secondary">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link href={`/admin/registration/${reg.id}`}>
                          <button className="px-3 py-1.5 text-xs font-semibold text-gold-primary border border-gold-muted hover:bg-[rgba(200,150,12,0.06)] transition-colors">
                            View
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(reg.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-red-400 border border-red-400 hover:bg-[rgba(220,38,38,0.06)] transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

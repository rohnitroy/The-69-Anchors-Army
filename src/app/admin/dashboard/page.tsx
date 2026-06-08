'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import GoldDivider from '@/components/ui/GoldDivider'
import CustomSelect from '@/components/ui/CustomSelect'

type Registration = {
  id: string
  fullName: string
  email: string
  phone: string
  gender?: string
  paymentMode?: string
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
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkStatus, setBulkStatus] = useState('')
  const [bulkSlot, setBulkSlot] = useState('')
  const [bulkLoading, setBulkLoading] = useState(false)

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

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selected)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelected(newSelected)
  }

  const toggleSelectAll = () => {
    if (selected.size === registrations.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(registrations.map(r => r.id)))
    }
  }

  const handleBulkStatusUpdate = async () => {
    if (selected.size === 0 || !bulkStatus) return
    if (!confirm(`Update ${selected.size} registration(s) to ${bulkStatus}?`)) return

    setBulkLoading(true)
    try {
      await Promise.all(
        Array.from(selected).map(id =>
          fetch(`/api/admin/registration/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: bulkStatus }),
          })
        )
      )
      setSelected(new Set())
      setBulkStatus('')
      fetchRegistrations()
    } catch (error) {
      console.error('Bulk update error:', error)
    } finally {
      setBulkLoading(false)
    }
  }

  const handleBulkSlotMove = async () => {
    if (selected.size === 0 || !bulkSlot) return
    if (!confirm(`Move ${selected.size} registration(s) to ${bulkSlot}?`)) return

    setBulkLoading(true)
    try {
      await Promise.all(
        Array.from(selected).map(id =>
          fetch(`/api/admin/registration/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slot: bulkSlot }),
          })
        )
      )
      setSelected(new Set())
      setBulkSlot('')
      fetchRegistrations()
    } catch (error) {
      console.error('Bulk move error:', error)
    } finally {
      setBulkLoading(false)
    }
  }

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Gender', 'Payment Mode', 'Squad', 'Status', 'Comments', 'Date Registered']
    const rows = registrations.map(r => [
      r.fullName,
      r.email,
      r.phone,
      r.gender || '—',
      r.paymentMode || '—',
      r.slot.toUpperCase(),
      r.status,
      r.comments || '',
      new Date(r.createdAt).toLocaleString(),
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return

    try {
      const res = await fetch(`/api/admin/registration/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setRegistrations(registrations.filter(r => r.id !== id))
        const newSelected = new Set(selected)
        newSelected.delete(id)
        setSelected(newSelected)
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const squadDates: Record<string, string> = {
    squadA: 'Aug 8-9',
    squadB: 'Aug 10-11',
    squadC: 'Aug 17-18',
    squadD: 'Aug 19-20',
    squadE: 'Any',
  }

  const statusColor: Record<string, string> = {
    pending: '#C8960C',
    approved: '#22c55e',
    rejected: '#dc2626',
    waitlisted: '#f59e0b',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <AnchorsArmyLogo className="w-16 sm:w-20 flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="font-display font-semibold text-gray-900 text-sm sm:text-lg line-clamp-1">
                Registration Manager
              </h1>
              <p className="font-sans text-gray-600 text-xs sm:text-sm">
                {registrations.length} registrations
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-600 hover:text-[#C8960C] transition-colors text-xs sm:text-sm font-semibold whitespace-nowrap"
          >
            Logout →
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Filters */}
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white text-gray-900 border border-gray-300 font-sans text-xs sm:text-sm outline-none focus:border-[#C8960C] focus:ring-2 focus:ring-[#C8960C]/20 placeholder:text-gray-400 rounded"
            />

            {/* Slot Filter */}
            <CustomSelect
              value={slotFilter}
              onChange={setSlotFilter}
              placeholder="All Squads"
              options={[
                { value: '', label: 'All Squads' },
                { value: 'squadA', label: 'Squad A (Aug 8-9)' },
                { value: 'squadB', label: 'Squad B (Aug 10-11)' },
                { value: 'squadC', label: 'Squad C (Aug 17-18)' },
                { value: 'squadD', label: 'Squad D (Aug 19-20)' },
                { value: 'squadE', label: 'Any of the Above' },
              ]}
            />

            {/* Status Filter */}
            <CustomSelect
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="All Statuses"
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'pending', label: 'Pending' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' },
                { value: 'waitlisted', label: 'Waitlisted' },
              ]}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 sm:mb-8 grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {['squadA', 'squadB', 'squadC', 'squadD', 'squadE'].map(squad => {
            const labels = { squadA: 'Squad A', squadB: 'Squad B', squadC: 'Squad C', squadD: 'Squad D', squadE: 'Any' }
            return (
              <div key={squad} className="p-3 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <p className="font-sans text-xs font-semibold text-gray-600 uppercase tracking-tight mb-2">
                  {labels[squad as keyof typeof labels]}
                </p>
                <p className="font-display text-lg sm:text-2xl font-semibold text-[#C8960C]">
                  {counts[squad] || 0} / 25
                </p>
              </div>
            )
          })}
        </div>

        <GoldDivider className="w-16 mb-8" />

        {/* Bulk Actions */}
        {selected.size > 0 && (
          <div className="mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-sans text-xs sm:text-sm font-semibold text-gray-900">
                {selected.size} selected
              </span>
              <div className="flex flex-col sm:flex-row gap-2 flex-1">
                <CustomSelect
                  value={bulkStatus}
                  onChange={setBulkStatus}
                  placeholder="Change status to..."
                  options={[
                    { value: '', label: 'Change status to...' },
                    { value: 'approved', label: 'Approved' },
                    { value: 'rejected', label: 'Rejected' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'waitlisted', label: 'Waitlisted' },
                  ]}
                />
                <button
                  onClick={handleBulkStatusUpdate}
                  disabled={!bulkStatus || bulkLoading}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#C8960C] text-black font-semibold text-xs sm:text-sm rounded hover:bg-[#B08608] transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {bulkLoading ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 border-t border-blue-200">
              <span className="font-sans text-xs sm:text-sm font-semibold text-gray-900">
                Or move to squad:
              </span>
              <div className="flex flex-col sm:flex-row gap-2 flex-1">
                <CustomSelect
                  value={bulkSlot}
                  onChange={setBulkSlot}
                  placeholder="Move to squad..."
                  options={[
                    { value: '', label: 'Move to squad...' },
                    { value: 'squadA', label: 'Squad A' },
                    { value: 'squadB', label: 'Squad B' },
                    { value: 'squadC', label: 'Squad C' },
                    { value: 'squadD', label: 'Squad D' },
                    { value: 'squadE', label: 'Any of the Above' },
                  ]}
                />
                <button
                  onClick={handleBulkSlotMove}
                  disabled={!bulkSlot || bulkLoading}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white font-semibold text-xs sm:text-sm rounded hover:bg-green-700 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {bulkLoading ? 'Moving...' : 'Move'}
                </button>
              </div>
            </div>
            <button
              onClick={() => { setSelected(new Set()); setBulkStatus(''); setBulkSlot('') }}
              className="px-3 py-1.5 sm:py-2 text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-semibold"
            >
              Clear Selection
            </button>
          </div>
        )}

        {/* Export & Actions Bar */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={handleExportCSV}
            disabled={registrations.length === 0}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#C8960C] text-black font-semibold text-xs sm:text-sm rounded hover:bg-[#B08608] transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            📥 Export CSV
          </button>
        </div>

        {/* Registrations Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading registrations...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No registrations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selected.size === registrations.length && registrations.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-[#C8960C] focus:ring-2 focus:ring-[#C8960C]/20"
                    />
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Name
                  </th>
                  <th className="hidden sm:table-cell px-6 py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Email
                  </th>
                  <th className="hidden lg:table-cell px-6 py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Phone
                  </th>
                  <th className="hidden md:table-cell px-6 py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Gender
                  </th>
                  <th className="hidden md:table-cell px-6 py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Payment
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Squad
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="hidden sm:table-cell px-6 py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-right font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <input
                        type="checkbox"
                        checked={selected.has(reg.id)}
                        onChange={() => toggleSelect(reg.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#C8960C] focus:ring-2 focus:ring-[#C8960C]/20"
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-sans text-xs sm:text-sm text-gray-900 font-medium">
                      {reg.fullName}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 font-sans text-sm text-gray-600">
                      {reg.email}
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 font-sans text-sm text-gray-600">
                      {reg.phone}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 font-sans text-xs text-gray-600 capitalize">
                      {reg.gender || '—'}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 font-sans text-xs text-gray-600 uppercase">
                      {reg.paymentMode || '—'}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-sans text-xs sm:text-sm text-gray-900">
                      {squadDates[reg.slot] || reg.slot}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span
                        className="px-2 sm:px-3 py-1 rounded text-xs font-semibold"
                        style={{
                          color: statusColor[reg.status] || '#666',
                          border: `1px solid ${statusColor[reg.status] || '#ddd'}`,
                          background: `${statusColor[reg.status]}15` || '#f5f5f5',
                        }}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 font-sans text-xs text-gray-600">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex gap-1 sm:gap-2 justify-end">
                        <Link href={`/admin/registration/${reg.id}`}>
                          <button className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold text-[#C8960C] border border-[#C8960C] hover:bg-[#C8960C]/10 transition-colors rounded">
                            View
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(reg.id)}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold text-red-600 border border-red-300 hover:bg-red-50 transition-colors rounded"
                        >
                          Del
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

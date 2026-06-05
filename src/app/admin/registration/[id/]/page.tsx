'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import GoldDivider from '@/components/ui/GoldDivider'

type Registration = {
  id: string
  fullName: string
  email: string
  phone: string
  slot: string
  comments?: string
  status: string
  adminNotes?: string
  createdAt: string
  updatedAt: string
}

export default function RegistrationDetail() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [registration, setRegistration] = useState<Registration | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [status, setStatus] = useState('')
  const [adminNotes, setAdminNotes] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchRegistration()
  }, [id])

  const fetchRegistration = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/registration/${id}`)

      if (res.status === 401) {
        router.push('/admin/login')
        return
      }

      if (!res.ok) {
        router.push('/admin/dashboard')
        return
      }

      const data = await res.json()
      setRegistration(data)
      setStatus(data.status)
      setAdminNotes(data.adminNotes || '')
    } catch (error) {
      console.error('Fetch error:', error)
      router.push('/admin/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const res = await fetch(`/api/admin/registration/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes }),
      })

      if (res.ok) {
        const updated = await res.json()
        setRegistration(updated)
        setEditing(false)
      }
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setSaving(false)
    }
  }

  const squadDates: Record<string, string> = {
    squad1: 'Aug 8th & 9th (Checkout Aug 10th)',
    squad2: 'Aug 10th & 11th (Checkout Aug 12th)',
    squad3: 'Aug 17th & 18th (Checkout Aug 19th)',
    squad4: 'Aug 19th & 20th (Checkout Aug 21st)',
  }

  const statusColors: Record<string, string> = {
    pending: '#C8960C',
    approved: '#22c55e',
    rejected: '#dc2626',
    waitlisted: '#f59e0b',
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-text-secondary">Loading registration...</p>
      </div>
    )
  }

  if (!registration) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-text-secondary">Registration not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3 hover:text-[#C8960C] text-gray-900">
            <AnchorsArmyLogo className="w-16" />
            <span className="text-sm font-semibold">← Back to Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1
            className="font-display font-semibold text-gray-900 leading-tight mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
          >
            {registration.fullName}
          </h1>
          <GoldDivider className="w-16" />
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <p className="font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Email</p>
              <p className="font-sans text-gray-900">{registration.email}</p>
            </div>

            <div>
              <p className="font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Phone</p>
              <p className="font-sans text-gray-900">{registration.phone}</p>
            </div>

            <div>
              <p className="font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Squad Selection</p>
              <p className="font-sans text-gray-900 font-semibold">
                {registration.slot.toUpperCase()}
              </p>
              <p className="font-sans text-gray-600 text-sm mt-1">
                {squadDates[registration.slot]}
              </p>
            </div>

            <div>
              <p className="font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Comments</p>
              <p className="font-sans text-gray-600 leading-relaxed">
                {registration.comments || '—'}
              </p>
            </div>

            <div>
              <p className="font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Registered</p>
              <p className="font-sans text-gray-600 text-sm">
                {new Date(registration.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Right Column — Status & Notes */}
          <div className="space-y-6 p-6 border border-gray-200 bg-white rounded-lg shadow-sm">
            {/* Current Status */}
            <div>
              <p className="font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Current Status</p>
              <span
                className="px-4 py-2 rounded text-sm font-semibold"
                style={{
                  color: statusColors[registration.status],
                  border: `1px solid ${statusColors[registration.status]}`,
                  background: `${statusColors[registration.status]}15`,
                }}
              >
                {registration.status.toUpperCase()}
              </span>
            </div>

            <GoldDivider className="w-12" />

            {/* Edit Form */}
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="w-full px-4 py-2.5 border border-[#C8960C] text-[#C8960C] hover:bg-[#C8960C]/10 transition-colors text-sm font-semibold rounded"
              >
                Edit Status & Notes
              </button>
            ) : (
              <div className="space-y-4">
                {/* Status Dropdown */}
                <div>
                  <label className="font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 block">
                    Change Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 font-sans text-sm outline-none focus:border-[#C8960C] focus:ring-2 focus:ring-[#C8960C]/20 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="waitlisted">Waitlisted</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 block">
                    Admin Notes — Why was this registration rejected/approved?
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add internal notes to track decisions..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 font-sans text-sm outline-none focus:border-[#C8960C] focus:ring-2 focus:ring-[#C8960C]/20 placeholder:text-gray-400 rounded resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 px-4 py-2.5 bg-[#C8960C] text-black font-semibold text-sm hover:bg-[#B08608] transition-colors disabled:opacity-50 rounded"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false)
                      setStatus(registration.status)
                      setAdminNotes(registration.adminNotes || '')
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 hover:border-gray-400 transition-colors text-sm rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Display Notes if exists */}
            {!editing && registration.adminNotes && (
              <div className="pt-4 border-t border-gray-200">
                <p className="font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Notes</p>
                <p className="font-sans text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded">
                  {registration.adminNotes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <Link href="/admin/dashboard">
          <button className="px-6 py-3 border border-[#C8960C] text-[#C8960C] hover:bg-[#C8960C]/10 transition-colors font-semibold rounded">
            ← Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  )
}

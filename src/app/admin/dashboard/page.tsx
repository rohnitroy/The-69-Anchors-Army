'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import NotificationCenter from '@/components/admin/NotificationCenter'
import RegistrationDetailModal from '@/components/admin/RegistrationDetailModal'
import CustomSelect from '@/components/ui/CustomSelect'
import { useToast } from '@/components/ui/Toast'
import { wsClient } from '@/lib/wsClient'

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

const SQUAD_NAMES: Record<string, string> = {
  squadA: 'Squad A',
  squadB: 'Squad B',
  squadC: 'Squad C',
  squadD: 'Squad D',
  squadE: 'Any of Above',
}

const SQUAD_LIMITS: Record<string, number> = {
  squadA: 22,
  squadB: 24,
  squadC: 24,
  squadD: 24,
  squadE: Infinity,
}

export default function AdminDashboard() {
  const router = useRouter()
  const { toast, confirm } = useToast()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [slotFilter, setSlotFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkStatus, setBulkStatus] = useState('')
  const [bulkSlot, setBulkSlot] = useState('')
  const [detailId, setDetailId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    wsClient.connect()
    wsClient.on('activity', () => {
      fetchRegistrations()
    })
    return () => wsClient.disconnect()
  }, [])

  useEffect(() => {
    fetchRegistrations()
  }, [search, slotFilter, statusFilter])

  const fetchRegistrations = async () => {
    try {
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
      toast('error', 'Error', 'Failed to fetch registrations')
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

  const handleBulkStatusUpdate = () => {
    if (selected.size === 0 || !bulkStatus) return

    const selectedNames = registrations
      .filter(r => selected.has(r.id))
      .map(r => r.fullName)
      .join(', ')

    const count = selected.size

    confirm(
      `Update Status for ${count} Registration${count !== 1 ? 's' : ''}`,
      `${selectedNames}\n\nUpdate to: ${bulkStatus}`,
      async () => {
        try {
          const results = await Promise.all(
            Array.from(selected).map(id =>
              fetch(`/api/admin/registration/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: bulkStatus }),
              })
            )
          )

          const allSuccess = results.every(res => res.ok)

          if (allSuccess) {
            // Update local state
            setRegistrations(regs =>
              regs.map(reg =>
                selected.has(reg.id) ? { ...reg, status: bulkStatus } : reg
              )
            )
            setSelected(new Set())
            setBulkStatus('')
            toast('success', 'Updated', `${count} registration${count !== 1 ? 's' : ''} updated to ${bulkStatus}`)
          } else {
            throw new Error('Some updates failed')
          }
        } catch (error) {
          console.error('Error:', error)
          toast('error', 'Error', 'Failed to update registrations')
        }
      }
    )
  }

  const handleBulkSlotMove = () => {
    if (selected.size === 0 || !bulkSlot) return

    const selectedNames = registrations
      .filter(r => selected.has(r.id))
      .map(r => r.fullName)
      .join(', ')

    const count = selected.size
    const targetSquad = SQUAD_NAMES[bulkSlot]

    confirm(
      `Move ${count} Registration${count !== 1 ? 's' : ''} to ${targetSquad}`,
      `${selectedNames}`,
      async () => {
        try {
          const results = await Promise.all(
            Array.from(selected).map(id =>
              fetch(`/api/admin/registration/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slot: bulkSlot }),
              })
            )
          )

          const allSuccess = results.every(res => res.ok)

          if (allSuccess) {
            // Update local state
            setRegistrations(regs =>
              regs.map(reg =>
                selected.has(reg.id) ? { ...reg, slot: bulkSlot } : reg
              )
            )
            // Update counts
            setCounts(c => ({
              ...c,
              [bulkSlot]: (c[bulkSlot] || 0) + count,
            }))
            setSelected(new Set())
            setBulkSlot('')
            toast('success', 'Moved', `${count} registration${count !== 1 ? 's' : ''} moved to ${targetSquad}`)
          } else {
            throw new Error('Some moves failed')
          }
        } catch (error) {
          console.error('Error:', error)
          toast('error', 'Error', 'Failed to move registrations')
        }
      }
    )
  }

  const handleDelete = (id: string) => {
    const reg = registrations.find(r => r.id === id)
    if (!reg) return

    confirm(
      `Delete Registration: ${reg.fullName}?`,
      `Email: ${reg.email}\nPhone: ${reg.phone}\n\nThis action cannot be undone.`,
      async () => {
        try {
          const res = await fetch(`/api/admin/registration/${id}`, {
            method: 'DELETE',
          })

          if (res.ok) {
            setRegistrations(registrations.filter(r => r.id !== id))
            const newSelected = new Set(selected)
            newSelected.delete(id)
            setSelected(newSelected)
            toast('success', 'Deleted', `${reg.fullName} has been deleted`)
          } else {
            toast('error', 'Error', 'Failed to delete registration')
          }
        } catch (error) {
          console.error('Delete error:', error)
          toast('error', 'Error', 'Failed to delete registration')
        }
      }
    )
  }

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Gender', 'Payment Mode', 'Squad', 'Status', 'Date']
    const rows = registrations.map(r => [
      r.fullName,
      r.email,
      r.phone,
      r.gender || '—',
      r.paymentMode || '—',
      SQUAD_NAMES[r.slot] || r.slot,
      r.status,
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
    toast('success', 'Exported', 'CSV file downloaded successfully')
  }

  const handleExportPDF = () => {
    try {
      const currentDate = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })

      const squadCounts = ['squadA', 'squadB', 'squadC', 'squadD', 'squadE'].map(
        squad => `${SQUAD_NAMES[squad]}: ${counts[squad] || 0}`
      )

      const statusCounts = {
        approved: registrations.filter(r => r.status === 'approved').length,
        pending: registrations.filter(r => r.status === 'pending').length,
        rejected: registrations.filter(r => r.status === 'rejected').length,
      }

      const doc = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>69 Anchors Army - Registration Report</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #1a1a1a;
                background: white;
                padding: 40px;
                line-height: 1.6;
              }

              .header {
                text-align: center;
                margin-bottom: 40px;
                border-bottom: 3px solid #C8960C;
                padding-bottom: 20px;
              }

              .logo {
                font-size: 28px;
                font-weight: bold;
                color: #C8960C;
                margin-bottom: 10px;
              }

              .subtitle {
                color: #666;
                font-size: 14px;
                margin-bottom: 5px;
              }

              .report-title {
                font-size: 20px;
                font-weight: 600;
                color: #333;
                margin-top: 15px;
              }

              .report-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                font-size: 12px;
                color: #666;
              }

              .summary {
                background: #f8f8f8;
                padding: 20px;
                margin-bottom: 30px;
                border-left: 4px solid #C8960C;
                border-radius: 4px;
              }

              .summary-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-top: 15px;
              }

              .summary-item {
                font-size: 12px;
              }

              .summary-item strong {
                display: block;
                color: #333;
                margin-bottom: 5px;
              }

              .summary-item span {
                color: #666;
              }

              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
                font-size: 11px;
              }

              thead {
                background-color: #f0f0f0;
                color: #1a1a1a;
              }

              th {
                padding: 12px;
                text-align: left;
                font-weight: 600;
                border: 1px solid #ddd;
                color: #1a1a1a;
              }

              td {
                padding: 10px 12px;
                border: 1px solid #ddd;
              }

              tbody tr:nth-child(even) {
                background-color: #f9f9f9;
              }

              tbody tr:hover {
                background-color: #f0f0f0;
              }

              .status-approved {
                color: #10b981;
                font-weight: 600;
              }

              .status-pending {
                color: #f59e0b;
                font-weight: 600;
              }

              .status-rejected {
                color: #ef4444;
                font-weight: 600;
              }

              .footer {
                border-top: 2px solid #C8960C;
                padding-top: 20px;
                margin-top: 40px;
                text-align: center;
                font-size: 11px;
                color: #666;
              }

              .footer-content {
                margin-bottom: 10px;
              }

              .copyright {
                color: #999;
                font-size: 10px;
                margin-top: 15px;
              }

              .divider {
                text-align: center;
                color: #ddd;
                margin: 10px 0;
                font-weight: bold;
              }

              .page-number {
                text-align: right;
                color: #999;
                font-size: 10px;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <!-- Header with Logo -->
            <div class="header">
              <div class="logo">69 ANCHORS ARMY</div>
              <div class="subtitle">Powered by Bol BB Bol</div>
              <div class="report-title">Registration Report</div>
            </div>

            <!-- Report Info -->
            <div class="report-info">
              <div>
                <strong>Generated:</strong> ${currentDate}
              </div>
              <div>
                <strong>Report ID:</strong> REG-${new Date().getTime()}
              </div>
            </div>

            <!-- Summary Section -->
            <div class="summary">
              <strong>Summary</strong>
              <div class="summary-grid">
                <div class="summary-item">
                  <strong>Total Registrations</strong>
                  <span>${registrations.length}</span>
                </div>
                <div class="summary-item">
                  <strong>Squad Distribution</strong>
                  <span>${squadCounts.join(' • ')}</span>
                </div>
                <div class="summary-item">
                  <strong>Status: Approved</strong>
                  <span>${statusCounts.approved}</span>
                </div>
                <div class="summary-item">
                  <strong>Status: Pending</strong>
                  <span>${statusCounts.pending}</span>
                </div>
              </div>
            </div>

            <div class="divider">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

            <!-- Data Table -->
            <table>
              <thead>
                <tr>
                  <th style="width: 15%">Name</th>
                  <th style="width: 18%">Email</th>
                  <th style="width: 12%">Phone</th>
                  <th style="width: 8%">Gender</th>
                  <th style="width: 10%">Payment</th>
                  <th style="width: 12%">Squad</th>
                  <th style="width: 12%">Status</th>
                  <th style="width: 13%">Date</th>
                </tr>
              </thead>
              <tbody>
                ${registrations
                  .map(
                    r => `
                  <tr>
                    <td><strong>${r.fullName}</strong></td>
                    <td>${r.email}</td>
                    <td>${r.phone}</td>
                    <td>${r.gender ? r.gender.charAt(0).toUpperCase() + r.gender.slice(1) : '—'}</td>
                    <td>${r.paymentMode?.toUpperCase() || '—'}</td>
                    <td>${SQUAD_NAMES[r.slot] || r.slot}</td>
                    <td class="status-${r.status}">${r.status.toUpperCase()}</td>
                    <td>${new Date(r.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>

            <div class="divider">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

            <!-- Footer -->
            <div class="footer">
              <div class="footer-content">
                <strong>69 Anchors Army - Registration Management System</strong>
              </div>
              <div class="footer-content">
                This report contains confidential information about registered participants.
              </div>
              <div class="copyright">
                © 2026 69 Anchors Army. All rights reserved. | Powered by Bol BB Bol
              </div>
              <div class="page-number">
                Printed on ${new Date().toLocaleDateString()}
              </div>
            </div>
          </body>
        </html>
      `

      const printWindow = window.open('', '', 'height=800,width=1000')
      if (printWindow) {
        printWindow.document.open()
        printWindow.document.write(doc)
        printWindow.document.close()
        setTimeout(() => printWindow.print(), 250)
        toast('success', 'Exported', 'PDF ready to print/save')
      }
    } catch (error) {
      console.error('PDF export error:', error)
      toast('error', 'Error', 'Failed to export PDF')
    }
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="sticky top-0 z-40 border-b border-[#333] bg-[#1a1a1a] shadow-lg">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logos/bolbbbol-logo.png"
                alt="69 Anchors Army"
                width={50}
                height={50}
                className="w-10 h-auto flex-shrink-0 object-contain"
                priority
              />
              <div>
                <h1 className="font-semibold text-white text-sm">Registration Manager</h1>
                <p className="text-xs text-gray-400">{registrations.length} registrations</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1.5 border border-[#333] rounded-lg bg-[#0a0a0a]">
                <NotificationCenter />
              </div>
              <div className="px-3 py-1.5 border border-[#333] rounded-lg bg-[#0a0a0a]">
                <button
                  onClick={handleLogout}
                  className="text-xs font-semibold text-gray-400 hover:text-[#C8960C] transition-colors whitespace-nowrap"
                >
                  Logout →
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 py-2 border-t border-[#333] flex gap-1 items-center justify-end">
            <button
              onClick={handleExportCSV}
              disabled={registrations.length === 0}
              className="text-xs px-2 py-1.5 bg-[#C8960C] text-black font-semibold rounded hover:bg-[#B08608] transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              CSV
            </button>
            <button
              onClick={handleExportPDF}
              disabled={registrations.length === 0}
              className="text-xs px-2 py-1.5 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              PDF
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3 border-b border-[#333]">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-[#1a1a1a] text-white border border-[#333] rounded text-xs focus:border-[#C8960C] outline-none"
          />
          <CustomSelect
            value={slotFilter}
            onChange={setSlotFilter}
            options={[
              { value: '', label: 'All Squads' },
              { value: 'squadA', label: 'Squad A' },
              { value: 'squadB', label: 'Squad B' },
              { value: 'squadC', label: 'Squad C' },
              { value: 'squadD', label: 'Squad D' },
              { value: 'squadE', label: 'Any of Above' },
            ]}
          />
        </div>

        <div className="p-4 grid grid-cols-2 gap-2">
          {['squadA', 'squadB', 'squadC', 'squadD', 'squadE'].map(squad => (
            <motion.button
              key={squad}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSlotFilter(slotFilter === squad ? '' : squad)}
              className={`p-3 rounded border transition-all ${
                slotFilter === squad
                  ? 'border-[#C8960C] bg-[rgba(200,150,12,0.1)]'
                  : 'border-[#333] hover:border-[#444]'
              }`}
            >
              <div className="text-xs font-semibold text-white">{SQUAD_NAMES[squad]}</div>
              <div className="text-lg font-bold text-[#C8960C]">
                {counts[squad] || 0}/{SQUAD_LIMITS[squad] === Infinity ? '∞' : SQUAD_LIMITS[squad]}
              </div>
            </motion.button>
          ))}
        </div>

        {selected.size > 0 && (
          <div className="p-4 bg-[#222] border border-[#333] rounded-lg space-y-3 mx-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white text-sm">{selected.size} selected</span>
              <button
                onClick={() => { setSelected(new Set()); setBulkStatus(''); setBulkSlot('') }}
                className="text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
                <CustomSelect
                  value={bulkStatus}
                  onChange={setBulkStatus}
                  options={[
                    { value: '', label: 'Update status...' },
                    { value: 'approved', label: 'Approved' },
                    { value: 'rejected', label: 'Rejected' },
                    { value: 'pending', label: 'Pending' },
                  ]}
                />
                <button
                  onClick={handleBulkStatusUpdate}
                  disabled={!bulkStatus}
                  className="px-3 py-2 bg-[#C8960C] text-black font-semibold text-sm rounded hover:bg-[#B08608] transition-colors disabled:opacity-50 w-full"
                >
                  ✓ Update Status
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <CustomSelect
                  value={bulkSlot}
                  onChange={setBulkSlot}
                  options={[
                    { value: '', label: 'Move to squad...' },
                    { value: 'squadA', label: 'Squad A' },
                    { value: 'squadB', label: 'Squad B' },
                    { value: 'squadC', label: 'Squad C' },
                    { value: 'squadD', label: 'Squad D' },
                    { value: 'squadE', label: 'Any of Above' },
                  ]}
                />
                <button
                  onClick={handleBulkSlotMove}
                  disabled={!bulkSlot}
                  className="px-3 py-2 bg-green-600 text-white font-semibold text-sm rounded hover:bg-green-700 transition-colors disabled:opacity-50 w-full"
                >
                  Move Squad
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 space-y-3">
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading...</div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No registrations</div>
          ) : (
            registrations.map((reg) => (
              <motion.div
                key={reg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-[#1a1a1a] border border-[#333] rounded-lg space-y-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">{reg.fullName}</p>
                    <p className="text-xs text-gray-400">{reg.email}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={selected.has(reg.id)}
                      onChange={() => toggleSelect(reg.id)}
                      className="w-4 h-4 accent-[#C8960C] cursor-pointer"
                    />
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded shrink-0"
                      style={{
                        color:
                          reg.status === 'approved'
                            ? '#10b981'
                            : reg.status === 'pending'
                            ? '#f59e0b'
                            : reg.status === 'rejected'
                            ? '#ef4444'
                            : '#6b7280',
                        border:
                          reg.status === 'approved'
                            ? '1px solid #10b981'
                            : reg.status === 'pending'
                            ? '1px solid #f59e0b'
                            : reg.status === 'rejected'
                            ? '1px solid #ef4444'
                            : '1px solid #6b7280',
                        backgroundColor:
                          reg.status === 'approved'
                            ? 'rgba(16,185,129,0.1)'
                            : reg.status === 'pending'
                            ? 'rgba(245,158,11,0.1)'
                            : reg.status === 'rejected'
                            ? 'rgba(239,68,68,0.1)'
                            : 'rgba(107,114,128,0.1)',
                        textTransform: 'capitalize',
                      }}
                    >
                      {reg.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                  <div>
                    <span className="text-gray-500">Squad:</span> {SQUAD_NAMES[reg.slot]}
                  </div>
                  <div>
                    <span className="text-gray-500">Gender:</span> {reg.gender || '—'}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setDetailId(reg.id)}
                    className="flex-1 px-2 py-1.5 text-xs font-semibold text-[#C8960C] border border-[#C8960C] rounded hover:bg-[rgba(200,150,12,0.1)] transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(reg.id)}
                    className="flex-1 px-2 py-1.5 text-xs font-semibold text-red-400 border border-red-900 rounded hover:bg-red-950 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <RegistrationDetailModal
          registrationId={detailId || ''}
          isOpen={!!detailId}
          onClose={() => setDetailId(null)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="sticky top-0 z-40 border-b border-[#333] bg-[#1a1a1a] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logos/bolbbbol-logo.png"
              alt="69 Anchors Army"
              width={100}
              height={100}
              className="w-16 sm:w-20 h-auto object-contain"
              priority
            />
            <div>
              <h1 className="font-semibold text-white">Registration Manager</h1>
              <p className="text-sm text-gray-400">{registrations.length} registrations</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter />
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-400 hover:text-[#C8960C] transition-colors font-semibold"
            >
              Logout →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3 bg-[#1a1a1a] text-white border border-[#333] rounded text-sm focus:border-[#C8960C] outline-none"
            />
            <CustomSelect
              value={slotFilter}
              onChange={setSlotFilter}
              options={[
                { value: '', label: 'All Squads' },
                { value: 'squadA', label: 'Squad A (22)' },
                { value: 'squadB', label: 'Squad B (24)' },
                { value: 'squadC', label: 'Squad C (24)' },
                { value: 'squadD', label: 'Squad D (24)' },
                { value: 'squadE', label: 'Any of Above' },
              ]}
            />
            <CustomSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'pending', label: 'Pending' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' },
              ]}
            />
          </div>
        </div>

        <div className="mb-8 grid grid-cols-5 gap-4">
          {['squadA', 'squadB', 'squadC', 'squadD', 'squadE'].map(squad => (
            <motion.button
              key={squad}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSlotFilter(slotFilter === squad ? '' : squad)}
              className={`p-4 rounded border transition-all ${
                slotFilter === squad
                  ? 'border-[#C8960C] bg-[rgba(200,150,12,0.1)]'
                  : 'border-[#333] hover:border-[#444] bg-[#1a1a1a]'
              }`}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">{SQUAD_NAMES[squad]}</p>
              <p className="text-2xl font-bold text-[#C8960C]">
                {counts[squad] || 0}/{SQUAD_LIMITS[squad] === Infinity ? '∞' : SQUAD_LIMITS[squad]}
              </p>
            </motion.button>
          ))}
        </div>

        {selected.size > 0 && (
          <div className="mb-6 p-4 bg-[#222] border border-[#333] rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">{selected.size} selected</span>
              <button
                onClick={() => { setSelected(new Set()); setBulkStatus(''); setBulkSlot('') }}
                className="text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <CustomSelect
                  value={bulkStatus}
                  onChange={setBulkStatus}
                  options={[
                    { value: '', label: 'Update status...' },
                    { value: 'approved', label: 'Approved' },
                    { value: 'rejected', label: 'Rejected' },
                    { value: 'pending', label: 'Pending' },
                  ]}
                />
                <button
                  onClick={handleBulkStatusUpdate}
                  disabled={!bulkStatus}
                  className="px-4 py-3 bg-[#C8960C] text-black font-semibold rounded hover:bg-[#B08608] transition-colors disabled:opacity-50 whitespace-nowrap min-h-12"
                >
                  ✓ Update
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <CustomSelect
                  value={bulkSlot}
                  onChange={setBulkSlot}
                  options={[
                    { value: '', label: 'Move to squad...' },
                    { value: 'squadA', label: 'Squad A' },
                    { value: 'squadB', label: 'Squad B' },
                    { value: 'squadC', label: 'Squad C' },
                    { value: 'squadD', label: 'Squad D' },
                    { value: 'squadE', label: 'Any of Above' },
                  ]}
                />
                <button
                  onClick={handleBulkSlotMove}
                  disabled={!bulkSlot}
                  className="px-4 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors disabled:opacity-50 whitespace-nowrap min-h-12"
                >
                  Move
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-row gap-2 sm:gap-3">
          <button
            onClick={handleExportCSV}
            disabled={registrations.length === 0}
            className="flex-1 sm:flex-none px-3 py-2 bg-[#C8960C] text-black font-semibold text-sm rounded hover:bg-[#B08608] transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            CSV
          </button>
          <button
            onClick={handleExportPDF}
            disabled={registrations.length === 0}
            className="flex-1 sm:flex-none px-3 py-2 bg-blue-600 text-white font-semibold text-sm rounded hover:bg-blue-700 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            PDF
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No registrations found</div>
        ) : (
          <div className="overflow-x-auto bg-[#1a1a1a] border border-[#333] rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#333] bg-[#222]">
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selected.size === registrations.length && registrations.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 accent-[#C8960C]"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-gray-300">Phone</th>
                  <th className="px-6 py-4 text-left text-gray-300">Gender</th>
                  <th className="px-6 py-4 text-left text-gray-300">Payment</th>
                  <th className="px-6 py-4 text-left text-gray-300">Squad</th>
                  <th className="px-6 py-4 text-left text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-gray-300">Date</th>
                  <th className="px-6 py-4 text-right text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="border-b border-[#333] hover:bg-[#222] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selected.has(reg.id)}
                        onChange={() => toggleSelect(reg.id)}
                        className="w-4 h-4 accent-[#C8960C]"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">{reg.fullName}</td>
                    <td className="px-6 py-4 text-gray-300">{reg.email}</td>
                    <td className="px-6 py-4 text-gray-300">{reg.phone}</td>
                    <td className="px-6 py-4 text-gray-400 capitalize">{reg.gender || '—'}</td>
                    <td className="px-6 py-4 text-gray-400 uppercase">{reg.paymentMode || '—'}</td>
                    <td className="px-6 py-4 font-semibold text-[#C8960C]">{SQUAD_NAMES[reg.slot]}</td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded"
                        style={{
                          color:
                            reg.status === 'approved'
                              ? '#10b981'
                              : reg.status === 'pending'
                              ? '#f59e0b'
                              : reg.status === 'rejected'
                              ? '#ef4444'
                              : '#6b7280',
                          border:
                            reg.status === 'approved'
                              ? '2px solid #10b981'
                              : reg.status === 'pending'
                              ? '2px solid #f59e0b'
                              : reg.status === 'rejected'
                              ? '2px solid #ef4444'
                              : '2px solid #6b7280',
                          backgroundColor:
                            reg.status === 'approved'
                              ? 'rgba(16,185,129,0.1)'
                              : reg.status === 'pending'
                              ? 'rgba(245,158,11,0.1)'
                              : reg.status === 'rejected'
                              ? 'rgba(239,68,68,0.1)'
                              : 'rgba(107,114,128,0.1)',
                          textTransform: 'capitalize',
                        }}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setDetailId(reg.id)}
                          className="px-3 py-1 text-xs font-semibold text-[#C8960C] border border-[#C8960C] rounded hover:bg-[rgba(200,150,12,0.1)] transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(reg.id)}
                          className="px-3 py-1 text-xs font-semibold text-red-400 border border-red-900 rounded hover:bg-red-950 transition-colors"
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

        <RegistrationDetailModal
          registrationId={detailId || ''}
          isOpen={!!detailId}
          onClose={() => setDetailId(null)}
        />
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SquadBadge from '@/components/ui/SquadBadge'

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

type EditableRegistrationModalProps = {
  registration: Registration | null
  isOpen: boolean
  onClose: () => void
  onUpdate?: (registration: Registration) => void
}

const SQUAD_NAMES: Record<string, string> = {
  squadA: 'Squad A',
  squadB: 'Squad B',
  squadC: 'Squad C',
  squadD: 'Squad D',
  squadE: 'Any of Above',
}

export default function EditableRegistrationModal({
  registration,
  isOpen,
  onClose,
  onUpdate,
}: EditableRegistrationModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Registration | null>(null)

  const handleEdit = () => {
    if (registration) {
      setEditForm({ ...registration })
      setIsEditing(true)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditForm(null)
  }

  const handleSave = async () => {
    if (!editForm) return

    try {
      const res = await fetch(`/api/admin/registrations/${editForm.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })

      if (res.ok) {
        const updated = await res.json()
        onUpdate?.(updated)
        setIsEditing(false)
        setEditForm(null)
      }
    } catch (error) {
      console.error('Update failed:', error)
    }
  }

  const current = isEditing && editForm ? editForm : registration

  if (!current) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#333] bg-[#0a0a0a]">
              <h2 className="text-2xl font-bold text-white">Registration Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6">
              <div className="space-y-6">
                {/* Name */}
                <Field label="Name:">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm?.fullName || ''}
                      onChange={(e) =>
                        setEditForm((prev) => prev ? { ...prev, fullName: e.target.value } : null)
                      }
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-white focus:border-[#C8960C] outline-none"
                    />
                  ) : (
                    <span className="text-gray-300">{current.fullName}</span>
                  )}
                </Field>

                {/* Email */}
                <Field label="Email:">
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm?.email || ''}
                      onChange={(e) =>
                        setEditForm((prev) => prev ? { ...prev, email: e.target.value } : null)
                      }
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-white focus:border-[#C8960C] outline-none"
                    />
                  ) : (
                    <span className="text-gray-300">{current.email}</span>
                  )}
                </Field>

                {/* Phone */}
                <Field label="Phone:">
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm?.phone || ''}
                      onChange={(e) =>
                        setEditForm((prev) => prev ? { ...prev, phone: e.target.value } : null)
                      }
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-white focus:border-[#C8960C] outline-none font-mono"
                    />
                  ) : (
                    <span className="text-gray-300 font-mono">{current.phone}</span>
                  )}
                </Field>

                {/* Gender */}
                <Field label="Gender:">
                  {isEditing ? (
                    <select
                      value={editForm?.gender || ''}
                      onChange={(e) =>
                        setEditForm((prev) => prev ? { ...prev, gender: e.target.value } : null)
                      }
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-white focus:border-[#C8960C] outline-none"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  ) : (
                    <span className="text-gray-300 capitalize">{current.gender || '—'}</span>
                  )}
                </Field>

                {/* Payment Mode */}
                <Field label="Payment Mode:">
                  {isEditing ? (
                    <select
                      value={editForm?.paymentMode || ''}
                      onChange={(e) =>
                        setEditForm((prev) => prev ? { ...prev, paymentMode: e.target.value } : null)
                      }
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-white focus:border-[#C8960C] outline-none"
                    >
                      <option value="">Select payment mode</option>
                      <option value="upi">UPI</option>
                      <option value="neft">NEFT</option>
                    </select>
                  ) : (
                    <span className="text-gray-300 uppercase">{current.paymentMode || '—'}</span>
                  )}
                </Field>

                {/* Squad */}
                <Field label="Squad:">
                  <div className="flex items-center gap-2">
                    <SquadBadge squad={current.slot as any} size="md" />
                    {isEditing && (
                      <select
                        value={editForm?.slot || ''}
                        onChange={(e) =>
                          setEditForm((prev) => prev ? { ...prev, slot: e.target.value } : null)
                        }
                        className="ml-3 px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-white focus:border-[#C8960C] outline-none text-sm"
                      >
                        {Object.entries(SQUAD_NAMES).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </Field>

                {/* Status */}
                <Field label="Status:">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded capitalize border"
                      style={{
                        color:
                          current.status === 'approved'
                            ? '#10b981'
                            : current.status === 'pending'
                            ? '#f59e0b'
                            : current.status === 'rejected'
                            ? '#ef4444'
                            : '#6b7280',
                        borderColor:
                          current.status === 'approved'
                            ? '#10b981'
                            : current.status === 'pending'
                            ? '#f59e0b'
                            : current.status === 'rejected'
                            ? '#ef4444'
                            : '#6b7280',
                        backgroundColor:
                          current.status === 'approved'
                            ? 'rgba(16,185,129,0.1)'
                            : current.status === 'pending'
                            ? 'rgba(245,158,11,0.1)'
                            : current.status === 'rejected'
                            ? 'rgba(239,68,68,0.1)'
                            : 'rgba(107,114,128,0.1)',
                      }}
                    >
                      {current.status}
                    </span>
                  </div>
                </Field>

                {/* Registered Date */}
                <Field label="Registered:">
                  <span className="text-gray-300">{new Date(current.createdAt).toLocaleString()}</span>
                </Field>

                {/* Comments */}
                {current.comments && (
                  <Field label="Comments:">
                    {isEditing ? (
                      <textarea
                        value={editForm?.comments || ''}
                        onChange={(e) =>
                          setEditForm((prev) => prev ? { ...prev, comments: e.target.value } : null)
                        }
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-white focus:border-[#C8960C] outline-none resize-none"
                        rows={3}
                      />
                    ) : (
                      <span className="text-gray-300">{current.comments}</span>
                    )}
                  </Field>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-[#333] bg-[#0a0a0a]">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="flex-1 px-4 py-3 text-sm font-semibold bg-[#C8960C] text-black rounded hover:bg-[#B08608] transition-colors flex items-center justify-center gap-2"
                  >
                    ✎ Edit
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 text-sm font-semibold bg-[#242424] text-white rounded hover:bg-[#333] transition-colors"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-3 text-sm font-semibold bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 text-sm font-semibold bg-[#242424] text-white rounded hover:bg-[#333] transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-400">{label}</label>
      <div>{children}</div>
    </div>
  )
}

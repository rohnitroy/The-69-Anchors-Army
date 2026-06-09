'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

export default function RegistrationDetailModal({
  registrationId,
  isOpen,
  onClose,
}: {
  registrationId: string
  isOpen: boolean
  onClose: () => void
}) {
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isOpen || !registrationId) return

    const fetchRegistration = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/registration/${registrationId}`)
        if (res.ok) {
          const data = await res.json()
          setRegistration(data)
        }
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRegistration()
  }, [isOpen, registrationId])

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
            className="fixed inset-0 z-40 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="w-full max-w-2xl rounded-lg bg-[#1a1a1a] border border-[#333] shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="border-b border-[#333] px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Registration Details</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="text-center py-8 text-gray-400">Loading...</div>
                ) : registration ? (
                  <div className="space-y-4">
                    <DetailRow label="Name" value={registration.fullName} />
                    <DetailRow label="Email" value={registration.email} />
                    <DetailRow label="Phone" value={registration.phone} />
                    <DetailRow
                      label="Gender"
                      value={registration.gender ? registration.gender.toUpperCase() : '—'}
                    />
                    <DetailRow
                      label="Payment Mode"
                      value={registration.paymentMode ? registration.paymentMode.toUpperCase() : '—'}
                    />
                    <DetailRow label="Squad" value={registration.slot.toUpperCase()} />
                    <DetailRow
                      label="Status"
                      value={
                        <span
                          className="px-3 py-1 rounded text-xs font-semibold"
                          style={{
                            color: '#C8960C',
                            border: '1px solid #C8960C',
                            backgroundColor: 'rgba(200,150,12,0.1)',
                          }}
                        >
                          {registration.status}
                        </span>
                      }
                    />
                    {registration.comments && (
                      <DetailRow label="Comments" value={registration.comments} />
                    )}
                    <DetailRow
                      label="Registered"
                      value={new Date(registration.createdAt).toLocaleString()}
                    />
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">Registration not found</div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-[#333] px-6 py-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#C8960C] text-black font-semibold rounded hover:bg-[#B08608] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function DetailRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-32 text-sm font-semibold text-gray-300">{label}:</div>
      <div className="flex-1 text-sm text-gray-100">
        {typeof value === 'string' ? value : value}
      </div>
    </div>
  )
}

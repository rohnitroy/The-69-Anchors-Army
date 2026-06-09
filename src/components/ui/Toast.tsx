'use client'

import { useState, useCallback, useContext, createContext, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ToastType = 'success' | 'error' | 'warning' | 'info'

type ToastMessage = {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

type ToastContextType = {
  toast: (
    type: ToastType,
    title: string,
    message?: string,
    duration?: number
  ) => void
  confirm: (
    title: string,
    message: string,
    onConfirm: () => void | Promise<void>,
    onCancel?: () => void
  ) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmData, setConfirmData] = useState<{
    title: string
    message: string
    onConfirm: () => void | Promise<void>
    onCancel?: () => void
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const toast = useCallback(
    (
      type: ToastType,
      title: string,
      message?: string,
      duration: number = 3000
    ) => {
      const id = Date.now().toString()
      const newToast: ToastMessage = { id, type, title, message, duration }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration)
      }
    },
    []
  )

  const confirm = useCallback(
    (
      title: string,
      message: string,
      onConfirm: () => void | Promise<void>,
      onCancel?: () => void
    ) => {
      setConfirmData({ title, message, onConfirm, onCancel })
      setShowConfirm(true)
    },
    []
  )

  const handleConfirm = async () => {
    if (!confirmData) return

    setIsLoading(true)
    try {
      const result = confirmData.onConfirm()
      if (result instanceof Promise) {
        await result
      }
      toast('success', 'Success', 'Operation completed')
    } catch (error) {
      console.error('Confirm error:', error)
      toast('error', 'Error', 'Operation failed')
    } finally {
      setIsLoading(false)
      setShowConfirm(false)
      setConfirmData(null)
    }
  }

  const handleCancel = () => {
    confirmData?.onCancel?.()
    setShowConfirm(false)
    setConfirmData(null)
  }

  return (
    <ToastContext.Provider value={{ toast, confirm }}>
      {children}

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-[9999] pointer-events-none space-y-3">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 400, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 400 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="pointer-events-auto"
            >
              <div
                className={`rounded-lg p-4 shadow-lg backdrop-blur-sm border ${
                  t.type === 'success'
                    ? 'bg-green-900/20 border-green-500/50 text-green-100'
                    : t.type === 'error'
                    ? 'bg-red-900/20 border-red-500/50 text-red-100'
                    : t.type === 'warning'
                    ? 'bg-yellow-900/20 border-yellow-500/50 text-yellow-100'
                    : 'bg-blue-900/20 border-blue-500/50 text-blue-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{t.title}</p>
                    {t.message && (
                      <p className="text-xs opacity-90 mt-1">{t.message}</p>
                    )}
                  </div>
                  <div
                    className={`text-xl flex-shrink-0 ${
                      t.type === 'success'
                        ? '✓'
                        : t.type === 'error'
                        ? '✕'
                        : t.type === 'warning'
                        ? '⚠'
                        : 'ℹ'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirm && confirmData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
              className="fixed inset-0 z-[9990] bg-black/50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-[9991] flex items-center justify-center p-4"
              onClick={handleCancel}
            >
              <div
                className="w-full max-w-sm bg-[#1a1a1a] border border-[#333] rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {confirmData.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-6">
                    {confirmData.message}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-300 border border-[#444] rounded hover:bg-[#222] transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
                      disabled={isLoading}
                      className="flex-1 px-4 py-2.5 text-sm font-semibold text-black bg-[#C8960C] rounded hover:bg-[#B08608] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Confirm'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

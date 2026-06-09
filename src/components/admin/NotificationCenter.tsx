'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Activity = {
  id: string
  actionType: string
  actionDescription: string
  targetName?: string
  targetEmail?: string
  createdAt: string
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchActivities()
    const interval = setInterval(fetchActivities, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/admin/activities')
      if (res.ok) {
        const data = await res.json()
        setActivities(data)
        setUnreadCount(data.length)
      }
    } catch (error) {
      console.error('Fetch activities error:', error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'REGISTRATION_DELETED':
        return '🗑️'
      case 'REGISTRATION_MOVED':
        return '🔄'
      case 'STATUS_UPDATED':
        return '✏️'
      default:
        return '📝'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Activity Log Modal - Mobile & Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-0 left-4 right-4 md:left-auto md:right-auto md:bottom-auto md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-96 bg-[#1a1a1a] border-t md:border border-[#333] rounded-t-lg md:rounded-lg shadow-xl z-50"
              style={{
                maxHeight: 'min(60vh, calc(100vh - 120px))',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="border-b border-[#333] px-4 py-3 bg-[#222] flex items-center justify-between flex-shrink-0">
                <h3 className="text-sm font-semibold text-white">Activity Log</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white text-xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 min-h-0">
                {activities.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-400 text-sm">
                    No recent activities
                  </div>
                ) : (
                  activities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border-b border-[#2a2a2a] px-3 sm:px-4 py-2 sm:py-3 hover:bg-[#222] transition-colors"
                    >
                      <div className="flex gap-2 sm:gap-3">
                        <div className="text-lg sm:text-xl flex-shrink-0 mt-0.5">{getActionIcon(activity.actionType)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-white truncate">
                            {activity.actionDescription}
                          </p>
                          {activity.targetName && (
                            <p className="text-xs text-gray-400 truncate">
                              {activity.targetName}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(activity.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SLOTS = [
  { id: 'squadA', name: 'Squad A', date: 'Aug 8th & 9th', seats: 22 },
  { id: 'squadB', name: 'Squad B', date: 'Aug 10th & 11th', seats: 24 },
  { id: 'squadC', name: 'Squad C', date: 'Aug 17th & 18th', seats: 24 },
  { id: 'squadD', name: 'Squad D', date: 'Aug 19th & 20th', seats: 24 },
  { id: 'squadE', name: 'Any of the Above', date: 'Flexible', seats: null },
]

export default function SlotChips() {
  const [slotCounts, setSlotCounts] = useState<Record<string, number>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Initial fetch
    const fetchSlots = () => {
      fetch('/api/slots')
        .then(r => r.json())
        .then(setSlotCounts)
        .catch(() => {})
    }

    fetchSlots()

    // Refetch every 5 seconds for real-time updates
    const interval = setInterval(fetchSlots, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-wrap gap-3 justify-start">
      {SLOTS.map(slot => {
        const filled = slotCounts[slot.id] ?? 0
        const isAnyOfAbove = slot.seats === null
        const available = isAnyOfAbove ? null : (slot.seats as number) - filled
        const isFull = !isAnyOfAbove && available !== null && available <= 0

        return (
          <motion.div
            key={slot.id}
            whileHover={{ scale: 1.05 }}
            className={`relative px-5 py-3 rounded-lg border transition-all duration-300 group ${
              isFull
                ? 'border-red-900 bg-red-950 opacity-60'
                : 'border-gold-muted hover:border-gold-primary bg-[rgba(200,150,12,0.08)] hover:bg-[rgba(200,150,12,0.15)]'
            }`}
          >
            {/* Slot Name */}
            <div className="font-sans font-semibold text-text-primary text-sm">
              {slot.name}
            </div>

            {/* Hover Info Container - Desktop */}
            <div
              className={`hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 rounded-lg bg-black border border-gold-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 ${
                isFull ? 'hidden' : ''
              }`}
            >
              <div className="text-xs text-gold-primary font-semibold">
                {slot.date}
              </div>
              {!isAnyOfAbove && available !== null && (
                <div className="text-xs text-text-secondary mt-1">
                  {available} seats available
                </div>
              )}
              {/* Arrow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gold-primary transform rotate-45" />
            </div>

            {/* Mobile Info - Always Show Below Chip */}
            {!isFull && (
              <div className="sm:hidden text-center mt-2 text-xs">
                <div className="text-gold-primary font-semibold">{slot.date}</div>
                {!isAnyOfAbove && available !== null && (
                  <div className="text-text-secondary">{available} available</div>
                )}
              </div>
            )}

            {/* Seat Info Badge - Don't show for "Any of Above" */}
            {!isAnyOfAbove && (
              <div className="text-xs text-gold-muted mt-1">
                {filled}/{slot.seats} seats
              </div>
            )}

            {/* Full Indicator */}
            {isFull && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                <span className="text-xs font-bold text-red-400">FULL</span>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

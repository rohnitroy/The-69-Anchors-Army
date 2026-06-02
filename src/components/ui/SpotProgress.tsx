'use client'

import { useEffect, useRef, useState } from 'react'
import { BRAND } from '@/lib/content'

interface Props {
  className?: string
}

export default function SpotProgress({ className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [filled, setFilled] = useState(false)

  const pct = Math.round((BRAND.seatsClaimed / BRAND.totalSeats) * 100)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFilled(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`w-full max-w-sm mx-auto ${className}`}>
      <div className="flex justify-between mb-2">
        <span className="micro-label text-text-secondary">{BRAND.seatsClaimed} of {BRAND.totalSeats} seats claimed</span>
        <span className="micro-label text-gold-primary">{BRAND.totalSeats - BRAND.seatsClaimed} remaining</span>
      </div>
      <div className="h-px bg-border-subtle overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-gold-deep via-gold-primary to-gold-bright progress-bar-fill"
          style={{ width: filled ? `${pct}%` : '0%' }}
        />
      </div>
    </div>
  )
}

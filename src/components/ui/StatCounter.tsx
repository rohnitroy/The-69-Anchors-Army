'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  value: string
  label: string
  suffix?: string
  className?: string
}

export default function StatCounter({ value, label, suffix = '', className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div
        className="font-display font-semibold leading-none text-gold-bright"
        style={{
          fontSize: 'clamp(48px, 6vw, 72px)',
          opacity: animated ? 1 : 0,
          transform: animated ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}
      >
        {suffix}{value}
      </div>
      <div
        className="micro-label mt-3 text-text-secondary"
        style={{
          opacity: animated ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.2s',
        }}
      >
        {label}
      </div>
    </div>
  )
}

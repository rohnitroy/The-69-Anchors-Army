'use client'

import { useEffect, useState } from 'react'
import MicSymbol from '@/components/logos/MicSymbol'

export default function Loader() {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('bb-army-loaded')) return
    setVisible(true)

    const leaveTimer = setTimeout(() => setLeaving(true), 2000)
    const hideTimer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('bb-army-loaded', '1')
    }, 2700)

    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{
        opacity: leaving ? 0 : 1,
        transition: leaving ? 'opacity 0.7s ease-out' : 'opacity 0.3s ease-in',
        pointerEvents: leaving ? 'none' : 'all',
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(200,150,12,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="flex flex-col items-center gap-6">
        <div className="animate-mic-breathe">
          <MicSymbol size={120} priority />
        </div>
        <div
          className="micro-label"
          style={{
            opacity: leaving ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          Anchor Bol BB Bol
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'
import { useModal } from '@/context/ModalContext'

// ─── Slot config ────────────────────────────────────────────────────────────

const SLOTS = [
  { id: 'squad1', name: 'Squad 1', date: 'Aug 8th & 9th',   checkout: 'Checkout Aug 10th', hidden: false  },
  { id: 'squad2', name: 'Squad 2', date: 'Aug 10th & 11th', checkout: 'Checkout Aug 12th', hidden: false  },
  { id: 'squad3', name: 'Squad 3', date: 'Aug 17th & 18th', checkout: 'Checkout Aug 19th', hidden: true  },
  { id: 'squad4', name: 'Squad 4', date: 'Aug 19th & 20th', checkout: 'Checkout Aug 21st', hidden: true  },
]
const SEAT_LIMIT = 24

// ─── Animation variants ─────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25, delay: 0.1 } },
}

const EASE_OUT: [number, number, number, number] = [0.4, 0, 1, 1]

const panelVariants = {
  hidden:  { opacity: 0, scale: 0.96, y: 32 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: {
    opacity: 0, scale: 0.96, y: 24,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
}

const glowVariants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.1, ease: EASE } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

// ─── Form types ─────────────────────────────────────────────────────────────

type FormState = {
  fullName: string
  phone:    string
  email:    string
  slot:     string
  comments: string
}

const EMPTY: FormState = { fullName: '', phone: '', email: '', slot: '', comments: '' }

type ExpandedSlot = {
  [key: string]: boolean
}

// ─── Modal ──────────────────────────────────────────────────────────────────

export default function RegistrationModal() {
  const { isOpen, closeModal } = useModal()
  const [mounted, setMounted]   = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, closeModal])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100]"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
            aria-hidden
          />

          {/* Gold ambient glow */}
          <motion.div
            key="glow"
            className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center"
            variants={glowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              style={{
                width: 760,
                height: 560,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(200,150,12,0.12) 0%, rgba(200,150,12,0.04) 50%, transparent 72%)',
                filter: 'blur(40px)',
              }}
            />
          </motion.div>

          {/* Scroll container — click outside panel closes */}
          <div
            className="fixed inset-0 z-[102] overflow-y-auto"
            onClick={closeModal}
          >
            {/* Inner centering wrapper — min-h-full keeps items-center correct even when panel overflows */}
            <div className="flex min-h-full items-center justify-center px-4 py-12">
            {/* Panel */}
            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Squad registration"
              className="relative w-full"
              style={{
                maxWidth: 680,
                background: '#0A0A0A',
                border: '1px solid rgba(200,150,12,0.2)',
                boxShadow: '0 0 0 1px rgba(200,150,12,0.06), 0 32px 80px rgba(0,0,0,0.8)',
              }}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                aria-label="Close registration"
                className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center text-text-secondary hover:text-gold-primary transition-colors duration-200"
                style={{ border: '1px solid rgba(200,150,12,0.2)', background: 'rgba(0,0,0,0.4)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Gold top bar */}
              <div style={{ height: 2, background: 'linear-gradient(to right, transparent, rgba(200,150,12,0.7) 30%, rgba(200,150,12,0.7) 70%, transparent)' }} />

              {/* Content */}
              <div className="px-8 md:px-12 py-10 md:py-14">
                <ModalForm onSuccess={closeModal} />
              </div>
            </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

// ─── Form ────────────────────────────────────────────────────────────────────

function ModalForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter()
  const [form, setForm]             = useState<FormState>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]           = useState('')
  const [slotCounts, setSlotCounts] = useState<Record<string, number>>({})
  const [expandedSlots, setExpandedSlots] = useState<ExpandedSlot>({})

  useEffect(() => {
    fetch('/api/slots')
      .then(r => r.json())
      .then(setSlotCounts)
      .catch(() => {})
  }, [])

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  const toggleSlotExpand = (slotId: string) => {
    setExpandedSlots(prev => ({ ...prev, [slotId]: !prev[slotId] }))
  }

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }
      onSuccess()
      router.push('/thank-you')
    } catch {
      setError('Something went wrong. Please try again or contact us directly.')
      setSubmitting(false)
    }
  }, [form, onSuccess, router])

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10 gap-4">
        <AnchorsArmyLogo className="w-28 md:w-36" />
        <GoldDivider className="w-16" />
        <h2
          className="font-display font-semibold text-text-primary leading-tight"
          style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}
        >
          Secure Your Slot
        </h2>
        <p className="font-sans text-text-secondary text-sm leading-relaxed max-w-sm">
          Choose your squad dates and lock in your place in the 69 Anchors Army.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <span className="micro-label px-3 py-1.5 border border-gold-muted text-gold-primary">Batch 1</span>
          <span className="micro-label px-3 py-1.5 border border-gold-muted text-gold-primary">24 Seats Per Squad</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Full Name */}
        <Field label="Full Name *">
          <input
            type="text" placeholder="Your full name"
            value={form.fullName} onChange={set('fullName')} required
            className={inputCls}
          />
        </Field>

        {/* Note banner */}
        <div
          className="border-l-2 px-4 py-3.5 rounded-sm"
          style={{ borderColor: '#C8960C', background: 'rgba(200,150,12,0.06)' }}
        >
          <p className="font-sans text-sm leading-relaxed" style={{ color: '#C8960C' }}>
            <span className="font-semibold">Note:</span> Please use the exact same Email ID and
            Mobile Number that you used when filling out the first registration form.
          </p>
        </div>

        {/* Mobile + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Mobile Number *">
            <input
              type="tel" placeholder="+91 98765 43210"
              value={form.phone} onChange={set('phone')} required
              className={inputCls}
            />
          </Field>
          <Field label="Email ID *">
            <input
              type="email" placeholder="you@example.com"
              value={form.email} onChange={set('email')} required
              className={inputCls}
            />
          </Field>
        </div>

        {/* Slot Selection */}
        <Field label="Select Your Slot *">
          <div className="flex flex-col gap-2.5 mt-1">
            {SLOTS.filter(s => !s.hidden).map(({ id, name, date, checkout }) => {
              const count  = slotCounts[id] ?? 0
              const isFull = count >= SEAT_LIMIT
              const isExpanded = expandedSlots[id] || false
              return (
                <div key={id}>
                  <label
                    className={[
                      'group flex items-center gap-4 px-4 py-3.5 border transition-all duration-200',
                      isFull
                        ? 'cursor-not-allowed'
                        : form.slot === id
                        ? 'border-gold-primary bg-[rgba(200,150,12,0.06)] cursor-pointer'
                        : 'border-[#1e1e1e] hover:border-[#333] cursor-pointer',
                    ].join(' ')}
                    style={isFull ? {
                      borderColor: 'rgba(220,38,38,0.22)',
                      background:  'rgba(220,38,38,0.03)',
                    } : undefined}
                  >
                    {isFull ? (
                      <span className="w-4 h-4 flex-none flex items-center justify-center"
                        style={{ color: 'rgba(220,38,38,0.5)', fontSize: 16, lineHeight: 1 }}>
                        ⊘
                      </span>
                    ) : (
                      <input
                        type="radio" name="slot" value={id}
                        checked={form.slot === id}
                        onChange={set('slot')}
                        required
                        className="accent-[#C8960C] w-4 h-4 flex-none"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <span
                        className={`font-sans text-sm font-medium block ${isFull ? 'line-through' : 'text-text-primary'}`}
                        style={isFull ? { color: '#3a3a3a' } : undefined}
                      >
                        {name}
                      </span>
                      {/* Desktop: hover to reveal, Mobile: always show if expanded */}
                      <div className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        isExpanded || window.matchMedia('(hover: hover)').matches
                          ? 'max-h-10 opacity-100 group-hover:max-h-10 group-hover:opacity-100'
                          : 'max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100'
                      }`}>
                        <span
                          className="font-sans text-xs block mt-0.5"
                          style={{ color: isFull ? '#2a2a2a' : '#C8960C' }}
                        >
                          {date}
                        </span>
                        <span
                          className="font-sans text-xs block"
                          style={{ color: isFull ? '#2a2a2a' : 'var(--color-text-secondary, #888)' }}
                        >
                          {checkout}
                        </span>
                      </div>
                    </div>
                    {isFull ? (
                      <span
                        className="font-label font-bold whitespace-nowrap"
                        style={{
                          fontSize: '9px',
                          letterSpacing: '0.18em',
                          color: '#dc2626',
                          border: '1px solid rgba(220,38,38,0.3)',
                          background: 'rgba(220,38,38,0.08)',
                          padding: '4px 10px',
                        }}
                      >
                        ⊘ HOUSE FULL
                      </span>
                    ) : (
                      <SeatBadge filled={count} total={SEAT_LIMIT} />
                    )}
                  </label>
                  {/* Mobile expand button */}
                  {!isFull && (
                    <button
                      type="button"
                      onClick={() => toggleSlotExpand(id)}
                      className="w-full text-center px-4 py-2 text-xs text-[#C8960C] hover:text-[#B08608] transition-colors sm:hidden"
                    >
                      {isExpanded ? '▲ Hide dates' : '▼ Show dates'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </Field>

        {/* Comments */}
        <Field label="Any notes or special requests?">
          <textarea
            placeholder="Optional — share anything you'd like us to know"
            value={form.comments} onChange={set('comments')} rows={3}
            className={`${inputCls} resize-none`}
          />
        </Field>

        {error && (
          <p className="font-sans text-sm text-red-400 -mt-1">{error}</p>
        )}

        {/* Submit */}
        <div className="flex flex-col gap-3 pt-1">
          <Button
            type="submit" variant="primary" size="lg"
            className="w-full" disabled={submitting}
          >
            {submitting
              ? <span className="flex items-center justify-center gap-2"><Spinner /> Registering...</span>
              : 'Confirm Registration →'
            }
          </Button>
          <p className="micro-label text-text-secondary text-center">
            24 seats per squad · First-come, first-served
          </p>
        </div>

      </form>
    </>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="micro-label text-text-secondary">{label}</label>
      {children}
    </div>
  )
}

function SeatBadge({ filled, total }: { filled: number; total: number }) {
  const left = total - filled
  const color = left <= 5 ? '#b45309' : left <= 10 ? '#6b5a2a' : '#3a3a3a'
  const textColor = left <= 5 ? '#f59e0b' : left <= 10 ? '#C8960C' : '#555'
  return (
    <span
      className="font-label font-semibold whitespace-nowrap tabular-nums"
      style={{
        fontSize: '10px',
        letterSpacing: '0.1em',
        color: textColor,
        border: `1px solid ${color}`,
        background: 'transparent',
        padding: '3px 9px',
      }}
    >
      {filled}&thinsp;/&thinsp;{total}
    </span>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

const inputCls = [
  'w-full px-4 py-3.5',
  'bg-[#060606] text-text-primary',
  'border border-[#1e1e1e]',
  'font-sans text-[15px] leading-normal',
  'outline-none transition-all duration-200',
  'placeholder:text-[#444]',
  'focus:border-gold-primary',
  'focus:shadow-[0_0_0_1px_rgba(200,150,12,0.2)]',
  'hover:border-[#2e2e2e]',
].join(' ')

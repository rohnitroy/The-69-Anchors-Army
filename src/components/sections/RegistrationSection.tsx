'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import GoldDivider from '@/components/ui/GoldDivider'
import SectionReveal from '@/components/ui/SectionReveal'
import Button from '@/components/ui/Button'

const SLOTS = [
  { id: 'squad1', label: 'Squad 1: Aug 8th & 9th',  sub: 'Checkout Aug 10th' },
  { id: 'squad2', label: 'Squad 2: Aug 10th & 11th', sub: 'Checkout Aug 12th' },
  { id: 'squad3', label: 'Squad 3: Aug 17th & 18th', sub: 'Checkout Aug 19th' },
  { id: 'squad4', label: 'Squad 4: Aug 19th & 20th', sub: 'Checkout Aug 21st' },
]
const SEAT_LIMIT = 24

type FormState = {
  fullName: string
  phone:    string
  email:    string
  slot:     string
  comments: string
}

const EMPTY: FormState = { fullName: '', phone: '', email: '', slot: '', comments: '' }

export default function RegistrationSection() {
  const router = useRouter()
  const [form, setForm]         = useState<FormState>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]       = useState('')
  const [slotCounts, setSlotCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    fetch('/api/slots')
      .then(r => r.json())
      .then(data => setSlotCounts(data))
      .catch(() => {})
  }, [])

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }
      router.push('/thank-you')
    } catch {
      setError('Something went wrong. Please try again or contact us directly.')
      setSubmitting(false)
    }
  }

  return (
    <section id="register" className="relative bg-surface py-28 md:py-36 overflow-hidden">

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,150,12,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto px-6 md:px-12" style={{ maxWidth: 720 }}>

        {/* Header */}
        <SectionReveal>
          <div className="flex flex-col items-center text-center mb-14 gap-5">
            <AnchorsArmyLogo className="w-35 md:w-45" />
            <GoldDivider className="w-20" />
            <h2
              className="font-display font-semibold text-text-primary leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              Secure Your Slot
            </h2>
            <p className="font-sans text-text-secondary text-sm leading-relaxed max-w-md">
              Choose your squad dates and lock in your place in the 69 Anchors Army.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <span className="micro-label px-4 py-2 border border-gold-muted text-gold-primary">
                Batch 1
              </span>
              <span className="micro-label px-4 py-2 border border-gold-muted text-gold-primary">
                24 Seats Per Squad
              </span>
            </div>
          </div>
        </SectionReveal>

        {/* Form */}
        <SectionReveal delay={120}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Full Name */}
            <Field label="Full Name *">
              <input
                type="text" placeholder="Your full name"
                value={form.fullName} onChange={set('fullName')} required
                className={input}
              />
            </Field>

            {/* Note banner — shown prominently before email/phone */}
            <div
              className="border-l-2 px-5 py-4 rounded-sm"
              style={{
                borderColor: '#C8960C',
                background: 'rgba(200,150,12,0.06)',
              }}
            >
              <p className="font-sans text-sm leading-relaxed" style={{ color: '#C8960C' }}>
                <span className="font-semibold">Note:</span> Please use the exact same Email ID
                and Mobile Number that you used when filling out the first registration form.
              </p>
            </div>

            {/* Mobile + Email */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Mobile Number *">
                <input
                  type="tel" placeholder="+91 98765 43210"
                  value={form.phone} onChange={set('phone')} required
                  className={input}
                />
              </Field>
              <Field label="Email ID *">
                <input
                  type="email" placeholder="you@example.com"
                  value={form.email} onChange={set('email')} required
                  className={input}
                />
              </Field>
            </div>

            {/* Slot Selection */}
            <Field label="Select Your Slot *">
              <div className="flex flex-col gap-3 mt-1">
                {SLOTS.map(({ id, label, sub }) => {
                  const count  = slotCounts[id] ?? 0
                  const isFull = count >= SEAT_LIMIT
                  return (
                    <label
                      key={id}
                      className={[
                        'flex items-center gap-4 px-5 py-4 border transition-all duration-200',
                        isFull
                          ? 'cursor-not-allowed'
                          : form.slot === id
                          ? 'border-gold-primary bg-[rgba(200,150,12,0.05)] cursor-pointer'
                          : 'border-[#242424] hover:border-[#383838] cursor-pointer',
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
                          {label}
                        </span>
                        <span
                          className="font-sans text-xs block mt-0.5"
                          style={{ color: isFull ? '#2a2a2a' : 'var(--color-text-secondary, #888)' }}
                        >
                          {sub}
                        </span>
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
                  )
                })}
              </div>
            </Field>

            {/* Comments */}
            <Field label="Any notes or special requests?">
              <textarea
                placeholder="Optional — share anything you'd like us to know"
                value={form.comments} onChange={set('comments')} rows={3}
                className={`${input} resize-none`}
              />
            </Field>

            {error && (
              <p className="font-sans text-sm text-red-400 -mt-2">{error}</p>
            )}

            {/* Submit */}
            <div className="flex flex-col gap-3 pt-2">
              <Button
                type="submit" variant="primary" size="lg"
                className="w-full sm:w-auto sm:self-start"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Spinner />
                    Registering...
                  </span>
                ) : (
                  'Confirm Registration →'
                )}
              </Button>
              <p className="micro-label text-text-secondary">
                24 seats per squad · First-come, first-served.
              </p>
            </div>

          </form>
        </SectionReveal>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="micro-label text-text-secondary">{label}</label>
      {children}
    </div>
  )
}

function SeatBadge({ filled, total }: { filled: number; total: number }) {
  const left = total - filled
  const color     = left <= 5 ? '#b45309' : left <= 10 ? '#6b5a2a' : '#3a3a3a'
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
      <path
        className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

const input = [
  'w-full px-5 py-4',
  'bg-[#080808] text-text-primary',
  'border border-[#242424]',
  'font-sans text-[15px] leading-normal',
  'outline-none',
  'transition-all duration-200',
  'placeholder:text-[#484848]',
  'focus:border-gold-primary',
  'focus:shadow-[0_0_0_1px_rgba(200,150,12,0.2),inset_0_0_0_0px_transparent]',
  'hover:border-[#383838]',
].join(' ')

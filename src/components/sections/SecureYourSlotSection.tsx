'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import GoldDivider from '@/components/ui/GoldDivider'
import SectionReveal from '@/components/ui/SectionReveal'
import Button from '@/components/ui/Button'
import CustomDropdown from '@/components/ui/CustomDropdown'
import LegalModal from '@/components/ui/LegalModal'

const SLOTS = [
  { id: 'squadA', label: 'Squad A: Aug 8th & 9th',  sub: 'Checkout Aug 10th', limit: 22 },
  { id: 'squadB', label: 'Squad B: Aug 10th & 11th', sub: 'Checkout Aug 12th', limit: 24 },
  { id: 'squadC', label: 'Squad C: Aug 17th & 18th', sub: 'Checkout Aug 19th', limit: 24 },
  { id: 'squadD', label: 'Squad D: Aug 19th & 20th', sub: 'Checkout Aug 21st', limit: 24 },
  { id: 'squadE', label: 'Any of the Above', sub: "We'll assign your squad based on availability", limit: Infinity },
]

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

const PAYMENT_MODE_OPTIONS = [
  { value: 'upi', label: 'UPI' },
  { value: 'neft', label: 'NEFT' },
]

const COUNTRY_CODES = [
  { code: '+91', label: '+91', flag: '🇮🇳', country: 'India' },
  { code: '+1', label: '+1', flag: '🇺🇸', country: 'USA/Canada' },
  { code: '+44', label: '+44', flag: '🇬🇧', country: 'UK' },
  { code: '+61', label: '+61', flag: '🇦🇺', country: 'Australia' },
  { code: '+971', label: '+971', flag: '🇦🇪', country: 'UAE' },
  { code: '+65', label: '+65', flag: '🇸🇬', country: 'Singapore' },
  { code: '+64', label: '+64', flag: '🇳🇿', country: 'New Zealand' },
]

// SVG flag icons for all platforms
const FLAG_ICONS: Record<string, string> = {
  '+91': `<svg viewBox="0 0 36 36" class="w-5 h-5"><rect fill="#FF9933" x="0" y="0" width="36" height="12"/><rect fill="white" x="0" y="12" width="36" height="12"/><rect fill="#138808" x="0" y="24" width="36" height="12"/><circle fill="#000080" cx="18" cy="18" r="4.5"/></svg>`,
  '+1': `<svg viewBox="0 0 36 36" class="w-5 h-5"><rect fill="#B22234" x="0" y="0" width="36" height="36"/><rect fill="white" x="0" y="2.77" width="36" height="2.77"/><rect fill="white" x="0" y="8.31" width="36" height="2.77"/></svg>`,
  '+44': `<svg viewBox="0 0 36 36" class="w-5 h-5"><rect fill="#012169" x="0" y="0" width="36" height="36"/><path fill="white" d="M0 0L36 36M36 0L0 36" stroke-width="6"/></svg>`,
  '+61': `<svg viewBox="0 0 36 36" class="w-5 h-5"><rect fill="#00008B" x="0" y="0" width="36" height="36"/><path fill="gold" d="M18 6L21 15H31L23 20L26 29L18 24L10 29L13 20L5 15H15Z"/></svg>`,
  '+971': `<svg viewBox="0 0 36 36" class="w-5 h-5"><rect fill="#CE1126" x="0" y="0" width="36" height="12"/><rect fill="white" x="0" y="12" width="36" height="12"/><rect fill="#007A5E" x="0" y="24" width="36" height="12"/><rect fill="black" x="0" y="0" width="6" height="36"/></svg>`,
  '+65': `<svg viewBox="0 0 36 36" class="w-5 h-5"><rect fill="#DD0000" x="0" y="0" width="36" height="36"/><rect fill="white" x="0" y="0" width="36" height="18"/><circle fill="white" cx="9" cy="9" r="3"/><path fill="white" d="M14 9L16 15L22 15L17 19L19 25L14 21L9 25L11 19L6 15L12 15Z"/></svg>`,
  '+64': `<svg viewBox="0 0 36 36" class="w-5 h-5"><rect fill="#002B7F" x="0" y="0" width="36" height="36"/><rect fill="#CE1126" x="0" y="0" width="36" height="36" opacity="0.3"/></svg>`,
}

type FormState = {
  fullName: string
  countryCode: string
  phone:    string
  email:    string
  gender:   string
  paymentMode: string
  slot:     string
  comments: string
}

const EMPTY: FormState = { fullName: '', countryCode: '+91', phone: '', email: '', gender: '', paymentMode: '', slot: '', comments: '' }

export default function SecureYourSlotSection() {
  const router = useRouter()
  const [form, setForm]         = useState<FormState>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]       = useState('')
  const [slotCounts, setSlotCounts] = useState<Record<string, number>>({})
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  useEffect(() => {
    // Initial fetch
    const fetchSlots = () => {
      fetch('/api/slots')
        .then(r => r.json())
        .then(data => setSlotCounts(data))
        .catch(() => {})
    }

    fetchSlots()

    // Refetch every 5 seconds for real-time updates
    const interval = setInterval(fetchSlots, 5000)
    return () => clearInterval(interval)
  }, [])

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const payload = {
        ...form,
        phone: `${form.countryCode} ${form.phone}`.trim(),
      }
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    <section id="secure-your-slot" className="relative bg-surface py-28 md:py-36 overflow-hidden">

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

            {/* Country Code + Mobile + Email */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Mobile Number *">
                <div className="flex flex-col gap-3">
                  <CustomDropdown
                    value={form.countryCode}
                    onChange={(value) => setForm(prev => ({ ...prev, countryCode: value }))}
                    options={COUNTRY_CODES.map(c => ({
                      value: c.code,
                      label: c.code,
                      flag: c.flag,
                    }))}
                    isCountryCode
                  />
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={form.phone}
                    onChange={set('phone')}
                    required
                    className={`${input} min-h-12`}
                  />
                </div>
              </Field>
              <Field label="Email ID *">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set('email')}
                  required
                  className={`${input} min-h-12`}
                />
              </Field>
            </div>

            {/* Gender Selection */}
            <Field label="Gender *">
              <CustomDropdown
                value={form.gender}
                onChange={(value) => setForm(prev => ({ ...prev, gender: value }))}
                options={GENDER_OPTIONS}
                placeholder="Select your gender"
              />
            </Field>

            {/* Payment Mode Selection */}
            <Field label="Preferred Payment Mode *">
              <CustomDropdown
                value={form.paymentMode}
                onChange={(value) => setForm(prev => ({ ...prev, paymentMode: value }))}
                options={PAYMENT_MODE_OPTIONS}
                placeholder="Select payment mode"
              />
            </Field>

            {/* Slot Selection */}
            <Field label="Select Your Slot *">
              <div className="flex flex-col gap-3 sm:gap-4 mt-1">
                {SLOTS.map(({ id, label, sub, limit }) => {
                  const count  = slotCounts[id] ?? 0
                  const isFull = limit !== Infinity && count >= limit
                  return (
                    <label
                      key={id}
                      className={[
                        'flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 sm:py-5 border transition-all duration-200 min-h-20 sm:min-h-fit',
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
                          className="accent-[#C8960C] w-5 h-5 flex-none cursor-pointer"
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
                      ) : limit === Infinity ? (
                        <span
                          className="font-label font-semibold whitespace-nowrap tabular-nums"
                          style={{
                            fontSize: '10px',
                            letterSpacing: '0.1em',
                            color: '#C8960C',
                            border: '1px solid #C8960C',
                            background: 'transparent',
                            padding: '3px 9px',
                          }}
                        >
                          ∞ FLEXIBLE
                        </span>
                      ) : (
                        <SeatBadge filled={count} total={limit} />
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

            {/* Legal Agreement */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3">
                <p className="text-sm text-gray-300 leading-relaxed">
                  By registering, you agree to our{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacy(true)}
                    className="text-[#C8960C] hover:text-[#B08608] font-semibold underline"
                  >
                    Privacy Policy
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-[#C8960C] hover:text-[#B08608] font-semibold underline"
                  >
                    Terms & Conditions
                  </button>
                  .
                </p>
              </div>
            </div>

            {error && (
              <p className="font-sans text-sm text-red-400 -mt-2">{error}</p>
            )}

            {/* Submit */}
            <div className="flex flex-col gap-3 pt-4 sm:pt-2">
              <Button
                type="submit" variant="primary" size="lg"
                className="w-full sm:w-auto sm:self-start min-h-12"
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
                Limited seats available · First-come, first-served.
              </p>
            </div>

          </form>
        </SectionReveal>

        {/* Legal Modals */}
        <LegalModal type="privacy" isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
        <LegalModal type="terms" isOpen={showTerms} onClose={() => setShowTerms(false)} />
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
  'w-full px-4 sm:px-5 py-3 sm:py-4',
  'bg-[#080808] text-text-primary',
  'border border-[#242424]',
  'font-sans text-[15px] leading-normal',
  'outline-none',
  'transition-all duration-200',
  'placeholder:text-[#484848]',
  'focus:border-gold-primary',
  'focus:shadow-[0_0_0_1px_rgba(200,150,12,0.2),inset_0_0_0_0px_transparent]',
  'hover:border-[#383838]',
  'min-h-12', // 48px minimum height for touch targets
].join(' ')

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import GoldDivider from '@/components/ui/GoldDivider'
import SectionReveal from '@/components/ui/SectionReveal'
import Button from '@/components/ui/Button'
import { REGISTRATION, BRAND } from '@/lib/content'

type FormState = {
  fullName: string
  phone: string
  city: string
  experience: string
  specialty: string
  whyJoin: string
  ack: boolean
}

const EMPTY: FormState = {
  fullName: '', phone: '', city: '', experience: '',
  specialty: '', whyJoin: '', ack: false,
}

export default function RegistrationSection() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const val = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value
    setForm(prev => ({ ...prev, [k]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.ack) { setError('Please acknowledge the investment amount to continue.'); return }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      router.push('/thank-you')
    } catch {
      setError('Something went wrong. Please try again or contact us directly.')
      setSubmitting(false)
    }
  }

  return (
    <section id="register" className="relative bg-surface py-28 md:py-36 overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,150,12,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto px-6 md:px-12" style={{ maxWidth: 720 }}>

        {/* Header */}
        <SectionReveal>
          <div className="flex flex-col items-center text-center mb-14 gap-5">
            <div style={{ mixBlendMode: 'screen' }}>
              <AnchorsArmyLogo className="w-35 md:w-45" />
            </div>
            <GoldDivider className="w-20" />
            <h2
              className="font-display font-semibold text-text-primary leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              {REGISTRATION.heading}
            </h2>
            <p className="font-sans text-text-secondary text-sm leading-relaxed max-w-md">
              {REGISTRATION.sub}
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <span className="micro-label px-4 py-2 border border-gold-muted text-gold-primary">
                {BRAND.batch}
              </span>
              <span className="micro-label px-4 py-2 border border-gold-muted text-gold-primary">
                {BRAND.totalSeats} Seats Only
              </span>
            </div>
          </div>
        </SectionReveal>

        {/* Form */}
        <SectionReveal delay={120}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name *">
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={set('fullName')}
                  required
                  className={input}
                />
              </Field>
              <Field label="Phone Number *">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={set('phone')}
                  required
                  className={input}
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="City *">
                <input
                  type="text"
                  placeholder="Your city"
                  value={form.city}
                  onChange={set('city')}
                  required
                  className={input}
                />
              </Field>
              <Field label="Years of Experience *">
                <div className="relative">
                  <select
                    value={form.experience}
                    onChange={set('experience')}
                    required
                    className={`${input} appearance-none pr-10 cursor-pointer`}
                  >
                    <option value="">Select experience</option>
                    {REGISTRATION.experienceOptions.map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </Field>
            </div>

            <Field label="Current Specialty *">
              <div className="relative">
                <select
                  value={form.specialty}
                  onChange={set('specialty')}
                  required
                  className={`${input} appearance-none pr-10 cursor-pointer`}
                >
                  <option value="">Select your specialty</option>
                  {REGISTRATION.specialties.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
            </Field>

            <Field label={`Why do you want to join the ${BRAND.name}? *`}>
              <textarea
                placeholder="Tell us about your anchoring journey and what you hope to gain from the 69 Anchors Army..."
                value={form.whyJoin}
                onChange={set('whyJoin')}
                required
                rows={5}
                className={`${input} resize-none`}
              />
            </Field>

            {/* Acknowledgement */}
            <label className="flex items-start gap-4 cursor-pointer group py-2">
              <button
                type="button"
                role="checkbox"
                aria-checked={form.ack}
                onClick={() => setForm(p => ({ ...p, ack: !p.ack }))}
                className="flex-none mt-0.5 w-5 h-5 border transition-all duration-200 flex items-center justify-center"
                style={{
                  borderColor: form.ack ? '#C8960C' : '#3A3A3A',
                  background: form.ack ? 'rgba(200,150,12,0.12)' : 'transparent',
                  boxShadow: form.ack ? '0 0 0 1px rgba(200,150,12,0.3)' : 'none',
                }}
              >
                {form.ack && (
                  <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3">
                    <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#C8960C" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className="font-sans text-sm text-text-secondary leading-relaxed">
                I understand this is a{' '}
                <span className="text-gold-primary font-semibold">{BRAND.investment}</span>
                {' '}investment and I am applying to join the{' '}
                <span className="text-text-primary">{BRAND.name}</span>.
              </span>
            </label>

            {error && (
              <p className="font-sans text-sm text-red-400 -mt-2">{error}</p>
            )}

            {/* Submit */}
            <div className="flex flex-col gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto sm:self-start"
                disabled={submitting}
              >
                {submitting ? 'Submitting Application...' : 'Submit Application →'}
              </Button>
              <p className="micro-label text-text-secondary">
                Applications reviewed within 24 hours · Confirmation sent to your phone.
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

function ChevronIcon() {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path d="M1 1l5 5 5-5" stroke="#C8960C" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
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

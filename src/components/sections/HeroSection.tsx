import Image from 'next/image'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import Button from '@/components/ui/Button'
import GoldDivider from '@/components/ui/GoldDivider'
import { BRAND, HERO } from '@/lib/content'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden bg-black"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Background image (Ken Burns) ─────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full animate-ken-burns">
          <Image
            src="/images/mentor-stage.jpg"
            alt="Anchor BB performing on stage"
            fill
            priority
            quality={90}
            className="object-cover object-[75%_center] md:object-[65%_20%]"
            sizes="100vw"
          />
        </div>
        {/* Vignette: strong left fade + bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.0) 100%), linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 35%)',
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto w-full px-6 md:px-12 py-32 md:py-0"
        style={{ maxWidth: 1200 }}
      >
        <div className="max-w-xl md:max-w-2xl flex flex-col items-start gap-6">

          {/* Micro label */}
          <div
            className="micro-label"
            style={{ animation: 'fade-up 0.5s ease-out 0.3s both' }}
          >
            {HERO.micro}
          </div>

          {/* Main logo — screen blend removes the PNG black background */}
          <div
            style={{
              animation: 'fade-up 0.7s ease-out 0.5s both',
              mixBlendMode: 'screen',
            }}
          >
            <AnchorsArmyLogo className="w-[260px] md:w-[380px] lg:w-[440px]" priority />
          </div>

          {/* Quote */}
          <p
            className="font-display italic text-text-secondary leading-snug"
            style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              animation: 'fade-up 0.6s ease-out 1.0s both',
            }}
          >
            {HERO.quote}
          </p>

          {/* Divider */}
          <div style={{ animation: 'fade-up 0.5s ease-out 1.2s both', width: '100%', maxWidth: 200 }}>
            <GoldDivider />
          </div>

          {/* Sub heading */}
          <p
            className="font-label font-semibold text-text-primary tracking-wide"
            style={{
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              animation: 'fade-up 0.6s ease-out 1.3s both',
            }}
          >
            {HERO.sub}
          </p>

          {/* Badges */}
          <div
            className="flex flex-wrap gap-3"
            style={{ animation: 'fade-up 0.6s ease-out 1.4s both' }}
          >
            {[BRAND.batch, BRAND.dates, BRAND.investment].map(text => (
              <span
                key={text}
                className="micro-label px-4 py-2 border border-gold-muted text-gold-primary bg-black/40"
              >
                {text}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mt-2"
            style={{ animation: 'fade-up 0.6s ease-out 1.6s both' }}
          >
            <Button href="#register" variant="primary" size="lg">
              {HERO.cta} →
            </Button>
            <Button href="#program" variant="ghost" size="lg">
              {HERO.ctaSecondary} ↓
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1))',
        }}
      />
    </section>
  )
}

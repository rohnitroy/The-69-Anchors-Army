import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import { MENTOR } from '@/lib/content'

export default function MentorSection() {
  return (
    <section id="mentor" className="relative bg-surface overflow-hidden">
      <div
        className="mx-auto px-6 md:px-12"
        style={{ maxWidth: 1200 }}
      >
        <div
          className="grid md:grid-cols-[480px_1fr] gap-0 items-stretch"
          style={{ minHeight: 700 }}
        >

          {/* ── Left: portrait ───────────────────────────────────────── */}
          <SectionReveal direction="left" className="relative hidden md:block">
            {/* Suppress brochure-page text; portrait area stays sharp */}
            <div
              className="absolute inset-0 z-5 pointer-events-none"
              style={{ background: 'rgba(0,0,0,0.35)' }}
            />
            {/* Right-edge fade to background */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to left, rgba(10,10,10,1) 0%, transparent 40%)',
              }}
            />
            {/* Top fade — crop any brochure header text */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, transparent 25%)',
              }}
            />
            <Image
              src="/images/mentor-deliverables.jpg"
              alt="Anchor BB — mentor"
              fill
              quality={85}
              className="object-cover object-[center_18%]"
              sizes="480px"
            />
          </SectionReveal>

          {/* ── Right: copy ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-center py-24 md:py-32 pl-0 md:pl-20">

            <SectionReveal>
              <div className="micro-label mb-8">{MENTOR.micro}</div>
            </SectionReveal>

            <SectionReveal delay={80}>
              <h2
                className="font-display font-semibold text-text-primary leading-tight mb-8"
                style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}
              >
                {MENTOR.heading}
              </h2>
            </SectionReveal>

            {/* Mobile image */}
            <SectionReveal delay={80} className="md:hidden mb-8">
              <div className="relative w-full h-72 overflow-hidden">
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                />
                <Image
                  src="/images/mentor-deliverables.jpg"
                  alt="Anchor BB"
                  fill
                  quality={75}
                  className="object-cover object-[center_18%]"
                  sizes="100vw"
                />
              </div>
            </SectionReveal>

            <SectionReveal delay={160}>
              <p
                className="font-sans text-text-secondary leading-relaxed max-w-lg mb-12"
                style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}
              >
                {MENTOR.bio}
              </p>
            </SectionReveal>

            {/* Authority stats */}
            <SectionReveal delay={240}>
              <div className="flex flex-wrap gap-8 mb-12">
                {MENTOR.stats.map(stat => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span
                      className="font-display font-semibold text-gold-bright leading-none"
                      style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}
                    >
                      {stat.value}
                    </span>
                    <span className="micro-label text-text-secondary">{stat.label}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={320}>
              <GoldDivider className="w-24 mb-5" />
              <p
                className="font-display italic text-gold-primary"
                style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}
              >
                — {MENTOR.signature}
              </p>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

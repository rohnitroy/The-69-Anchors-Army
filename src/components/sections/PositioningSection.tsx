import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import { POSITIONING } from '@/lib/content'

export default function PositioningSection() {
  return (
    <section id="positioning" className="relative bg-black overflow-hidden">
      <div className="mx-auto px-6 md:px-12" style={{ maxWidth: 1200 }}>
        <div className="grid md:grid-cols-[1fr_420px] gap-0 items-stretch" style={{ minHeight: 680 }}>

          {/* ── Left: copy ───────────────────────────────────────────── */}
          <div className="flex flex-col justify-center py-24 md:py-32 pr-0 md:pr-20">

            <SectionReveal>
              <div className="micro-label mb-8">{POSITIONING.micro}</div>
            </SectionReveal>

            <SectionReveal delay={80}>
              <blockquote
                className="font-display italic text-text-primary leading-tight mb-8"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                &ldquo;{POSITIONING.quote}&rdquo;
              </blockquote>
            </SectionReveal>

            <SectionReveal delay={160}>
              <p className="font-sans text-text-secondary leading-relaxed max-w-lg"
                 style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}>
                {POSITIONING.body}
              </p>
            </SectionReveal>

          </div>

          {/* ── Right: BB cut-out portrait (transparent PNG) ─────────── */}
          <SectionReveal direction="right" className="relative hidden md:block">
            {/* Subtle left-edge blend into section bg */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 20%)' }}
            />
            <Image
              src="/images/bb-palace-03.jpg"
              alt="Anchor BB"
              fill
              quality={90}
              className="object-cover object-[55%_15%]"
              sizes="420px"
            />
          </SectionReveal>

        </div>
      </div>
    </section>
  )
}

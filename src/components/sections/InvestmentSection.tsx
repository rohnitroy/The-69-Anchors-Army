'use client'

import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'
import { INVESTMENT } from '@/lib/content'
import { useModal } from '@/context/ModalContext'

export default function InvestmentSection() {
  const { openModal } = useModal()
  return (
    <section id="investment" className="relative bg-black overflow-hidden py-28 md:py-40">

      {/* Full-bleed event banner background — readable */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src="/images/event-promo-02.jpg"
          alt="The 69 Anchors Army — event details"
          fill
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
          style={{ opacity: 0.35 }}
        />
        {/* Radial vignette — keeps centre visible, darkens edges for text readability */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.88) 100%)' }}
        />
      </div>

      <div className="relative z-10 mx-auto px-6 md:px-12 text-center" style={{ maxWidth: 700 }}>

        <SectionReveal>
          <div className="micro-label mb-8">{INVESTMENT.micro}</div>
        </SectionReveal>

        <SectionReveal delay={80}>
          <GoldDivider className="w-24 mx-auto mb-10" />
        </SectionReveal>

        <SectionReveal delay={160}>
          <div
            className="font-display font-semibold leading-none mb-4 gold-shimmer-text-slow"
            style={{ fontSize: 'clamp(64px, 10vw, 112px)' }}
          >
            {INVESTMENT.amount}
          </div>
        </SectionReveal>

        <SectionReveal delay={240}>
          <p className="font-label font-semibold text-text-secondary tracking-widest mb-12"
             style={{ fontSize: 'clamp(11px, 1.2vw, 13px)' }}>
            {INVESTMENT.sub}
          </p>
        </SectionReveal>

        <SectionReveal delay={320}>
          <GoldDivider className="w-24 mx-auto mb-12" />
        </SectionReveal>

        <SectionReveal delay={400}>
          <p className="font-sans text-text-secondary text-sm leading-relaxed mb-12 max-w-md mx-auto">
            {INVESTMENT.disclaimer}
          </p>
        </SectionReveal>

        <SectionReveal delay={480}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={openModal} variant="primary" size="lg">
              {INVESTMENT.cta} →
            </Button>
          </div>
          <p className="micro-label text-text-secondary mt-5">
            {INVESTMENT.note}
          </p>
        </SectionReveal>

      </div>
    </section>
  )
}

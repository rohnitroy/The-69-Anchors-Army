'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'
import { useModal } from '@/context/ModalContext'

gsap.registerPlugin(ScrollTrigger)

export default function PromoSection() {
  const bgRef = useRef<HTMLDivElement>(null)
  const { openModal } = useModal()

  useEffect(() => {
    const el = bgRef.current
    if (!el) return
    const tween = gsap.fromTo(el,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true },
      }
    )
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 520 }}>

      {/* Full-bleed banner — event-promo-01 visible and readable */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-[-12%_0] w-full h-[124%]">
          <Image
            src="/images/event-promo-01.webp"
            alt="The 69 Anchors Army — event banner"
            fill
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Light cinematic overlay — keeps banner visible while text stays readable */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.65) 100%)' }}
        />
        {/* Subtle top/bottom fades */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.75) 100%)' }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-auto px-6 md:px-12 py-28 md:py-36 flex flex-col items-center text-center"
        style={{ maxWidth: 860 }}
      >
        <SectionReveal>
          <div className="micro-label text-gold-primary mb-8">— From The Stage —</div>
        </SectionReveal>

        <SectionReveal delay={80}>
          <blockquote
            className="font-display italic text-text-primary leading-tight mb-8"
            style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}
          >
            &ldquo;This is your official entry.
            <br className="hidden md:block" />
            {' '}Doors are now open.
            <br className="hidden md:block" />
            {' '}Let&rsquo;s begin.&rdquo;
          </blockquote>
        </SectionReveal>

        <SectionReveal delay={160}>
          <GoldDivider className="w-20 mb-8" />
          <p className="font-display italic text-gold-primary mb-10"
             style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}>
            — Anchor BB
          </p>
        </SectionReveal>

        <SectionReveal delay={240}>
          <Button onClick={openModal} variant="primary" size="lg">
            Request Admission →
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}

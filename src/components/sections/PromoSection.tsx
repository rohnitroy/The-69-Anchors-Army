'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function PromoSection() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return
    const tween = gsap.fromTo(el,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 520 }}>

      {/* Full-bleed background (GSAP parallax) */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-[-12%_0] w-full h-[124%]">
          <Image
            src="/images/event-promo-01.webp"
            alt=""
            fill
            quality={90}
            className="object-cover object-[center_20%]"
            sizes="100vw"
          />
        </div>
        {/* Deep purple-black cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(61,26,110,0.82) 0%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.95) 100%)',
          }}
        />
        {/* Gold radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(200,150,12,0.08) 0%, transparent 70%)',
          }}
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
          <p
            className="font-display italic text-gold-primary mb-10"
            style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}
          >
            — Anchor BB
          </p>
        </SectionReveal>

        <SectionReveal delay={240}>
          <Button href="#register" variant="primary" size="lg">
            Request Admission →
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}

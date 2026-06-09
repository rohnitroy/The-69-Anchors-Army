'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import { MENTOR } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export default function MentorSection() {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    const tween = gsap.fromTo(el,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true },
      }
    )
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  return (
    <section id="mentor" className="relative bg-surface overflow-hidden">
      <div className="mx-auto px-6 md:px-12" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-1 md:grid-cols-[480px_1fr] gap-0 items-stretch md:min-h-[700px]">

          {/* ── Left: portrait ───────────────────────────────────────────── */}
          <SectionReveal direction="left" className="relative hidden md:block overflow-hidden">
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 15%, transparent 80%, rgba(10,10,10,0.6) 100%)' }}
            />
            <div ref={imgRef} className="absolute inset-[-6%_0] w-full h-[112%]">
              <Image
                src="/images/bb-studio.jpg"
                alt="Anchor BB — Bhavaish R. Bhatijaa"
                fill
                quality={90}
                className="object-cover object-[60%_20%]"
                sizes="480px"
              />
            </div>
          </SectionReveal>

          {/* ── Right: copy ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-center py-8 md:py-32 pl-0 md:pl-20">

            <SectionReveal>
              <div className="micro-label mb-4">{MENTOR.micro}</div>
            </SectionReveal>

            <SectionReveal delay={60}>
              <h2
                className="font-display font-semibold text-text-primary leading-tight mb-1"
                style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
              >
                {MENTOR.heading}
              </h2>
              <p className="font-display italic text-gold-primary mb-8"
                 style={{ fontSize: 'clamp(15px, 1.5vw, 18px)' }}>
                {MENTOR.name}
              </p>
            </SectionReveal>

            {/* Mobile image */}
            <SectionReveal delay={80} className="md:hidden mb-8">
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src="/images/bb-studio.jpg"
                  alt="Anchor BB"
                  fill
                  quality={90}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            </SectionReveal>

            <SectionReveal delay={140}>
              <p className="font-sans text-text-secondary leading-relaxed max-w-lg mb-10"
                 style={{ fontSize: 'clamp(14px, 1.3vw, 16px)' }}>
                {MENTOR.bio}
              </p>
            </SectionReveal>

            {/* Stats */}
            <SectionReveal delay={200}>
              <div className="flex flex-wrap gap-8 mb-10">
                {MENTOR.stats.map(stat => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="font-display font-semibold text-gold-bright leading-none"
                          style={{ fontSize: 'clamp(26px, 2.8vw, 38px)' }}>
                      {stat.value}
                    </span>
                    <span className="micro-label text-text-secondary">{stat.label}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* Key highlights */}
            <SectionReveal delay={260}>
              <div className="mb-10">
                <GoldDivider className="w-20 mb-6" />
                <ul className="flex flex-col gap-3">
                  {MENTOR.highlights.map(h => (
                    <li key={h.label} className="flex items-start gap-3">
                      <span className="text-gold-primary mt-0.5 flex-none" style={{ fontSize: 13 }}>+</span>
                      <span className="font-sans text-text-secondary leading-relaxed"
                            style={{ fontSize: 'clamp(13px, 1.2vw, 15px)' }}>
                        {h.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            {/* Services */}
            <SectionReveal delay={320}>
              <div className="flex flex-wrap gap-2 mb-10">
                {MENTOR.services.map(s => (
                  <span
                    key={s}
                    className="micro-label px-3 py-1.5 border border-[rgba(200,150,12,0.2)] text-text-secondary"
                    style={{ fontSize: '9px' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={380}>
              <GoldDivider className="w-24 mb-5" />
              <p className="font-display italic text-gold-primary"
                 style={{ fontSize: 'clamp(18px, 1.8vw, 24px)' }}>
                — {MENTOR.signature}
              </p>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

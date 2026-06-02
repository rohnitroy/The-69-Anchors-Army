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
        <div className="grid md:grid-cols-[480px_1fr] gap-0 items-stretch" style={{ minHeight: 700 }}>

          {/* ── Left: transparent cut-out portrait ───────────────────── */}
          <SectionReveal direction="left" className="relative hidden md:block overflow-hidden">
            {/* Subtle left/bottom fade to blend cut-out into section */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 15%, transparent 80%, rgba(10,10,10,0.6) 100%)' }}
            />
            <div ref={imgRef} className="absolute inset-[-6%_0] w-full h-[112%]">
              <Image
                src="/images/mentor-deliverables.webp"
                alt="Anchor BB — mentor"
                fill
                quality={90}
                className="object-contain object-center"
                sizes="480px"
              />
            </div>
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
                <Image
                  src="/images/mentor-deliverables.webp"
                  alt="Anchor BB"
                  fill
                  quality={90}
                  className="object-contain object-center"
                  sizes="100vw"
                />
              </div>
            </SectionReveal>

            <SectionReveal delay={160}>
              <p className="font-sans text-text-secondary leading-relaxed max-w-lg mb-12"
                 style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}>
                {MENTOR.bio}
              </p>
            </SectionReveal>

            <SectionReveal delay={240}>
              <div className="flex flex-wrap gap-8 mb-12">
                {MENTOR.stats.map(stat => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="font-display font-semibold text-gold-bright leading-none"
                          style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                      {stat.value}
                    </span>
                    <span className="micro-label text-text-secondary">{stat.label}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={320}>
              <GoldDivider className="w-24 mb-5" />
              <p className="font-display italic text-gold-primary"
                 style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}>
                — {MENTOR.signature}
              </p>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

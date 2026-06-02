'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import Button from '@/components/ui/Button'
import GoldDivider from '@/components/ui/GoldDivider'
import { BRAND, HERO } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return
    const tween = gsap.to(el, {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden bg-black"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Background (GSAP parallax) ──────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-[-22%_0_0] w-full h-full animate-ken-burns">
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
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.0) 100%), linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 35%)',
          }}
        />
      </div>

      {/* ── Content (FM stagger) ─────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto w-full px-6 md:px-12 py-32 md:py-0"
        style={{ maxWidth: 1200 }}
      >
        <motion.div
          className="max-w-xl md:max-w-2xl flex flex-col items-start gap-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className="micro-label">
            {HERO.micro}
          </motion.div>

          <motion.div variants={item} style={{ mixBlendMode: 'screen' }}>
            <AnchorsArmyLogo className="w-65 md:w-95 lg:w-110" priority />
          </motion.div>

          <motion.p
            variants={item}
            className="font-display italic text-text-secondary leading-snug"
            style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
          >
            {HERO.quote}
          </motion.p>

          <motion.div variants={item} style={{ width: '100%', maxWidth: 200 }}>
            <GoldDivider />
          </motion.div>

          <motion.p
            variants={item}
            className="font-label font-semibold text-text-primary tracking-wide"
            style={{ fontSize: 'clamp(13px, 1.2vw, 15px)' }}
          >
            {HERO.sub}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            {[BRAND.batch, BRAND.dates, BRAND.investment].map(text => (
              <span
                key={text}
                className="micro-label px-4 py-2 border border-gold-muted text-gold-primary bg-black/40"
              >
                {text}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button href="#register" variant="primary" size="lg">
              {HERO.cta} →
            </Button>
            <Button href="#program" variant="ghost" size="lg">
              {HERO.ctaSecondary} ↓
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1))' }}
      />
    </section>
  )
}

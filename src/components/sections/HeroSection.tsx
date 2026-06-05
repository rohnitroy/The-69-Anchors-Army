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
import { useModal } from '@/context/ModalContext'

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

const SQUAD_DATES = [
  { label: 'Squad 1', date: 'Aug 8th & 9th · Checkout Aug 10th' },
  { label: 'Squad 2', date: 'Aug 10th & 11th · Checkout Aug 12th' },
  { label: 'Squad 3', date: 'Aug 17th & 18th · Checkout Aug 19th' },
  { label: 'Squad 4', date: 'Aug 19th & 20th · Checkout Aug 21st' },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const { openModal } = useModal()

  useEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    if (!section || !img) return

    const tween = gsap.fromTo(img,
      { y: 0 },
      {
        y: '12%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      }
    )
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center overflow-hidden bg-black"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Background image ─────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={imgRef}
          className="absolute inset-0"
          style={{
            willChange: 'transform',
            height: '115%',
            top: '-7.5%',
          }}
        >
          <Image
            src="/images/bb-palace.jpg"
            alt="Anchor BB at venue"
            fill
            priority
            unoptimized
            className="object-cover object-[70%_15%]"
            sizes="100vw"
          />
        </div>

        {/* Vignette — darkens left (text area) while letting image show on right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.28) 62%, rgba(0,0,0,0.05) 100%), linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 30%)',
          }}
        />
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto w-full px-6 md:px-12 py-32 md:py-0 flex items-center justify-start"
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

          <motion.div variants={item}>
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

          {/* Batch + Squad date chips */}
          <motion.div variants={item} className="flex flex-col gap-3">
            <span className="micro-label px-4 py-2 border border-gold-muted text-gold-primary bg-black/40 self-start">
              {BRAND.batch}
            </span>
            <div className="flex flex-col gap-1.5">
              {SQUAD_DATES.map(({ label, date }) => (
                <span
                  key={label}
                  className="group micro-label px-4 py-2 border border-[rgba(200,150,12,0.25)] text-[rgba(200,150,12,0.5)] hover:border-gold-muted hover:text-gold-primary bg-black/40 inline-flex items-center overflow-hidden cursor-default transition-colors duration-200 self-start"
                >
                  {label}
                  <span className="max-w-0 group-hover:max-w-75 overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    &ensp;·&ensp;{date}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button onClick={openModal} variant="primary" size="lg">
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

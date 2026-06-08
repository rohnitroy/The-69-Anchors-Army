'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '@/components/ui/Button'
import SlotChips from '@/components/ui/SlotChips'
import { HERO } from '@/lib/content'
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
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

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
      className="relative overflow-hidden bg-black"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Background image ─────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={imgRef}
          className="absolute inset-0"
          style={{ willChange: 'transform', height: '115%', top: '-7.5%' }}
        >
          <Image
            src="/images/mentor-stage.webp"
            alt="Anchor BB performing on stage"
            fill
            priority
            unoptimized
            className="object-cover object-[45%_center] sm:object-[60%_center] md:object-[72%_20%]"
            sizes="100vw"
          />
        </div>

        {/* Vignette — darker left for text, image visible on right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.88) 30%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.08) 80%, rgba(0,0,0,0.02) 100%), linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 35%)',
          }}
        />
      </div>

      {/* ── Content — positioned upper-left on desktop, lower on mobile ──────────── */}
      <div
        className="relative z-10 mx-auto w-full px-4 sm:px-6 md:px-12 flex justify-start"
        style={{ maxWidth: 1200, height: 'calc(100svh - 72px)', marginTop: 72 }}
      >
        <motion.div
          className="max-w-sm sm:max-w-xl md:max-w-2xl flex flex-col items-start gap-3 sm:gap-4 md:gap-6 absolute md:relative md:pt-0 bottom-0 pb-20 md:pb-0"
          style={{ top: 0 }}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
            <Button href="/secure-your-slot" variant="primary" size="lg">
              {HERO.cta} →
            </Button>
            <Button href="#program" variant="ghost" size="lg">
              {HERO.ctaSecondary} ↓
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-4 sm:mt-6">
            <p className="font-label text-text-secondary text-xs uppercase tracking-widest mb-3">Available Slots</p>
            <SlotChips />
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

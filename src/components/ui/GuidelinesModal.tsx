'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import MicSymbol from '@/components/logos/MicSymbol'
import GoldDivider from '@/components/ui/GoldDivider'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.3, ease: EASE },
  },
}

export default function GuidelinesModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Sync showing the modal with the main website Loader.
    // The loader runs for 2200ms on first load.
    const isFirstLoad = !sessionStorage.getItem('bb-army-loaded')
    const delay = isFirstLoad ? 2600 : 600

    const t = setTimeout(() => {
      setIsOpen(true)
    }, delay)

    return () => clearTimeout(t)
  }, [])

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop with premium blur */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative w-full max-w-4xl bg-[#080808] border border-gold-primary/20 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(200,150,12,0.15)] flex flex-col max-h-[90vh] md:max-h-[85vh] overflow-hidden z-10"
          >
            {/* Ambient luxury radial glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: 'radial-gradient(circle 350px at 50% -50px, rgba(200, 150, 12, 0.15), transparent 70%)',
              }}
            />

            {/* Close Button '✕' */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-text-secondary hover:text-gold-bright transition-colors duration-200 text-lg w-10 h-10 flex items-center justify-center rounded-full border border-border-subtle hover:border-gold-primary/40 bg-[#0C0C0C]/50 z-30 cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Header Content (Sticky/Static) */}
            <div className="flex flex-col items-center text-center gap-2 w-full pb-4 border-b border-border-subtle/40 relative z-10">
              <div className="flex items-center justify-center gap-3">
                <MicSymbol size={24} className="opacity-80" />
                <span className="micro-label tracking-[0.25em] text-[9px] md:text-[11px]">69 Anchors Army</span>
              </div>
              <h2 className="font-display text-2xl md:text-5xl font-semibold text-white tracking-wide mt-1">
                Official <span className="gold-shimmer-text">Guidelines &amp; Terms</span>
              </h2>
              <GoldDivider className="w-16 md:w-24 mt-1" />
            </div>

            {/* Scrollable Body Content */}
            <div className="overflow-y-auto flex-1 py-6 space-y-6 pr-1 relative z-10 scrollbar-thin">
              {/* Intro Text */}
              <p className="text-text-secondary font-sans text-xs md:text-base text-center max-w-xl mx-auto leading-relaxed">
                Welcome, Anchor. Before joining the elite ranks of Batch 1, please review and download our official code of conduct and registration policies below.
              </p>

              {/* Document Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Card 1: Do's and Don'ts */}
                <div className="flex flex-col justify-between bg-[#0C0C0C] border border-border-subtle rounded-xl p-6 hover:border-gold-primary/30 transition-all duration-300 group shadow-inner">
                  <div>
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-gold-tint flex items-center justify-center mb-4 border border-gold-primary/10">
                      <svg
                        className="w-5 h-5 text-gold-bright"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                    </div>
                    {/* Text */}
                    <h3 className="font-label text-base md:text-lg font-semibold tracking-wider text-white mb-2 group-hover:text-gold-bright transition-colors duration-200">
                      6 Do's &amp; 9 Don'ts
                    </h3>
                    <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-6 font-sans">
                      The core performance code, stage discipline, and execution standards required to succeed during this intensive two-day experience.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/pdf/The 69 Anchors Army_6 Do’s & 9 Don’ts.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 font-label text-[10px] md:text-xs font-semibold tracking-wider uppercase bg-[#111111] hover:bg-gold-primary hover:text-black text-gold-bright border border-gold-primary/30 hover:border-gold-primary transition-all duration-300 rounded cursor-pointer btn-shimmer"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View PDF
                    </a>
                    <a
                      href="/pdf/The 69 Anchors Army_6 Do’s & 9 Don’ts.pdf"
                      download="The 69 Anchors Army - 6 Do's & 9 Don'ts.pdf"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 font-label text-[10px] md:text-xs font-semibold tracking-wider uppercase bg-transparent hover:bg-border-subtle text-text-primary border border-border-subtle hover:border-text-secondary transition-all duration-300 rounded cursor-pointer"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </a>
                  </div>
                </div>

                {/* Card 2: Terms and Conditions */}
                <div className="flex flex-col justify-between bg-[#0C0C0C] border border-border-subtle rounded-xl p-6 hover:border-gold-primary/30 transition-all duration-300 group shadow-inner">
                  <div>
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-gold-tint flex items-center justify-center mb-4 border border-gold-primary/10">
                      <svg
                        className="w-5 h-5 text-gold-bright"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    {/* Text */}
                    <h3 className="font-label text-base md:text-lg font-semibold tracking-wider text-white mb-2 group-hover:text-gold-bright transition-colors duration-200">
                      Terms &amp; Conditions
                    </h3>
                    <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-6 font-sans">
                      Legal rules, payment structures, cancellation policies, and professional requirements for participants attending Batch 1.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/pdf/The 69 Anchors Army_Terms & Conditions.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 font-label text-[10px] md:text-xs font-semibold tracking-wider uppercase bg-[#111111] hover:bg-gold-primary hover:text-black text-gold-bright border border-gold-primary/30 hover:border-gold-primary transition-all duration-300 rounded cursor-pointer btn-shimmer"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View PDF
                    </a>
                    <a
                      href="/pdf/The 69 Anchors Army_Terms & Conditions.pdf"
                      download="The 69 Anchors Army - Terms & Conditions.pdf"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 font-label text-[10px] md:text-xs font-semibold tracking-wider uppercase bg-transparent hover:bg-border-subtle text-text-primary border border-border-subtle hover:border-text-secondary transition-all duration-300 rounded cursor-pointer"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Dismiss Action (Sticky/Static) */}
            <div className="flex flex-col items-center gap-2 w-full pt-4 relative z-10 border-t border-border-subtle/40 mt-auto">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center px-8 py-3.5 font-label font-bold text-xs tracking-[0.2em] uppercase bg-gold-primary hover:bg-gold-bright text-black border border-gold-primary hover:border-gold-bright transition-all duration-300 rounded cursor-pointer btn-shimmer"
              >
                I Understand &amp; Agree
              </button>
              <p className="text-[10px] text-text-secondary/60 tracking-wider uppercase font-sans mt-1">
                By entering, you agree to comply with the guidelines &amp; terms.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

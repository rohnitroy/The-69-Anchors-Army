'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type LegalModalType = 'privacy' | 'terms'

type LegalModalProps = {
  type: LegalModalType
  isOpen: boolean
  onClose: () => void
}

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    summary: [
      'We collect your information to process event registration and communicate event updates.',
      'Your data is used only for legal purposes and event management.',
      'We implement industry-standard security to protect your information.',
      'You have the right to access, correct, or request deletion of your data.',
      'All data is retained for legal and accounting purposes.',
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    summary: [
      'By registering, you confirm you are 18+ and all information is accurate.',
      'Payments are non-refundable except in case of event cancellation.',
      'You agree to follow our code of conduct and respect all participants.',
      'We may photograph/film the event for promotional purposes.',
      'We reserve the right to cancel or modify events due to unforeseen circumstances.',
    ],
  },
}

export default function LegalModal({ type, isOpen, onClose }: LegalModalProps) {
  const content = CONTENT[type]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#333] bg-[#0a0a0a]">
              <h2 className="text-2xl font-bold text-white">{content.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6 space-y-4">
              <p className="text-gray-300 leading-relaxed">
                This is a summary of our {content.title.toLowerCase()}. Please review carefully before proceeding.
              </p>

              <ul className="space-y-3">
                {content.summary.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-[#C8960C] flex-shrink-0 mt-1">•</span>
                    <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-[#333]">
                <p className="text-xs text-gray-500 mb-3">
                  For the complete {content.title.toLowerCase()}, visit our dedicated page:
                </p>
                <Link
                  href={`/${type}`}
                  target="_blank"
                  className="text-[#C8960C] hover:text-[#B08608] font-semibold text-sm"
                >
                  Read Full {content.title} →
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-[#333] bg-[#0a0a0a]">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 text-sm font-semibold bg-[#C8960C] text-black rounded hover:bg-[#B08608] transition-colors"
              >
                I Agree & Continue
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 text-sm font-semibold bg-[#242424] text-white rounded hover:bg-[#333] transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

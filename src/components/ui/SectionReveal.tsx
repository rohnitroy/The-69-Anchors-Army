'use client'

import { motion } from 'framer-motion'

const VARIANTS = {
  up:    { hidden: { opacity: 0, y: 36 },        visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 },       visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },        visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 },  visible: { opacity: 1, scale: 1 } },
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface Props {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right' | 'scale'
  delay?: number
  threshold?: number
}

export default function SectionReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  threshold = 0.12,
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={VARIANTS[direction]}
      transition={{ duration: 0.7, ease: EASE, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}

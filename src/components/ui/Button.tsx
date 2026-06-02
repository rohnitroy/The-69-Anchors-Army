'use client'

import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

type BaseProps = {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

// Omit drag event handlers that conflict with Framer Motion's own drag types
type SafeAnchorRest = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver'
>
type SafeButtonRest = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd'
>

type ButtonProps = BaseProps & SafeButtonRest & { href?: undefined }
type AnchorProps = BaseProps & SafeAnchorRest & { href: string }

type Props = ButtonProps | AnchorProps

const variantStyles = {
  primary: [
    'relative overflow-hidden',
    'bg-gold-primary text-black',
    'border border-gold-primary',
    'hover:bg-gold-bright hover:border-gold-bright',
    'btn-shimmer',
  ].join(' '),
  ghost: [
    'relative overflow-hidden',
    'bg-transparent text-gold-primary',
    'border border-gold-primary',
    'hover:bg-gold-primary hover:text-black',
    'btn-shimmer',
  ].join(' '),
  outline: [
    'bg-transparent text-text-primary',
    'border border-border-subtle',
    'hover:border-gold-primary hover:text-gold-primary',
  ].join(' '),
}

const sizes = {
  sm: 'px-5 py-2.5 text-xs tracking-[0.18em]',
  md: 'px-7 py-3.5 text-xs tracking-[0.2em]',
  lg: 'px-10 py-4 text-sm tracking-[0.2em]',
}

const tap = { scale: 0.96 }
const hover = { scale: 1.03 }
const spring = { duration: 0.12 }

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  href,
  ...rest
}: Props) {
  const base = [
    'inline-flex items-center justify-center gap-3',
    'font-label font-semibold uppercase',
    'transition-colors duration-300',
    'cursor-pointer select-none',
    variantStyles[variant],
    sizes[size],
    className,
  ].join(' ')

  if (href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (
      <motion.a
        href={href}
        className={base}
        whileHover={hover}
        whileTap={tap}
        transition={spring}
        {...(rest as any)}
      >
        {children}
      </motion.a>
    )
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <motion.button
      className={base}
      whileHover={hover}
      whileTap={tap}
      transition={spring}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  )
}

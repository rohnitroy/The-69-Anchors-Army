import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'

type BaseProps = {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type Props = ButtonProps | AnchorProps

const variants = {
  primary: [
    'relative overflow-hidden',
    'bg-gold-primary text-black',
    'border border-gold-primary',
    'hover:bg-gold-bright hover:border-gold-bright',
    'active:scale-[0.97]',
    'btn-shimmer',
  ].join(' '),
  ghost: [
    'relative overflow-hidden',
    'bg-transparent text-gold-primary',
    'border border-gold-primary',
    'hover:bg-gold-primary hover:text-black',
    'active:scale-[0.97]',
    'btn-shimmer',
  ].join(' '),
  outline: [
    'bg-transparent text-text-primary',
    'border border-border-subtle',
    'hover:border-gold-primary hover:text-gold-primary',
    'active:scale-[0.97]',
  ].join(' '),
}

const sizes = {
  sm: 'px-5 py-2.5 text-xs tracking-[0.18em]',
  md: 'px-7 py-3.5 text-xs tracking-[0.2em]',
  lg: 'px-10 py-4 text-sm tracking-[0.2em]',
}

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
    'transition-all duration-300',
    'cursor-pointer select-none',
    variants[variant],
    sizes[size],
    className,
  ].join(' ')

  if (href !== undefined) {
    return (
      <a href={href} className={base} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={base} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}

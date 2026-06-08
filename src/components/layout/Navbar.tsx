'use client'

import { useEffect, useState } from 'react'
import BolBBBolLogo from '@/components/logos/BolBBBolLogo'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(0,0,0,0.92)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,150,12,0.15)' : '1px solid transparent',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-6 md:px-12"
        style={{ maxWidth: 1200, height: 72 }}
      >
        {/* Logo */}
        <a href="/" className="block transition-opacity duration-300 hover:opacity-80">
          <BolBBBolLogo className="w-[140px] md:w-[160px]" priority />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#mentor">About BB</NavLink>
          <NavLink href="#program">The Program</NavLink>
          <NavLink href="#investment">Investment</NavLink>
          <Button href="/secure-your-slot" variant="primary" size="sm" className="ml-2">
            Secure Your Slot →
          </Button>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden">
          <Button href="/secure-your-slot" variant="primary" size="sm">
            Secure Slot →
          </Button>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="font-label text-[11px] font-semibold tracking-[0.18em] uppercase text-text-secondary hover:text-gold-primary transition-colors duration-200"
    >
      {children}
    </a>
  )
}

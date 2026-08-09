'use client'

import { useEffect, useState } from 'react'
import BolBBBolLogo from '@/components/logos/BolBBBolLogo'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

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
          <NavLink href="/pdf/The%2069%20Anchors%20Army_ITINERARY%20Squad%20B.pdf" target="_blank">Squad B Itinerary</NavLink>
          <Button href="/secure-your-slot" variant="primary" size="sm" className="ml-2">
            Secure Your Slot →
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gold-primary hover:text-gold-secondary transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] z-40 bg-black/98 border-b border-gold-primary/15 backdrop-blur-lg max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="px-6 py-6 space-y-1">
            <MobileNavLink href="#mentor" onClick={closeMobileMenu}>
              About BB
            </MobileNavLink>
            <MobileNavLink href="#program" onClick={closeMobileMenu}>
              The Program
            </MobileNavLink>
            <MobileNavLink href="#investment" onClick={closeMobileMenu}>
              Investment
            </MobileNavLink>
            <MobileNavLink href="/pdf/The%2069%20Anchors%20Army_ITINERARY%20Squad%20B.pdf" target="_blank" onClick={closeMobileMenu}>
              Squad B Itinerary
            </MobileNavLink>
            <div className="pt-4 mt-4 border-t border-gold-primary/15">
              <Button href="/secure-your-slot" variant="primary" size="sm" className="w-full" onClick={closeMobileMenu}>
                Secure Your Slot →
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children, target }: { href: string; children: React.ReactNode; target?: string }) {
  return (
    <a
      href={href}
      target={target}
      className="font-label text-[11px] font-semibold tracking-[0.18em] uppercase text-text-secondary hover:text-gold-primary transition-colors duration-200"
    >
      {children}
    </a>
  )
}

function MobileNavLink({
  href,
  children,
  target,
  onClick
}: {
  href: string
  children: React.ReactNode
  target?: string
  onClick?: () => void
}) {
  return (
    <a
      href={href}
      target={target}
      onClick={onClick}
      className="block font-label text-sm font-semibold tracking-[0.18em] uppercase text-text-secondary hover:text-gold-primary transition-colors duration-200 py-2"
    >
      {children}
    </a>
  )
}

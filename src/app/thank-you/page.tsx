import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Slot Confirmed — 69 Anchors Army',
}

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen flex items-center justify-center px-6 py-32"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(200,150,12,0.08) 0%, transparent 70%), #000',
        }}
      >
        <div className="flex flex-col items-center text-center gap-7 max-w-lg">

          <AnchorsArmyLogo className="w-[180px] md:w-[220px]" />

          <GoldDivider className="w-24" />

          <h1
            className="font-display font-semibold text-text-primary leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            Your Slot is Confirmed
          </h1>

          <p className="font-sans text-text-secondary leading-relaxed"
             style={{ fontSize: 'clamp(15px, 1.5vw, 17px)' }}>
            Welcome to the{' '}
            <span className="text-gold-primary font-semibold">69 Anchors Army</span>.
            Your squad slot has been locked in. You will receive confirmation details
            on the phone number and email you provided.
          </p>

          <GoldDivider className="w-16" />

          <p className="font-display italic text-text-secondary"
             style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}>
            &ldquo;baat karne se baat banti hai&rdquo;
          </p>

          <div className="flex gap-4 flex-wrap justify-center mt-4">
            <Button href="/" variant="ghost" size="md">
              ← Back to Home
            </Button>
            <Button href="https://instagram.com/bolbbbol" variant="outline" size="md">
              Follow @bolbbbol
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

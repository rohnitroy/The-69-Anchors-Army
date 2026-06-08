import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SecureYourSlotSection from '@/components/sections/SecureYourSlotSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure Your Slot — 69 Anchors Army',
  description: 'Register and secure your spot in the 69 Anchors Army. Choose your squad dates, payment mode, and complete your registration.',
}

export default function SecureYourSlotPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <SecureYourSlotSection />
      </main>
      <Footer />
    </>
  )
}

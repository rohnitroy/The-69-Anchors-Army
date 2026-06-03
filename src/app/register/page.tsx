import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RegistrationSection from '@/components/sections/RegistrationSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Select Your Squad — 69 Anchors Army',
  description: 'Secure your slot in the 69 Anchors Army. Batch 1 · 24 seats per squad.',
}

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <RegistrationSection />
      </main>
      <Footer />
    </>
  )
}

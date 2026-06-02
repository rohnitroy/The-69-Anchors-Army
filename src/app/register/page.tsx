import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RegistrationSection from '@/components/sections/RegistrationSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply for Admission — 69 Anchors Army',
  description: 'Apply to join the 69 Anchors Army. Batch 1 · Only 69 seats available.',
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

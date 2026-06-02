import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Marquee from '@/components/ui/Marquee'
import HeroSection from '@/components/sections/HeroSection'
import PositioningSection from '@/components/sections/PositioningSection'
import MentorSection from '@/components/sections/MentorSection'
import ProgramSection from '@/components/sections/ProgramSection'
import DeliverablesSection from '@/components/sections/DeliverablesSection'
import InclusionsSection from '@/components/sections/InclusionsSection'
import InvestmentSection from '@/components/sections/InvestmentSection'
import PromoSection from '@/components/sections/PromoSection'
import RegistrationSection from '@/components/sections/RegistrationSection'

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* 01 — Hero */}
        <HeroSection />

        {/* Marquee band */}
        <Marquee />

        {/* 02 — Positioning */}
        <PositioningSection />

        {/* 03 — Mentor */}
        <MentorSection />

        {/* 04 — Program */}
        <ProgramSection />

        {/* 05 — Deliverables */}
        <DeliverablesSection />

        {/* Marquee band */}
        <Marquee />

        {/* Cinematic promo break — BB quote + event-promo-01 full bleed */}
        <PromoSection />

        {/* 06 — Inclusions */}
        <InclusionsSection />

        {/* 07 — Investment */}
        <InvestmentSection />

        {/* 08 — Registration */}
        <RegistrationSection />
      </main>

      <Footer />
    </>
  )
}

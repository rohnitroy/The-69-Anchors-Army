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

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <Marquee />
        <PositioningSection />
        <MentorSection />
        <ProgramSection />
        <DeliverablesSection />
        <Marquee />
        <PromoSection />
        <InclusionsSection />
        <InvestmentSection />
      </main>

      <Footer />
    </>
  )
}

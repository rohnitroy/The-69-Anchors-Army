import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Marquee from '@/components/ui/Marquee'
import HeroSection from '@/components/sections/HeroSection'
import PositioningSection from '@/components/sections/PositioningSection'
import MentorSection from '@/components/sections/MentorSection'
import ProgramSection from '@/components/sections/ProgramSection'
import DeliverablesSection from '@/components/sections/DeliverablesSection'
import InclusionsSection from '@/components/sections/InclusionsSection'
import PromoSection from '@/components/sections/PromoSection'
import GuidelinesModal from '@/components/ui/GuidelinesModal'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <GuidelinesModal />

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
      </main>

      <Footer />
    </>
  )
}

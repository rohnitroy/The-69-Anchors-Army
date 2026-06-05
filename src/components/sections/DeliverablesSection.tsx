import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import DeliverableCard from '@/components/ui/DeliverableCard'
import GoldDivider from '@/components/ui/GoldDivider'
import { DELIVERABLES } from '@/lib/content'

export default function DeliverablesSection() {
  return (
    <section id="deliverables" className="relative bg-black overflow-hidden">

      <div className="mx-auto px-6 md:px-12 pb-28 md:pb-36 pt-0" style={{ maxWidth: 1200 }}>

        {/* Thin gold separator from ProgramSection */}
        <div className="mb-16 md:mb-20">
          <GoldDivider className="w-24 mx-auto" />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <SectionReveal>
            <h2 className="font-display font-semibold text-text-primary leading-tight mb-5"
                style={{ fontSize: 'clamp(32px, 4.5vw, 64px)' }}>
              {DELIVERABLES.heading}
            </h2>
          </SectionReveal>
          <SectionReveal delay={80}>
            <GoldDivider className="w-24 mx-auto" />
          </SectionReveal>
        </div>

        {/* Cards + side portrait */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-px bg-border-subtle items-stretch">

          {/* Cards column */}
          <div className="grid md:grid-cols-3 gap-px bg-border-subtle">
            {DELIVERABLES.items.map((item, i) => (
              <SectionReveal key={item.number} delay={i * 120} className="bg-[#080808]">
                <DeliverableCard {...item} />
              </SectionReveal>
            ))}
          </div>

          {/* Side portrait */}
          <SectionReveal direction="right" className="relative hidden lg:block bg-[#080808] overflow-hidden">
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 30%)' }}
            />
            <Image
              src="/images/mentor-entry.webp"
              alt="Anchor BB"
              fill
              quality={90}
              className="object-contain object-center"
              sizes="280px"
            />
          </SectionReveal>

        </div>
      </div>
    </section>
  )
}

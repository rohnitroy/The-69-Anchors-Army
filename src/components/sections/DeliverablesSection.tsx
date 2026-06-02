import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import DeliverableCard from '@/components/ui/DeliverableCard'
import GoldDivider from '@/components/ui/GoldDivider'
import { DELIVERABLES } from '@/lib/content'

export default function DeliverablesSection() {
  return (
    <section id="deliverables" className="relative bg-surface overflow-hidden">

      {/* Subtle ambient gold glow — top-left */}
      <div
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse at top left, rgba(200,150,12,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto px-6 md:px-12 py-28 md:py-36" style={{ maxWidth: 1200 }}>

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <SectionReveal>
            <div className="micro-label mb-6">{DELIVERABLES.micro}</div>
          </SectionReveal>
          <SectionReveal delay={80}>
            <h2
              className="font-display font-semibold text-text-primary leading-tight mb-5"
              style={{ fontSize: 'clamp(32px, 4.5vw, 64px)' }}
            >
              {DELIVERABLES.heading}
            </h2>
          </SectionReveal>
          <SectionReveal delay={160}>
            <GoldDivider className="w-24 mx-auto" />
          </SectionReveal>
        </div>

        {/* Cards + side portrait */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-px bg-border-subtle items-stretch">

          {/* Cards column */}
          <div className="grid md:grid-cols-3 gap-px bg-border-subtle">
            {DELIVERABLES.items.map((item, i) => (
              <SectionReveal key={item.number} delay={i * 120} className="bg-surface-2">
                <DeliverableCard {...item} />
              </SectionReveal>
            ))}
          </div>

          {/* Side portrait — mentor-modules.jpg (BB in gold sherwani) */}
          <SectionReveal direction="right" className="relative hidden lg:block bg-surface-2">
            {/* Text suppressor */}
            <div
              className="absolute inset-0 z-5 pointer-events-none"
              style={{ background: 'rgba(10,10,10,0.45)' }}
            />
            {/* Left-edge blend */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(10,10,10,1) 0%, transparent 35%)',
              }}
            />
            {/* Top fade */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, transparent 25%)',
              }}
            />
            <Image
              src="/images/mentor-modules.jpg"
              alt="Anchor BB — gold sherwani"
              fill
              quality={75}
              className="object-cover object-[35%_15%]"
              sizes="280px"
            />
          </SectionReveal>

        </div>
      </div>
    </section>
  )
}

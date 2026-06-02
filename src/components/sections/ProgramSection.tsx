import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import ModuleCard from '@/components/ui/ModuleCard'
import GoldDivider from '@/components/ui/GoldDivider'
import { PROGRAM } from '@/lib/content'

export default function ProgramSection() {
  const visibleModules = PROGRAM.modules.slice(0, 4)
  const hiddenCount = PROGRAM.modules.length - visibleModules.length

  return (
    <section id="program" className="relative bg-black overflow-hidden py-28 md:py-36">

      {/* Background: right-side portrait strip, fades out left */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Image pinned to the far right — shows BB without brochure text area */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2">
          <Image
            src="/images/mentor-modules.jpg"
            alt=""
            fill
            quality={60}
            className="object-cover object-[30%_20%]"
            sizes="50vw"
            style={{ opacity: 0.18 }}
          />
        </div>
        {/* Full overlay — heavier on the left, fades toward right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 40%, rgba(0,0,0,0.82) 70%, rgba(0,0,0,0.88) 100%), linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto px-6 md:px-12" style={{ maxWidth: 1200 }}>

        {/* Header */}
        <div className="text-center mb-20">
          <SectionReveal>
            <div className="micro-label mb-6">{PROGRAM.micro}</div>
          </SectionReveal>

          <SectionReveal delay={80}>
            <h2
              className="font-display font-semibold text-text-primary leading-tight mb-5"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            >
              {PROGRAM.heading}
            </h2>
          </SectionReveal>

          <SectionReveal delay={160}>
            <GoldDivider className="w-32 mx-auto mb-5" />
            <p className="font-sans text-text-secondary" style={{ fontSize: 'clamp(14px, 1.3vw, 16px)' }}>
              {PROGRAM.sub}
            </p>
          </SectionReveal>
        </div>

        {/* Module grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border-subtle stagger">
          {visibleModules.map((mod, i) => (
            <SectionReveal key={mod.number} delay={i * 100} className="bg-black">
              <ModuleCard {...mod} />
            </SectionReveal>
          ))}
        </div>

        {/* "Plus more" row */}
        {hiddenCount > 0 && (
          <SectionReveal delay={400}>
            <div className="mt-8 text-center">
              <span className="micro-label text-text-secondary">
                + {hiddenCount} more exclusive sessions revealed at the event
              </span>
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  )
}

import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import ModuleCard from '@/components/ui/ModuleCard'
import { PROGRAM } from '@/lib/content'

export default function ProgramSection() {
  const visibleModules = PROGRAM.modules.slice(0, 4)

  return (
    <section id="program" className="relative bg-black overflow-hidden py-28 md:py-36">

      {/* Background: right-side portrait strip */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute right-0 top-0 bottom-0 w-1/2">
          <Image
            src="/images/bb-yellow-arms.jpg"
            alt=""
            fill
            quality={90}
            className="object-cover object-[50%_20%]"
            sizes="50vw"
            style={{ opacity: 0.15 }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 40%, rgba(0,0,0,0.82) 70%, rgba(0,0,0,0.88) 100%), linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto px-6 md:px-12" style={{ maxWidth: 1200 }}>

        {/* Module grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border-subtle stagger">
          {visibleModules.map((mod, i) => (
            <SectionReveal key={mod.number} delay={i * 100} className="bg-black">
              <ModuleCard {...mod} />
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  )
}

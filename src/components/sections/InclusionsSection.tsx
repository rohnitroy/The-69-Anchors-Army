import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import InclusionItem from '@/components/ui/InclusionItem'
import { INCLUSIONS } from '@/lib/content'

export default function InclusionsSection() {
  return (
    <section id="inclusions" className="relative bg-black overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <div className="grid md:grid-cols-2 items-stretch" style={{ minHeight: 700 }}>

          {/* ── Left: sticky BB portrait */}
          <div className="relative hidden md:block">
            <div className="sticky top-0 h-screen max-h-195 overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
              <Image
                src="/images/bb-pavilion.jpg"
                alt="Anchor BB"
                fill
                quality={90}
                className="object-cover object-[65%_15%]"
                sizes="50vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.5) 100%)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.4) 100%)' }}
              />
            </div>
          </div>

          {/* ── Right: content ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-center py-24 md:py-32 px-6 md:pl-16 md:pr-12">

            {/* Mobile image */}
            <div className="relative md:hidden w-full aspect-[4/5] mb-10 overflow-hidden bg-[#0a0a0a] rounded-lg">
              <Image
                src="/images/bb-pavilion.jpg"
                alt="Anchor BB"
                fill
                quality={90}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>

            <SectionReveal>
              <h2
                className="font-display font-semibold text-text-primary leading-tight mb-10"
                style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
              >
                {INCLUSIONS.heading}
              </h2>
            </SectionReveal>

            <div>
              {INCLUSIONS.items.map((item, i) => (
                <SectionReveal key={item.title} delay={80 + i * 80}>
                  <InclusionItem {...item} />
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

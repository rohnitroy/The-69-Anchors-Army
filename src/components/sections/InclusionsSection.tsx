import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import InclusionItem from '@/components/ui/InclusionItem'
import { INCLUSIONS } from '@/lib/content'

export default function InclusionsSection() {
  return (
    <section id="inclusions" className="relative bg-black overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <div className="grid md:grid-cols-2 items-stretch" style={{ minHeight: 700 }}>

          {/* ── Left: sticky image (mentor-entrycontent — program document) */}
          <div className="relative hidden md:block">
            <div className="sticky top-0 h-screen max-h-195 overflow-hidden flex items-center justify-center bg-surface-2">
              <Image
                src="/images/mentor-entrycontent.webp"
                alt="The 69 Anchors Army — program details"
                fill
                quality={90}
                className="object-contain object-center"
                sizes="50vw"
              />
              {/* Subtle edge fades to blend with section */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.6) 100%)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.5) 100%)' }}
              />
            </div>
          </div>

          {/* ── Right: content ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-center py-24 md:py-32 px-6 md:pl-16 md:pr-12">

            {/* Mobile image */}
            <div className="relative md:hidden w-full h-64 mb-10 overflow-hidden bg-surface-2">
              <Image
                src="/images/mentor-entrycontent.webp"
                alt="Program details"
                fill
                quality={90}
                className="object-contain object-center"
                sizes="100vw"
              />
            </div>

            <SectionReveal>
              <div className="micro-label mb-6">{INCLUSIONS.micro}</div>
            </SectionReveal>

            <SectionReveal delay={80}>
              <h2
                className="font-display font-semibold text-text-primary leading-tight mb-10"
                style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
              >
                {INCLUSIONS.heading}
              </h2>
            </SectionReveal>

            <div>
              {INCLUSIONS.items.map((item, i) => (
                <SectionReveal key={item.title} delay={160 + i * 80}>
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

import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import InclusionItem from '@/components/ui/InclusionItem'
import { INCLUSIONS } from '@/lib/content'

export default function InclusionsSection() {
  return (
    <section id="inclusions" className="relative bg-black overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <div className="grid md:grid-cols-2 items-stretch" style={{ minHeight: 700 }}>

          {/* ── Left: sticky image ───────────────────────────────────── */}
          <div className="relative hidden md:block">
            <div className="sticky top-0 h-screen max-h-195 overflow-hidden">
              <Image
                src="/images/mentor-inclusions.webp"
                alt="Luxury venue — included in your investment"
                fill
                quality={90}
                className="object-cover object-[center_25%]"
                sizes="50vw"
              />
              {/* Suppress brochure-page text while keeping BB visible */}
              <div
                className="absolute inset-0 z-5 pointer-events-none"
                style={{ background: 'rgba(0,0,0,0.42)' }}
              />
              {/* Top fade — removes any header text */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 22%)',
                }}
              />
              {/* Right-edge fade into content */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, transparent 28%)',
                }}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 20%)',
                }}
              />
            </div>
          </div>

          {/* ── Right: content ────────────────────────────────────────── */}
          <div className="flex flex-col justify-center py-24 md:py-32 px-6 md:pl-16 md:pr-12">

            {/* Mobile image */}
            <div className="relative md:hidden w-full h-64 mb-10 overflow-hidden">
              <Image
                src="/images/mentor-inclusions.webp"
                alt="Luxury venue"
                fill
                quality={90}
                className="object-cover object-center"
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

            {/* Inclusion list */}
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

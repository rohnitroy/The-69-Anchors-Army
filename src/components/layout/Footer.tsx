import BolBBBolLogo from '@/components/logos/BolBBBolLogo'
import MicSymbol from '@/components/logos/MicSymbol'
import GoldDivider from '@/components/ui/GoldDivider'
import { FOOTER } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border-subtle">
      <div
        className="mx-auto px-6 md:px-12 py-16 flex flex-col items-center gap-8 text-center"
        style={{ maxWidth: 1200 }}
      >
        <BolBBBolLogo className="w-[160px] md:w-[200px]" />

        <GoldDivider className="w-32" />

        <p className="font-display italic text-text-secondary"
           style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}>
          &ldquo;{FOOTER.tagline}&rdquo;
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {FOOTER.links.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="micro-label text-text-secondary hover:text-gold-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {FOOTER.socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="micro-label text-text-secondary hover:text-gold-primary transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Social + copyright */}
        <div className="flex flex-col items-center gap-3 pt-4 border-t border-border-subtle w-full">
          <MicSymbol size={20} className="opacity-40" />
          <p className="font-label text-[11px] text-text-secondary tracking-widest">
            {FOOTER.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

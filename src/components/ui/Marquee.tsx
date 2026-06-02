import { MARQUEE_TEXT } from '@/lib/content'

interface Props {
  className?: string
  text?: string
}

export default function Marquee({ className = '', text = MARQUEE_TEXT }: Props) {
  const repeated = text.repeat(4)

  return (
    <div
      className={`relative overflow-hidden py-3.5 border-y border-gold-muted bg-black ${className}`}
      aria-hidden
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Two identical spans to create seamless loop */}
        <span className="flex-none font-label text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-primary pr-0">
          {repeated}
        </span>
        <span className="flex-none font-label text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-primary pr-0">
          {repeated}
        </span>
      </div>
    </div>
  )
}

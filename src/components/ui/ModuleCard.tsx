interface Props {
  number: string
  title: string
  desc: string
  delay?: number
}

export default function ModuleCard({ number, title, desc }: Props) {
  return (
    <div className="card-gold-hover group flex flex-col gap-4 p-8 border-t border-gold-muted bg-surface h-full">
      <div
        className="font-display font-semibold leading-none select-none"
        style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: 'rgba(200,150,12,0.18)' }}
        aria-hidden
      >
        {number}
      </div>

      <h3 className="font-display font-semibold text-text-primary leading-tight"
          style={{ fontSize: 'clamp(18px, 1.8vw, 22px)' }}>
        {title}
      </h3>

      <p className="font-sans text-text-secondary leading-relaxed text-sm flex-1">
        {desc}
      </p>

      <div className="w-8 h-px bg-gold-primary transition-all duration-300 group-hover:w-16" />
    </div>
  )
}

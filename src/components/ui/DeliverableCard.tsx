interface Props {
  number: string
  title: string
  desc: string
  badge: string
}

export default function DeliverableCard({ number, title, desc, badge }: Props) {
  return (
    <div className="card-gold-hover group relative flex flex-col gap-5 p-8 border-t-2 border-gold-primary bg-surface h-full">
      {/* Badge */}
      <div className="absolute top-6 right-6">
        <span className="micro-label px-3 py-1.5 border border-gold-muted text-gold-deep">
          {badge}
        </span>
      </div>

      {/* Number */}
      <div className="micro-label text-gold-primary">{number}</div>

      {/* Title */}
      <h3 className="font-display font-semibold text-text-primary leading-tight pr-16"
          style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}>
        {title}
      </h3>

      {/* Desc */}
      <p className="font-sans text-text-secondary leading-relaxed text-sm flex-1">
        {desc}
      </p>

      {/* Hover line */}
      <div className="w-8 h-px bg-gold-primary transition-all duration-300 group-hover:w-20" />
    </div>
  )
}

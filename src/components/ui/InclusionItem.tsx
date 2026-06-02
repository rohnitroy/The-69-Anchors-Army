interface Props {
  title: string
  desc: string
}

export default function InclusionItem({ title, desc }: Props) {
  return (
    <div className="flex gap-5 py-5 border-b border-border-subtle last:border-0 group">
      <div
        className="flex-none text-gold-primary mt-0.5 transition-transform duration-300 group-hover:scale-110"
        aria-hidden
      >
        ✦
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-label font-semibold text-sm text-text-primary tracking-wide">
          {title}
        </span>
        <span className="font-sans text-sm text-text-secondary leading-relaxed">
          {desc}
        </span>
      </div>
    </div>
  )
}

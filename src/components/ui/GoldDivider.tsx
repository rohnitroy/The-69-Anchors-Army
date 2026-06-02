interface Props {
  className?: string
  ornament?: string
}

export default function GoldDivider({ className = '', ornament = '✦' }: Props) {
  return (
    <div className={`ornament-line ${className}`}>
      <span
        className="text-gold-primary text-sm leading-none select-none"
        aria-hidden
      >
        {ornament}
      </span>
    </div>
  )
}

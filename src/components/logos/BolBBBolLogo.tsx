import Image from 'next/image'

interface BolBBBolLogoProps {
  className?: string
  priority?: boolean
}

export default function BolBBBolLogo({
  className = '',
  priority = false,
}: BolBBBolLogoProps) {
  return (
    <Image
      src="/logos/bolbbbol-logo.png"
      alt="Anchor Bol BB Bol"
      width={900}
      height={265}
      priority={priority}
      unoptimized
      className={`h-auto ${className}`}
      style={{ objectFit: 'contain' }}
    />
  )
}

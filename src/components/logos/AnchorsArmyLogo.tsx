import Image from 'next/image'

interface AnchorsArmyLogoProps {
  className?: string
  priority?: boolean
}

export default function AnchorsArmyLogo({
  className = '',
  priority = false,
}: AnchorsArmyLogoProps) {
  return (
    <Image
      src="/logos/anchors-army-logo.png"
      alt="69 Anchors Army — Powered by Anchor Bol BB Bol"
      width={900}
      height={700}
      priority={priority}
      unoptimized
      className={`h-auto ${className}`}
      style={{ objectFit: 'contain' }}
    />
  )
}

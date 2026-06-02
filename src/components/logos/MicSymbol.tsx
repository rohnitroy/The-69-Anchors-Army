import Image from 'next/image'

interface MicSymbolProps {
  size?: number
  className?: string
  alt?: string
  priority?: boolean
}

export default function MicSymbol({
  size = 48,
  className = '',
  alt = 'Bol BB Bol mic symbol',
  priority = false,
}: MicSymbolProps) {
  return (
    <Image
      src="/logos/mic-symbol.png"
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}

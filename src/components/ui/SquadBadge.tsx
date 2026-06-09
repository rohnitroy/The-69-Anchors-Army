'use client'

type SquadType = 'squadA' | 'squadB' | 'squadC' | 'squadD' | 'squadE'

const SQUAD_COLORS: Record<SquadType, { bg: string; text: string; border: string }> = {
  squadA: { bg: 'rgba(200,150,12,0.15)', text: '#C8960C', border: '#C8960C' },
  squadB: { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', border: '#3b82f6' },
  squadC: { bg: 'rgba(168,85,247,0.15)', text: '#a855f7', border: '#a855f7' },
  squadD: { bg: 'rgba(16,185,129,0.15)', text: '#10b981', border: '#10b981' },
  squadE: { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b', border: '#f59e0b' },
}

const SQUAD_LABELS: Record<SquadType, string> = {
  squadA: 'SQUAD-A',
  squadB: 'SQUAD-B',
  squadC: 'SQUAD-C',
  squadD: 'SQUAD-D',
  squadE: 'SQUAD-E',
}

export default function SquadBadge({ squad, size = 'md' }: { squad: SquadType; size?: 'sm' | 'md' | 'lg' }) {
  const colors = SQUAD_COLORS[squad]
  const label = SQUAD_LABELS[squad]

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span
      className={`font-semibold rounded border whitespace-nowrap ${sizeClasses[size]}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border,
        borderWidth: '1px',
      }}
    >
      {label}
    </span>
  )
}

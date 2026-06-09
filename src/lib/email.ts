import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL  = process.env.FROM_EMAIL  || 'noreply@bolbbbol.com'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vinodsharma@dynamicentertainment.co'
export const APP_URL     = process.env.APP_URL     || 'https://www.bolbbbol.com'

export const SLOT_LABELS: Record<string, { label: string; dates: string; checkout: string }> = {
  squadA: { label: 'Squad A', dates: 'Aug 8th & 9th',   checkout: 'Aug 10th' },
  squadB: { label: 'Squad B', dates: 'Aug 10th & 11th', checkout: 'Aug 12th' },
  squadC: { label: 'Squad C', dates: 'Aug 17th & 18th', checkout: 'Aug 19th' },
  squadD: { label: 'Squad D', dates: 'Aug 19th & 20th', checkout: 'Aug 21st' },
  squadE: { label: 'Any of the Above', dates: 'Flexible', checkout: 'To be assigned' },
}

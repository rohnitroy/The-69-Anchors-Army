import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL  = process.env.FROM_EMAIL  || 'noreply@bolbbbol.com'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vinodsharma@dynamicentertainment.co'
export const APP_URL     = process.env.APP_URL     || 'https://www.bolbbbol.com'

export const SLOT_LABELS: Record<string, { label: string; dates: string; checkout: string }> = {
  squad1: { label: 'Squad 1', dates: 'Aug 8th & 9th',   checkout: 'Aug 10th' },
  squad2: { label: 'Squad 2', dates: 'Aug 10th & 11th', checkout: 'Aug 12th' },
  squad3: { label: 'Squad 3', dates: 'Aug 17th & 18th', checkout: 'Aug 19th' },
  squad4: { label: 'Squad 4', dates: 'Aug 19th & 20th', checkout: 'Aug 21st' },
}

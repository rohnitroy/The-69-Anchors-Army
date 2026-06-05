import crypto from 'crypto'
import { cookies } from 'next/headers'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''

// Simple PBKDF2 hashing for passwords
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, hash: string): boolean {
  const [salt, storedHash] = hash.split(':')
  if (!salt || !storedHash) return false
  const computed = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return computed === storedHash
}

export async function setAdminSession(days: number = 7) {
  const cookieStore = await cookies()
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000)

  cookieStore.set('admin-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  })

  return token
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  return cookieStore.get('admin-session')?.value
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-session')
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getAdminSession()
  return !!session && session.length > 0
}

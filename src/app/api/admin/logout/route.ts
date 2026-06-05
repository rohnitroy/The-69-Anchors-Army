import { NextRequest, NextResponse } from 'next/server'
import { clearAdminSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await clearAdminSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}

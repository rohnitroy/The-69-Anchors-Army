import { NextRequest, NextResponse } from 'next/server'
import { setAdminSession, verifyPassword } from '@/lib/auth'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      )
    }

    if (username !== ADMIN_USERNAME) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    if (!ADMIN_PASSWORD_HASH || !verifyPassword(password, ADMIN_PASSWORD_HASH)) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    await setAdminSession()

    return NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

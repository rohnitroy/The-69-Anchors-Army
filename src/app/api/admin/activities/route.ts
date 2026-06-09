import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import prisma from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const activities = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    return NextResponse.json(activities)
  } catch (error) {
    console.error('[Activities API Error]', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}

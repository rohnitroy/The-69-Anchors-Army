import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const slot = searchParams.get('slot')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const where: any = {}
    if (slot) where.slot = slot
    if (status) where.status = status
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ]
    }

    const registrations = await prisma.slotRegistration.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 200,
    })

    const slotCounts = await prisma.slotRegistration.groupBy({
      by: ['slot'],
      _count: true,
    })

    const counts: Record<string, number> = {}
    slotCounts.forEach(({ slot, _count }) => {
      counts[slot] = _count
    })

    return NextResponse.json({ registrations, counts })
  } catch (error) {
    console.error('Fetch registrations error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    )
  }
}

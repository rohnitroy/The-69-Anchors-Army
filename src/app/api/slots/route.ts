import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const rows = await prisma.slotRegistration.groupBy({
      by: ['slot'],
      _count: { slot: true },
    })

    const counts: Record<string, number> = {
      squad1: 0,
      squad2: 0,
      squad3: 0,
      squad4: 0,
    }

    for (const row of rows) {
      counts[row.slot] = row._count.slot
    }

    return NextResponse.json(counts)
  } catch (err) {
    console.error('[Slots API Error]', err)
    return NextResponse.json({ squad1: 0, squad2: 0, squad3: 0, squad4: 0 })
  }
}

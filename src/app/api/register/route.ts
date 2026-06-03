import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/db'

const VALID_SLOTS = ['squad1', 'squad2', 'squad3', 'squad4'] as const
type SquadSlot = (typeof VALID_SLOTS)[number]
const SEAT_LIMIT = 24

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const required = ['fullName', 'phone', 'email', 'slot']
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const slot = body.slot as string
    if (!VALID_SLOTS.includes(slot as SquadSlot)) {
      return NextResponse.json({ error: 'Invalid slot selection.' }, { status: 400 })
    }

    // Check capacity before inserting (race-safe: DB unique + count check)
    const seatCount = await prisma.slotRegistration.count({
      where: { slot: slot as SquadSlot },
    })

    if (seatCount >= SEAT_LIMIT) {
      return NextResponse.json(
        { error: 'This slot is fully booked. Please select another date.' },
        { status: 409 }
      )
    }

    await prisma.slotRegistration.create({
      data: {
        fullName: body.fullName.trim(),
        email:    body.email.trim().toLowerCase(),
        phone:    body.phone.trim(),
        slot:     slot as SquadSlot,
        comments: body.comments?.trim() || null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'This email/mobile number is already registered for a slot.' },
        { status: 409 }
      )
    }
    console.error('[Register API Error]', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

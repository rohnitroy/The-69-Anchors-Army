import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { render } from '@react-email/components'
import prisma from '@/lib/db'
import { resend, FROM_EMAIL, ADMIN_EMAIL, APP_URL, SLOT_LABELS } from '@/lib/email'
import ConfirmationEmail from '@/emails/ConfirmationEmail'
import AdminNotificationEmail from '@/emails/AdminNotificationEmail'

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

    const seatCount = await prisma.slotRegistration.count({
      where: { slot: slot as SquadSlot },
    })

    if (seatCount >= SEAT_LIMIT) {
      return NextResponse.json(
        { error: 'This slot is fully booked. Please select another date.' },
        { status: 409 }
      )
    }

    const registration = await prisma.slotRegistration.create({
      data: {
        fullName: body.fullName.trim(),
        email:    body.email.trim().toLowerCase(),
        phone:    body.phone.trim(),
        slot:     slot as SquadSlot,
        comments: body.comments?.trim() || null,
      },
    })

    // Fire both emails in parallel — non-blocking (don't fail the response if email errors)
    const slotInfo  = SLOT_LABELS[slot]
    const timestamp = new Date(registration.createdAt).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short',
    })

    Promise.all([
      resend.emails.send({
        from:    `69 Anchors Army <${FROM_EMAIL}>`,
        to:      registration.email,
        subject: `Your ${slotInfo.label} slot is confirmed — ${slotInfo.dates}`,
        html:    await render(ConfirmationEmail({
          fullName: registration.fullName,
          slot:     slotInfo.label,
          dates:    slotInfo.dates,
          checkout: slotInfo.checkout,
          appUrl:   APP_URL,
        })),
      }),
      resend.emails.send({
        from:    `69 Anchors Army <${FROM_EMAIL}>`,
        to:      ADMIN_EMAIL,
        subject: `New Registration — ${registration.fullName} · ${slotInfo.label}`,
        html:    await render(AdminNotificationEmail({
          fullName:  registration.fullName,
          email:     registration.email,
          phone:     registration.phone,
          slot:      slotInfo.label,
          dates:     slotInfo.dates,
          checkout:  slotInfo.checkout,
          comments:  registration.comments,
          appUrl:    APP_URL,
          timestamp,
        })),
      }),
    ]).catch(err => console.error('[Email Error]', err))

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

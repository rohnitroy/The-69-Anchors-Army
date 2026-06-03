import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { render } from '@react-email/components'
import prisma from '@/lib/db'
import { resend, FROM_EMAIL, ADMIN_EMAIL, APP_URL, SLOT_LABELS } from '@/lib/email'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'
import ConfirmationEmail from '@/emails/ConfirmationEmail'
import AdminNotificationEmail from '@/emails/AdminNotificationEmail'

const VALID_SLOTS = ['squad1', 'squad2', 'squad3', 'squad4'] as const
type SquadSlot = (typeof VALID_SLOTS)[number]
const SEAT_LIMIT = 24

// Strip HTML tags from user input
function sanitize(val: string, maxLen = 500): string {
  return val.replace(/<[^>]*>/g, '').trim().slice(0, maxLen)
}

export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ──────────────────────────────────────────────────────
    const ip = getClientIp(req)
    const { allowed } = checkRateLimit(ip)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many attempts from your device. Please wait 15 minutes and try again.' },
        { status: 429 }
      )
    }

    // ── Parse + basic presence check ──────────────────────────────────────
    const body = await req.json()

    const required = ['fullName', 'phone', 'email', 'slot']
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // ── Input validation ──────────────────────────────────────────────────
    const fullName = sanitize(body.fullName, 255)
    const email    = sanitize(body.email,    255).toLowerCase()
    const phone    = sanitize(body.phone,     30)
    const comments = body.comments ? sanitize(body.comments, 1000) : null
    const slot     = sanitize(body.slot, 20)

    if (fullName.length < 2) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Phone: allow digits, spaces, +, -, (, ) — min 7 digits
    if (!/^[\d\s+\-()\[\]]{7,25}$/.test(phone)) {
      return NextResponse.json({ error: 'Invalid mobile number format.' }, { status: 400 })
    }

    if (!VALID_SLOTS.includes(slot as SquadSlot)) {
      return NextResponse.json({ error: 'Invalid slot selection.' }, { status: 400 })
    }

    // ── Capacity check ────────────────────────────────────────────────────
    const seatCount = await prisma.slotRegistration.count({
      where: { slot: slot as SquadSlot },
    })
    if (seatCount >= SEAT_LIMIT) {
      return NextResponse.json(
        { error: 'This slot is fully booked. Please select another date.' },
        { status: 409 }
      )
    }

    // ── IP duplicate check ────────────────────────────────────────────────
    if (ip !== 'unknown') {
      const ipExists = await prisma.slotRegistration.findFirst({ where: { ip } })
      if (ipExists) {
        return NextResponse.json(
          { error: 'A registration from your device or network already exists. Each device can only register once.' },
          { status: 409 }
        )
      }
    }

    // ── Create registration ───────────────────────────────────────────────
    const registration = await prisma.slotRegistration.create({
      data: {
        fullName,
        email,
        phone,
        slot:     slot as SquadSlot,
        comments: comments || null,
        ip:       ip !== 'unknown' ? ip : null,
      },
    })

    // ── Send emails (non-blocking) ────────────────────────────────────────
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
    // ── Duplicate email or phone (DB unique constraint) ───────────────────
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      const target = (err.meta?.target as string[] | string) ?? []
      const fields = Array.isArray(target) ? target.join(',') : String(target)

      if (fields.includes('email')) {
        return NextResponse.json(
          { error: 'This email address is already registered for a slot.' },
          { status: 409 }
        )
      }
      if (fields.includes('phone')) {
        return NextResponse.json(
          { error: 'This mobile number is already registered for a slot.' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: 'This email or mobile number is already registered for a slot.' },
        { status: 409 }
      )
    }

    console.error('[Register API Error]', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

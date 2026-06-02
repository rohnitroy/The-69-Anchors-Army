import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

function mapExperienceLevel(exp: string): 'beginner' | 'intermediate' | 'advanced' | 'professional' {
  if (exp.includes('Less than') || exp.includes('1–2')) return 'beginner'
  if (exp.includes('3–5')) return 'intermediate'
  if (exp.includes('6–10')) return 'advanced'
  return 'professional'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const required = ['fullName', 'email', 'phone', 'city', 'experience', 'specialty', 'whyJoin']
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const registration = await prisma.registration.create({
      data: {
        registrationId: '',          // DB trigger replaces this with AAA-0001, AAA-0002…
        fullName:        body.fullName.trim(),
        email:           body.email.trim().toLowerCase(),
        phone:           body.phone.trim(),
        city:            body.city.trim(),
        state:           body.state?.trim() || null,
        profession:      body.specialty,
        experienceLevel: mapExperienceLevel(body.experience),
        whyJoin:         body.whyJoin.trim(),
        status:          'pending',
      },
    })

    console.log(`[69 Army] New application: ${registration.registrationId} — ${registration.fullName}`)

    return NextResponse.json({
      success:        true,
      registrationId: registration.registrationId,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error'
    // Unique constraint = duplicate email
    if (message.includes('Unique constraint') || message.includes('unique')) {
      return NextResponse.json({ error: 'An application with this email already exists.' }, { status: 409 })
    }
    console.error('[Apply API Error]', message)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

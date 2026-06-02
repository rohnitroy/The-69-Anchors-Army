import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const required = ['fullName', 'phone', 'city', 'experience', 'specialty', 'whyJoin']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 })
      }
    }

    // TODO: Save to Supabase / send via Resend
    // For now, log and return success
    console.log('[69 Army Application]', {
      name: body.fullName,
      phone: body.phone,
      city: body.city,
      experience: body.experience,
      specialty: body.specialty,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

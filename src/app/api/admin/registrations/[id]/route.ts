import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const registration = await prisma.slotRegistration.findUnique({
      where: { id },
    })

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    return NextResponse.json(registration)
  } catch (error) {
    console.error('Fetch registration error:', error)
    return NextResponse.json({ error: 'Failed to fetch registration' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()

    // Update the registration
    const updated = await prisma.slotRegistration.update({
      where: { id },
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        gender: body.gender,
        paymentMode: body.paymentMode,
        slot: body.slot,
        status: body.status,
        comments: body.comments,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update registration error:', error)
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const registration = await prisma.slotRegistration.findUnique({
      where: { id },
    })

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    await prisma.slotRegistration.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete registration error:', error)
    return NextResponse.json({ error: 'Failed to delete registration' }, { status: 500 })
  }
}

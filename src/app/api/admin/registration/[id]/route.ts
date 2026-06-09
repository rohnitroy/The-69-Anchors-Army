import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { logActivity } from '@/lib/activityLog'

export async function GET(
  _req: NextRequest,
  { params }: any
) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = (await params).id
    const registration = await prisma.slotRegistration.findUnique({
      where: { id },
    })

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(registration)
  } catch (error) {
    console.error('Fetch registration error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch registration' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: any
) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = (await params).id
    const { status, slot, adminNotes } = await req.json()

    // Get current registration for logging
    const current = await prisma.slotRegistration.findUnique({ where: { id } })
    if (!current) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    const updated = await prisma.slotRegistration.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(slot && { slot }),
        ...(adminNotes !== undefined && { adminNotes }),
      },
    })

    // Log activity
    if (status && status !== current.status) {
      await logActivity(
        'STATUS_UPDATED',
        `Status updated from ${current.status} to ${status}`,
        id,
        current.email,
        current.fullName,
        current.status,
        status
      )
    }

    if (slot && slot !== current.slot) {
      await logActivity(
        'REGISTRATION_MOVED',
        `Moved from ${current.slot} to ${slot}`,
        id,
        current.email,
        current.fullName,
        current.slot,
        slot
      )
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update registration error:', error)
    return NextResponse.json(
      { error: 'Failed to update registration' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: any
) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = (await params).id

    // Get registration data before deletion for logging
    const registration = await prisma.slotRegistration.findUnique({ where: { id } })
    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    await prisma.slotRegistration.delete({
      where: { id },
    })

    // Log deletion activity
    await logActivity(
      'REGISTRATION_DELETED',
      `Registration deleted: ${registration.fullName} from ${registration.slot}`,
      id,
      registration.email,
      registration.fullName,
      registration.slot,
      'DELETED'
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete registration error:', error)
    return NextResponse.json(
      { error: 'Failed to delete registration' },
      { status: 500 }
    )
  }
}

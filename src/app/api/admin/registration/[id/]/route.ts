import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const registration = await prisma.slotRegistration.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { status, adminNotes } = await req.json()

    const updated = await prisma.slotRegistration.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
      },
    })

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
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.slotRegistration.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete registration error:', error)
    return NextResponse.json(
      { error: 'Failed to delete registration' },
      { status: 500 }
    )
  }
}

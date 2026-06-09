import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all registrations
    const registrations = await prisma.slotRegistration.findMany()

    // Create backup object
    const backup = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      totalRecords: registrations.length,
      data: registrations,
    }

    // Return as downloadable JSON file
    return NextResponse.json(backup, {
      headers: {
        'Content-Disposition': `attachment; filename="backup-${new Date().toISOString().split('T')[0]}.json"`,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Backup error:', error)
    return NextResponse.json({ error: 'Failed to create backup' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    // Validate backup data
    if (!Array.isArray(body.data)) {
      return NextResponse.json({ error: 'Invalid backup format' }, { status: 400 })
    }

    // Store backup metadata (you can create a Backup table if needed)
    const backupLog = {
      timestamp: new Date().toISOString(),
      recordCount: body.data.length,
      status: 'completed',
    }

    return NextResponse.json({
      success: true,
      message: 'Backup recorded successfully',
      backup: backupLog,
    })
  } catch (error) {
    console.error('Backup storage error:', error)
    return NextResponse.json({ error: 'Failed to store backup' }, { status: 500 })
  }
}

import { prisma } from '@/lib/db'

export type ActivityAction =
  | 'REGISTRATION_VIEWED'
  | 'REGISTRATION_DELETED'
  | 'REGISTRATION_MOVED'
  | 'STATUS_UPDATED'
  | 'BULK_STATUS_UPDATE'
  | 'BULK_SQUAD_MOVE'

export async function logActivity(
  actionType: ActivityAction,
  actionDescription: string,
  targetRegistrationId?: string,
  targetEmail?: string,
  targetName?: string,
  fromValue?: string,
  toValue?: string,
  ipAddress?: string,
  userAgent?: string
) {
  try {
    await prisma.activityLog.create({
      data: {
        actionType,
        actionDescription,
        targetRegistrationId: targetRegistrationId || null,
        targetEmail: targetEmail || null,
        targetName: targetName || null,
        fromValue: fromValue || null,
        toValue: toValue || null,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
      },
    })
  } catch (error) {
    console.error('[Activity Log Error]', error)
  }
}

export async function getRecentActivities(limit: number = 10) {
  try {
    return await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
  } catch (error) {
    console.error('[Get Activities Error]', error)
    return []
  }
}

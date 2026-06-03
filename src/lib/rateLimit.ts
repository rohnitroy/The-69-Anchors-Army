// In-memory sliding-window rate limiter.
// Per Vercel serverless instance — sufficient when combined with DB-level IP dedup.

const store = new Map<string, { count: number; resetAt: number }>()

const MAX_ATTEMPTS  = 5
const WINDOW_MS     = 15 * 60 * 1000  // 15 minutes

// Prune expired entries every 500 calls to avoid unbounded growth
let callsSincePrune = 0
function maybePrune() {
  if (++callsSincePrune < 500) return
  callsSincePrune = 0
  const now = Date.now()
  for (const [key, val] of store) {
    if (now > val.resetAt) store.delete(key)
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  maybePrune()
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 }
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count }
}

export function getClientIp(req: Request): string {
  const forwarded = (req.headers as Headers).get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return (req.headers as Headers).get('x-real-ip') ?? 'unknown'
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      router.push('/admin/dashboard')
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 gap-6">
          <AnchorsArmyLogo className="w-32" />
          <div>
            <h1
              className="font-display font-semibold text-text-primary mb-3 leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
            >
              Admin Access
            </h1>
            <GoldDivider className="w-20 mx-auto" />
          </div>
          <p className="font-sans text-text-secondary text-sm leading-relaxed">
            Manage 69 Anchors Army registrations and approvals
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="micro-label text-text-secondary">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              disabled={loading}
              className="w-full px-4 py-3.5 bg-[#060606] text-text-primary border border-[#1e1e1e] font-sans text-[15px] outline-none transition-all duration-200 placeholder:text-[#444] focus:border-gold-primary focus:shadow-[0_0_0_1px_rgba(200,150,12,0.2)] hover:border-[#2e2e2e] disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="micro-label text-text-secondary">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={loading}
              className="w-full px-4 py-3.5 bg-[#060606] text-text-primary border border-[#1e1e1e] font-sans text-[15px] outline-none transition-all duration-200 placeholder:text-[#444] focus:border-gold-primary focus:shadow-[0_0_0_1px_rgba(200,150,12,0.2)] hover:border-[#2e2e2e] disabled:opacity-50"
            />
          </div>

          {/* Error */}
          {error && (
            <div
              className="px-4 py-3.5 rounded-sm border-l-2"
              style={{
                borderColor: '#dc2626',
                background: 'rgba(220, 38, 38, 0.06)',
              }}
            >
              <p className="font-sans text-sm" style={{ color: '#dc2626' }}>
                {error}
              </p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-6"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In →'}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-text-secondary text-xs mt-8">
          For admin access only · Unauthorized access is prohibited
        </p>
      </div>
    </div>
  )
}

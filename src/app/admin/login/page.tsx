'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import GoldDivider from '@/components/ui/GoldDivider'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12 gap-4 sm:gap-6">
          <AnchorsArmyLogo className="w-24 sm:w-32" />
          <div>
            <h1
              className="font-display font-semibold text-white mb-2 sm:mb-3 leading-tight"
              style={{ fontSize: 'clamp(24px, 5vw, 42px)' }}
            >
              Admin Access
            </h1>
            <GoldDivider className="w-16 sm:w-20 mx-auto" />
          </div>
          <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed">
            Manage 69 Anchors Army registrations
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 bg-[#1a1a1a] p-6 sm:p-8 rounded-lg shadow-xl border border-[#333]">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-semibold text-gray-300 uppercase tracking-wide">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              disabled={loading}
              className="w-full px-4 py-3.5 bg-[#0a0a0a] text-white border border-[#333] font-sans text-[15px] outline-none transition-all duration-200 placeholder:text-gray-600 focus:border-[#C8960C] focus:ring-2 focus:ring-[#C8960C]/20 hover:border-[#444] disabled:opacity-50 rounded"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-semibold text-gray-300 uppercase tracking-wide">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                disabled={loading}
                className="w-full px-4 py-3.5 bg-[#0a0a0a] text-white border border-[#333] font-sans text-[15px] outline-none transition-all duration-200 placeholder:text-gray-600 focus:border-[#C8960C] focus:ring-2 focus:ring-[#C8960C]/20 hover:border-[#444] disabled:opacity-50 rounded pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors disabled:opacity-50"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3.5 rounded border-l-4 bg-red-900/20 border-red-500">
              <p className="font-sans text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-6 py-3.5 bg-[#C8960C] text-black font-semibold rounded hover:bg-[#B08608] transition-colors disabled:opacity-50 min-h-12"
          >
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          For admin access only · Unauthorized access is prohibited
        </p>
      </div>
    </div>
  )
}

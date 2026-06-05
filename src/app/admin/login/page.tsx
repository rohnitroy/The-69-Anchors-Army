'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'
import GoldDivider from '@/components/ui/GoldDivider'

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12 gap-4 sm:gap-6">
          <AnchorsArmyLogo className="w-24 sm:w-32" />
          <div>
            <h1
              className="font-display font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight"
              style={{ fontSize: 'clamp(24px, 5vw, 42px)' }}
            >
              Admin Access
            </h1>
            <GoldDivider className="w-16 sm:w-20 mx-auto" />
          </div>
          <p className="font-sans text-gray-600 text-xs sm:text-sm leading-relaxed">
            Manage 69 Anchors Army registrations
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              disabled={loading}
              className="w-full px-4 py-3.5 bg-white text-gray-900 border border-gray-300 font-sans text-[15px] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#C8960C] focus:ring-2 focus:ring-[#C8960C]/20 hover:border-gray-400 disabled:opacity-50 rounded"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-semibold text-gray-700 uppercase tracking-wide">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={loading}
              className="w-full px-4 py-3.5 bg-white text-gray-900 border border-gray-300 font-sans text-[15px] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#C8960C] focus:ring-2 focus:ring-[#C8960C]/20 hover:border-gray-400 disabled:opacity-50 rounded"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3.5 rounded border-l-4 bg-red-50 border-red-500">
              <p className="font-sans text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-6 py-3.5 bg-[#C8960C] text-black font-semibold rounded hover:bg-[#B08608] transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-8">
          For admin access only · Unauthorized access is prohibited
        </p>
      </div>
    </div>
  )
}

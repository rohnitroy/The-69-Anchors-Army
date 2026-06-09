'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Option = {
  value: string
  label: string
  flag?: string
}

type CustomDropdownProps = {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  isCountryCode?: boolean
}

export default function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  isCountryCode = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#333] rounded font-sans text-[15px] outline-none transition-all duration-200 focus:border-[#C8960C] focus:ring-2 focus:ring-[#C8960C]/20 hover:border-[#444] flex items-center justify-between min-h-12 ${
          isCountryCode ? 'sm:w-32' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          {selectedOption?.flag && <span className="text-lg">{selectedOption.flag}</span>}
          <span className={selectedOption ? 'text-white' : 'text-gray-600'}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-gray-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 bg-[#1a1a1a] border border-[#333] rounded shadow-xl overflow-hidden"
            style={{
              maxHeight: 'min(280px, calc(100vh - 100px))',
              overflowY: 'auto',
            }}
          >
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`w-full px-4 py-3 text-left font-sans text-[15px] transition-all duration-150 flex items-center gap-3 ${
                  value === option.value
                    ? 'bg-[#C8960C] text-black font-semibold'
                    : 'text-gray-300 hover:bg-[#242424]'
                }`}
              >
                {option.flag && <span className="text-lg">{option.flag}</span>}
                <span>{option.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

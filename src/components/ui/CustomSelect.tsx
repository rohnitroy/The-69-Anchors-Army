'use client'

import { useState, useRef, useEffect } from 'react'

type Option = {
  value: string
  label: string
}

type CustomSelectProps = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#080808] text-text-primary border border-[#242424] font-sans text-sm outline-none focus:border-gold-primary focus:shadow-[0_0_0_1px_rgba(200,150,12,0.2)] rounded text-left flex items-center justify-between hover:border-[#383838] transition-all duration-200"
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ml-2 text-text-secondary`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 bg-[#0A0A0A] border border-[#242424] rounded shadow-xl z-50 overflow-hidden"
          style={{
            width: 'auto',
            minWidth: '100%',
            maxWidth: '320px',
          }}
        >
          <div className="max-h-64 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3 text-left font-sans text-sm transition-all duration-150 whitespace-nowrap ${
                  value === option.value
                    ? 'bg-[rgba(200,150,12,0.15)] text-gold-primary font-semibold border-l-2 border-gold-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-[rgba(200,150,12,0.08)]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

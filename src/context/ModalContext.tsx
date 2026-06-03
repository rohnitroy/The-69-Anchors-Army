'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

type ModalCtx = {
  isOpen:     boolean
  openModal:  () => void
  closeModal: () => void
}

const Ctx = createContext<ModalCtx>({
  isOpen:     false,
  openModal:  () => {},
  closeModal: () => {},
})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal  = useCallback(() => setIsOpen(true),  [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <Ctx.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </Ctx.Provider>
  )
}

export const useModal = () => useContext(Ctx)

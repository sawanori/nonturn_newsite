'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ConsultationModal } from './ConsultationModal'

interface ConsultationButtonProps {
  variant?: 'primary' | 'compact' | 'text'
  className?: string
  id?: string
  children?: React.ReactNode
}

export function ConsultationButton({ variant = 'primary', className = '', id, children }: ConsultationButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL

  const handleClick = () => {
    if (!calendlyUrl) {
      window.location.href = '/contact'
      return
    }

    if (isMobile) {
      window.open(calendlyUrl, '_blank', 'noopener,noreferrer')
    } else {
      setIsOpen(true)
    }
  }

  const baseStyles = {
    primary: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 font-medium text-lg uppercase tracking-wider hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 relative overflow-hidden group inline-block text-center',
    compact: 'bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-4 py-2 font-medium text-sm hover:bg-yellow-400 hover:text-black transition-all duration-300 rounded',
    text: 'text-yellow-400 hover:text-yellow-300 font-medium transition-colors inline-flex items-center gap-1',
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`${baseStyles[variant]} ${className}`}
        id={id}
      >
        {children || '無料相談を予約する'}
      </button>
      {mounted && calendlyUrl && !isMobile && createPortal(
        <ConsultationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          calendlyUrl={calendlyUrl}
        />,
        document.body
      )}
    </>
  )
}

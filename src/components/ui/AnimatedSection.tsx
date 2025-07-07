'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  once?: boolean
  threshold?: number
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  once = true,
  threshold = 0.1
}: AnimatedSectionProps) {
  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 30 }
      case 'down':
        return { opacity: 0, y: -30 }
      case 'left':
        return { opacity: 0, x: -30 }
      case 'right':
        return { opacity: 0, x: 30 }
      case 'scale':
        return { opacity: 0, scale: 0.8 }
      default:
        return { opacity: 0, y: 30 }
    }
  }

  const getAnimateState = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 }
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 }
      case 'scale':
        return { opacity: 1, scale: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={getAnimateState()}
      viewport={{ once, amount: threshold }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
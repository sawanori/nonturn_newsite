'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function FoodPhotoLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  // Simple timing - just show logo animation
  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + 20
      })
    }, 300)

    return () => clearInterval(progressInterval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-red-900/20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Main Animation Container - Only Logo */}
      <div className="relative h-full flex items-center justify-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <LogoReveal />
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64">
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <motion.p
          className="text-center text-gray-400 text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          料理の美味しさを引き出す撮影準備中...
        </motion.p>
      </div>
    </motion.div>
  )
}

// Logo Reveal - Clean and Simple
function LogoReveal() {
  return (
    <motion.div className="relative">
      {/* Glowing background */}
      <motion.div
        className="absolute inset-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        animate={{ 
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl" />
      </motion.div>

      {/* Main content */}
      <div className="relative text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <div className="inline-block">
            <motion.div
              className="mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                {/* Plate */}
                <ellipse cx="12" cy="17" rx="9" ry="2" fill="#FFB366" opacity="0.3"/>
                <ellipse cx="12" cy="16" rx="9" ry="2" fill="#FF8C42"/>
                
                {/* Fork */}
                <rect x="4" y="8" width="0.8" height="7" rx="0.4" fill="#C0C0C0" transform="rotate(-15 4 8)"/>
                <rect x="3.5" y="6" width="0.5" height="2" rx="0.25" fill="#C0C0C0" transform="rotate(-15 3.5 6)"/>
                <rect x="4.2" y="6" width="0.5" height="2" rx="0.25" fill="#C0C0C0" transform="rotate(-15 4.2 6)"/>
                <rect x="4.9" y="6" width="0.5" height="2" rx="0.25" fill="#C0C0C0" transform="rotate(-15 4.9 6)"/>
                
                {/* Knife */}
                <rect x="20" y="8" width="0.8" height="7" rx="0.4" fill="#C0C0C0" transform="rotate(15 20 8)"/>
                <path d="M 19.5 6 L 20.5 6 L 20.3 8 L 19.7 8 Z" fill="#C0C0C0" transform="rotate(15 20 7)"/>
                
                {/* Food on plate */}
                <circle cx="12" cy="15" r="3" fill="#8B4513"/>
                <circle cx="11" cy="14.5" r="0.5" fill="#FFD700"/>
                <circle cx="13" cy="14.5" r="0.5" fill="#FF6347"/>
                <path d="M 10 15.5 Q 12 16.5 14 15.5" stroke="#90EE90" strokeWidth="0.5" fill="none"/>
              </svg>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                飲食店撮影
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-orange-300 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              PhotoStudio
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
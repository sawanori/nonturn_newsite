'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FoodPhotoLoader({ onComplete }: { onComplete: () => void }) {
  const [currentScene, setCurrentScene] = useState(0)
  const [progress, setProgress] = useState(0)

  // Scene transition timing
  useEffect(() => {
    console.log('FoodPhotoLoader mounted')
    const scenes = [0, 1, 2, 3, 4]
    let currentIndex = 0
    
    const interval = setInterval(() => {
      currentIndex++
      console.log('Scene transition:', currentIndex)
      if (currentIndex < scenes.length) {
        setCurrentScene(scenes[currentIndex])
        setProgress((currentIndex / (scenes.length - 1)) * 100)
      } else {
        clearInterval(interval)
        console.log('Animation complete, calling onComplete in 500ms')
        setTimeout(onComplete, 500)
      }
    }, 800)

    return () => clearInterval(interval)
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

      {/* Main Animation Container */}
      <div className="relative h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* Scene 1: Camera Shutter */}
          {currentScene === 0 && (
            <motion.div
              key="shutter"
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ShutterAnimation />
            </motion.div>
          )}

          {/* Scene 2: Dish Plate */}
          {currentScene === 1 && (
            <motion.div
              key="plate"
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <PlateAnimation />
            </motion.div>
          )}

          {/* Scene 3: Restaurant Interior */}
          {currentScene === 2 && (
            <motion.div
              key="interior"
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <RestaurantAnimation />
            </motion.div>
          )}

          {/* Scene 4: Chef Action */}
          {currentScene === 3 && (
            <motion.div
              key="chef"
              className="relative"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.5 }}
            >
              <ChefAnimation />
            </motion.div>
          )}

          {/* Scene 5: Logo Reveal */}
          {currentScene === 4 && (
            <motion.div
              key="logo"
              className="relative"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <LogoReveal />
            </motion.div>
          )}
        </AnimatePresence>
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

// Camera Shutter Animation
function ShutterAnimation() {
  return (
    <div className="relative w-48 h-48">
      {/* Camera body */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl"
        animate={{ rotateZ: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Lens */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32"
      >
        {/* Aperture blades */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ rotate: i * 45 }}
            animate={{ 
              scale: [1, 0.3, 1],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          >
            <div className="w-full h-1/2 bg-gradient-to-b from-orange-400 to-transparent" />
          </motion.div>
        ))}
        
        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      {/* Flash effect */}
      <motion.div
        className="absolute inset-0 bg-white rounded-lg"
        animate={{ 
          opacity: [0, 1, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1
        }}
      />

      {/* Camera text */}
      <motion.p
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-orange-400 font-bold text-xl whitespace-nowrap"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        📸 撮影準備中
      </motion.p>
    </div>
  )
}

// Plate Animation
function PlateAnimation() {
  return (
    <div className="relative w-64 h-64">
      {/* Plate */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full shadow-2xl"
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
      />
      
      {/* Inner circle */}
      <div className="absolute inset-4 bg-gradient-to-br from-gray-50 to-gray-200 rounded-full" />
      
      {/* Food items appearing */}
      {[
        { emoji: '🍕', delay: 0, x: -20, y: -20 },
        { emoji: '🍣', delay: 0.2, x: 20, y: -20 },
        { emoji: '🍔', delay: 0.4, x: 0, y: 0 },
        { emoji: '🍰', delay: 0.6, x: -20, y: 20 },
        { emoji: '🍜', delay: 0.8, x: 20, y: 20 },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 text-4xl"
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: item.x,
            y: item.y
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Steam effect */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-8 bg-gradient-to-t from-white/50 to-transparent rounded-full"
          initial={{ 
            opacity: 0,
            y: 0,
            x: (i - 1) * 20
          }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: [-20, -60],
            x: [(i - 1) * 20, (i - 1) * 30]
          }}
          transition={{ 
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity
          }}
        />
      ))}

      <motion.p
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-orange-400 font-bold text-xl whitespace-nowrap"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        🍽️ 美味しさを演出
      </motion.p>
    </div>
  )
}

// Restaurant Interior Animation
function RestaurantAnimation() {
  return (
    <div className="relative w-80 h-64">
      {/* Restaurant frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden">
        {/* Tables */}
        {[
          { x: '20%', y: '30%' },
          { x: '60%', y: '30%' },
          { x: '40%', y: '60%' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 bg-orange-900 rounded"
            style={{ left: pos.x, top: pos.y }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.9, 1, 0.9]
            }}
            transition={{ 
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity
            }}
          />
        ))}

        {/* Lights */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-4 w-3 h-3 bg-yellow-400 rounded-full"
            style={{ left: `${20 + i * 15}%` }}
            animate={{ 
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 1.5,
              delay: i * 0.2,
              repeat: Infinity
            }}
          />
        ))}

        {/* Window view */}
        <div className="absolute right-4 top-8 w-24 h-32 bg-gradient-to-b from-blue-900/30 to-blue-800/30 rounded" />
      </div>

      {/* Floating camera icon */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl"
        animate={{ 
          y: [-10, 10, -10],
          rotate: [-5, 5, -5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        📷
      </motion.div>

      <motion.p
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-orange-400 font-bold text-xl whitespace-nowrap"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        🏪 店舗の魅力を撮影
      </motion.p>
    </div>
  )
}

// Chef Animation
function ChefAnimation() {
  return (
    <div className="relative w-64 h-64">
      {/* Chef hat */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-white rounded-t-full"
        animate={{ 
          rotateZ: [-5, 5, -5],
          scaleY: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Chef body */}
      <motion.div
        className="absolute top-16 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-white rounded-lg"
        animate={{ scaleX: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Cooking action */}
      <motion.div
        className="absolute top-24 left-1/2 transform -translate-x-1/2"
        animate={{ 
          rotate: [-20, 20, -20],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <div className="text-4xl">🍳</div>
      </motion.div>

      {/* Fire effect */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-8 text-2xl"
          style={{ left: `${40 + i * 10}%` }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [0, -20, -40],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1,
            delay: i * 0.2,
            repeat: Infinity
          }}
        >
          🔥
        </motion.div>
      ))}

      <motion.p
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-orange-400 font-bold text-xl whitespace-nowrap"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        👨‍🍳 プロの料理を撮影
      </motion.p>
    </div>
  )
}

// Logo Reveal
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
          className="mb-8"
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
              className="text-8xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🍽️
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

        {/* Tagline */}
        <motion.p
          className="text-gray-300 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          プロカメラマンが、あなたの料理を輝かせます
        </motion.p>

        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2,
              delay: 0.5 + i * 0.1,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
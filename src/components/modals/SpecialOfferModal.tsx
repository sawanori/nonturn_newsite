'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface SpecialOfferModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SpecialOfferModal({ isOpen, onClose }: SpecialOfferModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [
    'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/sample1.jpg',
    'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/sample2.jpg',
    'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/sample3.jpg'
  ]

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isOpen, images.length])

  // Confetti effect
  useEffect(() => {
    if (isOpen) {
      const confettiColors = ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#00CED1']
      const confettiCount = 50

      const createConfetti = () => {
        for (let i = 0; i < confettiCount; i++) {
          setTimeout(() => {
            const confetti = document.createElement('div')
            confetti.className = 'confetti-particle'
            confetti.style.left = Math.random() * 100 + '%'
            confetti.style.animationDelay = Math.random() * 3 + 's'
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)]
            document.getElementById('confetti-container')?.appendChild(confetti)

            setTimeout(() => confetti.remove(), 5000)
          }, Math.random() * 300)
        }
      }

      createConfetti()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="relative max-w-5xl w-full">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-3xl opacity-50 animate-pulse" />
              
              {/* Main modal container */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                {/* Confetti container */}
                <div id="confetti-container" className="absolute inset-0 pointer-events-none overflow-hidden" />
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-2xl" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-red-500/20 to-transparent rounded-full blur-2xl" />
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors group"
                >
                  <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  {/* Left side - Content */}
                  <div className="space-y-6">
                    {/* Badge */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block"
                    >
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        🎉 期間限定特典
                      </div>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 leading-tight">
                        9月撮影特典
                      </h2>
                      <div className="flex items-center gap-2 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="text-3xl"
                          >
                            ⭐
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Main offer */}
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-4"
                    >
                      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-400/30">
                        <h3 className="text-2xl font-bold text-white mb-3">
                          🎁 特別プレゼント
                        </h3>
                        <p className="text-lg text-gray-200 leading-relaxed">
                          飲食店サイト（ホットペッパー、ぐるなび等）の
                          <span className="text-yellow-400 font-bold">TOP画像やサムネイル</span>で使用しやすい
                          編集画像を撮影画像から作成して
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                            1枚無料プレゼント！
                          </span>
                        </p>
                      </div>

                      {/* Animated value badge */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, -2, 2, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="inline-block"
                      >
                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full text-xl font-bold shadow-xl">
                          通常 ¥11,000 相当 → 無料！
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link href="/services/photo/foodphoto/form">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative w-full py-4 px-8 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xl font-bold rounded-2xl shadow-2xl overflow-hidden group"
                        >
                          <span className="relative z-10">今すぐ申し込む</span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500"
                            initial={{ x: "100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Right side - Images and conditions */}
                  <div className="space-y-6">
                    {/* Image carousel - 1:1 aspect ratio */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="relative aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={images[currentImageIndex]}
                              alt={`サンプル画像 ${currentImageIndex + 1}`}
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-4 left-4 text-white z-10">
                            <p className="text-sm font-semibold drop-shadow-lg">編集サンプル {currentImageIndex + 1}/3</p>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Image indicators */}
                      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIndex 
                                ? 'w-8 bg-white' 
                                : 'bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Conditions */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
                    >
                      <h4 className="text-sm font-bold text-orange-400 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        適用条件
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-300">
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">①</span>
                          <span>9月中のお申し込み→9/30までの撮影のお店に限ります</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">②</span>
                          <span>サイズ：800px×800pxの1:1画像</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">③</span>
                          <span>お渡しする画像に関して、作成後の修正はできかねます</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">④</span>
                          <span>対象プラン：スタンダードプラン（¥44,000）以上</span>
                        </li>
                      </ul>
                    </motion.div>

                    {/* Urgency message */}
                    <motion.div
                      animate={{ 
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="text-center"
                    >
                      <p className="text-yellow-400 font-bold text-lg">
                        ⏰ 9月限定特典・残りわずか！
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Global styles for confetti */}
          <style jsx global>{`
            @keyframes confetti-fall {
              0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
              }
            }

            .confetti-particle {
              position: absolute;
              width: 10px;
              height: 10px;
              animation: confetti-fall 3s linear forwards;
              border-radius: 50%;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  )
}
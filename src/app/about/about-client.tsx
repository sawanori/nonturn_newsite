'use client'

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { MainLayout } from '@/components/layout/MainLayout'
import { Scene3D } from '@/components/3d/Scene3D'
import { companyInfo } from '@/data/company'
import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import dynamic from 'next/dynamic'
import Script from 'next/script'

// Dynamic import for Google Maps to avoid SSR issues
const GoogleMapComponent = dynamic(
  () => import('@/components/ui/GoogleMap').then((mod) => mod.GoogleMapComponent),
  { 
    ssr: false,
    loading: () => (
      <div className="relative overflow-hidden rounded-lg border border-yellow-400/20 bg-gray-900/50 h-[300px] flex items-center justify-center">
        <p className="text-gray-400">地図を読み込み中...</p>
      </div>
    )
  }
)

const MapFallback = dynamic(
  () => import('@/components/ui/GoogleMap').then((mod) => mod.MapFallback),
  { ssr: false }
)

export default function AboutClient() {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NonTurn合同会社",
    url: "https://non-turn.com/about",
    logo: "https://non-turn.com/ogp/default.jpg",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+81-45-900-8652",
      contactType: "customer service",
      areaServed: "JP",
      availableLanguage: ["Japanese"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "みなとみらい3-7-1 オーシャンゲートみなとみらい8F",
      addressLocality: "横浜市西区",
      addressRegion: "神奈川県",
      postalCode: "220-0012",
      addressCountry: "JP"
    },
  }

  return (
    <>
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <MainLayout>
        {/* Hero Section */}
      <section className="relative min-h-[67vh] lg:min-h-screen flex items-center overflow-hidden">
        <Scene3D className="absolute inset-0 z-0 opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-wider uppercase"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent eng-only">
                ABOUT US
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {companyInfo.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Company Vision */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                <span lang="en" className="eng-only">Our</span> <span className="text-yellow-400 eng-only" lang="en">Mission</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {companyInfo.mission}
              </p>
           </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-yellow-400/20 to-blue-500/20 backdrop-blur-sm border border-yellow-400/30 flex items-center justify-center relative overflow-hidden group  rounded-2xl">
                <div className="text-center relative z-10">
                  <motion.div 
                    className="grid grid-cols-2 gap-4 mb-6 place-items-center justify-center mx-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {companyInfo.team.map((member, i) => (
                      <motion.div
                        key={i}
                        className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl shadow-lg"
                        animate={{ 
                          y: [0, -5, 0],
                          rotateY: [0, 360]
                        }}
                        transition={{ 
                          duration: 3, 
                          delay: i * 0.5, 
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        whileHover={{ scale: 1.2, rotateY: 180 }}
                      >
                        {member.icon}
                      </motion.div>
                    ))}
                  </motion.div>
                  <p className="text-yellow-400 font-medium text-lg">プロフェッショナルチーム</p>
                  <p className="text-gray-300 text-sm mt-2">ディレクター・プロデューサー・エンジニア・クリエイター</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Representative Profile */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="text-yellow-400">Representative</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Simple Modern Profile Card */}
              <div className="relative aspect-square bg-black rounded-lg overflow-hidden shadow-2xl group">
                
                {/* Full Image Background */}
                <img 
                  src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/6A4F63FB-ED0B-4A44-A685-33A0809450A1-haCoMJ0OFBBjS6foXiVFcNXdgiNH8w.jpg"
                  alt="Noritaka Sawada"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
                  
                
                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h3 
                    className="text-3xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    Noritaka Sawada
                  </motion.h3>
                  <motion.p 
                    className="text-yellow-400 text-lg font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    {companyInfo.representative.title}
                  </motion.p>
                </div>
                
                {/* Simple Border Effect on Hover */}
                <div className="absolute inset-0 border-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-2 text-white">
                Noritaka Sawada
              </h3>
              <p className="text-gray-400 text-lg mb-6">
                ディレクター／映像プロデューサー／フォトグラファー／Web・アプリ開発者
              </p>

              {/* キャッチコピー */}
              <motion.div 
                className="bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-xl text-yellow-400 font-semibold italic">
                  「企業の魅力を掘り起こし、伝わるカタチに。」
                </p>
              </motion.div>

              {/* プロフィール本文 */}
              <div className="space-y-6 mb-8">
                <p className="text-gray-300 leading-relaxed">
                  企業VPや採用動画を通じて、企業の本質的な魅力を可視化し、伝えるコンテンツ制作を支援。現場ヒアリングから構成・撮影・編集まで一貫して対応し、伝わる映像に仕上げます。
                </p>
                
                <motion.div 
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-400/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="text-gray-300 leading-relaxed">
                    飲食業界においては、料理撮影のスキルが高く評価されており、
                    <span className="text-yellow-400 font-semibold">「FPA PROFESSIONAL FOOD PHOTOGRAPHY AWARDS 2024」</span>
                    プロフェッショナル部門にて<span className="text-yellow-400 font-semibold">Honorable Mention</span>を受賞。
                    視覚的インパクトとブランド表現力を両立したクリエイティブが強みです。
                  </p>
                </motion.div>

                <p className="text-gray-300 leading-relaxed">
                  また、Web・アプリ開発では <span className="text-blue-400 font-mono">Next.js</span>／
                  <span className="text-blue-400 font-mono">Tailwind CSS</span>／
                  <span className="text-blue-400 font-mono">WordPress</span> を活用したUI/UX設計に加え、
                  飲食店支援ツールの企画・開発・運用も行うなど、
                </p>
              </div>

              {/* 特徴的なスキルセット */}
              <motion.div 
                className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 p-6 rounded-lg border border-yellow-400/30 mb-8"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-center text-2xl font-bold text-white">
                  <span className="text-yellow-400">「表現」</span>
                  <span className="text-gray-400 mx-2">×</span>
                  <span className="text-blue-400">「技術」</span>
                  <span className="text-gray-400 mx-2">×</span>
                  <span className="text-purple-400">「ビジネス感覚」</span>
                </p>
                <p className="text-center text-gray-300 mt-2">
                  を融合した提案が可能です。
                </p>
              </motion.div>

              {/* 実績 */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🏆', text: 'FPA AWARDS 2024 受賞', color: 'from-yellow-400/20 to-orange-400/20' },
                  { icon: '🎬', text: `${companyInfo.achievements.projectsCompleted}社以上の映像制作`, color: 'from-blue-400/20 to-purple-400/20' },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className={`bg-gradient-to-br ${item.color} p-4 rounded-lg border border-gray-700 hover:border-yellow-400/50 transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <p className="text-white font-medium text-sm">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our <span className="text-yellow-400">Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              私たちが大切にしている3つの価値観
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyInfo.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(251, 191, 36, 0.2)"
                }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-yellow-400/20 p-8 hover:border-yellow-400/50 transition-all duration-500  relative overflow-hidden rounded-lg"
              >
                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-black font-bold text-xl">{index + 1}</span>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white tracking-wider uppercase text-center">
                    {value.title}
                  </h3>
                  <h4 className="text-lg text-yellow-400 mb-4 font-medium text-center">{value.subtitle}</h4>
                  <p className="text-gray-300 leading-relaxed text-center">
                    {value.description}
                  </p>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[400%] transition-transform duration-1000 ease-out"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Company <span className="text-yellow-400">Information</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-yellow-400/20 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">会社概要</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-[100px_1fr] gap-4 border-b border-gray-700 pb-2">
                  <span className="text-gray-300">会社名</span>
                  <span className="text-white font-medium">{companyInfo.name}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-4 border-b border-gray-700 pb-2">
                  <span className="text-gray-300">代表者</span>
                  <span className="text-white font-medium">{companyInfo.representative.name}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-4 border-b border-gray-700 pb-4">
                  <span className="text-gray-300">所在地</span>
                  <div className="text-left">
                    <p className="text-white font-medium">{companyInfo.address.postal}</p>
                    <p className="text-white font-medium">
                      神奈川県横浜市西区<br/>
                      みなとみらい3-7-1<br/>
                      オーシャンゲートみなとみらい8F
                    </p>
                    <p className="text-yellow-400 text-sm mt-1">{companyInfo.address.access}</p>
                  </div>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-4">
                  <span className="text-gray-300">連絡先</span>
                  <span className="text-white font-medium">{companyInfo.contact.email}</span>
                </div>
              </div>
              
              {/* Map Section */}
              <div className="mt-8">
                <h4 className="text-xl font-bold mb-4 text-yellow-400">アクセスマップ</h4>
                <div className="relative overflow-hidden rounded-lg border border-yellow-400/20">
                  {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                    <GoogleMapComponent apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} />
                  ) : (
                    <MapFallback />
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-yellow-400/20 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">事業内容</h3>
              <ul className="space-y-3">
                {companyInfo.businessScope.map((business, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span className="text-white">{business}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
    </>
  )
}
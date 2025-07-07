'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { MainLayout } from '@/components/layout/MainLayout'
import { Scene3D } from '@/components/3d/Scene3D'
import { companyInfo } from '@/data/company'

export default function AccessPage() {
  const [mapView, setMapView] = useState<'map' | 'street' | 'satellite'>('map')
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false)
  const [selectedTransport, setSelectedTransport] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  // Transportation options
  const transportOptions = [
    {
      icon: '🚃',
      name: 'みなとみらい線',
      station: 'みなとみらい駅',
      time: '徒歩2分',
      details: 'みなとみらい駅出口より徒歩2分',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: '🚌',
      name: 'バス',
      station: '新高島駅前',
      time: '徒歩1分',
      details: 'バス停より徒歩1分',
      color: 'from-green-400 to-emerald-400'
    },
    {
      icon: '🚗',
      name: '車',
      station: '首都高速横羽線',
      time: '5分',
      details: 'みなとみらいICより5分',
      color: 'from-purple-400 to-violet-400'
    }
  ]

  // Office features
  const officeFeatures = [
    {
      icon: '🏢',
      title: 'モダンオフィス',
      description: 'みなとみらいの最新オフィスビル8階'
    },
    {
      icon: '🌊',
      title: 'オーシャンビュー',
      description: '横浜港を一望できる絶景オフィス'
    },
    {
      icon: '☕',
      title: 'カフェエリア',
      description: 'リラックスした打ち合わせスペース'
    },
    {
      icon: '🖥️',
      title: '最新設備',
      description: '4K編集・高性能撮影機材完備'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0
    }
  }

  const cardHover = {
    rest: { scale: 1, rotateY: 0, z: 0 },
    hover: { 
      scale: 1.05, 
      rotateY: 5, 
      z: 50
    }
  }

  return (
    <MainLayout>
      <div ref={containerRef} className="relative overflow-hidden">
        {/* Advanced Parallax Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 z-0"
          >
            <Scene3D className="opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-indigo-600/20" />
          </motion.div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              style={{ y: headerY }}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center"
            >
              <motion.div
                variants={itemVariants}
                className="mb-8"
              >
                <motion.div 
                  className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, 10, -10, 0],
                    boxShadow: "0 25px 50px rgba(6, 182, 212, 0.5)"
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-5xl">🗺️</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-3xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-6xl md:text-8xl font-bold mb-6 text-white tracking-wider uppercase"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  ACCESS
                </span>
              </motion.h1>
              
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-semibold mb-8 text-cyan-400"
              >
                アクセス・会社情報
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
              >
                横浜みなとみらいの中心部に位置する私たちのオフィスへお越しください
              </motion.p>
              
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <motion.button
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 font-bold text-lg uppercase tracking-wider hover:from-blue-500 hover:to-indigo-600 transition-all duration-300  relative overflow-hidden group rounded-2xl"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDirectionsOpen(true)}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>道順を確認</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🧭
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl"></div>
                </motion.button>
                
                <motion.button
                  className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 py-4 font-bold text-lg uppercase tracking-wider hover:bg-cyan-400 hover:text-white transition-all duration-300  rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  連絡先を見る
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                オフィス<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">マップ</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                最寄り駅から徒歩2分の好立地
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Map Controls */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">地図表示</h3>
                  <div className="space-y-3">
                    {['map', 'street', 'satellite'].map((view) => (
                      <motion.button
                        key={view}
                        className={`w-full p-3 rounded-lg font-medium transition-all duration-300 ${
                          mapView === view
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMapView(view as 'map' | 'street' | 'satellite')}
                      >
                        {view === 'map' && '🗺️ 地図'}
                        {view === 'street' && '🏙️ ストリート'}
                        {view === 'satellite' && '🛰️ 衛星'}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Office Address */}
                <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">住所</h3>
                  <div className="space-y-3 text-gray-300">
                    <p className="text-lg font-semibold text-white">{companyInfo.address.postal}</p>
                    <p>{companyInfo.address.full}</p>
                    <p className="text-cyan-400 font-medium">{companyInfo.address.access}</p>
                  </div>
                </div>
              </motion.div>

              {/* Interactive Map */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden relative group">
                  <div className="aspect-video bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center relative">
                    <motion.div
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(6, 182, 212, 0.7)",
                            "0 0 0 20px rgba(6, 182, 212, 0)",
                            "0 0 0 0 rgba(6, 182, 212, 0)"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity
                        }}
                      >
                        📍
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">NonTurn.LLC</h3>
                      <p className="text-cyan-400">オーシャンゲートみなとみらい 8F</p>
                    </motion.div>

                    {/* Animated Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`
                          }}
                          animate={{
                            y: [0, -10, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1]
                          }}
                          transition={{
                            duration: 3,
                            delay: i * 0.5,
                            repeat: Infinity
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Map Type Indicator */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-cyan-400 text-sm font-medium capitalize">{mapView} View</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Transportation Section */}
        <section className="py-32 bg-gray-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                アクセス<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">方法</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                電車、バス、車など様々な方法でお越しいただけます
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {transportOptions.map((transport, index) => (
                <motion.div
                  key={index}
                  initial="rest"
                  whileHover="hover"
                  animate={selectedTransport === index ? "hover" : "rest"}
                  variants={cardHover}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setSelectedTransport(index)}
                  onClick={() => setSelectedTransport(index)}
                >
                  <motion.div
                    className={`relative p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 ${
                      selectedTransport === index 
                        ? 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border-cyan-400/50 shadow-2xl' 
                        : 'bg-gray-800/50 border-gray-700/50 hover:border-cyan-400/30'
                    }`}
                    style={{ transform: "translateZ(25px)" }}
                  >
                    {/* Transport Icon */}
                    <motion.div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl transition-all duration-500 bg-gradient-to-br ${transport.color} text-white shadow-lg`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, 0],
                        boxShadow: "0 15px 35px rgba(6, 182, 212, 0.4)"
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {transport.icon}
                    </motion.div>
                    
                    <motion.h3 
                      className={`text-2xl font-bold mb-2 text-center transition-colors duration-300 ${
                        selectedTransport === index ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400'
                      }`}
                      animate={selectedTransport === index ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {transport.name}
                    </motion.h3>
                    
                    <p className={`text-center mb-2 transition-colors duration-300 ${
                      selectedTransport === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`}>
                      {transport.station}
                    </p>
                    
                    <motion.div 
                      className={`text-3xl font-bold text-center mb-4 transition-colors duration-300 ${
                        selectedTransport === index ? 'text-cyan-400' : 'text-gray-300'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {transport.time}
                    </motion.div>
                    
                    <p className={`text-center text-sm transition-colors duration-300 ${
                      selectedTransport === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`}>
                      {transport.details}
                    </p>
                    
                    {/* Glowing Border Effect */}
                    {selectedTransport === index && (
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-transparent to-blue-500/20 animate-pulse"></div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Office Features */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-blue-500/5"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                オフィス<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">環境</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                快適で機能的な空間でお打ち合わせをお待ちしております
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {officeFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(6, 182, 212, 0.3)"
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/50 p-8 rounded-2xl hover:border-cyan-400/50 transition-all duration-500  group"
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl group-hover:shadow-lg"
                    whileHover={{ rotateX: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-4 text-white text-center group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 text-center text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section id="contact-info" className="py-32 bg-gradient-to-b from-gray-900 to-black relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                会社<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">情報</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Company Details */}
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-8">会社概要</h3>
                  <div className="space-y-6">
                    {[
                      { label: '会社名', value: companyInfo.name },
                      { label: '代表者', value: companyInfo.representative.name },
                      { label: '住所', value: `${companyInfo.address.postal}\n${companyInfo.address.full}` },
                      { label: 'アクセス', value: companyInfo.address.access },
                      { label: 'メール', value: companyInfo.contact.email }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col border-b border-gray-700/50 pb-4"
                      >
                        <span className="text-gray-400 text-sm mb-1">{item.label}</span>
                        <span className="text-white font-medium whitespace-pre-line">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Business Content */}
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-8">事業内容</h3>
                  <div className="space-y-4">
                    {companyInfo.businessScope.map((business, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <motion.div
                          className="w-3 h-3 bg-cyan-400 rounded-full mr-4 mt-2 flex-shrink-0"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            delay: index * 0.3,
                            repeat: Infinity
                          }}
                        />
                        <span className="text-white leading-relaxed">{business}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Social Media */}
                  <div className="mt-12">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-4">SNS</h4>
                    <div className="flex space-x-4">
                      <motion.a
                        href={`https://instagram.com/${companyInfo.contact.socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        📸
                      </motion.a>
                      <motion.a
                        href={`https://twitter.com/${companyInfo.contact.socialMedia.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🐦
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
          </div>
        </section>

        {/* Directions Modal */}
        <AnimatePresence>
          {isDirectionsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsDirectionsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-2xl w-full bg-gradient-to-br from-gray-900 to-black border border-cyan-400/30 rounded-2xl p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsDirectionsOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>

                <h3 className="text-3xl font-bold text-cyan-400 mb-6">道順案内</h3>
                
                <div className="space-y-6">
                  {transportOptions.map((transport, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{transport.icon}</span>
                        <span className="text-xl font-semibold text-white">{transport.name}</span>
                      </div>
                      <p className="text-cyan-400 font-medium">{transport.station}</p>
                      <p className="text-gray-300">{transport.details}</p>
                      <p className="text-cyan-400 font-bold mt-2">{transport.time}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <motion.button
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-500 hover:to-indigo-600 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDirectionsOpen(false)}
                  >
                    閉じる
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  )
}

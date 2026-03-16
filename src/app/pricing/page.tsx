'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/MainLayout'
import { services, packages } from '@/data/services'
import { HeroSection } from '@/components/ui/HeroSection'
import { GradientButton } from '@/components/ui/GradientButton'
import { PricingCalculator } from '@/components/pricing/PricingCalculator'
import { FAQSection } from '@/components/ui/FAQSection'
import { ServiceNavigation } from '@/types'

export default function PricingPage() {
  const [selectedService, setSelectedService] = useState<ServiceNavigation['id']>('movie')
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)

  // Service navigation
  const serviceNav: ServiceNavigation[] = [
    { 
      id: 'movie', 
      name: '映像制作', 
      icon: '🎬', 
      color: 'from-yellow-400 to-orange-500',
      description: '企業VP・商品PR・イベント記録'
    },
    { 
      id: 'photo', 
      name: '写真撮影', 
      icon: '📸', 
      color: 'from-blue-400 to-purple-500',
      description: 'イベント・商品・ポートレート撮影'
    },
    { 
      id: 'web', 
      name: 'Web制作', 
      icon: '💻', 
      color: 'from-purple-400 to-pink-500',
      description: 'コーポレート・LP・ECサイト'
    }
  ]

  const cardHover = {
    rest: { scale: 1, rotateY: 0, z: 0 },
    hover: { 
      scale: 1.05, 
      rotateY: 3, 
      z: 30
    }
  }

  const pricingFAQs = [
    {
      question: '料金の支払い方法を教えてください',
      answer: '銀行振込、クレジットカード決済に対応しております。プロジェクト開始前に50%、完成時に残り50%をお支払いいただきます。'
    },
    {
      question: '追加料金が発生する場合はありますか？',
      answer: '基本プランに含まれる範囲を超える場合のみ追加料金が発生します。事前にお見積もりを提示し、ご承認いただいてから作業を進めます。'
    },
    {
      question: 'キャンセル料は発生しますか？',
      answer: 'プロジェクト開始後のキャンセルは、進行状況に応じてキャンセル料が発生する場合があります。詳細は契約時にご説明いたします。'
    },
    {
      question: '見積もりは無料ですか？',
      answer: 'はい、お見積もりは無料です。プロジェクトの詳細をお聞かせいただければ、詳細なお見積もりを作成いたします。'
    },
    {
      question: '料金に消費税は含まれていますか？',
      answer: '表示価格は税別となっております。別途消費税を申し受けます。'
    }
  ]

  return (
    <MainLayout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <HeroSection
          title="PRICING"
          subtitle="料金プラン"
          description="透明性の高い料金体系で、あなたのプロジェクトに最適なプランをご提案"
          icon="💰"
          gradient="from-emerald-400 via-teal-500 to-cyan-600"
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <GradientButton
              variant="secondary"
              size="lg"
              onClick={() => setIsCalculatorOpen(true)}
            >
              料金シミュレーター
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🧮
              </motion.span>
            </GradientButton>
            
            <Link href="/contact">
              <GradientButton variant="outline" size="lg">
                お見積もり依頼
              </GradientButton>
            </Link>
          </div>
        </HeroSection>

        {/* Service Navigation */}
        <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                サービス<span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">選択</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                ご希望のサービスを選択して詳細な料金をご確認ください
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {serviceNav.map((service) => (
                <motion.div
                  key={service.id}
                  initial="rest"
                  whileHover="hover"
                  animate={selectedService === service.id ? "hover" : "rest"}
                  variants={cardHover}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedService(service.id)}
                >
                  <motion.div
                    className={`relative p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 ${
                      selectedService === service.id 
                        ? 'bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border-emerald-400/50 shadow-2xl' 
                        : 'bg-gray-900/50 border-gray-700/50 hover:border-emerald-400/30'
                    }`}
                    style={{ transform: "translateZ(25px)" }}
                  >
                    {/* Service Icon */}
                    <motion.div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl transition-all duration-500 bg-gradient-to-br ${service.color} text-white shadow-lg`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        boxShadow: "0 15px 35px rgba(16, 185, 129, 0.4)"
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {service.icon}
                    </motion.div>
                    
                    <motion.h3 
                      className={`text-2xl font-bold mb-4 text-center transition-colors duration-300 ${
                        selectedService === service.id ? 'text-emerald-400' : 'text-white group-hover:text-emerald-400'
                      }`}
                      animate={selectedService === service.id ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {service.name}
                    </motion.h3>
                    
                    <p className={`text-center text-sm transition-colors duration-300 ${
                      selectedService === service.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`}>
                      {service.description}
                    </p>
                    
                    {/* Selection Indicator */}
                    {selectedService === service.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-xs">✓</span>
                      </motion.div>
                    )}
                    
                    {/* Glowing Border Effect */}
                    {selectedService === service.id && (
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/20 via-transparent to-teal-500/20 animate-pulse"></div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Pricing Details */}
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
                {serviceNav.find(s => s.id === selectedService)?.name}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent"> 料金</span>
              </h2>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Movie Service Pricing */}
                {selectedService === 'movie' && (
                  <div className="max-w-4xl mx-auto">
                    <motion.div
                      className="bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-center mb-12">
                        <motion.div
                          className="text-6xl md:text-7xl font-bold text-emerald-400 mb-4"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          ¥{services.movie.basePrice.toLocaleString()}
                        </motion.div>
                        <p className="text-xl text-gray-300">{services.movie.priceNote}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                          <h4 className="text-xl font-semibold text-emerald-400 mb-6">基本料金に含まれるもの</h4>
                          <div className="space-y-4">
                            {services.movie.features.slice(0, 4).map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center text-gray-300"
                              >
                                <span className="w-3 h-3 bg-emerald-400 rounded-full mr-4"></span>
                                {feature}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-semibold text-emerald-400 mb-6">追加料金</h4>
                          <div className="space-y-4">
                            {services.movie.additionalCosts.map((cost, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex justify-between items-center text-gray-300 border-b border-gray-700/50 pb-2"
                              >
                                <span>{cost.item}</span>
                                <span className="text-emerald-400 font-semibold">{cost.price}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Photo Service Pricing */}
                {selectedService === 'photo' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {services.photo.plans.map((plan, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 relative overflow-hidden group"
                      >
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                          <motion.div
                            className="text-5xl font-bold text-emerald-400 mb-2"
                            whileHover={{ scale: 1.1 }}
                          >
                            ¥{plan.basePrice.toLocaleString()}〜
                          </motion.div>
                          <p className="text-gray-400">{plan.duration} / {plan.deliveryTime}</p>
                        </div>
                        
                        <p className="text-center text-gray-300 mb-8">{plan.description}</p>
                        
                        <div className="space-y-3 mb-8">
                          {plan.includes.map((item, itemIndex) => (
                            <motion.div
                              key={itemIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: itemIndex * 0.1 }}
                              className="flex items-center text-gray-300"
                            >
                              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                              {item}
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="text-center bg-emerald-400/10 border border-emerald-400/30 rounded-lg p-4">
                          <p className="text-sm text-gray-400">追加1時間</p>
                          <p className="font-bold text-emerald-400">¥{plan.additionalHour.toLocaleString()}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Web Service Pricing */}
                {selectedService === 'web' && (
                  <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {services.web.services.map((service, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -10 }}
                          className="bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 relative overflow-hidden group"
                        >
                          <div className="text-center mb-6">
                            <motion.div
                              className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-white text-2xl"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              💻
                            </motion.div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                              {service.name}
                            </h3>
                          </div>
                          
                          <p className="text-gray-400 text-sm text-center mb-6">{service.description}</p>
                          
                          <div className="space-y-2">
                            {service.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: featureIndex * 0.05 }}
                                className="text-sm text-gray-300 flex items-center"
                              >
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                                {feature}
                              </motion.div>
                            ))}
                          </div>
                          
                          <div className="mt-6 text-center">
                            <span className="text-emerald-400 font-bold">お見積もり</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="mt-12 text-center bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8"
                    >
                      <h4 className="text-2xl font-bold text-emerald-400 mb-4">Web制作の料金について</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Web制作は、要件や規模により料金が大きく変動いたします。
                        お客様のご要望を詳しくお聞かせいただき、最適なプランと正確なお見積もりをご提案いたします。
                      </p>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Package Plans */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                継続型<span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">パッケージプラン</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                継続的なコンテンツ制作で、より効果的なマーケティングを実現
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={`relative bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border rounded-3xl p-8 ${
                    pkg.recommended
                      ? 'border-yellow-400/50 ring-2 ring-yellow-400/20'
                      : 'border-gray-700/50'
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-bold rounded-full">
                      おすすめ
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{pkg.description}</p>
                    <div className="text-3xl font-bold text-emerald-400 mb-1">{pkg.priceLabel}</div>
                    <p className="text-xs text-gray-500">{pkg.period}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`block text-center py-3 rounded-lg font-medium transition-all duration-300 ${
                      pkg.recommended
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600'
                        : 'border border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400'
                    }`}
                  >
                    まず無料相談する
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          title="料金"
          subtitle="FAQ"
          faqs={pricingFAQs}
          gradient="from-emerald-400 to-teal-500"
        />

        {/* Pricing Calculator Modal */}
        <PricingCalculator
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
          serviceNav={serviceNav}
        />
      </div>
    </MainLayout>
  )
}
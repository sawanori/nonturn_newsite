'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/ui/HeroSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "東京の企業向け動画制作 | 縦型動画・プロモーション映像制作",
  description: "東京都内の企業向け動画制作・映像制作を提供。縦型動画、プロモーション映像、企業PR動画など幅広く対応。東京23区内の法人様向けのプロフェッショナルな動画制作なら NonTurn.LLC にお任せください。出張撮影・スタジオ撮影対応。",
  keywords: "動画制作,映像制作,企業,東京,東京都,23区,縦型動画,プロモーション,法人,商品紹介,会社紹介,出張撮影,スタジオ撮影,高品質,プロフェッショナル",
  openGraph: {
    title: "東京の企業向け動画制作 | 縦型動画・プロモーション映像制作",
    description: "東京都内の企業向け動画制作を提供。縦型動画、プロモーション映像制作のプロフェッショナル集団。",
  },
}

const tokyoAreas = [
  { name: '千代田区', features: ['オフィス街撮影', '企業PR動画'], landmark: '皇居・大手町' },
  { name: '中央区', features: ['商業施設撮影', '商品紹介動画'], landmark: '銀座・築地' },
  { name: '港区', features: ['高級感演出', '企業ブランディング'], landmark: '六本木・赤坂' },
  { name: '新宿区', features: ['繁華街撮影', 'リクルート動画'], landmark: '新宿・歌舞伎町' },
  { name: '渋谷区', features: ['トレンド撮影', 'SNS動画'], landmark: '渋谷・原宿' },
  { name: '品川区', features: ['ビジネス街撮影', '企業説明動画'], landmark: '品川・大崎' },
  { name: '世田谷区', features: ['住宅系撮影', 'ライフスタイル動画'], landmark: '二子玉川・下北沢' },
  { name: '台東区', features: ['伝統文化撮影', '職人技動画'], landmark: '浅草・上野' },
]

const tokyoServices = [
  {
    title: '東京都内企業PR動画制作',
    price: '¥150,000〜',
    description: '東京の企業イメージに合わせたプロフェッショナルなPR動画を制作',
    features: [
      '東京都内ロケーション撮影',
      '企業理念の映像化',
      '社員インタビュー',
      '事業内容説明',
      '多言語対応（英語・中国語）'
    ]
  },
  {
    title: '東京エリア商品紹介動画',
    price: '¥100,000〜',
    description: '東京の消費者に訴求力の高い商品紹介動画を制作',
    features: [
      '東京トレンドを意識した演出',
      '商品の魅力最大化',
      'EC サイト用最適化',
      '複数バリエーション制作',
      'SNS用縦型動画対応'
    ]
  },
  {
    title: '東京企業採用動画制作',
    price: '¥200,000〜',
    description: '東京で働く魅力を伝える採用動画で優秀な人材を獲得',
    features: [
      '東京オフィス環境紹介',
      '働く社員の声',
      '東京ライフスタイル提案',
      '職場の雰囲気伝達',
      '新卒・中途採用対応'
    ]
  }
]

const tokyoStats = [
  {
    number: '500+',
    label: '東京企業様実績',
    description: '東京都内の企業様から多数のご依頼'
  },
  {
    number: '23区',
    label: '全域対応',
    description: '東京23区すべてのエリアで撮影対応'
  },
  {
    number: '24h',
    label: '以内対応',
    description: '東京都内なら24時間以内に返信'
  },
  {
    number: '98%',
    label: 'お客様満足度',
    description: '東京エリアのお客様から高評価'
  }
]

export default function TokyoPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        title="東京の企業向け動画制作"
        subtitle="高品質な映像制作サービス"
        description="東京都内の企業様向けに動画制作・映像制作を提供。縦型動画、プロモーション映像、企業PR動画など幅広く対応いたします。"
        icon="🏙️"
        gradient="from-red-400 via-pink-500 to-purple-600"
        backgroundOpacity={0.4}
      >
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/contact">
            <motion.button
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-8 py-4 font-bold text-lg uppercase tracking-wider hover:from-pink-500 hover:to-purple-500 transition-all duration-300 relative overflow-hidden group rounded-2xl"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">東京で見積もり依頼</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl"></div>
            </motion.button>
          </Link>
          
          <motion.button
            className="bg-transparent border-2 border-red-400 text-red-400 px-8 py-4 font-bold text-lg uppercase tracking-wider hover:bg-red-400 hover:text-white transition-all duration-300 rounded-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('tokyo-services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            東京エリアサービス
          </motion.button>
        </div>
      </HeroSection>

      {/* Tokyo Stats Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              東京エリア<span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">実績</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {tokyoStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-bold text-red-400 mb-2">
                  {stat.number}
                </div>
                <p className="text-white font-semibold mb-2">{stat.label}</p>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokyo Areas Coverage */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              東京<span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">23区対応</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              東京都内のあらゆるエリアで、その地域特性を活かした動画制作を行います
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tokyoAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl border border-red-400/20 p-6 rounded-xl hover:border-red-400/50 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  {area.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{area.landmark}</p>
                <div className="space-y-1">
                  {area.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="text-sm text-gray-300 flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokyo Services Section */}
      <section id="tokyo-services" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              東京企業向け<span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">動画制作サービス</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              東京の企業様のニーズに特化した動画制作メニュー
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tokyoServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-red-400/20 p-8 rounded-2xl hover:border-red-400/50 transition-all duration-500 group"
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(239, 68, 68, 0.3)" }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-3xl font-bold text-red-400 mb-3">{service.price}</div>
                  <p className="text-gray-400">{service.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-red-400">含まれるサービス:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact">
                  <motion.button
                    className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    東京エリアで見積もり
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Tokyo */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              東京企業が選ぶ<span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">理由</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '💰',
                title: '東京エリア専門',
                description: '東京都内の企業様向けに特化したサービスを提供'
              },
              {
                icon: '🚀',
                title: '東京トレンド対応',
                description: '東京の最新トレンドを取り入れた、時代に合った動画制作'
              },
              {
                icon: '🎯',
                title: '東京市場特化',
                description: '東京の企業文化やビジネス環境を熟知したプロフェッショナル制作'
              },
              {
                icon: '📍',
                title: '都内迅速対応',
                description: '東京23区内なら即日対応可能、スピーディーな制作進行'
              },
              {
                icon: '🏢',
                title: '東京企業実績',
                description: '東京の大手企業から中小企業まで幅広い制作実績'
              },
              {
                icon: '🎬',
                title: '多言語対応',
                description: '国際都市東京に対応した英語・中国語などの多言語制作'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-red-400/20 p-6 rounded-xl hover:border-red-400/50 transition-all duration-300 text-center group"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              東京で<span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">高品質</span>な動画制作をお探しなら
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              東京都内の企業様向けに、高品質な動画制作をご提供いたします。
              まずはお気軽にご相談ください。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <motion.button
                  className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-12 py-4 font-bold text-lg uppercase tracking-wider hover:from-pink-500 hover:to-purple-500 transition-all duration-300 rounded-2xl"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  東京で無料見積もり
                </motion.button>
              </Link>
              
              <Link href="/portfolio">
                <motion.button
                  className="bg-transparent border-2 border-red-400 text-red-400 px-12 py-4 font-bold text-lg uppercase tracking-wider hover:bg-red-400 hover:text-white transition-all duration-300 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  東京の制作実績
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  )
}
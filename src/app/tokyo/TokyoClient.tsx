'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const tokyoAreas = [
  { name: '千代田区', features: ['縦型動画Instagram', '企業縦型動画'], landmark: '大手町・丸の内' },
  { name: '中央区', features: ['縦型動画TikTok', '商品縦型動画'], landmark: '銀座・日本橋' },
  { name: '港区', features: ['縦型動画Reels', 'ブランド縦型動画'], landmark: '六本木・表参道' },
  { name: '新宿区', features: ['縦型動画Shorts', 'リクルート縦型動画'], landmark: '新宿・高田馬場' },
  { name: '文京区', features: ['教育縦型動画', '大学縦型動画'], landmark: '東京大学・後楽園' },
  { name: '台東区', features: ['観光縦型動画', '伝統縦型動画'], landmark: '浅草・上野' },
  { name: '墨田区', features: ['イベント縦型動画', '観光縦型動画'], landmark: 'スカイツリー・両国' },
  { name: '江東区', features: ['企業縦型動画', '展示会縦型動画'], landmark: '有明・豊洲' },
  { name: '品川区', features: ['ビジネス縦型動画', 'IT企業縦型動画'], landmark: '品川・大崎' },
  { name: '目黒区', features: ['ファッション縦型動画', 'カフェ縦型動画'], landmark: '中目黒・自由が丘' },
  { name: '大田区', features: ['製造業縦型動画', '物流縦型動画'], landmark: '羽田空港・蒲田' },
  { name: '世田谷区', features: ['住宅縦型動画', 'ライフ縦型動画'], landmark: '二子玉川・三軒茶屋' },
  { name: '渋谷区', features: ['トレンド縦型動画', 'SNS縦型動画'], landmark: '渋谷・原宿' },
  { name: '中野区', features: ['サブカル縦型動画', 'アニメ縦型動画'], landmark: '中野・ブロードウェイ' },
  { name: '杉並区', features: ['文化縦型動画', 'コミュニティ縦型動画'], landmark: '高円寺・阿佐ヶ谷' },
  { name: '豊島区', features: ['エンタメ縦型動画', 'サブカル縦型動画'], landmark: '池袋・サンシャイン' },
  { name: '北区', features: ['地域縦型動画', '商店街縦型動画'], landmark: '赤羽・王子' },
  { name: '荒川区', features: ['下町縦型動画', '職人縦型動画'], landmark: '日暮里・町屋' },
  { name: '板橋区', features: ['地域縦型動画', '商店縦型動画'], landmark: '板橋・大山' },
  { name: '練馬区', features: ['ファミリー縦型動画', 'アニメ縦型動画'], landmark: '練馬・光が丘' },
  { name: '足立区', features: ['地域縦型動画', '教育縦型動画'], landmark: '北千住・竹ノ塚' },
  { name: '葛飾区', features: ['観光縦型動画', '下町縦型動画'], landmark: '柴又・亀有' },
  { name: '江戸川区', features: ['地域縦型動画', 'ファミリー縦型動画'], landmark: '葛西・小岩' },
]

const tokyoServices = [
  {
    title: '渋谷区 新宿区 港区 縦型動画制作',
    price: '¥48,000〜',
    description: '渋谷区・新宿区・港区・千代田区・中央区・文京区・台東区でInstagram・TikTok向け縦型動画を高速制作',
    features: [
      '縦型動画（9:16）専門制作',
      '最速24時間納品',
      '各区出張撮影対応',
      'SNSバズる演出提案',
      '複数SNS同時投稿用最適化'
    ]
  },
  {
    title: '千代田区 中央区 文京区 企業縦型動画',
    price: '¥120,000〜',
    description: '千代田区・中央区・文京区・台東区・墨田区・江東区の企業ブランドを縦型動画で発信',
    features: [
      '縦型動画10本セット',
      '各区ロケーション撮影',
      'スマホファースト映像設計',
      '英語・中国語字幕対応',
      'Instagram・TikTok最適化'
    ]
  },
  {
    title: '世田谷区 目黒区 大田区 店舗縦型動画',
    price: '¥80,000〜',
    description: '世田谷区・目黒区・大田区・品川区・中野区・杉並区・練馬区の店舗集客用縦型動画制作',
    features: [
      '縦型動画月額制作プラン',
      '各区の特性に合わせた制作',
      'インフルエンサーコラボ可能',
      'ストーリーズ専用動画',
      '毎月新作縦型動画納品'
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

interface TokyoClientProps {
  isHeroButtons?: boolean;
}

export function TokyoClient({ isHeroButtons = false }: TokyoClientProps) {
  if (isHeroButtons) {
    return (
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
    )
  }

  return (
    <>
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
              渋谷区 新宿区 港区<span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent"> 縦型動画制作</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              千代田区・中央区・文京区・台東区・墨田区・江東区・品川区・目黒区・大田区・世田谷区・中野区・杉並区・豊島区・北区・荒川区・板橋区・練馬区・足立区・葛飾区・江戸川区の縦型動画専門
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
                  {area.name} 縦型動画制作
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
              港区 品川区 世田谷区<span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent"> 縦型動画サービス</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              目黒区・大田区・中野区・杉並区の企業向けInstagram Reels、豊島区・北区・荒川区・板橋区のTikTok動画制作
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

      {/* Food Photography Service for Tokyo */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-2 border-orange-400/30 rounded-3xl p-12 text-center hover:border-orange-400/50 transition-all duration-300"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              🍽️ 東京の飲食店様向け<span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">専門撮影サービス</span>
            </h2>
            <p className="text-xl text-gray-200 mb-4">
              港区・渋谷区・新宿区・品川区など東京23区全域で飲食店撮影に対応
            </p>
            <p className="text-lg text-gray-300 mb-8">
              料理写真・店舗内観・外観撮影 | 東京エリア出張無料 | プロカメラマンによる撮影
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-orange-400/20 text-orange-400 rounded-full text-sm">
                銀座・六本木の高級レストラン
              </span>
              <span className="px-4 py-2 bg-orange-400/20 text-orange-400 rounded-full text-sm">
                渋谷・新宿のカフェ
              </span>
              <span className="px-4 py-2 bg-orange-400/20 text-orange-400 rounded-full text-sm">
                浅草・上野の和食店
              </span>
            </div>
            <Link href="/services/photo/foodphoto">
              <motion.button
                className="inline-flex items-center bg-gradient-to-r from-orange-400 to-red-500 text-white px-10 py-5 rounded-xl font-bold text-xl hover:from-orange-500 hover:to-red-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                東京の飲食店撮影サービス詳細
                <svg className="w-7 h-7 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
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
    </>
  )
}
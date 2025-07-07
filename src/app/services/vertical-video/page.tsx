'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/ui/HeroSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "縦型動画制作 | 東京・横浜の企業向けTikTok・Instagram動画制作",
  description: "東京・横浜エリアで企業向け縦型動画制作を提供。TikTok、Instagram、YouTubeショート対応の縦型動画・SNS動画を制作。法人様のバイラル動画制作はNonTurn.LLCにお任せください。",
  keywords: "縦型動画,縦型動画制作,企業,東京,横浜,TikTok,Instagram,YouTubeショート,SNS動画,バイラル動画,法人,高品質,プロフェッショナル",
  openGraph: {
    title: "縦型動画制作 | 東京・横浜の企業向けTikTok・Instagram動画制作",
    description: "東京・横浜エリアで企業向け縦型動画制作を提供。SNS動画・バイラル動画制作のプロ。",
  },
}

const verticalVideoServices = [
  {
    name: 'TikTok企業アカウント動画',
    price: 50000,
    duration: '15-60秒',
    features: [
      'TikTokトレンド調査',
      '企業ブランドに合わせた企画',
      'ハッシュタグ戦略提案',
      'バイラル要素の組み込み',
      '縦型（9:16）最適化',
    ],
    description: '企業のTikTokアカウント運用に最適な縦型動画を制作'
  },
  {
    name: 'Instagram リール動画',
    price: 45000,
    duration: '15-30秒',
    features: [
      'Instagram最適化',
      'ストーリー性重視',
      'ブランドカラー統一',
      'エンゲージメント向上施策',
      'CTA（行動喚起）最適化',
    ],
    description: 'Instagramのリール機能に特化した縦型プロモーション動画'
  },
  {
    name: 'YouTubeショート動画',
    price: 40000,
    duration: '60秒以内',
    features: [
      'YouTube SEO対策',
      'サムネイル最適化',
      'チャンネル連携',
      '再生回数向上施策',
      'コメント誘導設計',
    ],
    description: 'YouTubeショート機能向けの縦型エンゲージメント動画'
  },
  {
    name: '企業採用向け縦型動画',
    price: 80000,
    duration: '30-90秒',
    features: [
      '採用ターゲット分析',
      '社員インタビュー撮影',
      'オフィス環境紹介',
      '働く魅力の可視化',
      '各SNS同時配信対応',
    ],
    description: '若手人材獲得に効果的な縦型採用動画'
  }
]

const verticalVideoTrends = [
  {
    platform: 'TikTok',
    trend: 'チャレンジ系コンテンツ',
    engagement: '300%↑',
    cost: '低コスト',
    description: '企業ブランドとトレンドを組み合わせたチャレンジ動画で高いエンゲージメントを獲得'
  },
  {
    platform: 'Instagram',
    trend: 'ビフォーアフター',
    engagement: '250%↑',
    cost: '中コスト',
    description: '商品・サービスの変化を分かりやすく伝えるビフォーアフター縦型動画'
  },
  {
    platform: 'YouTube',
    trend: 'ハウツー・解説',
    engagement: '200%↑',
    cost: '中コスト',
    description: '短時間で価値のある情報を提供するハウツー系縦型動画'
  },
  {
    platform: '全SNS対応',
    trend: 'ストーリーテリング',
    engagement: '400%↑',
    cost: '高コスト',
    description: '感情に訴えかけるストーリー性のある企業縦型動画'
  }
]

export default function VerticalVideoPage() {
  const [selectedService, setSelectedService] = useState(0)
  const [selectedTrend, setSelectedTrend] = useState(0)

  // Helper function to render text with English parts styled
  const renderTextWithEnglish = (text: string) => {
    const parts = text.split(/(TikTok|Instagram|YouTube|SNS)/g)
    return parts.map((part, index) => {
      if (['TikTok', 'Instagram', 'YouTube', 'SNS'].includes(part)) {
        return <span key={index} className="eng-only">{part}</span>
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        title="縦型動画制作"
        subtitle="TikTok・Instagram・YouTubeショート対応"
        description="東京・横浜エリアで企業向け縦型動画制作を提供。SNS時代に最適化された縦型動画でバイラル効果を狙います。"
        icon="📱"
        gradient="from-pink-400 via-purple-500 to-blue-500"
        backgroundOpacity={0.4}
      >
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-4 font-bold text-lg uppercase tracking-wider hover:from-purple-500 hover:to-blue-500 transition-all duration-300 relative overflow-hidden group rounded-2xl"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>サービス一覧</span>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                📱
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl"></div>
          </motion.button>
          
          <Link href="/contact">
            <motion.button
              className="bg-transparent border-2 border-pink-400 text-pink-400 px-8 py-4 font-bold text-lg uppercase tracking-wider hover:bg-pink-400 hover:text-white transition-all duration-300 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              見積もり依頼
            </motion.button>
          </Link>
        </div>
      </HeroSection>

      {/* Why Vertical Video Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              なぜ今<span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">縦型動画</span>なのか？
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              SNS全盛期の今、企業のマーケティング戦略に縦型動画は必須要素となっています
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'エンゲージメント300%向上',
                description: '縦型動画は横型動画と比較して3倍のエンゲージメント率を記録',
                stat: '300%',
                color: 'from-pink-400 to-red-500'
              },
              {
                icon: '👥',
                title: 'Z世代・ミレニアル世代に最適',
                description: 'スマートフォンネイティブ世代の視聴習慣に完全対応',
                stat: '92%',
                color: 'from-purple-400 to-pink-500'
              },
              {
                icon: '💰',
                title: '低予算で高いROI',
                description: '従来の動画制作の1/3の予算で同等以上の効果を実現',
                stat: '1/3',
                color: 'from-blue-400 to-purple-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-pink-400/20 p-8 rounded-2xl hover:border-pink-400/50 transition-all duration-500 group"
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(236, 72, 153, 0.3)" }}
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl group-hover:shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {item.icon}
                </motion.div>
                
                <div className={`text-4xl font-bold mb-4 text-center bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.stat}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white text-center group-hover:text-pink-400 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Video Services Section */}
      <section id="services" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              縦型動画<span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">制作メニュー</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              各SNSプラットフォームに最適化された縦型動画制作サービス
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {verticalVideoServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border transition-all duration-500 p-8 rounded-2xl cursor-pointer ${
                  selectedService === index 
                    ? 'border-pink-400/50 shadow-2xl shadow-pink-400/20' 
                    : 'border-gray-700/50 hover:border-pink-400/30'
                }`}
                onClick={() => setSelectedService(index)}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{renderTextWithEnglish(service.name)}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-pink-400">
                      ¥{service.price.toLocaleString()}〜
                    </div>
                    <div className="text-sm text-gray-400">{service.duration}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-pink-400">含まれるサービス:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                        {renderTextWithEnglish(feature)}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedService === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-pink-400/20"
                  >
                    <Link href="/contact">
                      <motion.button
                        className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        このプランで見積もり依頼
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Content Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              トレンド<span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">コンテンツ</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              各プラットフォームで効果実証済みのトレンドコンテンツ戦略
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verticalVideoTrends.map((trend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border transition-all duration-500 p-6 rounded-2xl cursor-pointer ${
                  selectedTrend === index 
                    ? 'border-pink-400/50 shadow-xl shadow-pink-400/20' 
                    : 'border-gray-700/50 hover:border-pink-400/30'
                }`}
                onClick={() => setSelectedTrend(index)}
                whileHover={{ y: -5 }}
              >
                <div className="text-center mb-4">
                  <h3 className={`font-bold text-pink-400 mb-2 ${['TikTok', 'Instagram', 'YouTube'].includes(trend.platform) ? 'eng-only' : ''}`}>{trend.platform}</h3>
                  <h4 className="text-lg font-semibold text-white mb-2">{trend.trend}</h4>
                  <div className="text-2xl font-bold text-green-400 mb-1">{trend.engagement}</div>
                  <div className="text-sm text-gray-400">{trend.cost}</div>
                </div>
                
                <p className="text-sm text-gray-300 text-center">
                  {trend.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              東京・横浜で<span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">高品質</span>な縦型動画制作
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              企業のSNSマーケティングを成功に導く縦型動画制作のプロフェッショナル集団。
              まずはお気軽にご相談ください。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <motion.button
                  className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-12 py-4 font-bold text-lg uppercase tracking-wider hover:from-purple-500 hover:to-blue-500 transition-all duration-300 rounded-2xl"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  無料見積もり依頼
                </motion.button>
              </Link>
              
              <Link href="/portfolio">
                <motion.button
                  className="bg-transparent border-2 border-pink-400 text-pink-400 px-12 py-4 font-bold text-lg uppercase tracking-wider hover:bg-pink-400 hover:text-white transition-all duration-300 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  制作実績を見る
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  )
}
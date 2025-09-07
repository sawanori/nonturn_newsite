'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import type { AreaData } from '@/data/area-data'

interface AreaPageClientProps {
  areaData: AreaData
}

export default function AreaPageClient({ areaData }: AreaPageClientProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* パンくずリスト */}
      <Breadcrumb 
        items={[
          { label: '飲食店撮影PhotoStudio', href: '/services/photo/foodphoto' },
          { label: `${areaData.name}エリア` }
        ]}
      />

      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {areaData.name}エリアの飲食店撮影
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-95">
              {areaData.description}
            </p>
            <p className="text-lg opacity-90 mb-8">
              <Link href="/services/photo/foodphoto" className="underline hover:no-underline">
                飲食店撮影PhotoStudio
              </Link>
              は{areaData.name}エリアで{areaData.shootingStats.totalShops}の実績があります
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                id="cta-area-hero-apply"
                href="/services/photo/foodphoto/form"
                className="inline-block bg-white text-orange-500 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                無料相談・お見積もり
              </Link>
              <div className="flex items-center gap-2 bg-white/20 px-6 py-4 rounded-full">
                <span className="text-2xl">📍</span>
                <span className="font-semibold">出張エリア: 半径{areaData.serviceRadius}km</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-4">
              {areaData.name}エリア撮影の特徴
            </h2>
            <p className="text-center text-gray-600 mb-12">
              <Link href="/services/photo/foodphoto" className="text-orange-500 hover:text-orange-600 font-medium">
                飲食店撮影サービス
              </Link>
              の{areaData.name}エリアならではの強み
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {areaData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl"
                >
                  <div className="text-3xl mb-3">✨</div>
                  <p className="text-gray-800 font-medium">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 撮影実績セクション */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-4">
              {areaData.name}エリアの撮影実績
            </h2>
            <p className="text-center text-gray-600 mb-12">
              <Link href="/services/photo/foodphoto" className="text-orange-500 hover:text-orange-600 font-medium">
                プロカメラマンによる撮影サービス
              </Link>
              の実績データ
            </p>
            
            {/* 統計情報 */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  {areaData.shootingStats.totalShops}
                </div>
                <p className="text-gray-600">撮影実績</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-orange-500 mb-2">
                  {areaData.shootingStats.popularPlan}
                </div>
                <p className="text-gray-600">人気プラン</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-orange-500 mb-2">
                  {areaData.shootingStats.bestTime}
                </div>
                <p className="text-gray-600">おすすめ撮影時間</p>
              </div>
            </div>

            {/* 人気の料理ジャンル */}
            <div className="bg-white p-8 rounded-xl shadow-sm mb-12">
              <h3 className="text-xl font-bold mb-4">人気の撮影ジャンル</h3>
              <p className="text-sm text-gray-600 mb-4">
                <Link href="/services/photo/foodphoto" className="text-orange-500 hover:text-orange-600">
                  飲食店撮影PhotoStudio
                </Link>
                が{areaData.name}エリアで多く手がけるジャンル
              </p>
              <div className="flex flex-wrap gap-3">
                {areaData.popularCuisines.map((cuisine, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 成功事例セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              {areaData.name}エリアの成功事例
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {areaData.cases.map((caseItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h3 className="font-bold text-lg">{caseItem.shopType}</h3>
                      <p className="text-sm text-gray-600">{caseItem.area}</p>
                    </div>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg mb-4 font-semibold">
                    {caseItem.result}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    「{caseItem.comment}」
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* エリア情報セクション */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {areaData.name}エリアの対応範囲
          </h2>
          
          {/* 他のエリアへのリンク */}
          <div className="mb-8 text-center">
            <p className="text-gray-600 mb-4">他のエリアもご覧ください：</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {areaData.id !== 'shibuya' && (
                <Link href="/services/photo/foodphoto/area/shibuya" className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  渋谷エリア
                </Link>
              )}
              {areaData.id !== 'shinjuku' && (
                <Link href="/services/photo/foodphoto/area/shinjuku" className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  新宿エリア
                </Link>
              )}
              {areaData.id !== 'yokohama' && (
                <Link href="/services/photo/foodphoto/area/yokohama" className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  横浜エリア
                </Link>
              )}
              {areaData.id !== 'ikebukuro' && (
                <Link href="/services/photo/foodphoto/area/ikebukuro" className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  池袋エリア
                </Link>
              )}
              {areaData.id !== 'shinagawa' && (
                <Link href="/services/photo/foodphoto/area/shinagawa" className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  品川エリア
                </Link>
              )}
              {areaData.id !== 'ginza' && (
                <Link href="/services/photo/foodphoto/area/ginza" className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  銀座エリア
                </Link>
              )}
              {areaData.id !== 'roppongi' && (
                <Link href="/services/photo/foodphoto/area/roppongi" className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  六本木エリア
                </Link>
              )}
              <Link href="/services/photo/foodphoto" className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-colors">
                全エリア対応サービス
              </Link>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 対応エリア */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">📍 対応エリア</h3>
              <div className="space-y-2">
                {areaData.coveredAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* アクセス情報 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">🚃 最寄り駅</h3>
              <div className="space-y-2">
                {areaData.nearbyStations.map((station, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-blue-500">🚉</span>
                    <span>{station}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ローカル情報 */}
          <div className="mt-8 bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">ℹ️ {areaData.name}エリアの撮影について</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">アクセス</h4>
                <p className="text-gray-600">{areaData.localInfo.access}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">駐車場</h4>
                <p className="text-gray-600">{areaData.localInfo.parking}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">特記事項</h4>
                <p className="text-gray-600">{areaData.localInfo.specialNotes}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            {areaData.name}エリアのよくある質問
          </h2>
          <p className="text-center text-gray-600 mb-12">
            <Link href="/services/photo/foodphoto#faq" className="text-orange-500 hover:text-orange-600 font-medium">
              全般的なFAQ
            </Link>
            もご覧ください
          </p>
          <div className="space-y-4">
            {areaData.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  <span className={`text-2xl transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                    ⌄
                  </span>
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-yellow-400 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {areaData.name}エリアの飲食店撮影なら
            </h2>
            <p className="text-xl mb-8 opacity-95">
              地域の特性を理解したプロカメラマンが<br />
              お店の魅力を最大限に引き出します
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                id="cta-area-bottom-apply"
                href="/services/photo/foodphoto/form"
                className="inline-block bg-white text-orange-500 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                無料相談・お見積もり
              </Link>
              <Link
                href="/services/photo/foodphoto"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-orange-500 transition-colors"
              >
                サービス詳細を見る
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { voiceSearchFAQs, type VoiceSearchFAQ } from '@/app/services/photo/foodphoto/voice-search-faq'

interface VoiceSearchFAQProps {
  className?: string
}

export default function VoiceSearchFAQ({ className = '' }: VoiceSearchFAQProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // カテゴリーの定義
  const categories = [
    { id: 'all', label: 'すべて', icon: '📋' },
    { id: 'pricing', label: '料金', icon: '💰' },
    { id: 'service', label: 'サービス', icon: '📸' },
    { id: 'area', label: 'エリア', icon: '📍' },
    { id: 'quality', label: '品質', icon: '✨' },
    { id: 'process', label: '流れ', icon: '📝' },
    { id: 'equipment', label: '機材', icon: '📷' },
  ]

  // FAQのフィルタリングと検索
  const filteredFAQs = useMemo(() => {
    let filtered = voiceSearchFAQs

    // カテゴリーフィルター
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory)
    }

    // 検索フィルター（質問、回答、音声バリエーション、キーワードを検索）
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.voiceVariations.some(v => v.toLowerCase().includes(query)) ||
        faq.longTailKeywords.some(k => k.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [selectedCategory, searchQuery])

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className={`${className}`}>
      {/* 検索バー */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="質問を検索... (例: 料金はいくら、東京で撮影できる)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pr-12 bg-white border-2 border-gray-200 rounded-full focus:border-yellow-400 focus:outline-none text-gray-800 placeholder-gray-400"
            aria-label="FAQを検索"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <span className="text-2xl">🔍</span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500 text-center">
          「OK Google, 飲食店の撮影料金を教えて」のような音声検索にも対応しています
        </p>
      </div>

      {/* カテゴリーフィルター */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === category.id
                ? 'bg-yellow-400 text-black font-semibold'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label={`${category.label}カテゴリーを選択`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* FAQ一覧 */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredFAQs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-5 text-left flex items-start justify-between hover:bg-gray-50 transition-colors faq-question"
                aria-expanded={expandedItems.has(faq.id)}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {faq.question}
                  </h3>
                  {/* 音声検索キーワードのプレビュー */}
                  <div className="flex flex-wrap gap-1">
                    {faq.voiceVariations.slice(0, 2).map((variation, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        🎤 {variation}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <motion.span
                    animate={{ rotate: expandedItems.has(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-2xl text-yellow-400"
                  >
                    ⌄
                  </motion.span>
                </div>
              </button>

              <AnimatePresence>
                {expandedItems.has(faq.id) && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    <div className="px-6 py-5 faq-answer">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {faq.answer}
                      </p>

                      {/* 関連する音声検索フレーズ */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-600 mb-2">
                          🎤 こんな聞き方でも検索できます：
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {faq.voiceVariations.map((variation, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-yellow-50 text-gray-700 px-3 py-1 rounded-full border border-yellow-200"
                            >
                              &ldquo;{variation}&rdquo;
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 関連キーワード */}
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-2">
                          🔍 関連キーワード：
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {faq.longTailKeywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 検索結果が0件の場合 */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 mb-4">
              該当する質問が見つかりませんでした
            </p>
            <p className="text-sm text-gray-400">
              別のキーワードで検索するか、お問い合わせください
            </p>
          </motion.div>
        )}
      </div>

      {/* 音声検索の説明 */}
      <div className="mt-12 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          🎤 音声検索に対応しています
        </h3>
        <p className="text-gray-700 mb-4">
          Google アシスタントやSiriなどの音声アシスタントからも、自然な言葉で質問できます。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">例1:</span> 「OK Google、飲食店撮影の料金を教えて」
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">例2:</span> 「Hey Siri、横浜で料理撮影できるカメラマン」
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">例3:</span> 「Alexa、レストランの写真撮影の相場は？」
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">例4:</span> 「明日撮影してもらえるか聞いて」
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
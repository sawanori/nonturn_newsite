'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/MainLayout'
import { CheckCircle } from 'lucide-react'
import { trackEvent } from '@/components/analytics/Analytics'

export default function ContactThanksPage() {
  useEffect(() => {
    trackEvent.contact('contact_form')
  }, [])

  return (
    <MainLayout>
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            お問い合わせありがとうございます
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            内容を確認次第、24時間以内にご連絡差し上げます。<br />
            お急ぎの場合は、お電話でもお気軽にお問い合わせください。
          </p>

          <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 mb-8">
            <p className="text-yellow-400 font-semibold mb-2">
              無料相談もご利用いただけます
            </p>
            <p className="text-sm text-gray-400 mb-4">
              オンラインで直接ご相談いただけます。お気軽にご予約ください。
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
            >
              無料相談を予約する
            </Link>
          </div>

          <Link
            href="/"
            className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
          >
            トップページに戻る
          </Link>
        </motion.div>
      </div>
    </MainLayout>
  )
}

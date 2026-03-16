'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/MainLayout'
import { Download } from 'lucide-react'
import { trackEvent } from '@/components/analytics/Analytics'

export default function LeadMagnetThanksPage() {
  useEffect(() => {
    trackEvent.downloadResource('video-marketing-guide', 'pdf')
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
            <Download className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            資料のダウンロードありがとうございます
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            ご登録いただいたメールアドレスにダウンロードリンクをお送りしました。<br />
            メールが届かない場合は、迷惑メールフォルダもご確認ください。
          </p>

          <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 mb-8">
            <p className="text-yellow-400 font-semibold mb-2">
              具体的なご相談もお気軽にどうぞ
            </p>
            <p className="text-sm text-gray-400 mb-4">
              資料の内容について、またはプロジェクトのご相談はこちらから。
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
            >
              お問い合わせはこちら
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

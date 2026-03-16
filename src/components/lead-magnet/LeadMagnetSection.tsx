'use client'

import { motion } from 'framer-motion'
import { FileText, Download } from 'lucide-react'
import { LeadMagnetForm } from './LeadMagnetForm'

export function LeadMagnetSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium mb-6">
            <Download className="w-4 h-4" />
            無料資料ダウンロード
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            動画マーケティングの
            <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              ノウハウを無料で公開
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            企業の動画活用で成果を出すための実践的なガイドを無料でお届けします
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resource card */}
          <motion.div
            className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-700/50 rounded-2xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-yellow-400/10 border border-yellow-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-7 h-7 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">動画マーケティング完全ガイド</h3>
                <p className="text-sm text-gray-400">PDF / 全20ページ</p>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {[
                '企業が動画で成果を出すための5つのステップ',
                '動画制作の費用対効果を最大化する方法',
                '業界別・動画活用の成功事例',
                'SNS動画マーケティングの最新トレンド',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Form */}
          <motion.div
            className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-yellow-400/20 rounded-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-yellow-400 mb-6">
              メールアドレスを入力してダウンロード
            </h3>
            <LeadMagnetForm resourceId="video-marketing-guide" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

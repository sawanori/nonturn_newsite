'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const yokohamaAreas = [
  { name: 'みなとみらい', features: ['未来都市撮影', '高層ビル背景'], landmark: 'ランドマークタワー・赤レンガ倉庫' },
  { name: '中華街', features: ['国際色豊か', '文化的背景'], landmark: '関帝廟・善隣門' },
  { name: '元町', features: ['おしゃれな街並み', 'ブランド撮影'], landmark: 'ショッピングストリート' },
  { name: '野毛', features: ['下町風情', 'アットホーム'], landmark: '野毛山動物園' },
  { name: '港北ニュータウン', features: ['住宅街撮影', 'ファミリー向け'], landmark: 'センター北・南' },
  { name: '金沢区', features: ['海岸線撮影', '自然背景'], landmark: '海の公園・八景島' },
  { name: '戸塚区', features: ['商業施設', 'ビジネス街'], landmark: '戸塚駅周辺' },
  { name: '青葉区', features: ['高級住宅街', '洗練された雰囲気'], landmark: 'たまプラーザ・あざみ野' },
]

const yokohamaServices = [
  {
    title: '横浜企業ブランディング動画',
    price: '¥180,000〜',
    description: '横浜の洗練された都市イメージを活かした企業ブランディング動画',
    features: [
      'みなとみらい景観活用',
      '横浜らしさの演出',
      '国際都市イメージ',
      'ハイクオリティ撮影',
      '多言語字幕対応'
    ]
  },
  {
    title: 'みなとみらい撮影パッケージ',
    price: '¥120,000〜',
    description: 'みなとみらいの象徴的な景観を背景にした企業動画制作',
    features: [
      'ランドマークタワー撮影',
      '赤レンガ倉庫ロケ',
       'コスモワールド夜景',
      '観覧車との合成',
      '横浜駅周辺撮影'
    ]
  },
  {
    title: '横浜港湾・物流業向け動画',
    price: '¥150,000〜',
    description: '横浜港を活かした物流・貿易関連企業向け専門動画制作',
    features: [
      '横浜港撮影許可取得',
      '港湾施設での撮影',
      '物流プロセス可視化',
      '国際貿易イメージ',
      '海外向けPR対応'
    ]
  }
]

const yokohamaStats = [
  {
    number: '200+',
    label: '横浜企業様実績',
    description: '横浜・神奈川県内の企業様から多数のご依頼'
  },
  {
    number: '18区',
    label: '全域対応',
    description: '横浜市18区すべてのエリアで撮影対応'
  },
  {
    number: '即日',
    label: '対応可能',
    description: '横浜エリアなら即日対応可能'
  },
  {
    number: 'No.1',
    label: '横浜エリア対応',
    description: '横浜エリア全域での高品質な動画制作'
  }
]

interface YokohamaClientProps {
  isHeroButtons?: boolean;
}

export function YokohamaClient({ isHeroButtons = false }: YokohamaClientProps) {
  if (isHeroButtons) {
    return (
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Link href="/contact">
          <motion.button
            className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-8 py-4 font-bold text-lg uppercase tracking-wider hover:from-cyan-500 hover:to-teal-500 transition-all duration-300 relative overflow-hidden group rounded-2xl"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">横浜で見積もり依頼</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl"></div>
          </motion.button>
        </Link>
        
        <motion.button
          className="bg-transparent border-2 border-blue-400 text-blue-400 px-8 py-4 font-bold text-lg uppercase tracking-wider hover:bg-blue-400 hover:text-white transition-all duration-300 rounded-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('yokohama-services')?.scrollIntoView({ behavior: 'smooth' })}
        >
          横浜エリアサービス
        </motion.button>
      </div>
    )
  }

  return (
    <>
      {/* Yokohama Stats Section */}
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
              横浜エリア<span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">実績</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {yokohamaStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <p className="text-white font-semibold mb-2">{stat.label}</p>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Yokohama Areas Coverage */}
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
              横浜<span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">18区対応</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              横浜市内のあらゆるエリアで、その地域の特色を活かした動画制作を行います
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {yokohamaAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl border border-blue-400/20 p-6 rounded-xl hover:border-blue-400/50 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {area.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{area.landmark}</p>
                <div className="space-y-1">
                  {area.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="text-sm text-gray-300 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Yokohama Services Section */}
      <section id="yokohama-services" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              横浜企業向け<span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">動画制作サービス</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              横浜の企業様の特性に合わせた専門的な動画制作メニュー
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {yokohamaServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-blue-400/20 p-8 rounded-2xl hover:border-blue-400/50 transition-all duration-500 group"
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)" }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-3xl font-bold text-blue-400 mb-3">{service.price}</div>
                  <p className="text-gray-400">{service.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-blue-400">含まれるサービス:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact">
                  <motion.button
                    className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white py-3 rounded-lg font-medium hover:from-cyan-500 hover:to-teal-500 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    横浜エリアで見積もり
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Yokohama */}
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
              横浜企業が選ぶ<span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">理由</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏢',
                title: 'みなとみらい拠点',
                description: '横浜みなとみらいに拠点を構え、地域密着のサービスを提供'
              },
              {
                icon: '🌊',
                title: '横浜の魅力活用',
                description: '港町横浜の美しい景観や文化的背景を活かした映像制作'
              },
              {
                icon: '💰',
                title: '地域密着サービス',
                description: '横浜・神奈川エリアで高品質な動画制作サービス'
              },
              {
                icon: '🚃',
                title: 'アクセス抜群',
                description: 'みなとみらい駅徒歩2分、横浜市内どこでも迅速対応'
              },
              {
                icon: '🎬',
                title: '横浜企業実績',
                description: '横浜の大手企業から地域密着企業まで幅広い制作実績'
              },
              {
                icon: '🌍',
                title: '国際都市対応',
                description: '国際都市横浜らしい多言語・多文化対応の映像制作'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-blue-400/20 p-6 rounded-xl hover:border-blue-400/50 transition-all duration-300 text-center group"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
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
              横浜で<span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">高品質</span>な動画制作をお探しなら
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              横浜・みなとみらいエリアの企業様向けに、高品質な動画制作をご提供いたします。
              地域密着のサービスでお客様をサポートします。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <motion.button
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-12 py-4 font-bold text-lg uppercase tracking-wider hover:from-cyan-500 hover:to-teal-500 transition-all duration-300 rounded-2xl"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  横浜で無料見積もり
                </motion.button>
              </Link>
              
              <Link href="/portfolio">
                <motion.button
                  className="bg-transparent border-2 border-blue-400 text-blue-400 px-12 py-4 font-bold text-lg uppercase tracking-wider hover:bg-blue-400 hover:text-white transition-all duration-300 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  横浜の制作実績
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
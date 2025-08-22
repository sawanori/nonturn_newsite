'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Atoms
const Button = ({ variant = 'primary', children, onClick, className = '' }: any) => {
  const baseClass = 'px-8 py-4 font-bold text-lg rounded-2xl transition-all duration-300'
  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-red-500 hover:to-pink-500',
    secondary: 'bg-transparent border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white'
  }
  
  return (
    <motion.button
      className={`${baseClass} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

const SectionTitle = ({ children }: any) => (
  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
    {children}
  </h2>
)

const SubTitle = ({ children }: any) => (
  <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-200">
    {children}
  </h3>
)

// Molecules
const FeatureCard = ({ title, description, icon, image, onClick }: any) => (
  <motion.div
    className="aspect-square bg-white shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
  >
    {/* 上部画像エリア */}
    <div className="relative h-2/3 bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-6xl opacity-50">{icon}</span>
        </div>
      )}
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    
    {/* 下部テキストエリア */}
    <div className="h-1/3 p-6 flex flex-col justify-center">
      <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>
      <p className="text-base text-gray-700 line-clamp-2">{description}</p>
      <p className="text-sm text-orange-500 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        クリックして詳細を見る →
      </p>
    </div>
  </motion.div>
)


const FlowStep = ({ number, title, description }: any) => (
  <motion.div
    className="rounded-2xl p-6 shadow-lg relative" style={{ backgroundColor: 'rgb(77, 76, 76)' }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: number * 0.1 }}
  >
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
      {number}
    </div>
    <h3 className="text-xl font-bold text-white mb-2 mt-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
)

const CaseCard = ({ title, company, role, name, comment }: any) => (
  <motion.article
    className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: 'rgb(77, 76, 76)' }}
    whileHover={{ y: -5 }}
  >
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-300 mb-4 italic">&ldquo;{comment}&rdquo;</p>
    <div className="text-sm text-gray-500">
      <p>{company}</p>
      <p>{role} {name}様</p>
    </div>
  </motion.article>
)

// Organisms
const Header = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      const offset = 80 // Header height offset
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: 'rgb(36, 35, 35)' }}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/cameralogo.svg"
            alt="飲食店撮影PhotoStudio - プロカメラマンによる料理撮影サービス"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <span className="text-base md:text-xl font-bold text-white">飲食店撮影PhotoStudio</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#features" 
            onClick={(e) => handleSmoothScroll(e, '#features')}
            className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer"
          >
            サービスの特徴
          </a>
          <a 
            href="#pricing"
            onClick={(e) => handleSmoothScroll(e, '#pricing')}
            className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer"
          >
            料金
          </a>
          <a 
            href="#samples"
            onClick={(e) => handleSmoothScroll(e, '#samples')}
            className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer"
          >
            撮影事例
          </a>
          <a 
            href="#flow"
            onClick={(e) => handleSmoothScroll(e, '#flow')}
            className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer"
          >
            撮影の流れ
          </a>
          <a 
            href="#cases"
            onClick={(e) => handleSmoothScroll(e, '#cases')}
            className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer"
          >
            導入事例
          </a>
          <a 
            href="#faq"
            onClick={(e) => handleSmoothScroll(e, '#faq')}
            className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer"
          >
            よくあるご質問
          </a>
        </nav>
        
        <div className="hidden md:flex items-center gap-3">
          <Link href="/services/photo/foodphoto/form">
            <Button variant="primary">
              申し込む
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary">
              問い合わせる
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

const IntroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  
  // Mobile/Tablet images
  const mobileImages = [
    {
      src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%209.jpg',
      alt: '飲食店の料理撮影例 - 美味しそうな料理写真'
    },
    {
      src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%206.jpg',
      alt: '飲食店のメニュー撮影 - プロによる料理写真'
    },
    {
      src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%205.jpg',
      alt: '飲食店撮影サービス - 料理の魅力を引き出す写真'
    },
    {
      src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2023.jpg',
      alt: 'レストラン料理撮影 - 飲食店専門カメラマンによる撮影'
    },
    {
      src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2019.jpg',
      alt: '飲食店メニュー撮影例 - プロフェッショナル料理写真'
    },
    {
      src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_26.jpg',
      alt: '飲食店の撮影実績 - 料理写真で集客アップ'
    }
  ]
  
  // PC images
  const pcImages = [
    {
      src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2024.jpg',
      alt: '飲食店撮影事例 - プロカメラマンによる料理撮影'
    },
    {
      src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2021.jpg',
      alt: '飲食店向け撮影サービス - メニュー撮影実績'
    },
    {
      src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2022.jpg',
      alt: 'レストラン撮影サービス - 飲食店専門料理写真'
    },
    {
      src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_.jpg',
      alt: '店内写真1'
    },
    {
      src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_%201.jpg',
      alt: '店内写真2'
    }
  ]
  
  // Select images based on screen size
  const heroImages = isMobile ? mobileImages : pcImages
  
  // Detect screen size
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024) // Use lg breakpoint (1024px)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Auto-advance slideshow
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000) // Change slide every 4 seconds
    
    return () => clearInterval(interval)
  }, [heroImages.length])
  
  // Reset slide when switching between mobile and PC
  React.useEffect(() => {
    setCurrentSlide(0)
  }, [isMobile])

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {/* Preload all images in background */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${index === currentSlide ? 'z-10' : 'z-0'}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        
        {/* Animated overlay for transition effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20"
          >
            <Image
              src={heroImages[currentSlide].src}
              alt={heroImages[currentSlide].alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content overlay */}
      <div className="relative z-30 h-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="text-white/90 font-semibold mb-4 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              日本フードフォトグラファー協会認定の<br />プロカメラマンによる出張撮影
            </motion.p>
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
                <Image
                  src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/cameralogo.svg"
                  alt="飲食店撮影PhotoStudioロゴ - プロの料理撮影サービス"
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                />
                <div className="relative">
                  <h1 className="relative inline-block">
                    {/* SEO用の完全なH1テキスト（スクリーンリーダー用） */}
                    <span className="sr-only">飲食店撮影PhotoStudio｜プロカメラマンによる料理・店舗撮影サービス</span>
                    {/* 視覚的な表示用（SEOには影響しない） */}
                    <span 
                      className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight"
                      style={{ 
                        fontFamily: '"Playfair Display", "Noto Serif JP", serif',
                        letterSpacing: '-0.02em'
                      }}
                      aria-hidden="true"
                    >
                      飲食店撮影
                    </span>
                    <span 
                      className="absolute -bottom-1 md:-bottom-2 right-0 text-xl md:text-2xl lg:text-3xl font-light italic opacity-90 tracking-[0.2em]"
                      style={{ 
                        fontFamily: '"Dancing Script", "Caveat", cursive',
                        background: 'linear-gradient(135deg, #F25C00 0%, #F9A603 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        transform: 'rotate(-2deg)',
                        transformOrigin: 'bottom right'
                      }}
                      aria-hidden="true"
                    >
                      PhotoStudio
                    </span>
                  </h1>
                </div>
              </div>
              <p className="text-xl md:text-2xl font-light text-white mt-2 text-center">
                飲食店専門出張撮影サービス
              </p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center gap-3 mb-8 text-sm md:text-lg text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="flex items-center justify-center gap-2 bg-black/30 px-4 md:px-6 py-2 rounded-full w-full md:min-w-[600px] max-w-[600px]">
                <span className="text-green-400">✓</span>
                日本フードフォトグラファー協会認定カメラマンが撮影
              </span>
              <span className="flex items-center justify-center gap-2 bg-black/30 px-4 md:px-6 py-2 rounded-full w-full md:min-w-[600px] max-w-[600px]">
                <span className="text-green-400">✓</span>
                撮影枚数時間内無制限(一部プラン対象外)
              </span>
              <span className="flex items-center justify-center gap-2 bg-black/30 px-4 md:px-6 py-2 rounded-full w-full md:min-w-[600px] max-w-[600px]">
                <span className="text-green-400">✓</span>
                飲食媒体で効果の出やすい撮影素材
              </span>
            </motion.div>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/services/photo/foodphoto/form">
                <Button variant="primary" className="min-w-[200px] px-6 py-3">
                  今すぐ申し込む
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" className="min-w-[200px] px-6 py-3 !border-white !text-white hover:!bg-white hover:!text-orange-500">
                  まずは問い合わせる
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/70 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}

const NewsSection = () => (
  <section className="py-12" style={{ backgroundColor: 'rgb(36, 35, 35)' }}>
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-sm font-semibold text-white mb-4">お知らせ</h2>
      <div className="space-y-3">
        <motion.div
          className="flex flex-col md:flex-row md:items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: 'rgb(77, 76, 76)' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm text-gray-300">2025.8.19</span>
          <span className="text-white">飲食店撮影PhotoStudioサイトオープン</span>
        </motion.div>
      </div>
    </div>
  </section>
)

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<any>(null)
  
  const features = [
    {
      icon: '📸',
      title: '協会認定のプロフェッショナル撮影',
      description: '日本フードフォトグラファー協会認定カメラマンによる確かな技術力。',
      image: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/fpaicon.png',
      fullDescription: '日本フードフォトグラファー協会認定カメラマンが、長年培った技術と経験を活かしてプロフェッショナルな撮影を行います。料理の美味しさを最大限に引き出す構図、ライティング、スタイリングなど、すべての要素において最高水準のクオリティをお約束します。協会の厳しい基準をクリアした技術力で、お店の魅力を確実に表現します。'
    },
    {
      icon: '✨',
      title: '撮影画像は全て自由に使用可能',
      description: '著作権フリー。SNS、Web、印刷物など用途を問わず自由にご利用いただけます。',
      image: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%204.jpg',
      fullDescription: '撮影した画像は全て著作権フリーでお渡しします。Instagram、Facebook、TwitterなどのSNS投稿、ホームページやECサイトへの掲載、メニューやチラシなどの印刷物、看板やポスターなど、あらゆる用途で追加料金なしでご自由にお使いいただけます。将来的な用途変更や再利用も完全自由。お店の資産として永続的にご活用ください。'
    },
    {
      icon: '🚀',
      title: '最短1週間の短期納品',
      description: '撮影から納品まで最短1週間。急ぎの案件にも柔軟に対応いたします。',
      image: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%206.jpg',
      fullDescription: '撮影完了から最短1週間での納品が可能です。新メニューの告知、季節限定商品のPR、急なイベント対応など、スピーディーな対応が必要な場面でも安心してご依頼いただけます。基本的なレタッチ、色調補正を含めた完成品を短期間でお届け。お急ぎの場合は特急対応（3日納品）のオプションもご用意しています。'
    },
    {
      icon: '📊',
      title: '飲食媒体に精通した効果的な撮影',
      description: '飲食店専門WEBコンサルタントも務めるカメラマンが、集客に繋がる写真を撮影。',
      image: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%208.jpg',
      fullDescription: '撮影を担当するカメラマンは、飲食店専門のWEBコンサルタントとしても活動しており、デジタルマーケティングの観点から最も効果的な撮影を行います。食べログ、ぐるなび、ホットペッパーなどの主要グルメサイトのアルゴリズムや、Google検索での上位表示に有利な画像の特徴を熟知。SNSでの拡散力、コンバージョン率の向上、SEO対策まで考慮した戦略的な撮影により、写真を通じて実際の集客アップに貢献します。WEBコンサルティングの知見を活かし、オンライン集客に直結する撮影をお約束します。'
    }
  ]

  return (
    <>
      <section id="features" className="py-16" style={{ backgroundColor: 'rgb(36, 35, 35)' }}>
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <SectionTitle>
              <span className="inline md:hidden">飲食店撮影<br />PhotoStudioの特徴</span>
              <span className="hidden md:inline">飲食店撮影PhotoStudioの特徴</span>
            </SectionTitle>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureCard 
                  {...feature} 
                  onClick={() => setSelectedFeature(feature)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* モーダルウィンドウ */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full overflow-y-auto"
              style={{ maxHeight: '95vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* モーダルヘッダー画像 */}
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src={selectedFeature.image}
                  alt={selectedFeature.title}
                  fill
                  className="object-cover rounded-t-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
              
              {/* モーダルコンテンツ */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{selectedFeature.icon}</span>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {selectedFeature.title}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {selectedFeature.fullDescription}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const PricingSection = () => {
  const plans = [
    {
      name: 'ライトプラン',
      time: 1,
      price: 33000,
      cuts: '撮影枚数限定',
      cutsGuide: '（3-5カット納品）',
      isPopular: false,
      features: [
        '1時間の撮影時間',
        '撮影枚数3-5カット限定',
        'データ即日納品可能',
        '商用利用OK',
        '現像のみ',
        '出張費込み（東京23区内、横浜市内、千葉※船橋）',
        'お試し撮影に最適'
      ]
    },
    {
      name: 'スタンダードプラン',
      time: 2,
      price: 44000,
      cuts: '撮影枚数無制限',
      cutsGuide: '（10-15カット納品目安）',
      isPopular: true,
      features: [
        '2時間の撮影時間',
        '撮影枚数時間内無制限（目安10-15カット）',
        'データ即日納品可能',
        '商用利用OK',
        '標準的なレタッチ込み',
        '出張費込み（東京23区内、横浜市内、千葉※船橋）',
        '人気メニュー重点撮影'
      ]
    },
    {
      name: 'プレミアムプラン',
      time: 4,
      price: 88000,
      cuts: '撮影枚数無制限',
      cutsGuide: '（30-40カット納品目安）',
      isPopular: false,
      features: [
        '4時間の撮影時間',
        '撮影枚数時間内無制限（目安30-40カット）',
        'データ即日納品可能',
        '商用利用OK',
        '標準的なレタッチ込み',
        '出張費込み（東京23区内、横浜市内、千葉※船橋）',
        '撮影ディレクション付き'
      ]
    }
  ]

  return (
    <section id="pricing" className="py-16" style={{ backgroundColor: 'rgb(36, 35, 35)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionTitle>料金プラン</SectionTitle>
          <p className="text-gray-300 text-lg">
            <span className="inline md:hidden">シンプルで分かりやすい3つのプラン。<br />全て込みの明朗会計です。</span>
            <span className="hidden md:inline">シンプルで分かりやすい3つのプラン。全て込みの明朗会計です。</span>
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`rounded-3xl p-8 ${
                plan.isPopular 
                  ? 'bg-gradient-to-br from-orange-50 via-white to-red-50 border-2 border-orange-400 shadow-2xl scale-105' 
                  : 'bg-white border border-gray-200 shadow-xl'
              } hover:shadow-2xl transition-all relative`}
              whileHover={{ y: -10 }}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                    🌟 人気No.1
                  </div>
                </div>
              )}
              <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-black mb-2 mt-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500">¥{plan.price.toLocaleString()}</span>
                <span className="text-sm md:text-base text-gray-600 ml-2">/ {plan.time}H</span>
              </div>
              <div className="mb-6">
                <p className="text-base md:text-lg lg:text-xl text-gray-700 font-semibold">
                  {plan.cuts}
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  {plan.cutsGuide}
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-700 text-sm md:text-base">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/photo/foodphoto/form" className="block">
                <Button 
                  variant={plan.isPopular ? "primary" : "secondary"} 
                  className="w-full text-lg py-4"
                >
                  {plan.isPopular ? '今すぐ申し込む' : 'プランを選択'}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-300 mb-4">
            その他のご要望にも柔軟に対応いたします
          </p>
          <Link href="/contact" className="text-orange-500 hover:text-orange-600 font-semibold text-lg">
            カスタムプランのご相談はこちら →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const ParallaxSection = () => {
  const [scrollY, setScrollY] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const sectionElement = document.getElementById('parallax-section')
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const relativeScroll = scrolled - sectionTop + window.innerHeight
        setOffsetY(relativeScroll * 0.3)
      }
      setScrollY(scrolled)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="parallax-section" className="relative h-[80vh] overflow-hidden">
      {/* パララックス背景画像 */}
      <div 
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{
          transform: `translateY(${offsetY}px)`,
          willChange: 'transform'
        }}
      >
        <Image
          src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2010.jpg"
          alt="Parallax Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center px-4"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            写真は、<span className="text-orange-400">売上を変える</span>チカラになる
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            料理の一瞬の輝きを捉え、集客につながる魅力的なビジュアルに。<br />
            飲食店専門PhotoStudioが、売上アップを後押しする&ldquo;集客できる料理写真&rdquo;を創り出します。
          </motion.p>
          
          {/* スクロールインジケーター */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const SamplesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const categories = [
    { id: 'all', name: '全て', count: 37 },
    { id: 'food', name: '料理', count: 26 },
    { id: 'exterior', name: '外観', count: 1 },
    { id: 'interior', name: '内観', count: 10 }
  ]

  const images = [
    // 料理写真 (LP_food_)
    { id: 1, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%201.jpg', alt: '料理写真1' },
    { id: 2, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%202.jpg', alt: '料理写真2' },
    { id: 3, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%203.jpg', alt: '料理写真3' },
    { id: 4, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%204.jpg', alt: '料理写真4' },
    { id: 5, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%205.jpg', alt: '料理写真5' },
    { id: 6, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%206.jpg', alt: '料理写真6' },
    { id: 7, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%207.jpg', alt: '料理写真7' },
    { id: 8, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%208.jpg', alt: '料理写真8' },
    { id: 9, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%209.jpg', alt: '料理写真9' },
    { id: 10, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2010.jpg', alt: '料理写真10' },
    { id: 11, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2011.jpg', alt: '料理写真11' },
    { id: 12, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2012.jpg', alt: '料理写真12' },
    { id: 13, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2013.jpg', alt: '料理写真13' },
    { id: 14, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2014.jpg', alt: '料理写真14' },
    { id: 15, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2015.jpg', alt: '料理写真15' },
    { id: 16, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2016.jpg', alt: '料理写真16' },
    { id: 17, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2017.jpg', alt: '料理写真17' },
    { id: 18, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2018.jpg', alt: '料理写真18' },
    { id: 19, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2019.jpg', alt: '料理写真19' },
    { id: 20, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2020.jpg', alt: '料理写真20' },
    { id: 21, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2021.jpg', alt: '料理写真21' },
    { id: 22, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2012.jpg', alt: '料理写真22' },
    { id: 23, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2023.jpg', alt: '料理写真23' },
    { id: 24, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2024.jpg', alt: '料理写真24' },
    { id: 25, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2025.jpg', alt: '料理写真25' },
    { id: 26, category: 'food', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_26.jpg', alt: '料理写真26' },
    // 外観写真 (LP_out_)
    { id: 27, category: 'exterior', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_out_.png', alt: '外観写真1' },
    // 内観写真 (LP_room_)
    { id: 28, category: 'interior', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_%201.jpg', alt: '店内1' },
    { id: 29, category: 'interior', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_%202.jpg', alt: '店内2' },
    { id: 30, category: 'interior', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_%203.jpg', alt: '店内3' },
    { id: 31, category: 'interior', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_%204.jpg', alt: '店内4' },
    { id: 32, category: 'interior', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_%205.jpg', alt: '店内5' },
    { id: 33, category: 'interior', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_%206.jpg', alt: '店内6' },
    { id: 34, category: 'interior', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_%207.jpg', alt: '店内7' },
    { id: 35, category: 'interior', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_%208.jpg', alt: '店内8' },
    { id: 36, category: 'interior', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_%209.jpg', alt: '店内9' },
    { id: 37, category: 'interior', src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_.jpg', alt: '店内10' }
  ]

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory)

  return (
    <>
      <section id="samples" className="py-16" style={{ backgroundColor: 'rgb(36, 35, 35)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <SectionTitle>撮影事例</SectionTitle>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
              飲食店撮影PhotoStudioが手掛けた作品の一部をご紹介。
              単なる写真ではなく、芸術作品としてのフードフォトグラフィーをご覧ください。
            </p>
            
            {/* カテゴリーフィルター */}
            <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-3">
              {/* Mobile: 全て button on its own row */}
              <div className="flex justify-center md:contents">
                <motion.button
                  onClick={() => setActiveCategory('all')}
                  className={`px-8 py-3 font-semibold text-base transition-all duration-300 rounded-full w-full md:w-auto max-w-xs ${
                    activeCategory === 'all'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  全て ({categories.find(c => c.id === 'all')?.count})
                </motion.button>
              </div>
              
              {/* Mobile: Other buttons in a row */}
              <div className="flex justify-center gap-3 md:contents">
                {categories.filter(category => category.id !== 'all').map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 md:px-8 py-3 font-semibold text-base transition-all duration-300 rounded-full flex-1 md:flex-initial ${
                      activeCategory === category.id
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name} ({category.count})
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 画像グリッド */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image 
                    src={image.src} 
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 拡大表示モーダル */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors"
              >
                <span className="text-3xl">×</span>
              </button>
              <div className="relative w-full h-[80vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const FlowSection = () => {
  const steps = [
    {
      number: 1,
      title: 'お申し込み',
      description: 'フォームまたはお電話でお申し込みください。'
    },
    {
      number: 2,
      title: '撮影日調整',
      description: 'ご希望の日時を調整させていただきます。'
    },
    {
      number: 3,
      title: '撮影',
      description: 'プロカメラマンがお店にお伺いして撮影します。'
    },
    {
      number: 4,
      title: '画像納品',
      description: '編集済みの画像データをお渡しします。'
    }
  ]

  return (
    <section id="flow" className="py-16" style={{ backgroundColor: 'rgb(36, 35, 35)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionTitle>納品までの流れ</SectionTitle>
          <p className="text-gray-300 text-lg">
            撮影から撮影画像納品まで最長で7営業日となります。<br />
            <span className="text-sm">場合によってはご希望に添えない可能性があります。</span>
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <FlowStep key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const faqs = [
    {
      question: "飲食店撮影の料金はいくらですか？",
      answer: "飲食店撮影の料金は、ライトプラン33,000円（1時間）、スタンダードプラン44,000円（2時間）、プレミアムプラン88,000円（4時間）の3プランをご用意しています。東京23区内、横浜市内、千葉（船橋）エリアは出張費込みです。"
    },
    {
      question: "撮影時間はどのくらいかかりますか？",
      answer: "プランにより1時間〜の撮影時間を設定しています。料理のボリュームや撮影内容により最適なプランをご提案いたします。追加時間のオプション（60分11,000円〜）もございます。"
    },
    {
      question: "撮影エリアはどこまで対応していますか？",
      answer: "東京23区内、横浜市内、千葉（船橋）エリアは基本料金内で出張いたします。その他の地域についても対応可能ですので、お気軽にご相談ください。"
    },
    {
      question: "どのような写真を撮影してもらえますか？",
      answer: "料理写真、店舗内観・外観、スタッフ写真など、飲食店の魅力を伝えるあらゆる写真を撮影いたします。Web・SNS用、メニュー用、看板用など用途に合わせた撮影が可能です。"
    },
    {
      question: "撮影した写真の著作権はどうなりますか？",
      answer: "撮影した写真の著作権は原則としてお客様に帰属します。商用利用、二次利用、SNS投稿など自由にご使用いただけます。"
    },
    {
      question: "撮影前の準備は必要ですか？",
      answer: "特別な準備は不要ですが、撮影したい料理のリストアップや、撮影イメージの共有があるとスムーズです。多く料理を撮影したい場合は前日からの仕込みを工夫していただけるとスムーズかと思います。また店内撮影をされる場合は不要物の掃除を事前にしていただけると助かります。"
    },
    {
      question: "納品形式と納期を教えてください",
      answer: "撮影データは高解像度のJPEG形式で、撮影日から5営業日以内にクラウドストレージ経由で納品いたします。即日納品オプションもご用意しています。"
    },
    {
      question: "キャンセル料はかかりますか？",
      answer: "撮影日2営業日前：20%、1営業日前：50%、当日：100%のキャンセル料が発生します。日程変更は可能な限り対応いたしますので、お早めにご相談ください。"
    }
  ]
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
  
  return (
    <section id="faq" className="py-16" style={{ backgroundColor: 'rgb(36, 35, 35)' }}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionTitle>よくあるご質問</SectionTitle>
          <p className="text-gray-400 mt-4">
            飲食店撮影に関するよくあるご質問をまとめました
          </p>
        </motion.div>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700 transition-colors"
              >
                <span className="text-white font-medium">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-orange-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CasesSection = () => {
  const cases = [
    {
      title: '売上が前年比150%アップ',
      company: 'イタリアンレストラン B.V',
      role: 'オーナーシェフ',
      name: 'Y様',
      comment: '撮影と併せて、オプションの飲食媒体の編集代行も一緒にお願いしてアクセスと予約が急増しました。'
    },
    {
      title: 'SNS運用が楽になりました',
      company: 'カフェ M.G',
      role: '店長',
      name: 'S様',
      comment: '撮影時間内で枚数重視の撮影をお願いして、アップする画像の手札が増えて運用に対しての抵抗が減りました。'
    },
    {
      title: 'デリバリー注文2倍',
      company: '中華料理 R',
      role: '経営者',
      name: 'L様',
      comment: 'プロの技術で料理の魅力が200%アップしました。'
    },
    {
      title: '客単価が15%向上しました',
      company: '和食処 S',
      role: '女将',
      name: 'S様',
      comment: 'オプションも依頼してページの変更をしてもらいブランディングアップに成功して単価がアップしました。'
    }
  ]

  return (
    <section id="cases" className="py-16" style={{ backgroundColor: 'rgb(36, 35, 35)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionTitle>クライアントの声</SectionTitle>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            飲食店撮影PhotoStudioでブランドイメージを一新されたお客様の声
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CaseCard {...caseItem} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const BottomCTA = () => (
  <section className="hidden md:block py-16" style={{ backgroundColor: 'rgb(36, 35, 35)' }}>
    <div className="max-w-5xl mx-auto px-4">
      <motion.div
        className="rounded-3xl p-12 text-center"
        style={{ backgroundColor: 'rgb(77, 76, 76)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          webで今すぐお申し込みいただけます。
        </h2>
        <p className="text-white text-lg mb-8">
          飲食店撮影PhotoStudioで、料理の新しい表現を発見してください。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services/photo/foodphoto/form">
            <Button variant="primary">今すぐ申し込む</Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary">まずは問い合わせる</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 pb-24 md:pb-12">
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="font-bold mb-4">飲食店撮影PhotoStudio</h3>
          <p className="text-gray-400 text-sm">
            プロフェッショナルフードフォトグラフィー
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-4">リンク</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                会社概要
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                個人情報保護方針
              </Link>
            </li>
            <li>
              <Link href="/services/photo/foodphoto/terms" className="text-gray-400 hover:text-white transition-colors">
                サービス規約
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">関連サービス</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/services/movie" className="text-gray-400 hover:text-white transition-colors">
                動画制作サービス
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8">
        <p className="text-center text-gray-400 text-sm">
          © 2024 NonTurn Corporation. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)

// Main Component
export default function FoodPhotoClient() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(36, 35, 35)' }}>
      <Header />
      <IntroSection />
      <NewsSection />
      <FeaturesSection />
      <PricingSection />
      <ParallaxSection />
      <SamplesSection />
      <FlowSection />
      <CasesSection />
      <FAQSection />
      <BottomCTA />
      <Footer />
      
      {/* Mobile Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 p-3">
        <div className="flex gap-2">
          <Link href="/services/photo/foodphoto/form" className="flex-1">
            <button className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 px-4 rounded-lg font-bold text-sm">
              申し込む
            </button>
          </Link>
          <Link href="/contact" className="flex-1">
            <button className="w-full bg-white border-2 border-orange-400 text-orange-400 py-3 px-4 rounded-lg font-bold text-sm">
              問い合わせる
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MainLayout } from '@/components/layout/MainLayout'
import { Scene3DWrapper } from '@/components/3d/Scene3DFallback'
import { VisuallyHidden } from '@/components/accessibility/AccessibilityEnhancements'
import Image from 'next/image'

// Video Thumbnail Component with error handling
function VideoThumbnail({ src, alt, fallbackGradient }: { src: string; alt: string; fallbackGradient: string }) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading')

  if (imageState === 'error') {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient}`} />
    )
  }

  return (
    <>
      <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} animate-pulse`} />
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-500 ${imageState === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageState('loaded')}
        onError={() => setImageState('error')}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </>
  )
}

export default function HomeClient() {
 const { scrollYProgress } = useScroll()
 const heroRef = useRef<HTMLDivElement>(null)
 
 // Parallax transforms
 const yText = useTransform(scrollYProgress, [0, 1], ['0%', '200%'])
 const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
 
 useEffect(() => {
  // Only run on client after hydration
  const timeoutId = setTimeout(() => {
   const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
   }

   const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
     if (entry.isIntersecting) {
      entry.target.classList.add('animate')
     }
    })
   }, observerOptions)

   const animateElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in')
   animateElements.forEach((el) => observer.observe(el))

   return () => observer.disconnect()
  }, 100) // Small delay to ensure DOM is ready

  return () => clearTimeout(timeoutId)
 }, [])

 return (
  <MainLayout>
   
   {/* Hero Section */}
   <section 
    ref={heroRef} 
    className="relative min-h-screen flex items-center overflow-hidden py-12 sm:py-8 md:py-0"
    aria-labelledby="hero-heading"
    role="banner"
   >
    {/* 3D WebGL Background */}
    <Scene3DWrapper />
    
    {/* Hero Content */}
    <motion.div 
     className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
     style={{ y: yText, opacity }}
    >
     <motion.div 
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="fade-in"
     >
      <motion.h1 
       id="hero-heading"
       className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6 md:mb-8 leading-tight tracking-wider"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ delay: 1, duration: 1 }}
      >
       <motion.span 
        className="block text-white"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
       >
        東京・横浜の企業向け
       </motion.span>
       <motion.span 
        className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
       >
        高品質な動画制作
       </motion.span>
       <motion.span 
        className="block text-gray-400 text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
       >
        縦型動画・プロモーション映像
       </motion.span>
      </motion.h1>
      
      <motion.p 
       className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 max-w-lg leading-relaxed"
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 2, duration: 0.8 }}
      >
       東京・横浜エリアで企業向け動画制作を提供。<br />
       縦型動画、プロモーション映像、企業<span className="eng-only">PR</span>動画まで<br />
       プロフェッショナルが対応いたします。
      </motion.p>
      
      <motion.div 
       className="flex flex-col sm:flex-row gap-4"
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 2.2, duration: 0.8 }}
      >
       <motion.a
        href="/contact"
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 font-medium text-lg uppercase tracking-wider hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 relative overflow-hidden group inline-block"
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 191, 36, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="お問い合わせページへ移動"
       >
        <span className="relative z-10">お問い合わせ</span>
        <VisuallyHidden>問い合わせフォームに移動します</VisuallyHidden>
        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
       </motion.a>
       <motion.a
        href="/portfolio"
        className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 font-medium text-lg uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300 relative overflow-hidden group inline-block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="制作実績ページへ移動"
       >
        <span className="relative z-10">制作実績を見る</span>
        <VisuallyHidden>ポートフォリオページに移動します</VisuallyHidden>
        <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
       </motion.a>
      </motion.div>
     </motion.div>
     
     <motion.div 
      className="scale-in relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.4, duration: 0.8 }}
     >
      <div className="relative">
       <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
       <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/topimage-qUv6EKPGnmPtZiyFyz8eVU9yperlGM.png"
          alt="NonTurn.LLCのクリエイティブビジョン"
          width={500}
          height={500}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
       </div>
      </div>
     </motion.div>
    </motion.div>
   </section>

   {/* Services Overview Section */}
   <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <motion.div 
      className="text-center mb-20 fade-in"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
     >
      <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent eng-only">
       SERVICES
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
       映像制作から撮影、Web制作まで、ワンストップでクリエイティブソリューションを提供
      </p>
     </motion.div>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* 映像制作 */}
      <motion.div
       className="slide-left group"
       initial={{ opacity: 0, x: -50 }}
       whileInView={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.8, delay: 0.1 }}
       viewport={{ once: true }}
      >
       <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full hover:border-yellow-400 transition-all duration-300 group-hover:transform group-hover:scale-105">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-yellow-400/50 transition-all duration-300">
         <span className="text-2xl text-black">🎬</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">映像制作</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
         企業VP、採用動画、ブランディング映像など、目的に応じた高品質な映像を制作
        </p>
        <div className="text-yellow-400 font-semibold mb-4">¥220,000〜</div>
        <a href="/services/movie" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
         詳細を見る
         <span className="ml-2">→</span>
        </a>
       </div>
      </motion.div>

      {/* 撮影サービス */}
      <motion.div
       className="slide-left group"
       initial={{ opacity: 0, x: -50 }}
       whileInView={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.8, delay: 0.2 }}
       viewport={{ once: true }}
      >
       <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full hover:border-blue-400 transition-all duration-300 group-hover:transform group-hover:scale-105">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300">
         <span className="text-2xl text-white">📸</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">撮影サービス</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
         イベント撮影、商品撮影など、プロフェッショナルな撮影サービス
        </p>
        <div className="text-blue-400 font-semibold mb-4">¥20,000〜</div>
        <a href="/services/photo" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
         詳細を見る
         <span className="ml-2">→</span>
        </a>
       </div>
      </motion.div>

      {/* Web制作 */}
      <motion.div
       className="slide-left group"
       initial={{ opacity: 0, x: -50 }}
       whileInView={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.8, delay: 0.3 }}
       viewport={{ once: true }}
      >
       <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full hover:border-purple-400 transition-all duration-300 group-hover:transform group-hover:scale-105">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-400/50 transition-all duration-300">
         <span className="text-2xl text-white">💻</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Web制作</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
         企画・制作・運営まで、包括的なWebサイト制作サービス
        </p>
        <div className="text-purple-400 font-semibold mb-4">要相談</div>
        <a href="/services/web" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
         詳細を見る
         <span className="ml-2">→</span>
        </a>
       </div>
      </motion.div>
     </div>
    </div>
   </section>

   {/* Portfolio Showcase Section - Pinterest Style */}
   <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <motion.div 
      className="text-center mb-20 fade-in"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
     >
      <h2 className="text-5xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent eng-only">
       PORTFOLIO
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
       これまでに制作した映像作品をご紹介
      </p>
     </motion.div>

     {/* Revolutionary Masonry Layout - Pure Excellence */}
     <div className="relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
       <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
       />
       <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, -80, 0], 
          y: [0, 60, 0],
          scale: [1, 0.8, 1] 
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5 
        }}
       />
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 mb-16 relative z-10">
       {[
        { 
          title: 'ArtLand', 
          url: 'https://www.youtube.com/watch?v=xuyEFOxLCmk', 
          category: '製造業',
          size: 'legendary', // 伝説級サイズ
          year: '2023',
          client: 'ArtLand',
          description: '製造業の技術力と品質へのこだわりを映像で表現。匠の技術と最新テクノロジーの融合を4K撮影で克明に描いた技術ドキュメンタリー。',
          bgGradient: 'from-blue-500/16 via-indigo-500/16 to-purple-500/16',
          hoverGradient: 'group-hover:from-blue-500/26 group-hover:via-indigo-500/26 group-hover:to-purple-500/26'
        },
        { 
          title: '株式会社一', 
          url: 'https://vimeo.com/manage/videos/628806211', 
          category: '採用動画',
          size: 'compact', // コンパクトサイズ
          year: '2023',
          client: '株式会社一',
          description: '人材事業の魅力と可能性を伝える採用プロモーション。若手社員の成長ストーリーを通じて企業文化を描いた感動的な作品。',
          bgGradient: 'from-emerald-500/15 via-teal-500/15 to-cyan-500/15',
          hoverGradient: 'group-hover:from-emerald-500/25 group-hover:via-teal-500/25 group-hover:to-cyan-500/25'
        },
        { 
          title: 'パンフォーユー', 
          url: 'https://vimeo.com/manage/videos/688687980', 
          category: 'ブランディング',
          size: 'premium', // プレミアムサイズ
          year: '2024',
          client: 'パンフォーユー',
          description: 'DX支援サービスの革新性と信頼性を表現。モーショングラフィックスと実写を巧みに組み合わせたハイブリッド映像。',
          bgGradient: 'from-violet-500/18 via-purple-500/18 to-fuchsia-500/18',
          hoverGradient: 'group-hover:from-violet-500/28 group-hover:via-purple-500/28 group-hover:to-fuchsia-500/28'
        },
        { 
          title: 'フロンティアハウス', 
          url: 'https://www.youtube.com/watch?v=doCZ0piJClw', 
          category: '企業VP',
          size: 'signature', // シグネチャーサイズ
          year: '2024',
          client: 'フロンティアハウス',
          description: '不動産業界のDXを推進する企業のブランディング映像。革新的なアプローチで業界の常識を覆すストーリーテリング。最新のCG技術と実写を融合させた圧倒的な映像体験。',
          bgGradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
          hoverGradient: 'group-hover:from-amber-500/30 group-hover:via-orange-500/30 group-hover:to-red-500/30'
        },
        { 
          title: '真砂茶寮', 
          url: 'https://www.youtube.com/watch?v=oAb-cI93XlE', 
          category: '飲食店',
          size: 'compact', // コンパクトサイズ
          year: '2024',
          client: '真砂茶寮',
          description: '伝統と革新が融合した日本料理店の世界観。季節の移ろいと料理の美しさを繊細に表現した芸術的映像作品。',
          bgGradient: 'from-rose-500/15 via-pink-500/15 to-red-500/15',
          hoverGradient: 'group-hover:from-rose-500/25 group-hover:via-pink-500/25 group-hover:to-red-500/25'
        },
        {
          title: '渋谷アクシュ（SHIBUYA AXSH）',
          url: 'https://vimeo.com/972761987',
          category: '企業プロモーション',
          size: 'premium', // プレミアムサイズ
          year: '2024',
          client: '渋谷アクシュ',
          description: '企業の魅力を表現する高品質なコーポレート動画。革新的なビジョンと高い専門性を持つ同社の魅力を、洗練された映像表現で訴求。',
          bgGradient: 'from-slate-500/12 via-gray-500/12 to-zinc-500/12',
          hoverGradient: 'group-hover:from-slate-500/22 group-hover:via-gray-500/22 group-hover:to-zinc-500/22'
        },
        {
          title: 'スペインポーク',
          url: 'https://www.youtube.com/watch?v=tMVuKqw_uY4',
          category: '食品プロモーション',
          size: 'premium',
          year: '2024',
          client: 'INTERPORC / ICEX',
          description: 'スペイン貿易投資庁（ICEX）とスペイン白豚生産加工者協会（INTERPORC）によるプロモーション映像。スペインポークの品質と伝統、生産から流通までの一貫した管理体制を魅力的に表現。',
          bgGradient: 'from-red-500/18 via-orange-500/18 to-yellow-500/18',
          hoverGradient: 'group-hover:from-red-500/28 group-hover:via-orange-500/28 group-hover:to-yellow-500/28'
        }
       ].map((item, index) => {
        // 動画URLからサムネイルURLを取得する関数
        const getThumbnailUrl = (url: string) => {
          // YouTube URLの場合
          const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
          if (youtubeMatch) {
            return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`
          }
          
          // Vimeo URLの場合（簡易的にID部分を抽出）
          const vimeoMatch = url.match(/vimeo\.com\/(?:manage\/videos\/)?(\d+)/)
          if (vimeoMatch) {
            // Vimeoの場合は、実際のプロジェクトではAPIを使用することを推奨
            // ここではプレースホルダーを返す
            return `https://vumbnail.com/${vimeoMatch[1]}_large.jpg`
          }
          
          return null
        }
        
        const thumbnailUrl = getThumbnailUrl(item.url)
        
        // 革新的サイズシステム - 100点を目指すレベル
        const sizeStyles = {
          compact: {
            height: 'h-56 md:h-64',
            playButton: 'w-14 h-14',
            playIcon: 'text-xl',
            titleSize: 'text-lg font-semibold',
            padding: 'p-5',
            borderRadius: 'rounded-2xl',
            shadowIntensity: 'group-hover:shadow-lg',
            hoverLift: -6
          },
          premium: {
            height: 'h-72 md:h-80 lg:h-88',
            playButton: 'w-18 h-18',
            playIcon: 'text-2xl',
            titleSize: 'text-xl md:text-2xl font-semibold',
            padding: 'p-6',
            borderRadius: 'rounded-3xl',
            shadowIntensity: 'group-hover:shadow-xl',
            hoverLift: -10
          },
          signature: {
            height: 'h-80 md:h-96 lg:h-[26rem]',
            playButton: 'w-20 h-20',
            playIcon: 'text-3xl',
            titleSize: 'text-2xl md:text-3xl font-semibold',
            padding: 'p-7',
            borderRadius: 'rounded-3xl',
            shadowIntensity: 'group-hover:shadow-2xl',
            hoverLift: -12
          },
          legendary: {
            height: 'h-96 md:h-[30rem] lg:h-[36rem]',
            playButton: 'w-24 h-24',
            playIcon: 'text-4xl',
            titleSize: 'text-3xl md:text-4xl lg:text-5xl font-bold',
            padding: 'p-8',
            borderRadius: 'rounded-[2rem]',
            shadowIntensity: 'group-hover:shadow-[0_0_50px_rgba(0,0,0,0.3)]',
            hoverLift: -16
          }
        }
        
        const currentStyle = sizeStyles[item.size as keyof typeof sizeStyles] || sizeStyles.premium
        
        // クリック関数を定義
        const handleCardClick = () => {
          if (item.url && item.url !== '#') {
            // 外部リンクかどうかを判定
            const isExternal = item.url.startsWith('http') || item.url.startsWith('https')
            if (isExternal) {
              window.open(item.url, '_blank', 'noopener,noreferrer')
            } else {
              window.location.href = item.url
            }
          }
        }

        return (
         <motion.article
          key={index}
          className="break-inside-avoid mb-8 group cursor-pointer perspective-1000"
          onClick={handleCardClick}
          role="button"
          tabIndex={0}
          aria-label={`${item.title}の動画を視聴する`}
          title={`${item.title} - ${item.category}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleCardClick()
            }
          }}
          initial={{ 
            opacity: 0, 
            y: 100, 
            scale: 0.8,
            rotateX: 45 
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateX: 0 
          }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.15,
            type: "spring",
            stiffness: 120,
            damping: 15
          }}
          viewport={{ once: true, margin: "-10%" }}
          whileHover={{ 
            y: currentStyle.hoverLift,
            scale: item.size === 'legendary' ? 1.02 : 1.01,
            rotateX: 2,
            transition: { 
              duration: 0.3,
              type: "spring",
              stiffness: 300 
            }
          }}
         >
          <div className={`
            relative ${currentStyle.height} 
            bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-black/95 
            backdrop-blur-xl ${currentStyle.borderRadius} overflow-hidden
            border-2 border-gray-700/40 
            group-hover:border-transparent
            transition-all duration-700 ease-out
            ${currentStyle.shadowIntensity}
            transform-gpu
            ${item.size === 'legendary' ? 'ring-1 ring-amber-500/20 group-hover:ring-amber-400/40 group-hover:ring-2' :
              item.size === 'signature' ? 'ring-1 ring-blue-500/20 group-hover:ring-blue-400/40' :
              item.size === 'premium' ? 'ring-1 ring-purple-500/20 group-hover:ring-purple-400/40' :
              'ring-1 ring-gray-500/20 group-hover:ring-gray-400/40'}
          `}>
           
           {/* Video Thumbnail Background */}
           {thumbnailUrl && (
             <div className="absolute inset-0 z-0">
               <VideoThumbnail 
                 src={thumbnailUrl}
                 alt={`${item.title}のサムネイル`}
                 fallbackGradient={item.bgGradient}
               />
               {/* Overlay gradients for better text readability */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
               <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`}></div>
             </div>
           )}
           
           {/* Ultra Premium Video Area with Cinematic Effects */}
           <div className="absolute inset-0 overflow-hidden">
            {/* Dynamic Background with Mesh Gradients */}
            <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
             <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} ${item.hoverGradient} transition-all duration-700`}></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5"></div>
             
             {/* Cinematic Noise Overlay */}
             <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-white via-transparent to-white mix-blend-overlay"></div>
            </div>

            {/* Revolutionary Play Button System */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
             <motion.button 
              onClick={(e) => {
                e.stopPropagation() // イベントバブリングを防ぐ
                handleCardClick()
              }}
              className={`
                ${currentStyle.playButton} 
                bg-black/20 backdrop-blur-xl rounded-full 
                flex items-center justify-center
                border border-white/10 shadow-2xl
                relative overflow-hidden group/play
                transition-all duration-500
                ${item.size === 'legendary' ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10' :
                  item.size === 'signature' ? 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10' :
                  item.size === 'premium' ? 'bg-gradient-to-br from-purple-500/10 to-violet-500/10' :
                  'bg-gradient-to-br from-gray-500/10 to-slate-500/10'}
                group-hover:scale-110 group-hover:bg-white/20
                group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
              `}
              whileHover={{ 
                scale: item.size === 'legendary' ? 1.4 : 1.3,
                rotate: item.size === 'legendary' ? [0, 5, -5, 0] : 0,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.85 }}
             >
              {/* Play Icon with Premium Typography */}
              <motion.div 
                className={`${currentStyle.playIcon} text-white ml-1 font-light`}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                ▶
              </motion.div>
              
              {/* Ripple Effect */}
              <motion.div 
                className="absolute inset-0 rounded-full border border-white/20"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.5, 2],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
             </motion.button>
            </div>
           </div>

           {/* Premium Content Layer with Advanced Typography */}
           <div className={`absolute inset-0 ${currentStyle.padding} flex flex-col justify-end z-30`}>
            {/* Year Badge */}
            <motion.div 
              className="absolute top-4 right-4 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm font-medium backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {item.year}
            </motion.div>

            {/* Main Content */}
            <motion.div
             initial={{ y: 30, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
             className="space-y-3"
            >
             {/* Category with Client */}
             <div className="flex items-center justify-between">
              <div className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl text-sm font-semibold
                ${item.size === 'legendary' ? 'bg-amber-500/20 border border-amber-400/30 text-amber-200' :
                  item.size === 'signature' ? 'bg-blue-500/20 border border-blue-400/30 text-blue-200' :
                  item.size === 'premium' ? 'bg-purple-500/20 border border-purple-400/30 text-purple-200' :
                  'bg-emerald-500/20 border border-emerald-400/30 text-emerald-200'}
              `}>
                <span className="w-2 h-2 rounded-full bg-current opacity-60"></span>
                {item.category}
              </div>
              
              {item.client && (
                <div className="text-white/60 text-sm font-medium">
                  {item.client}
                </div>
              )}
             </div>
             
             {/* Title with Sophisticated Typography */}
             <motion.h3 
               className={`
                 ${currentStyle.titleSize} text-white mb-2
                 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent
                 tracking-tight leading-tight
                 group-hover:from-white group-hover:to-white transition-all duration-500
               `}
               whileHover={{ scale: 1.02 }}
               transition={{ duration: 0.2 }}
             >
               {item.title}
             </motion.h3>
             
             {/* Enhanced Description */}
             <motion.div
               initial={{ height: 0, opacity: 0 }}
               whileHover={{ height: "auto", opacity: 1 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="overflow-hidden"
             >
               <p className={`
                 text-gray-300 leading-relaxed
                 ${item.size === 'legendary' ? 'text-base md:text-lg' :
                   item.size === 'signature' ? 'text-sm md:text-base' :
                   'text-sm'}
               `}>
                 {item.description}
               </p>
             </motion.div>

             {/* View Project Button */}
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               whileHover={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3, delay: 0.1 }}
               className="pt-2"
             >
               <button 
                 onClick={(e) => {
                   e.stopPropagation() // イベントバブリングを防ぐ
                   handleCardClick()
                 }}
                 className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
               >
                 <span>プロジェクトを見る</span>
                 <motion.span
                   whileHover={{ x: 3 }}
                   transition={{ duration: 0.2 }}
                 >
                   →
                 </motion.span>
               </button>
             </motion.div>
            </motion.div>
           </div>

           {/* Legendary Card Special Effects */}
           {item.size === 'legendary' && (
             <>
               {/* Floating Orbs */}
               <motion.div 
                 className="absolute top-8 right-8 w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-60"
                 animate={{ 
                   y: [0, -10, 0],
                   opacity: [0.6, 1, 0.6] 
                 }}
                 transition={{ 
                   duration: 3, 
                   repeat: Infinity,
                   ease: "easeInOut" 
                 }}
               />
               <motion.div 
                 className="absolute bottom-8 left-8 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-40"
                 animate={{ 
                   y: [0, 8, 0],
                   opacity: [0.4, 0.8, 0.4] 
                 }}
                 transition={{ 
                   duration: 4, 
                   repeat: Infinity,
                   ease: "easeInOut",
                   delay: 1 
                 }}
               />
               
               {/* Premium Glow Effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             </>
           )}
          </div>
         </motion.article>
        )
      })}
      </div>
     </div>

     <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
     >
      <motion.a 
       href="/portfolio" 
       className="inline-flex items-center bg-gradient-to-r from-blue-400 to-purple-500 text-white px-8 py-4 font-medium text-lg rounded-lg hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-400/25"
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
      >
       全ての実績を見る
       <motion.span 
        className="ml-2"
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
       >
        →
       </motion.span>
      </motion.a>
     </motion.div>
    </div>
   </section>

   {/* About Preview Section */}
   <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
       className="slide-right"
       initial={{ opacity: 0, x: 50 }}
       whileInView={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.8 }}
       viewport={{ once: true }}
      >
       <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">
        クリエイティブで
        <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
         課題解決に挑む
        </span>
       </h2>
       <p className="text-xl text-gray-300 mb-8 leading-relaxed">
        NonTurn.LLCは、映像制作を通じた問題解決を通じて、
        企業のビジネス課題解決をサポートします。
       </p>
       <div className="space-y-4 mb-8">
        <div className="flex items-start gap-3">
         <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-1">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
         </div>
         <div>
          <h4 className="text-white font-semibold mb-1">問題の本質を見定める</h4>
          <p className="text-gray-400 text-sm">企業の課題を明確にし、それらを解消するためのクリエイティブを考える</p>
         </div>
        </div>
        <div className="flex items-start gap-3">
         <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-1">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
         </div>
         <div>
          <h4 className="text-white font-semibold mb-1">最新技術との融合</h4>
          <p className="text-gray-400 text-sm">4K映像、ドローン撮影、モーショングラフィックスで革新的な表現を実現</p>
         </div>
        </div>
        <div className="flex items-start gap-3">
         <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-1">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
         </div>
         <div>
          <h4 className="text-white font-semibold mb-1">一貫したサポート体制</h4>
          <p className="text-gray-400 text-sm">企画から納品まで、すべてのプロセスを一貫してサポート</p>
         </div>
        </div>
       </div>
       <a 
        href="/about" 
        className="inline-flex items-center border-2 border-yellow-400 text-yellow-400 px-6 py-3 font-medium rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300"
       >
        会社について詳しく
        <span className="ml-2">→</span>
       </a>
      </motion.div>

      <motion.div
       className="slide-left"
       initial={{ opacity: 0, x: -50 }}
       whileInView={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.8 }}
       viewport={{ once: true }}
      >
       <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-blue-500/20 rounded-2xl blur-3xl"></div>
        <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
         <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-yellow-400/50">
           <Image
             src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/6A4F63FB-ED0B-4A44-A685-33A0809450A1-haCoMJ0OFBBjS6foXiVFcNXdgiNH8w.jpg"
             alt="澤田憲孝"
             width={96}
             height={96}
             className="w-full h-full object-cover"
           />
          </div>
          <h3 className="text-2xl font-semibold text-white">澤田 憲孝</h3>
          <p className="text-gray-300">代表社員</p>
         </div>
         <p className="text-gray-300 text-center leading-relaxed">
          &ldquo;クリエイティブなアプローチで<br />
          お客様のビジネスを次のレベルへ&rdquo;
         </p>
        </div>
       </div>
      </motion.div>
     </div>
    </div>
   </section>

   {/* Contact CTA Section */}
   <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
     <motion.div
      className="fade-in"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
     >
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
       プロジェクトを
       <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        始めませんか？
       </span>
      </h2>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
       映像制作、撮影、Web制作のご相談はお気軽にお問い合わせください。
       お客様のビジネスに最適なソリューションをご提案します。
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
       <motion.a
        href="/contact"
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 font-medium text-lg rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
       >
        お問い合わせ
       </motion.a>
       <motion.a
        href="/pricing"
        className="border-2 border-gray-400 text-gray-400 px-8 py-4 font-medium text-lg rounded-lg hover:border-white hover:text-white transition-all duration-300 transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
       >
        料金を見る
       </motion.a>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-700">
       <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-400">
        <div className="flex items-center gap-2">
         <span>📧</span>
         <span>info@non-turn.com</span>
        </div>
        <div className="flex items-center gap-2">
         <span>📍</span>
         <span>横浜みなとみらい</span>
        </div>
        <div className="flex items-center gap-4">
         <a href="https://www.instagram.com/nonturn2022" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
          <span>📷 <span className="eng-only">Instagram</span></span>
         </a>
        </div>
       </div>
      </div>
     </motion.div>
    </div>
   </section>
  </MainLayout>
 )
}
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MainLayout } from '@/components/layout/MainLayout'
import { DynamicOptimizedScene3D } from '@/components/3d/DynamicOptimizedScene3D'
import { VisuallyHidden } from '@/components/accessibility/AccessibilityEnhancements'
import Image from 'next/image'
import { TrendingUp, Layers, Award, Cpu, Users } from 'lucide-react'
import { LeadMagnetSection } from '@/components/lead-magnet/LeadMagnetSection'

// Safari検出フック - サーバーとクライアントで同じ初期値を使用
function useIsSafari() {
  const [isSafari, setIsSafari] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const userAgent = window.navigator.userAgent.toLowerCase()
    const safari = /^((?!chrome|android).)*safari/i.test(userAgent)
    setIsSafari(safari)
  }, [])

  // mounted前は常にfalseを返してHydration不一致を防ぐ
  return mounted ? isSafari : false
}

// モバイル検出フック (640px未満 = Tailwind sm breakpoint)
// Returns null during SSR/initial render to avoid hydration mismatch
function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

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
 const isSafari = useIsSafari()
 const isMobile = useIsMobile()
 const heroRef = useRef<HTMLDivElement>(null)
 const [isMounted, setIsMounted] = useState(false)

 // Hydration完了後にマウント状態を更新
 useEffect(() => {
  setIsMounted(true)
 }, [])
 
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
    className="relative h-svh flex items-center justify-center overflow-hidden"
    aria-labelledby="hero-heading"
    role="banner"
   >
    {/* Video Background */}
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70" />
    </div>
    
    {/* Hero Content - Centered Full Screen */}
    <motion.div
     className="w-full mx-auto px-4 sm:px-10 lg:px-16 lg:max-w-7xl flex flex-col justify-center items-center lg:items-start relative z-10 h-full"
     suppressHydrationWarning
    >
     <div className="flex flex-col items-center lg:items-start">
      <motion.p
       className="text-[clamp(1rem,3vw,1.75rem)] font-medium text-gray-400 tracking-[0.2em] uppercase mb-4 md:mb-6 overflow-hidden"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ delay: 0.3, duration: 0.6 }}
      >
       <motion.span
        className="block"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
       >
        映像も、Webも、写真も。
       </motion.span>
      </motion.p>

      {/* Glitch CSS Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes glitch-before {
          0% { clip-path: polygon(0 85%, 100% 85%, 100% 95%, 0 95%); transform: translate(4px, -2px); }
          5% { clip-path: polygon(0 65%, 100% 65%, 100% 72%, 0 72%); transform: translate(-6px, 1px); }
          10% { clip-path: polygon(0 15%, 100% 15%, 100% 22%, 0 22%); transform: translate(3px, -1px); }
          15% { clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%); transform: translate(-4px, 2px); }
          20% { clip-path: polygon(0 75%, 100% 75%, 100% 82%, 0 82%); transform: translate(5px, 0px); }
          25% { clip-path: polygon(0 30%, 100% 30%, 100% 38%, 0 38%); transform: translate(-3px, -1px); }
          30%, 100% { clip-path: none; transform: none; }
        }
        @keyframes glitch-after {
          0% { clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%); transform: translate(-5px, 1px); }
          5% { clip-path: polygon(0 50%, 100% 50%, 100% 58%, 0 58%); transform: translate(6px, -2px); }
          10% { clip-path: polygon(0 80%, 100% 80%, 100% 88%, 0 88%); transform: translate(-4px, 0px); }
          15% { clip-path: polygon(0 5%, 100% 5%, 100% 15%, 0 15%); transform: translate(3px, 2px); }
          20% { clip-path: polygon(0 40%, 100% 40%, 100% 50%, 0 50%); transform: translate(-6px, -1px); }
          25% { clip-path: polygon(0 70%, 100% 70%, 100% 78%, 0 78%); transform: translate(4px, 1px); }
          30%, 100% { clip-path: none; transform: none; }
        }
        @keyframes rgb-shift-r {
          0% { transform: translate(2px, 1px); } 5% { transform: translate(-1px, -1px); }
          10% { transform: translate(3px, 0px); } 15% { transform: translate(-2px, 1px); }
          20% { transform: translate(1px, -1px); } 25% { transform: translate(-3px, 0px); }
          30%, 100% { transform: none; }
        }
        @keyframes rgb-shift-b {
          0% { transform: translate(-2px, -1px); } 5% { transform: translate(1px, 1px); }
          10% { transform: translate(-3px, 0px); } 15% { transform: translate(2px, -1px); }
          20% { transform: translate(-1px, 1px); } 25% { transform: translate(3px, 0px); }
          30%, 100% { transform: none; }
        }
        .hero-glitch {
          position: relative;
        }
        .hero-glitch-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .hero-glitch-before {
          animation: glitch-before 3s infinite steps(1);
          color: rgba(255, 80, 80, 0.7);
        }
        .hero-glitch-after {
          animation: glitch-after 3s infinite steps(1);
          animation-delay: 0.1s;
          color: rgba(80, 80, 255, 0.7);
        }
        .hero-rgb-r {
          animation: rgb-shift-r 2.5s infinite steps(1);
          color: rgba(255, 50, 50, 0.4);
          mix-blend-mode: screen;
        }
        .hero-rgb-b {
          animation: rgb-shift-b 2.5s infinite steps(1);
          animation-delay: 0.05s;
          color: rgba(50, 50, 255, 0.4);
          mix-blend-mode: screen;
        }
        @keyframes glow-pulse {
          0%, 100% { text-shadow: 0 0 20px rgba(250, 204, 21, 0.3), 0 0 40px rgba(250, 204, 21, 0.1); }
          50% { text-shadow: 0 0 30px rgba(250, 204, 21, 0.5), 0 0 60px rgba(250, 204, 21, 0.2), 0 0 80px rgba(250, 204, 21, 0.1); }
        }
        .hero-glow {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        .hero-catchcopy-size {
          font-size: clamp(3rem, 13vw, 4.5rem) !important;
          white-space: nowrap;
        }
        @media (min-width: 768px) {
          .hero-catchcopy-size {
            font-size: clamp(4rem, 9vw, 7rem) !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-catchcopy-size {
            font-size: clamp(5rem, 10vw, 10rem) !important;
          }
        }
      `}} />

      <motion.h1
       id="hero-heading"
       className="hero-glitch font-bold tracking-tight mb-6 md:mb-8 hero-catchcopy-size leading-[1.05] -rotate-3"
      >
       {/* Main visible text */}
       <span className="block relative z-10">
        <motion.span
         className="block hero-glow"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
        >
         <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          ひとつの窓口で
         </span>
        </motion.span>
       </span>
       <span className="block relative z-10">
        <motion.span
         className="block"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.9, duration: 1.2, ease: 'easeOut' }}
        >
         <span className="text-white">成果を出す</span>
        </motion.span>
       </span>

       {/* Glitch layer: before (red) */}
       <motion.div
        className="hero-glitch-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.3 }}
        aria-hidden="true"
       >
        <div className="hero-glitch-before font-bold tracking-tight hero-catchcopy-size leading-[1.05]">
         <span className="block">ひとつの窓口で</span>
         <span className="block">成果を出す</span>
        </div>
       </motion.div>

       {/* Glitch layer: after (blue) */}
       <motion.div
        className="hero-glitch-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.3 }}
        aria-hidden="true"
       >
        <div className="hero-glitch-after font-bold tracking-tight hero-catchcopy-size leading-[1.05]">
         <span className="block">ひとつの窓口で</span>
         <span className="block">成果を出す</span>
        </div>
       </motion.div>

       {/* RGB chromatic aberration layers */}
       <motion.div
        className="hero-glitch-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.3 }}
        aria-hidden="true"
       >
        <div className="hero-rgb-r font-bold tracking-tight hero-catchcopy-size leading-[1.05]">
         <span className="block">ひとつの窓口で</span>
         <span className="block">成果を出す</span>
        </div>
       </motion.div>
       <motion.div
        className="hero-glitch-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.3 }}
        aria-hidden="true"
       >
        <div className="hero-rgb-b font-bold tracking-tight hero-catchcopy-size leading-[1.05]">
         <span className="block">ひとつの窓口で</span>
         <span className="block">成果を出す</span>
        </div>
       </motion.div>

       {/* Light sweep after entrance */}
       <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
       >
        <motion.div
         className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"
         initial={{ left: '-40%' }}
         animate={{ left: '140%' }}
         transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
       </motion.div>
      </motion.h1>

      <div className="mt-4 md:mt-6 mb-10 md:mb-14 font-bold italic text-[clamp(0.95rem,3.3vw,2rem)] leading-[1.3] tracking-wide relative z-20">
       {['採用応募30%増', 'リード獲得40%向上', '限られた予算で最大の成果を'].map((text, i) => (
        <div key={text} className="overflow-hidden">
         <motion.p
          className="text-yellow-500/80"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.8 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
         >
          {text}
         </motion.p>
        </div>
       ))}
      </div>

      <motion.div
       className="flex flex-col sm:flex-row gap-4"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 2.2, duration: 0.8 }}
      >
       <motion.a
        href="/contact"
        id="cta-hero-consultation"
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 font-medium text-lg tracking-wider hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 relative overflow-hidden group inline-block text-center"
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 191, 36, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="まずは無料で相談する"
       >
        <span className="relative z-10">まずは無料で相談する</span>
        <VisuallyHidden>無料相談のページに移動します</VisuallyHidden>
        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
       </motion.a>
       <motion.a
        href="/portfolio"
        id="cta-hero-portfolio"
        className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 font-medium text-lg tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300 relative overflow-hidden group inline-block text-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="成果事例ページへ移動"
       >
        <span className="relative z-10">成果事例を見る</span>
        <VisuallyHidden>成果事例ページに移動します</VisuallyHidden>
        <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
       </motion.a>
      </motion.div>
     </div>
    </motion.div>

    {/* Scroll Down Indicator */}
    <motion.div
     className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ delay: 3, duration: 1 }}
    >
     <span className="text-xs text-gray-500 tracking-[0.3em] uppercase">Scroll Down</span>
     <motion.div
      className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent"
      animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
     />
    </motion.div>
   </section>

   {/* Trust Badges Section */}
   <section className="py-16 bg-gradient-to-b from-black to-gray-900 relative">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {[
        { icon: TrendingUp, label: 'リード獲得 最大40%向上', description: '映像×Web連携の成果' },
        { icon: Layers, label: '企画から制作・Web実装まで', description: '一気通貫の対応力' },
        { icon: Award, label: '500+プロジェクト', description: '飲食・不動産・人材 他' },
        { icon: Cpu, label: 'シネマ撮影 × AI編集', description: '品質と効率を両立' },
      ].map((badge, index) => (
       <motion.div
        key={badge.label}
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
       >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-3">
         <badge.icon className="w-7 h-7 md:w-8 md:h-8 text-yellow-400" />
        </div>
        <h3 className="text-sm md:text-base font-semibold text-white mb-1">{badge.label}</h3>
        <p className="text-xs md:text-sm text-gray-400">{badge.description}</p>
       </motion.div>
      ))}
     </div>
    </div>
   </section>

   {/* USP Section */}
   <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-900 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
     >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
       AI時代だからこそ、
       <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        一つの窓口が成果を生む
       </span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
       AIで誰でもコンテンツが作れる時代。差がつくのは「何を作るか」ではなく「どう繋げるか」。映像・Web・AIを一気通貫で設計するから、バラバラに発注するより圧倒的に成果が出ます。
      </p>
     </motion.div>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <motion.div
       className="group"
       initial={{ opacity: 0, y: 40 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, delay: 0.1 }}
       viewport={{ once: true }}
      >
       <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 h-full hover:border-yellow-400/30 transition-all duration-300">
        <div className="w-14 h-14 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-5">
         <Layers className="w-7 h-7 text-yellow-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">窓口は、ひとつ</h3>
        <p className="text-gray-400 leading-relaxed">
         映像・写真・Web・AI。すべてを一つの窓口に集約。業者間の伝言ゲームがなくなり、ブランドメッセージがブレません。
        </p>
       </div>
      </motion.div>

      <motion.div
       className="group"
       initial={{ opacity: 0, y: 40 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, delay: 0.2 }}
       viewport={{ once: true }}
      >
       <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 h-full hover:border-yellow-400/30 transition-all duration-300">
        <div className="w-14 h-14 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-5">
         <Users className="w-7 h-7 text-yellow-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">AIを使いこなすプロチーム</h3>
        <p className="text-gray-400 leading-relaxed">
         生成AIによる効率化で、従来の半分の工数でも品質は妥協しない。浮いたコストを企画や演出に再投資できるから、費用対効果が根本から変わります。
        </p>
       </div>
      </motion.div>

      <motion.div
       className="group"
       initial={{ opacity: 0, y: 40 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, delay: 0.3 }}
       viewport={{ once: true }}
      >
       <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 h-full hover:border-yellow-400/30 transition-all duration-300">
        <div className="w-14 h-14 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-5">
         <TrendingUp className="w-7 h-7 text-yellow-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">作って終わりにしない</h3>
        <p className="text-gray-400 leading-relaxed">
         映像をWebに組み込み、AIで導線を最適化。点ではなく「面」で設計するから、リード獲得40%向上のような明確な成果につながります。
        </p>
       </div>
      </motion.div>
     </div>
    </div>
   </section>

   {/* Services Overview Section */}
   <section className="py-32 bg-gradient-to-b from-gray-900 via-gray-900 to-black relative">
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
       ひとつの窓口で、映像・写真・Web制作まで。必要なクリエイティブをすべてカバーします
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
         Sony FX6/FX3による本格撮影、RED KOMODOでのRAW収録でシネマライクな映像を実現。DaVinci Resolveでのカラーグレーディング、After EffectsでのVFXで仕上げる妥協のない品質
        </p>
        <div className="text-yellow-400 font-semibold mb-1 text-sm">参考予算</div>
        <div className="text-gray-400 text-xs mb-4 leading-relaxed">企業VP：80万円〜 ／ 採用動画：50万円〜 ／ SNS縦型：15万円〜</div>
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
         Capture Oneでその場で最終品質を確認しながら撮影。商品・イベント・宣材、あらゆるシーンに対応
        </p>
        <div className="text-blue-400 font-semibold mb-1 text-sm">参考予算</div>
        <div className="text-gray-400 text-xs mb-4 leading-relaxed">商品撮影：15万円〜 ／ イベント：10万円〜 ／ 宣材写真：5万円〜</div>
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
        <div className="text-purple-400 font-semibold mb-1 text-sm">参考予算</div>
        <div className="text-gray-400 text-xs mb-4 leading-relaxed">コーポレートLP：50万円〜 ／ ECサイト：80万円〜 ／ 映像×Web連携：要相談</div>
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
       採用応募30%増、予約数25%増。クリエイティブが生んだビジネスインパクト
      </p>
     </motion.div>

     {/* Revolutionary Masonry Layout - Pure Excellence */}
     <div className="relative">
      {/* Floating Background Elements - Safariでは無効化 */}
      {!isSafari && (
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
      )}

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-8 mb-16 relative z-10 [column-fill:balance]">
       {[
        {
          title: 'ArtLand',
          id: 'artland-brand',
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
          id: 'hajime-recruit',
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
          id: 'pan-for-you',
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
          id: 'frontier-house',
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
          id: 'masago-saryo',
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
          id: 'shibuya-axsh',
          url: 'https://vimeo.com/972761987',
          category: '施設紹介',
          size: 'premium', // プレミアムサイズ
          year: '2024',
          client: '渋谷アクシュ',
          description: 'デベロッパー向けに施設の魅力を訴求する紹介動画。立地の優位性や施設スペックの特長を、洗練された映像表現で訴求。',
          bgGradient: 'from-slate-500/12 via-gray-500/12 to-zinc-500/12',
          hoverGradient: 'group-hover:from-slate-500/22 group-hover:via-gray-500/22 group-hover:to-zinc-500/22'
        },
        {
          title: 'スペインポーク',
          id: 'spain-pork',
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
        
        // 革新的サイズシステム - モバイル1カラム縦長対応
        const sizeStyles = {
          compact: {
            mobileHeight: 480,
            height: 'sm:h-56 md:h-64',
            playButton: 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14',
            playIcon: 'text-base sm:text-lg md:text-xl',
            titleSize: 'text-xl sm:text-xl md:text-2xl font-bold',
            padding: 'p-3 sm:p-4 md:p-5',
            borderRadius: 'rounded-xl sm:rounded-2xl',
            shadowIntensity: 'group-hover:shadow-lg',
            hoverLift: -6
          },
          premium: {
            mobileHeight: 520,
            height: 'sm:h-64 md:h-80 lg:h-88',
            playButton: 'w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18',
            playIcon: 'text-lg sm:text-xl md:text-2xl',
            titleSize: 'text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold',
            padding: 'p-3 sm:p-4 md:p-6',
            borderRadius: 'rounded-xl sm:rounded-2xl md:rounded-3xl',
            shadowIntensity: 'group-hover:shadow-xl',
            hoverLift: -10
          },
          signature: {
            mobileHeight: 560,
            height: 'sm:h-72 md:h-96 lg:h-[26rem]',
            playButton: 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20',
            playIcon: 'text-xl sm:text-2xl md:text-3xl',
            titleSize: 'text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold',
            padding: 'p-4 sm:p-5 md:p-7',
            borderRadius: 'rounded-2xl sm:rounded-2xl md:rounded-3xl',
            shadowIntensity: 'group-hover:shadow-2xl',
            hoverLift: -12
          },
          legendary: {
            mobileHeight: 600,
            height: 'sm:h-64 md:h-[30rem] lg:h-[36rem]',
            playButton: 'w-16 h-16 sm:w-18 sm:h-18 md:w-24 md:h-24',
            playIcon: 'text-2xl sm:text-3xl md:text-4xl',
            titleSize: 'text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold',
            padding: 'p-4 sm:p-5 md:p-8',
            borderRadius: 'rounded-2xl sm:rounded-2xl md:rounded-[2rem]',
            shadowIntensity: 'group-hover:shadow-[0_0_50px_rgba(0,0,0,0.3)]',
            hoverLift: -16
          }
        }
        
        const currentStyle = sizeStyles[item.size as keyof typeof sizeStyles] || sizeStyles.premium
        
        // クリック関数を定義 — ケーススタディページがあればそちらへ
        const handleCardClick = () => {
          if (item.id) {
            window.location.href = `/portfolio/${item.id}`
          } else if (item.url && item.url !== '#') {
            const isExternal = item.url.startsWith('http') || item.url.startsWith('https')
            if (isExternal) {
              window.open(item.url, '_blank', 'noopener,noreferrer')
            } else {
              window.location.href = item.url
            }
          }
        }

        return (
         <article
          key={index}
          className="group cursor-pointer perspective-1000 break-inside-avoid mb-3 md:mb-8"
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
         >
          {/* Unified Responsive Card Layout */}
          <div className={`
            flex flex-col sm:relative
            bg-gradient-to-br from-gray-900 via-gray-800 to-black
            sm:from-gray-900/95 sm:via-gray-800/95 sm:to-black/95
            sm:backdrop-blur-xl
            ${currentStyle.borderRadius}
            overflow-hidden
            border border-gray-700/50 sm:border-2 sm:border-gray-700/40
            sm:group-hover:border-transparent
            transition-all duration-300 sm:duration-700 sm:ease-out
            shadow-lg ${currentStyle.shadowIntensity}
            sm:transform-gpu
            sm:${currentStyle.height}
            ${item.size === 'legendary' ? 'ring-1 ring-amber-500/30 sm:ring-amber-500/20 sm:group-hover:ring-amber-400/40 sm:group-hover:ring-2' :
              item.size === 'signature' ? 'ring-1 ring-blue-500/30 sm:ring-blue-500/20 sm:group-hover:ring-blue-400/40' :
              item.size === 'premium' ? 'ring-1 ring-purple-500/30 sm:ring-purple-500/20 sm:group-hover:ring-purple-400/40' :
              'ring-1 ring-gray-500/30 sm:ring-gray-500/20 sm:group-hover:ring-gray-400/40'}
          `}>
            {/* Image/Video Section - Mobile: h-48 fixed, Desktop: full overlay */}
            <div className="relative h-48 sm:absolute sm:inset-0 sm:h-auto overflow-hidden">
              {thumbnailUrl && (
                <VideoThumbnail
                  src={thumbnailUrl}
                  alt={`${item.title}のサムネイル`}
                  fallbackGradient={item.bgGradient}
                />
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-30 sm:opacity-40 sm:group-hover:opacity-60 sm:transition-opacity sm:duration-700`}></div>
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center sm:z-20">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCardClick()
                  }}
                  className={`
                    w-12 h-12 sm:${currentStyle.playButton}
                    bg-black/40 sm:bg-black/20 backdrop-blur-sm sm:backdrop-blur-xl rounded-full
                    flex items-center justify-center
                    border border-white/20 sm:border-white/10
                    sm:shadow-2xl sm:relative sm:overflow-hidden
                    sm:transition-all sm:duration-500
                    sm:group-hover:scale-110 sm:group-hover:bg-white/20
                    sm:group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
                  `}
                  whileTap={{ scale: 0.9 }}
                  whileHover={isSafari ? undefined : {
                    scale: item.size === 'legendary' ? 1.4 : 1.3,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 }
                  }}
                >
                  <span className="text-white text-lg ml-0.5">▶</span>
                </motion.button>
              </div>

              {/* Year Badge - positioned in image area */}
              <div className="absolute top-3 right-3 px-2 py-0.5 sm:px-3 sm:py-1 bg-black/50 sm:bg-white/10 sm:border sm:border-white/20 backdrop-blur-sm rounded-full text-white/90 sm:text-white/80 text-xs sm:text-sm font-medium">
                {item.year}
              </div>
            </div>

            {/* Text Content Section - Mobile: regular flow, Desktop: absolute bottom */}
            <div className="p-4 flex flex-col gap-2 sm:absolute sm:inset-x-0 sm:bottom-0 sm:z-30 sm:p-6 lg:p-8">
              {/* Category Badge */}
              <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-semibold w-fit backdrop-blur-sm sm:backdrop-blur-xl ${
                item.size === 'legendary' ? 'bg-amber-500/20 text-amber-300 sm:border sm:border-amber-400/30 sm:text-amber-200' :
                item.size === 'signature' ? 'bg-blue-500/20 text-blue-300 sm:border sm:border-blue-400/30 sm:text-blue-200' :
                item.size === 'premium' ? 'bg-purple-500/20 text-purple-300 sm:border sm:border-purple-400/30 sm:text-purple-200' :
                'bg-emerald-500/20 text-emerald-300 sm:border sm:border-emerald-400/30 sm:text-emerald-200'
              }`}>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current opacity-70 sm:opacity-60 flex-shrink-0"></span>
                <span>{item.category}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-400 sm:text-gray-300/80 leading-relaxed line-clamp-2">
                {item.description}
              </p>

              {/* View Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleCardClick()
                }}
                className="inline-flex items-center gap-1.5 text-white/70 sm:text-white/60 text-sm font-medium mt-1 sm:group-hover:text-white sm:transition-colors"
              >
                <span>プロジェクトを見る</span>
                <span>→</span>
              </button>
            </div>
          </div>
         </article>
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

   {/* Lead Magnet Section */}
   <LeadMagnetSection />

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
        成果から逆算する
        <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
         クリエイティブチーム
        </span>
       </h2>
       <p className="text-xl text-gray-300 mb-8 leading-relaxed">
        映像、写真、Webは「納品物」ではなく、貴社の課題を解決するための手段です。複数業者を束ねる手間をなくし、一つの窓口で戦略から実装まで一貫。作って終わりではなく、数字で語れる成果を追い続けます。
       </p>
       <div className="space-y-4 mb-8">
        <div className="flex items-start gap-3">
         <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-1">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
         </div>
         <div>
          <h4 className="text-white font-semibold mb-1">何が必要かを一緒に整理する</h4>
          <p className="text-gray-400 text-sm">企業の課題を明確にし、最適なクリエイティブの方向性を一緒に考える</p>
         </div>
        </div>
        <div className="flex items-start gap-3">
         <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-1">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
         </div>
         <div>
          <h4 className="text-white font-semibold mb-1">映像 × Web × AIで成果を設計</h4>
          <p className="text-gray-400 text-sm">シネマRAW撮影からテザー現像、VFX、生成AIまで。目的に応じた最適な技術で成果を最大化</p>
         </div>
        </div>
        <div className="flex items-start gap-3">
         <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-1">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
         </div>
         <div>
          <h4 className="text-white font-semibold mb-1">企画から運用まで伴走する</h4>
          <p className="text-gray-400 text-sm">納品して終わりではなく、運用・改善まで一貫してサポート</p>
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
   <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
     <motion.div
      className="fade-in"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
     >
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
       「動画？Web？何から始めれば？」
       <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        そのモヤモヤごと、ご相談ください
       </span>
      </h2>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
       何が必要か、まだわからなくても大丈夫。最適な手段を一緒に考えるところから始めます。
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
       <div className="flex flex-col items-center">
        <motion.a
         href="/contact"
         id="cta-footer-consultation"
         className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 font-medium text-lg rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50"
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
        >
         まずは無料で相談する
        </motion.a>
        <p className="text-sm text-gray-500 mt-2">※無理な営業は一切行いません</p>
       </div>
       <motion.a
        href="/portfolio"
        className="border-2 border-gray-400 text-gray-400 px-8 py-4 font-medium text-lg rounded-lg hover:border-white hover:text-white transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
       >
        成果事例を見る
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
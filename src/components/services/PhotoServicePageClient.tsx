'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/ui/HeroSection'
import { services } from '@/data/services'

export default function PhotoServicePageClient() {
 const serviceData = services.photo
 const [selectedPlan, setSelectedPlan] = useState(0)
 const [selectedCategory, setSelectedCategory] = useState(0)
 const [isGalleryOpen, setIsGalleryOpen] = useState(false)
 
 // Gallery images from Vercel storage
 const galleryImages = useMemo(() => [
  { 
   id: 1, 
   src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/1-ahUBbGFxLbRSGBp8I5zesVu1UCrEXM.jpg', 
   alt: 'Professional Photography Work 1' 
  },
  { 
   id: 2, 
   src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/2-l4gatMsuCh1slTHV3iGYszNGTlDxhx.jpg', 
   alt: 'Professional Photography Work 2' 
  },
  { 
   id: 3, 
   src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/3-TzPVHUjCuBAdIPAhFs8ZOeADYHWLKc.jpg', 
   alt: 'Professional Photography Work 3' 
  },
  { 
   id: 4, 
   src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/4-XoQ2KJrHwhwWFyCx1xhUsArWI6BuwB.jpg', 
   alt: 'Professional Photography Work 4' 
  },
  { 
   id: 5, 
   src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/5-hl4KhogTlAig2r6RUD0SCvrDL22c3i.jpg', 
   alt: 'Professional Photography Work 5' 
  },
  { 
   id: 6, 
   src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/6-lBfVjkw1GyFlaswiLfy0XVr7Y2iBjC.jpg', 
   alt: 'Professional Photography Work 6' 
  },
  { 
   id: 7, 
   src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/7-mJKwnJ1MV7rgCTVH2W7YH58O16jhJM.jpg', 
   alt: 'Professional Photography Work 7' 
  },
  { 
   id: 8, 
   src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/8-Zs2WBv7g88WxHD85HWhaQoWWExe7Xp.jpg', 
   alt: 'Professional Photography Work 8' 
  },
  { 
   id: 9, 
   src: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/9-HS8CW5NXVIyjfZI7IBnbIAamIM35If.jpg', 
   alt: 'Professional Photography Work 9' 
  }
 ], [])


 const planCardVariants = {
  rest: { 
   scale: 1, 
   rotateY: 0, 
   z: 0,
   boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  hover: { 
   scale: 1.05, 
   rotateY: 3, 
   z: 50,
   boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)"
  }
 }

 const photoServiceStructuredData = {
   "@context": "https://schema.org",
   "@type": "Service",
   "name": "写真撮影",
   "description": "料理写真や商品撮影などプロによる商業撮影",
   "provider": {
     "@type": "Organization",
     "name": "NonTurn合同会社",
     "url": "https://non-turn.com"
   },
   "areaServed": {
     "@type": "Place",
     "address": {
       "@type": "PostalAddress",
       "addressLocality": "横浜市西区",
       "addressRegion": "神奈川県"
     }
   },
   "url": "https://non-turn.com/services/photo"
 }

 return (
  <>
    <Script
      id="photo-service-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(photoServiceStructuredData),
      }}
    />
    <MainLayout>
   <div className="relative overflow-hidden">
    {/* Hero Section */}
    <HeroSection 
     title={serviceData.title}
     subtitle={serviceData.subtitle}
     description={serviceData.detailedDescription}
     icon={serviceData.icon}
     gradient="from-blue-400 via-purple-500 to-pink-500"
     backgroundOpacity={0.4}
    >
     <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
      <motion.button
       className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg uppercase tracking-wide sm:tracking-wider hover:from-purple-500 hover:to-pink-500 transition-all duration-300 relative overflow-hidden group rounded-xl sm:rounded-2xl w-full sm:w-auto"
       whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
       }}
       whileTap={{ scale: 0.95 }}
       onClick={() => setIsGalleryOpen(true)}
      >
       <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
        <span>作品ギャラリー</span>
        <motion.span
         animate={{ rotate: [0, 180, 360] }}
         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
         📸
        </motion.span>
       </span>
       <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl sm:rounded-2xl"></div>
      </motion.button>
      
      <Link href="/contact" className="w-full sm:w-auto">
       <motion.button
        className="bg-transparent border-2 border-blue-400 text-blue-400 px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg uppercase tracking-wide sm:tracking-wider hover:bg-blue-400 hover:text-white transition-all duration-300 rounded-xl sm:rounded-2xl w-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
       >
        撮影依頼
       </motion.button>
      </Link>
     </div>
    </HeroSection>

    {/* Photo Plans Section with 3D Cards */}
    <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
     <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
     
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.8 }}
       className="text-center mb-20"
      >
       <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
        撮影<span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">プラン</span>
       </h2>
       <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
        ニーズに合わせた2つのプロフェッショナル撮影プラン
       </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
       {serviceData.plans.map((plan, index) => (
        <motion.div
         key={index}
         initial="rest"
         whileHover="hover"
         animate={selectedPlan === index ? "hover" : "rest"}
         variants={planCardVariants}
         style={{ transformStyle: "preserve-3d" }}
         className="relative group cursor-pointer"
         onMouseEnter={() => setSelectedPlan(index)}
         onClick={() => setSelectedPlan(index)}
        >
         <motion.div
          className={`relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border backdrop-blur-xl transition-all duration-500 ${
           selectedPlan === index 
            ? 'bg-gradient-to-br from-blue-400/20 to-purple-500/20 border-blue-400/50 shadow-2xl' 
            : 'bg-gray-900/50 border-gray-700/50 hover:border-blue-400/30'
          }`}
          style={{ transform: "translateZ(25px)" }}
         >
          {/* Plan Icon and Price */}
          <div className="text-center mb-8">
           <motion.div
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl transition-all duration-500 ${
             selectedPlan === index 
              ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-lg' 
              : 'bg-gray-800 text-gray-400 group-hover:bg-blue-400/20 group-hover:text-blue-400'
            }`}
            whileHover={{ 
             scale: 1.2, 
             rotate: [0, -10, 10, 0],
             boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)"
            }}
            transition={{ duration: 0.6 }}
           >
            📸
           </motion.div>
           
           <motion.h3 
            className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
             selectedPlan === index ? 'text-blue-400' : 'text-white group-hover:text-blue-400'
            }`}
            animate={selectedPlan === index ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5 }}
           >
            {plan.name}
           </motion.h3>
           
           <motion.div 
            className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
             selectedPlan === index ? 'text-blue-400' : 'text-gray-300'
            }`}
            whileHover={{ scale: 1.1 }}
           >
            ¥{plan.basePrice.toLocaleString()}〜
           </motion.div>
           
           <p className="text-gray-400 text-sm">{plan.duration}</p>
          </div>
          
          <p className={`text-center mb-6 transition-colors duration-300 ${
           selectedPlan === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
          }`}>
           {plan.description}
          </p>
          
          {/* Includes List */}
          <div className="space-y-3 mb-8">
           <h4 className={`font-semibold transition-colors duration-300 ${
            selectedPlan === index ? 'text-blue-400' : 'text-gray-300'
           }`}>
            プランに含まれるもの:
           </h4>
           <ul className="space-y-2">
            {plan.includes.map((item, itemIndex) => (
             <motion.li
              key={itemIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: itemIndex * 0.1 }}
              className={`flex items-center text-sm transition-colors duration-300 ${
               selectedPlan === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
              }`}
             >
              <motion.span 
               className="w-2 h-2 bg-blue-400 rounded-full mr-3"
               animate={selectedPlan === index ? { scale: [1, 1.3, 1] } : {}}
               transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
              />
              {item}
             </motion.li>
            ))}
           </ul>
          </div>
          
          {/* Additional Hour Price */}
          <div className={`text-center p-4 rounded-lg border transition-all duration-300 ${
           selectedPlan === index 
            ? 'bg-blue-400/10 border-blue-400/30' 
            : 'bg-gray-800/50 border-gray-700/50'
          }`}>
           <p className="text-sm text-gray-400">追加1時間</p>
           <p className={`font-bold transition-colors duration-300 ${
            selectedPlan === index ? 'text-blue-400' : 'text-gray-300'
           }`}>
            ¥{plan.additionalHour.toLocaleString()}
           </p>
          </div>
          
          {/* Glowing Border Effect */}
          {selectedPlan === index && (
           <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-transparent to-purple-500/20 animate-pulse"></div>
          )}
         </motion.div>
        </motion.div>
       ))}
      </div>

      {/* Food Photography Link */}
      <motion.div
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5 }}
       className="mt-12 text-center bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-400/50 rounded-2xl p-10 hover:border-orange-400 transition-all duration-300"
      >
       <h3 className="text-2xl font-bold text-white mb-3">
        🍽️ 飲食店撮影PhotoStudio
       </h3>
       <p className="text-gray-200 mb-6 text-lg">
        飲食店専門のプロカメラマンによる料理・店舗撮影サービス
       </p>
       <p className="text-gray-300 mb-2">
        東京・横浜・千葉エリア出張無料 | 撮影実績500店舗以上
       </p>
       <Link href="/services/photo/foodphoto">
        <motion.button
         className="inline-flex items-center bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-500 hover:to-red-600 transition-all duration-300 mt-4"
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
        >
         飲食店撮影の詳細を見る
         <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
         </svg>
        </motion.button>
       </Link>
      </motion.div>
     </div>
    </section>

    {/* Process Timeline */}
    <section className="py-16 sm:py-24 md:py-32 bg-gray-900 relative">
     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.8 }}
       className="text-center mb-20"
      >
       <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
        撮影<span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">フロー</span>
       </h2>
       <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
        スピーディーで確実な3ステップ
       </p>
      </motion.div>

      {/* Mobile Layout - Compact Cards */}
      <div className="block md:hidden space-y-6">
       {serviceData.process.map((step, index) => (
        <motion.div
         key={step.step}
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5, delay: index * 0.1 }}
         className="relative"
        >
         <motion.div
          className="bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl hover:border-blue-400/50 transition-all duration-500 group"
          whileHover={{ scale: 1.02 }}
         >
          <div className="flex items-start gap-4">
           <motion.div
            className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
           >
            {step.icon || step.step}
           </motion.div>
           <div className="flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">
             {step.title}
            </h3>
            <p className="text-blue-400 font-semibold text-sm mb-2">{step.duration}</p>
            <p className="text-gray-300 text-sm mb-3">{step.description}</p>
            {step.price && <p className="text-yellow-400 font-semibold text-sm">{step.price}</p>}
           </div>
          </div>
         </motion.div>
         
         {/* Connecting Line (not on last item) */}
         {index < serviceData.process.length - 1 && (
          <div className="absolute left-7 top-20 h-6 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 opacity-50"></div>
         )}
        </motion.div>
       ))}
      </div>

      {/* Desktop Layout - Original Timeline */}
      <div className="hidden md:block relative">
       {/* Timeline Line */}
       <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 opacity-30"></div>
       
       {serviceData.process.map((step, index) => (
        <motion.div
         key={step.step}
         initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8, delay: index * 0.2 }}
         className={`relative flex items-center mb-16 ${
          index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
         }`}
        >
         {/* Content */}
         <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
          <motion.div
           className="bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-gray-700/50 p-8 rounded-2xl hover:border-blue-400/50 transition-all duration-500 group"
           whileHover={{ scale: 1.02, y: -5 }}
          >
           <div className="flex items-center mb-4">
            <motion.div
             className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4"
             whileHover={{ rotate: 360 }}
             transition={{ duration: 0.6 }}
            >
             {step.icon || step.step}
            </motion.div>
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
             {step.title}
            </h3>
           </div>
           
           <p className="text-blue-400 font-semibold mb-2">{step.duration}</p>
           <p className="text-gray-300 mb-4">{step.description}</p>
           {step.price && <p className="text-yellow-400 font-semibold">{step.price}</p>}
          </motion.div>
         </div>
         
         {/* Center Circle */}
         <motion.div
          className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-4 border-gray-900 absolute left-1/2 transform -translate-x-1/2 z-10 shadow-lg"
          whileHover={{ scale: 1.3 }}
          animate={{
           boxShadow: [
            "0 0 0 0 rgba(59, 130, 246, 0.7)",
            "0 0 0 15px rgba(59, 130, 246, 0)",
            "0 0 0 0 rgba(59, 130, 246, 0)"
           ]
          }}
          transition={{
           duration: 2,
           repeat: Infinity,
           delay: index * 0.5
          }}
         />
         
         {/* Empty Space */}
         <div className="w-5/12"></div>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    {/* Categories Showcase */}
    <section className="py-16 sm:py-24 md:py-32 bg-black relative overflow-hidden">
     <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-500/5"></div>
     
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.8 }}
       className="text-center mb-20"
      >
       <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
        撮影<span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">カテゴリー</span>
       </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
       {serviceData.categories.map((category, index) => (
        <motion.div
         key={index}
         initial={{ opacity: 0, y: 50, rotateY: -15 }}
         whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8, delay: index * 0.1 }}
         whileHover={{ 
          scale: 1.05, 
          rotateY: 5,
          boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)"
         }}
         style={{ transformStyle: "preserve-3d" }}
         className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/50 p-8 rounded-2xl hover:border-blue-400/50 transition-all duration-500 group"
         onMouseEnter={() => setSelectedCategory(index)}
        >
         <motion.div
          className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl group-hover:shadow-lg"
          whileHover={{ rotateX: 180 }}
          transition={{ duration: 0.6 }}
         >
          📷
         </motion.div>
         
         <h3 className="text-xl font-bold mb-4 text-white text-center group-hover:text-blue-400 transition-colors duration-300">
          {category.name}
         </h3>
         
         <p className="text-gray-400 text-center mb-6 group-hover:text-gray-300 transition-colors duration-300">
          {category.description}
         </p>
         
         <div className="space-y-2">
          {category.examples.map((example, exampleIndex) => (
           <motion.div
            key={exampleIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: exampleIndex * 0.1 }}
            className="text-sm text-blue-400 flex items-center"
           >
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
            {example}
           </motion.div>
          ))}
         </div>
         
         {selectedCategory === index && (
          <motion.div
           initial={{ scaleX: 0 }}
           animate={{ scaleX: 1 }}
           className="mt-6 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
          />
         )}
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    {/* Gallery Modal */}
    <AnimatePresence>
     {isGalleryOpen && (
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto"
      >
       <div className="min-h-screen p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8 sticky top-2 sm:top-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 z-10">
         <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          作品ギャラリー
         </h2>
         <button
          onClick={() => setIsGalleryOpen(false)}
          className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-white text-base sm:text-lg transition-colors"
         >
          ✕
         </button>
        </div>

        {/* Masonry Grid */}
        <div className="max-w-7xl mx-auto">
         <div 
          className="grid gap-3"
          style={{
           gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
           gridAutoRows: '8px'
          }}
         >
          {galleryImages.map((image, index) => {
           // 高さをランダムに設定してマソナリー効果を作る
           const heights = [300, 400, 350, 450, 320, 380, 420, 360, 400]
           const height = heights[index] || 350
           const gridRowEnd = Math.ceil(height / 10)
           
           return (
            <motion.div
             key={image.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: index * 0.1 }}
             whileHover={{ scale: 1.02 }}
             className="cursor-pointer group relative overflow-hidden rounded-lg"
             style={{ gridRowEnd: `span ${gridRowEnd}` }}
            >
             <div className="relative w-full" style={{ height: `${height}px` }}>
              <Image 
               src={image.src} 
               alt={image.alt}
               fill
               className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
               sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
             </div>
             
             {/* Overlay */}
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end">
              <div className="p-4 text-white">
               <p className="font-medium">作品 #{index + 1}</p>
              </div>
             </div>
            </motion.div>
           )
          })}
         </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 mt-8">
         <p className="text-gray-400 mb-4">
          撮影のご依頼はお気軽にお問い合わせください
         </p>
         <button
          onClick={() => {
           setIsGalleryOpen(false)
           setTimeout(() => {
            window.location.href = '/contact'
           }, 300)
          }}
          className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 mr-4"
         >
          撮影を依頼する
         </button>
         <button
          onClick={() => setIsGalleryOpen(false)}
          className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
         >
          閉じる
         </button>
        </div>
       </div>
      </motion.div>
     )}
    </AnimatePresence>
   </div>
  </MainLayout>
  </>
 )
}
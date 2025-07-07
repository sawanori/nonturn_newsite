'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { TypingAnimation } from '@/components/ui/TypingAnimation'

const navigation = [
 {
  name: 'ホーム',
  href: '/',
  hasSubmenu: false
 },
 {
  name: 'サービス',
  href: '/services',
  hasSubmenu: true,
  submenu: [
   { name: '映像制作', href: '/services/movie', description: '企業VP・採用動画' },
   { name: '写真撮影', href: '/services/photo', description: 'イベント・商品撮影' },
   { name: 'Web制作', href: '/services/web', description: 'サイト企画・制作' }
  ]
 },
 {
  name: '制作実績',
  href: '/portfolio',
  hasSubmenu: false
 },
 {
  name: '会社概要',
  href: '/about',
  hasSubmenu: false
 },
 {
  name: '料金',
  href: '/pricing',
  hasSubmenu: false
 },
]

export function Navigation() {
 const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

 return (
  <motion.nav 
   initial={{ y: -100 }}
   animate={{ y: 0 }}
   transition={{ delay: 0.2, duration: 0.8 }}
   className="fixed top-0 w-full bg-black/20 backdrop-blur-xl border-b border-yellow-400/20 z-50"
  >
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
     {/* Logo */}
     <motion.div 
      className="flex-shrink-0 "
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400 }}
     >
      <Link href="/" className="text-2xl font-bold text-yellow-400 tracking-wide font-mono">
       <span className="text-white">&lt;</span>
       <TypingAnimation 
        text="NonTurn" 
        delay={1000}
        duration={150}
        showCursor={false}
        className="eng-only"
       />
       <span className="text-white">/&gt;</span>
      </Link>
     </motion.div>

     {/* Desktop Navigation */}
     <div className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => (
       <div
        key={item.name}
        className="relative"
        onMouseEnter={() => item.hasSubmenu && setActiveSubmenu(item.name)}
        onMouseLeave={() => setActiveSubmenu(null)}
       >
        <Link
         href={item.href}
         className="text-gray-300 hover:text-yellow-400 font-medium text-sm uppercase tracking-wider transition-colors duration-300 relative group"
        >
         <motion.span
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
         >
          {item.name}
          {item.hasSubmenu && (
           <span className="ml-1 text-xs">▼</span>
          )}
         </motion.span>
         <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Submenu */}
        <AnimatePresence>
         {item.hasSubmenu && activeSubmenu === item.name && (
          <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 10 }}
           transition={{ duration: 0.2 }}
           className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-yellow-400/20 rounded-lg shadow-xl"
          >
           {item.submenu?.map((subItem) => (
            <Link
             key={subItem.name}
             href={subItem.href}
             className="block px-4 py-3 hover:bg-yellow-400/10 transition-colors duration-300 group"
            >
             <div className="text-white group-hover:text-yellow-400 font-medium">
              {subItem.name}
             </div>
             <div className="text-gray-400 text-sm">
              {subItem.description}
             </div>
            </Link>
           ))}
          </motion.div>
         )}
        </AnimatePresence>
       </div>
      ))}

      {/* Contact Button */}
      <motion.div
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
      >
       <Link
        href="/contact"
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-2 font-medium text-sm uppercase tracking-wider hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 relative overflow-hidden group"
       >
        <span className="relative z-10">お問い合わせ</span>
        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
       </Link>
      </motion.div>
     </div>

     {/* Mobile menu button */}
     <div className="md:hidden">
      <button
       onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
       className="text-white hover:text-yellow-400 transition-colors duration-300"
      >
       <span className="sr-only">メニューを開く</span>
       <div className="w-6 h-6 relative">
        <motion.span
         animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
         className="absolute h-0.5 w-6 bg-current transform transition-all duration-300 origin-center"
         style={{ top: '6px' }}
        />
        <motion.span
         animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
         className="absolute h-0.5 w-6 bg-current transform transition-all duration-300"
         style={{ top: '12px' }}
        />
        <motion.span
         animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
         className="absolute h-0.5 w-6 bg-current transform transition-all duration-300 origin-center"
         style={{ top: '18px' }}
        />
       </div>
      </button>
     </div>
    </div>
   </div>

   {/* Mobile menu */}
   <AnimatePresence>
    {isMobileMenuOpen && (
     <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden bg-black/95 backdrop-blur-xl border-t border-yellow-400/20"
     >
      <div className="px-4 py-6 space-y-4">
       {navigation.map((item) => (
        <div key={item.name}>
         <Link
          href={item.href}
          className="block text-white hover:text-yellow-400 font-medium text-lg transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
         >
          {item.name}
         </Link>
         {item.hasSubmenu && (
          <div className="ml-4 mt-2 space-y-2">
           {item.submenu?.map((subItem) => (
            <Link
             key={subItem.name}
             href={subItem.href}
             className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300"
             onClick={() => setIsMobileMenuOpen(false)}
            >
             {subItem.name}
            </Link>
           ))}
          </div>
         )}
        </div>
       ))}
      </div>
     </motion.div>
    )}
   </AnimatePresence>
  </motion.nav>
 )
}
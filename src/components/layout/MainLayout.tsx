'use client'

import { ReactNode } from 'react'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
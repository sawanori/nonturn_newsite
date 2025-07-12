import { Metadata } from 'next'
import HomeClient from './home-client'

export const metadata: Metadata = {
  title: '映像・写真・WEB制作ならNonTurn株式会社 | 東京・横浜',
  description: '企業VPや商品紹介映像、写真撮影、WEB制作をワンストップで提供するNonTurn株式会社。中小企業の魅力を引き出すクリエイティブをご提案します。',
}

export default function HomePage() {
  return <HomeClient />
}
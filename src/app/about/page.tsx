import { Metadata } from 'next'
import AboutClient from './about-client'

export const metadata: Metadata = {
  title: '会社概要 | 映像・WEB制作のNonTurn株式会社',
  description: 'NonTurn株式会社の企業理念や代表メッセージ、会社情報をご紹介。映像・写真・WEBの力でビジネスを支援します。',
}

export default function AboutPage() {
  return <AboutClient />
}
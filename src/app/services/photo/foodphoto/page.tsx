import { Metadata } from 'next'
import FoodPhotoClient from './FoodPhotoClient'
import Script from 'next/script'

export const metadata: Metadata = {
  title: '飲食店写真 Art Studio | プロフェッショナルフードフォトグラフィー',
  description: '飲食店写真 Art Studioは、アートの視点から料理を撮影するプロフェッショナルスタジオ。メニュー撮影、フードアート、店舗空間撮影まで、芸術的な表現でお店の魅力を引き出します。',
  keywords: '飲食店写真,Art Studio,フードフォトグラフィー,アート撮影,料理写真,メニュー撮影,フードアート,レストラン撮影,カフェ撮影,プロカメラマン',
  openGraph: {
    title: '飲食店写真 Art Studio | プロフェッショナルフードフォトグラフィー',
    description: 'アートの視点から料理を撮影するプロフェッショナルスタジオ。芸術的な表現でお店の魅力を最大化。',
    url: 'https://non-turn.com/services/photo/foodphoto',
    siteName: 'NonTurn.LLC',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://non-turn.com/ogp/foodphoto.jpg',
        width: 1200,
        height: 630,
        alt: '飲食店写真 Art Studio - プロフェッショナルフードフォトグラフィー',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '飲食店写真 Art Studio | プロフェッショナルフードフォトグラフィー',
    description: 'アートの視点から料理を撮影。全国対応、年間5,000件の実績。',
    images: ['https://non-turn.com/ogp/foodphoto.jpg'],
  },
  alternates: {
    canonical: '/services/photo/foodphoto',
  },
}

export default function FoodPhotoPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "飲食店写真 Art Studio",
    "description": "プロフェッショナルフードフォトグラフィースタジオ。アートの視点から料理を撮影し、お店の魅力を最大限に引き出します。",
    "provider": {
      "@type": "Organization",
      "name": "NonTurn合同会社",
      "url": "https://non-turn.com"
    },
    "serviceType": "フードフォトグラフィー・アート撮影サービス",
    "areaServed": {
      "@type": "Country",
      "name": "日本"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "料金プラン",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "お試しプラン",
          "price": "33000",
          "priceCurrency": "JPY",
          "description": "1時間撮影、3-5カット"
        },
        {
          "@type": "Offer",
          "name": "お手軽プラン",
          "price": "44000",
          "priceCurrency": "JPY",
          "description": "2時間撮影、5-10カット"
        },
        {
          "@type": "Offer",
          "name": "充実プラン",
          "price": "55000",
          "priceCurrency": "JPY",
          "description": "3時間撮影、15-20カット"
        },
        {
          "@type": "Offer",
          "name": "たっぷりプラン",
          "price": "66000",
          "priceCurrency": "JPY",
          "description": "4時間撮影、25-30カット"
        }
      ]
    }
  }

  return (
    <>
      <Script
        id="foodphoto-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <FoodPhotoClient />
    </>
  )
}
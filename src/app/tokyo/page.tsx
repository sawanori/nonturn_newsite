import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/ui/HeroSection'
import { Metadata } from 'next'
import { TokyoClient } from './TokyoClient'
import Script from 'next/script'

export const metadata: Metadata = {
  title: "渋谷区 新宿区 港区 縦型動画制作 | 東京全域対応 | NonTurn.LLC",
  description: "渋谷区・新宿区・港区・千代田区で縦型動画制作。世田谷区・目黒区・品川区・大田区の企業SNS動画も対応。中央区・文京区・台東区・墨田区・江東区のInstagram Reels制作。豊島区・中野区・杉並区・練馬区のTikTok動画。北区・荒川区・板橋区・足立区・葛飾区・江戸川区のYouTube Shortsも専門制作。",
  keywords: "縦型動画,東京,千代田区 縦型動画,中央区 縦型動画,港区 縦型動画,新宿区 縦型動画,文京区 縦型動画,台東区 縦型動画,墨田区 縦型動画,江東区 縦型動画,品川区 縦型動画,目黒区 縦型動画,大田区 縦型動画,世田谷区 縦型動画,渋谷区 縦型動画,中野区 縦型動画,杉並区 縦型動画,豊島区 縦型動画,北区 縦型動画,荒川区 縦型動画,板橋区 縦型動画,練馬区 縦型動画,足立区 縦型動画,葛飾区 縦型動画,江戸川区 縦型動画,東京23区,動画制作,映像制作,TikTok,Instagram,Reels,YouTubeShorts,SNS動画,スマホ動画,企業PR,商品紹介",
  openGraph: {
    title: "東京23区 縦型動画制作 | 全区対応のプロフェッショナル映像制作",
    description: "東京23区全域で縦型動画制作。千代田区から江戸川区まで全区対応。Instagram Reels・TikTok・YouTube Shorts最適化の縦型動画をプロが制作。",
  },
  alternates: {
    canonical: "/tokyo",
  },
}

export default function TokyoPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoProductionService",
    "name": "NonTurn.LLC 東京23区縦型動画制作",
    "description": "東京23区全域で縦型動画制作サービスを提供。Instagram Reels、TikTok、YouTube Shorts向けの縦型動画専門。",
    "areaServed": [
      "千代田区", "中央区", "港区", "新宿区", "文京区", "台東区", "墨田区", "江東区",
      "品川区", "目黒区", "大田区", "世田谷区", "渋谷区", "中野区", "杉並区", "豊島区",
      "北区", "荒川区", "板橋区", "練馬区", "足立区", "葛飾区", "江戸川区"
    ],
    "serviceType": ["縦型動画制作", "Instagram Reels制作", "TikTok動画制作", "YouTube Shorts制作"],
    "provider": {
      "@type": "Organization",
      "name": "NonTurn.LLC",
      "url": "https://non-turn.com",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "東京都",
        "addressCountry": "JP"
      }
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "JPY",
      "lowPrice": "48000",
      "highPrice": "200000",
      "offerCount": "3"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "東京23区縦型動画制作サービス",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "東京23区縦型動画制作パッケージ",
          "price": "48000",
          "priceCurrency": "JPY",
          "description": "Instagram Reels・TikTok・YouTube Shorts特化"
        },
        {
          "@type": "Offer",
          "name": "東京企業縦型動画PRプラン",
          "price": "120000",
          "priceCurrency": "JPY",
          "description": "企業ブランドを縦型動画で発信"
        },
        {
          "@type": "Offer",
          "name": "東京店舗縦型動画制作",
          "price": "80000",
          "priceCurrency": "JPY",
          "description": "店舗集客用縦型動画制作"
        }
      ]
    }
  }

  return (
    <>
      <Script
        id="tokyo-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <MainLayout>
        <HeroSection
          title="渋谷区 新宿区 港区 縦型動画制作"
          subtitle="東京全域対応・最速24時間納品"
          description="渋谷区・新宿区・港区・千代田区・中央区・文京区・台東区・墨田区・江東区・品川区・目黒区・大田区・世田谷区・中野区・杉並区・豊島区・北区・荒川区・板橋区・練馬区・足立区・葛飾区・江戸川区で縦型動画制作。Instagram Reels・TikTok・YouTube Shorts専門。"
          icon="📱"
          gradient="from-red-400 via-pink-500 to-purple-600"
          backgroundOpacity={0.4}
        >
          <TokyoClient isHeroButtons={true} />
        </HeroSection>
        <TokyoClient />
      </MainLayout>
    </>
  )
}
import FoodPhotoClient from './FoodPhotoClient'
import Script from 'next/script'
export { metadata } from './metadata'

export default function FoodPhotoPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "飲食店撮影PhotoStudio",
    "description": "飲食店専門の撮影サービス。料理写真、店舗内観・外観撮影まで対応。東京・横浜・千葉エリア出張無料。日本フードフォトグラファー協会認定カメラマン。",
    "provider": {
      "@type": "Organization",
      "name": "NonTurn合同会社",
      "url": "https://foodphoto-pro.com"
    },
    "serviceType": "飲食店撮影・料理撮影・メニュー撮影サービス",
    "areaServed": [
      {
        "@type": "City",
        "name": "東京"
      },
      {
        "@type": "City",
        "name": "横浜"
      },
      {
        "@type": "City",
        "name": "千葉"
      }
    ],
    "priceRange": "¥33,000 - ¥88,000",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "飲食店撮影料金プラン",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "ライトプラン",
          "price": "33000",
          "priceCurrency": "JPY",
          "description": "1時間撮影、3-5カット納品、飲食店撮影入門プラン"
        },
        {
          "@type": "Offer",
          "name": "スタンダードプラン",
          "price": "44000",
          "priceCurrency": "JPY",
          "description": "2時間撮影、10-15カット納品目安、飲食店撮影人気プラン"
        },
        {
          "@type": "Offer",
          "name": "プレミアムプラン",
          "price": "88000",
          "priceCurrency": "JPY",
          "description": "4時間撮影、30-40カット納品目安、飲食店撮影充実プラン"
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
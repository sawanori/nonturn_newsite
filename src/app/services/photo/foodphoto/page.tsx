import FoodPhotoClient from './FoodPhotoClient'
import Script from 'next/script'
export { metadata } from './metadata'

export default function FoodPhotoPage() {
  const serviceStructuredData = {
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

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": "https://foodphoto-pro.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "サービス",
        "item": "https://foodphoto-pro.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "飲食店撮影PhotoStudio",
        "item": "https://foodphoto-pro.com/services/photo/foodphoto"
      }
    ]
  }

  const imageGalleryStructuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "飲食店撮影PhotoStudio ポートフォリオ",
    "description": "プロカメラマンによる飲食店撮影・料理撮影サービスの実例集",
    "creator": {
      "@type": "Organization",
      "name": "NonTurn合同会社"
    },
    "image": [
      {
        "@type": "ImageObject",
        "name": "飲食店撮影 料理写真サンプル1",
        "description": "プロカメラマンによる料理撮影事例 - 前菜・メインディッシュ",
        "contentUrl": "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%201.jpg",
        "uploadDate": "2025-01-20",
        "creator": { "@type": "Organization", "name": "NonTurn合同会社" }
      },
      {
        "@type": "ImageObject",
        "name": "飲食店撮影 料理写真サンプル2",
        "description": "プロカメラマンによる料理撮影事例 - デザート・スイーツ",
        "contentUrl": "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%203.jpg",
        "uploadDate": "2025-01-20",
        "creator": { "@type": "Organization", "name": "NonTurn合同会社" }
      },
      {
        "@type": "ImageObject",
        "name": "飲食店撮影 店内写真サンプル",
        "description": "プロカメラマンによる店舗内観撮影事例 - レストラン・カフェ",
        "contentUrl": "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_room_%201.jpg",
        "uploadDate": "2025-01-20",
        "creator": { "@type": "Organization", "name": "NonTurn合同会社" }
      },
      {
        "@type": "ImageObject",
        "name": "飲食店撮影 店舗外観写真サンプル",
        "description": "プロカメラマンによる店舗外観撮影事例",
        "contentUrl": "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_out_.png",
        "uploadDate": "2025-01-20",
        "creator": { "@type": "Organization", "name": "NonTurn合同会社" }
      },
      {
        "@type": "ImageObject",
        "name": "飲食店撮影 和食料理写真",
        "description": "プロカメラマンによる和食撮影事例 - 寿司・刺身・会席料理",
        "contentUrl": "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%204.jpg",
        "uploadDate": "2025-01-20",
        "creator": { "@type": "Organization", "name": "NonTurn合同会社" }
      },
      {
        "@type": "ImageObject",
        "name": "飲食店撮影 洋食料理写真",
        "description": "プロカメラマンによる洋食撮影事例 - イタリアン・フレンチ",
        "contentUrl": "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%207.jpg",
        "uploadDate": "2025-01-20",
        "creator": { "@type": "Organization", "name": "NonTurn合同会社" }
      }
    ]
  }

  return (
    <>
      <Script
        id="foodphoto-service-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />
      <Script
        id="foodphoto-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="foodphoto-image-gallery-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(imageGalleryStructuredData),
        }}
      />
      <FoodPhotoClient />
    </>
  )
}
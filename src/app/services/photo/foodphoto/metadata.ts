import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "飲食店撮影 | プロカメラマンによる料理・店舗撮影 - PhotoStudio",
  description: "飲食店専門の撮影サービス。料理写真、店舗内観・外観撮影まで対応。東京・横浜・千葉エリア出張無料。日本フードフォトグラファー協会認定カメラマン。撮影実績500店舗以上。月額費用なし、撮影料金33,000円〜",
  keywords: "飲食店撮影,料理撮影,メニュー撮影,店舗撮影,フードフォト,レストラン撮影,飲食店写真,料理写真,出張撮影,東京,横浜,千葉",
  openGraph: {
    title: "飲食店撮影PhotoStudio | プロによる料理・店舗撮影サービス",
    description: "飲食店専門の撮影サービス。料理写真から店舗撮影まで、集客に繋がる写真を提供。東京・横浜・千葉エリア出張無料。",
    url: "https://foodphoto-pro.com/",
    siteName: "飲食店撮影PhotoStudio",
    images: [
      {
        url: "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2024.jpg",
        width: 1200,
        height: 630,
        alt: "飲食店撮影PhotoStudioのサービスイメージ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "飲食店撮影PhotoStudio | プロによる料理・店舗撮影",
    description: "飲食店専門の撮影サービス。東京・横浜・千葉エリア出張無料。撮影料金33,000円〜",
    images: ["https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2024.jpg"],
  },
  alternates: {
    canonical: "https://foodphoto-pro.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  other: {
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};
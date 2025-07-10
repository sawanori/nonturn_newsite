import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_JP } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NonTurn.LLC | 東京・横浜の企業向け動画制作 | 縦型動画・プロモーション映像制作",
    template: "%s | NonTurn.LLC | 東京・横浜の企業向け動画制作"
  },
  description: "東京・横浜エリアで企業向け動画制作・映像制作を提供。縦型動画、プロモーション映像、商品紹介動画など幅広く対応。法人様向けのプロフェッショナルな動画制作なら NonTurn.LLC にお任せください。",
  keywords: "動画制作,映像制作,企業,東京,横浜,縦型動画,プロモーション,法人,商品紹介,会社紹介,イベント撮影,Web制作,みなとみらい,高品質,プロフェッショナル",
  authors: [{ name: "NonTurn.LLC", url: "https://non-turn.com" }],
  creator: "NonTurn.LLC",
  publisher: "NonTurn.LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://non-turn.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NonTurn.LLC | 東京・横浜の企業向け動画制作 | 縦型動画制作のプロフェッショナル",
    description: "東京・横浜エリアで企業向け動画制作を提供。縦型動画、プロモーション映像制作のプロフェッショナル集団。",
    url: "https://non-turn.com",
    siteName: "NonTurn.LLC",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NonTurn.LLC - 東京・横浜の企業向け動画制作",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NonTurn.LLC | 東京・横浜の企業向け動画制作",
    description: "東京・横浜エリアで企業向け動画制作を提供。縦型動画制作のプロフェッショナル。",
    creator: "@NonTurn_S",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "google-verification-code",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://non-turn.com/#organization",
      name: "NonTurn.LLC",
      alternateName: "ノンターン",
      url: "https://non-turn.com",
      logo: {
        "@type": "ImageObject",
        url: "https://non-turn.com/logo.png",
        width: 300,
        height: 100,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "",
        contactType: "customer service",
        areaServed: ["JP"],
        availableLanguage: "Japanese",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "みなとみらい3-7-1 オーシャンゲートみなとみらい8F",
        addressLocality: "横浜市西区",
        addressRegion: "神奈川県",
        postalCode: "220-0012",
        addressCountry: "JP",
      },
      areaServed: [
        {
          "@type": "Place",
          name: "東京都",
        },
        {
          "@type": "Place", 
          name: "神奈川県",
        },
        {
          "@type": "Place",
          name: "横浜市",
        },
      ],
      sameAs: [
        "https://instagram.com/nonturn2022",
        "https://twitter.com/NonTurn_S",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://non-turn.com/#localbusiness",
      name: "NonTurn.LLC",
      description: "東京・横浜エリアで企業向け動画制作・映像制作を提供する映像制作会社",
      url: "https://non-turn.com",
      telephone: "",
      email: "n.sawada@non-turn.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "みなとみらい3-7-1 オーシャンゲートみなとみらい8F",
        addressLocality: "横浜市西区",
        addressRegion: "神奈川県",
        postalCode: "220-0012",
        addressCountry: "JP",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 35.4589,
        longitude: 139.6317,
      },
      openingHours: "Mo-Fr 09:00-18:00",
      priceRange: "¥¥",
      serviceArea: [
        {
          "@type": "Place",
          name: "東京都",
        },
        {
          "@type": "Place",
          name: "神奈川県",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://non-turn.com/#website",
      url: "https://non-turn.com",
      name: "NonTurn.LLC | 東京・横浜の企業向け動画制作",
      description: "東京・横浜エリアで企業向け動画制作を提供",
      publisher: {
        "@id": "https://non-turn.com/#organization",
      },
      inLanguage: "ja-JP",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="canonical" href="https://non-turn.com" />
        <meta name="geo.region" content="JP-14" />
        <meta name="geo.placename" content="東京,横浜" />
        <meta name="geo.position" content="35.4589;139.6317" />
        <meta name="ICBM" content="35.4589, 139.6317" />
        <GoogleTagManager />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifJP.variable} antialiased`}
      >
        <GoogleTagManagerNoscript />
        {children}
      </body>
    </html>
  );
}

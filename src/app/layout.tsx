import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_JP } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import { ClientProviders } from "@/components/ClientProviders";
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
  weight: ["400", "600"], // Reduce weight variations
  display: "swap",
  preload: false, // Lazy load to reduce initial bundle
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
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" }
    ]
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
      name: "NonTurn合同会社",
      alternateName: "NonTurn.LLC",
      url: "https://non-turn.com",
      logo: {
        "@type": "ImageObject",
        url: "https://non-turn.com/ogp/default.jpg",
        width: 1200,
        height: 630,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+81-45-900-8652",
        contactType: "customer service",
        areaServed: ["JP"],
        availableLanguage: ["Japanese"],
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
      name: "NonTurn合同会社",
      description: "東京・横浜エリアで企業向け動画制作・映像制作を提供する映像制作会社",
      url: "https://non-turn.com",
      telephone: "+81-45-900-8652",
      email: "info@non-turn.com",
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
      name: "NonTurn",
      description: "東京・横浜エリアで企業向け動画制作を提供",
      publisher: {
        "@id": "https://non-turn.com/#organization",
      },
      inLanguage: "ja-JP",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://non-turn.com/?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const host = h.get("host")?.toLowerCase() || "";
  const isFoodPhoto = host === "foodphoto-pro.com" || host.endsWith(".foodphoto-pro.com");
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const siteUrl = isFoodPhoto ? "https://foodphoto-pro.com" : "https://non-turn.com";

  return (
    <html lang="ja">
      <head>
        <meta httpEquiv="content-language" content="ja" />
        <link rel="alternate" hrefLang="ja" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <meta name="geo.region" content="JP-14" />
        <meta name="geo.placename" content="東京,横浜" />
        <meta name="geo.position" content="35.4589;139.6317" />
        <meta name="ICBM" content="35.4589, 139.6317" />
        {isFoodPhoto && GTM_ID ? (
          <Script
            id="gtm-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        ) : (
          <GoogleTagManager />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifJP.variable} antialiased`}
      >
        {isFoodPhoto && GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : (
          <GoogleTagManagerNoscript />
        )}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}

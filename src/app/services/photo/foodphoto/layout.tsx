import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "飲食店撮影PhotoStudio",
    template: "%s | 飲食店撮影PhotoStudio"
  },
  description: "プロのカメラマンによる飲食店専門の撮影サービス。料理写真、店舗撮影、メニュー撮影まで対応。集客力を高める写真撮影ならお任せください。",
};

export default function FoodPhotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  
  return (
    <>
      {/* GTM Script in Head */}
      {GTM_ID && (
        <Script
          id="gtm-foodphoto"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
            `.trim(),
          }}
        />
      )}
      
      {/* GTM noscript immediately after body start */}
      {GTM_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}
      
      {children}
    </>
  );
}
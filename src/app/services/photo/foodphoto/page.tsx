import FoodPhotoClient from './FoodPhotoClient'
import Script from 'next/script'
import { getAllStructuredData } from './structured-data'
export { metadata, viewport } from './metadata'

export default function FoodPhotoPage() {
  const structuredData = getAllStructuredData()

  return (
    <>
      {/* Resource Hints for Performance Optimization */}
      <link rel="dns-prefetch" href="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com" />
      <link rel="preconnect" href="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
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
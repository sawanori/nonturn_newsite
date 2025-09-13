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
      
      {/* Preload critical hero images for faster LCP */}
      <link 
        rel="preload" 
        as="image" 
        href="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%209.jpg"
        imageSrcSet="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%209.jpg 640w, https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%209.jpg 1024w"
        media="(max-width: 1023px)"
      />
      <link 
        rel="preload" 
        as="image" 
        href="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2024.jpg"
        imageSrcSet="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2024.jpg 1920w"
        media="(min-width: 1024px)"
      />
      
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
import FoodPhotoClient from './FoodPhotoClient'
import Script from 'next/script'
import { getAllStructuredData } from './structured-data'
export { metadata } from './metadata'

export default function FoodPhotoPage() {
  const structuredData = getAllStructuredData()

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
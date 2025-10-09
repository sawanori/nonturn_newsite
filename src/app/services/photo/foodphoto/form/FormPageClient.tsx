'use client'

import { FoodPhotoFormClient } from './FoodPhotoFormClient'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { useEffect, useState } from 'react'

export default function FormPageClient() {
  const [backHref, setBackHref] = useState('/services/photo/foodphoto')

  useEffect(() => {
    // Detect domain and set appropriate back link
    const isFoodPhotoDomain = window.location.hostname.includes('foodphoto-pro.com')
    setBackHref(isFoodPhotoDomain ? '/' : '/services/photo/foodphoto')
  }, [])

  return (
    <>
      <Breadcrumb
        items={[
          { label: '飲食店撮影PhotoStudio', href: backHref },
          { label: 'お問い合わせ・お見積もり' }
        ]}
      />
      <FoodPhotoFormClient />
    </>
  )
}
'use client'

import { FoodPhotoFormClient } from './FoodPhotoFormClient'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function FormPageClient() {
  return (
    <>
      <Breadcrumb 
        items={[
          { label: '飲食店撮影PhotoStudio', href: '/services/photo/foodphoto' },
          { label: 'お問い合わせ・お見積もり' }
        ]}
      />
      <FoodPhotoFormClient />
    </>
  )
}
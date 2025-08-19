'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { formSchema, ORDER_TYPES, calcTotalJPY } from '@/lib/foodOrderSchema'
import type { FoodOrder } from '@/lib/foodOrderSchema'

// Prefecture list
const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
]

// Store prefecture list (limited to service area)
const STORE_PREFECTURES = [
  '東京都', '神奈川県', '千葉県'
]

export function FoodPhotoFormClient() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)
  
  // Form state
  const [formData, setFormData] = useState<Partial<FoodOrder>>({
    applicantType: 'individual',
    plan: 'standard',
    extraMinutes: '0',
    billingTo: 'applicant',
    store: {
      name: '',
      address: { postal: '', prefecture: '', city: '', address1: '' },
      phone: '',
      managerName: '',
      managerKana: '',
      coordinator: 'applicant',
      attendees: ['applicant']
    },
    cuts: { food: 0, interior: 0, exterior: 0, people: 0 },
    media: {},
    agree: false
  })

  // Calculate total price
  const { total, breakdown } = calcTotalJPY(formData as FoodOrder)

  // Handle form field updates
  const updateField = (path: string, value: any) => {
    setFormData(prev => {
      const keys = path.split('.')
      const newData = { ...prev }
      let current: any = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    try {
      const validatedData = formSchema.parse(formData)
      
      setIsSubmitting(true)
      setSubmitResult(null)
      
      const response = await fetch('/api/foodphoto-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      })
      
      const result = await response.json()
      
      if (result.ok) {
        setSubmitResult({ success: true, message: 'お申し込みを受け付けました。確認メールをお送りしました。' })
        // Reset form
        setTimeout(() => {
          window.location.href = '/services/photo/foodphoto'
        }, 3000)
      } else {
        setSubmitResult({ success: false, message: result.message || '送信に失敗しました' })
      }
    } catch (error: any) {
      console.error('Validation error:', error)
      const message = error.issues?.[0]?.message || '入力内容をご確認ください'
      setSubmitResult({ success: false, message })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Validation for each step
  const validateStep1 = () => {
    if (!formData.applicantName || !formData.applicantKana || 
        !formData.applicantAddress?.postal || !formData.applicantAddress?.prefecture ||
        !formData.applicantAddress?.city || !formData.applicantAddress?.address1 ||
        !formData.applicantPhone || !formData.applicantEmail) {
      return false;
    }
    if (formData.applicantType === 'corporate') {
      if (!formData.corporate?.contactName || !formData.corporate?.contactKana || 
          !formData.corporate?.relation) {
        return false;
      }
    }
    return true;
  }

  const validateStep2 = () => {
    if (!formData.store?.name || !formData.store?.address?.postal ||
        !formData.store?.address?.prefecture || !formData.store?.address?.city ||
        !formData.store?.address?.address1 || !formData.store?.phone ||
        !formData.store?.managerName || !formData.store?.managerKana ||
        !formData.store?.coordinator || formData.store?.attendees?.length === 0) {
      return false;
    }
    return true;
  }

  const validateStep4 = () => {
    if (!formData.wish1?.date || !formData.wish1?.time ||
        !formData.wish2?.date || !formData.wish2?.time ||
        !formData.wish3?.date || !formData.wish3?.time) {
      return false;
    }
    if (!formData.media?.web && !formData.media?.print && !formData.media?.signage) {
      return false;
    }
    return true;
  }

  // Step navigation
  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1 && !validateStep1()) {
      alert('すべての必須項目を入力してください');
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      alert('すべての必須項目を入力してください');
      return;
    }
    if (currentStep === 4 && !validateStep4()) {
      alert('希望撮影日時（第1〜第3希望）と画像利用媒体は必須です');
      return;
    }
    
    if (currentStep < 6) setCurrentStep(currentStep + 1)
  }
  
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const steps = [
    { number: 1, title: '申込者情報' },
    { number: 2, title: '店舗情報' },
    { number: 3, title: 'プラン選択' },
    { number: 4, title: '撮影希望' },
    { number: 5, title: '請求先' },
    { number: 6, title: '確認' }
  ]

  return (
    <div className="min-h-screen bg-[rgb(36,35,35)]">
      {/* Header */}
      <div className="bg-[rgb(77,76,76)] border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/services/photo/foodphoto" className="inline-flex items-center text-gray-300 hover:text-white mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            戻る
          </Link>
          <h1 className="text-2xl font-bold text-white">飲食店撮影PhotoStudio 撮影お申し込み</h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-[rgb(77,76,76)] px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.number} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step.number
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-600 text-gray-400'
                    }`}
                  >
                    {step.number}
                  </div>
                  {step.number < 6 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > step.number ? 'bg-orange-500' : 'bg-gray-600'
                      }`}
                    />
                  )}
                </div>
                <p className="text-xs text-gray-300 mt-2">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Applicant Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">申込者情報</h2>
                
                {/* Applicant Type */}
                <div>
                  <label className="block text-gray-300 mb-2">申込区分 *</label>
                  <div className="flex gap-4">
                    {ORDER_TYPES.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="applicantType"
                          value={type}
                          checked={formData.applicantType === type}
                          onChange={(e) => updateField('applicantType', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-white">{type === 'individual' ? '個人' : '法人'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Applicant Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">申込者名 *</label>
                    <input
                      type="text"
                      value={formData.applicantName || ''}
                      onChange={(e) => updateField('applicantName', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      placeholder={formData.applicantType === 'corporate' ? '株式会社〇〇' : '山田太郎'}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">フリガナ *</label>
                    <input
                      type="text"
                      value={formData.applicantKana || ''}
                      onChange={(e) => updateField('applicantKana', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      placeholder={formData.applicantType === 'corporate' ? 'カブシキガイシャ〇〇' : 'ヤマダタロウ'}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-300 mb-2">住所</label>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        value={formData.applicantAddress?.postal || ''}
                        onChange={(e) => updateField('applicantAddress.postal', e.target.value)}
                        className="w-full md:w-48 px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        placeholder="〒123-4567"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <select
                        value={formData.applicantAddress?.prefecture || ''}
                        onChange={(e) => updateField('applicantAddress.prefecture', e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      >
                        <option value="">都道府県を選択</option>
                        {PREFECTURES.map(pref => (
                          <option key={pref} value={pref}>{pref}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={formData.applicantAddress?.city || ''}
                        onChange={(e) => updateField('applicantAddress.city', e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        placeholder="市区町村"
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.applicantAddress?.address1 || ''}
                      onChange={(e) => updateField('applicantAddress.address1', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      placeholder="番地・建物名"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">電話番号 *</label>
                    <input
                      type="tel"
                      value={formData.applicantPhone || ''}
                      onChange={(e) => updateField('applicantPhone', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      placeholder="090-1234-5678"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">メールアドレス *</label>
                    <input
                      type="email"
                      value={formData.applicantEmail || ''}
                      onChange={(e) => updateField('applicantEmail', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                {/* Corporate Contact (if corporate) */}
                {formData.applicantType === 'corporate' && (
                  <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">法人担当者情報</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2">担当者名 *</label>
                        <input
                          type="text"
                          value={formData.corporate?.contactName || ''}
                          onChange={(e) => updateField('corporate.contactName', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                          placeholder="山田太郎"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">フリガナ *</label>
                        <input
                          type="text"
                          value={formData.corporate?.contactKana || ''}
                          onChange={(e) => updateField('corporate.contactKana', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                          placeholder="ヤマダタロウ"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-300 mb-2">店舗との関係 *</label>
                      <input
                        type="text"
                        value={formData.corporate?.relation || ''}
                        onChange={(e) => updateField('corporate.relation', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        placeholder="広報担当、マーケティング部など"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Store Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">撮影店舗情報</h2>
                
                {/* Store Name */}
                <div>
                  <label className="block text-gray-300 mb-2">店舗名 *</label>
                  <input
                    type="text"
                    value={formData.store?.name || ''}
                    onChange={(e) => updateField('store.name', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                    placeholder="レストラン〇〇"
                  />
                </div>

                {/* Store Address */}
                <div>
                  <label className="block text-gray-300 mb-2">店舗住所 *</label>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        value={formData.store?.address?.postal || ''}
                        onChange={(e) => updateField('store.address.postal', e.target.value)}
                        className="w-full md:w-48 px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        placeholder="〒123-4567"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <select
                        value={formData.store?.address?.prefecture || ''}
                        onChange={(e) => updateField('store.address.prefecture', e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      >
                        <option value="">都道府県を選択</option>
                        {STORE_PREFECTURES.map(pref => (
                          <option key={pref} value={pref}>{pref}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={formData.store?.address?.city || ''}
                        onChange={(e) => updateField('store.address.city', e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        placeholder="市区町村"
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.store?.address?.address1 || ''}
                      onChange={(e) => updateField('store.address.address1', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      placeholder="番地・建物名"
                    />
                  </div>
                </div>

                {/* Store Contact */}
                <div>
                  <label className="block text-gray-300 mb-2">店舗電話番号 *</label>
                  <input
                    type="tel"
                    value={formData.store?.phone || ''}
                    onChange={(e) => updateField('store.phone', e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                    placeholder="03-1234-5678"
                  />
                </div>

                {/* Store Manager */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">店舗責任者名 *</label>
                    <input
                      type="text"
                      value={formData.store?.managerName || ''}
                      onChange={(e) => updateField('store.managerName', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      placeholder="鈴木花子"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">フリガナ *</label>
                    <input
                      type="text"
                      value={formData.store?.managerKana || ''}
                      onChange={(e) => updateField('store.managerKana', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      placeholder="スズキハナコ"
                    />
                  </div>
                </div>

                {/* Coordinator */}
                <div>
                  <label className="block text-gray-300 mb-2">撮影日調整窓口 *</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="coordinator"
                        value="applicant"
                        checked={formData.store?.coordinator === 'applicant'}
                        onChange={(e) => updateField('store.coordinator', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-white">申込者</span>
                    </label>
                    {formData.applicantType === 'corporate' && (
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="coordinator"
                          value="corporateContact"
                          checked={formData.store?.coordinator === 'corporateContact'}
                          onChange={(e) => updateField('store.coordinator', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-white">法人担当者</span>
                      </label>
                    )}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="coordinator"
                        value="storeManager"
                        checked={formData.store?.coordinator === 'storeManager'}
                        onChange={(e) => updateField('store.coordinator', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-white">店舗責任者</span>
                    </label>
                  </div>
                </div>

                {/* Attendees */}
                <div>
                  <label className="block text-gray-300 mb-2">撮影同席者 * (複数選択可)</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="applicant"
                        checked={formData.store?.attendees?.includes('applicant')}
                        onChange={(e) => {
                          const attendees = formData.store?.attendees || []
                          if (e.target.checked) {
                            updateField('store.attendees', [...attendees, 'applicant'])
                          } else {
                            updateField('store.attendees', attendees.filter(a => a !== 'applicant'))
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-white">申込者</span>
                    </label>
                    {formData.applicantType === 'corporate' && (
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="corporateContact"
                          checked={formData.store?.attendees?.includes('corporateContact')}
                          onChange={(e) => {
                            const attendees = formData.store?.attendees || []
                            if (e.target.checked) {
                              updateField('store.attendees', [...attendees, 'corporateContact'])
                            } else {
                              updateField('store.attendees', attendees.filter(a => a !== 'corporateContact'))
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-white">法人担当者</span>
                      </label>
                    )}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="storeManager"
                        checked={formData.store?.attendees?.includes('storeManager')}
                        onChange={(e) => {
                          const attendees = formData.store?.attendees || []
                          if (e.target.checked) {
                            updateField('store.attendees', [...attendees, 'storeManager'])
                          } else {
                            updateField('store.attendees', attendees.filter(a => a !== 'storeManager'))
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-white">店舗責任者</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Plan Selection */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">プラン・オプション選択</h2>
                
                {/* Plan Selection */}
                <div>
                  <label className="block text-gray-300 mb-4">撮影プラン *</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.plan === 'light'
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => updateField('plan', 'light')}
                    >
                      <h3 className="text-white font-semibold mb-2">ライトプラン</h3>
                      <p className="text-2xl font-bold text-orange-400 mb-2">¥33,000</p>
                      <p className="text-gray-300 text-sm">1時間撮影</p>
                      <p className="text-gray-300 text-sm">3-5カット納品</p>
                    </div>
                    
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.plan === 'standard'
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => updateField('plan', 'standard')}
                    >
                      <h3 className="text-white font-semibold mb-2">スタンダードプラン</h3>
                      <p className="text-2xl font-bold text-orange-400 mb-2">¥44,000</p>
                      <p className="text-gray-300 text-sm">2時間撮影</p>
                      <p className="text-gray-300 text-sm">10-15カット納品目安</p>
                    </div>
                    
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.plan === 'premium'
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => updateField('plan', 'premium')}
                    >
                      <h3 className="text-white font-semibold mb-2">プレミアムプラン</h3>
                      <p className="text-2xl font-bold text-orange-400 mb-2">¥66,000</p>
                      <p className="text-gray-300 text-sm">4時間撮影</p>
                      <p className="text-gray-300 text-sm">30-40カット納品目安</p>
                    </div>
                  </div>
                </div>

                {/* Extra Time */}
                <div>
                  <label className="block text-gray-300 mb-2">追加撮影時間</label>
                  <select
                    value={formData.extraMinutes || '0'}
                    onChange={(e) => updateField('extraMinutes', e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="0">なし</option>
                    <option value="60">60分 (+¥11,000)</option>
                    <option value="90">90分 (+¥16,500)</option>
                    <option value="120">120分 (+¥22,000)</option>
                  </select>
                </div>

                {/* Options */}
                <div>
                  <label className="block text-gray-300 mb-4">オプション</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.locationScout || false}
                        onChange={(e) => updateField('locationScout', e.target.checked)}
                        className="mr-3"
                      />
                      <div>
                        <span className="text-white">ロケハン (+¥11,000)</span>
                        <p className="text-gray-400 text-sm">事前に店舗を訪問して撮影計画を立案</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.siteImprovement || false}
                        onChange={(e) => updateField('siteImprovement', e.target.checked)}
                        className="mr-3"
                      />
                      <div>
                        <span className="text-white">販促サイトページブラッシュアップ代行 (+¥100,000)</span>
                        <p className="text-gray-400 text-sm">食べログ・ぐるなび・ホットペッパー等の掲載ページを最適化</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-3">料金内訳</h3>
                  <div className="space-y-2 text-gray-300">
                    {breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.split(':')[0]}:</span>
                        <span>{item.split(':')[1]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-600 mt-3 pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-white">合計</span>
                      <span className="text-orange-400">¥{total.toLocaleString()}（税込）</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Shooting Details */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">撮影希望内容</h2>
                
                {/* Preferred Dates */}
                <div>
                  <label className="block text-gray-300 mb-4">希望撮影日時 *</label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">第1希望 *</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="date"
                          value={formData.wish1?.date || ''}
                          onChange={(e) => updateField('wish1.date', e.target.value)}
                          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        />
                        <input
                          type="time"
                          value={formData.wish1?.time || ''}
                          onChange={(e) => updateField('wish1.time', e.target.value)}
                          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">第2希望 *</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="date"
                          value={formData.wish2?.date || ''}
                          onChange={(e) => updateField('wish2.date', e.target.value)}
                          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        />
                        <input
                          type="time"
                          value={formData.wish2?.time || ''}
                          onChange={(e) => updateField('wish2.time', e.target.value)}
                          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">第3希望 *</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="date"
                          value={formData.wish3?.date || ''}
                          onChange={(e) => updateField('wish3.date', e.target.value)}
                          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        />
                        <input
                          type="time"
                          value={formData.wish3?.time || ''}
                          onChange={(e) => updateField('wish3.time', e.target.value)}
                          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shot Details */}
                <div>
                  <label className="block text-gray-300 mb-4">撮影希望カット数</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">料理</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.cuts?.food || 0}
                        onChange={(e) => updateField('cuts.food', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">内観</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.cuts?.interior || 0}
                        onChange={(e) => updateField('cuts.interior', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">外観</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.cuts?.exterior || 0}
                        onChange={(e) => updateField('cuts.exterior', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">人物</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.cuts?.people || 0}
                        onChange={(e) => updateField('cuts.people', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-400 text-sm mb-2">撮影に関する要望・備考</label>
                    <textarea
                      value={formData.cuts?.note || ''}
                      onChange={(e) => updateField('cuts.note', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                      placeholder="特に撮影してほしいメニューや、撮影のイメージなど"
                    />
                  </div>
                </div>

                {/* Media Usage */}
                <div>
                  <label className="block text-gray-300 mb-4">画像利用媒体 * (複数選択可)</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.media?.web || false}
                        onChange={(e) => updateField('media.web', e.target.checked)}
                        className="mr-3"
                      />
                      <span className="text-white">Web・SNS</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.media?.print || false}
                        onChange={(e) => updateField('media.print', e.target.checked)}
                        className="mr-3"
                      />
                      <span className="text-white">紙媒体（チラシ・パンフレット等）</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.media?.signage || false}
                        onChange={(e) => updateField('media.signage', e.target.checked)}
                        className="mr-3"
                      />
                      <span className="text-white">デジタルサイネージ</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Billing */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">請求先情報</h2>
                
                <div>
                  <label className="block text-gray-300 mb-4">請求先 *</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="billingTo"
                        value="applicant"
                        checked={formData.billingTo === 'applicant'}
                        onChange={(e) => updateField('billingTo', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-white">申込者と同じ</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="billingTo"
                        value="store"
                        checked={formData.billingTo === 'store'}
                        onChange={(e) => updateField('billingTo', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-white">店舗と同じ</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="billingTo"
                        value="separate"
                        checked={formData.billingTo === 'separate'}
                        onChange={(e) => updateField('billingTo', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-white">別途入力</span>
                    </label>
                  </div>
                </div>

                {formData.billingTo === 'separate' && (
                  <div className="border-t border-gray-700 pt-6">
                    <label className="block text-gray-300 mb-4">請求先住所</label>
                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={formData.billingAddress?.postal || ''}
                          onChange={(e) => updateField('billingAddress.postal', e.target.value)}
                          className="w-full md:w-48 px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                          placeholder="〒123-4567"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <select
                          value={formData.billingAddress?.prefecture || ''}
                          onChange={(e) => updateField('billingAddress.prefecture', e.target.value)}
                          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        >
                          <option value="">都道府県を選択</option>
                          {PREFECTURES.map(pref => (
                            <option key={pref} value={pref}>{pref}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={formData.billingAddress?.city || ''}
                          onChange={(e) => updateField('billingAddress.city', e.target.value)}
                          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                          placeholder="市区町村"
                        />
                      </div>
                      <input
                        type="text"
                        value={formData.billingAddress?.address1 || ''}
                        onChange={(e) => updateField('billingAddress.address1', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-orange-500 focus:outline-none"
                        placeholder="番地・建物名"
                      />
                    </div>
                  </div>
                )}

                {/* Honeypot field (hidden) */}
                <input
                  type="text"
                  name="website"
                  value={formData.website || ''}
                  onChange={(e) => updateField('website', e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </motion.div>
            )}

            {/* Step 6: Confirmation */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">入力内容確認</h2>
                
                <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                  {/* Summary sections */}
                  <div>
                    <h3 className="text-orange-400 font-semibold mb-3">申込者情報</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><dt className="text-gray-400">区分:</dt><dd className="text-white">{formData.applicantType === 'corporate' ? '法人' : '個人'}</dd></div>
                      <div><dt className="text-gray-400">名称:</dt><dd className="text-white">{formData.applicantName}</dd></div>
                      <div><dt className="text-gray-400">電話:</dt><dd className="text-white">{formData.applicantPhone}</dd></div>
                      <div><dt className="text-gray-400">メール:</dt><dd className="text-white">{formData.applicantEmail}</dd></div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-orange-400 font-semibold mb-3">店舗情報</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><dt className="text-gray-400">店舗名:</dt><dd className="text-white">{formData.store?.name}</dd></div>
                      <div><dt className="text-gray-400">責任者:</dt><dd className="text-white">{formData.store?.managerName}</dd></div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-orange-400 font-semibold mb-3">プラン・料金</h3>
                    <dl className="text-sm">
                      <div><dt className="text-gray-400">プラン:</dt><dd className="text-white">{formData.plan === 'light' ? 'ライト' : formData.plan === 'standard' ? 'スタンダード' : 'プレミアム'}</dd></div>
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <dt className="text-gray-400">合計金額:</dt>
                        <dd className="text-2xl font-bold text-orange-400">¥{total.toLocaleString()}（税込）</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Agreement */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.agree || false}
                      onChange={(e) => updateField('agree', e.target.checked)}
                      className="mr-3 mt-1"
                    />
                    <div>
                      <span className="text-white">利用規約に同意する *</span>
                      <p className="text-gray-400 text-sm mt-1">
                        <a href="/terms" target="_blank" className="text-orange-400 hover:text-orange-300 underline">利用規約</a>および
                        <a href="/privacy" target="_blank" className="text-orange-400 hover:text-orange-300 underline">プライバシーポリシー</a>に同意の上、お申し込みください。
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit Result */}
                {submitResult && (
                  <div className={`p-4 rounded-lg ${submitResult.success ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'}`}>
                    <p className={submitResult.success ? 'text-green-400' : 'text-red-400'}>
                      {submitResult.message}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded font-medium transition-all ${
                currentStep === 1
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              前へ
            </button>

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-orange-500 text-white rounded font-medium hover:bg-orange-600 transition-all"
              >
                次へ
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !formData.agree}
                className={`px-8 py-3 rounded font-medium transition-all ${
                  isSubmitting || !formData.agree
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {isSubmitting ? '送信中...' : '申し込む'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
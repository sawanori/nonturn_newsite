'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Form data type
interface CheckFormData {
  name: string
  email: string
  company: string
  check1: boolean
  check2: boolean
}

export default function CheckFormClient() {
  const router = useRouter()
  const [formData, setFormData] = useState<CheckFormData>({
    name: '',
    email: '',
    company: '',
    check1: false,
    check2: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    // Get CSRF token
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => setCsrfToken(data.token))
      .catch(console.error)
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = '会社名を入力してください'
    }
    
    if (!formData.check1) {
      newErrors.check1 = '「データは2枚のみ」にチェックしてください'
    }
    
    if (!formData.check2) {
      newErrors.check2 = '「宣材利用許可」にチェックしてください'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowConfirmation(true)
    }
  }

  const handleEdit = () => {
    setShowConfirmation(false)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const response = await fetch('/api/checkform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _csrf: csrfToken,
        }),
      })

      const result = await response.json()

      if (result.ok) {
        setSubmitResult({ success: true, message: 'お申し込みを受け付けました。確認メールをお送りしました。' })
        // Redirect to thank you page
        const thankYouUrl = window.location.hostname.includes('foodphoto-pro.com') 
          ? '/checkform/thank-you'
          : '/services/photo/foodphoto/checkform/thank-you'
        window.location.href = thankYouUrl
        return // Don't set isSubmitting to false
      } else {
        setSubmitResult({ success: false, message: result.error || '送信に失敗しました。再度お試しください。' })
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitResult({ success: false, message: 'ネットワークエラーが発生しました。再度お試しください。' })
      setIsSubmitting(false)
    }
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-900 py-20">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-white">入力内容の確認</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">お名前</label>
                <p className="text-white text-lg">{formData.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">メールアドレス</label>
                <p className="text-white text-lg">{formData.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">会社名</label>
                <p className="text-white text-lg">{formData.company}</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">確認事項</label>
                <div className="space-y-2">
                  <p className="text-white flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    データは2枚のみ
                  </p>
                  <p className="text-white flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    当社NonTurn合同会社の宣材としてデータを利用する可能性がある
                  </p>
                </div>
              </div>
            </div>

            {submitResult && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitResult.success ? 'bg-green-600' : 'bg-red-600'
              }`}>
                <p className="text-white">{submitResult.message}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                修正する
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    送信中...
                  </>
                ) : (
                  '送信する'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-8 shadow-xl"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/services/photo/foodphoto">
              <Image
                src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/cameralogo.svg"
                alt="飲食店撮影PhotoStudio"
                width={80}
                height={80}
                className="hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-center text-white">無料撮影サンプル申し込み</h1>
          
          <form onSubmit={handleConfirm} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                お名前 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="山田 太郎"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                メールアドレス <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="sample@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-300 mb-2">
                会社名 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="株式会社〇〇"
              />
              {errors.company && (
                <p className="mt-2 text-sm text-red-400">{errors.company}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-4">
                確認事項 <span className="text-red-400">*</span>
              </label>
              <div className="space-y-3">
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="check1"
                      checked={formData.check1}
                      onChange={handleChange}
                      className="mt-1 mr-3 w-5 h-5 text-orange-400 bg-gray-700 border-gray-600 rounded focus:ring-orange-400"
                    />
                    <span className="text-gray-300">データは2枚のみ</span>
                  </label>
                  {errors.check1 && (
                    <p className="mt-1 ml-8 text-sm text-red-400">{errors.check1}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="check2"
                      checked={formData.check2}
                      onChange={handleChange}
                      className="mt-1 mr-3 w-5 h-5 text-orange-400 bg-gray-700 border-gray-600 rounded focus:ring-orange-400"
                    />
                    <span className="text-gray-300">当社NonTurn合同会社の宣材としてデータを利用する可能性がある</span>
                  </label>
                  {errors.check2 && (
                    <p className="mt-1 ml-8 text-sm text-red-400">{errors.check2}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-orange-400 to-red-500 text-white text-lg font-semibold rounded-lg hover:from-red-500 hover:to-pink-500 transition-all"
            >
              確認画面へ
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/services/photo/foodphoto"
              className="text-orange-400 hover:underline"
            >
              ← サービスページに戻る
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
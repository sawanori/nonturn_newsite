'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { leadMagnetSchema, resources } from '@/lib/lead-magnet-validation'
import { useCSRFToken } from '@/hooks/useCSRFToken'
import { z } from 'zod'
import Link from 'next/link'

interface LeadMagnetFormProps {
  resourceId: 'video-marketing-guide' | 'food-photo-guide'
  onSuccess?: () => void
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

export function LeadMagnetForm({ resourceId, onSuccess }: LeadMagnetFormProps) {
  const resource = resources[resourceId]
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    consent: false,
  })
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileRef = useRef<TurnstileInstance>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const { csrfToken } = useCSRFToken()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setFieldErrors({})

    // Use turnstile token or fallback for dev
    const token = turnstileToken || (TURNSTILE_SITE_KEY ? '' : 'dev-bypass')

    // Validate
    try {
      leadMagnetSchema.parse({
        ...formData,
        resource: resourceId,
        turnstileToken: token,
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        err.errors.forEach(e => {
          const field = e.path[0] as string
          errors[field] = e.message
        })
        setFieldErrors(errors)
        if (errors.turnstileToken) {
          setError('Bot検証を完了してください')
        } else {
          setError('入力内容をご確認ください')
        }
        setIsSubmitting(false)
        return
      }
    }

    if (!csrfToken) {
      setError('セキュリティトークンの取得に失敗しました。ページを更新してください。')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          ...formData,
          resource: resourceId,
          turnstileToken: token,
        }),
      })

      if (response.ok) {
        onSuccess?.()
        window.location.href = '/lead-magnet/thanks'
      } else {
        const data = await response.json()
        setError(data.error || 'エラーが発生しました。もう一度お試しください。')
        // Reset Turnstile on failure
        turnstileRef.current?.reset()
        setTurnstileToken('')
      }
    } catch {
      setError('ネットワークエラーが発生しました。')
      turnstileRef.current?.reset()
      setTurnstileToken('')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-black/50 border ${
      fieldErrors[field] ? 'border-red-400' : 'border-yellow-400/30'
    } focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 rounded transition-all duration-300`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="お名前 *"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={inputClass('name')}
          required
        />
        {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="メールアドレス *"
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={inputClass('email')}
          required
        />
        {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="会社名（任意）"
          value={formData.company}
          onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
          className={inputClass('company')}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={`consent-${resourceId}`}
          checked={formData.consent}
          onChange={e => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
          className="mt-1 w-4 h-4 accent-yellow-400"
          required
        />
        <label htmlFor={`consent-${resourceId}`} className="text-sm text-gray-400">
          <Link href="/privacy" className="text-yellow-400 underline hover:text-yellow-300">
            プライバシーポリシー
          </Link>
          に同意の上、資料をダウンロードします
        </label>
      </div>
      {fieldErrors.consent && <p className="text-red-400 text-xs">{fieldErrors.consent}</p>}

      {/* Cloudflare Turnstile Widget */}
      {TURNSTILE_SITE_KEY && (
        <div>
          <Turnstile
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={setTurnstileToken}
            onError={() => {
              setTurnstileToken('')
              setError('Bot検証に失敗しました。もう一度お試しください。')
            }}
            onExpire={() => {
              setTurnstileToken('')
            }}
            options={{
              theme: 'dark',
              size: 'flexible',
            }}
          />
          {fieldErrors.turnstileToken && (
            <p className="text-red-400 text-xs mt-1">{fieldErrors.turnstileToken}</p>
          )}
        </div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded p-3"
        >
          {error}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 font-medium text-base rounded transition-all duration-300 ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-yellow-500 hover:to-yellow-600'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            送信中...
          </span>
        ) : (
          `「${resource.title}」を無料ダウンロード`
        )}
      </button>
    </form>
  )
}

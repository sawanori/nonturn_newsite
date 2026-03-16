import { z } from 'zod'

export const leadMagnetSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください').max(255),
  name: z.string().min(1, 'お名前を入力してください').max(100),
  company: z.string().max(100).optional().or(z.literal('')),
  resource: z.enum(['video-marketing-guide', 'food-photo-guide']),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'プライバシーポリシーへの同意が必要です' }),
  }),
  turnstileToken: z.string().min(1, 'Bot検証が必要です'),
})

export type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>

export const resources = {
  'video-marketing-guide': {
    title: '動画マーケティング完全ガイド',
    description: '企業の動画活用で成果を出すための実践的なノウハウをまとめました',
    fileName: 'video-marketing-guide.pdf',
  },
  'food-photo-guide': {
    title: '飲食店の撮影活用ガイド',
    description: '写真・動画で集客力を高めるためのポイントを解説',
    fileName: 'food-photo-guide.pdf',
  },
} as const

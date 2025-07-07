import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { contactFormSchema, sanitizeInput } from '@/lib/validation'
import { verifyCSRFToken } from '@/lib/csrf'
import rateLimit from '@/lib/rate-limit'
import { z } from 'zod'

// Initialize rate limiter
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per interval
})

// SendGrid APIキーを設定
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Create response object for rate limit headers
    const response = new NextResponse()

    // Apply rate limiting (5 requests per minute per IP)
    try {
      await limiter.check(response, 5, ip)
    } catch {
      return NextResponse.json(
        { error: 'リクエスト数が制限を超えました。しばらくしてから再度お試しください。' },
        { status: 429 }
      )
    }

    // Verify CSRF token
    const csrfToken = request.headers.get('X-CSRF-Token')
    const csrfCookie = request.cookies.get('csrf-token')?.value
    
    // Verify both header token and cookie token
    const isValidCSRF = await verifyCSRFToken(csrfToken) && 
                       await verifyCSRFToken(csrfCookie) &&
                       csrfToken === csrfCookie

    if (!isValidCSRF) {
      return NextResponse.json(
        { error: 'セキュリティトークンが無効です。ページを更新してから再度お試しください。' },
        { status: 403 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    
    // Validate input data with Zod
    let validatedData
    try {
      validatedData = contactFormSchema.parse(body)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            error: '入力内容に誤りがあります',
            details: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message
            }))
          },
          { status: 400 }
        )
      }
      throw error
    }

    // Sanitize all text inputs to prevent XSS
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      company: validatedData.company ? sanitizeInput(validatedData.company) : undefined,
      email: validatedData.email, // Email is already validated by Zod
      service: validatedData.service,
      budget: validatedData.budget,
      message: sanitizeInput(validatedData.message)
    }

    // Check if SendGrid is configured
    if (!process.env.SENDGRID_API_KEY || !process.env.CONTACT_EMAIL_TO || !process.env.SENDGRID_FROM_EMAIL) {
      console.error('SendGrid configuration is missing')
      return NextResponse.json(
        { error: 'メール送信の設定が完了していません。管理者にお問い合わせください。' },
        { status: 500 }
      )
    }

    // メール本文を作成
    const emailContent = `
お問い合わせフォームより新しいメッセージが届きました。

【お客様情報】
━━━━━━━━━━━━━━━━━━━━
お名前: ${sanitizedData.name}
会社名: ${sanitizedData.company || '未記入'}
メールアドレス: ${sanitizedData.email}
希望サービス: ${getServiceName(sanitizedData.service)}
ご予算: ${getBudgetRange(sanitizedData.budget)}

【お問い合わせ内容】
━━━━━━━━━━━━━━━━━━━━
${sanitizedData.message}
━━━━━━━━━━━━━━━━━━━━

【セキュリティ情報】
IPアドレス: ${ip}
送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}

このメールは、NonTurn.LLCのウェブサイトのお問い合わせフォームから自動送信されました。
    `.trim()

    // SendGridでメール送信
    const msg = {
      to: process.env.CONTACT_EMAIL_TO,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: process.env.SENDGRID_FROM_NAME || 'NonTurn.LLC'
      },
      subject: `【お問い合わせ】${sanitizedData.name}様より（${getServiceName(sanitizedData.service)}）`,
      text: emailContent,
      replyTo: sanitizedData.email,
    }

    await sgMail.send(msg)

    // 自動返信メールの送信
    const autoReplyContent = `
${sanitizedData.name}様

この度はNonTurn.LLCへお問い合わせいただき、誠にありがとうございます。
以下の内容でお問い合わせを承りました。

【お問い合わせ内容】
━━━━━━━━━━━━━━━━━━━━
希望サービス: ${getServiceName(sanitizedData.service)}
ご予算: ${getBudgetRange(sanitizedData.budget)}

メッセージ:
${sanitizedData.message}
━━━━━━━━━━━━━━━━━━━━

担当者より24時間以内にご連絡差し上げますので、
今しばらくお待ちくださいませ。

お急ぎの場合は、下記メールアドレスまで直接ご連絡ください。
n.sawada@non-turn.com

━━━━━━━━━━━━━━━━━━━━
NonTurn.LLC
〒220-0012
神奈川県横浜市西区みなとみらい3-7-1
オーシャンゲートみなとみらい8F
Email: n.sawada@non-turn.com
Website: https://non-turn.com
━━━━━━━━━━━━━━━━━━━━
    `.trim()

    const autoReplyMsg = {
      to: sanitizedData.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: process.env.SENDGRID_FROM_NAME || 'NonTurn.LLC'
      },
      subject: '【NonTurn.LLC】お問い合わせありがとうございます',
      text: autoReplyContent,
    }

    await sgMail.send(autoReplyMsg)

    // Clear CSRF token after successful submission
    const successResponse = NextResponse.json(
      { message: 'お問い合わせを送信しました' },
      { status: 200 }
    )
    
    // Delete used CSRF token
    successResponse.cookies.delete('csrf-token')
    
    return successResponse
  } catch (error) {
    console.error('Email send error:', error)
    
    // Don't expose internal error details to client
    return NextResponse.json(
      { error: 'メールの送信中にエラーが発生しました。しばらくしてから再度お試しください。' },
      { status: 500 }
    )
  }
}

// サービス名を取得
function getServiceName(service?: string): string {
  const services: Record<string, string> = {
    movie: '映像制作',
    photo: '写真撮影',
    web: 'Web制作',
    other: 'その他',
  }
  return services[service || ''] || '未選択'
}

// 予算範囲を取得
function getBudgetRange(budget?: string): string {
  const budgets: Record<string, string> = {
    'under-100k': '10万円未満',
    '100k-300k': '10万円〜30万円',
    '300k-500k': '30万円〜50万円',
    '500k-1m': '50万円〜100万円',
    'over-1m': '100万円以上',
    'undecided': '未定',
  }
  return budgets[budget || ''] || '未選択'
}
import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function GET(_request: NextRequest) {
  try {
    // SendGrid APIキーの存在確認
    const apiKey = process.env.SENDGRID_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        error: 'SendGrid API key not found in environment variables',
        status: 'error'
      }, { status: 500 })
    }

    // APIキーの形式確認
    if (!apiKey.startsWith('SG.')) {
      return NextResponse.json({
        error: 'Invalid SendGrid API key format',
        status: 'error'
      }, { status: 500 })
    }

    // SendGridクライアントの設定
    sgMail.setApiKey(apiKey)

    // APIキーの検証（テストメール送信）
    const testMsg = {
      to: 'test@example.com', // 実際には送信されない
      from: process.env.FROM_EMAIL || 'info@non-turn.com',
      subject: 'SendGrid Test',
      text: 'This is a test message',
      html: '<p>This is a test message</p>',
      mailSettings: {
        sandboxMode: {
          enable: true // サンドボックスモードで実際の送信を防ぐ
        }
      }
    }

    // テスト送信を試みる
    await sgMail.send(testMsg)

    return NextResponse.json({
      status: 'success',
      message: 'SendGrid API key is valid',
      config: {
        apiKeyPrefix: apiKey.substring(0, 10) + '...',
        fromEmail: process.env.FROM_EMAIL || 'info@non-turn.com',
        adminEmail: process.env.ADMIN_EMAIL || 'info@non-turn.com'
      }
    }, { status: 200 })

  } catch (error: unknown) {
    const err = error as {
      message?: string;
      code?: number;
      response?: { body?: unknown };
    };
    
    console.error('SendGrid test error:', error)
    
    return NextResponse.json({
      status: 'error',
      error: err.message,
      code: err.code,
      response: err.response?.body,
      suggestion: getSuggestion(err.code)
    }, { status: 500 })
  }
}

function getSuggestion(errorCode: number | undefined): string {
  switch (errorCode) {
    case 401:
      return 'APIキーが無効です。SendGridダッシュボードで新しいAPIキーを生成してください。'
    case 403:
      return '送信元メールアドレスが認証されていません。SendGridでドメインまたはメールアドレスを認証してください。'
    case 400:
      return 'リクエストが無効です。メールアドレスの形式を確認してください。'
    default:
      return 'SendGridの設定を確認してください。'
  }
}
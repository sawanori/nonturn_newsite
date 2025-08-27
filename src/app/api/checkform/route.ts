import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid
const apiKey = process.env.SENDGRID_API_KEY
if (!apiKey) {
  console.error('SENDGRID_API_KEY is not set')
} else {
  sgMail.setApiKey(apiKey)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.company || !body.check1 || !body.check2) {
      return NextResponse.json({ ok: false, error: '必須項目が入力されていません' }, { status: 400 })
    }

    // Email to user
    const userEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #FF8C42; border-bottom: 2px solid #FF8C42; padding-bottom: 10px;">
          無料撮影サンプル申し込み受付完了
        </h1>
        
        <p>${body.name} 様</p>
        
        <p>この度は飲食店撮影PhotoStudioの無料撮影サンプルにお申し込みいただき、誠にありがとうございます。</p>
        
        <p>以下の内容でお申し込みを受け付けました：</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">お申し込み内容</h3>
          <p><strong>お名前：</strong> ${body.name}</p>
          <p><strong>メールアドレス：</strong> ${body.email}</p>
          <p><strong>会社名：</strong> ${body.company}</p>
          <p><strong>確認事項：</strong></p>
          <ul>
            <li>データは2枚のみ</li>
            <li>当社NonTurn合同会社の宣材としてデータを利用する可能性がある</li>
          </ul>
        </div>
        
        <p>担当者より2〜3営業日以内にご連絡させていただきます。</p>
        
        <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        
        <div style="color: #666; font-size: 14px;">
          <p><strong>飲食店撮影PhotoStudio</strong></p>
          <p>運営会社：NonTurn合同会社</p>
          <p>Email: info@non-turn.com</p>
          <p>URL: https://foodphoto-pro.com</p>
        </div>
      </div>
    `

    const userEmailText = `
${body.name} 様

この度は飲食店撮影PhotoStudioの無料撮影サンプルにお申し込みいただき、誠にありがとうございます。

以下の内容でお申し込みを受け付けました：

【お申し込み内容】
お名前： ${body.name}
メールアドレス： ${body.email}
会社名： ${body.company}
確認事項：
・データは2枚のみ
・当社NonTurn合同会社の宣材としてデータを利用する可能性がある

担当者より2〜3営業日以内にご連絡させていただきます。

ご不明な点がございましたら、お気軽にお問い合わせください。

---
飲食店撮影PhotoStudio
運営会社：NonTurn合同会社
Email: info@non-turn.com
URL: https://foodphoto-pro.com
`

    // Email to admin
    const adminEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #FF8C42;">無料撮影サンプル申し込み通知</h1>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">申込者情報</h3>
          <p><strong>お名前：</strong> ${body.name}</p>
          <p><strong>メールアドレス：</strong> ${body.email}</p>
          <p><strong>会社名：</strong> ${body.company}</p>
          <p><strong>確認事項：</strong></p>
          <ul>
            <li>データは2枚のみ: ✓</li>
            <li>当社NonTurn合同会社の宣材としてデータを利用する可能性がある: ✓</li>
          </ul>
        </div>
        
        <p><strong>受付日時：</strong> ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</p>
      </div>
    `

    const adminEmailText = `
無料撮影サンプル申し込み通知

【申込者情報】
お名前： ${body.name}
メールアドレス： ${body.email}
会社名： ${body.company}
確認事項：
・データは2枚のみ: ✓
・当社NonTurn合同会社の宣材としてデータを利用する可能性がある: ✓

受付日時： ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
`

    // Send emails
    const userEmail = {
      to: body.email,
      from: {
        email: 'info@non-turn.com',
        name: 'NonTurn合同会社'
      },
      subject: '【NonTurn合同会社】無料撮影サンプル申し込み受付完了',
      text: userEmailText,
      html: userEmailHtml,
    }

    const adminEmail = {
      to: 'info@non-turn.com',
      from: {
        email: 'info@non-turn.com',
        name: 'NonTurn合同会社'
      },
      subject: '【無料撮影サンプル】新規申し込み通知',
      text: adminEmailText,
      html: adminEmailHtml,
    }

    if (apiKey) {
      await Promise.all([
        sgMail.send(userEmail),
        sgMail.send(adminEmail)
      ])
      console.log('Emails sent successfully')
    } else {
      console.error('SendGrid API key not configured, emails not sent')
    }

    return NextResponse.json({ ok: true, message: 'お申し込みを受け付けました' })
  } catch (error) {
    console.error('Error processing checkform submission:', error)
    return NextResponse.json({ ok: false, error: 'エラーが発生しました' }, { status: 500 })
  }
}
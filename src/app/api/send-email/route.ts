import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// SendGrid APIキーを設定
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, inquiryType, message } = body

    // 入力値の検証
    if (!name || !email || !inquiryType || !message) {
      return NextResponse.json(
        { error: '必須項目を入力してください' },
        { status: 400 }
      )
    }

    // メールの内容を作成
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">お問い合わせを受け付けました</h2>
        
        <div style="background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">お客様情報</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 30%;">お名前</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">メールアドレス</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">会社名</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${company || '未記入'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">電話番号</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${phone || '未記入'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">お問い合わせ種別</td>
              <td style="padding: 10px;">${inquiryType}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">お問い合わせ内容</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f3f4f6; border-radius: 8px; text-align: center;">
          <p style="color: #666; margin: 0;">このメールは NonTurn.LLC のウェブサイトから送信されました</p>
        </div>
      </div>
    `

    // 管理者への通知メール
    const adminMsg = {
      to: process.env.ADMIN_EMAIL || 'info@non-turn.com',
      from: {
        email: process.env.FROM_EMAIL || 'info@non-turn.com',
        name: 'NonTurn.LLC'
      },
      subject: `【NonTurn.LLC】新しいお問い合わせ: ${inquiryType}`,
      html: emailContent,
      replyTo: email
    }

    // お客様への自動返信メール
    const customerMsg = {
      to: email,
      from: {
        email: process.env.FROM_EMAIL || 'info@non-turn.com',
        name: 'NonTurn.LLC'
      },
      subject: '【NonTurn.LLC】お問い合わせを受け付けました',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">お問い合わせありがとうございます</h2>
          
          <p style="line-height: 1.6; color: #333;">
            ${name} 様<br><br>
            この度は、NonTurn.LLC へお問い合わせいただき、誠にありがとうございます。<br>
            以下の内容でお問い合わせを受け付けました。
          </p>
          
          <div style="background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">お問い合わせ内容</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 30%;">お問い合わせ種別</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${inquiryType}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; vertical-align: top;">内容</td>
                <td style="padding: 10px; white-space: pre-wrap; line-height: 1.6;">${message}</td>
              </tr>
            </table>
          </div>
          
          <p style="line-height: 1.6; color: #333;">
            担当者より24時間以内にご連絡させていただきます。<br>
            今しばらくお待ちくださいませ。
          </p>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
            <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;">
              ※このメールは自動送信されています。<br>
              ※このメールに心当たりがない場合は、お手数ですが削除してください。
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 15px 0;">
            <p style="color: #333; margin: 10px 0; font-weight: bold;">NonTurn.LLC</p>
            <p style="color: #666; margin: 5px 0; font-size: 14px;">
              〒220-0012<br>
              神奈川県横浜市西区みなとみらい3-7-1<br>
              オーシャンゲートみなとみらい8F<br>
              Email: info@non-turn.com<br>
              Web: <a href="https://non-turn.com" style="color: #f59e0b;">https://non-turn.com</a>
            </p>
          </div>
        </div>
      `
    }

    // メール送信
    console.log('Attempting to send admin email...')
    try {
      const adminResponse = await sgMail.send(adminMsg)
      console.log('Admin email sent successfully:', adminResponse[0].statusCode)
    } catch (adminError: any) {
      console.error('Admin email error:', {
        code: adminError.code,
        message: adminError.message,
        response: adminError.response?.body
      })
      throw adminError
    }

    console.log('Attempting to send customer email...')
    try {
      const customerResponse = await sgMail.send(customerMsg)
      console.log('Customer email sent successfully:', customerResponse[0].statusCode)
    } catch (customerError: any) {
      console.error('Customer email error:', {
        code: customerError.code,
        message: customerError.message,
        response: customerError.response?.body
      })
      throw customerError
    }

    return NextResponse.json(
      { success: true, message: 'メールを送信しました' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Email sending error:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.body
    })
    
    // SendGrid specific error handling
    if (error.code === 401) {
      return NextResponse.json(
        { error: 'メール送信の認証に失敗しました。APIキーを確認してください。' },
        { status: 500 }
      )
    }
    
    if (error.code === 403) {
      return NextResponse.json(
        { error: 'メール送信が拒否されました。送信元メールアドレスを確認してください。' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'メールの送信に失敗しました', 
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: 500 }
    )
  }
}
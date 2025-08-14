import { NextRequest, NextResponse } from 'next/server'

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

    // デバッグ用：受信したデータをログに出力
    console.log('Received contact form submission:', {
      name,
      email,
      company,
      phone,
      inquiryType,
      message,
      timestamp: new Date().toISOString()
    })

    // SendGridを使わずに、一時的にログに記録
    console.log('=== お問い合わせ内容 ===')
    console.log(`お名前: ${name}`)
    console.log(`メールアドレス: ${email}`)
    console.log(`会社名: ${company || '未記入'}`)
    console.log(`電話番号: ${phone || '未記入'}`)
    console.log(`お問い合わせ種別: ${inquiryType}`)
    console.log(`メッセージ: ${message}`)
    console.log('========================')

    // 成功レスポンスを返す（実際のメール送信は行わない）
    return NextResponse.json(
      { 
        success: true, 
        message: 'お問い合わせを受け付けました。（※テストモード：メールは送信されていません）',
        data: {
          name,
          email,
          inquiryType,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { 
        error: 'お問い合わせの処理に失敗しました', 
        details: err.message 
      },
      { status: 500 }
    )
  }
}
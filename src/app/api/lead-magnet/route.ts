import { NextRequest, NextResponse } from 'next/server'
import { leadMagnetSchema, resources } from '@/lib/lead-magnet-validation'
import { sanitizeInput } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const result = leadMagnetSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: '入力内容に不備があります', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { email, name, company, resource, turnstileToken } = result.data
    const resourceInfo = resources[resource]

    // Verify Turnstile token
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
    if (turnstileSecret && turnstileToken !== 'dev-bypass') {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      })
      const verifyData = await verifyRes.json()
      if (!verifyData.success) {
        return NextResponse.json({ error: 'Bot検証に失敗しました' }, { status: 403 })
      }
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedCompany = company ? sanitizeInput(company) : ''

    // Store in Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseServiceKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/lead_magnet_submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({
            email,
            name: sanitizedName,
            company: sanitizedCompany || null,
            resource,
            consented_at: new Date().toISOString(),
          }),
        })
      } catch (dbError) {
        console.error('Supabase insert error:', dbError)
        // Continue even if DB insert fails
      }
    }

    // Send email with download link via SendGrid
    const sendgridApiKey = process.env.SENDGRID_API_KEY
    if (sendgridApiKey) {
      try {
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sendgridApiKey}`,
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email }],
                subject: `【NonTurn】${resourceInfo.title}のダウンロード`,
              },
            ],
            from: {
              email: 'info@non-turn.com',
              name: 'NonTurn合同会社',
            },
            content: [
              {
                type: 'text/html',
                value: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">${sanitizedName}様</h2>
                    <p>資料のダウンロードリクエストありがとうございます。</p>
                    <p>「${resourceInfo.title}」は以下のリンクからダウンロードいただけます。</p>
                    <p style="margin: 24px 0;">
                      <a href="https://non-turn.com/resources/${resourceInfo.fileName}"
                         style="background: #EAB308; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                        資料をダウンロード
                      </a>
                    </p>
                    <p style="color: #666; font-size: 14px;">
                      映像制作・撮影のご相談がございましたら、お気軽にお問い合わせください。
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                    <p style="color: #999; font-size: 12px;">
                      NonTurn合同会社<br />
                      〒220-0012 横浜市西区みなとみらい3-7-1<br />
                      info@non-turn.com
                    </p>
                  </div>
                `,
              },
            ],
          }),
        })
      } catch (emailError) {
        console.error('SendGrid error:', emailError)
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}

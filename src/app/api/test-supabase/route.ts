import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Supabaseの接続テスト
    const { data, error } = await supabase
      .from('_test_connection')
      .select('*')
      .limit(1)
    
    // PGRST116 または PGRST205 はテーブルが存在しない場合のエラーコード
    // これらのエラーは接続は成功しているが、テーブルがないことを示す
    if (error && error.code === 'PGRST116' || error?.code === 'PGRST205') {
      // テーブルが存在しない = 接続は成功
      return NextResponse.json({
        success: true,
        message: 'Supabase接続成功（テーブル未作成）',
        project: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          projectRef: 'saeakxyazamxgmwpriqo',
          status: 'connected',
          note: 'データベースに接続できました。テーブルはまだ作成されていません。'
        },
        timestamp: new Date().toISOString()
      })
    }
    
    if (error) {
      // その他のエラーの場合は接続に問題がある
      return NextResponse.json({
        success: false,
        message: 'Supabase接続エラー',
        error: error.message,
        details: error
      }, { status: 500 })
    }

    // プロジェクト情報を返す
    return NextResponse.json({
      success: true,
      message: 'Supabase接続成功',
      project: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        projectRef: 'saeakxyazamxgmwpriqo',
        status: 'connected'
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '予期しないエラー',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
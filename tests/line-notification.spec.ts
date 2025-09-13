import { test, expect } from '@playwright/test';

test.describe('LINE Notification Test', () => {
  test('Send chat message and trigger LINE notification', async ({ page }) => {
    // チャットページに直接アクセス
    await page.goto('https://foodphoto-pro.com/chat');
    
    console.log('✅ Accessed foodphoto-pro.com/chat');
    
    // ページが完全に読み込まれるまで待機
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Chat page loaded');
    
    // チャット入力フィールドを探す
    const chatInput = page.locator('textarea[placeholder*="メッセージ"], input[placeholder*="メッセージ"], textarea[placeholder*="message" i], #chat-input, .chat-input').first();
    
    // 入力フィールドが表示されるまで待機
    await chatInput.waitFor({ state: 'visible', timeout: 5000 });
    
    // タイムスタンプを含むテストメッセージを作成
    const timestamp = new Date().toLocaleString('ja-JP', { 
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const testMessage = `【自動テスト】LINE通知テスト - ${timestamp}`;
    
    // メッセージを入力
    await chatInput.fill(testMessage);
    console.log(`✅ Entered message: ${testMessage}`);
    
    // 送信ボタンを探してクリック（Enterキーでも可）
    const sendButton = page.locator('button[type="submit"], button:has-text("送信"), button:has-text("Send"), button[aria-label*="send" i]').first();
    
    if (await sendButton.isVisible()) {
      await sendButton.click();
    } else {
      // 送信ボタンが見つからない場合はEnterキーで送信
      await chatInput.press('Enter');
    }
    
    console.log('✅ Message sent');
    
    // 少し待機してメッセージが送信されることを確認
    await page.waitForTimeout(3000);
    
    console.log('✅ Waiting for message to be processed');
    
    // 少し待機して通知が送信されることを確認
    await page.waitForTimeout(2000);
    
    // 2つ目のメッセージを送信（クールダウンテスト用）
    const secondMessage = `【自動テスト2】クールダウン無効確認 - ${timestamp}`;
    await chatInput.fill(secondMessage);
    console.log(`✅ Entered second message: ${secondMessage}`);
    
    if (await sendButton.isVisible()) {
      await sendButton.click();
    } else {
      await chatInput.press('Enter');
    }
    
    console.log('✅ Second message sent');
    
    // 少し待機してメッセージが送信されることを確認
    await page.waitForTimeout(3000);
    
    console.log('✅ Second message processed');
    
    // スクリーンショットを保存（デバッグ用）
    await page.screenshot({ path: 'test-chat-result.png', fullPage: true });
    console.log('✅ Screenshot saved as test-chat-result.png');
    
    console.log('\n===========================================');
    console.log('🎉 テスト完了！');
    console.log('LINEアプリで以下を確認してください：');
    console.log('1. 管理グループに通知が2件届いているか');
    console.log('2. メッセージ内容が正しく表示されているか');
    console.log('3. 「管理画面を開く」ボタンが機能するか');
    console.log('===========================================\n');
  });
});

// Playwrightの設定
export const config = {
  use: {
    // ブラウザの設定
    headless: false, // ブラウザを表示して実行
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    // スクリーンショットとビデオ
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  // タイムアウト設定
  timeout: 60000,
  
  // リトライ設定
  retries: 0,
};
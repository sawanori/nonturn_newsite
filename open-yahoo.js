const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,  // ブラウザを表示
    slowMo: 50       // 操作を見やすくするため少し遅くする
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Yahoo Japanを開いています...');
  await page.goto('https://www.yahoo.co.jp/');

  console.log('Yahoo Japanが開きました。ブラウザは開いたままです。');
  console.log('終了するには Ctrl+C を押してください。');

  // ブラウザを開いたままにする
  await new Promise(() => {});
})();
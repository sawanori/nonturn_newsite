const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    headless: false,  // ブラウザを表示
    devtools: true    // 開発者ツールを開く
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });

    const page = await context.newPage();

    // ネットワークエラーを監視
    page.on('requestfailed', request => {
      console.log('❌ Request failed:', request.url(), request.failure().errorText);
    });

    // コンソールエラーを監視
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Console error:', msg.text());
      }
    });

    // ページエラーを監視
    page.on('pageerror', error => {
      console.log('❌ Page error:', error.message);
    });

    console.log('Opening foodphoto page...');
    await page.goto('http://localhost:3002/services/photo/foodphoto', {
      waitUntil: 'networkidle'
    });

    // 画像の読み込み状態をチェック
    const images = await page.$$('img');
    console.log(`Found ${images.length} images on the page`);

    for (let i = 0; i < Math.min(5, images.length); i++) {
      const img = images[i];
      const info = await img.evaluate(el => ({
        src: el.src,
        alt: el.alt,
        naturalWidth: el.naturalWidth,
        naturalHeight: el.naturalHeight,
        complete: el.complete,
        display: window.getComputedStyle(el).display,
        visibility: window.getComputedStyle(el).visibility
      }));
      console.log(`Image ${i + 1}:`, info);
    }

    // OptimizedImageコンポーネントの状態を確認
    const optimizedImages = await page.$$('[class*="object-cover"]');
    console.log(`Found ${optimizedImages.length} OptimizedImage components`);

    // ローダーの状態を確認
    const loader = await page.$('#loader');
    if (loader) {
      const loaderVisible = await loader.isVisible();
      console.log('Loader visible:', loaderVisible);
    } else {
      console.log('No loader found');
    }

    // FoodPhotoLoaderの状態
    const foodPhotoLoader = await page.$('[id="loader"]');
    if (foodPhotoLoader) {
      const styles = await foodPhotoLoader.evaluate(el => window.getComputedStyle(el));
      console.log('FoodPhotoLoader styles:', {
        display: styles.display,
        opacity: styles.opacity,
        visibility: styles.visibility
      });
    }

    // 10秒待機（手動で確認するため）
    console.log('Waiting 10 seconds for manual inspection...');
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
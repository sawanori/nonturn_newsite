const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });

    const page = await context.newPage();

    console.log('Opening foodphoto page...');
    await page.goto('http://localhost:3002/services/photo/foodphoto', {
      waitUntil: 'networkidle'
    });

    await page.waitForTimeout(3000);

    // Take full page screenshot
    console.log('Taking full page screenshot...');
    await page.screenshot({
      path: 'foodphoto-fullpage.png',
      fullPage: true
    });

    // Find and screenshot Pain Points section
    console.log('Looking for Pain Points section...');
    const painPointsText = await page.locator('text=/こんな悩みや不満/').first();

    if (await painPointsText.isVisible()) {
      await painPointsText.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      // Get viewport screenshot after scrolling
      await page.screenshot({
        path: 'painpoints-view.png'
      });

      console.log('Pain Points section screenshot saved!');
    }

    // Find bottom CTA
    console.log('Looking for bottom CTA...');
    const bottomCTA = await page.locator('text=/webで今すぐお申し込み/').first();

    if (await bottomCTA.isVisible()) {
      await bottomCTA.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      await page.screenshot({
        path: 'bottom-cta-view.png'
      });

      console.log('Bottom CTA screenshot saved!');
    }

    console.log('All screenshots saved successfully!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
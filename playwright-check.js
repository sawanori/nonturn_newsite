const { chromium } = require('@playwright/test');

(async () => {
  // Launch browser
  const browser = await chromium.launch({
    headless: true
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });

    const page = await context.newPage();

    console.log('Opening foodphoto page...');
    await page.goto('http://localhost:3002/services/photo/foodphoto', {
      waitUntil: 'networkidle'
    });

    // Wait for the page to fully load
    await page.waitForTimeout(3000);

    // Take screenshots
    console.log('Taking full page screenshot...');
    await page.screenshot({
      path: 'foodphoto-fullpage.png',
      fullPage: true
    });

    // Take viewport screenshot
    console.log('Taking viewport screenshot...');
    await page.screenshot({
      path: 'foodphoto-viewport.png'
    });

    // Scroll to Pain Points section
    console.log('Scrolling to Pain Points section...');
    const painPointsSection = await page.locator('text=/こんな悩みや不満/').first();
    if (await painPointsSection.isVisible()) {
      await painPointsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      console.log('Taking Pain Points section screenshot...');
      await page.screenshot({
        path: 'painpoints-section.png'
      });

      // Check the CTA button
      const ctaButton = await page.locator('#cta-painpoints-apply').first();
      if (await ctaButton.isVisible()) {
        const buttonBox = await ctaButton.boundingBox();
        console.log('CTA Button found at:', buttonBox);

        // Take screenshot of the button area
        await page.screenshot({
          path: 'painpoints-cta.png',
          clip: {
            x: Math.max(0, buttonBox.x - 50),
            y: Math.max(0, buttonBox.y - 50),
            width: Math.min(1920, buttonBox.width + 100),
            height: buttonBox.height + 100
          }
        });
      }
    }

    // Scroll to bottom CTA section
    console.log('Scrolling to bottom CTA section...');
    await page.evaluate(() => {
      const element = document.querySelector('text=/webで今すぐお申し込み/');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    await page.waitForTimeout(1000);

    console.log('Taking bottom CTA screenshot...');
    await page.screenshot({
      path: 'bottom-cta.png'
    });

    console.log('Screenshots saved successfully!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
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
      waitUntil: 'domcontentloaded'
    });

    // Wait for loader to disappear
    console.log('Waiting for loader to disappear...');
    await page.waitForSelector('#loader', { state: 'hidden', timeout: 10000 }).catch(() => {
      console.log('Loader not found or already hidden');
    });

    // Wait for main content to be visible
    await page.waitForSelector('.hero-section-mobile', { state: 'visible', timeout: 10000 }).catch(() => {
      console.log('Hero section not found, waiting...');
    });

    // Additional wait for animations
    await page.waitForTimeout(5000);

    // Take full page screenshot
    console.log('Taking full page screenshot...');
    await page.screenshot({
      path: 'foodphoto-loaded.png',
      fullPage: true
    });

    // Scroll to Pain Points section
    console.log('Scrolling to Pain Points section...');
    await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const target = elements.find(el => el.textContent?.includes('こんな悩みや不満'));
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    });

    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'painpoints-loaded.png'
    });

    // Check button visibility and colors
    const ctaButton = await page.$('#cta-painpoints-apply');
    if (ctaButton) {
      const styles = await ctaButton.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          backgroundImage: computed.backgroundImage,
          color: computed.color,
          display: computed.display,
          visibility: computed.visibility
        };
      });
      console.log('CTA Button styles:', styles);
    }

    // Scroll to bottom CTA
    console.log('Scrolling to bottom CTA...');
    await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const target = elements.find(el => el.textContent?.includes('webで今すぐお申し込み'));
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    });

    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'bottom-cta-loaded.png'
    });

    console.log('All screenshots saved successfully!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
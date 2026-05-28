import { chromium } from '@playwright/test';
import { existsSync, mkdirSync } from 'fs';

const OUTPUT_DIR = 'c:/DeveloppementWebetMobile/portfolio-evan/audit';
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const BASE_URL = 'http://localhost:3000';

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\daryl\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe',
  });
  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // Collect console errors and network failures
    const consoleErrors = [];
    const networkErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('requestfailed', req => {
      networkErrors.push(`${req.failure()?.errorText} — ${req.url()}`);
    });

    // Navigate to homepage
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000); // let animations settle

    // Check for horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    // Check viewport screenshot
    await page.screenshot({
      path: `${OUTPUT_DIR}/screenshot-${vp.name}-viewport.png`,
      fullPage: false,
    });
    console.log(`  Viewport screenshot saved.`);

    // Full-page screenshot
    await page.screenshot({
      path: `${OUTPUT_DIR}/screenshot-${vp.name}-fullpage.png`,
      fullPage: true,
    });
    console.log(`  Full-page screenshot saved.`);

    // Scroll to mid-page and capture
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.evaluate((h) => window.scrollTo(0, h * 0.3), pageHeight);
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `${OUTPUT_DIR}/screenshot-${vp.name}-scroll30.png`,
      fullPage: false,
    });

    await page.evaluate((h) => window.scrollTo(0, h * 0.6), pageHeight);
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `${OUTPUT_DIR}/screenshot-${vp.name}-scroll60.png`,
      fullPage: false,
    });

    await page.evaluate((h) => window.scrollTo(0, h * 0.9), pageHeight);
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `${OUTPUT_DIR}/screenshot-${vp.name}-scroll90.png`,
      fullPage: false,
    });

    // Gather element metrics for key sections
    const metrics = await page.evaluate(() => {
      const checks = [];

      // Check for overflow hidden elements with content cut off
      const allElements = document.querySelectorAll('*');
      let overflowCount = 0;
      allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth + 2) overflowCount++;
      });

      // Check navigation
      const nav = document.querySelector('nav');
      const navRect = nav ? nav.getBoundingClientRect() : null;

      // Check hero section
      const hero = document.querySelector('section') || document.querySelector('[class*="hero"]') || document.querySelector('h1')?.closest('div');
      const heroRect = hero ? hero.getBoundingClientRect() : null;

      // Check h1 font size
      const h1 = document.querySelector('h1');
      const h1Style = h1 ? window.getComputedStyle(h1) : null;

      // Check button touch targets
      const buttons = Array.from(document.querySelectorAll('button, a[href]'));
      const smallTargets = buttons.filter(b => {
        const r = b.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
      });

      // Check images
      const images = Array.from(document.querySelectorAll('img'));
      const brokenImages = images.filter(img => !img.complete || img.naturalWidth === 0);

      // Page dimensions
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;

      return {
        overflowingElementsCount: overflowCount,
        horizontalScroll: scrollWidth - clientWidth,
        navPresent: !!nav,
        navHeight: navRect ? navRect.height : null,
        h1Text: h1 ? h1.textContent.trim().slice(0, 80) : null,
        h1FontSize: h1Style ? h1Style.fontSize : null,
        smallTouchTargetsCount: smallTargets.length,
        brokenImagesCount: brokenImages.length,
        totalImages: images.length,
        pageScrollHeight: document.documentElement.scrollHeight,
        smallTargetSamples: smallTargets.slice(0, 3).map(b => ({
          tag: b.tagName,
          text: b.textContent.trim().slice(0, 40),
          w: Math.round(b.getBoundingClientRect().width),
          h: Math.round(b.getBoundingClientRect().height),
        })),
      };
    });

    results.push({
      viewport: vp,
      hasHorizontalScroll,
      consoleErrors,
      networkErrors,
      metrics,
    });

    console.log(`  Horizontal scroll: ${hasHorizontalScroll}`);
    console.log(`  Console errors: ${consoleErrors.length}`);
    console.log(`  Network errors: ${networkErrors.length}`);
    console.log(`  H1: "${metrics.h1Text}" @ ${metrics.h1FontSize}`);
    console.log(`  Small touch targets: ${metrics.smallTouchTargetsCount}`);
    console.log(`  Broken images: ${metrics.brokenImagesCount}/${metrics.totalImages}`);
    console.log(`  Page height: ${metrics.pageScrollHeight}px`);
    console.log(`  Overflow elements: ${metrics.overflowingElementsCount}`);

    if (consoleErrors.length > 0) {
      console.log(`  Console error samples:`);
      consoleErrors.slice(0, 5).forEach(e => console.log(`    - ${e}`));
    }
    if (networkErrors.length > 0) {
      console.log(`  Network error samples:`);
      networkErrors.slice(0, 5).forEach(e => console.log(`    - ${e}`));
    }
    if (metrics.smallTargetSamples.length > 0) {
      console.log(`  Small target samples:`);
      metrics.smallTargetSamples.forEach(t => console.log(`    - <${t.tag}> "${t.text}" ${t.w}x${t.h}px`));
    }

    await context.close();
  }

  await browser.close();

  console.log('\n=== AUDIT COMPLETE ===');
  console.log(`Screenshots saved to: ${OUTPUT_DIR}`);
  return results;
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

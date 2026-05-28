import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const OUT = 'C:/Users/daryl/AppData/Local/Temp/verify-responsive';
fs.mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 900 },
];

const sections = [
  { name: 'hero', scrollY: 0 },
  { name: 'parallax', scrollY: 900 },
  { name: 'introduction', scrollY: 2200 },
  { name: 'projets', scrollY: 4000 },
  { name: 'experiences', scrollY: 5800 },
  { name: 'citation', scrollY: 7200 },
  { name: 'demonstration', scrollY: 8500 },
];

const browser = await chromium.launch({ headless: true });

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.waitForTimeout(2000);

  // Screenshot de chaque section
  for (const sec of sections) {
    await page.evaluate((y) => window.scrollTo(0, y), sec.scrollY);
    await page.waitForTimeout(800);
    const shot = path.join(OUT, `${vp.name}__${sec.name}.png`);
    await page.screenshot({ path: shot, fullPage: false });
    console.log(`CAPTURED: ${shot}`);
  }

  // Screenshot pleine page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const full = path.join(OUT, `${vp.name}__fullpage.png`);
  await page.screenshot({ path: full, fullPage: true });
  console.log(`FULL PAGE: ${full}`);

  await page.close();
}

await browser.close();
console.log('DONE');

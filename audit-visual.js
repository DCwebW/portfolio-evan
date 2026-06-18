const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const VIEWPORTS = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, 'audit-screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const consoleErrors = [];
const networkErrors = [];

async function auditViewport(page, viewport) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  const errors = [];
  const netErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      netErrors.push({ url: response.url(), status: response.status() });
    }
  });

  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Screenshot 1 : au-dessus du fold (viewport only)
  const vpShot = path.join(OUTPUT_DIR, `screenshot-${viewport.name}-viewport.png`);
  await page.screenshot({ path: vpShot, fullPage: false });

  // Screenshot 2 : page entière
  const fullShot = path.join(OUTPUT_DIR, `screenshot-${viewport.name}-fullpage.png`);
  await page.screenshot({ path: fullShot, fullPage: true });

  // --- Checks automatisés ---
  const results = { viewport: viewport.name, errors, netErrors, checks: {} };

  // Scroll horizontal
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  results.checks.horizontalScroll = hasHorizontalScroll;

  // Présence des éléments clés
  results.checks.heroTitle = await page.locator('h1').count();
  results.checks.navbarVisible = await page.locator('nav').isVisible().catch(() => false);

  // Taille des boutons cliquables (touch target ≥ 44px sur mobile)
  if (viewport.width <= 768) {
    const buttons = await page.locator('button, a').all();
    const smallTargets = [];
    for (const btn of buttons.slice(0, 20)) {
      try {
        const box = await btn.boundingBox();
        if (box && (box.width < 44 || box.height < 44)) {
          const text = await btn.textContent().catch(() => '');
          smallTargets.push({ text: text.trim().substring(0, 40), w: Math.round(box.width), h: Math.round(box.height) });
        }
      } catch (_) {}
    }
    results.checks.smallTouchTargets = smallTargets;
  }

  // Textes débordants
  const overflowingTexts = await page.evaluate(() => {
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, span, li');
    const issues = [];
    elements.forEach(el => {
      if (el.scrollWidth > el.clientWidth + 2) {
        issues.push({
          tag: el.tagName,
          text: el.textContent.trim().substring(0, 60),
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
        });
      }
    });
    return issues.slice(0, 10);
  });
  results.checks.overflowingTexts = overflowingTexts;

  // Images cassées
  const brokenImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter(img => !img.complete || img.naturalWidth === 0)
      .map(img => ({ src: img.src, alt: img.alt }))
      .slice(0, 10);
  });
  results.checks.brokenImages = brokenImages;

  // Sections visibles (scroll progressif pour déclencher les animations)
  const sections = await page.evaluate(() => {
    const sectionEls = document.querySelectorAll('section, [data-section]');
    return Array.from(sectionEls).map(s => ({
      tag: s.tagName,
      id: s.id,
      className: s.className.substring(0, 60),
      height: s.offsetHeight,
    }));
  });
  results.checks.sections = sections;

  // Hauteurs des conteneurs scroll-driven (doit être >= 400vh)
  const scrollContainers = await page.evaluate(() => {
    const vh = window.innerHeight;
    const containers = document.querySelectorAll('*');
    const big = [];
    containers.forEach(el => {
      const h = el.offsetHeight;
      if (h >= vh * 3) {
        big.push({
          tag: el.tagName,
          id: el.id,
          class: el.className.toString().substring(0, 60),
          heightPx: h,
          heightVh: Math.round(h / vh),
        });
      }
    });
    return big.slice(0, 10);
  });
  results.checks.scrollContainers = scrollContainers;

  // Screenshots des sections principales par scroll
  const sectionScrollPoints = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.0];
  for (const pct of sectionScrollPoints) {
    await page.evaluate((p) => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      window.scrollTo(0, Math.floor(maxScroll * p));
    }, pct);
    await page.waitForTimeout(600);
    const label = Math.round(pct * 100);
    const scrollShot = path.join(OUTPUT_DIR, `screenshot-${viewport.name}-scroll${label}pct.png`);
    await page.screenshot({ path: scrollShot, fullPage: false });
  }

  return results;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const allResults = [];

  for (const viewport of VIEWPORTS) {
    console.log(`\n=== Audit: ${viewport.name} (${viewport.width}x${viewport.height}) ===`);
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      const result = await auditViewport(page, viewport);
      allResults.push(result);
      console.log(`  Scroll horizontal: ${result.checks.horizontalScroll}`);
      console.log(`  H1 trouvés: ${result.checks.heroTitle}`);
      console.log(`  Nav visible: ${result.checks.navbarVisible}`);
      console.log(`  Textes débordants: ${result.checks.overflowingTexts.length}`);
      console.log(`  Images cassées: ${result.checks.brokenImages.length}`);
      if (result.checks.smallTouchTargets) {
        console.log(`  Touch targets < 44px: ${result.checks.smallTouchTargets.length}`);
      }
      if (result.errors.length) {
        console.log(`  Erreurs console: ${result.errors.length}`);
        result.errors.forEach(e => console.log(`    - ${e}`));
      }
      if (result.netErrors.length) {
        console.log(`  Erreurs réseau: ${result.netErrors.length}`);
        result.netErrors.forEach(e => console.log(`    - ${e.status} ${e.url}`));
      }
      if (result.checks.scrollContainers.length) {
        console.log(`  Conteneurs scroll-driven (>= 3vh):`);
        result.checks.scrollContainers.forEach(c =>
          console.log(`    - ${c.tag}#${c.id || '?'} → ${c.heightVh}vh`)
        );
      }
    } catch (err) {
      console.error(`  ERREUR pour ${viewport.name}:`, err.message);
    }
    await context.close();
  }

  // Sauvegarde JSON des résultats
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'audit-results.json'),
    JSON.stringify(allResults, null, 2)
  );
  console.log(`\nAudit terminé. Screenshots dans: ${OUTPUT_DIR}`);
  await browser.close();
})();

import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import assert from 'node:assert/strict';

if (process.argv.includes('--preview')) {
  await import('./verify-preview.mjs');
  process.exit(0);
}

const { chromium } = await import(pathToFileURL(process.argv[2]).href);
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const names = ['Expedição Estratégica', 'Linha de Defesa', 'Conquista de Territórios'];
fs.mkdirSync('artifacts/experience', { recursive: true });
try {
  await page.goto('http://127.0.0.1:5173/preparar-aula', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByText('Etapa 2 de 7', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByText('Etapa 3 de 7', { exact: true }).waitFor();
  await page.getByRole('button', { name: /Aprovar mapa/ }).click();
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByRole('radiogroup', { name: 'Escolha a dinâmica da aula' }).waitFor();
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const name of names) {
      const target = page.locator('.se-experience-option').filter({ has: page.getByRole('radio', { name, exact: true }) });
      await target.click();
      await page.waitForTimeout(80);
      const animating = await page.locator('.se-experience-option').evaluateAll(cards => cards.some(card => getComputedStyle(card).transform !== 'none'));
      await page.waitForTimeout(650);
      assert.equal(await page.getByRole('radio', { name, exact: true }).getAttribute('aria-checked'), 'true');
      const result = await page.locator('.se-experience-option').evaluateAll(cards => cards.map(card => ({
        selected: card.classList.contains('is-selected'), top: card.getBoundingClientRect().top,
        width: card.getBoundingClientRect().width, height: card.getBoundingClientRect().height,
      })));
      assert.equal(result[0].selected, true);
      assert(result[0].top < result[1].top && result[0].top < result[2].top);
      if (width > 760) assert(result[0].width > result[1].width);
      else assert(result[0].height > result[1].height);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('smart-edu-demo-v1')).draft.template);
      assert.equal(stored, name);
      console.log(JSON.stringify({ width, name, selectedFirst: true, animating }));
    }
    await page.screenshot({ path: `artifacts/experience/selection-${width}.png`, fullPage: true });
  }
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.getByRole('radio', { name: names[2], exact: true }).getAttribute('aria-checked'), 'true');
  await page.getByRole('radio', { name: names[2], exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(700);
  assert.equal(await page.getByRole('radio', { name: names[0], exact: true }).getAttribute('aria-checked'), 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('radio', { name: names[1], exact: true }).click();
  await page.waitForTimeout(80);
  assert.equal(await page.locator('.se-experience-option').first().locator('[role=radio]').getAttribute('aria-label'), names[1]);
  assert(await page.locator('.se-experience-option').evaluateAll(cards => cards.every(card => getComputedStyle(card).transform === 'none')));
  await page.getByRole('button', { name: 'Usar sugestão', exact: true }).click();
  assert.equal(await page.getByRole('radio', { name: names[0], exact: true }).getAttribute('aria-checked'), 'true');
  assert.deepEqual(errors, []);
  console.log('PASS: selection, animated reorder, responsive layout, keyboard, persistence, reduced motion, no browser errors.');
} finally { await browser.close(); }

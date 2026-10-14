import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL(process.argv[2]).href);
import assert from 'node:assert/strict';
const browser = await chromium.launch({headless:true, channel:'msedge'});
try {
 const page = await browser.newPage();
 const errors=[]; page.on('pageerror', e=>errors.push(e.message));
 await page.goto((process.argv[3] || 'http://127.0.0.1:5173') + '/preparar-aula',{waitUntil:'domcontentloaded',timeout:90000});
 for (const width of [1440,390]) {
  await page.setViewportSize({width,height:900});
  const controls=page.locator('[data-slot="select-trigger"]');
  await controls.first().waitFor({timeout:15000});
  const control=controls.first();
  await control.click();
  await page.getByRole('listbox').waitFor();
  assert.equal(await page.getByRole('listbox').evaluate(el=>getComputedStyle(el).borderRadius),'16px');
  await page.keyboard.press('Escape');
  await control.focus(); await page.keyboard.press('ArrowDown');
  await page.getByRole('listbox').waitFor(); await page.keyboard.press('Enter');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: dropdowns open, keyboard selection, rounded menus, desktop and mobile without overflow or runtime errors.');
} finally { await browser.close(); }






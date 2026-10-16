import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const {chromium}=await import(pathToFileURL(path.resolve(process.argv[2])).href);
const out='artifacts/redesign-frontend/FE-02';
const browser=await chromium.launch({channel:'msedge'});
const report={data:'Fresh isolated contexts; existing demonstration data',runs:[],errors:[]};
try {
for(const reducedMotion of ['no-preference','reduce']){
 for(const viewport of [{width:1440,height:900},{width:1024,height:768},{width:390,height:844}]){
 const context=await browser.newContext({viewport,reducedMotion,hasTouch:viewport.width===390,recordVideo:{dir:`${out}/video`,size:viewport}});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 const run={reducedMotion,viewport};report.runs.push(run);
 await page.goto('http://127.0.0.1:5173/resultados/sessao-segmento',{waitUntil:'networkidle'});
 const tabs=page.getByRole('tab');await tabs.first().focus();await page.keyboard.press('End');
 assert.equal(await tabs.last().getAttribute('aria-selected'),'true');assert(await tabs.last().evaluate(e=>e===document.activeElement));
 await page.keyboard.press('Home');await page.keyboard.press('ArrowRight');assert.equal(await tabs.nth(1).getAttribute('aria-selected'),'true');
 await tabs.nth(2).click();await tabs.first().click();await tabs.nth(2).click();
 await page.getByRole('heading',{name:'Equipes e decisões'}).waitFor();run.tabsKeyboardAndRapidSelection=true;
 await page.screenshot({path:`${out}/selection-${reducedMotion}-${viewport.width}.png`});
 await page.goto('http://127.0.0.1:5173/aulas',{waitUntil:'networkidle'});
 const toggle=page.locator('.j-sequence-toggle');await toggle.focus();await page.keyboard.press('Enter');
 assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert(await page.locator('#j-lesson-sequence').evaluate(e=>e.inert));
 await page.keyboard.press('Space');await toggle.click();await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'true');
 await page.waitForTimeout(400);assert(await toggle.evaluate(e=>e===document.activeElement));
 run.expansionInterruptAndFocus=true;
 const progress=page.getByRole('progressbar').first();run.progress={value:await progress.getAttribute('aria-valuenow'),transform:await progress.locator('i').evaluate(e=>getComputedStyle(e).transform)};
 await page.screenshot({path:`${out}/expansion-${reducedMotion}-${viewport.width}.png`});
 await page.goto('http://127.0.0.1:5173/materiais',{waitUntil:'networkidle'});
 const card=page.locator('.library-card').first();if(viewport.width===390)await card.tap();else await card.click();
 await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'hidden'});
 await page.waitForFunction(()=>document.activeElement?.classList.contains('library-card'));run.materialTouchOrClickAndReturnFocus=true;
 run.overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(run.overflow,false);
 await page.evaluate(()=>document.documentElement.style.zoom='2');run.zoomOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(run.zoomOverflow,false);
 await context.close();
 }
}
assert.deepEqual(report.errors,[]);
}finally{await browser.close();fs.writeFileSync(`${out}/interactions.json`,JSON.stringify(report,null,2));}

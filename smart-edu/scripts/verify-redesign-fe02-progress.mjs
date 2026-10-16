import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const {chromium}=await import(pathToFileURL(path.resolve(process.argv[2])).href);
const out='artifacts/redesign-frontend/FE-02';const browser=await chromium.launch({channel:'msedge'});const report=[];
try{for(const reducedMotion of ['no-preference','reduce']){
const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion,recordVideo:{dir:`${out}/video`,size:{width:1440,height:900}}});const page=await context.newPage();
await page.goto('http://127.0.0.1:5173/app',{waitUntil:'networkidle'});
const initial=Number(await page.getByRole('progressbar').first().getAttribute('aria-valuenow'));
await page.getByRole('button',{name:'Preparar experiência',exact:true}).click();
await page.getByRole('button',{name:'Continuar',exact:true}).click();
await page.goto('http://127.0.0.1:5173/app',{waitUntil:'networkidle'});
const progress=page.getByRole('progressbar').first();const final=Number(await progress.getAttribute('aria-valuenow'));assert(final>initial);
const before=await progress.locator('i').evaluate(e=>getComputedStyle(e).transform);
await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(350);
assert.equal(await progress.locator('i').evaluate(e=>getComputedStyle(e).transform),before);
await page.screenshot({path:`${out}/progress-updated-${reducedMotion}.png`,fullPage:true});
report.push({reducedMotion,initial,final,scrollPreservesProgress:true});await context.close();
}}finally{await browser.close();fs.writeFileSync(`${out}/progress.json`,JSON.stringify(report,null,2));}

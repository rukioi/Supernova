import {pathToFileURL} from 'node:url';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const {chromium}=await import(pathToFileURL(process.argv[2]).href);
const browser=await chromium.launch({channel:'msedge'});
const out='artifacts/kinetic-redesign';
const report=[];
try{
 for(const reducedMotion of ['no-preference','reduce']){
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:5173/app',{waitUntil:'networkidle'});
  await page.waitForTimeout(900);
  const island=page.locator('.world-island');
  const first=await island.evaluate(el=>getComputedStyle(el).transform);
  await page.waitForTimeout(400);
  const second=await island.evaluate(el=>getComputedStyle(el).transform);
  if(reducedMotion==='reduce')assert.equal(first,second,'reduced motion freezes scenery');
  else {
   assert.notEqual(first,second,'scenery must move visibly over time');
   await page.getByRole('button',{name:'Pausar movimento do cenário'}).click();
   await page.waitForTimeout(350);
   const paused=await island.evaluate(el=>getComputedStyle(el).transform);
   await page.waitForTimeout(400);
   assert.equal(await island.evaluate(el=>getComputedStyle(el).transform),paused,'pause stops ambient motion');
  }
  const card=page.locator('.cockpit-action');await card.scrollIntoViewIfNeeded();
  await page.mouse.move(0,0);await page.waitForTimeout(350);
  const before=await card.evaluate(el=>getComputedStyle(el).transform);
  await card.hover({position:{x:40,y:40}});await page.waitForTimeout(350);
  const after=await card.evaluate(el=>getComputedStyle(el).transform);
  if(reducedMotion==='reduce')assert.equal(before,after,'reduced motion disables tilt');
  else assert.notEqual(before,after,'card must react to pointer position');
  await page.goto('http://127.0.0.1:5173/turmas',{waitUntil:'networkidle'});
  await page.locator('.j-class-card').first().scrollIntoViewIfNeeded();await page.waitForTimeout(700);
  assert.equal(await page.locator('.j-class-grid>div').first().evaluate(el=>getComputedStyle(el).opacity),'1');
  report.push({reducedMotion,scenery:true,pause:reducedMotion==='no-preference',tilt:true,collectionVisible:true});
  await context.close();
 }
}finally{await browser.close();fs.writeFileSync(`${out}/motion-behavior.json`,JSON.stringify(report,null,2));}
console.log('PASS: actual scenery movement, pause, pointer tilt, reduced-motion fallback and collection visibility.');

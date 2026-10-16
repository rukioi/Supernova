import { pathToFileURL } from 'node:url';
const {chromium}=await import(pathToFileURL(process.argv[2]).href);
import fs from 'node:fs';
import assert from 'node:assert/strict';
const out='artifacts/living-system';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge'});
const report=[];
try {
 for(const width of [1440,1024,390]) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:width===390?'reduce':'no-preference'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/app','/turmas','/aulas','/materiais','/resultados/sessao-segmento']) {
   await page.goto(`http://127.0.0.1:5173${route}`,{waitUntil:'networkidle'});
   await page.locator('h1').waitFor();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow ${route} at ${width}`);
   await page.screenshot({path:`${out}/${route.split('/')[1]}-${width}.png`,fullPage:true});
   report.push({route,width,overflow:false,title:await page.locator('h1').innerText()});
  }
  await page.goto('http://127.0.0.1:5173/app',{waitUntil:'networkidle'});
  await page.locator('.j-mission-stops button').first().click();
  assert.match(await page.locator('.j-mission-context').innerText(),/ETAPA CONCLUÍDA/);
  await page.getByRole('link',{name:'Ver descobertas'}).click();
  await page.waitForURL(/resultados\/sessao-problemas/);
  await page.goto('http://127.0.0.1:5173/aulas?aula=validacao',{waitUntil:'networkidle'});
  assert.equal(await page.locator('#stop-validacao button.j-lesson-summary').getAttribute('aria-expanded'),'true');
  await page.locator('#stop-validacao button.j-lesson-summary').click();
  assert.equal(await page.locator('#stop-validacao button.j-lesson-summary').getAttribute('aria-expanded'),'false');
  await page.goto('http://127.0.0.1:5173/materiais',{waitUntil:'networkidle'});
  await page.locator('.discovery-collection').first().click();
  assert.equal(await page.locator('.discovery-collection').first().getAttribute('aria-pressed'),'true');
  await page.locator('.library-card').first().click();
  await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');
  await page.goto('http://127.0.0.1:5173/resultados/sessao-segmento',{waitUntil:'networkidle'});
  const tabs=page.getByRole('tab');
  for(let i=0;i<await tabs.count();i++){await tabs.nth(i).click();assert.equal(await tabs.nth(i).getAttribute('aria-selected'),'true');}
  assert.deepEqual(errors,[],`runtime errors at ${width}`);
  report.push({width,interactions:true,errors});await context.close();
 }
}finally{await browser.close();fs.writeFileSync(`${out}/verification.json`,JSON.stringify(report,null,2));}
console.log('Five routes and interactions passed at 1440, 1024 and 390px.');

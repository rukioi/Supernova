import { chromium } from 'file:///C:/Users/murib/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const stage = process.argv[2] || 'before';
fs.mkdirSync(`artifacts/campus/${stage}`, {recursive:true});
const browser = await chromium.launch({headless:true,channel:'msedge'});
const page = await browser.newPage();
const errors=[];
page.on('pageerror', e=>errors.push(e.message));
const report=[];
try {
 for(const width of [1440,390]) {
  await page.setViewportSize({width,height:1000});
  for(const route of ['/app','/turmas','/aulas','/preparar-aula','/resultados/sessao-segmento','/experiencia/segmento-de-clientes','/sessao/sessao-segmento']) {
   await page.goto(`http://127.0.0.1:3000${route}`, {waitUntil:'domcontentloaded',timeout:120000});
   await page.locator('.journey-app').waitFor({timeout:60000});
   if(route.startsWith('/experiencia')) await page.locator('[data-board]').waitFor({timeout:60000});
   await page.waitForTimeout(350);
   report.push({width,route,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),heading:await page.locator('h1').first().textContent()});
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
   await page.screenshot({path:`artifacts/campus/${stage}/${route.split('/')[1]}-${width}.png`,fullPage:true});
  }
 }
 if(stage==='after') {
  await page.goto('http://127.0.0.1:3000/experiencia/segmento-de-clientes',{waitUntil:'domcontentloaded',timeout:90000});
  for(const width of [1440,390]) {
   await page.setViewportSize({width,height:1000});
   for(const name of ['Expedição Estratégica','Linha de Defesa','Conquista de Territórios']) {
   await page.getByRole('radio',{name,exact:true}).check();
   await page.locator('.pv-phase-list').getByRole('button',{name:/Resultado/}).click();
   await page.waitForTimeout(400);
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
   await page.screenshot({path:`artifacts/campus/${stage}/map-${await page.locator('[data-board]').getAttribute('data-board')}-${width}.png`,fullPage:true});
   }
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('.pv-phase-list').getByRole('button',{name:/Lobby/}).click();
  await page.keyboard.press('Tab');
  report.push({reducedMotion:true,focused:await page.evaluate(()=>document.activeElement?.tagName)});
  await page.locator('.pv-phase-list').getByRole('button',{name:/Resultado/}).click();
  const map=page.locator('.gm-map-viewport');
  report.push({reducedMotionMap:{transform:await page.locator('.gm-expedition-marker').evaluate(el=>getComputedStyle(el).transform).catch(()=>null),scrollLeft:await map.evaluate(el=>el.scrollLeft)}});
 }
 fs.writeFileSync(`artifacts/campus/${stage}/report.json`,JSON.stringify({report,errors},null,2));
 assert(report.every(item=>item.overflow!==true),'Page overflow detected');
 assert.deepEqual(errors,[],'Browser errors detected');
 console.log(JSON.stringify({report,errors}));
} finally {await browser.close();}

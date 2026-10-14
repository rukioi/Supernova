import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer';

const { chromium } = await import(pathToFileURL(process.argv[2]).href);
const browser = await chromium.launch({headless:true, executablePath:puppeteer.executablePath()});
fs.mkdirSync('artifacts/studio', {recursive:true});
const failures = [];
try {
  const page = await browser.newPage({viewport:{width:1440,height:1050}, reducedMotion:'reduce'});
  page.on('pageerror', error => failures.push(error.message));
  await page.goto('https://loftylab.framer.website/', {waitUntil:'domcontentloaded'});
  await page.waitForTimeout(5500);
  await page.screenshot({path:'artifacts/studio/reference.png'});
  const routes = ['/app','/turmas','/aulas','/materiais','/resultados/sessao-segmento','/preparar-aula','/experiencia/segmento-de-clientes','/sessao/sessao-segmento'];
  for (const width of [1440,768,390]) {
    await page.setViewportSize({width,height:1050});
    for (const route of routes) {
      await page.goto('http://127.0.0.1:3000'+route, {waitUntil:'networkidle'});
      await page.locator('h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(250);
      const result = await page.evaluate(() => ({width:innerWidth,scroll:document.documentElement.scrollWidth,mainLeft:document.querySelector('main')?.getBoundingClientRect().left,title:document.querySelector('h1')?.textContent,missing:[...document.images].filter(x=>!x.complete||x.naturalWidth===0).map(x=>x.src)}));
      if(result.scroll>width+1 || result.missing.length || !result.title) failures.push({route,...result});
      console.log(JSON.stringify({route,...result}));
      if(width !== 768) await page.screenshot({path:`artifacts/studio/${route.split('/')[1]}-${width}.png`,fullPage:false});
    }
  }
  await page.goto('http://127.0.0.1:3000/app',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'lista',exact:true}).click();
  if (!await page.locator('.studio-collection').evaluate(el=>el.classList.contains('is-list'))) failures.push('List toggle failed');
  await page.getByRole('button',{name:'coleção',exact:true}).click();
  await page.getByRole('button',{name:'Dispensar sugestão'}).click();
  if(await page.locator('.studio-copilot').count()) failures.push('Dismiss failed');
  await page.getByRole('button',{name:'Preparar aula',exact:true}).click();
  await page.waitForURL('**/preparar-aula');
  await page.getByRole('button',{name:'Abrir navegação'}).click();
  await page.locator('.se-mobile-nav').getByRole('button',{name:'Turmas',exact:true}).click();
  await page.waitForURL('**/turmas');
  await page.goto('http://127.0.0.1:3000/app',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Abrir sessão',exact:true}).click();
  await page.waitForURL('**/sessao/sessao-segmento');
  console.log('INTERACTIONS: collection/list, dismiss suggestion, preparation, mobile navigation, open session passed.');
  fs.writeFileSync('artifacts/studio/validation.json',JSON.stringify({failures},null,2));
  console.log('FAILURES',JSON.stringify(failures));
  if(failures.length) process.exitCode=1;
} finally {await browser.close();}

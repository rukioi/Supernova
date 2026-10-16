import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const {chromium}=await import(pathToFileURL(path.resolve(process.argv[2])).href);
const stage=process.argv[3]||'after';
const out='artifacts/redesign-frontend/FE-01';
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const report={stage,data:'Isolated fresh contexts, existing local demonstration data',pages:[],errors:[]};
try {
for(const viewport of [{width:1440,height:900},{width:1024,height:768},{width:390,height:844}]){
 const context=await browser.newContext({viewport,reducedMotion:'reduce'});
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push(e.message));
 for(const route of ['/app','/turmas','/materiais','/aulas','/resultados/sessao-segmento']){
  await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'networkidle'});
  await page.locator('.journey-app').waitFor();
  if(!(await page.title()).startsWith('Smart Edu'))throw Error('Wrong application');
  await page.screenshot({path:`${out}/${stage}-${route.split('/')[1]}-${viewport.width}.png`,fullPage:true});
  report.pages.push({route,viewport,...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelector('h1')?.textContent,font:document.querySelector('h1')&&getComputedStyle(document.querySelector('h1')).fontFamily,small:[...document.querySelectorAll('main small,main .j-state,main .j-eyebrow')].filter(e=>e.getBoundingClientRect().height&&parseFloat(getComputedStyle(e).fontSize)<12).map(e=>e.className)}))});
 }
 await context.close();
}
}finally{await browser.close();fs.writeFileSync(`${out}/${stage}.json`,JSON.stringify(report,null,2));}

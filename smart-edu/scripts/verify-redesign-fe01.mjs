import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(path.resolve(process.argv[2])).href);
const out='artifacts/redesign-frontend/FE-01';
const browser=await chromium.launch({channel:'msedge'});
const report={interactions:[],zoom:[],small:[],contrast:[]};
try{
for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:900},recordVideo:{dir:`${out}/video`,size:{width,height:900}}});
 const page=await context.newPage();
 await page.goto('http://127.0.0.1:5173/materiais',{waitUntil:'networkidle'});
 const search=page.getByRole('textbox',{name:'Buscar material'});
 await search.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
 report.interactions.push({width,keyboardFocus:await search.evaluate(e=>({focused:e===document.activeElement,outline:getComputedStyle(e.parentElement).outline}))});
 await page.screenshot({path:`${out}/focus-${width}.png`});
 await search.fill('FE01-sem-resultado');
 await page.getByRole('heading',{name:'Uma referência ainda por descobrir.'}).waitFor();
 await page.getByRole('button',{name:'Limpar filtros'}).click();
 const card=page.locator('.library-card').first();await card.click();
 await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');
 await page.getByRole('dialog').waitFor({state:'hidden'});
 await page.waitForFunction(()=>document.activeElement?.classList.contains('library-card'));
 report.interactions.push({width,filterAndClear:true,dialogEscapeReturnFocus:await card.evaluate(e=>e===document.activeElement)});
 await page.evaluate(()=>{document.querySelector('h1').textContent='Referências para desenvolver experiências de aprendizagem e novas descobertas em todas as turmas';document.documentElement.style.zoom='2';});
 await page.screenshot({path:`${out}/zoom-200-long-title-${width}.png`,fullPage:true});
 report.zoom.push({width,method:'CSS zoom:2, long title injected only in isolated DOM',...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,out:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+2).slice(0,12).map(e=>e.className)}))});
 await page.evaluate(()=>{document.documentElement.style.zoom='';});
 for(const route of ['/app','/aulas']){
  await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'networkidle'});
  report.small.push({width,route,elements:await page.evaluate(()=>[...document.querySelectorAll('main small')].filter(e=>e.getBoundingClientRect().height&&parseFloat(getComputedStyle(e).fontSize)<12).map(e=>({text:e.textContent,parent:e.parentElement.className,size:getComputedStyle(e).fontSize})))});
 }
 await context.close();
}
const lum=hex=>{const c=hex.replace('#','').match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
for(const [label,fg,bg,min] of [['body','#102044','#f4f6fc',4.5],['muted','#52627a','#ffffff',4.5],['action','#ffffff','#2855ff',4.5],['lime','#081a42','#dfff4f',4.5],['discovery','#654090','#e8ddf8',4.5],['attention','#943d24','#ffe1cb',4.5],['success','#216344','#dff2e8',4.5],['lavender','#081a42','#a98bff',4.5],['coral','#081a42','#ff826b',4.5],['teal','#081a42','#29c5ad',4.5],['input border','#75839b','#ffffff',3]]){
 const ratio=(Math.max(lum(fg),lum(bg))+.05)/(Math.min(lum(fg),lum(bg))+.05);report.contrast.push({label,fg,bg,ratio:+ratio.toFixed(2),pass:ratio>=min});
}
}finally{await browser.close();fs.writeFileSync(`${out}/verification.json`,JSON.stringify(report,null,2));}

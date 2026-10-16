import {pathToFileURL} from 'node:url';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const {chromium}=await import(pathToFileURL(process.argv[2]).href);
const browser=await chromium.launch({channel:'msedge'});
const out='artifacts/kinetic-redesign';fs.mkdirSync(out,{recursive:true});
const report=[];
async function capture(page,name){
 await page.evaluate(()=>scrollTo(0,0));
 const height=await page.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<height;y+=650){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(130);}
 await page.waitForTimeout(650);await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(150);
 await page.screenshot({path:`${out}/${name}.png`,fullPage:true,animations:'disabled'});
}
try{
 for(const width of [1440,1024,390]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:width===390?'reduce':'no-preference'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push({url:page.url(),message:e.message}));
  for(const route of ['/app','/turmas','/aulas','/materiais','/resultados/sessao-segmento','/turmas/empreendedorismo','/preparar-aula','/experiencia/segmento-de-clientes']){
   await page.goto(`http://127.0.0.1:5173${route}`,{waitUntil:'networkidle'});
   await page.locator('h1').waitFor();
   if(route.startsWith('/experiencia'))await page.locator('.pv-stage').waitFor();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow ${route} ${width}`);
   await capture(page,`${route.replaceAll('/','_')}-${width}`);
   if(route==='/turmas')assert.equal(await page.locator('.j-class-grid>div').first().evaluate(el=>getComputedStyle(el).opacity),'1','class collection must be visible, including reduced motion');
   report.push({route,width,overflow:false});
  }
  // Game phases, formats and perspectives retain their controls after redesign.
  await page.getByRole('button',{name:'Entrar na experiência'}).click();
  assert.equal(await page.locator('.pv-stage').getAttribute('data-phase'),'Pergunta');
  const choices=page.locator('.pv-choices label');
  if(await choices.count()){await choices.first().click();await page.getByRole('button',{name:'Confirmar resposta'}).click();await page.locator('.pv-feedback').waitFor();}
  await page.getByRole('radio',{name:'Linha de Defesa',exact:true}).check();
  assert.equal(await page.locator('.pv-stage').getAttribute('data-phase'),'Lobby');
  await page.getByRole('radio',{name:'Conquista de Territórios',exact:true}).check();
  await page.getByRole('radio',{name:'Professor',exact:true}).check();
  await page.getByRole('button',{name:'Pausar e explicar'}).click();
  assert.equal(await page.getByRole('button',{name:'Entrar na experiência'}).isDisabled(),true);
  await page.getByRole('button',{name:'Retomar simulação'}).click();
  await capture(page,`game-territory-${width}`);
  await page.goto('http://127.0.0.1:5173/resultados/sessao-segmento',{waitUntil:'networkidle'});
  await page.getByRole('tab',{name:'Gameplay',exact:true}).click();await page.locator('.lab-gameplay').waitFor();
  await capture(page,`gameplay-${width}`);
  await page.getByRole('tab',{name:'Gameplay',exact:true}).focus();await page.keyboard.press('ArrowRight');
  assert.equal(await page.getByRole('tab',{name:'Alunos',exact:true}).getAttribute('aria-selected'),'true');
  await page.goto('http://127.0.0.1:5173/materiais',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Slides',exact:true}).click();await page.getByRole('heading',{name:'Nenhum material encontrado'}).waitFor();
  await page.getByRole('button',{name:'Todos',exact:true}).click();await page.locator('.library-card').first().click();await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');
  await page.goto('http://127.0.0.1:5173/app',{waitUntil:'networkidle'});
  if(width!==390){await page.getByRole('button',{name:'Pausar movimento do cenário'}).click();await page.getByRole('button',{name:'Retomar movimento do cenário'}).waitFor();}
  await page.locator('.j-mission-stops button').first().click();await page.getByRole('link',{name:'Ver descobertas'}).click();await page.waitForURL(/sessao-problemas/);
  assert.deepEqual(errors,[],`runtime errors at ${width}`);
  report.push({width,interactions:true,errors});await context.close();
 }
}finally{fs.writeFileSync(`${out}/verification.json`,JSON.stringify(report,null,2));await browser.close();}
console.log('PASS: eight routes, three widths, game formats/phases/pause, tabs/keyboard, filters, dialog and checkpoint links.');

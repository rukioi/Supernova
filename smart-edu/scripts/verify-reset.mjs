import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.argv[2]).href);
const phase=process.argv[3]||'after';
const dir=`artifacts/visual-reset/${phase}`;
fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'msedge'});
const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const report=[];
const interactions=[];
const assert=(value,message)=>{if(!value)throw Error(message);};
async function go(route){await page.goto(`http://127.0.0.1:5173${route}`,{waitUntil:'networkidle'});await page.locator('h1').first().waitFor();}
try{
 if(phase==='references'){
  for(const [name,url] of [['lofty','https://loftylab.framer.website/'],['cohesion','https://cohesion.framer.ai/'],['impeccable','https://impeccable.style/']]){
   await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await page.waitForTimeout(2500);await page.screenshot({path:`${dir}/${name}.png`});
  }
 }else{
  for(const [width,height] of phase==='interactions'?[]:phase==='before'||phase==='composition'?[[1440,900]]:[[1440,900],[1280,800],[390,844]]){
   await page.setViewportSize({width,height});
   for(const route of ['/app','/turmas','/aulas']){
    await page.goto(`http://127.0.0.1:5173${route}`,{waitUntil:'networkidle',timeout:90000});await page.locator('h1').first().waitFor();await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:`${dir}/${route.slice(1)}-${width}x${height}.png`,fullPage:true});
    await page.screenshot({path:`${dir}/${route.slice(1)}-${width}x${height}-viewport.png`});
    report.push(await page.evaluate(({route,width})=>({route,width,scroll:document.documentElement.scrollWidth,title:document.querySelector('h1').textContent}),{route,width}));
   }
  }
  if(phase==='interactions'){
   await page.emulateMedia({reducedMotion:'no-preference'});
   await go('/app');
   const row=page.locator('.reset-course-row').first();await row.hover();await page.waitForTimeout(250);
   assert(await row.evaluate(e=>getComputedStyle(e).transform!=='none'),'Course hover did not transform');
   await page.screenshot({path:`${dir}/home-hover.png`});interactions.push('Hover de turma e seta no desktop');
   const button=page.getByRole('button',{name:'Abrir sessão'});await button.hover();await page.waitForTimeout(250);
   assert(await button.evaluate(e=>getComputedStyle(e).transform!=='none'),'Button hover did not transform');
   await button.click();await page.waitForURL('**/sessao/sessao-segmento');interactions.push('Hover do botão e abertura de sessão');
   await go('/app');await page.keyboard.press('Control+k');await page.getByRole('dialog').waitFor();
   await page.getByRole('textbox').fill('Marketing');await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');await page.waitForURL('**/turmas/marketing');
   interactions.push('Busca por Ctrl+K e navegação por teclado');
   await page.getByRole('button',{name:/Trocar turma/}).click();await page.getByRole('menuitem').filter({hasText:'Gestão de Projetos'}).click();await page.waitForURL('**/turmas/gestao');interactions.push('Troca de contexto pelo seletor');
   await go('/turmas');const search=page.getByRole('textbox',{name:'Buscar turma…'});await search.fill('Marketing');assert(await page.locator('.class-feature').count()===1,'Class search');await search.fill('');
   await page.getByRole('button',{name:'lista',exact:true}).click();assert(await page.locator('.class-list-large.is-list').count()===1,'List switch');await page.getByRole('button',{name:'coleção',exact:true}).click();
   interactions.push('Busca e alternância coleção/lista preservadas');
   const card=page.locator('.class-feature').first();await card.hover();await page.waitForTimeout(250);assert(await card.evaluate(e=>getComputedStyle(e).transform!=='none'),'Class card hover');await page.screenshot({path:`${dir}/classes-hover.png`});
   await page.getByRole('button',{name:'Criar turma',exact:true}).click();const dialog=page.getByRole('dialog');await dialog.getByRole('textbox').fill('Laboratório de Aprendizagem');await dialog.getByRole('button',{name:'Criar turma',exact:true}).click();assert(await page.locator('.class-feature').count()===4,'Class creation');interactions.push('Criação de turma preservada');
   await go('/aulas');const toggle=page.locator('.reset-sequence-toggle');await toggle.click();assert(await toggle.getAttribute('aria-expanded')==='false','Collapse');await toggle.click();
   const lesson=page.locator('.reset-lesson-link').first();await lesson.hover();await page.waitForTimeout(250);assert(await lesson.locator('.reset-lesson-action').evaluate(e=>getComputedStyle(e).opacity)==='1','Lesson hover context');await page.screenshot({path:`${dir}/lessons-hover.png`});
   await lesson.focus();assert(await lesson.evaluate(e=>e===document.activeElement),'Lesson keyboard focus');await page.keyboard.press('Enter');await page.waitForURL('**/resultados/sessao-segmento');interactions.push('Timeline expansível, contexto no hover e evidências por teclado');
   await go('/aulas');await page.getByRole('button',{name:'Continuar preparação'}).click();await page.waitForURL('**/preparar-aula');interactions.push('Continuidade da preparação');
   await go('/preparar-aula');assert(await page.locator('.visual-reset').count()===0,'Style scope escaped to preparation');interactions.push('Preparação preservada fora do novo escopo visual');
   await page.emulateMedia({reducedMotion:'reduce'});await go('/app');await row.hover();assert(await row.evaluate(e=>getComputedStyle(e).transform)==='none','Reduced motion');interactions.push('Preferência de movimento reduzido respeitada');
   const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});const touch=await mobile.newPage();await touch.goto('http://127.0.0.1:5173/aulas',{waitUntil:'networkidle'});await touch.locator('.reset-lesson-link').first().tap();await touch.waitForURL('**/resultados/sessao-segmento');await mobile.close();interactions.push('Ações de aula acessíveis por toque');
   await page.evaluate(()=>localStorage.removeItem('smart-edu-demo-v1'));
  }
 }
}catch(e){errors.push(e.message);await page.screenshot({path:`${dir}/failure.png`});}
finally{fs.writeFileSync(`${dir}/report.json`,JSON.stringify({report,interactions,errors},null,2));console.log(JSON.stringify({report,interactions,errors}));await browser.close();}
if(errors.length||report.some(r=>r.scroll>r.width))process.exitCode=1;

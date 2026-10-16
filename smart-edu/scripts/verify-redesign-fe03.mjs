import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.argv[2]).href);
const out='artifacts/redesign-frontend/FE-03';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge'});const report={runs:[],errors:[]};
try{for(const reducedMotion of ['no-preference','reduce'])for(const viewport of [{width:1440,height:900},{width:1024,height:768},{width:390,height:844}]){
 const context=await browser.newContext({viewport,reducedMotion,recordVideo:{dir:`${out}/video`,size:viewport}});const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 const run={viewport,reducedMotion};report.runs.push(run);
 await page.goto('http://127.0.0.1:5173/turmas',{waitUntil:'networkidle'});await page.locator('.j-class-card').first().waitFor();
 await page.locator('.product-navigation').evaluate(e=>e.dataset.persistence='verified');
 await page.getByPlaceholder('Buscar turma…').fill('Marketing');await page.waitForURL(/q=Marketing/);await page.getByRole('button',{name:'lista',exact:true}).click();await page.waitForURL(/view=lista/);
 await page.locator('.j-class-card').first().click();await page.waitForURL(/turmas\/marketing/);
 assert.equal(await page.locator('.product-navigation').getAttribute('data-persistence'),'verified');
 await page.getByRole('tab',{name:'Resultados',exact:true}).click();await page.waitForURL(/tab=Resultados/);await page.reload({waitUntil:'networkidle'});assert.equal(await page.getByRole('tab',{name:'Resultados',exact:true}).getAttribute('aria-selected'),'true');
 await page.goBack({waitUntil:'networkidle'});await page.getByRole('tab',{name:'Visão geral',exact:true}).waitFor();assert.equal(await page.getByRole('tab',{name:'Visão geral',exact:true}).getAttribute('aria-selected'),'true');
 await page.goBack({waitUntil:'networkidle'});await page.getByPlaceholder('Buscar turma…').waitFor();assert.equal(await page.getByPlaceholder('Buscar turma…').inputValue(),'Marketing');assert.equal(await page.getByRole('button',{name:'lista',exact:true}).getAttribute('aria-pressed'),'true');run.filtersTabsReloadHistory=true;
 await page.goto('http://127.0.0.1:5173/turmas/marketing',{waitUntil:'networkidle'});await page.locator('.product-navigation').evaluate(e=>e.dataset.persistence='verified');
 await page.getByRole('link',{name:'Aulas da turma',exact:true}).click();await page.waitForURL(/aulas\?turma=marketing/);await page.getByText('Posicionamento de marca',{exact:true}).waitFor();assert.match(await page.locator('.context-trigger').innerText(),/Marketing/);assert.equal(await page.locator('.product-navigation').getAttribute('data-persistence'),'verified');assert(await page.locator('#product-content').evaluate(e=>e===document.activeElement));run.courseIdentityShellFocus=true;
 await page.locator('#product-class-switch-trigger').click();await page.getByRole('menuitem').filter({hasText:'Empreendedorismo'}).click();await page.waitForURL(/turmas\/empreendedorismo/);await page.getByRole('tab',{name:'Alunos',exact:true}).click();await page.waitForURL(/tab=Alunos/);await page.getByRole('tab',{name:'Resultados',exact:true}).click();await page.waitForURL(/tab=Resultados/);run.twoClasses=true;
 await page.goto('http://127.0.0.1:5173/aulas?turma=marketing',{waitUntil:'networkidle'});await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:`${out}/after-context-${reducedMotion}-${viewport.width}.png`});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.evaluate(()=>document.documentElement.style.zoom='2');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);run.responsiveZoom=true;
 await context.close();
}}finally{await browser.close();fs.writeFileSync(`${out}/interactions.json`,JSON.stringify(report,null,2));}
assert.deepEqual(report.errors,[]);

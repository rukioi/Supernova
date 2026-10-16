import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Dependency is resolved explicitly; never reuse another machine's cache path.
const modulePath = process.argv[2];
if (!modulePath) throw new Error('Usage: node scripts/audit-redesign-fe00.mjs <playwright module> [base URL]');
const { chromium } = await import(pathToFileURL(path.resolve(modulePath)).href);
const base = process.argv[3] || 'http://127.0.0.1:5173';
const out = 'artifacts/redesign-frontend/FE-00';
const supplement = process.argv.includes('--supplement');
fs.mkdirSync(out, { recursive: true });
const report = { base, capturedAt: new Date().toISOString(), data: 'Fresh isolated browser contexts; initialState and lib/demo-data; no existing user storage read or changed.', baseline: [], actions: [], diagnostics: [], failures: [] };
const browser = await chromium.launch({ headless: true, channel: process.env.AUDIT_BROWSER || 'msedge' });
const routes = ['/app', '/turmas', '/aulas', '/materiais', '/resultados/sessao-segmento'];
function observe(page, label) {
  page.on('pageerror', e => report.diagnostics.push({ label, type: 'pageerror', message: e.message }));
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) report.diagnostics.push({ label, type: m.type(), message: m.text() }); });
  page.on('response', r => { if (r.status() >= 400) report.diagnostics.push({ label, type: 'http', status: r.status(), url: r.url() }); });
}
async function settle(page) { await page.locator('.journey-app').waitFor(); await page.waitForTimeout(1100); }
async function go(page, route) { await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 }); await settle(page); }
async function shot(page, name) { await page.screenshot({ path: `${out}/${name}.png`, fullPage: true }); }
async function measure(page) {
  return page.evaluate(() => ({
    url: location.pathname + location.search, heading: document.querySelector('h1')?.textContent,
    width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth > innerWidth,
    fonts: [...document.fonts].map(f => ({ family: f.family, status: f.status })),
    bodyFont: getComputedStyle(document.body).fontFamily,
    headingFont: document.querySelector('h1') && getComputedStyle(document.querySelector('h1')).fontFamily,
    smallText: [...document.querySelectorAll('main small, main .j-eyebrow')].filter(e => e.getBoundingClientRect().height > 0 && parseFloat(getComputedStyle(e).fontSize) < 12).length,
    outOfBounds: [...document.querySelectorAll('main *')].filter(e => { const r=e.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1); }).slice(0,12).map(e=>({tag:e.tagName,class:e.className,text:e.textContent?.slice(0,70)})),
  }));
}
try {
 if (!supplement) {
  for (const viewport of [{width:1440,height:900},{width:1024,height:768},{width:390,height:844}]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage(); observe(page, `baseline-${viewport.width}`);
    for (const route of routes) {
      await go(page, route);
      if (!await page.title().then(t=>t.startsWith('Smart Edu'))) throw new Error('Wrong application at audit URL');
      const name = `baseline-${route.split('/')[1]}-${viewport.width}x${viewport.height}`;
      await shot(page,name); report.baseline.push({route,viewport,state:'initial, unfiltered; results tab Resumo',file:`${name}.png`,...await measure(page)});
    }
    await context.close();
  }
  for (const reducedMotion of ['no-preference','reduce']) {
    const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion,recordVideo:{dir:`${out}/video`,size:{width:1440,height:900}}});
    const page=await context.newPage(); page.setDefaultTimeout(10000); observe(page,`actions-${reducedMotion}`);
    async function action(name, fn) {
      try { const details=await fn(); await page.waitForTimeout(500); await shot(page,`action-${name}-${reducedMotion}`); report.actions.push({name,reducedMotion,passed:true,...details}); }
      catch(e) { report.failures.push({name,reducedMotion,message:e.message}); }
    }
    await action('overview-prepare',async()=>{await go(page,'/app'); await page.getByRole('button',{name:'Preparar experiência',exact:true}).click(); await page.waitForURL('**/preparar-aula'); await settle(page); return await measure(page);});
    await action('classes-create',async()=>{await go(page,'/turmas');await page.getByRole('button',{name:'Criar turma',exact:true}).click();await page.getByRole('dialog').getByRole('textbox').fill('Auditoria FE-00'); await page.getByRole('dialog').getByRole('button',{name:'Criar turma'}).click();await page.getByRole('heading',{name:'Auditoria FE-00',exact:true}).waitFor(); await page.reload(); await settle(page); if(!await page.getByRole('heading',{name:'Auditoria FE-00',exact:true}).count())throw new Error('Created class lost on reload');return {effect:'Class added and persisted after reload, isolated localStorage only'};});
    await action('class-detail',async()=>{await page.locator('.j-class-card').first().click(); await page.waitForURL('**/turmas/empreendedorismo'); await settle(page); await page.getByRole('tab',{name:'Alunos',exact:true}).click(); await page.getByRole('link',{name:'Ana Beatriz Lima',exact:true}).first().waitFor({timeout:3000}).catch(()=>{}); return await measure(page);});
    await action('lessons-results',async()=>{await go(page,'/aulas');await page.locator('.j-lesson-summary').first().click();await page.waitForURL('**/resultados/sessao-segmento');await settle(page);return {effect:'First completed lesson also opens fixed sessao-segmento',...await measure(page)};});
    await action('materials-detail-focus',async()=>{await go(page,'/materiais');await page.locator('.library-card').first().click();await page.getByRole('dialog').waitFor();const title=await page.getByRole('dialog').textContent();await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'hidden'});return {detail:title,focusReturned:await page.locator('.library-card').first().evaluate(e=>e===document.activeElement)};});
    await action('materials-filter-empty',async()=>{await page.getByRole('textbox',{name:'Buscar material',exact:true}).fill('FE00-inexistente'); await page.getByText('Uma referência ainda por descobrir.',{exact:true}).waitFor();return {cards:await page.locator('.library-card').count()};});
    await action('results-keyboard-tab',async()=>{await go(page,'/resultados/sessao-segmento');await page.getByRole('tab',{name:'Resumo',exact:true}).focus();await page.keyboard.press('ArrowRight');await page.getByRole('heading',{name:'Evidências por objetivo',exact:true}).waitFor();return {selected:await page.getByRole('tab', {selected:true}).textContent(),focus:await page.evaluate(()=>document.activeElement?.textContent)};});
    await action('results-student',async()=>{await page.getByRole('tab',{name:'Alunos',exact:true}).click();await page.locator('.se-person a').first().click();await page.waitForURL('**/alunos/**');await settle(page);return await measure(page);});
    await action('invalid-student',async()=>{await go(page,'/turmas/empreendedorismo/alunos/fe00-inexistente');return await measure(page);});
    const video=page.video();await context.close();if(video){const target=`${out}/video/flow-${reducedMotion}.webm`;fs.renameSync(await video.path(),target);report.actions.push({recording:target,reducedMotion});}
  }
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage(); observe(page,'zoom-200');
  // Browser zoom equivalent for layout: halve CSS viewport, maintaining desktop display footprint.
  await page.setViewportSize({width:720,height:450});
  for(const route of routes){await go(page,route);report.actions.push({name:'zoom-200-layout-equivalent',note:'720x450 CSS viewport; native browser zoom not exercised',...await measure(page)});await shot(page,`zoom-layout-${route.split('/')[1]}`);}
  await context.close();
 } else {
   const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
   const page=await context.newPage();page.setDefaultTimeout(10000);observe(page,'mobile-touch');
   async function probe(name,fn){try{const details=await fn();await page.waitForTimeout(350);await shot(page,`mobile-${name}`);report.actions.push({name,passed:true,...details});}catch(e){report.failures.push({name,message:e.message});}}
   await probe('overview',async()=>{await go(page,'/app');await page.getByRole('button',{name:'Preparar experiência',exact:true}).tap();await page.waitForURL('**/preparar-aula');return await measure(page);});
   await probe('classes-search',async()=>{await go(page,'/turmas');await page.getByRole('textbox',{name:'Buscar turma…',exact:true}).fill('Marketing');return {cards:await page.locator('.j-class-card').count()};});
   await probe('lessons-collapse',async()=>{await go(page,'/aulas');await page.locator('.j-sequence-toggle').tap();const collapsed=await page.locator('.j-sequence-toggle').getAttribute('aria-expanded');await page.locator('.j-sequence-toggle').tap();return {collapsed,expanded:await page.locator('.j-sequence-toggle').getAttribute('aria-expanded')};});
   await probe('materials-select-local',async()=>{await go(page,'/materiais');await page.locator('input[type=file]').setInputFiles({name:'FE00-audit.txt',mimeType:'text/plain',buffer:Buffer.from('Audit fixture, not educational content.')});await page.getByRole('dialog').waitFor();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('smart-edu-demo-v1')).materials[0]);await page.keyboard.press('Escape');await page.reload();await settle(page);return {saved,persisted:await page.getByRole('heading',{name:'FE00-audit',exact:true}).count()};});
   await probe('materials-open-touch',async()=>{await page.locator('.library-card').first().tap();await page.getByRole('dialog').waitFor();await page.getByRole('dialog').getByRole('link',{name:'Ir para preparação'}).tap();await page.waitForURL('**/preparar-aula');await settle(page);return {effect:'Navigated to preparation; selection is not a material association',...await measure(page)};});
   await probe('results-last-tab',async()=>{await go(page,'/resultados/sessao-segmento');const tabs=page.getByRole('tablist');const before=await tabs.evaluate(e=>({client:e.clientWidth,scroll:e.scrollWidth,left:e.scrollLeft}));await page.getByRole('tab',{name:'Questões',exact:true}).tap();await page.getByRole('heading',{name:'Questões com maior dificuldade',exact:true}).waitFor();return {before,selected:await page.getByRole('tab',{selected:true}).textContent(),...await measure(page)};});
   await probe('other-class',async()=>{await go(page,'/turmas/marketing');await page.getByRole('tab',{name:'Alunos',exact:true}).tap();return {body:await page.locator('main').innerText(),...await measure(page)};});
   await probe('unknown-result',async()=>{await go(page,'/resultados/FE00-inexistente');return await measure(page);});
   await context.close();
 }
} finally {
  fs.writeFileSync(`${out}/${supplement?'supplement':'report'}.json`,JSON.stringify(report,null,2));
  await browser.close();
}
console.log(JSON.stringify({baseline:report.baseline.length,actions:report.actions.length,failures:report.failures,diagnostics:report.diagnostics.length}));
if(report.failures.length)process.exitCode=1;

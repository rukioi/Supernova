import fs from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const playwrightPath = process.env.PLAYWRIGHT_MODULE || process.argv[2];
if (!playwrightPath) throw new Error('Set PLAYWRIGHT_MODULE to an installed Playwright package path.');
const playwrightModule = await import(pathToFileURL(require.resolve(playwrightPath)).href);
const chromium = playwrightModule.chromium || playwrightModule.default?.chromium;
const appUrl = process.env.APP_URL || 'http://127.0.0.1:5173';
const executablePath = process.env.BROWSER_EXECUTABLE;
let browser;
browser = await chromium.launch({headless:true, ...(executablePath ? { executablePath } : { channel: 'msedge' })});
const dir = 'artifacts/editorial';
fs.mkdirSync(dir,{recursive:true});
const failures = [], pages = [], interactions = [];
const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
page.setDefaultNavigationTimeout(90000);
page.on('pageerror', error => failures.push({error:error.message}));
page.on('console', message => { if(message.type()==='error') failures.push({console:message.text()}); });
const routes = ['/app','/turmas','/turmas/empreendedorismo','/turmas/marketing','/turmas/gestao','/aulas','/materiais','/resultados/sessao-segmento','/preparar-aula','/experiencia/segmento-de-clientes','/sessao/sessao-segmento'];
async function goto(route) { await page.goto(appUrl+route,{waitUntil:'domcontentloaded'}); await page.locator('h1').first().waitFor(); await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(900); }
try {
  for (const width of process.argv.includes('--interactions-only') ? [] : [1440,1024,768,390]) {
    await page.setViewportSize({width,height:1000});
    for (const route of routes) {
      await goto(route);
      const result = await page.evaluate(()=>({title:document.querySelector('h1')?.textContent, width:innerWidth,scroll:document.documentElement.scrollWidth,mainLeft:document.querySelector('main').getBoundingClientRect().left,sidebar:!!document.querySelector('.se-sidebar'),missingImages:[...document.images].filter(i=>i.complete&&i.currentSrc&&!i.naturalWidth).map(i=>i.currentSrc),overflow:[...document.querySelectorAll('main *')].filter(el=>el.getBoundingClientRect().right>innerWidth+2 && getComputedStyle(el).position!=='absolute').slice(0,8).map(el=>el.className)}));
      pages.push({route,...result});
      if(result.scroll>width+1||result.mainLeft!==0||result.sidebar||result.missingImages.length) failures.push({route,...result});
      if(width===1440||width===390) await page.screenshot({path:`${dir}/${route.slice(1).replaceAll('/','-')}-${width}.png`,fullPage:true});
      console.log(JSON.stringify({route,width,title:result.title,scroll:result.scroll}));
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await goto('/app');
  await page.keyboard.press('Control+k');
  await page.getByRole('dialog').waitFor();
  await page.getByRole('textbox').fill('Marketing');
  await page.locator('.product-search-results a[href="/turmas/marketing"]').click();
  await page.waitForURL('**/turmas/marketing');
  interactions.push('Ctrl+K search and open Marketing');
  await page.getByRole('button',{name:/Trocar turma/}).click();
  await page.getByRole('menuitem').filter({hasText:'Gest'}).click();
  await page.waitForURL('**/turmas/gestao');
  interactions.push('Class switcher');
  await goto('/turmas');
  await page.locator('input[aria-label^="Buscar turma"]').fill('Marketing');
  if(await page.locator('.j-class-card').count()!==1) throw Error('Class filter');
  interactions.push('Class search');
  await goto('/turmas/empreendedorismo');
  const classTabs=page.locator('[role=tab]');
  for(let i=0;i<await classTabs.count();i++) await classTabs.nth(i).click();
  await classTabs.first().focus(); await page.keyboard.press('ArrowRight');
  if(await classTabs.nth(1).getAttribute('aria-selected')!=='true') throw Error('Tab keyboard');
  interactions.push('Class tabs and arrow-key navigation');
  await goto('/resultados/sessao-segmento');
  const resultTabs=page.locator('[role=tab]');
  for(let i=0;i<await resultTabs.count();i++) await resultTabs.nth(i).click();
  interactions.push('Results tabs');
  await goto('/experiencia/segmento-de-clientes');
  const phases=page.locator('.pv-phase-list button');
  for(let i=0;i<await phases.count();i++) await phases.nth(i).click();
  interactions.push('All preview phases');
  await goto('/preparar-aula');
  await page.getByRole('button',{name:'Continuar',exact:true}).click();
  await page.getByText(/Etapa 2 de 7/).waitFor();
  interactions.push('Wizard advances');
  await page.setViewportSize({width:390,height:844});
  await goto('/app');
  await page.locator('.j-bottom-nav a[href="/turmas"]').click();
  await page.waitForURL('**/turmas');
  await page.screenshot({path:`${dir}/mobile-navigation.png`});
  interactions.push('Mobile bottom navigation');} catch(error) { failures.push({interaction:error.message}); await page.screenshot({path:`${dir}/failure.png`}); }
finally { fs.writeFileSync(`${dir}/${process.argv.includes('--interactions-only')?'interactions':'validation'}.json`,JSON.stringify({pages,interactions,failures},null,2)); console.log(JSON.stringify({interactions,failures},null,2)); await browser.close(); }
if(failures.length) process.exitCode=1;

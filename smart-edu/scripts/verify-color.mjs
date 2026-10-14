import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.argv[2]).href);
const phase=process.argv[3]||'after';
const dir=`artifacts/learning-colors/${phase}`;fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'msedge'});
const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const errors=[],report=[],interactions=[];page.on('pageerror',e=>errors.push(e.message));
const routes=['/app','/turmas','/aulas','/materiais','/resultados/sessao-segmento'];
const assert=(v,m)=>{if(!v)throw Error(m);};
async function go(route){await page.goto(`http://127.0.0.1:5173${route}`,{waitUntil:'networkidle',timeout:90000});await page.locator('h1').first().waitFor();await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});}
try{
 if(phase==='reference'){
  await page.goto('https://knowunity.com.br/',{waitUntil:'domcontentloaded',timeout:60000});await page.waitForTimeout(3000);await page.screenshot({path:`${dir}/knowunity.png`,fullPage:true});
 }else{
  for(const [width,height] of phase==='interactions'?[]:phase==='before'?[[1440,900]]:[[1440,900],[1280,800],[390,844]]){
   await page.setViewportSize({width,height});
   for(const route of routes){
    await go(route);const name=route.slice(1).replaceAll('/','-');await page.screenshot({path:`${dir}/${name}-${width}.png`,fullPage:true});await page.screenshot({path:`${dir}/${name}-${width}-viewport.png`});
    const check=await page.evaluate(({route,width})=>({route,width,scroll:document.documentElement.scrollWidth,current:[...document.querySelectorAll('.product-global-nav [aria-current=page]')].map(e=>e.textContent),brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}),{route,width});report.push(check);assert(check.scroll<=width,'Horizontal overflow: '+route);assert(check.current.length===1,'Missing active navigation: '+route);assert(!check.brokenImages.length,'Broken image: '+route);
   }
  }
  if(phase==='journey'){
   await page.setViewportSize({width:1440,height:900});await go('/turmas');
   await page.getByRole('textbox',{name:'Buscar turma…'}).fill('Marketing');assert(await page.locator('.j-class-card').count()===1,'Class search');await page.getByRole('textbox',{name:'Buscar turma…'}).fill('');
   await page.getByRole('button',{name:'lista',exact:true}).click();assert(await page.locator('.j-class-grid.is-list').count()===1,'List toggle');await page.getByRole('button',{name:'coleção',exact:true}).click();
   await page.getByRole('button',{name:'Criar turma',exact:true}).click();await page.getByRole('textbox',{name:'Nome da turma'}).fill('Jornada de teste');await page.getByRole('dialog').getByRole('button',{name:'Criar turma',exact:true}).click();await page.locator('.j-celebration').waitFor();assert(await page.locator('.j-class-card').count()===4,'New class missing');await page.screenshot({path:`${dir}/class-feedback.png`});await page.reload({waitUntil:'networkidle'});assert(await page.locator('.j-class-card').count()===4,'Class persistence');interactions.push('Busca de turmas, coleção/lista, criação, feedback contextual e persistência');
   await page.evaluate(()=>localStorage.removeItem('smart-edu-demo-v1'));await go('/aulas');await page.getByRole('button',{name:/TRILHA DO MÓDULO/}).click();assert(await page.locator('#j-lesson-sequence').isHidden(),'Lesson collapse');await page.getByRole('button',{name:/TRILHA DO MÓDULO/}).click();
   await page.getByRole('button',{name:/AULA 05 Modelagem de Receitas/}).click();await page.waitForURL('**/preparar-aula');assert(await page.evaluate(()=>JSON.parse(localStorage.getItem('smart-edu-demo-v1')).draft.title)==='Modelagem de Receitas','Wrong draft from future lesson');await go('/aulas');assert(await page.locator('.j-lesson-current h2').textContent()==='Modelagem de Receitas','Draft context lost');interactions.push('Trilha recolhível, preparação de aula futura e retomada do rascunho correto');
   await page.evaluate(()=>localStorage.removeItem('smart-edu-demo-v1'));await go('/app');assert(await page.getByRole('progressbar',{name:'Preparação da experiência'}).getAttribute('aria-valuenow')==='0','Invented preparation progress');await page.getByRole('button',{name:'Abrir sessão'}).click();await page.waitForURL('**/sessao/sessao-segmento');interactions.push('Progresso calculado pelo rascunho e abertura da sessão existente');
   await go('/resultados/sessao-segmento');await page.getByRole('button',{name:'Preparar reforço'}).click();await page.waitForURL('**/preparar-aula?intencao=reforco');interactions.push('Intervenção pedagógica abre o fluxo existente de preparação');
   await go('/app');await page.keyboard.press('Control+k');await page.getByRole('dialog').waitFor();await page.getByRole('textbox',{name:'Buscar turmas e aulas'}).fill('Marketing');await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');await page.waitForURL('**/turmas/marketing');interactions.push('Busca global por teclado e troca de contexto para Marketing');
   await page.setViewportSize({width:390,height:844});await go('/materiais');assert(await page.getByRole('navigation',{name:'Navegação móvel'}).isVisible(),'Mobile navigation hidden');assert(await page.locator('.j-bottom-nav [aria-current=page]').textContent()==='Materiais','Mobile current area');await page.getByRole('navigation',{name:'Navegação móvel'}).getByRole('link',{name:'Aulas',exact:true}).click();await page.waitForURL('**/aulas');assert(await page.locator('.j-bottom-nav [aria-current=page]').textContent()==='Aulas','Mobile navigation change');interactions.push('Navegação inferior móvel com área atual e mudança de seção');
   const contrast=(a,b)=>{const lum=h=>{const rgb=h.match(/[a-f0-9]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
   const colors=[['body','0b1933','f5f7fc'],['muted','68758c','ffffff'],['action','ffffff','2557f5'],['success','216344','bfead7'],['discovery','654090','e8ddf8'],['attention','943d24','ffe1cb'],['achievement','091b3a','ddf45a']];const contrasts=colors.map(([token,a,b])=>({token,ratio:+contrast(a,b).toFixed(2)}));assert(contrasts.every(c=>c.ratio>=4.5),'Token contrast below AA');report.push({contrasts});interactions.push('Contraste AA dos tokens semânticos: texto, botões e badges');
   await page.evaluate(()=>localStorage.removeItem('smart-edu-demo-v1'));
  }
  if(phase==='interactions'){
   await go('/app');assert(await page.locator('.j-hero-character img').count()===1,'Individual home mascot missing');
   const imageState=await page.locator('.j-hero-character img').evaluate(i=>({loaded:i.complete&&i.naturalWidth>0,width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height}));assert(imageState.loaded&&imageState.width>=90,'Home image not loaded');interactions.push('Mascote individual com transparência carregado na Visão Geral');
   await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name:'Materiais',exact:true}).click();await page.waitForURL('**/materiais');
   assert(await page.locator('.product-global-nav [aria-current=page]').textContent()==='Materiais','Wrong area highlight');
   const search=page.getByRole('textbox',{name:'Buscar material'});await search.fill('Proposta');assert(await page.locator('.library-card').count()===1,'Material search');await page.getByRole('button',{name:'Limpar busca'}).click();
   await page.getByRole('button',{name:'Documento',exact:true}).click();assert(await page.locator('.library-card').count()===1,'Document filter');await page.getByRole('button',{name:'Slides',exact:true}).click();assert(await page.locator('.library-empty').count()===1,'Empty state');await page.getByRole('button',{name:'Limpar filtros'}).click();
   interactions.push('Busca, filtros por tipo e estado vazio da biblioteca');
   const card=page.locator('.library-card').first();await card.focus();await page.keyboard.press('Enter');await page.getByRole('dialog').waitFor();await page.screenshot({path:`${dir}/material-details.png`});await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'hidden'});assert(await card.evaluate(e=>e===document.activeElement),'Material focus restore');
   await card.click();await page.getByRole('dialog').getByRole('link',{name:'Ir para preparação'}).click();await page.waitForURL('**/preparar-aula');interactions.push('Cards acessíveis por teclado, detalhes, Escape e preparação');
   await go('/materiais');const chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'Adicionar material'}).click();await (await chooser).setFiles({name:'Referência de teste.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF-1.4\nLocal UI fixture')});await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');await page.reload({waitUntil:'networkidle'});assert(await page.locator('.library-card').count()===4,'Material did not persist');interactions.push('Seleção de arquivo e persistência dos metadados');
   await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('.library-card').first().hover();await page.waitForTimeout(250);assert(await page.locator('.library-card').first().evaluate(e=>getComputedStyle(e).transform!=='none'),'Card hover');await page.screenshot({path:`${dir}/material-hover.png`});interactions.push('Hover nos cards e movimento das setas');
   for(const width of [1440,390]){
    await page.setViewportSize({width,height:900});await go('/resultados/sessao-segmento');
    for(const tab of ['Resumo','Aprendizagem','Gameplay','Alunos','Questões']){
     await page.getByRole('tab',{name:tab,exact:true}).click();await page.waitForTimeout(300);assert(await page.getByRole('tab',{name:tab,exact:true}).getAttribute('aria-selected')==='true','Result tab state');assert(await page.evaluate(()=>document.documentElement.scrollWidth)<=width,'Result tab overflow '+tab);
     if(tab==='Questões'){const rates=await page.locator('.se-question-result>strong').allTextContents();assert(rates.length>0&&rates.every(v=>/^\d+%$/.test(v)),'Question rate missing');}
     if(tab==='Gameplay'||tab==='Alunos')await page.screenshot({path:`${dir}/${tab.toLowerCase()}-${width}.png`,fullPage:true});
    }
   }
   interactions.push('Cinco abas de Resultados verificadas no desktop e no celular');
   await page.getByRole('tab',{name:'Resumo',exact:true}).click();await page.getByRole('tab',{name:'Resumo',exact:true}).focus();await page.keyboard.press('ArrowRight');assert(await page.getByRole('tab',{name:'Aprendizagem',exact:true}).getAttribute('aria-selected')==='true','Results keyboard tabs');interactions.push('Navegação das abas por teclado');
   await page.emulateMedia({reducedMotion:'reduce'});await go('/materiais');await page.locator('.library-card').first().hover();assert(await page.locator('.library-card').first().evaluate(e=>getComputedStyle(e).transform)==='none','Reduced motion');interactions.push('Movimento reduzido respeitado');
   const mobile=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});const touch=await mobile.newPage();await touch.goto('http://127.0.0.1:5173/materiais',{waitUntil:'networkidle'});await touch.locator('.library-card').first().tap();await touch.getByRole('dialog').waitFor();const bounds=await touch.getByRole('dialog').boundingBox();assert(bounds.x>=0&&bounds.x+bounds.width<=391,'Mobile dialog outside screen');await touch.screenshot({path:`${dir}/material-touch.png`});await mobile.close();interactions.push('Card e detalhes acessíveis por toque');
   await page.evaluate(()=>localStorage.removeItem('smart-edu-demo-v1'));
  }
 }
}catch(e){errors.push(e.message);await page.screenshot({path:`${dir}/failure.png`});}
finally{fs.writeFileSync(`${dir}/report.json`,JSON.stringify({report,interactions,errors},null,2));console.log(JSON.stringify({report,interactions,errors}));await browser.close();}
if(errors.length)process.exitCode=1;

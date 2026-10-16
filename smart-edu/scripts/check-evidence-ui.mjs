import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.argv[2]).href);
import fs from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
fs.mkdirSync('artifacts/evidence-first',{recursive:true});
for(const path of ['/app','/aulas','/turmas','/materiais','/resultados/sessao-problemas','/resultados/sessao-segmento','/turmas/empreendedorismo/alunos/invalido','/turmas/marketing/alunos/aluno-1','/resultados/invalido','/sessao/invalido']){
 await page.goto('http://127.0.0.1:5173'+path,{waitUntil:'networkidle'});console.log(path,await page.locator('h1,h2').allTextContents());
 if(['/app','/turmas','/materiais','/resultados/sessao-segmento','/aulas'].includes(path))await page.screenshot({path:'artifacts/evidence-first/'+path.replaceAll('/','_')+'-desktop.png',fullPage:true});
}
await page.setViewportSize({width:390,height:844});
for(const path of ['/app','/turmas','/aulas','/materiais','/resultados/sessao-segmento']){await page.goto('http://127.0.0.1:5173'+path,{waitUntil:'networkidle'});console.log('mobile',path,await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth})));await page.screenshot({path:'artifacts/evidence-first/'+path.replaceAll('/','_')+'-mobile.png',fullPage:true});}
console.log('ERRORS',JSON.stringify(errors));await browser.close();

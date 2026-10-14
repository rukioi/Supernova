import { chromium } from 'file:///C:/Users/murib/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs';
const browser=await chromium.launch({headless:true,channel:'msedge'});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
try {
 await page.goto('http://127.0.0.1:3000/preparar-aula',{waitUntil:'domcontentloaded',timeout:90000});
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await page.getByText('Etapa 2 de 7',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await page.getByRole('button',{name:/Aprovar mapa/}).click();
 await page.locator('.se-stepper').getByRole('button',{name:/Revisão/}).click();
 await page.getByText('Etapa 6 de 7',{exact:true}).waitFor();
 await page.waitForTimeout(500);
 const trigger=page.getByRole('button',{name:'Visualizar experiência',exact:true});
 await trigger.scrollIntoViewIfNeeded();
 await page.waitForTimeout(300);
 console.log(await trigger.evaluate(el=>{const r=el.getBoundingClientRect();return {rect:r.toJSON(),hit:document.elementsFromPoint(r.x+r.width/2,r.y+r.height/2).slice(0,4).map(e=>e.className)}}));
 await page.screenshot({path:'artifacts/campus/review-diagnostic.png',fullPage:true});
 await trigger.click({timeout:15000});
 await page.getByRole('dialog',{name:'Visualizar experiência',exact:true}).waitFor();
 console.log('Review opens preview');
} finally {await browser.close();}

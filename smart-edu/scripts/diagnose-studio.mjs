import {pathToFileURL} from 'node:url';
import puppeteer from 'puppeteer';
const {chromium}=await import(pathToFileURL(process.argv[2]).href);
const browser=await chromium.launch({headless:true,executablePath:puppeteer.executablePath()});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
for(const [url,width] of [['app',1440],['resultados/sessao-segmento',390]]) {
await page.setViewportSize({width,height:1000});
await page.goto('http://127.0.0.1:3000/'+url,{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
await page.waitForTimeout(1000);
console.log(await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,mainLeft:document.querySelector('main').getBoundingClientRect().left,overflow:[...document.querySelectorAll('body *')].filter(x=>x.getBoundingClientRect().right>innerWidth+1||x.scrollWidth>x.clientWidth+2).map(x=>({tag:x.tagName,cls:x.className,text:x.textContent?.slice(0,55),right:x.getBoundingClientRect().right,client:x.clientWidth,scroll:x.scrollWidth,overflow:getComputedStyle(x).overflow})).slice(0,35)})));
await page.screenshot({path:`artifacts/studio/diagnose-${width}.png`,fullPage:false});
}
await browser.close();

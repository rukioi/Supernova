import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: true });
try {
const page = await browser.newPage();
await page.setViewport({width:1440,height:1000});
await page.goto('https://loftylab.framer.website/', {waitUntil:'domcontentloaded',timeout:60000});
await page.evaluate(() => document.fonts.ready);
await page.screenshot({path:'lofty-desktop.png'});
console.log(await page.evaluate(() => [...document.querySelectorAll('h1')].slice(0,4).map(x => ({text:x.textContent,font:getComputedStyle(x).font}))));
} finally {await browser.close();}

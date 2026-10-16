import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.argv[2]).href);
fs.mkdirSync('artifacts/redesign-frontend/FE-03',{recursive:true});
const browser=await chromium.launch({channel:'msedge'});const page=await browser.newPage({viewport:{width:1440,height:900}});await page.goto('http://127.0.0.1:5173/turmas');await page.locator('.j-class-card').first().waitFor();await page.screenshot({path:'artifacts/redesign-frontend/FE-03/after-turmas-1440.png'});await browser.close();


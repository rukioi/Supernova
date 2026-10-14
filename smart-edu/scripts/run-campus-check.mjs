import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
const name=process.argv[2];
if(!['preview','controls'].includes(name)) throw new Error('Expected preview or controls');
const path=`scripts/.campus-verify-${name}-${process.pid}.mjs`;
fs.writeFileSync(path,fs.readFileSync(`scripts/verify-${name}.mjs`,'utf8').replaceAll('http://127.0.0.1:5173','http://127.0.0.1:3000'));
const result=spawnSync(process.execPath,[path,'C:/Users/murib/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs'],{stdio:'inherit'});
if(fs.existsSync(path)) fs.unlinkSync(path);
process.exit(result.status??1);

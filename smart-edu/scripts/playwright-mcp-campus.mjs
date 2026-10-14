import {spawn} from 'node:child_process';
import fs from 'node:fs';
const server=spawn(process.execPath,['C:/Users/murib/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/@playwright/mcp/cli.js','--headless','--browser','msedge','--isolated'],{stdio:['pipe','pipe','pipe']});
let buffer='',seq=0;
const pending=new Map();
server.stdout.on('data',chunk=>{
 buffer+=chunk;
 while(buffer.includes('\n')) {
  const end=buffer.indexOf('\n'),line=buffer.slice(0,end);buffer=buffer.slice(end+1);
  try {const msg=JSON.parse(line);const task=pending.get(msg.id);if(task){pending.delete(msg.id);if(msg.error) task.reject(msg.error);else task.resolve(msg.result);}}catch{}
 }
});
server.stderr.on('data',chunk=>process.stderr.write(chunk));
function call(method,params={}){return new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>{pending.delete(id);reject(new Error(`MCP timeout ${method}`));},90000);pending.set(id,{resolve:r=>{clearTimeout(timer);resolve(r);},reject:e=>{clearTimeout(timer);reject(e);}});server.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});}
const invoke=(name,args)=>call('tools/call',{name,arguments:args});
fs.mkdirSync('artifacts/campus/mcp',{recursive:true});
try {
 await call('initialize',{protocolVersion:'2024-11-05',capabilities:{},clientInfo:{name:'supernova-audit',version:'1.0'}});
 server.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
 const listed=await call('tools/list');
 console.log('MCP connected:',listed.tools.map(t=>t.name).filter(n=>/navigate|screenshot|evaluate|resize/.test(n)).join(', '));
 for(const width of [1440,390]) {
  await invoke('browser_resize',{width,height:1000});
  const nav=await invoke('browser_navigate',{url:'http://127.0.0.1:3000/app'});
  fs.writeFileSync(`artifacts/campus/mcp/home-${width}.json`,JSON.stringify(nav,null,2));
  await invoke('browser_take_screenshot',{type:'png',filename:`C:/Users/murib/Desktop/Supernova/smart-edu/artifacts/campus/mcp/home-${width}.png`,fullPage:true});
  console.log('Captured MCP home',width);
 }
 const state=await invoke('browser_evaluate',{function:'() => ({title: document.title, heading: document.querySelector("h1")?.textContent, overflow: document.documentElement.scrollWidth > innerWidth})'});
 console.log(JSON.stringify(state));
 fs.writeFileSync('artifacts/campus/mcp/state.json',JSON.stringify(state,null,2));
} finally {server.kill();}

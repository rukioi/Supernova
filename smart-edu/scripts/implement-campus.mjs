import fs from 'node:fs';
function edit(path, replacements) {
 let text=fs.readFileSync(path,'utf8');
 for(const [from,to] of replacements) {
  if(!text.includes(from)) throw new Error(`Missing source in ${path}: ${from.slice(0,80)}`);
  text=text.replace(from,to);
 }
 fs.writeFileSync(path,text);
}
edit('components/product/journey-workspace.tsx',[
 ["import {lessonNames}","import {PreparationMap} from './preparation-map';\nimport {lessonNames}"],
 ['JourneyTrack,Mascot,PageIntro','JourneyTrack,PageIntro'],
 ['<div className="j-hero-character"><Mascot name={s.draft.approved?\'panda\':\'pato\'}/><span className="j-character-caption"><Compass size={14}/>{s.draft.approved?\'Tudo pronto. Vamos juntos.\':\'Um passo de cada vez.\'}</span></div>','<PreparationMap step={s.draft.step} approved={s.draft.approved}/>'],
 ['<span className="j-eyebrow">PRÓXIMA EXPERIÊNCIA</span>','<span className="j-action-context"><Compass size={16}/>Sua próxima experiência</span>'],
 ["<small> / SUA PRÓXIMA DESCOBERTA</small>","<small> / AULA DO MÓDULO</small>"],
 ['<span className="j-eyebrow">APRENDIZAGEM EM MOVIMENTO</span><h2>','<h2>'],
 ['<span className="j-eyebrow">JORNADA DO MÓDULO</span><h3>','<h3>'],
 ['<span className="j-eyebrow">CONTINUE DE ONDE PAROU</span><h2>','<h2>'],
 ['<section className="j-ready-session">','<section className="j-ready-session" aria-label="Sessão de demonstração">'],
 ['Experiência revisada · hoje, 19:00 · Sala 204','Sessão de demonstração · condução e evidências simuladas'],
]);
edit('components/product/journey-ui.tsx',[
 ['<span className="j-eyebrow">{eyebrow}</span><h1>','<h1>'],
 ["{eyebrow:string;title:ReactNode", "{eyebrow:string;title:ReactNode"],
 ['PageIntro({eyebrow,title,description','PageIntro({title,description'],
 ['<span className="j-eyebrow">UMA NOVA POSSIBILIDADE</span>',''],
]);
edit('components/smart-edu-app.tsx',[
 ['PageTitle({ kicker, title, detail, action }','PageTitle({ title, detail, action }'],
 ['<div className="se-kicker">{kicker}</div><h1>','<h1>'],
 ['<i style={{ width: `${value}%` }} />','<i style={{ transform: `scaleX(${Math.max(0,Math.min(100,value))/100})` }} />'],
]);
edit('app/globals.css',[
 ['--color-muted: #68758c','--color-muted: #52627a'],
 ['--motion-micro: 180ms','--motion-micro: 160ms'],
 ['--motion-state: 280ms','--motion-state: 240ms'],
 ['--motion-context: 360ms','--motion-context: 280ms'],
]);
edit('app/journey.css',[
 ['transition:transform var(--motion-micro),background-color var(--motion-micro),box-shadow var(--motion-micro)','transition:transform var(--motion-micro) var(--motion-ease),background-color var(--motion-micro) ease-out'],
 ['box-shadow:0 3px 0 #193bb829','box-shadow:none'],
 ['background:var(--color-surface);box-shadow:var(--shadow-surface)','background:var(--color-surface);box-shadow:none'],
 ['.j-action-card{background:white;border:1px solid var(--color-line);border-radius:24px;overflow:hidden;box-shadow:var(--shadow-surface)}','.j-action-card{background:var(--color-ink);color:var(--color-surface);border:0;border-radius:var(--radius-surface);overflow:hidden}'],
 ['.j-action-card-top{display:flex;justify-content:space-between;align-items:center;padding:24px 28px;border-bottom:1px solid var(--color-line)}','.j-action-card-top{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px 28px;border-bottom:1px solid #ffffff26}'],
 ['.j-action-card-body{display:flex;padding:28px;gap:20px;align-items:center}','.j-action-card-body{display:flex;padding:32px 28px;gap:32px;align-items:flex-start}'],
 ['.j-experience-number{font:700 42px/1 var(--font-display);color:var(--color-action)}','.j-experience-number{font:700 38px/1 var(--font-display);color:var(--color-achievement)}'],
 ['.j-action-copy h2{font:700 36px/1.15 var(--font-body);margin:18px 0 8px;max-width:380px}','.j-action-copy h2{font:700 clamp(28px,3vw,40px)/1.14 var(--font-body);margin:18px 0 12px;max-width:420px;color:var(--color-surface);text-wrap:balance}'],
 ['.j-action-copy>p{color:var(--color-muted)','.j-action-copy>p{color:#c6d5ed'],
 ['.j-teaching-stages{display:flex;justify-content:space-between;background:#f8faff;padding:18px 28px;border-top:1px solid var(--color-line);gap:10px}','.j-teaching-stages{display:flex;justify-content:space-between;background:#ffffff08;padding:18px 28px;border-top:1px solid #ffffff26;gap:10px}'],
 ['.j-teaching-stages>span{display:flex;gap:9px;align-items:center;color:var(--color-muted)','.j-teaching-stages>span{display:flex;gap:9px;align-items:center;color:#c6d5ed'],
 ['.j-teaching-stages .is-active{color:var(--color-action)','.j-teaching-stages .is-active{color:var(--color-achievement)'],
]);
edit('app/preview.css',[
 ['.pv-phase-control .pv-phase-list small { font-size: 9px;', '.pv-phase-control .pv-phase-list small { font-size: 12px;'],
 ['.pv-phase-list b { font-size: 11px;', '.pv-phase-list b { font-size: 13px;'],
 ['.pv-phase-list small { font-size: 10px;', '.pv-phase-list small { font-size: 12px;'],
 ['.pv-choices b { font-size: 12px;', '.pv-choices b { font-size: 14px;'],
 ['.pv-choices small { font-size: 11px;', '.pv-choices small { font-size: 13px;'],
 ['.pv-feedback b { font-size: 12px;', '.pv-feedback b { font-size: 14px;'],
 ['.pv-feedback p { margin: 5px 0 0; color: #557c74;', '.pv-feedback p { margin: 5px 0 0; color: var(--color-success);'],
 ['.pv-choices small { font-size: 13px; line-height: 1.7; color: #71839a;', '.pv-choices small { font-size: 13px; line-height: 1.7; color: var(--color-muted);'],
 ['.pv-control-section>p { margin: 0 0 12px; color: #76869a; font-size: 11px;', '.pv-control-section>p { margin: 0 0 12px; color: var(--color-muted); font-size: 13px;'],
 ['.pv-workbench .j-button, .pv-dialog-footer .j-button { font-size: 11px;', '.pv-workbench .j-button, .pv-dialog-footer .j-button { font-size: 13px;'],
 ['.pv-close { display: grid; place-items: center; width: 36px; height: 36px;', '.pv-close { display: grid; place-items: center; width: 44px; height: 44px;'],
]);
edit('app/layout.tsx', [['import "./controls.css";','import "./controls.css";\nimport "./campus.css";\nimport "./game-maps.css";']]);
console.log('Campus refinements applied.');

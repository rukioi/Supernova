import fs from 'node:fs';
const path='components/smart-edu-app.tsx';
let source=fs.readFileSync(path,'utf8').replaceAll('\r\n','\n');
const edits=[
 ['useMemo, useState, useSyncExternalStore','useMemo, useRef, useState, useSyncExternalStore'],
 ['import {\n  Activity,','const ExperiencePreviewDialog = dynamic(() => import("@/components/product/experience-preview").then(module => module.ExperiencePreviewDialog));\nimport {\n  Activity,'],
 ['const [previewed, setPreviewed] = useState(draft.previewed);','const [previewed, setPreviewed] = useState(draft.previewed);\n  const [previewOpen, setPreviewOpen] = useState(false);\n  const previewTrigger = useRef<HTMLButtonElement>(null);'],
 ['onClick={() => { setPreviewed(true); updateDraft({ previewed: true }, false); navigate("/experiencia/segmento-de-clientes"); }}','onClick={event => { previewTrigger.current = event.currentTarget; setPreviewed(true); updateDraft({ previewed: true }, false); setPreviewOpen(true); }}'],
 ['<Button onClick={() => navigate("/experiencia/segmento-de-clientes")}>Visualizar experiência</Button>','<Button onClick={event => { previewTrigger.current = event.currentTarget; setPreviewOpen(true); }}>Visualizar experiência</Button>'],
 ['return <><PageTitle kicker="PREPARAÇÃO DE AULA"','return <><ExperiencePreviewDialog open={previewOpen} onOpenChange={setPreviewOpen} onReturnFocus={() => previewTrigger.current?.focus()} /><PageTitle kicker="PREPARAÇÃO DE AULA"'],
];
for(const [from,to] of edits){if(!source.includes(from))throw new Error(`Missing ${from.slice(0,80)}`);source=source.replace(from,to);}
fs.writeFileSync(path,source);

"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, FileText, Flag, Layers3, Search, ShieldCheck, Sparkles } from "lucide-react";

const stops = [
  { name: "Contexto", Icon: Flag }, { name: "Materiais", Icon: FileText },
  { name: "Mapa", Icon: Layers3 }, { name: "Experiência", Icon: Sparkles },
  { name: "Conteúdo", Icon: Search }, { name: "Revisão", Icon: ShieldCheck },
  { name: "Pronta", Icon: Check },
];

export function PreparationMap({ step, approved }: { step: number; approved: boolean }) {
  const reduced = useReducedMotion();
  const current = approved ? 6 : Math.min(6, Math.max(0, step));
  return <div className="j-preparation-map" aria-label={`Preparação: ${stops[current].name}, etapa ${current + 1} de 7`}>
    <div className="j-preparation-map-heading"><ShieldCheck size={17} /><span>Seu percurso de preparação</span></div>
    <ol>{stops.map(({ name, Icon }, index) => <li key={name} className={index < current || approved ? "is-complete" : index === current ? "is-current" : ""} aria-current={index === current ? "step" : undefined}>
      <span className="j-preparation-connector" aria-hidden="true"><motion.i initial={false} animate={{ transform: `scaleY(${index <= current ? 1 : 0})` }} transition={{ duration: reduced ? 0 : .28, ease: [.22, 1, .36, 1] }} /></span>
      <span className="j-preparation-stop">{index < current || approved ? <Check size={15} /> : <Icon size={15} />}</span><b>{name}</b>
      {index === current && <motion.span className="j-preparation-current" initial={false} animate={{ opacity: 1 }} layoutId="preparation-current" transition={{duration: reduced ? 0 : .18}}>Agora</motion.span>}
    </li>)}</ol>
  </div>;
}

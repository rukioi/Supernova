"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { motionTokens } from "@/lib/motion";
import { BookOpen, ChartNoAxesCombined, ChevronDown, Compass, Gamepad2, Gift, Layers, Settings2, Target, Users } from "lucide-react";

export function DisclosureContent({ open, id, children }: { open: boolean; id: string; children: ReactNode }) {
 const reduce = useReducedMotion();
 return <motion.div id={id} inert={!open} aria-hidden={!open} initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: reduce ? 0 : motionTokens.duration.expansion, ease: motionTokens.ease.standard }} style={{ overflow: "hidden" }}>{children}</motion.div>;
}

export function ModuleSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const id = useId();
  return <section className="module-section"><button className="module-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}><span className="module-number">02</span><span><small>MÓDULO ATUAL · SEQUÊNCIA PEDAGÓGICA</small><strong>{title}</strong></span><ChevronDown style={{ transform: open ? "rotate(180deg)" : "none" }} size={20} /></button><DisclosureContent id={id} open={open}>{children}</DisclosureContent></section>;
}
import { LayoutGroup, motion, useAnimationControls, useReducedMotion } from "motion/react";

export function ContextTransition({ children, identity, className }: { children: ReactNode; identity: string; className?: string }) {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  useEffect(() => {
    controls.stop();
    controls.set({ opacity: reduce ? 1 : .25, y: reduce ? 0 : 14 });
    void controls.start({ opacity: 1, y: 0, transition: { duration: reduce ? 0 : .38, ease: motionTokens.ease.standard } });
  }, [identity, reduce, controls]);
  return <motion.div className={className}
    initial={reduce ? false : { opacity: 1, y: motionTokens.distance.small }}
    animate={controls}
    transition={{ duration: reduce ? 0 : motionTokens.duration.standard, ease: motionTokens.ease.standard }}>{children}</motion.div>;
}

export function LocalTabs({ items, value, onChange, label = "Seções da página" }: { items: string[]; value: string; onChange: (value: string) => void; label?: string }) {
  const id = useId();
  const reduce = useReducedMotion();
  const icons: Record<string,typeof Compass> = {'Visão geral':Compass,Resumo:ChartNoAxesCombined,Aulas:BookOpen,Módulos:Layers,Alunos:Users,Resultados:ChartNoAxesCombined,Recompensas:Gift,Configurações:Settings2,Aprendizagem:Target,Gameplay:Gamepad2,Questões:BookOpen};
  return <LayoutGroup id={id}><div className="se-tabs kinetic-tabs" role="tablist" aria-label={label}>{items.map((item, index) => {const Icon=icons[item]??Compass;return <button
    type="button" key={item} role="tab" aria-selected={value === item} tabIndex={value === item ? 0 : -1}
    className={value === item ? "is-active" : ""} onClick={() => onChange(item)}
    onKeyDown={event => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % items.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = items.length - 1;
      else return;
      event.preventDefault(); onChange(items[next]);
      (event.currentTarget.parentElement?.children[next] as HTMLElement)?.focus();
    }}><Icon size={17} aria-hidden="true"/><span className="kinetic-tab-label">{item}</span>{value === item && <motion.span className="local-tab-indicator" layoutId="indicator" transition={reduce?{duration:0}:{type:'spring',stiffness:350,damping:30}} />}</button>;})}</div></LayoutGroup>;
}

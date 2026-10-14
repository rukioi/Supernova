"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function ModuleSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const id = useId();
  return <section className="module-section"><button className="module-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}><span className="module-number">02</span><span><small>MÓDULO ATUAL · SEQUÊNCIA PEDAGÓGICA</small><strong>{title}</strong></span><ChevronDown style={{ transform: open ? "rotate(180deg)" : "none" }} size={20} /></button><div id={id}><ContextTransition identity={String(open)}>{open && children}</ContextTransition></div></section>;
}
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";

export function ContextTransition({ children, identity, className }: { children: ReactNode; identity: string; className?: string }) {
  const reduce = useReducedMotion();
  return <AnimatePresence mode="wait" initial={false}><motion.div key={identity} className={className}
    initial={{ opacity: 0, transform: reduce ? "none" : "translateY(10px)" }}
    animate={{ opacity: 1, transform: "none" }} exit={{ opacity: 0, transform: reduce ? "none" : "translateY(-6px)" }}
    transition={{ duration: reduce ? 0 : .18, ease: [.22, 1, .36, 1] }}>{children}</motion.div></AnimatePresence>;
}

export function LocalTabs({ items, value, onChange, label = "Seções da página" }: { items: string[]; value: string; onChange: (value: string) => void; label?: string }) {
  const id = useId();
  const reduce = useReducedMotion();
  return <LayoutGroup id={id}><div className="se-tabs" role="tablist" aria-label={label}>{items.map((item, index) => <button
    key={item} role="tab" aria-selected={value === item} tabIndex={value === item ? 0 : -1}
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
    }}>{item}{value === item && <motion.span className="local-tab-indicator" layoutId="indicator" transition={{ duration: reduce ? 0 : .26, ease: [.22, 1, .36, 1] }} />}</button>)}</div></LayoutGroup>;
}

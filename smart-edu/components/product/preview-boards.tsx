"use client";

import { Check, Flag, Search, ShieldCheck, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { ExperienceImage } from "./experience-picker";
import { previewFormats } from "./preview-model";
import type { ExperienceKind } from "./preview-model";

const spring = { type: "spring" as const, stiffness: 240, damping: 30, mass: 0.9 };

export function PreviewBoard({ kind, phase, route, decision, revised, answered, concepts }: {
  kind: ExperienceKind; phase: number; route: number | null; decision: number | null; revised: boolean | null; answered: boolean; concepts: string[];
}) {
  const reduceMotion = useReducedMotion();
  const viewport = useRef<HTMLDivElement>(null);
  const transition = reduceMotion ? { duration: 0 } : spring;
  const step = Math.max(0, Math.min(phase, 5));
  const earnedCount = Number(answered) + Number(decision === 0) + Number(revised === true);
  const conceptsInMap = [concepts[0] || "Conceito", concepts[1] || "Evidência", concepts[2] || "Aplicação", concepts[3] || "Relações", concepts[4] || "Limites", concepts[5] || "Síntese"];
  useEffect(() => {
    const element = viewport.current;
    if (!element || element.scrollWidth <= element.clientWidth) return;
    const defenseIndex = step < 2 ? 0 : step < 4 ? (route === 1 ? 2 : 1) : 2;
    const expeditionIndex = step === 0 ? 0 : step < 3 ? 1 : step < 5 ? 2 : 3;
    const targetX = kind === "defense" ? [96,280,464][defenseIndex] : kind === "territory" ? [100,205,310,415,415,500][step] : [56,184,337,500][expeditionIndex];
    element.scrollTo({ left: Math.max(0, targetX / 560 * element.scrollWidth - element.clientWidth / 2), behavior: reduceMotion ? "instant" : "smooth" });
  }, [kind, step, route, reduceMotion]);

  if (kind === "defense") {
    const earned = [answered, decision === 0, revised === true];
    const target = step < 2 ? 0 : step < 4 ? (route === 1 ? 2 : 1) : 2;
    const currentX = [96, 280, 464][target];
    const names = ["Conceito", "Evidência", "Limites"];
    return <section className="pv-board gm-board" data-board="defense" data-phase={step} aria-label="Mapa tático de defesa">
      <div className="gm-world-art" aria-hidden="true"><ExperienceImage template={previewFormats[kind].name} /></div><div className="pv-board-caption"><ShieldCheck size={16} /><span>Perímetro de evidências</span><b>{earnedCount}/3 posições sustentadas</b></div>
      <div className="gm-map-heading"><strong>Fortificações do argumento</strong><span>Proteja a hipótese com evidências e limites reconhecidos</span></div>
      <div className="gm-map-viewport" ref={viewport} tabIndex={0} role="region" aria-label="Mapa de defesa; deslize para explorar"><svg className="gm-map gm-defense-map" viewBox="0 0 560 270" role="img" aria-label={"Defesa, fase " + (step + 1) + " de 6. Posição em foco: " + names[target]}>
        <path className="gm-terrain" d="M16 220Q68 190 112 211T210 207T314 216T414 200T546 208V260H16Z" />
        <path className="gm-wall" d="M40 190H520" />
        <path className="gm-wall-light" d="M40 190H520" />
        <path className="gm-scout-route" d="M96 54H464" />
        <text x="23" y="58" className="gm-small">SETOR ATUAL</text>
        <motion.circle className="gm-tracker" r="6" cy="54" animate={{ cx: currentX }} transition={transition} />
        {names.map((name, i) => {
          const x = [96, 280, 464][i];
          return <motion.g key={name} className={"gm-fort " + (earned[i] ? "is-earned " : "") + (target === i ? "is-current" : "")} animate={{ transform: target === i && !reduceMotion ? "translateY(-4px)" : "translateY(0px)" }} transition={transition}>
            <path className="gm-fortress" d={"M" + (x-49) + " 188V112H" + (x-35) + "V96H" + (x-20) + "V112H" + (x-7) + "V84H" + (x+8) + "V112H" + (x+22) + "V96H" + (x+37) + "V112H" + (x+49) + "V188Z"} />
            <path className="gm-gate" d={"M" + (x-21) + " 188V158A21 21 0 0 1 " + (x+21) + " 158V188"} />
            <circle className="gm-post-mark" cx={x} cy="135" r="14" />
            <text className="gm-post-number" x={x} y="139" textAnchor="middle">{earned[i] ? "✓" : "0" + (i+1)}</text>
            <text className="gm-label" x={x} y="232" textAnchor="middle">{name}</text>
            <text className="gm-state" x={x} y="248" textAnchor="middle">{earned[i] ? "SUSTENTADO" : target === i ? "EM FOCO" : "A EXPLORAR"}</text>
          </motion.g>;
        })}
        <g className="gm-compass" transform="translate(520 45)"><circle r="16"/><path d="M0-10L4 2 0 0-4 2Z"/></g>
      </svg></div>
      <div className="pv-board-key gm-legend"><span><i className="is-earned"/>Evidência sustentada</span><span><i className="gm-current-key"/>Posição em foco</span><span><i/>Setor a explorar</span></div>
    </section>;
  }

  if (kind === "territory") {
    const names = ["Base"].concat(conceptsInMap);
    const earned = [true, false, false, answered, decision === 0, false, revised === true];
    const coords = [[100,112],[205,61],[205,163],[310,61],[310,163],[415,112],[500,163]];
    const links = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,5],[4,5],[5,6]];
    const active = [0,1,3,5,5,6][step] ?? 0;
    return <section className="pv-board gm-board" data-board="territory" data-phase={step} aria-label="Mapa de territórios de conceitos">
      <div className="gm-world-art" aria-hidden="true"><ExperienceImage template={previewFormats[kind].name} /></div><div className="pv-board-caption"><Flag size={16}/><span>Territórios conectados</span><b>{earnedCount} conexões demonstradas</b></div>
      <div className="gm-map-heading"><strong>Rede de conceitos</strong><span>Expanda a partir da base por relações que a equipe explica</span></div>
      <div className="gm-map-viewport" ref={viewport} tabIndex={0} role="region" aria-label="Mapa de territórios; deslize para explorar"><svg className="gm-map gm-territory-map" viewBox="0 0 560 260" role="img" aria-label={"Mapa de conceitos, fase " + (step+1) + " de 6. Próxima fronteira: " + names[active]}>
        <path className="gm-terrain" d="M16 208Q120 187 212 207T396 204T544 192V254H16Z"/>
        {links.map(([a,b]) => <line key={a + "-" + b} className={"gm-link " + (earned[a] && earned[b] ? "is-earned" : "")} x1={coords[a][0]} y1={coords[a][1]} x2={coords[b][0]} y2={coords[b][1]}/>)}
        {coords.map(([x,y],i) => <motion.g key={i} className={"gm-territory " + (earned[i] ? "is-earned " : "") + (active === i ? "is-current" : "")} animate={{ transform: active === i && !reduceMotion ? "translateY(-3px)" : "translateY(0px)" }} transition={transition}>
          <title>{names[i]}: {earned[i] ? "conectado" : active === i ? "fronteira atual" : "disponível"}</title>
          <path className="gm-hex" d={"M" + x + " " + (y-30) + "L" + (x+26) + " " + (y-15) + "V" + (y+15) + "L" + x + " " + (y+30) + "L" + (x-26) + " " + (y+15) + "V" + (y-15) + "Z"}/>
          <circle className="gm-cell-core" cx={x} cy={y} r="4"/>
          {earned[i] && <path className="gm-check" d={"M" + (x-6) + " " + y + "l4 4 8-9"}/>}
          <text className="gm-label" x={x} y={y+44} textAnchor="middle">{names[i].length > 12 ? names[i].slice(0,11) + "…" : names[i]}</text>
          <text className="gm-state" x={x} y={y+58} textAnchor="middle">{earned[i] ? "CONECTADO" : active === i ? "FRONTEIRA" : "DISPONÍVEL"}</text>
        </motion.g>)}
        <g className="gm-base-seal" transform="translate(100 112)"><circle r="37"/><path d="M-9 7V-3L0-11 9-3V7H3V1H-3V7Z"/></g>
        <text x="23" y="245" className="gm-small">TERRITÓRIO DA EQUIPE</text>
        <g className="gm-compass" transform="translate(520 38)"><circle r="16"/><path d="M0-10L4 2 0 0-4 2Z"/></g>
      </svg></div>
      <div className="pv-board-key gm-legend"><span><i className="is-earned"/>Área conectada</span><span><i className="gm-current-key"/>Próxima fronteira</span><span><i/>Território disponível</span></div>
    </section>;
  }

  const current = step === 0 ? 0 : step < 3 ? 1 : step < 5 ? 2 : 3;
  const nodes = [[56,145],[184,72],[337,145],[500,72]];
  const primary = "M56 145C112 145 112 72 184 72S263 145 337 145S422 72 500 72";
  const branch = "M184 72C232 72 235 207 286 207S316 145 337 145C414 145 420 72 500 72";
  const selectedRoute = route === 1 ? branch : primary;
  const marker = nodes[current];
  return <section className="pv-board gm-board" data-board="expedition" data-phase={step}>
    <div className="gm-world-art" aria-hidden="true"><ExperienceImage template={previewFormats[kind].name} /></div><div className="pv-board-caption"><Search size={16}/><span>Rota de investigação</span><b>{route === null ? "Escolha uma rota" : route === 0 ? "Rota de campo" : "Rota de análise"}</b></div>
    <div className="gm-map-heading"><strong>Expedição de campo</strong><span>Partida · indício · hipótese · síntese</span></div>
    <div className="gm-map-viewport" ref={viewport} tabIndex={0} role="region" aria-label="Rota de investigação; deslize para explorar"><svg className="gm-map gm-expedition-map" viewBox="0 0 560 270" role="img" aria-label={"Expedição, etapa " + (current+1) + " de 4. " + (route === null ? "A rota aguarda escolha." : route === 0 ? "Rota de campo selecionada." : "Rota de análise selecionada.")}>
      <path className="gm-route-bed" d={primary}/>
      <path className={"gm-route-branch " + (route === 1 ? "is-selected" : "")} d={branch}/>
      <motion.path className="gm-route-progress" d={selectedRoute} initial={false} animate={{ pathLength: Math.min(current/3,1) }} transition={transition}/>
      <path className="gm-guide" d="M25 220H530"/>
      {nodes.map(([x,y],i) => <g key={i} className={"gm-checkpoint " + (i < current ? "is-earned " : "") + (i === current ? "is-current" : "")}>
        <motion.circle className="gm-checkpoint-ring" cx={x} cy={y} r="23" initial={false} animate={{ r: i === current ? 29 : 23 }} transition={transition} /><circle className="gm-checkpoint-core" cx={x} cy={y} r="14"/>
        <text className="gm-checkpoint-number" x={x} y={y+4} textAnchor="middle">{i < current ? "✓" : i+1}</text>
        <text className="gm-label" x={x} y={y+44} textAnchor="middle">{["Partida","Indício","Hipótese","Síntese"][i]}</text>
        <text className="gm-state" x={x} y={y+59} textAnchor="middle">{i < current ? "VISITADO" : i === current ? "VOCÊ ESTÁ AQUI" : "CHECKPOINT"}</text>
      </g>)}
      <motion.g className="gm-expedition-marker" initial={false} animate={{ transform: "translate(" + marker[0] + "px," + marker[1] + "px)" }} transition={transition}><circle r="12"/><path d="M0-8L2-1 8 0 2 2 0 8-2 2-8 0-2-1Z"/></motion.g>
      <g className="gm-compass" transform="translate(525 38)"><circle r="16"/><path d="M0-10L4 2 0 0-4 2Z"/></g>
      <text x="25" y="244" className="gm-small">RECURSOS</text>
      <text x="25" y="260" className="gm-label">{decision === null ? "120 disponíveis" : decision === 0 ? "80 restantes" : "40 restantes"}</text>
    </svg></div>
    <div className="pv-board-key gm-legend"><span><i className="is-earned"/>Trecho percorrido</span><span><i className="gm-current-key"/>Posição atual</span><span><i/>Checkpoint adiante</span></div>
  </section>;
}

export function PreviewRuleCards({ kind }: { kind: ExperienceKind }) {
  const reduce = useReducedMotion();
  const entries: Array<[LucideIcon, string, string]> = kind === "expedition" ? [[Search,"Investigue","Leia indícios antes de escolher uma rota."],[Flag,"Decida","Cada investimento muda os recursos disponíveis."],[Check,"Reflita","Explique como a evidência mudou a hipótese."]]
    : kind === "defense" ? [[ShieldCheck,"Formule","Construa uma afirmação que possa ser testada."],[Search,"Confronte","Procure evidências e possíveis contraprovas."],[Check,"Reconstrua","Reconheça limites e revise o argumento."]]
    : [[Flag,"Explore","Escolha uma área conectada à base."],[Search,"Aplique","Demonstre o conceito com um exemplo."],[Check,"Conecte","Negocie conexões com argumentos."]];
  return <div className="pv-rule-cards">{entries.map(([Icon,title,detail]) => <motion.div key={title} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3, delay: reduce ? 0 : entries.findIndex(entry => entry[1] === title) * .07 }}><Icon size={18}/><b>{title}</b><p>{detail}</p></motion.div>)}</div>;
}




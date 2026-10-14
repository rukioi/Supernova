"use client";

/* Local SVG illustrations have explicit dimensions and need no raster optimization. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Clock3, Plus, Play, Sparkles, X } from "lucide-react";
import { product } from "@/lib/demo-data";
import { updateDraft, useStore } from "@/lib/store";

const MotionLink = motion.create(Link);
const assets = ["rainbow", "eyes", "flower"];

export function Workspace({ navigate }: { navigate: (path: string) => void }) {
  const store = useStore();
  const [view, setView] = useState("coleção");
  const [dismissed, setDismissed] = useState(false);
  return <div className="studio-workspace">
    <header className="studio-heading">
      <div><span className="studio-label">SEU ESPAÇO DOCENTE / SEMESTRE 2026.2</span><h1>Bom dia, <span>{store.profile.name.split(" ")[0]}.</span><span className="studio-asterisk" aria-hidden="true">✳</span></h1></div>
      <button className="studio-create" onClick={() => navigate("/preparar-aula")}><Plus size={20} /> Preparar aula <ArrowUpRight size={18} /></button>
    </header>

    <div className="studio-focus-grid">
      <section className="studio-focus">
        <div className="studio-focus-top"><span className="studio-label"><i /> PRONTA PARA ACONTECER</span><span>01 / AULA EM FOCO</span></div>
        <div className="studio-focus-body"><div><p className="studio-hand">hoje tem descoberta.</p><h2>Segmento de<br />Clientes<span className="studio-period">.</span></h2><p className="studio-course-name">{product.className}</p></div><div className="studio-sticker"><img src="/lofty/eyes.svg" alt="" width="101" height="94" /><span>um novo olhar<br />para aprender</span></div></div>
        <div className="studio-focus-meta"><span><Clock3 size={14} /> 19:00 · Sala 204</span><span>38 estudantes</span><span>45 minutos</span></div>
        <div className="studio-focus-footer"><button className="studio-open" onClick={() => navigate("/sessao/sessao-segmento")}><Play size={15} fill="currentColor" /> Abrir sessão <ArrowUpRight size={18} /></button><Link href="/experiencia/segmento-de-clientes">Explorar experiência <ArrowRight size={16} /></Link><span className="studio-approved"><Check size={14} /> Revisada por você</span></div>
      </section>
      <section className="studio-pulse">
        <div className="studio-label">02 / APRENDIZAGEM EM MOVIMENTO <ArrowDownRight size={18} /></div>
        <h2>Pequenos avanços.<br /><span>Novas possibilidades.</span></h2>
        <Link href="/resultados/sessao-segmento" className="studio-metric"><strong>07</strong><span>estudantes concluíram<br />a revisão recomendada</span><ArrowUpRight size={19} /></Link>
        <Link href="/resultados/sessao-segmento" className="studio-metric"><strong>05</strong><span>evoluíram em<br />Segmento de Clientes</span><ArrowUpRight size={19} /></Link>
        <Link href="/resultados/sessao-segmento" className="studio-attention"><span><i /> 3 estudantes precisam de um olhar</span><ArrowRight size={16} /></Link>
        <small>Desde a aula de 30 set · dados de demonstração</small>
      </section>
    </div>

    <section className="studio-classes">
      <div className="studio-section-title"><div><span className="studio-label">CONTINUIDADE COMEÇA AQUI</span><h2>Suas turmas<span>({product.classes.length.toString().padStart(2, "0")})</span></h2></div><div className="studio-view-switch" aria-label="Visualização das turmas">{["coleção", "lista"].map(item => <button key={item} aria-pressed={view === item} onClick={() => setView(item)}>{item}</button>)}</div></div>
      <div className={`studio-collection ${view === "lista" ? "is-list" : ""}`}>{product.classes.map((course, index) => <MotionLink layout="position" transition={{ layout: { duration: .32, ease: [.22, 1, .36, 1] } }} href={`/turmas/${course.id}`} className={`studio-course studio-course-${index % 3}`} key={course.id}>
        <div className="studio-course-top"><span>0{index + 1} / {course.course}</span><ArrowUpRight size={23} /></div>
        <div className="studio-course-art" aria-hidden="true"><span>{["EXPLORE", "CONECTE", "CONSTRUA"][index % 3]}</span><img src={`/lofty/${assets[index % 3]}.svg`} alt="" width="130" height="110" /></div>
        <h3>{course.name}</h3><div className="studio-course-info"><span>{course.students} estudantes</span><span>{course.period.split(" · ")[0]}</span></div>
        <div className="studio-course-footer"><span><i /> {index === 0 ? "Experiência pronta" : "Em planejamento"}</span><span>{course.next}</span></div>
      </MotionLink>)}</div>
    </section>

    <motion.div className="studio-bottom-grid" initial={{opacity:.5}} whileInView={{opacity:1}} viewport={{once:true,amount:.1}} transition={{duration:.3}}>
      <section className="studio-agenda"><div className="studio-section-title"><div><span className="studio-label">NO SEU RADAR</span><h2>Próximos encontros</h2></div><span className="studio-month">OUT / 2026</span></div>
        {[["02", "SEX", "Segmento de Clientes", "19:00", "/sessao/sessao-segmento"], ["05", "SEG", "Posicionamento de marca", "19:00", `/turmas/${product.classes[1].id}`], ["06", "TER", "Do escopo à entrega", "20:40", `/turmas/${product.classes[2].id}`]].map(([day, weekday, title, time, href], index) => <Link className="studio-agenda-row" href={href} key={day}><span className={`studio-day ${index === 0 ? "is-today" : ""}`}><b>{day}</b><small>{weekday}</small></span><span><b>{title}</b><small>{product.classes[index].name}</small></span><time>{time}</time><ArrowUpRight size={19} /></Link>)}
      </section>
      <section className="studio-draft"><span className="studio-label">AINDA NO SEU CADERNO <span>01</span></span><h2>Ideias que estão<br />ganhando forma.</h2><div className="studio-draft-title"><span className="studio-draft-dot" /><h3>{store.draft.title}</h3></div><p>{store.draft.mapApproved ? "Mapa aprovado. Hora de revisar a experiência." : "Continue definindo o contexto e os objetivos."}</p><div className="studio-draft-progress" aria-label={`Etapa ${store.draft.step + 1} de 7`}>{Array.from({ length: 7 }, (_, i) => <i key={i} className={i <= store.draft.step ? "done" : ""} />)}</div><Link href="/preparar-aula">Continuar preparação <ArrowUpRight size={18} /></Link></section>
    </motion.div>
    {!dismissed && <aside className="studio-copilot"><div className="studio-copilot-icon"><Sparkles size={23} /></div><div><span className="studio-label">UM OLHAR A MAIS · SUGESTÃO DA IA</span><p>Usuário e comprador ainda se confundem para a turma. <strong>Que tal abrir a próxima aula com uma verificação?</strong></p><small>Fonte: sessão de 30 set · 27 respostas. Você decide o próximo passo.</small></div><button onClick={() => { updateDraft({ title: "Reforço: usuário e comprador", intention: "Consolidar", step: 0 }); navigate("/preparar-aula"); }}>Levar para a aula <ArrowUpRight size={17} /></button><button className="studio-dismiss" aria-label="Dispensar sugestão" onClick={() => setDismissed(true)}><X size={17} /></button></aside>}
    <footer className="studio-footer"><span>smart edu<span className="studio-footer-star">✳</span></span><span>Ensinar é criar possibilidades.</span><small>ESPAÇO DOCENTE · 2026.2</small></footer>
  </div>;
}

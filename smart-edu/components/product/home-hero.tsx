"use client";

import { ArrowUpRight, Check, Compass, Medal, Pause, Play, Plus, Users } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useActiveCourse } from "@/lib/navigation";
import { useStore } from "@/lib/store";
import { lessons, demoSessions } from "@/lib/learning-data";
import { JourneyButton, preparationProgress } from "./journey-ui";

export function HomeHero({ onPrepare }: { onPrepare: () => void }) {
  const store = useStore();
  const course = useActiveCourse();
  const reduce = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  if (!course) return null;
  const draft = store.draft.classId === course.id ? store.draft : undefined;
  const sequence = lessons.filter(lesson => lesson.classId === course.id);
  const completed = sequence.filter(lesson => lesson.sessionId).length;
  const team = demoSessions.filter(session => session.classId === course.id).at(-1)?.gameplay[0];
  const percent = draft ? preparationProgress(draft) : 0;
  const selected = sequence.find(lesson => lesson.id === selectedId) ?? sequence.find(lesson => !lesson.sessionId) ?? sequence.at(-1);

  return <section className="j-home-hero" aria-labelledby="home-hero-title">
    <div className="j-home-grid-pattern" aria-hidden="true" />
    <div className="j-home-hero-heading">
      <div className="j-home-hero-copy">
        <span className="j-home-kicker"><Compass size={15} /> ESPAÇO DOCENTE · MÓDULO {course.id === "empreendedorismo" ? "02" : "01"}</span>
        <h1 id="home-hero-title"><span className="hero-word-mask"><motion.span initial={reduce?false:{y:'105%',rotate:3}} animate={{y:0,rotate:0}} transition={{duration:.7,ease:[.16,1,.3,1]}}>APRENDER</motion.span></span><em className="hero-word-mask"><motion.span initial={reduce?false:{y:'110%',rotate:3}} animate={{y:0,rotate:0}} transition={{duration:.7,delay:reduce?0:.1,ease:[.16,1,.3,1]}}>É AVANÇAR.</motion.span></em></h1>
        <p>Uma boa pergunta abre caminhos. Sua próxima experiência começa aqui.</p>
        <JourneyButton onClick={onPrepare}><Plus size={18} />Preparar experiência</JourneyButton>
      </div>
      <div className="j-home-hero-stage kinetic-world">
        <span className="world-orbit world-orbit-one" aria-hidden="true"/><span className="world-orbit world-orbit-two" aria-hidden="true"/>
        <motion.div className="world-island" initial={reduce?false:{opacity:0,scale:.86,y:25}} animate={{opacity:1,scale:1,y:reduce||paused?0:[0,-10,0]}} transition={{opacity:{duration:.6},scale:{duration:.8,ease:[.16,1,.3,1]},y:reduce||paused?{duration:.2}:{duration:6,repeat:Infinity,ease:'easeInOut'}}}><Image src="/experiences/expedicao-estrategica.webp" alt="Ilha de expedição com caminhos, portais e uma bandeira no destino" width={800} height={450} priority/></motion.div>
        <motion.button type="button" className="j-floating-card j-floating-card-mission" initial={reduce?false:{opacity:0,x:30,rotate:0}} animate={{opacity:1,x:0,rotate:-5}} whileHover={reduce?undefined:{rotate:0,y:-7}} whileTap={reduce?undefined:{scale:.98}} transition={{type:'spring',stiffness:180,damping:20}} onClick={onPrepare} aria-label={`Preparar ${draft?.title ?? "próxima aula"}`}>
          <span className="j-floating-icon"><Compass size={20} /></span>
          <small>PRÓXIMA EXPEDIÇÃO</small>
          <b>{draft?.title ?? "Uma nova descoberta"}</b>
          <span>{course.name}</span>
          <i aria-hidden="true"><span style={{ width: `${percent}%` }} /></i>
          <span>{percent}% preparada{draft ? ` · ${draft.duration} min` : ""}</span>
        </motion.button>
        <span className="j-floating-streak"><Users size={15} />{course.students} estudantes</span>
        {team && <motion.div className="j-floating-card j-floating-card-team" initial={reduce?false:{opacity:0,y:20,rotate:0}} animate={{opacity:1,y:0,rotate:4}} transition={{duration:.5,delay:reduce?0:.18}}>
          <span className="j-team-emblem"><Medal size={22} /></span>
          <span><small>EQUIPE EM MOVIMENTO</small><b>{team.team}<strong>{team.xp.toLocaleString("pt-BR")} XP</strong></b><i>Sessão de demonstração</i></span>
        </motion.div>}
        <span className="world-caption">O CONHECIMENTO ABRE CAMINHOS <ArrowUpRight size={17}/></span>
        <button className="world-motion-toggle" onClick={()=>setPaused(value=>!value)} aria-label={paused?'Retomar movimento do cenário':'Pausar movimento do cenário'}>{paused?<Play size={13}/>:<Pause size={13}/>}</button>
      </div>
    </div>
    {sequence.length > 0 && <div className="j-mission-selector">
      <div className="j-mission-stops" role="group" aria-label="Explorar etapas da jornada">{sequence.map((lesson, index) => <button key={lesson.id} type="button" aria-pressed={selected?.id === lesson.id} onClick={() => setSelectedId(lesson.id)} className={lesson.sessionId ? "is-complete" : index === completed ? "is-next" : ""} title={lesson.title}><span>{lesson.sessionId ? <Check size={16} /> : String(index + 1).padStart(2, "0")}</span><small>{lesson.title}</small></button>)}</div>
      {selected && <motion.div className="j-mission-context" key={selected.id} initial={reduce ? false : { opacity: .5, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .18 }}><span><small>{selected.sessionId ? "ETAPA CONCLUÍDA · DEMONSTRAÇÃO" : "NO HORIZONTE · PLANEJAMENTO"}</small><b>{selected.title}</b></span><Link href={selected.sessionId ? `/resultados/${selected.sessionId}` : `/aulas?turma=${course.id}&aula=${selected.id}`}>{selected.sessionId ? "Ver descobertas" : "Explorar aula"}<ArrowUpRight size={17} /></Link></motion.div>}
    </div>}
    <div className="j-hero-bottom"><span>DO CONCEITO À DECISÃO</span><div className="j-hero-checkpoints" aria-label={`${completed} de ${sequence.length} aulas realizadas`}>{sequence.map((lesson, index) => <i key={lesson.id} className={lesson.sessionId ? "is-done" : index === completed ? "is-current" : ""} />)}</div><span>{String(completed).padStart(2, "0")} <small>/ {String(sequence.length).padStart(2, "0")} AULAS</small></span></div>
  </section>;
}

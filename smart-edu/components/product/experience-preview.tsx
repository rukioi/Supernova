"use client";

import { useId, useState, type ReactNode } from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Compass, Flag, GraduationCap, Monitor, Pause, Play, RotateCcw, ShieldCheck, Users, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { JourneyButton } from "./journey-ui";
import { ContextTransition } from "./editorial-motion";
import { ExperienceImage } from "./experience-picker";
import { PreviewBoard, PreviewRuleCards } from "./preview-boards";
import { kinds, kindFromTemplate, previewFormats, previewPhases, type ExperienceKind, type Perspective, type PreviewQuestion } from "./preview-model";
import { useStore } from "@/lib/store";
import { product } from "@/lib/demo-data";

const formatIcons = { expedition: Compass, defense: ShieldCheck, territory: Flag };
const perspectives = ["Aluno", "Telão", "Professor"] as const;
const perspectiveIcons = { Aluno: Users, Telão: Monitor, Professor: GraduationCap };
const perspectiveNotes = { Aluno: "Progresso de equipe e feedback formativo.", Telão: "Visão coletiva. Respostas e justificativas individuais ficam privadas.", Professor: "Objetivos, evidências e intervenção sob seu controle." };

function ControlSection({ title, detail, children, className = "" }: { title: string; detail?: string; children: ReactNode; className?: string }) {
  return <section className={`pv-control-section ${className}`}><h3>{title}</h3>{detail && <p>{detail}</p>}{children}</section>;
}

function ChoiceCards({ options, value, onChange, label }: { options: readonly (readonly [string, string])[]; value: number | null; onChange: (value: number) => void; label: string }) {
  const id = useId();
  const reduce = useReducedMotion();
  return <RadioGroup value={value === null ? "" : String(value)} onValueChange={next => onChange(Number(next))} aria-label={label} className="pv-choices">
    {options.map(([title, detail], index) => <motion.label whileTap={reduce ? undefined : { scale: .985 }} animate={{ y: value === index && !reduce ? -3 : 0 }} transition={{ type: "spring", stiffness: 420, damping: 28 }} htmlFor={`${id}-${index}`} key={title} className={value === index ? "is-selected" : ""}><span className="pv-choice-letter" aria-hidden="true">{String.fromCharCode(65+index)}</span><RadioGroupItem id={`${id}-${index}`} value={String(index)} aria-label={title} /><span><b>{title}</b><small>{detail}</small></span>{value === index && <Check className="pv-choice-check" size={18} aria-hidden="true" />}</motion.label>)}
  </RadioGroup>;
}

function Feedback({ title, children, caution = false }: { title: string; children: ReactNode; caution?: boolean }) {
  const reduce = useReducedMotion();
  return <motion.div initial={reduce ? false : { opacity: 0, y: 12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 360, damping: 26 }} className={`pv-feedback${caution ? " is-caution" : ""}`} role="status"><CheckCircle2 size={18} /><div><b>{title}</b><p>{children}</p></div></motion.div>;
}

function Simulation({ kind, audience, phase, onPhaseChange, questions, objectives, mode, reward }: {
  kind: ExperienceKind; audience: Perspective; phase: number; onPhaseChange: (phase: number) => void;
  questions: PreviewQuestion[]; objectives: string[]; mode: string; reward: string;
}) {
  const reduceMotion = useReducedMotion();
  const format = previewFormats[kind];
  const [answer, setAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [route, setRoute] = useState<number | null>(null);
  const [decision, setDecision] = useState<number | null>(null);
  const [justification, setJustification] = useState("");
  const [decisionConfirmed, setDecisionConfirmed] = useState(false);
  const [revised, setRevised] = useState<boolean | null>(null);
  const [reflection, setReflection] = useState("");
  const [paused, setPaused] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];
  const correct = submitted && answer === question?.correct;
  const collective = audience === "Telão";
  const individual = mode === "Individual";
  const regionId = useId();
  const checkpointReward = Number(reward.match(/(\d+)\s*XP/i)?.[1] ?? 100);
  const scoringEnabled = /XP/i.test(reward);
  const score = scoringEnabled ? checkpointReward * (Number(correct) + Number(decisionConfirmed && decision === 0) + Number(revised === true)) : 0;
  const conceptWords = question?.concept.toLocaleLowerCase("pt-BR").split(/\s+/).filter(word => word.length >= 4) ?? [];
  const activeObjective = objectives.find(objective => conceptWords.some(word => objective.toLocaleLowerCase("pt-BR").includes(word.slice(0,4))));
  const reset = () => {
    setAnswer(null); setSubmitted(false); setRoute(null); setDecision(null); setJustification("");
    setDecisionConfirmed(false); setRevised(null); setReflection(""); setQuestionIndex(0); setPaused(false); onPhaseChange(0);
  };
  const nextQuestion = () => { setQuestionIndex((questionIndex+1)%questions.length); setAnswer(null); setSubmitted(false); };
  const transitionKey = `${kind}-${phase}-${audience}`;
  return <motion.section className={`pv-stage pv-${kind} pv-audience-${audience}`} aria-label={`${format.name} · ${previewPhases[phase]}`} data-phase={previewPhases[phase]} initial={reduceMotion ? false : { opacity: 0.78, transform: "translateY(6px)" }} animate={{ opacity: 1, transform: "none" }} transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [.22,1,.36,1] }}>
    <div className="pv-stage-top"><span className="pv-stage-emblem">{(() => { const Icon = formatIcons[kind]; return <Icon size={22} />; })()}</span><div><span className="pv-eyebrow">{format.short}</span><h2>{format.name}</h2></div><span className="pv-simulation-tag">Simulação</span></div>
    <div className="pv-stage-strip"><span>{individual ? "Seu percurso" : "Equipe Horizonte"}</span><span>{format.mechanic}</span><b>{String(phase+1).padStart(2,"0")} / 06</b></div>
    <div className="pv-mission-hud"><div><span>Missão em andamento</span><strong>{previewPhases[phase]}</strong></div><div><span>Checkpoints demonstrados</span><strong>{Number(correct)+Number(decisionConfirmed && decision === 0)+Number(revised === true)}<small> / 3</small></strong></div><div><span>{scoringEnabled ? "Conquista na prévia" : "Modo da experiência"}</span><strong>{scoringEnabled ? `${score} XP` : "Formativo"}</strong></div></div><div className="pv-mission-progress" role="progressbar" aria-label="Fase do percurso" aria-valuemin={1} aria-valuemax={6} aria-valuenow={phase+1}><motion.span initial={false} animate={{ scaleX: (phase+1)/6 }} transition={{ duration: reduceMotion ? 0 : .55, ease: [.22,1,.36,1] }} /></div>
    <PreviewBoard kind={kind} phase={phase} route={route} decision={decisionConfirmed ? decision : null} revised={revised} answered={correct} concepts={[...new Set(questions.map(item => item.concept))]} />
    {audience === "Professor" && <aside className="pv-teacher-note"><div><GraduationCap size={17} /><b>Intenção pedagógica</b><JourneyButton variant="secondary" onClick={() => setPaused(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />}{paused ? "Retomar simulação" : "Pausar e explicar"}</JourneyButton></div><p>{phase === 1 && question ? activeObjective ?? `Confira o alinhamento de ${question.concept} com os objetivos aprovados.` : objectives[0] ?? "Defina e aprove os objetivos no mapa pedagógico."}</p><small>{decisionConfirmed ? `Justificativa registrada na prévia: ${justification}` : "Observe a justificativa e os limites do argumento. A pontuação não comprova domínio."}</small></aside>}
    <div className="pv-phase-body" role="region" aria-labelledby={regionId} aria-busy={false}>
      <ContextTransition identity={transitionKey}>
        <div className="pv-phase-heading"><span className="pv-eyebrow">{previewPhases[phase]} · {format.verbs[phase]}</span><h3 id={regionId}>{format.headings[phase]}</h3></div>
        {phase === 0 && <><p className="pv-phase-description">{format.goal}</p><PreviewRuleCards kind={kind} /><div className="pv-mission-objective"><span>Objetivo desta aula</span><b>{objectives[0] ?? "O objetivo será exibido após a aprovação do mapa."}</b></div><div className="pv-team-ready"><Users size={18} /><span>{individual ? "Percurso individual, sem comparação pública." : "Equipes de 4 · discutam antes de confirmar uma decisão."}</span></div></>}
        {phase === 1 && (question ? <>
          <div className="pv-question-context"><span>{question.concept}</span><span>Questão {questionIndex+1} de {questions.length}</span></div>
          <h4 className="pv-question-text">{question.text}</h4>
          {collective ? <><ol className="pv-collective-options">{question.options.map((option,index) => <li key={index}><span>{String.fromCharCode(65+index)}</span>{option}</li>)}</ol><p className="pv-phase-description">Conversem em equipe e respondam no dispositivo de vocês. O telão não revela respostas individuais.</p></> : <>
            <ChoiceCards options={question.options.map((option,index) => [option, `Alternativa ${String.fromCharCode(65+index)}`] as const)} value={answer} label="Alternativas da questão" onChange={next => { setAnswer(next); setSubmitted(false); }} />
            <div className="pv-inline-actions"><JourneyButton variant="primary" disabled={answer === null || paused} onClick={() => setSubmitted(true)}>Confirmar resposta <Check size={15} /></JourneyButton>{questions.length > 1 && <JourneyButton variant="secondary" onClick={nextQuestion}>Outra questão do rascunho <ArrowRight size={15} /></JourneyButton>}</div>
            {submitted && <Feedback title={correct ? "Conceito reconhecido. Agora aplique." : "Um ponto para revisar."} caution={!correct}>{question.explanation}</Feedback>}
          </>}
          <small className="pv-question-source">Fonte do rascunho: {question.source}</small>
        </> : <div className="pv-empty"><h4>Nenhuma questão selecionada.</h4><p>Volte à etapa Conteúdo e selecione os desafios que deseja testar na experiência.</p></div>)}
        {phase === 2 && <><p className="pv-phase-description">{kind === "expedition" ? "O recurso inicial é limitado. Escolha como investigar o conceito antes de investir no próximo passo." : kind === "defense" ? "A hipótese precisa de apoio verificável e de limites claros. Escolha onde concentrar o trabalho da equipe." : "A base já está no mapa. Escolha que tipo de conexão a equipe quer demonstrar antes de expandir."}</p>{!collective ? <ChoiceCards options={format.options} value={route} onChange={setRoute} label={kind === "expedition" ? "Rotas de investigação" : kind === "defense" ? "Pilares de defesa" : "Áreas de expansão"} /> : <div className="pv-public-note">A turma compara caminhos; cada equipe registra sua escolha no próprio dispositivo.</div>}{route !== null && !collective && <Feedback title="Plano de ação escolhido">{format.options[route][1]} {kind === "expedition" ? "Essa rota será usada na decisão de investimento." : kind === "defense" ? "Esse pilar orienta o próximo teste da hipótese." : "Essa área orienta a justificativa da próxima conquista."}</Feedback>}</>}
        {phase === 3 && <><p className="pv-phase-description">{route === null ? "Escolha uma estratégia e explique o raciocínio da equipe." : `Plano escolhido: ${format.options[route][0]}. Agora transforme a estratégia em uma ação.`}</p>{!collective ? <>
          <ChoiceCards options={format.decisions} value={decision} onChange={next => { setDecision(next); setDecisionConfirmed(false); }} label="Decisão da equipe" />
          <label className="pv-text-field"><span>{individual ? "Explique sua decisão" : "Justificativa da equipe"}</span><textarea value={justification} onChange={event => { setJustification(event.target.value); setDecisionConfirmed(false); }} placeholder="Que conceito ou evidência sustenta essa escolha?" rows={3} /></label>
          <JourneyButton variant="primary" disabled={decision === null || !justification.trim() || paused} onClick={() => setDecisionConfirmed(true)}>Confirmar decisão <Check size={15} /></JourneyButton>
          {decisionConfirmed && decision !== null && <Feedback title="Consequência da sua escolha" caution={decision !== 0}>{format.consequences[decision]}</Feedback>}
        </> : <div className="pv-public-note"><b>Uma decisão precisa de uma justificativa.</b><p>As equipes registram seu argumento no dispositivo. O professor acompanha antes de avançar.</p></div>}</>}
        {phase === 4 && <><div className="pv-event"><span className="pv-event-icon">{kind === "expedition" ? <Compass size={24} /> : kind === "defense" ? <ShieldCheck size={24} /> : <Flag size={24} />}</span><div><b>{kind === "expedition" ? "Indício inesperado" : kind === "defense" ? "Contraprova" : "Fronteira compartilhada"}</b><p>{format.event}</p></div></div>
          {decisionConfirmed && decision !== null && <p className="pv-phase-description">{decision === 0 ? "Sua escolha anterior deixou evidências para comparar com o novo cenário." : "A escolha anterior deixou uma lacuna. Use o novo cenário para retomar a evidência que faltou."}</p>}
          {!collective ? <><ChoiceCards options={[[kind === "territory" ? "Comparar e colaborar" : "Revisar com a nova evidência", kind === "territory" ? "Negociar a conexão com base nos argumentos das duas equipes." : "Reconhecer a limitação e reformular a hipótese."],[kind === "territory" ? "Disputar só por pontos" : "Manter sem investigar", "Ignorar os argumentos e seguir com a escolha inicial."]]} value={revised === null ? null : revised ? 0 : 1} onChange={next => setRevised(next === 0)} label="Resposta ao evento" />{revised !== null && <Feedback title={revised ? "O percurso incorporou uma nova evidência." : "A lacuna permanece aberta."} caution={!revised}>{revised ? "A revisão preserva o que foi aprendido e reconhece o limite da decisão anterior." : "Retome o argumento: que evidência permitiria defender essa decisão?"}</Feedback>}</> : <p className="pv-phase-description">Momento de discussão coletiva. Comparem as evidências antes da próxima fase.</p>}
        </>}
        {phase === 5 && <><p className="pv-phase-description">O percurso terminou. Agora separe a conquista no jogo da compreensão demonstrada.</p><div className="pv-result-grid"><div><span>Conquista no jogo</span><b>{scoringEnabled ? `${score} XP` : reward}</b><small>{scoringEnabled ? `${checkpointReward} XP por checkpoint nesta prévia` : "O foco permanece nas evidências"}</small></div><div><span>Evidências de aprendizagem</span><b>{Number(submitted)+Number(decisionConfirmed)+Number(revised !== null)} registros</b><small>Resposta, justificativa e revisão</small></div></div><ul className="pv-evidence-list"><li><span>Conceito</span><b>{submitted ? correct ? "Resposta correta; verificar aplicação" : "Retomar o feedback da questão" : "Ainda não testado"}</b></li><li><span>Aplicação</span><b>{decisionConfirmed ? decision === 0 ? "Decisão com evidência e justificativa" : "A escolha deixou uma lacuna de evidência" : "Ainda não registrada"}</b></li><li><span>Revisão</span><b>{revised === null ? "Ainda não registrada" : revised ? "Nova evidência considerada" : "Hipótese mantida; precisa de discussão"}</b></li></ul>
          {!collective && <label className="pv-text-field"><span>{format.reflection}</span><textarea rows={3} value={reflection} onChange={event => setReflection(event.target.value)} placeholder="Registre o que mudou e o que você quer revisar." /></label>}
          <div className="pv-public-note"><b>Próximo passo de aprendizagem</b><p>{revised === false || (submitted && !correct) ? "Revisitar o conceito com um novo exemplo e comparar os argumentos antes de repetir o desafio." : "Aplicar o conceito em outro contexto e verificar se a justificativa se mantém."} O professor decide como conduzir o reforço.</p></div>
        </>}
      </ContextTransition>
    </div>
    {paused && <div className="pv-paused" role="status"><Pause size={15} />Simulação pausada pelo professor para discussão.</div>}
    <footer className="pv-stage-footer"><JourneyButton variant="secondary" onClick={reset}><RotateCcw size={14} />Reiniciar</JourneyButton><span>{individual ? "Seu progresso" : "Aprendizagem em equipe"}</span><JourneyButton variant="primary" disabled={paused || phase === 5} onClick={() => onPhaseChange(Math.min(5,phase+1))}>{phase === 0 ? "Entrar na experiência" : phase === 5 ? "Percurso concluído" : "Próxima fase"}<ArrowRight size={15} /></JourneyButton></footer>
  </motion.section>;
}

export function ExperiencePreview() {
  const { draft, classes } = useStore();
  const [kind, setKind] = useState<ExperienceKind>(() => kindFromTemplate(draft.template));
  const [audience, setAudience] = useState<Perspective>("Aluno");
  const [phase, setPhase] = useState(0);
  const id = useId();
  const format = previewFormats[kind];
  const pool = draft.questions.length ? draft.questions : product.questions;
  const questions = draft.selectedQuestionIds !== undefined ? pool.filter(question => draft.selectedQuestionIds?.includes(question.id)) : pool.slice(0,12);
  const objectives = draft.mapApproved ? draft.objectives.map(objective => objective.title) : [];
  const mode = draft.mode === "Equipes" ? "Equipes colaborativas" : draft.mode;
  const className = classes.find(item => item.id === draft.classId)?.name ?? product.className;
  return <MotionConfig reducedMotion="user"><div className="pv-workbench">
    <div className="pv-context"><span>{className}</span><b>{draft.title}</b><span>{draft.duration} min planejados</span></div>
    <div className="pv-layout">
      <div className="pv-main"><ControlSection className="pv-phase-control" title="Simular fase" detail="Explore o percurso ou avance dentro da experiência."><ol className="pv-phase-list">{previewPhases.map((item,index) => <li key={item}><button className={phase === index ? "is-active" : phase > index ? "is-visited" : ""} aria-current={phase === index ? "step" : undefined} onClick={() => setPhase(index)}><span className="pv-phase-number">{phase > index ? <Check size={13} /> : String(index+1).padStart(2,"0")}</span><span><b>{item}</b><small>{format.verbs[index]}</small></span>{phase === index && <motion.span layoutId={`${id}-phase-cursor`} className="pv-current-dot" transition={{ type: "spring", stiffness: 360, damping: 30 }} />}</button></li>)}</ol></ControlSection><Simulation key={kind} kind={kind} audience={audience} phase={phase} onPhaseChange={setPhase} questions={questions} objectives={objectives} mode={mode} reward={draft.reward} /><p className="pv-sandbox-note"><ShieldCheck size={14} />Respostas, pontos e escolhas são locais à prévia. A publicação continua sob sua decisão.</p></div>
      <aside className="pv-controls" aria-label="Controles da prévia">
        <ControlSection title="Perspectiva" detail="Adapte o que é exibido."><RadioGroup className="pv-perspectives" value={audience} onValueChange={next => setAudience(next as Perspective)} aria-label="Perspectiva">{perspectives.map(item => { const Icon = perspectiveIcons[item]; return <label key={item} htmlFor={`${id}-${item}`} className={audience === item ? "is-selected" : ""}><RadioGroupItem value={item} id={`${id}-${item}`} className="pv-visually-hidden" aria-label={item} /><Icon size={16} />{item}</label>; })}</RadioGroup><small className="pv-perspective-note">{perspectiveNotes[audience]}</small></ControlSection>

        <ControlSection title="Formato de experiência" detail="A troca altera somente esta visualização."><RadioGroup className="pv-format-list" value={kind} onValueChange={next => { setKind(next as ExperienceKind); setPhase(0); }} aria-label="Formato de experiência">{kinds.map(item => { const Icon = formatIcons[item]; return <label className={`pv-format pv-format-${item}${kind === item ? " is-selected" : ""}`} key={item} htmlFor={`${id}-${item}`}><ExperienceImage template={previewFormats[item].name} className="pv-format-art" /><Icon size={19} /><span><b>{previewFormats[item].name}</b><small>{previewFormats[item].mechanic}</small></span><RadioGroupItem id={`${id}-${item}`} value={item} aria-label={previewFormats[item].name} /></label>; })}</RadioGroup></ControlSection>
        <ControlSection title="Estrutura pedagógica"><dl className="pv-structure"><div><dt>Objetivos aprovados</dt><dd>{objectives.length}</dd></div><div><dt>Questões selecionadas</dt><dd>{questions.length}</dd></div><div><dt>Modo</dt><dd>{mode}</dd></div></dl>{objectives.length > 0 && <details className="pv-objectives"><summary>Ver objetivos da aula</summary><ol>{objectives.map((objective,index) => <li key={index}>{objective}</li>)}</ol></details>}{!draft.mapApproved && <p className="pv-pending">Aprove o mapa na preparação para validar os objetivos.</p>}</ControlSection>
      </aside>
    </div>
  </div></MotionConfig>;
}

export function ExperiencePreviewDialog({ open, onOpenChange, onReturnFocus }: { open: boolean; onOpenChange: (open: boolean) => void; onReturnFocus?: () => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="pv-dialog" showCloseButton={false} onCloseAutoFocus={event => { if (onReturnFocus) { event.preventDefault(); onReturnFocus(); } }}><header className="pv-dialog-header"><div><span className="pv-eyebrow">Revisão · prévia interativa</span><DialogTitle>Visualizar experiência</DialogTitle><DialogDescription>Teste o percurso com as questões da aula antes de aprovar.</DialogDescription></div><DialogClose className="pv-close" aria-label="Fechar prévia"><X size={20} /></DialogClose></header><div className="pv-dialog-body"><ExperiencePreview /></div><footer className="pv-dialog-footer"><span>Você mantém a decisão pedagógica.</span><DialogClose asChild><JourneyButton variant="secondary"><ArrowLeft size={15} />Voltar à revisão</JourneyButton></DialogClose></footer></DialogContent></Dialog>;
}

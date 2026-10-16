"use client";
import {resolveStudent, resolveSession, demoSessions, summarize} from "@/lib/learning-data";
import {JourneyEmpty,PageIntro} from "@/components/product/journey-ui";
import {useProductPathname, useUrlState} from "@/lib/navigation";
import { MotionConfig } from "motion/react";


import { AppSelect } from "@/components/product/app-select";
import { ExperienceImage, ExperiencePicker } from "@/components/product/experience-picker";
import { ContextTransition } from "@/components/product/editorial-motion";
import { AnimatedTabs as LocalTabs } from "@/components/ui/animated-tabs";
import { ClassDetail as OtherClassDetail } from "@/components/product/classes";
import { Classes } from "@/components/product/journey-classes";
import { ProductShell } from "@/components/product/product-shell";
import { Workspace } from "@/components/product/journey-workspace";
import { LessonsJourney } from "@/components/product/journey-lessons";
import { JourneyButton, StateBadge } from "@/components/product/journey-ui";
import { JourneyResults } from "@/components/product/journey-results";
import { MaterialLibrary } from "@/components/product/material-library";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
const ExperiencePreview = dynamic(() => import("@/components/product/experience-preview").then((module) => module.ExperiencePreview), { loading: () => <Loading /> });
const ExperiencePreviewDialog = dynamic(() => import("@/components/product/experience-preview").then(module => module.ExperiencePreviewDialog));
import {
  Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, 
  Check, CheckCircle2, ChevronLeft, ChevronRight, 
  Clock3, Eye,  
   LockKeyhole,
  Pause, Play, Plus, Search, Settings2, ShieldCheck, Sparkles, Users,
} from "lucide-react";
import { product, students } from "@/lib/demo-data";
import type { Objective as StoredObjective, Question as StoredQuestion } from "@/data/model";
import { updateDraft, updateStore, useStore } from "@/lib/store";

type Toast = { title: string; detail?: string } | null;
const phases = ["Lobby", "Pergunta", "Movimento", "Decisão", "Evento", "Resultado"];
const steps = ["Contexto", "Material e escopo", "Mapa pedagógico", "Experiência", "Conteúdo", "Revisão", "Pronta"];
const cx = (...names: Array<string | false | undefined>) => names.filter(Boolean).join(" ");

const subscribeHydration = () => () => {};
function PreparedWizard(props: Parameters<typeof Wizard>[0]) {
  const ready = useSyncExternalStore(subscribeHydration, () => true, () => false);
  return ready ? <Wizard {...props} /> : <Loading />;
}

function Button({ children, variant = "secondary", size = "md", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "positive" | "secondary" | "ghost" | "danger"; size?: "sm" | "md";
}) {
  return <JourneyButton {...props} variant={variant} className={cx(`j-button-${size}`, className)}>{children}</JourneyButton>;
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <StateBadge tone={tone === "teal" ? "success" : tone === "indigo" ? "action" : tone === "amber" ? "attention" : "neutral"}>{children}</StateBadge>;
}

function Panel({ children, className = "", flush = false }: { children: React.ReactNode; className?: string; flush?: boolean }) {
  return <section className={cx("se-panel", !flush && "se-panel-pad", className)}>{children}</section>;
}

function PanelHeading({ title, detail, action }: { title: string; detail?: string; action?: React.ReactNode }) {
  return <div className="se-panel-heading"><div><h2>{title}</h2>{detail && <p>{detail}</p>}</div>{action}</div>;
}

function PageTitle({ kicker,title, detail, action }: { kicker: string; title: React.ReactNode; detail?: string; action?: React.ReactNode }) {
  return <PageIntro eyebrow={kicker} title={title} description={detail??''} action={action}/>;
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  return <span className={`se-avatar se-avatar-${size}`} aria-hidden="true">{name.split(" ").slice(0, 2).map((part) => part[0]).join("")}</span>;
}

function Progress({ value, tone = "teal" }: { value: number; tone?: "teal" | "indigo" | "amber" }) {
  return <span className={`se-progress se-progress-${tone}`}><i style={{ transform: `scaleX(${Math.max(0,Math.min(100,value))/100})` }} /></span>;
}

function Roster({ notify }: { navigate?: (path: string) => void; notify: (toast: Toast) => void }) {
  const [query, setQuery] = useUrlState("aluno", "");
  const [filter, setFilter] = useUrlState("aprendizagem", "Todos");
  const [sort, setSort] = useState<"name" | "participation" | "progress">("name");
  const [direction, setDirection] = useState(1);
  const rows = useMemo(() => students.filter((student) => `${student.name} ${student.enrollment}`.toLowerCase().includes(query.toLowerCase()) && (filter === "Todos" || student.state === filter)).sort((a, b) => String(a[sort]).localeCompare(String(b[sort]), "pt-BR", { numeric: true }) * direction), [query, filter, sort, direction]);
  const changeSort = (key: typeof sort) => { setDirection(sort === key ? -direction : 1); setSort(key); };
  return <><div className="se-toolbar se-roster-toolbar"><label className="se-search-field"><Search key="search" size={16} aria-hidden="true" /><input aria-label="Buscar aluno ou matrícula" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar aluno ou matrícula…" /></label><AppSelect value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filtrar aprendizagem"><option>Todos</option><option>Consolidado</option><option>Quase consolidado</option><option>Em desenvolvimento</option><option>Não avaliado</option></AppSelect><Button type="button" size="sm" onClick={() => notify({ title: "Relatório da turma preparado", detail: "A lista atual pode ser revisada antes de exportar." })}>Exportar lista</Button></div><p className="se-roster-scroll-hint" id="se-roster-scroll-hint">Role horizontalmente para consultar todas as colunas.</p><div className="se-table-wrap" role="region" aria-label="Lista de alunos" aria-describedby="se-roster-scroll-hint" tabIndex={0}><table className="se-table"><caption className="sr-only">Alunos e indicadores de aprendizagem desta turma</caption><thead><tr><th scope="col"><button type="button" aria-label={`Ordenar por aluno${sort === "name" ? direction === 1 ? ", crescente" : ", decrescente" : ""}`} onClick={() => changeSort("name")}>Aluno <ArrowDown size={12} aria-hidden="true" /></button></th><th scope="col">Matrícula</th><th scope="col"><button type="button" aria-label={`Ordenar por participação${sort === "participation" ? direction === 1 ? ", crescente" : ", decrescente" : ""}`} onClick={() => changeSort("participation")}>Participação <ArrowDown size={12} aria-hidden="true" /></button></th><th scope="col">Presença</th><th scope="col"><button type="button" aria-label={`Ordenar por progresso${sort === "progress" ? direction === 1 ? ", crescente" : ", decrescente" : ""}`} onClick={() => changeSort("progress")}>Progresso <ArrowDown size={12} aria-hidden="true" /></button></th><th scope="col">Aprendizagem</th><th scope="col">Última atividade</th><th scope="col">Revisão</th></tr></thead><tbody>{rows.map((student) => <tr key={student.id}><td><span className="se-person"><Avatar name={student.name} size="sm" /><Link href={`/turmas/${product.classId}/alunos/${student.id}`}>{student.name}</Link></span></td><td>{student.enrollment}</td><td>{student.participation}%</td><td>{student.attendance}%</td><td><span className="se-table-progress"><Progress value={student.progress} /><b>{student.progress}%</b></span></td><td><Badge tone={student.state === "Consolidado" ? "teal" : student.state === "Quase consolidado" ? "indigo" : "amber"}>{student.state}</Badge></td><td>{student.lastActivity}</td><td><Badge tone={student.review === "Revisar" ? "amber" : "neutral"}>{student.review}</Badge></td></tr>)}</tbody></table>{rows.length === 0 && <div className="se-empty" role="status"><Users size={22} aria-hidden="true" /><b>Nenhum aluno encontrado</b><span>Ajuste a busca ou os filtros.</span></div>}</div><div className="se-table-footer" role="status" aria-live="polite">Exibindo {rows.length} de {product.studentCount} estudantes <span>Os mesmos registros são usados nas evidências individuais.</span></div></>;
}

function StudentProfile({ classId, studentId }: { classId: string; studentId: string; navigate: (path: string) => void; notify: (toast: Toast) => void }) {
  const student = resolveStudent(classId, studentId);
  if (!student) return <JourneyEmpty title="Aluno não encontrado" description="O aluno não existe ou não pertence a esta turma."><Link href={`/turmas/${classId}?tab=Alunos`}>Voltar à turma</Link></JourneyEmpty>;
  const sessions = demoSessions.filter(session=>session.classId===classId);
  return <><Link className="se-back-link" href={`/turmas/${classId}?tab=Alunos`}><ArrowLeft size={15}/>Voltar à turma</Link><PageTitle kicker="PERFIL DE APRENDIZAGEM" title={student.name} detail={`${student.enrollment} · dados de demonstração`}/><p className="notice">Respostas simuladas. Acerto e participação apoiam a interpretação docente e não constituem uma nota de aprendizagem.</p><div className="lab-chart-grid">{sessions.map(session=>{const metric=summarize(session,undefined,studentId);return <Panel key={session.id}><PanelHeading title={session.title} detail={session.date.split('-').reverse().join('/')}/><div className="se-stats-strip"><div><b>{metric.accuracy===null?'—':`${metric.accuracy}%`}</b><small>acerto nas respostas</small></div><div><b>{metric.responses}</b><small>respostas registradas</small></div></div>{session.objectives.map(objective=>{const evidence=summarize(session,objective.id,studentId);return <div className="lab-objectives" key={objective.id}><Link href={`/resultados/${session.id}?estudante=${studentId}&objetivo=${objective.id}&tab=Questões`}><b>{objective.title}</b><p>{evidence.accuracy===null?'Sem evidência':`${evidence.accuracy}% de acerto · ${evidence.responses} respostas`}</p></Link></div>;})}<JourneyButton href={`/resultados/${session.id}?estudante=${studentId}&tab=Questões`}>Explorar respostas desta sessão<ArrowRight size={16}/></JourneyButton></Panel>;})}</div></>;
}

function ClassDetail({ navigate, notify }: { navigate: (path: string) => void; notify: (toast: Toast) => void }) {
  const store=useStore();const pathname=useProductPathname();const course=store.classes.find(c=>c.id===pathname.split('/')[2]);
  const [tab,setTab]=useUrlState('tab','Visão geral');
  if(!course)return <JourneyEmpty title="Turma não encontrada" description="Escolha outra turma para continuar."/>;
  const sessions=demoSessions.filter(session=>session.classId===course.id);
  return <><PageTitle kicker="CONTEXTO DA TURMA" title={course.name} detail={`${course.course} · ${course.period} · demonstração local`} action={<Button variant="primary" onClick={()=>navigate('/preparar-aula')}><Plus size={16}/>Preparar aula</Button>}/><LocalTabs items={['Visão geral','Aulas','Alunos','Resultados']} value={tab} onChange={setTab}/><ContextTransition identity={tab}>{tab==='Alunos'?<Panel flush><Roster notify={notify}/></Panel>:tab==='Aulas'?<LessonsJourney navigate={navigate} compact/>:tab==='Resultados'?<Results navigate={navigate} notify={notify} compact/>:<div className="lab-chart-grid"><Panel><PanelHeading title="Jornada do módulo" detail={course.module}/><p>{sessions.length} aulas realizadas · {course.students} estudantes matriculados</p><LessonList navigate={navigate} compact/></Panel><div className="se-column"><Panel><PanelHeading title="Sessões e evidências" detail="Demonstração · respostas simuladas"/>{sessions.map(session=>{const metric=summarize(session);return <Link className="j-context-row" key={session.id} href={`/resultados/${session.id}`}><div><h3>{session.title}</h3><p>{metric.participants} participantes · {metric.accuracy}% de acerto</p></div><ArrowUpRight size={20}/></Link>;})}</Panel><Panel><PanelHeading title="Alunos no contexto"/><p>Explore as respostas individuais para interpretar dificuldades e planejar a próxima intervenção.</p><Button onClick={()=>setTab('Alunos')}>Consultar alunos<Users size={16}/></Button></Panel></div></div>}</ContextTransition></>;
}

function LessonList({ navigate, compact = false }: { navigate: (path: string) => void; compact?: boolean }) {
  return <LessonsJourney navigate={navigate} compact={compact} />;
}

function Results({ navigate, notify, compact = false }: { navigate: (path: string) => void; notify: (toast: Toast) => void; compact?: boolean }) {
 return <JourneyResults navigate={navigate} notify={notify} compact={compact} roster={<Roster navigate={navigate} notify={notify}/>}/>;
}
function Wizard({ navigate, notify }: { navigate: (path: string) => void; notify: (toast: Toast) => void }) {
  const stored = useStore();
  const draft = stored.draft;
  const [step, setStep] = useState(Math.max(1, draft.step || 1));
  const [approved, setApproved] = useState(draft.mapApproved);
  const [experienceApproved, setExperienceApproved] = useState(draft.approved);
  const [previewed, setPreviewed] = useState(draft.previewed);
  const [previewOpen, setPreviewOpen] = useState(false);
  const previewTrigger = useRef<HTMLButtonElement>(null);
  const [reviewed, setReviewed] = useState(draft.reviewed);
  const [template, setTemplate] = useState(draft.template);
  const [mode, setMode] = useState(draft.mode === "Equipes" ? "Equipes colaborativas" : draft.mode);
  const [lessonName, setLessonName] = useState(draft.title);
  const linkedMaterial = stored.materials.find(m => draft.materialIds?.includes(m.id));
  const [file, setFile] = useState(linkedMaterial?.name ?? "BMC_Segmento_de_Clientes.pdf");
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>(product.objectives.map((item) => item.id));
  const [objectiveTitles, setObjectiveTitles] = useState<Record<string, string>>(() => Object.fromEntries(product.objectives.map((item) => [item.id, item.title])));
  const [editingObjective, setEditingObjective] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Array<(typeof product.questions)[number]>>(() => draft.questions.length ? draft.questions.map((question) => ({ ...question, objective: `Objetivo: ${question.concept}`, answers: question.options })) : product.questions);
  const [plannedQuestionIds, setPlannedQuestionIds] = useState<string[]>(() => draft.selectedQuestionIds?.length ? draft.selectedQuestionIds : (draft.questions.length ? draft.questions : product.questions).slice(0, 12).map((question) => question.id));
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [questionDraft, setQuestionDraft] = useState("");
  const [regeneratingQuestion, setRegeneratingQuestion] = useState<string | null>(null);
  const updateStep = (next: number) => { const value = Math.max(1, Math.min(7, next)); setStep(value); updateDraft({ step: value }, false); window.scrollTo({ top: 0, behavior: "instant" }); };
  const advance = () => { if (step === 3 && !approved) { notify({ title: "Aprove o mapa pedagógico para continuar." }); return; } if (step === 6 && !reviewed) { notify({ title: "Confirme a revisão docente antes de aprovar." }); return; } if (step === 6 && !previewed) { notify({ title: "Visualize a experiência antes da aprovação." }); return; } if (step === 6 && !experienceApproved) { notify({ title: "A aprovação da experiência é uma decisão docente." }); return; } updateStep(step + 1); };
  const setApproval = () => {
    const objectives: StoredObjective[] = product.objectives.filter((item) => selectedObjectives.includes(item.id)).map((item) => ({ id: item.id, title: objectiveTitles[item.id] ?? item.title, concept: item.title, prerequisite: "Conhecimentos iniciais sobre problemas e clientes", confusion: item.id === "obj-3" ? "Quem usa a solução pode não ser quem decide a compra." : "Confundir uma suposição com evidência observável.", source: `${file || "Material selecionado"} · pág. ${8 + Number(item.id.slice(-1)) * 2}–${11 + Number(item.id.slice(-1)) * 2}`, status: objectiveTitles[item.id] === item.title ? "Aprovado pelo professor" : "Editado pelo professor" }));
    setApproved(true); updateDraft({ mapApproved: true, objectives }, false); notify({ title: "Mapa pedagógico aprovado por você", detail: "A aprovação ficou registrada no rascunho." });
  };
  const chooseTemplate = (value: string) => { setTemplate(value); updateStore((current) => ({ ...current, draft: { ...current.draft, template: value, approved: false, reviewed: false, previewed: false } })); setExperienceApproved(false); setPreviewed(false); setReviewed(false); };
  const changeLessonName = (value: string) => { setLessonName(value); updateDraft({ title: value }, true); setApproved(false); setExperienceApproved(false); setPreviewed(false); };
  const changeObjectiveTitle = (id: string, value: string) => { setObjectiveTitles((current) => ({ ...current, [id]: value })); setApproved(false); setExperienceApproved(false); updateDraft({ mapApproved: false }, false); };
  const toggleObjective = (id: string) => { const next = selectedObjectives.includes(id) ? selectedObjectives.filter((item) => item !== id) : [...selectedObjectives, id]; setSelectedObjectives(next); setApproved(false); updateDraft({ mapApproved: false }, false); };
  const changeMode = (value: string) => { setMode(value); updateStore((current) => ({ ...current, draft: { ...current.draft, mode: value, approved: false, reviewed: false, previewed: false } })); setExperienceApproved(false); setReviewed(false); setPreviewed(false); };
  const saveQuestions = (next: Array<(typeof product.questions)[number]>) => {
    setQuestions(next);
    const selected = plannedQuestionIds.filter((id) => next.some((question) => question.id === id));
    setPlannedQuestionIds(selected);
    const saved: StoredQuestion[] = next.map((question) => ({ id: question.id, text: question.text, options: question.answers, correct: question.correct, explanation: question.explanation, concept: question.concept, source: question.source, difficulty: question.difficulty, status: question.status }));
    updateStore((current) => ({ ...current, draft: { ...current.draft, questions: saved, selectedQuestionIds: selected, approved: false, reviewed: false, previewed: false } }));
    setExperienceApproved(false); setReviewed(false); setPreviewed(false);
  };
  const togglePlannedQuestion = (id: string) => {
    const next = plannedQuestionIds.includes(id) ? plannedQuestionIds.filter((item) => item !== id) : [...plannedQuestionIds, id];
    setPlannedQuestionIds(next);
    updateStore((current) => ({ ...current, draft: { ...current.draft, selectedQuestionIds: next, approved: false, reviewed: false, previewed: false } }));
    setExperienceApproved(false); setReviewed(false); setPreviewed(false);
  };
  const addQuestion = () => {
    const source = questions[0];
    if (!source) return;
    const nextId = `q-extra-${questions.length + 1}`;
    const added = { ...source, id: nextId, text: "Nova questão sugerida: que evidência ajudaria a validar este segmento de clientes?", status: "Sugestão da IA" as const };
    saveQuestions([...questions, added]);
    notify({ title: "Questão adicionada ao rascunho", detail: "Revise a pergunta e selecione se ela entra nesta sessão." });
  };
  const editQuestion = (id: string) => {
    if (editingQuestion === id) {
      saveQuestions(questions.map((question) => question.id === id ? { ...question, text: questionDraft.trim() || question.text, status: "Editado pelo professor" } : question));
      setEditingQuestion(null);
      notify({ title: "Edição do professor registrada", detail: "Revise a pergunta antes de aprovar a experiência." });
      return;
    }
    const question = questions.find((item) => item.id === id);
    if (question) { setQuestionDraft(question.text); setEditingQuestion(id); }
  };
  const regenerateQuestion = (id: string) => {
    const question = questions.find((item) => item.id === id);
    if (!question || regeneratingQuestion) return;
    setRegeneratingQuestion(id);
    window.setTimeout(() => {
      saveQuestions(questions.map((item) => item.id === id ? { ...item, text: `Nova sugestão para revisão: ${item.text.replace(/^Nova sugestão para revisão: /, "")}`, status: "Sugestão da IA" } : item));
      setRegeneratingQuestion(null);
      notify({ title: "Nova sugestão pronta", detail: "Revise o texto e a fonte antes de aprovar." });
    }, 650);
  };
  const content = (() => {
    if (step === 1) return <><h2>O que você pretende trabalhar nesta aula?</h2><p>Defina o contexto antes de planejar a experiência.</p><div className="se-form-grid"><label>Turma<AppSelect value={draft.classId} onChange={(event) => updateDraft({ classId: event.target.value, module: stored.classes.find(course => course.id === event.target.value)?.module ?? draft.module }, true)}>{stored.classes.map((course) => <option value={course.id} key={course.id}>{course.name} · {course.course} · {course.students} alunos</option>)}</AppSelect></label><label>Módulo<AppSelect value={draft.module} onChange={(event) => updateDraft({ module: event.target.value }, true)}>{stored.classes.map((course) => <option value={course.module} key={course.id}>{course.module}</option>)}</AppSelect></label><label className="se-field-wide">Nome da aula<input value={lessonName} onChange={(event) => changeLessonName(event.target.value)} /></label><label>Duração planejada<AppSelect value={draft.duration} onChange={(event) => updateDraft({ duration: event.target.value }, true)}><option value="45">45 minutos</option><option value="40">40 minutos</option><option value="50">50 minutos</option><option value="60">60 minutos</option></AppSelect></label><label>Intenção de aprendizagem<AppSelect value={draft.intention} onChange={(event) => updateDraft({ intention: event.target.value }, true)}><option>Introduzir</option><option>Praticar</option><option>Revisar</option><option>Diagnosticar</option><option>Consolidar</option><option>Avaliar</option></AppSelect></label><label className="se-field-wide">O que a turma deve conseguir fazer ao final?<textarea defaultValue="Definir para quem o problema é mais relevante e distinguir usuário de comprador." /></label></div></>;
    if (step === 2) return <><h2>Conecte as fontes ao planejamento.</h2><p>Adicione arquivos pela biblioteca. O conteúdo original fica disponível neste navegador. A extração automática de PDF, slides e documentos ainda não está conectada.</p><Button onClick={()=>navigate('/materiais')}>Abrir biblioteca de materiais<ArrowUpRight size={16}/></Button><div className="se-scope-list">{stored.materials.map(material=><label key={material.id}><input type="checkbox" checked={draft.materialIds?.includes(material.id)??false} onChange={event=>{const ids=event.target.checked?[...(draft.materialIds??[]),material.id]:(draft.materialIds??[]).filter(id=>id!==material.id);setFile(event.target.checked?material.name:'');updateDraft({materialIds:ids,mapApproved:false,objectives:[],questions:[],scopes:stored.materials.filter(m=>ids.includes(m.id)).map(m=>({id:`scope-${m.id}`,title:m.name,source:m.name,selected:true}))});setApproved(false);}}/><span><b>{material.name}</b><small>{material.storage?'Arquivo original disponível':'Referência de demonstração · somente metadados'}</small></span></label>)}</div><p className="notice">O mapa e as questões sugeridos nas próximas etapas são exemplos de demonstração. Revise e substitua pelo conteúdo das suas fontes antes de usar em aula.</p></>;
    if (step === 3) return <><div className="se-wizard-note"><ShieldCheck size={17} /><span><b>IA sugere. Você revisa.</b><small>Cada objetivo abaixo mostra sua fonte no material. Edite, remova ou reorganize antes da aprovação.</small></span></div><h2>Confira o mapa pedagógico.</h2><p>As sugestões serão usadas para orientar desafios e interpretar evidências nesta aula.</p>{product.objectives.map((objective) => { const included = selectedObjectives.includes(objective.id); const edited = objectiveTitles[objective.id] !== objective.title; return <div className="se-suggestion-row" key={objective.id}><input type="checkbox" checked={included} onChange={() => toggleObjective(objective.id)} aria-label={`Incluir ${objective.title}`} /><div>{editingObjective === objective.id ? <input className="se-inline-edit" autoFocus value={objectiveTitles[objective.id] ?? objective.title} onChange={(event) => changeObjectiveTitle(objective.id, event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") setEditingObjective(null); if (event.key === "Escape") { setObjectiveTitles((current) => ({ ...current, [objective.id]: objective.title })); setEditingObjective(null); } }} /> : <b>{objectiveTitles[objective.id] ?? objective.title}</b>}<p>{objective.id === "obj-1" ? "Reconhecer oportunidades a partir de problemas observáveis." : objective.id === "obj-2" ? "Agrupar potenciais clientes pelo problema e contexto de uso." : objective.id === "obj-3" ? "Separar quem utiliza a solução de quem compra ou decide." : "Expressar uma suposição de valor que possa ser testada."}</p><small className="se-source">Fonte: {file || "material selecionado"} · pág. {8 + Number(objective.id.slice(-1)) * 2}–{11 + Number(objective.id.slice(-1)) * 2}</small></div><div className="se-suggestion-actions"><Badge tone={approved ? "teal" : edited ? "amber" : "indigo"}>{approved ? "✓ Aprovado por você" : edited ? "Editado pelo professor" : "Sugestão da IA"}</Badge><Button size="sm" onClick={() => { setApproved(false); setEditingObjective(editingObjective === objective.id ? null : objective.id); }} aria-label={`${editingObjective === objective.id ? "Concluir edição" : "Editar objetivo"}`}>{editingObjective === objective.id ? <Check size={14} /> : <Settings2 size={14} />}</Button></div></div>; })}<div className={cx("se-approval-gate", approved && "is-approved")}>{approved ? <CheckCircle2 size={18} /> : <LockKeyhole size={18} />}<span><b>{approved ? "Mapa aprovado pelo professor" : "Gate de aprovação docente"}</b><small>{approved ? "Aprovado por Helena Andrade · clique para revogar se quiser editar." : "A IA sugeriu; a decisão de aprovar continua com você. A aula não será publicada automaticamente."}</small></span>{approved ? <Button size="sm" onClick={() => { setApproved(false); updateDraft({ mapApproved: false }, false); notify({ title: "Aprovação revogada" }); }}>Revogar</Button> : <Button variant="positive" size="sm" onClick={setApproval}><Check size={15} /> Aprovar mapa</Button>}</div></>;
    if (step === 4) return <><h2>Escolha como o conhecimento vira oportunidade.</h2><p>O formato de jogo organiza decisões e interações. O mapa aprovado continua orientando a aprendizagem.</p><div className="se-experience-recommendation"><Sparkles size={15} /><span><b>Sugestão pedagógica</b> · Expedição Estratégica combina com prática em equipe e checkpoints curtos.</span><Button variant="ghost" size="sm" onClick={() => chooseTemplate("Expedição Estratégica")}>Usar sugestão</Button></div><ExperiencePicker value={template} onChange={chooseTemplate} /><Panel><PanelHeading title="Configuração da experiência" detail="Ajustes pedagógicos essenciais. Detalhes técnicos ficam avançados." /><div className="se-form-grid"><label>Modo<AppSelect value={mode} onChange={(event) => changeMode(event.target.value)}><option>Equipes colaborativas</option><option>Individual</option><option>Equipes competitivas</option></AppSelect></label><label>Duração estimada<AppSelect value={`${draft.duration} minutos`} onChange={(event) => updateDraft({ duration: event.target.value.split(" ")[0], approved: false }, false)}><option>40 minutos</option><option>45 minutos</option><option>50 minutos</option></AppSelect></label><label>Intensidade competitiva<AppSelect value={draft.competition} onChange={(event) => updateDraft({ competition: event.target.value, approved: false }, false)}><option>Baixa</option><option>Moderada</option><option>Alta</option></AppSelect></label><label>Recompensa<AppSelect value={draft.reward} onChange={(event) => updateDraft({ reward: event.target.value, approved: false }, false)}><option>XP por aprendizagem e colaboração</option><option>XP por participação</option><option>150 XP por checkpoint</option></AppSelect></label></div><details className="se-advanced"><summary>Configurações avançadas</summary><p>Interação entre equipes · velocidade competitiva · acessibilidade da experiência.</p></details></Panel></>;
    if (step === 5) return <><div className="se-step-metrics"><div><b>{questions.length}</b><small>questões sugeridas</small></div><div><b>{plannedQuestionIds.length}</b><small>previstas na sessão</small></div><div><b>{Math.max(0, questions.length - plannedQuestionIds.length)}</b><small>reservas</small></div></div><div className="se-wizard-subhead"><div><h2>Revise os desafios da experiência.</h2><p>Confira objetivo, conceito e fonte. Edite ou remova qualquer sugestão.</p></div><Button size="sm" onClick={addQuestion}><Plus size={14} /> Adicionar questão</Button></div>{questions.map((question, index) => <article className="se-question-card" key={question.id}><div className="se-question-top"><label className="se-question-plan"><input type="checkbox" checked={plannedQuestionIds.includes(question.id)} onChange={() => togglePlannedQuestion(question.id)} /> Incluir nesta sessão</label><Badge tone={index === 1 ? "amber" : "teal"}>{question.difficulty}</Badge><div><Button size="sm" onClick={() => editQuestion(question.id)}>{editingQuestion === question.id ? "Salvar edição" : "Editar"}</Button><Button size="sm" disabled={regeneratingQuestion !== null} onClick={() => regenerateQuestion(question.id)}>{regeneratingQuestion === question.id ? "Gerando…" : "Regenerar"}</Button><Button size="sm" variant="ghost" onClick={() => { saveQuestions(questions.filter((item) => item.id !== question.id)); notify({ title: "Questão removida do rascunho" }); }}>Remover</Button></div></div>{editingQuestion === question.id ? <textarea className="se-question-edit" value={questionDraft} onChange={(event) => setQuestionDraft(event.target.value)} aria-label="Editar enunciado da questão" /> : <b>{question.text}</b>}<small>{question.objective} · {question.concept}</small><div className="se-answer-grid">{question.answers.map((answer, answerIndex) => <span key={answer} className={answerIndex === question.correct ? "is-correct" : ""}>{String.fromCharCode(65 + answerIndex)} · {answer}{answerIndex === question.correct && <Check size={13} />}</span>)}</div><span className="se-source">Fonte: {question.source} · <Badge tone={question.status === "Editado pelo professor" ? "amber" : "indigo"}>{question.status}</Badge><button className="se-source-action" onClick={() => notify({ title: "Fonte do material", detail: question.source })}>Ver fonte</button></span></article>)}</>;
    if (step === 6) return <><h2>Faça uma última revisão.</h2><p>Revise o resumo, a cobertura dos objetivos e a separação entre gameplay e aprendizagem.</p><figure className="se-review-experience"><ExperienceImage template={template} className="se-review-experience-image" /><figcaption>{template}</figcaption></figure><div className="se-review-grid">{[["Aula", lessonName], ["Turma", stored.classes.find((course) => course.id === draft.classId)?.name ?? product.className], ["Objetivos", `${selectedObjectives.length} selecionados`], ["Template", template], ["Modo", mode], ["Duração estimada", `${draft.duration} minutos`], ["Questões", `${plannedQuestionIds.length} previstas · ${Math.max(0, questions.length - plannedQuestionIds.length)} reservas`], ["Tema", "Expedição · Horizonte"], ["Recompensa", draft.reward]].map(([label, value]) => <div key={label}><small>{label}</small><b>{value}</b></div>)}</div><label className="se-review-check"><input type="checkbox" checked={reviewed} onChange={(event) => { setReviewed(event.target.checked); updateDraft({ reviewed: event.target.checked, approved: false }, false); setExperienceApproved(false); }} /><span><b>Revisei a cobertura, os materiais e os parâmetros da experiência.</b><small>Esta confirmação é registrada como revisão feita pelo professor.</small></span></label><div className="se-coverage-alert"><span>!</span><div><b>Objetivo 3 possui apenas duas questões de cobertura.</b><small>Você pode editar a cobertura ou aprovar sabendo desta limitação.</small></div><Button size="sm" onClick={() => updateStep(5)}>Editar questões</Button></div><div className="se-approval-gate is-approved"><ShieldCheck size={18} /><span><b>Você mantém a decisão final</b><small>O copiloto destaca lacunas. Ele não aprova, agenda ou publica a experiência.</small></span><Button size="sm" onClick={event => { previewTrigger.current = event.currentTarget; setPreviewed(true); updateDraft({ previewed: true }, false); setPreviewOpen(true); }}>Visualizar experiência <Eye size={14} /></Button></div><Button variant={experienceApproved ? "secondary" : "primary"} onClick={() => { if (!reviewed || !previewed) { notify({ title: !reviewed ? "Confirme sua revisão antes de aprovar." : "Visualize a experiência antes de aprovar." }); return; } const next = !experienceApproved; setExperienceApproved(next); updateDraft({ approved: next, reviewed: true, previewed: true }, false); notify({ title: next ? "Experiência aprovada por você" : "Aprovação revogada", detail: "A sessão só inicia quando você decidir." }); }}>{experienceApproved ? <><CheckCircle2 size={15} /> Aprovada por você · Revogar</> : <><Check size={15} /> Aprovar experiência</>}</Button></>;
    return <><div className="se-ready-mark"><CheckCircle2 size={27} /></div><h2>A experiência está pronta para sua aula.</h2><p>Mapa pedagógico e experiência aprovados por você. Publicação e início continuam sob seu controle.</p><div className="se-ready-summary"><b>{lessonName}</b><span>{product.className} · {template} · 45 min · 12 questões revisadas</span><Badge tone="teal">APROVADA PELO PROFESSOR</Badge></div><div className="se-ready-actions"><Button onClick={event => { previewTrigger.current = event.currentTarget; setPreviewOpen(true); }}>Visualizar experiência</Button><Button variant="primary" onClick={() => navigate("/sessao/sessao-segmento")}><Play size={15} /> Iniciar sessão simulada</Button></div></>;
  })();
  return <><ExperiencePreviewDialog open={previewOpen} onOpenChange={setPreviewOpen} onReturnFocus={() => previewTrigger.current?.focus()} /><PageTitle kicker="PREPARAÇÃO DE AULA" title={<>DA IDEIA<br/><em>À EXPERIÊNCIA.</em></>} detail="Construa a experiência em etapas. Seu rascunho fica salvo neste navegador." action={<Badge tone="teal"><CheckCircle2 size={13} /> Rascunho salvo</Badge>} /><div className="se-wizard-layout"><nav className="se-stepper" aria-label="Etapas da preparação">{steps.map((label, index) => <button key={label} aria-current={step === index + 1 ? "step" : undefined} className={cx(step === index + 1 && "is-active", step > index + 1 && "is-complete")} onClick={() => index < 2 || approved || index < step ? updateStep(index + 1) : notify({ title: "Conclua a etapa anterior primeiro." })}><span>{step > index + 1 ? <Check size={13} /> : String(index + 1).padStart(2, "0")}</span>{label}</button>)}</nav><Panel className="se-wizard-panel"><ContextTransition identity={String(step)} className="se-wizard-content">{content}</ContextTransition><div className="se-wizard-footer"><Button disabled={step === 1} onClick={() => updateStep(step - 1)}><ChevronLeft size={15} /> Voltar</Button><span>Etapa {step} de 7</span><Button variant="primary" onClick={step === 7 ? () => navigate("/app") : advance}>{step === 7 ? "Concluir" : "Continuar"} {step < 7 && <ChevronRight size={15} />}</Button></div></Panel></div></>;
}

function Preview({ navigate }: { navigate: (path: string) => void }) {
  const ready = useSyncExternalStore(subscribeHydration, () => true, () => false);
  if (!ready) return <Loading />;
  return <><PageTitle kicker="EXPERIÊNCIA / VISUALIZAÇÃO" title={<>CONHECER. JOGAR.<br/><em>EVOLUIR.</em></>} detail="Explore perspectivas, fases e formatos com o conteúdo da aula." action={<Button onClick={() => navigate("/preparar-aula")}><ArrowLeft size={14} /> Voltar à preparação</Button>} /><ExperiencePreview /></>;
}

function Session({ notify, navigate }: { notify: (toast: Toast) => void; navigate: (path: string) => void }) {
  const [phase, setPhase] = useState(1);
  const [running, setRunning] = useState(true);
  const [participants, setParticipants] = useState(28);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [ended, setEnded] = useState(false);
  const respond = (action: string) => notify({ title: action, detail: "Nenhuma decisão foi tomada automaticamente." });
  return <><div className="se-session-header"><div><div className="se-kicker">SESSÃO AO VIVO · {ended ? "ENCERRADA PELO PROFESSOR" : running ? "EM ANDAMENTO" : "PAUSADA PELO PROFESSOR"}</div><h1>Segmento de Clientes</h1><p>{product.className} · Expedição Estratégica · sala de aula simulada</p></div><div><Badge tone={running && !ended ? "teal" : "amber"}><i className="se-live-dot" />{ended ? "Encerrada" : running ? "Conectado" : "Pausada"}</Badge><Button onClick={() => { setEnded(true); setRunning(false); notify({ title: "Sessão encerrada por Helena", detail: "Evidências simuladas permanecem disponíveis para análise." }); }}>Encerrar sessão</Button></div></div><div className="se-session-toolbar"><Badge tone="indigo">FASE {phase} DE 6 · {phases[phase - 1]}</Badge><span><Clock3 size={14} /> {String(8 + phase).padStart(2, "0")}:42 · duração planejada 45 min</span><span><Users size={14} /> {participants} / 38 participantes</span><Badge tone="teal"><i className="se-live-dot" /> Simulação local</Badge></div><div className="se-session-grid"><div className="se-column"><section className="se-live-game"><div className="se-live-heading"><span><small>FACULDADE HORIZONTE · EXPEDIÇÃO ESTRATÉGICA</small><b>{phases[phase - 1]} · Checkpoint {Math.min(phase, 4)}</b></span><Badge tone="amber">AO VIVO</Badge></div><div className="se-live-question"><Badge tone="indigo">OBJETIVO 3 · DECISÃO</Badge><h2>Quem precisa ser ouvido antes de validar esta hipótese de cliente?</h2><div className="se-live-answers"><div><span>A</span> Usuários que encontram o problema <b style={{ width: "31%" }} /></div><div className="is-popular"><span>B</span> Quem autoriza e paga pela solução <b style={{ width: "54%" }} /></div><div><span>C</span> Quem já conhece o produto <b style={{ width: "10%" }} /></div><div><span>D</span> O maior grupo disponível <b style={{ width: "5%" }} /></div></div><small className="se-live-count">27 respostas recentes · os números são dados de demonstração</small></div><div className="se-live-footer"><span>Equipes Horizonte · Farol · Prisma</span><span>{running && !ended ? "Respostas chegando · simulação determinística" : "A sessão foi pausada pelo professor"}</span></div></section><Panel><PanelHeading title="O que a turma está demonstrando?" detail="Evidências de compreensão · evolução em relação ao diagnóstico." action={<Badge tone="teal">+12 pp</Badge>} />{[["Segmentação", 78], ["Usuário x comprador", phase === 2 ? 44 : 49], ["Early adopter", 69]].map(([label, value]) => <div className="se-learning-live" key={label}><span>{label}</span><Progress value={Number(value)} tone={Number(value) < 50 ? "amber" : "teal"} /><b>{value}%</b></div>)}</Panel><Panel className="se-session-controls"><div><b>Controles do professor</b><small>Avançar ou intervir não altera a seleção pedagógica.</small></div><div className="se-control-buttons"><Button onClick={() => { setRunning(!running); respond(running ? "Sessão pausada por você" : "Sessão retomada por você"); }}>{running ? <><Pause size={14} /> Pausar</> : <><Play size={14} /> Continuar</>}</Button><Button onClick={() => { setPhase((current) => Math.min(6, current + 1)); setParticipants((current) => Math.min(38, current + 2)); notify({ title: "Fase avançada pelo professor", detail: "Participação e evidências atualizadas no cenário simulado." }); }}>Avançar fase <ArrowRight size={14} /></Button><Button onClick={() => respond("Questão pulada pelo professor")}>Pular questão</Button><Button onClick={() => respond("Questão invalidada por você; respostas mantidas para consulta")}>Invalidar questão</Button></div></Panel></div><div className="se-column"><Panel className="se-live-copilot"><PanelHeading title="Copiloto ao vivo" detail="Possível dificuldade detectada." action={!alertDismissed && <Badge tone="amber">PARA VOCÊ AVALIAR</Badge>} />{!alertDismissed ? <div className="se-live-alert"><div><Activity size={16} /><b>Usuário x comprador</b><span>15 de 27 respostas recentes parecem indicar confusão entre quem utiliza e quem decide a compra.</span></div><small>Confiança estimada: alta · questão 6</small><p>Sugestão contextual. Nenhuma ação será executada sem sua decisão.</p><div className="se-copilot-actions"><Button size="sm" onClick={() => respond("Evidências de respostas abertas")}>Ver detalhes</Button><Button size="sm" onClick={() => respond("Verificação inserida por decisão do professor")}>Inserir verificação</Button><Button size="sm" onClick={() => { setRunning(false); respond("Sessão pausada por você para explicar"); }}>Pausar e explicar</Button><Button size="sm" variant="ghost" onClick={() => { setAlertDismissed(true); respond("Sugestão ignorada pelo professor"); }}>Ignorar</Button></div></div> : <div className="se-dismissed"><CheckCircle2 size={17} /> Sugestão dispensada por Helena.<Button size="sm" onClick={() => setAlertDismissed(false)}>Reabrir</Button></div>}</Panel><Panel><PanelHeading title="O que está acontecendo" detail="Atividade recente da sessão simulada." /><div className="se-feed"><div><i /><span><b>Equipe Horizonte respondeu</b><small>Objetivo: segmentação · há 12 s</small></span></div><div><i /><span><b>Equipe Farol avançou para decisão</b><small>Objetivo: usuário x comprador · há 27 s</small></span></div><div><i className="is-amber" /><span><b>Dificuldade coletiva sinalizada</b><small>Questão 6 · evidência ainda requer interpretação</small></span></div><div><i className="is-indigo" /><span><b>{participants} estudantes participando</b><small>10 aguardam ou observam a rodada</small></span></div></div><div className="se-game-xp"><span>Pontuação do jogo <small>não representa aprendizagem</small></span><b>1.280 XP</b></div></Panel><Panel><PanelHeading title="Equipes na expedição" detail="Gameplay e evidência aparecem separadamente." />{product.teams.map((team) => <div className="se-team-row" key={team.name}><span className="se-team-emblem">{team.name[0]}</span><span><b>Equipe {team.name}</b><small>{team.checkpoint} · evidência de aprendizagem</small></span><span className="se-team-score">{team.score} XP</span></div>)}</Panel><Button variant="primary" className="se-full-width" onClick={() => navigate("/resultados/sessao-segmento")}>Ver resultados da sessão <ArrowRight size={14} /></Button></div></div></>;
}

export function SmartEduApp() {
  const pathname = useProductPathname();
  const router = useRouter();
  const [toast, setToast] = useState<Toast>(null);
  const notify = (next: Toast) => { setToast(next); window.setTimeout(() => setToast((current) => current === next ? null : current), 3000); };
  const navigate = (path: string) => { if (path.startsWith("/experiencia")) { window.open(path, "_blank", "noopener,noreferrer"); return; } router.push(path); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); };
  let title = "Visão geral";
  let page: React.ReactNode;
  if (pathname === "/app" || pathname === "/") page = <Workspace navigate={navigate} />;
  else if (pathname === "/turmas") { title = "Turmas"; page = <Classes />; }
  else if (pathname.startsWith("/turmas/")) {
    title = "Turma";
    page = pathname.includes("/alunos/") ? <StudentProfile key={pathname} classId={pathname.split("/")[2]} studentId={pathname.split("/alunos/")[1]} navigate={navigate} notify={notify} /> : pathname.split("/")[2] !== product.classId ? <OtherClassDetail key={pathname} id={pathname.split("/")[2]} /> : <ClassDetail key={pathname} navigate={navigate} notify={notify} />;
  } else if (pathname === "/aulas") { title = "Aulas"; page = <LessonsJourney navigate={navigate}/>; }
  else if (pathname === "/materiais") { title = "Materiais"; page = <MaterialLibrary />; }
  else if (pathname.startsWith("/resultados")) { title = "Resultados"; page = <Results navigate={navigate} notify={notify} />; }
  else if (pathname.startsWith("/preparar-aula")) { title = "Preparar aula"; page = <PreparedWizard navigate={navigate} notify={notify} />; }
  else if (pathname.startsWith("/experiencia")) { title = "Visualizar experiência"; page = pathname === "/experiencia/segmento-de-clientes" ? <Preview navigate={navigate} /> : <JourneyEmpty title="Experiência não encontrada" description="Abra a experiência pela preparação da aula." />; }
  else if (pathname.startsWith("/sessao")) { title = "Sessão"; const session = resolveSession(pathname.split("/")[2] ?? ""); page = session?.id === "sessao-segmento" ? <Session key={pathname} notify={notify} navigate={navigate} /> : session ? <JourneyEmpty title="Sessão concluída" description={session.title}><Link href={`/resultados/${session.id}`}>Explorar resultados</Link></JourneyEmpty> : <JourneyEmpty title="Sessão não encontrada" description="Confira o endereço ou escolha uma aula da turma." />; }
  else { page = <Workspace navigate={navigate} />; }
  return <MotionConfig reducedMotion="user"><ProductShell title={title} toast={toast} notify={notify}>{page}</ProductShell></MotionConfig>;
}

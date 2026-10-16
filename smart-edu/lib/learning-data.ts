import { lessonNames, makeQuestions, students } from '../data/seed';

/** Evidence is scoped to a session. A demo fixture can never become a real result. */
export interface LearningSession {
  id: string; classId: string; lessonId: string; experienceId: string;
  title: string; date: string; source: 'demo' | 'real';
  objectives: { id: string; title: string }[];
  questions: { id: string; objectiveId: string; text: string; options: string[]; correct: number }[];
  responses: { studentId: string; questionId: string; answer: number }[];
  evolution: { label: string; value: number }[];
  gameplay: { team: string; xp: number }[];
}
export const lessons = lessonNames.map((title, i) => ({
  id: ['problemas', 'segmento', 'proposta', 'validacao', 'receitas', 'sintese'][i],
  classId: 'empreendedorismo', title,
  sessionId: i < 2 ? ['sessao-problemas', 'sessao-segmento'][i] : null,
  materialIds: i === 0 ? ['entrevistas'] : i === 1 ? ['bmc'] : i === 2 ? ['valor'] : [],
  objectives: i === 0 ? ['Reconhecer problemas observáveis', 'Priorizar uma necessidade'] : i === 1 ? ['Definir um segmento', 'Diferenciar usuário e comprador', 'Reconhecer early adopters'] : [`Aplicar ${title.toLocaleLowerCase('pt-BR')}`],
}));
export const enrollments = students.map(student => ({ studentId: student.id, classId: 'empreendedorismo' }));
export function resolveStudent(classId: string, studentId: string) {
  return enrollments.some(e => e.classId === classId && e.studentId === studentId)
    ? students.find(student => student.id === studentId) : undefined;
}
function fixture(index: number): LearningSession {
  const lesson = lessons[index];
  const objectives = lesson.objectives.map((title, i) => ({ id: `${lesson.id}-obj-${i + 1}`, title }));
  const questions = index === 0 ? [
    { id: 'problemas-q-1', objectiveId: objectives[0].id, text: 'Qual observação descreve um problema verificável?', options: ['O mercado é promissor', 'Lojistas perdem duas horas por dia controlando estoque', 'Nossa ideia é excelente'], correct: 1 },
    { id: 'problemas-q-2', objectiveId: objectives[1].id, text: 'O que ajuda a priorizar uma necessidade?', options: ['Frequência e impacto observados', 'Preferência da equipe', 'Popularidade da solução'], correct: 0 },
  ] : makeQuestions().slice(0, 6).filter((_, i) => i !== 3).map(q => ({ id: `segmento-${q.id}`, objectiveId: objectives[q.concept === 'Usuário e comprador' ? 1 : q.concept === 'Early adopter' ? 2 : 0].id, text: q.text, options: q.options, correct: q.correct }));
  // Deterministic, explicitly synthetic responses; never used for real sessions.
  const responses = students.slice(0, index === 0 ? 36 : 34).flatMap((student, si) => questions.map((q, qi) => ({
    studentId: student.id, questionId: q.id,
    answer: (si + qi * 3) % (index === 0 ? 7 : 5) < (index === 0 ? 6 : 3) ? q.correct : (q.correct + 1) % q.options.length,
  })));
  return { id: lesson.sessionId!, lessonId: lesson.id, classId: lesson.classId, experienceId: `exp-${lesson.id}`, title: lesson.title,
    date: index === 0 ? '2026-09-26' : '2026-09-30', source: 'demo', objectives, questions, responses,
    evolution: index === 0 ? [{ label: 'Diagnóstico', value: 52 }, { label: 'Após aula', value: 86 }] : [{ label: 'Diagnóstico', value: 43 }, { label: 'Após aula', value: 60 }, { label: 'Revisão', value: 72 }],
    gameplay: index === 0 ? [{ team: 'Horizonte', xp: 840 }, { team: 'Farol', xp: 760 }] : [{ team: 'Horizonte', xp: 1240 }, { team: 'Farol', xp: 1120 }, { team: 'Prisma', xp: 980 }],
  };
}
export const demoSessions: LearningSession[] = [fixture(0), fixture(1)];
export function resolveSession(id: string, classId?: string) {
  const canonical = id === 'segmento' ? 'sessao-segmento' : id;
  return demoSessions.find(s => s.id === canonical && (!classId || s.classId === classId));
}
export function summarize(session: LearningSession, objectiveId?: string, studentId?: string) {
  const questions = session.questions.filter(q => !objectiveId || q.objectiveId === objectiveId);
  const responses = session.responses.filter(r => (!studentId || r.studentId === studentId) && questions.some(q => q.id === r.questionId));
  const correct = responses.filter(r => questions.find(q => q.id === r.questionId)?.correct === r.answer).length;
  return { responses: responses.length, participants: new Set(responses.map(r => r.studentId)).size, correct,
    accuracy: responses.length ? Math.round(correct / responses.length * 100) : null };
}

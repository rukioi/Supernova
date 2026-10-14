import { classes, concepts, lessonNames, makeQuestions, students as roster, teams } from "@/data/seed";

export const navItems = [
  { label: "Visão geral", href: "/app", icon: "layout" },
  { label: "Turmas", href: "/turmas", icon: "users" },
  { label: "Aulas", href: "/aulas", icon: "book" },
  { label: "Materiais", href: "/materiais", icon: "folder" },
  { label: "Resultados", href: "/resultados/sessao-segmento", icon: "chart" },
] as const;

export type LearningState = "Consolidado" | "Quase consolidado" | "Em desenvolvimento" | "Não avaliado";

export const students = roster.map((student) => {
  const index = Number(student.id.split("-")[1]);
  const attendance = Math.min(100, student.participation + (index % 4) * 2);
  const lastActivity = student.participation === 0 ? "Sem atividade" : index % 4 === 0 ? "Hoje, 16:42" : index % 4 === 1 ? "Hoje, 14:18" : index % 4 === 2 ? "30 set" : "26 set";
  const state = (student.learning >= 88 ? "Consolidado" : student.learning >= 76 ? "Quase consolidado" : student.learning < 48 ? "Não avaliado" : "Em desenvolvimento") as LearningState;
  return { ...student, attendance, lastActivity, progress: student.learning, state, review: student.review ? "Revisar" : "Em dia" };
});

export const product = {
  teacher: "Prof. Helena Andrade",
  institution: "Faculdade Horizonte",
  className: classes[0].name,
  course: `${classes[0].course} · ${classes[0].period}`,
  classId: classes[0].id,
  studentCount: classes[0].students,
  module: classes[0].module,
  classes,
  objectives: concepts.map((concept, index) => ({
    id: `obj-${index + 1}`,
    title: concept.name,
    state: concept.state as LearningState,
    coverage: concept.value,
  })),
  lessons: lessonNames.map((title, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title,
    state: index < 2 ? "Executada" : index === 2 ? "Em preparação" : "Planejada",
    evidence: concepts[index]?.state === "Não avaliado" ? "Ainda não avaliada" : `${concepts[index]?.state ?? "Planejada"} · ${concepts[index]?.value ?? 0}%`,
  })),
  questions: makeQuestions().map((question) => ({ ...question, objective: `Objetivo: ${question.concept}`, answers: question.options })),
  teams: teams.map((team, index) => ({ ...team, learning: [82, 74, 79, 68][index], checkpoint: ["Hipótese", "Decisão", "Observação", "Movimento"][index] })),
};

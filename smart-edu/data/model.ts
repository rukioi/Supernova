export type Provenance = 'Sugestão da IA' | 'Editado pelo professor' | 'Aprovado pelo professor';
export type LearningState = 'Não avaliado' | 'Em desenvolvimento' | 'Quase consolidado' | 'Consolidado';
export interface ClassRoom { id: string; name: string; course: string; period: string; students: number; module: string; color: string; next: string; }
export interface Student { id: string; name: string; enrollment: string; participation: number; learning: number; xp: number; review: boolean; attention: boolean; }
export interface Question { id: string; text: string; options: string[]; correct: number; explanation: string; concept: string; source: string; difficulty: string; status: Provenance; }
export interface Scope { id: string; title: string; source: string; selected: boolean; }
export interface Objective { id: string; title: string; concept: string; prerequisite: string; confusion: string; source: string; status: Provenance; }
export interface Draft { materialIds?: string[]; id: string; classId: string; title: string; module: string; duration: string; intention: string; step: number; scopes: Scope[]; objectives: Objective[]; mapApproved: boolean; template: string; mode: string; competition: string; interaction: string; reward: string; questions: Question[]; selectedQuestionIds?: string[]; approved: boolean; published: boolean; previewed: boolean; reviewed: boolean; }
export interface Material { id: string; name: string; type: string; pages: number; size: string; date: string; text?: string; storage?: 'indexeddb'; mimeType?: string; }
export interface Session { id: string; title: string; classId: string; template: string; phase: number; elapsed: number; running: boolean; ended: boolean; intervention: boolean; ignored: boolean; invalid: number[]; events: string[]; }
export interface AppState { classes: ClassRoom[]; materials: Material[]; draft: Draft; session: Session; dismissed: boolean; profile: {name: string; institution: string}; }

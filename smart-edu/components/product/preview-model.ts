import type { Question } from "@/data/model";

export const previewPhases = ["Lobby", "Pergunta", "Movimento", "Decisão", "Evento", "Resultado"] as const;
export type PreviewPhase = (typeof previewPhases)[number];
export type ExperienceKind = "expedition" | "defense" | "territory";
export type Perspective = "Aluno" | "Telão" | "Professor";

export const previewFormats = {
  expedition: {
    name: "Expedição Estratégica", short: "Investigação em equipe", mechanic: "Rotas, recursos e descobertas",
    goal: "Investigue o caso, escolha uma rota e transforme respostas em evidências.",
    verbs: ["Preparar a missão", "Ler um indício", "Escolher uma rota", "Investir em evidência", "Revisar a hipótese", "Sintetizar descobertas"],
    headings: ["Toda descoberta começa com uma boa pergunta.", "O primeiro indício está no conteúdo.", "Qual rota aproxima a equipe de uma evidência?", "O próximo passo depende da sua decisão.", "Um novo indício muda a investigação.", "O que mudou na sua compreensão?"],
    options: [
      ["Rota de campo", "Ouvir pessoas e observar o problema no contexto de uso."],
      ["Rota de análise", "Comparar registros e identificar padrões antes de entrevistar."],
    ],
    decisions: [
      ["Testar com um caso real", "Investir 40 recursos em uma observação e justificar a hipótese."],
      ["Ampliar sem validar", "Investir 80 recursos em divulgação, antes de reunir evidência."],
    ],
    consequences: ["O teste produz evidência para revisar a hipótese. Restam 80 recursos para o próximo checkpoint.", "A divulgação amplia o alcance, mas ainda não valida a hipótese. Restam 40 recursos; a próxima rota precisará investigar essa lacuna."],
    event: "A equipe encontra um caso que contradiz sua hipótese inicial. Uma descoberta útil também pode mostrar que precisamos mudar de ideia.",
    reflection: "Que evidência fez vocês mudar de rota? O que ainda precisa ser investigado?",
  },
  defense: {
    name: "Linha de Defesa", short: "Hipóteses sob teste", mechanic: "Pilares, evidências e contraprovas",
    goal: "Construa uma hipótese, confronte-a com evidências e reforce seus pontos frágeis.",
    verbs: ["Construir a hipótese", "Testar um conceito", "Reforçar um pilar", "Escolher uma defesa", "Responder à contraprova", "Revisar o argumento"],
    headings: ["Uma hipótese forte pode ser questionada.", "O argumento resiste a este desafio?", "Qual pilar precisa de reforço?", "Como sustentar a hipótese com evidências?", "Uma contraprova chegou à linha de defesa.", "Uma defesa melhor é uma hipótese mais precisa."],
    options: [
      ["Reforçar a evidência", "Buscar um exemplo verificável para sustentar a afirmação."],
      ["Reforçar a delimitação", "Definir em que contexto a hipótese é válida."],
    ],
    decisions: [
      ["Confrontar a hipótese", "Comparar a afirmação com um caso que poderia refutá-la."],
      ["Repetir a afirmação", "Manter a hipótese porque a equipe concorda com ela."],
    ],
    consequences: ["A comparação fortalece o pilar de evidência e revela os limites da hipótese. A próxima rodada testa esses limites.", "Consenso não substitui evidência. O pilar permanece vulnerável e a contraprova da próxima rodada exigirá revisão."],
    event: "Surge um exemplo em que a hipótese não funciona. A equipe precisa reconhecer a limitação e decidir como reconstruir o argumento.",
    reflection: "Qual parte da hipótese resistiu ao teste? Qual limite vocês passaram a reconhecer?",
  },
  territory: {
    name: "Conquista de Territórios", short: "Conceitos em conexão", mechanic: "Áreas, conexões e aplicação",
    goal: "Aplique conceitos para conectar áreas do mapa. Cada conquista exige uma justificativa.",
    verbs: ["Conhecer o mapa", "Abrir um território", "Planejar a expansão", "Aplicar e conectar", "Negociar uma conexão", "Ler o mapa de conceitos"],
    headings: ["Conquiste espaço conectando conhecimento.", "Este território começa com um conceito.", "Para qual área a equipe deve avançar?", "Como conectar o novo território ao que já sabemos?", "Duas equipes chegaram à mesma fronteira.", "O território conquistado conta uma história de aprendizagem."],
    options: [
      ["Território de aplicação", "Transferir o conceito para uma situação concreta."],
      ["Território de relações", "Explicar a conexão com outro conceito do mapa."],
    ],
    decisions: [
      ["Conectar com justificativa", "Apresentar um exemplo e explicar a relação entre os conceitos."],
      ["Ocupar sem explicar", "Escolher a área pelo valor em pontos, sem demonstrar a conexão."],
    ],
    consequences: ["A aplicação e a justificativa conectam uma nova área. O mapa registra a relação para a equipe revisitar.", "A área fica em disputa: pontos, sozinhos, não demonstram aplicação. A equipe precisará explicar a conexão para consolidá-la."],
    event: "Outra equipe propõe uma conexão diferente para a mesma área. Vocês podem comparar argumentos e construir uma solução compartilhada.",
    reflection: "Que conexão vocês conseguem explicar com um exemplo? Qual área ainda precisa de reforço?",
  },
} as const;

export const kinds = Object.keys(previewFormats) as ExperienceKind[];
export function kindFromTemplate(template: string): ExperienceKind {
  return kinds.find(kind => previewFormats[kind].name === template) ?? "expedition";
}
export type PreviewQuestion = Pick<Question, "id" | "text" | "options" | "correct" | "explanation" | "concept" | "source">;

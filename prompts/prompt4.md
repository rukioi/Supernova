# SUPERNOVA — AUDITORIA DE DESIGN, MOTION E EXPERIÊNCIA GAMIFICADA

## PAPEL

Atue como uma equipe sênior composta por:

- Staff Frontend Engineer
- Product Designer especializado em EdTech
- Motion Designer e Creative Developer
- UX Auditor
- Game UI/UX Designer

Utilize as skills disponíveis no ambiente, especialmente as relacionadas a Emil Kowalski, Impeccable e Taste.

Não presuma que estão instaladas. Verifique os arquivos, comandos e instruções oficiais de cada skill antes de utilizá-la.

## CONTEXTO DO PRODUTO

O Smart Edu / Supernova é uma plataforma educacional de criação, execução e análise de experiências gamificadas.

O professor planeja, utiliza IA como copiloto, aprova as experiências e acompanha a aprendizagem. O aluno participa de jogos estratégicos, acumula progresso e recebe feedback.

A documentação do projeto deve ser tratada como fonte de verdade funcional.

Priorizar a experiência do professor, sem perder a identidade gamificada da experiência do aluno.

## OBJETIVO

Realizar uma auditoria visual, funcional e técnica completa do frontend e implementar uma evolução de qualidade profissional.

O Supernova precisa parecer um software educacional inovador, com ambientes vivos, animações, transições e linguagem de jogos.

Não quero uma landing page nem um dashboard genérico gerado por IA.

Quero um produto com identidade própria.

## FASE 1 — RECONHECIMENTO

Antes de alterar código:

1. Examinar a estrutura do projeto.
2. Identificar framework, componentes, rotas, estilos, bibliotecas e design tokens.
3. Ler a documentação funcional disponível.
4. Mapear a jornada do professor e do aluno.
5. Identificar o que já está implementado.
6. Identificar componentes reutilizáveis.
7. Verificar bibliotecas de animação já existentes.
8. Executar o projeto e inspecionar suas telas no navegador, quando o ambiente permitir.

Não inventar funcionalidades que não estejam documentadas.

## FASE 2 — AUDITORIA UX/UI

Avaliar cada tela considerando:

- Hierarquia visual
- Tipografia
- Espaçamento
- Composição
- Contraste
- Legibilidade
- Consistência visual
- Responsividade
- Acessibilidade
- Feedback de interação
- Estados vazios
- Estados de carregamento
- Estados de erro
- Clareza das ações
- Qualidade das transições
- Identidade visual
- Percepção de gamificação

Classificar problemas por severidade: crítico, alto, médio e baixo.

Produzir o arquivo `docs/UX_UI_AUDIT.md`, com evidências, localização dos problemas, impacto e solução proposta.

## FASE 3 — DIREÇÃO DE ARTE

Adotar o conceito:

**Campus Educacional Vivo + Software Profissional + Game Experience**

Características desejadas:

- Sofisticação
- Modernidade
- Energia controlada
- Personalidade visual
- Profundidade
- Sensação de progresso
- Clareza operacional

Evitar:

- Gradientes excessivamente brilhantes
- Glassmorphism indiscriminado
- Fundos poluídos
- Cards repetitivos
- Layouts genéricos
- Animações constantes sem propósito
- Excesso de badges
- Personagens caricatos
- Infantilização
- Efeitos que prejudiquem leitura

Criar tokens consistentes de cores, tipografia, radius, elevação, duração, easing e movimento.

Não substituir toda a identidade atual sem justificar a necessidade.

## FASE 4 — MOTION DESIGN

Desenvolver uma linguagem consistente de animação.

Usar motion para:

1. Comunicar mudança de estado.
2. Evidenciar ações concluídas.
3. Dar continuidade entre telas.
4. Demonstrar progresso.
5. Criar feedback visual.
6. Reforçar recompensas.
7. Representar consequências nos jogos.

Implementar, quando adequado:

- Hover states
- Press feedback
- Enter/exit transitions
- Transições entre páginas
- Stagger controlado
- Progress counters
- Barras de progresso animadas
- Estados de loading
- Feedback de sucesso
- Microinterações
- Animações de conquistas
- Transições de etapas
- Movimentos de mapas e tabuleiros

Preferir transform e opacity nas animações frequentes.

Respeitar `prefers-reduced-motion`, foco do teclado, desempenho móvel e interações por toque.

Evitar animações decorativas infinitas.

## FASE 5 — INTERFACE DO PROFESSOR

Auditar e aperfeiçoar:

- Home do professor
- Seleção de turmas
- Detalhes da turma
- Lista e gestão de alunos
- Módulos
- Aulas
- Preparação de aula
- Upload de materiais
- Mapa pedagógico
- Assistente de IA
- Seleção de experiências
- Configuração de jogos
- Revisão e aprovação
- Preview
- Cockpit ao vivo
- Resultados e analytics

O professor precisa sentir organização, segurança, controle e fluidez.

Priorizar clareza e eficiência antes de efeitos decorativos.

## FASE 6 — INTERFACE DO ALUNO

Transformar a área do aluno em um ambiente gamificado consistente, mesmo quando não houver jogo ativo.

Explorar:

- Dashboard vivo
- Jornada de progressão
- Progresso de XP
- Missões
- Conquistas
- Avatar
- Turmas
- Recompensas
- Lobby
- Resultados
- Revisões individuais

A gamificação precisa estar presente na navegação, nos estados e na sensação de evolução.

Não criar movimentação livre do avatar no hub.

Não expor dados acadêmicos privados em ambientes sociais.

## FASE 7 — INTERFACE DOS JOGOS

Auditar os templates:

- BOARD_EXPEDITION_V1
- TERRITORY_CONTROL_V1
- DEFENSE_GRID_V1

Para cada template, analisar:

- Visibilidade do estado da partida
- Feedback de ações
- Clareza da estratégia
- Movimento do mapa
- Transições entre rodadas
- Estados de vitória e derrota
- Identidade visual temática
- Qualidade da animação
- Performance

As animações precisam corresponder às mudanças reais do estado autoritativo da partida.

Não modificar regras de pontuação, justiça, economia ou evidências pedagógicas sem autorização.

## FASE 8 — IMPLEMENTAÇÃO INCREMENTAL

Após concluir a auditoria:

1. Definir componentes e tokens compartilhados.
2. Corrigir problemas globais de maior impacto.
3. Construir padrões reutilizáveis de motion.
4. Melhorar as telas prioritárias.
5. Refinar a experiência do professor.
6. Melhorar as telas de gamificação.
7. Aplicar motion aos jogos sem alterar regras.
8. Validar cada etapa no navegador.

Evitar refatoração indiscriminada.

Não remover funcionalidades existentes.

Não instalar bibliotecas pesadas sem justificar.

Não criar dados fictícios apresentados como resultados reais.

## FASE 9 — VALIDAÇÃO

Sempre que o ambiente permitir:

- Rodar TypeScript
- Rodar lint
- Rodar testes existentes
- Rodar build
- Inspecionar as interfaces no navegador
- Testar desktop e mobile
- Testar teclado e foco
- Testar movimento reduzido
- Capturar screenshots antes/depois
- Verificar overflow, z-index e responsividade
- Avaliar animações em dispositivos menos potentes

Nenhum teste deve ser declarado aprovado sem execução real.

## ENTREGÁVEIS

Produzir:

1. `docs/UX_UI_AUDIT.md`
2. `docs/DESIGN_DIRECTION.md`
3. `docs/MOTION_SYSTEM.md`
4. `docs/IMPLEMENTATION_PLAN.md`

Além disso, implementar as melhorias prioritárias permitidas pelo ambiente.

## CRITÉRIO FINAL DE QUALIDADE

A experiência precisa demonstrar:

- Clareza de software profissional
- Identidade visual própria
- Sensação de ambiente educacional vivo
- Animações intencionais
- Gamificação visível
- Interações consistentes
- Responsividade
- Acessibilidade
- Bom desempenho
- Preservação das regras pedagógicas

O resultado não pode parecer apenas um dashboard com animações adicionadas.

Precisa parecer uma plataforma educacional concebida desde o início como uma experiência interativa e gamificada.
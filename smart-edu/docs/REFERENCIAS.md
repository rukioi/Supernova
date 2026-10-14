# Referências de produto e interface — Smart Edu MVP

## Refatoração visual — outubro de 2026

Referência principal: [Loftylab](https://loftylab.framer.website/), inspecionada no navegador, e os assets locais em `referencias/REFERENCIA 1- PRINCIPAL`.

- New Title nos títulos, Inter Display na interface e Caveat nas anotações. Arquivos servidos localmente, sem requisições ao Google Fonts.
- Azul profundo `#030f2e`, azul `#0443b5`, verde `#53c690`, lilás `#e5a0fa`, laranja e amarelo claro, com fundo neutro para leitura.
- Visão geral extraída para `components/product/workspace.tsx`: aula em foco, evidências, turmas em coleção/lista, agenda e rascunho conectado ao store.
- Sistema visual em `app/studio.css`; removidas as camadas anteriores de tema editorial/noturno que se sobrepunham.
- Movimento curto de entrada e resposta ao hover, limitado a transform/opacity e respeitando `prefers-reduced-motion`.
- A referência orienta a linguagem visual; a organização continua sendo de um produto docente, com as rotas pedagógicas existentes.
- Inspeção automatizada com Playwright local. Capturas e relatório ficam em `artifacts/studio/`. Proveniência dos arquivos em `public/lofty/README.md`.

| Área | Referência | Padrão escolhido | Por que funciona no Smart Edu |
|---|---|---|---|
| App shell e dashboard | Linear, interfaces de trabalho editorial | Navegação fixa estreita, cabeçalho contextual e painel com atividade recente | Mantém a atenção em aulas e decisões do professor, sem transformar a entrada em marketing ou KPIs genéricos. |
| Aprendizagem e sessão | Kahoot (clareza e feedback), Duolingo (progressão e continuidade) | Etapas legíveis, status semântico e progresso coletivo contextualizado | Gamificação é uma forma de organizar oportunidades de aprendizagem e evidências. |
| Mapa pedagógico | Mapas de objetivos e concept maps | Objetivos conectados a conceitos, fontes e estados de consolidação | Explica o encadeamento da aula e torna a sugestão rastreável e editável. |
| Preparação de aula | Padrão de wizard/stepper em produtos profissionais | Sete etapas com contexto sempre visível e gates explícitos de aprovação | Reduz carga de configuração e mantém o professor no controle. |
| Aprovação assistida | Padrão de revisão com autoria e proveniência | Rótulos separados para sugestão de IA, edição e aprovação docente | Mostra quem produziu o conteúdo e evita publicação automática. |
| Resultados | Analytics de produto e activity feed | Indicadores interpretáveis ligados a uma próxima ação pedagógica | Ajuda o professor a compreender evidências e planejar uma intervenção. |

Referências conceituais informadas pelo produto: isEazy Game (modularidade), Kahoot (clareza), Duolingo (progressão). Pesquisa pontual para identificar um padrão útil; identidade e fluxo foram desenhados para o Smart Edu.

## Fontes consultadas na implementação

| Área | Referência | Padrão escolhido | Por que funciona no Smart Edu |
|---|---|---|---|
| Diálogos e drawers | https://www.radix-ui.com/primitives/docs/components/dialog | Foco controlado, Escape e retorno ao acionador | Revisão e edição acessíveis pelo teclado. |
| Shell e componentes | https://ui.shadcn.com/blocks?category=dashboard | Sidebar contextual e primitivas reutilizáveis | Base personalizada com composição pedagógica. |
| Movimento | https://motion.dev/docs/react-use-reduced-motion | Transições curtas e respeito à preferência de movimento | Explica aprovação e progressão sem distrair. |
| Referências locais | `referencias/` | Modularidade visual e linguagem de experiência | Adaptadas ao trabalho docente e ao Ensino Superior. |
## Referência principal aplicada

`C:\Users\murib\Desktop\Supernova\referencias\REFERENCIA 1- PRINCIPAL`

O material local tem linguagem editorial de alto contraste: blocos escuros, tipografia grande, composição assimétrica, pontos de cor e imagens com presença. A aplicação traduz essa direção para o domínio educacional com uma “missão em foco” no dashboard, mapa de rota, checkpoints, bifurcações e leitura de estado. As fotografias de moda não foram usadas como conteúdo pedagógico.

## MCPs e padrões consultados nesta revisão

| Área | Fonte | Decisão aplicada |
|---|---|---|
| Microinterações | Motion · React layout animations | Estados de progresso e troca de composição devem animar por layout, sem transições decorativas constantes. |
| Dialogs e drawers | Radix Dialog | Foco controlado, fechamento por Escape e conteúdo contextual para revisões e perfis. |
| Shell e dados | shadcn dashboard blocks | Sidebar, tabela e densidade de dados como base estrutural, com identidade própria Smart Edu. |

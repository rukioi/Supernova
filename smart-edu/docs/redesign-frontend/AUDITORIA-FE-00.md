# FE-00 — Auditoria do frontend ativo

Rodada executada em **15/10/2026**, em Windows/PowerShell, Node **24.18.0**, npm, Edge headless via Playwright. Escopo: diagnóstico e decisões para implementação; nenhum componente ou estilo de produto foi alterado nesta rodada.

Os três critérios de aceite da auditoria foram atendidos. Os defeitos encontrados permanecem nos tickets de implementação; a conclusão de FE-00 não certifica o frontend como pronto para produção.

## Achados priorizados

Severidades: P1 compromete identidade/contexto ou integridade dos dados; P2 compromete compreensão, apresentação ou manutenção. Recomendações de composição estão separadas dos defeitos comprovados.

| Prioridade / categoria | Evidência e reprodução | Decisão / ticket |
|---|---|---|
| P1 — identidade inválida | `components/smart-edu-app.tsx:98`: `StudentProfile` substitui aluno inexistente por `students[0]`. Abrir `/turmas/empreendedorismo/alunos/fe00-inexistente` exibiu **Ana Clara Martins**, nos dois modos de movimento. | Estado de ID inválido; validar pertencimento à turma. FE-15. |
| P1 — identidade de sessão | `components/product/journey-lessons.tsx:13`: as duas aulas concluídas apontam para `/resultados/sessao-segmento`. Clicar na primeira, **Identificação de Problemas**, abriu **Segmento de Clientes**. `components/smart-edu-app.tsx:241` aceita qualquer prefixo `/resultados`; `/resultados/FE00-inexistente` também abriu a sessão fixa. | Modelar aula → experiências → sessões identificadas, resolver ID antes de renderizar. FE-09/10/14/15. |
| P1 — métricas sem contrato | `components/product/journey-results.tsx:10–17`: objetivos, 78%, +12 pp, 16 alunos, 3 em atenção e sequência 43/69/72 são literais, sem registros de respostas/avaliações comparáveis. O adapter `lib/demo-data.ts:13` ainda deriva presença/progresso por fórmula. “Demonstração” é informado, mas isso não estabelece denominador, versão ou comparabilidade. | Manter demo identificada; não promover esses valores a indicadores reais. FE-10 antes de FE-11/12/13/14. |
| P1 — material sem arquivo persistente | `components/product/material-library.tsx:15`: seleção grava nome/tipo/tamanho/data, sem bytes, URL ou vínculo. No toque emulado, `FE00-audit.txt` reapareceu após reload, mas o objeto salvo só tinha metadados. “Ir para preparação” navega sem associar material; wizard inicia com `BMC_Segmento_de_Clientes.pdf` fixo (`smart-edu-app.tsx:134`). | Diferenciar seleção local de material disponível; associação explícita ao rascunho. Contratos de arquivo/armazenamento ausentes. FE-17/18. |
| P1 — instalação não reproduzível isoladamente | `components/ui/reward-button.tsx:5` importa `react-rewards`, ausente de `smart-edu/package.json` e de seu lockfile. Resolução observada: `Supernova/node_modules/react-rewards/dist/react-rewards.js`, provida pelo `../package.json` não rastreado. Checks locais passaram graças ao diretório pai. | FE-02 deve decidir se remove a celebração decorativa ou declara a dependência necessária. Não considerar build local prova de instalação limpa. |
| P2 — contexto dividido entre fontes | Coleções leem `useStore`; detalhe da turma principal, roster, perfil e resultados leem `product/students` estáticos. Shell escolhe turma pelo pathname/rascunho ou primeira turma (`product-shell.tsx:23`); o contexto da home não acompanha necessariamente essa escolha. | Resolver contexto por identidade e seletores compartilhados, preservando demo e dados locais. FE-03/07/10/15. |
| P2 — controles que só notificam | Convite/configuração/exportação/intervenção em `smart-edu-app.tsx:88–115` e notificações/perfil no shell não realizam envio/exportação/salvamento correspondente. `?intencao=reforco` é emitido pelo resultado, mas o wizard não lê esse parâmetro. | Estado honesto de indisponibilidade ou ação local concreta; reforço precisa preencher intenção/contexto. FE-03/05/07/14/15. |
| P2 — superfícies de turma com artefatos | Capturas 1440/1024: turmas secundárias exibem bordas brancas parciais e superfícies fragmentadas; em 1024 o panda invade o rótulo “Próximo encontro”. `journey-classes.tsx:22`, wrappers de `tilt-card.tsx:22` e regras `campus.css:101–104` são pontos de investigação. Causa exata de composição 3D não isolada nesta auditoria. | Remover dependência de profundidade decorativa e validar geometria dos wrappers. FE-02/06. |
| P2 — biblioteca subutiliza largura | Em 1440 e no celular, os botões de material têm largura visual menor que suas colunas, com grandes vazios; as três capas repetem o mesmo documento. `material-library.tsx:21`, `.library-card` em `journey.css` e wrappers Tilt/Stagger. | O botão deve preencher a área disponível; capas por tipo e detalhe contextual. FE-16/17. |
| P2 — hierarquia e legibilidade | Home repete hero, “a jornada continua” e preparação antes da operação; mobile tem **3553 CSS px** de altura na captura integral. Há 20 elementos small/eyebrow abaixo de 12px na home mobile e 12 em resultados (contagem heurística, não laudo WCAG). Fontes condensadas persistem em números, e `.j-home-hero-copy h1` usa espaçamento muito negativo. | Consolidar primeira dobra e tipografia; não reduzir todo texto ao display. FE-01/04/05. |
| P2 — interação pouco descoberta | Mobile: tablist de resultados tem 350px visíveis e 410px totais; “Questões” fica fora da vista inicial, mas toque a alcançou e ativou. Timeline só recolhe o módulo inteiro, não expande cada aula. Abas não têm painéis associados por `aria-controls`/`tabpanel` em `editorial-motion.tsx:23`. | Indicar rolagem de abas, associar painéis e implementar expansão de aula. FE-02/08/14. |

Não houve erros JavaScript, erros de console nem respostas HTTP >=400 no percurso principal capturado. Houve **7 warnings do Motion sobre reduced motion**, esperados ao habilitar a preferência. Isso não elimina os defeitos funcionais descritos acima.

## Ambiente e árvore ativa

`npm run dev` → `scripts/run-framework.mjs` → perfil portátil → **Vinext/Vite**, porta 5173. A tentativa encontrou servidor já ativo, PID 17508, explicitamente associado a este diretório; ele foi reutilizado e mantido aberto. Título “Smart Edu · Espaço do professor”, hero e rotas confirmaram a aplicação correta. Não foi usado Next dev, nem a porta histórica 3000.

Dependências declaradas: React 19.2.6, Next 16.3.4, Vinext 1.0.0-beta.5, Vite 8.0.13, TypeScript 5.9.3, Tailwind 4.2.1, Motion ^14 e Recharts ^3.8. Não há scripts `test` ou `typecheck`. Versões de execução/declaração não constituem inspeção de instalação limpa.

```text
app/page.tsx + app/[...path]/page.tsx
  → components/product/app.tsx (ProductApp)
    → components/smart-edu-app.tsx (SmartEduApp, despacho por pathname)
      → ProductShell → ContextTransition → conteúdo
```

| URL / detalhe | Componente efetivamente usado | Fontes / fluxo preservado |
|---|---|---|
| `/` e `/app` | `journey-workspace.tsx` / Workspace | store.classes + draft; continuar preparação, explorar turmas, aulas e sessão demo |
| `/turmas` | `journey-classes.tsx` / Classes | store.classes; busca, curso, coleção/lista, criação local e detalhe |
| `/turmas/empreendedorismo` | ClassDetail **interno** a `smart-edu-app.tsx` | product.classes estático; abas, LessonList, Roster, JourneyResults compacto |
| `/turmas/:outroId` | `classes.tsx` / OtherClassDetail | store.classes; usa Lessons/LearningMap/UI. **Este arquivo não é todo legado**. Marketing abre contexto próprio e estado inicial, sem dados individuais reais. |
| `/turmas/:id/alunos/:alunoId` | StudentProfile interno | students estático; detalhes calculados, retorno à aba Alunos; fallback incorreto para ID inválido |
| `/aulas` | `journey-lessons.tsx` / LessonsJourney | draft.classId, lessonNames, freshDraft; preparar/reabrir rascunho ou abrir resultado fixo |
| `/materiais` | `material-library.tsx` | store.materials; filtros, detalhe em Dialog, seleção de arquivo como metadados locais |
| `/resultados/*` | Results interno → `journey-results.tsx` | literals + product + Roster; cinco abas; sem resolvedor de sessão |
| `/preparar-aula` | PreparedWizard → Wizard **interno** | store.draft + estado React e product; sete etapas, aprovação docente, preview em Dialog |
| `/experiencia/*` | Preview interno → dynamic ExperiencePreview | experience-picker, preview-model, preview-boards; `navigate()` abre experiência em nova aba |
| `/sessao/*` | Session interno | simulação em useState; fase, pausa, término; não usa servidor de partida |

Sem caminho de renderização encontrado desde SmartEduApp: exports de `dashboard.tsx`, `workspace.tsx`, `wizard.tsx`, `materials.tsx`, `lessons-journey.tsx`, `game.tsx`, `preparation-map.tsx`, `preview-inspector.tsx`, `reset-workspace.tsx`. São candidatos a legado, **não autorização para exclusão**. `product/app.tsx` é o wrapper de entrada. `classes.tsx`, `ui.tsx` e `learning-map.tsx` continuam alcançáveis em ramos contextuais; não refatorar uma tela antiga presumindo que é a principal.

## Inventário visual e de interação

CSS importado globalmente, nesta ordem em `app/layout.tsx`: globals → product → smart-edu → studio → editorial → journey → experience → preview → controls → campus → game-maps. Cascata longa e overrides locais precisam ser auditados por estilo computado antes de consolidar tokens.

| Grupo | Existente / decisão |
|---|---|
| Tokens | `globals.css`: ink #091b3a, action #2557f5, achievement #ddf45a, discovery #654090, coral #ff795b, canvas #f5f7fc; semânticos e aliases shadcn. Escala 4/8/12/16/24/32/48/64; raios 10/16/pill; tempos CSS 160/240/280ms. A direção criativa sugere outra paleta como ponto de partida, não como token já instalado. |
| Fontes | `studio.css:2–5`: Studio Display (`new-title.woff2`), Studio Sans (Inter medium/bold), Studio Hand (Caveat); `campus.css:308–309`: Arcade Display aponta também para Inter. Hero usa Arial/Helvetica. Não há Space Grotesk/Sora instalada no fluxo observado. `report.json` registra famílias e carregamento por captura. |
| Motion | `lib/motion.ts`: 0.16/0.24/0.42/0.8s; distâncias 6/14/22; stagger .065; tilt 3°. ContextTransition tem .18s próprio; abas .26s; JourneyProgress .6s; CountUp .65s. Há duplicação de Counter/CountUp e ProgressBar/JourneyProgress. |
| Primitives ativas | Dialog/DropdownMenu/Select via wrappers locais Radix; AppSelect; JourneyButton, StateBadge, JourneyTrack, PageIntro, JourneyEmpty; AnimatedTabs → LocalTabs; Stagger, TiltCard, Counter, RewardButton. Dialog de material fecha com Escape e devolve foco. Há sheet/drawer/table/chart acessíveis para reaproveitar conforme comportamento. |
| Primitives ainda sem consumo ativo encontrado | checkpoint, progress-bar, scroll-line. Não adicionar abstrações equivalentes antes de verificar sua adequação. |
| Gráficos | Recharts instalado e `components/ui/chart.tsx` disponível; **não usado por JourneyResults**. Resultado atual usa barras CSS/div e SVG na home; não há seleção temporal/drill-down em gráfico. |
| Movimento a revisar | Tilt/elevação para leitura; confetti no simples CTA de preparar; contagens na entrada; scroll programático sempre smooth em SmartEduApp. Reduced motion já existe em MotionConfig/hooks/CSS, mas RewardButton ainda chama confetti com 8 elementos. Nenhuma celebração deve representar conquista sem mudança real. |

As skills Impeccable, Taste e Emil Kowalski não constam do catálogo desta sessão. Aplicada `21st-ui-review`; `.21st/design.json` ausente. `21st review components --json` foi tentado e falhou porque o executável não está no PATH. Não há score automatizado 21st declarado. Nenhum componente importante foi implementado; consulta a MCPs shadcn/Motion para implementação permanece responsabilidade dos respectivos tickets.

## Dados, permissões e dependências externas

`data/model.ts` define ClassRoom, Material, Draft e Session, mas não modela a hierarquia completa professor → turma → módulo → aula → experiência versionada → sessão → resposta/evidência. `data/seed.ts` fornece três turmas, seis aulas e 38 alunos gerados; `lib/demo-data.ts` adapta esses dados e deriva indicadores. Não são registros acadêmicos reais.

`lib/store.ts:8–10`: singleton + useSyncExternalStore, chave **smart-edu-demo-v1**, persistência em localStorage. Leitura valida apenas presença de draft/classes/session; sem schema/versionamento/migração. Escrita falha em armazenamento dispara evento `smart-storage-error`, sem recuperação visual demonstrada nesta rodada. Seleção, rascunho e criação de turma são ações locais reais; não equivalem a gravação remota.

Os arquivos `app/chatgpt-auth.ts`, `lib/connectors.ts` e infraestrutura Drizzle existem, mas nenhum dos cinco percursos auditados consulta autorização acadêmica por turma/aluno. Não há comprovação de controle de acesso remoto. Não implementar “sem permissão” apenas escondendo botões, nem testar autorização de produção com esses mocks.

| Contrato necessário | Campos/comportamento mínimo | Tickets |
|---|---|---|
| Identidade e acesso | professor autenticado, turmas autorizadas, pertencimento do aluno, verificação no servidor, resposta de acesso negado | FE-03/07/10/15 |
| Sessões e evidências | IDs de turma/módulo/aula/experiência/sessão; versão executada; timestamp; questão/objetivo; resposta; denominador elegível/respondente; ausências; proveniência | FE-09/10/11/13/14/15 |
| Comparações | duas observações reais, instrumento/coorte/objetivos compatíveis, período e regras de agregação; indisponibilidade explícita quando faltar | FE-10/12 |
| Materiais | assetId, proprietário/permissão, MIME/tamanho, bytes/URL segura, status confirmado, erro recuperável, relação many-to-many com aula/rascunho | FE-16/17/18 |
| Convite/publicação/partida/IA | endpoints, confirmação, falha, idempotência e estado autoritativo; geração atual é local/determinística | FE-07/09/14/18/19 |

Sem esses serviços, os próximos tickets podem entregar navegação, estados honestos e composição independente. Envio real, segurança e resultados reais continuam pendentes; a auditoria não cria backend substituto.

## Plano por página — propostas, ainda não implementadas

| Página | Composição e hierarquia concretas | Ação principal / interação de maior impacto | Preservar / dependências |
|---|---|---|---|
| Visão Geral | Um hero contextual assimétrico: identidade da turma à esquerda; percurso real com checkpoint atual à direita; preparação visível na primeira dobra. Substituir o segundo grande título por faixa operacional de pulso + próxima ação. Mobile: resumo de percurso e CTA, sem repetir três chamadas de preparação. | **Continuar preparação**. Checkpoint selecionável mostra aula/estado e destino correspondente; entrada título → percurso → checkpoint → próxima experiência. | Rascunho, aprovação e navegação para preview/sessão; não inventar streak/XP/evolução. FE-01/02/03/04/05. |
| Turmas | Coleção editorial com uma turma em foco e linhas compactas para demais, com identidade, módulo e próximo encontro. Filtros preservados no retorno; detalhe com identidade contínua e navegação contextual. Evitar panda sobre metadados e card inteiro em profundidade. | **Explorar turma**; criação continua ação secundária. Seleção transporta contexto ao detalhe; progresso abre checkpoint identificado. | Busca/curso, coleção/lista, criação persistida local, vazio e turma recém-criada. FE-06/07. |
| Aulas | Timeline central com concluídas compactas, aula atual expandida e futuras leves. Rail de módulo à esquerda no desktop, resumo recolhível antes da timeline no mobile; priorizar aula atual na primeira dobra. | **Continuar preparação**; expansão individual revela objetivos, material, experiência e lista de sessões. | Reset consciente com freshDraft, rascunho em andamento, estados da aula e acesso aos resultados corretos. IDs e sessões faltam. FE-08/09. |
| Resultados | Cabeçalho com sessão/contexto e principal evidência; distribuição de participação ao lado. Grade assimétrica: objetivos com denominador, atenção vinculada à evidência e próxima ação. Global/turma precedem sessão; antes/depois só com observações compatíveis. | **Investigar evidência** → objetivo/questão/aluno; ponto temporal abre a sessão identificada. Abas e filtros preservados na volta. | Cinco abas, roster, distinção XP/aprendizagem, navegação para turma e preparação. Sem comparabilidade, mostrar insuficiência. FE-10–15. |
| Materiais | Biblioteca editorial com capas gráficas por tipo, largura de card coerente e vínculos reais com aula; seleção e detalhe contextual preservam origem. Mobile usa detalhe acessível com metadados e ação visível. | **Associar ao planejamento** quando houver relação persistível. Filtro reorganiza coleção; detalhe mantém seleção e retorno de foco. | Busca/tipo/vazio, seleção local, Dialog e Escape. Upload real depende do contrato; não chamar metadados de arquivo enviado. FE-16/17/18. |

Sequência recomendada: FE-01/02/03 corrigem base e contexto; FE-04/05 consolidam home; FE-06–09 organizam turma/aula e identidades; FE-10 bloqueia gráficos sem contrato; FE-11–15 implementam exploração; FE-16–18 conectam acervo; FE-19 repete os fluxos integrados. Não avançado automaticamente além de FE-00.

## Evidências desta rodada

Diretório: [`artifacts/redesign-frontend/FE-00/`](../../artifacts/redesign-frontend/FE-00/). Os artefatos são locais e ignorados pelo Git, conforme `.gitignore`; precisam ser anexados explicitamente se o relatório for compartilhado fora deste checkout.

| Rota | Desktop 1440×900 | Tablet 1024×768 | Mobile 390×844 |
|---|---|---|---|
| `/app` | [captura](../../artifacts/redesign-frontend/FE-00/baseline-app-1440x900.png) | [captura](../../artifacts/redesign-frontend/FE-00/baseline-app-1024x768.png) | [captura](../../artifacts/redesign-frontend/FE-00/baseline-app-390x844.png) |
| `/turmas` | [captura](../../artifacts/redesign-frontend/FE-00/baseline-turmas-1440x900.png) | [captura](../../artifacts/redesign-frontend/FE-00/baseline-turmas-1024x768.png) | [captura](../../artifacts/redesign-frontend/FE-00/baseline-turmas-390x844.png) |
| `/aulas` | [captura](../../artifacts/redesign-frontend/FE-00/baseline-aulas-1440x900.png) | [captura](../../artifacts/redesign-frontend/FE-00/baseline-aulas-1024x768.png) | [captura](../../artifacts/redesign-frontend/FE-00/baseline-aulas-390x844.png) |
| `/materiais` | [captura](../../artifacts/redesign-frontend/FE-00/baseline-materiais-1440x900.png) | [captura](../../artifacts/redesign-frontend/FE-00/baseline-materiais-1024x768.png) | [captura](../../artifacts/redesign-frontend/FE-00/baseline-materiais-390x844.png) |
| `/resultados/sessao-segmento` | [captura](../../artifacts/redesign-frontend/FE-00/baseline-resultados-1440x900.png) | [captura](../../artifacts/redesign-frontend/FE-00/baseline-resultados-1024x768.png) | [captura](../../artifacts/redesign-frontend/FE-00/baseline-resultados-390x844.png) |

Estado: contexto limpo e isolado por viewport, sem reutilizar armazenamento do usuário; três turmas e três materiais da seed, rascunho inicial **Proposta de Valor**, resultados em **Resumo**, sem filtro. Capturas integrais após carregamento e 1100ms de espera; elementos abaixo da dobra com useInView podem estar em estado inicial (barras sem preenchimento/mascotes ainda não carregados). Capturas não comprovam animação nem falha de dados por si só.

[`report.json`](../../artifacts/redesign-frontend/FE-00/report.json) registra URL, viewport, estado, fontes, limites e console. [`supplement.json`](../../artifacts/redesign-frontend/FE-00/supplement.json) registra toque e seleção local. [Vídeo normal](../../artifacts/redesign-frontend/FE-00/video/flow-no-preference.webm) e [reduzido](../../artifacts/redesign-frontend/FE-00/video/flow-reduce.webm) registram os gatilhos e destinos da sequência desktop; screenshots `action-*` e `mobile-*` registram estados finais, não um redesign “depois”.

| Fluxo observado | Resultado nesta rodada |
|---|---|
| Home → Preparar experiência | Abriu `/preparar-aula`, sete etapas e contexto inicial; normal, reduzido e toque |
| Turmas → Criar turma → reload | “Auditoria FE-00” permaneceu no armazenamento isolado; normal/reduzido. Busca mobile por Marketing retornou 1 card. |
| Turma → Alunos | Detalhe principal e roster abriram; Marketing preservou seu estado de início sem evidências individuais. |
| Aulas → primeira concluída | Navegou, porém para sessão errada, conforme achado P1; normal/reduzido. Recolher/abrir trilha mobile alternou aria-expanded false/true. |
| Material → detalhe → Escape | Dialog abriu, fechou e foco retornou ao card nos dois modos. Busca inexistente mostrou vazio e 0 cards. |
| Material → seleção local → reload → preparação | Metadados persistiram; nenhuma associação/arquivo remoto foi criado. Fixture explícita `FE00-audit.txt` só no contexto descartável. |
| Resultados → ArrowRight → Aprendizagem → Alunos → perfil | Aba e foco mudaram para Aprendizagem; abriu perfil de Alice Monteiro. Aba Questões alcançada por toque mobile. |
| IDs inválidos | Aluno e sessão exibiram dados fixos em vez de erro; defeitos reproduzidos. |
| Responsividade | 15/15 combinações sem overflow horizontal da página. Rolagem interna da tablist mobile é distinta de overflow da página. |
| Layout equivalente a zoom 200% | Cinco rotas em 720×450 CSS px, sem overflow; capturas `zoom-layout-*`. **Zoom nativo do navegador não foi executado**. |

`passed` nos JSONs significa que a sondagem conseguiu observar o comportamento; não aprova o produto quando o comportamento observado é um defeito.

## Comandos e checks

Executados a partir de `smart-edu/`:

```text
npm run dev
21st review components --json
npm run lint
npx tsc --noEmit
npm run build
node <Playwright detectado no npm-cache>/cli.js install ffmpeg
node scripts/audit-redesign-fe00.mjs <Playwright detectado>/index.mjs
node scripts/audit-redesign-fe00.mjs <Playwright detectado>/index.mjs http://127.0.0.1:5173 --supplement
npx eslint scripts/audit-redesign-fe00.mjs
```

Lint, TypeScript, build e lint do novo script: **passaram (exit 0)**. Build emitiu advisories de tempo de plugins e classificação estática de rotas do Vinext; não foram falhas. Auditoria final: 15 baselines, 18 sondagens desktop em dois modos, 2 vídeos, 5 sondagens de layout 200% equivalente; complemento com 8 sondagens mobile; nenhuma falha da automação. O primeiro ensaio capturou as páginas, mas falhou ao iniciar vídeo por FFmpeg ausente; após instalar o binário de teste, a rodada completa foi executada novamente. Não foram alteradas dependências do projeto.

Playwright foi encontrado em `C:/Users/murilob/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs`; o novo script recebe caminho por argumento, evitando fixar o cache pessoal como nos scripts históricos. `audit-campus.mjs`/`run-campus-check.mjs` foram inspecionados e não executados: apontam para porta 3000, cache de outro usuário e matriz que não cobre Materiais/tablet. Scripts de transformação histórica não foram executados.

Limites: não executados autenticação/negação real, upload remoto, geração remota, instalação limpa, leitores de tela, laudo completo de contraste, zoom nativo, estados remotos de erro/carregamento. Não há comparação visual antes/depois de redesign porque este ticket não altera a UI. A fase 01 e os tickets seguintes permanecem abertos.

## Preservação e divergências históricas

Na entrada já estavam modificados: `app/campus.css`, journey-classes/results/workspace, material-library, smart-edu-app e `docs/README.md`. Já existiam sem rastreamento: primitives locais de movimento, `lib/motion.ts`, `docs/issue-design.md`, pasta deste backlog, `mcp.json` e package/lock do diretório pai. Nenhum desses conteúdos de produto foi sobrescrito, resetado ou commitado.

`docs/README.md` e `IMPLEMENTATION_PLAN.md` citam porta 3000, checks anteriores e home com mapa de preparação. Nesta rodada, o processo real é 5173 e a home ativa tem hero novo, quatro nós SVG decorativos e preparação duplicada abaixo; `preparation-map.tsx` não está em seu caminho de renderização. As telas já possuem cores, mascotes e Motion, mas isso não comprova checkpoint interativo, dados reais ou drill-down correto. Evidências históricas não foram reutilizadas como validação.

Entrega: este relatório, script reproduzível, status/checklists FE-00, notas de lacuna nos tickets afetados e artefatos locais. Manifesto de hashes e checks em `artifacts/redesign-frontend/FE-00/` identifica a baseline da árvore suja desta rodada. Os próximos tickets devem comparar a mesma rota, viewport e estado com estas capturas e gravar novamente movimentos após suas alterações.

# FE-03: shell e contexto

Status: parcial. Data: 15/10/2026.

## Comportamento

O ProductApp fica no layout compartilhado; as paginas raiz/catch-all deixam de criar uma instancia nova do app. Cabecalho e busca permanecem montados. ContextTransition anima o conteiner sem usar key no subtree. O pathname continua determinando a identidade da pagina/turma.

A resolucao de turma usa rota, parametro turma ou rascunho conforme a superficie. Resultados/sessoes usam o vinculo da sessao disponivel em learning-data (arquivo alterado concorrentemente). Links contextuais distinguem visao da turma, aulas e resultados da navegacao global. Dados locais sao identificados como demonstracao.

Abas de turma e resultados, busca/curso/visualizacao de turmas e busca/filtro de alunos usam URL. Parametros nao relacionados sao preservados. Navegacao por historico assina popstate: os hooks do router observados nesta execucao deixavam estado visual anterior apos voltar. Foco vai ao conteudo quando muda pathname; filtros/abas mantem foco no controle. Titulo inclui area e turma. Nao existe filtro funcional de periodo nessa superficie: periodo continua sendo metadado, sem controle inventado.

## Arquivos desta rodada

- app/layout.tsx, app/page.tsx, app/[...path]/page.tsx: instancia compartilhada.
- lib/navigation.ts: contexto, URL e historico.
- components/product/product-shell.tsx: navegacao contextual, foco e titulo.
- components/product/editorial-motion.tsx: transicao sem remontagem dos filhos.
- components/product/journey-classes.tsx, classes.tsx, journey-results.tsx, journey-lessons.tsx, journey-workspace.tsx e components/smart-edu-app.tsx: conexao com contexto/estado URL; alguns receberam trabalho concorrente posterior, preservado.
- app/foundations.css: barra contextual e foco visivel.
- scripts/audit-redesign-fe03.mjs e scripts/verify-redesign-fe03.mjs: evidencias e regressao de navegacao.

## Ambiente e checks

Preview existente confirmado como Smart Edu em http://127.0.0.1:5173, Vinext. Playwright/Edge headless com cache local informado por argumento. Dados demo em contextos isolados, turmas marketing e empreendedorismo.

Comandos:

```text
node scripts/verify-redesign-fe03.mjs C:/Users/murilob/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs
npx eslint lib/navigation.ts components/product/product-shell.tsx components/product/editorial-motion.tsx components/product/journey-classes.tsx app/layout.tsx "app/[...path]/page.tsx" app/page.tsx
npx tsc --noEmit
npm run lint
npm run build
```

ESLint dos arquivos do shell e TypeScript passaram. Build passou antes das ultimas alteracoes concorrentes, com aviso conhecido de classificacao estatica do Vinext. Lint global falhou na rodada por setState em effect de MaterialPreview, em material-library.tsx, com warnings de imports em smart-edu-app.tsx. Nao atribuir esse resultado a versao final sem repetir apos estabilizar o trabalho concorrente.

Busca 21st autenticada com credencial do mcp.json retornou referencias de breadcrumb; primitives locais foram mantidas. Review 21st de quatro arquivos retornou zero findings. MCPs 21st/Motion nao expostos nesta sessao; consultadas documentacoes oficiais https://motion.dev/docs/react-animate-presence e https://ui.shadcn.com/docs/components/base/breadcrumb.

## Evidencias e limites

Capturas e videos em artifacts/redesign-frontend/FE-03. interactions.json registra somente verificacoes efetivamente concluidas por execucao. Uma captura inicial foi sobrescrita por engano ao repetir a auditoria: nao ha par antes/depois valido nesta rodada. As capturas existentes sao posteriores.

Pendentes: par antes/depois equivalente; revisao visual das gravacoes normal/reduced; matriz completa de teclado/avancar; integrar checks globais apos alteracoes concorrentes. Uma rodada anterior detectou overflow a 200% na area de Resultados alterada concorrentemente; validacao final de responsividade do shell usa Aulas. Nao declarar todo o redesign ou integracao academica concluida. Perfil/notificacoes continuam fora do recorte funcional; autorizacao academica nao foi simulada.

## Resultado final da matriz de navegacao

Seis combinacoes concluiram as assertions funcionais: 1440x900, 1024x768 e 390x844, em movimento normal e reduzido. Foram comprovados filtros/visualizacao por URL, aba apos reload/voltar, duas turmas, contexto de Aulas, identidade DOM do cabecalho, foco e ausencia de overflow em Aulas inclusive zoom 200%. Capturas e videos foram gravados em cada combinacao.

O comando completo terminou com falha na assertion de console limpo: tres eventos pageerror com mensagem "signal is aborted without reason". Origem nao isolada; nao assumir que sejam inofensivos nem declarar a suite aprovada. Validacao de console continua aberta. Durante a execucao houve HMR/edicoes concorrentes em componentes compartilhados; as evidencias nao equivalem a uma revisao final de todos esses arquivos.

## Recuperacao apos relato de frontend quebrado (15/10/2026)

A entrega anterior encerrou sem validacao integrada suficiente. Foram identificados: sintaxe corrompida durante edicoes concorrentes; espaco vertical de 320px nos titulos mobile por flex-basis herdado; seletor SVG amplo que esticava icones; barra contextual sem margem; e AbortError no historico do Vinext que abria overlay bloqueando cliques.

A camada URL agora grava filtros/abas no historico do navegador sem requisicao RSC a cada tecla. O restore de rotas da aplicacao persistente e feito pela assinatura de localizacao, evitando duas restauracoes simultaneas (cliente e RSC). Entradas diretas e demais navegacoes continuam usando as rotas existentes. O seletor CSS do mapa foi limitado ao SVG principal, a barra recebeu margens, e a base flex mobile foi corrigida para auto. Textos corrompidos foram corrigidos pontualmente sem substituir operadores.

Evidencias em artifacts/redesign-frontend/recovery/routes.json, flows.json e capturas por rota/largura. As seis rotas /app, /turmas, /aulas, /materiais, /resultados/sessao-segmento e /preparar-aula abriram em 1440x900 e 390x844 com HTTP 200, CSS carregado, sem overflow horizontal ou pageerror. Capturas home/mobile foram inspecionadas visualmente. Teste adicional comprovou digitacao rapida, voltar/avancar, aba apos reload, dialogo de material/Escape e abas de resultados sem pageerror. Os registros anteriores permanecem como historico, nao como resultado da recuperacao.

### Resultado da recuperacao estabilizada

A ultima execucao de verify-redesign-fe03.mjs passou: seis combinacoes (1440x900, 1024x768, 390x844; normal/reduced), filtros, abas apos reload/voltar, duas turmas, shell preservado, foco e zoom 200%, com errors: []. TypeScript e lint globais passaram sem findings. O teste adicional de digitacao rapida/voltar/avancar e dialogs tambem passou. O erro de console anteriormente pendente foi isolado no abortSupersededNavigation do Vinext durante restauracao RSC concorrente; a aplicacao persistente agora restaura suas rotas cliente diretamente no popstate, mantendo entrada direta pelo servidor e links existentes.

O ticket permanece parcial somente em relacao ao pacote documental de evidencias/comparacao antes-depois e revisao completa de teclado/movimento; isso nao deve ser confundido com frontend quebrado ou testes funcionais reprovados na versao recuperada.

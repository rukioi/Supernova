# FE-02 ? Sistema de motion compartilhado

Status: conclu?do em 15/10/2026. Recorte: primitives e seus consumidores ativos; altera??es locais anteriores preservadas.

## Auditoria e decis?es

Counter e CountUp duplicavam contagem por visibilidade; progresso come?ava vazio; TiltCard acompanhava o mouse; CTA de prepara??o acionava confetti sem conquista; mascote e elementos do hero tinham loops. ContextTransition aguardava a sa?da anterior antes de mostrar conte?do novo. A trilha ativa de aulas apenas alternava hidden.

Reutilizadas as primitives locais. Tempos: micro 160ms, sele??o 200ms, expans?o 300ms, painel 360ms; entrada 280ms, dados 240ms e stagger 35ms. Tokens CSS e Motion equivalentes, mantidos aliases para consumidores existentes. Sem biblioteca nova. MCPs Motion/shadcn indispon?veis; refer?ncias consultadas: [acessibilidade Motion](https://motion.dev/docs/react-accessibility), [tabs shadcn](https://ui.shadcn.com/docs/components/base/tabs). Busca 21st tentada via CLI: autentica??o indispon?vel; sem instala??o ou gera??o.

## Comportamento e arquivos

- `lib/motion.ts`, `app/globals.css`: vocabul?rio de tempos, dist?ncias curtas e curva compartilhada.
- `components/product/editorial-motion.tsx`: sele??o com indicador de 200ms; contexto novo dispon?vel imediatamente; DisclosureContent compartilha expans?o de 300ms, preserva conte?do montado e aplica inert/aria-hidden enquanto fechado.
- `components/product/journey-lessons.tsx`: trilha usa DisclosureContent, conserva foco no bot?o durante interrup??o.
- `components/ui/counter.tsx`, `components/product/journey-ui.tsx`: CountUp ? alias de Counter; valor real na entrada e anima??o cancel?vel somente em atualiza??o; acessibilidade anuncia o destino, n?o n?meros intermedi?rios. JourneyProgress usa ProgressBar.
- `components/ui/progress-bar.tsx`: valor inicial real; transi??o apenas ap?s mudan?a; limite 0?100; estado acess?vel acompanha o dado.
- `components/ui/stagger.tsx`: entrada por montagem/contexto, conte?do leg?vel durante toda a sequ?ncia, sem depend?ncia de scroll.
- `components/ui/tilt-card.tsx`, `scroll-line.tsx`: wrappers compat?veis, sem tilt ou progresso derivado de scroll.
- `components/ui/reward-button.tsx`, `components/product/journey-workspace.tsx`: removido react-rewards; CTA ativo usa JourneyButton e s? navega. Wrapper antigo preservado para compatibilidade.
- `components/smart-edu-app.tsx`: MotionConfig reducedMotion=user cobre layout; scroll program?tico respeita prefer?ncia.
- `app/foundations.css`: feedback de press?o, foco de cards, transi??es de estado; removidos loops decorativos do hero/mascote; movimento reduzido mant?m destino e conte?do.
- Scripts `audit-redesign-fe02.mjs`, `verify-redesign-fe02.mjs`, `verify-redesign-fe02-progress.mjs`: reprodu??o das verifica??es desta entrega.

AnimatedTabs permanece adaptador de LocalTabs; Checkpoint continua sem anima??o de entrada. Nenhuma abstra??o concorrente de AnimatedCard/AnimatedMetric/ProgressJourney foi criada.

## Evid?ncias executadas

Ambiente: Windows, Node 24.18.0, Vite/Vinext j? dispon?vel em http://127.0.0.1:5173, t?tulo Smart Edu confirmado. Playwright do cache npm, Edge headless. Dados existentes de demonstra??o, contextos isolados sem autentica??o remota.

Diret?rio: `artifacts/redesign-frontend/FE-02/`.

- `before-*.png`, `after-*.png`, `before.json`, `after.json`: mesmas cinco rotas (/app, /turmas, /aulas, /materiais, /resultados/sessao-segmento), viewports 1440?900, 1024?768, 390?844, movimento reduzido para compara??o est?vel.
- `interactions.json`: seis combina??es viewport/prefer?ncia; setas, Home/End, sele??o r?pida; expans?o via Enter/Space e revers?o r?pida; conte?do recolhido inert; foco preservado; abertura por toque emulado a 390px; Escape e retorno ao card. Sem overflow em Materiais, inclusive zoom CSS 200%. Sem pageerror.
- `selection-*.png`, `expansion-*.png`: estado final e foco; captura mobile de expans?o inspecionada visualmente.
- `progress.json`, `progress-updated-*.png`: CTA ? prepara??o ? continuar ? retorno; progresso local muda de 0% para 29% em ambas as prefer?ncias; rolar at? o fim e retornar n?o reinicia barra.
- `video/*.webm`: oito grava??es dos fluxos, seis combina??es de intera??es e duas de atualiza??o do progresso. Capturas est?ticas n?o s?o usadas como prova temporal.

## Comandos e resultados

Executados em smart-edu:

```text
npm run lint                          passou
npx tsc --noEmit                       passou
npm run build                         passou
npx --yes @21st-dev/cli review <11 arquivos alterados>   0 findings
node scripts/audit-redesign-fe02.mjs <playwright/index.mjs> before
node scripts/audit-redesign-fe02.mjs <playwright/index.mjs> after
node scripts/verify-redesign-fe02.mjs <playwright/index.mjs>
node scripts/verify-redesign-fe02-progress.mjs <playwright/index.mjs>
```

Playwright utilizado: `C:/Users/murilob/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs`. Scripts recebem esse caminho por argumento. Uma primeira tentativa do script de progresso falhou por formato de import absoluto Windows; corrigida para pathToFileURL e reexecutada com sucesso.

## Limita??es

Instala??o limpa n?o executada: esta rodada verifica a ?rvore instalada; n?o afirma resolver todos os riscos de depend?ncias do FE-00. A refer?ncia a react-rewards foi removida sem alterar arquivos do diret?rio pai. Build mant?m aviso conhecido de classifica??o est?tica de rotas do Vinext. Toque e movimento reduzido s?o emulados; zoom de 200% validado na biblioteca por CSS, n?o via zoom nativo do navegador. N?o foram exercitados leitor de tela, dispositivo f?sico ou estados de backend inexistentes. Fluxos e integridade dos dados acad?micos permanecem nos respectivos tickets; nenhum dado ou backend novo foi criado.

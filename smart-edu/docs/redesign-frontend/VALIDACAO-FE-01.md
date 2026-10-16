# FE-01 — Fundações visuais

Implementado e validado em 15/10/2026, no recorte de fundações. FE-02 e seguintes continuam abertos.

## Decisão e arquivos

- `app/globals.css`: navy, azul, lima, lavender, coral, teal; cores fortes de texto semântico preservadas para contraste. Escala fluida de corpo/título/seção/display, largura de leitura, superfícies, borda de controles, espaçamento de 20 px e números tabulares.
- `app/foundations.css` + `app/layout.tsx`: camada final explícita e restrita ao produto ativo. Evita mexer nas onze folhas históricas e nas alterações locais preexistentes de campus. Títulos, números operacionais, controles, badges, textos de apoio e foco compartilham a base; cards escuros, neutros e coloridos mantêm sua hierarquia. Cabeçalho permite quebra sem altura fixa.
- Studio Sans já serve Inter local medium/bold; foi mantida para interface e títulos operacionais, removendo compressão e alternância com Arial/Arcade nessas áreas. Studio Display/Hand continuam disponíveis para usos editoriais existentes. Não houve download ou adição de fontes.
- `scripts/audit-redesign-fe01.mjs` e `scripts/verify-redesign-fe01.mjs`: capturas comparáveis, medições e interações em contextos isolados. `.21st/` registra contexto e decisões.

## Ambiente e evidências

Servidor Vinext/Vite existente, porta 5173, PID 17508; aplicação confirmada pelo título e `.journey-app`. Dados iniciais locais de demonstração, sem ler ou modificar armazenamento do navegador do usuário.

Evidências locais em `artifacts/redesign-frontend/FE-01/` (diretório ignorado pelo Git):

- `before-*.png`, `after-*.png`, `before.json`, `after.json`: `/app`, `/turmas`, `/aulas`, `/materiais`, `/resultados/sessao-segmento` em 1440×900, 1024×768 e 390×844. Mesmas rotas, dados e preferência de movimento reduzido. Quinze comparações; nenhum overflow de página ou erro JavaScript capturado após a mudança.
- `verification.json`, `focus-1440.png`, `focus-390.png`: Tab/Shift+Tab no campo de busca, foco com outline de 3 px, busca sem resultados, limpar filtros, abrir material, Escape e retorno de foco ao card. Executados em 1440×900 e 390×900, com movimento normal; gravações `.webm` em `video/`.
- `zoom-200-long-title-*.png`: título longo injetado somente no DOM isolado e `html.style.zoom=2`. Sem overflow da página nas duas larguras. Trata-se de simulação CSS, não teste de zoom nativo do Edge; no mobile há elementos decorativos fora dos limites e a navegação fixa existente é recortada nessa simulação. Não constitui certificação integral do shell em zoom nativo; aprofundar no FE-03.
- Inspeção visual executada nas capturas de home mobile, biblioteca desktop e título longo desktop. Contagem heurística de `small`, `.j-state` e `.j-eyebrow` visíveis abaixo de 12 px no conteúdo principal: zero nas quinze capturas finais; não é uma auditoria de todo texto da aplicação.

## Contraste

Razões WCAG calculadas por luminância sRGB para os pares especificados em `verification.json`:

| Par | Razão |
|---|---:|
| Texto / canvas | 14,81:1 |
| Texto secundário / branco | 6,20:1 |
| Branco / azul de ação | 5,48:1 |
| Navy / lima | 15,00:1 |
| Discovery / superfície discovery | 6,00:1 |
| Attention / superfície attention | 5,72:1 |
| Success / superfície success | 6,14:1 |
| Navy / lavender, coral, teal | 6,33 / 7,00 / 7,83:1 |
| Borda de controle / branco | 3,83:1 |

Estados mantêm rótulos textuais (PDF, atenção, concluída, agora) e ícones existentes; a cor não é a única informação. As razões verificam esses pares, não todas as combinações dos estilos históricos.

## Comandos e resultado

Executados em `smart-edu/`:

```text
npx --yes @21st-dev/cli init --design-context
npx --yes @21st-dev/cli search "accessible button input badge design system" --context auto --limit 3
node scripts/audit-redesign-fe01.mjs <playwright/index.mjs> before
node scripts/audit-redesign-fe01.mjs <playwright/index.mjs> after
node scripts/verify-redesign-fe01.mjs <playwright/index.mjs>
npm run lint
npx tsc --noEmit
npm run build
npx --yes @21st-dev/cli review app/globals.css app/foundations.css app/layout.tsx
```

Playwright encontrado em `C:/Users/murilob/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs`; Edge headless. Lint, TypeScript e build passaram. Build registra limitação conhecida de classificação estática de rotas do Vinext. Review 21st passou com 32 informações sobre hexadecimais na própria definição dos tokens; nenhuma correção automática aplicada. Busca 21st bloqueada por autenticação, sem instalar componentes. Primitives locais reutilizadas: JourneyButton, PageIntro, StateBadge, JourneyProgress, Dialog e campo de busca.

MCPs shadcn/Motion indisponíveis; consultadas as documentações oficiais de [Button](https://ui.shadcn.com/docs/components/base/button) e [acessibilidade Motion](https://motion.dev/docs/react-accessibility). Nenhum movimento novo foi introduzido. Baseline reduzido e gravações normais não certificam o sistema de movimento inteiro; isso pertence ao FE-02. Integrações, dados simulados e problemas funcionais mapeados em FE-00 permanecem nos tickets correspondentes. Estados de rede/permissão não foram inventados para esta mudança de CSS.

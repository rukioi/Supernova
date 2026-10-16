# Living Learning System — implementação MVP

## Auditoria e direção

A aplicação usa React 19, rotas Next/Vinext, Tailwind/CSS, Motion 14 e Recharts. Já existiam navegação contextual, dados demonstrativos identificados, preparação persistida e componentes de progresso. A intervenção preserva essas estruturas e alterações locais anteriores.

A prioridade é tornar estados e ações perceptíveis: navy como base, azul nas ações, lima na próxima etapa, lavanda em exploração, teal em evidências e coral na investigação. Sem instalar bibliotecas adicionais.

## Aplicação por página

- Visão Geral: hero mais compacto, desenho da conexão, checkpoints selecionáveis com informação e ação contextual, preparação em navy, mapa lavanda e evidências teal.
- Turmas: destaque da jornada, capítulos navegáveis e links para a aula selecionada; estados e contagens de demonstração explícitos.
- Aulas: bússola do módulo, seleção persistida na URL, expansão, próximo encontro e estados distintos para conclusão, presente e planejamento.
- Materiais: coleções por formato com contagem e seleção, capas diferenciadas, feedback de filtro, prévia e associação preservadas.
- Resultados: hierarquia para acerto, presença e gameplay; investigação derivada das respostas; contagens por objetivo e navegação contextual.

## Validação

`npm run lint`, `npx tsc --noEmit` e `npm run build` executados. Playwright verificou cinco rotas em 1440, 1024 e 390 px, sem overflow horizontal ou erros JavaScript. Interações verificadas: seleção de checkpoint e acesso ao resultado, aula por URL e recolhimento, filtros de coleção, abertura/fechamento de material e abas de resultados. A execução de 390 px usa movimento reduzido.

Capturas e relatório em `artifacts/living-system`. Script reproduzível: `node scripts/verify-living-system.mjs <caminho-para-playwright/index.mjs>`.

## Limites

Esta é uma evolução de MVP, sem backend novo. Sessões simuladas continuam identificadas como demonstração. Referências sem arquivo continuam com aviso de metadados e indisponibilidade de prévia. Dados individuais continuam limitados ao contexto da turma existente; autorização de produção depende do backend. Auditoria completa de acessibilidade e dispositivos físicos não realizada.

Motion e shadcn MCP indisponíveis; documentação oficial consultada. Busca 21st tentou autenticação e não obteve acesso; componentes existentes foram reutilizados. A revisão 21st apontou somente informações sobre cores literais da nova camada visual.

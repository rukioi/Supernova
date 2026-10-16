# FE-00 — Auditoria do frontend ativo e baseline

- Status: concluído (15/10/2026 — auditoria; implementação nos tickets seguintes)
- Fase: 01
- Dependências: Nenhuma
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 1, 10, 13, 14; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/smart-edu-app.tsx; app/[...path]/page.tsx; components/product; data/model.ts; lib/store.ts; scripts`.

## Resultado esperado

Mapear o que funciona hoje e preparar decisões implementáveis, com baseline comparável.

## Implementação

- [x] Subir a aplicação pelo script real; mapear as cinco páginas, detalhes e árvore de componentes ativa versus legado.
- [x] Inventariar tokens, fontes, Motion, Recharts e primitives existentes; preservar alterações locais e arquivos ainda não commitados.
- [x] Capturar baseline desktop/tablet/mobile das cinco páginas; registrar problemas prioritários de composição, legibilidade e interação.
- [x] Mapear fontes, permissões, dados demonstrativos, ações locais e dependências de backend; indicar lacunas nos tickets afetados.
- [x] Propor por página uma composição, hierarquia, ação principal e interação de maior impacto, antes de implementar.

## Critérios de aceite

- [x] Mapa de rotas/componentes e fontes de dados disponível.
- [x] Baseline identificada por rota, viewport e estado; checks históricos não são evidência desta rodada.
- [x] Cada página possui transformação visual concreta proposta e fluxo a preservar.

## Validação deste ticket

Abrir as cinco páginas e executar uma ação principal de cada uma. Registrar comportamento observado, console e diferenças em relação à documentação histórica.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

## Entrega desta rodada

[Relatório FE-00](../AUDITORIA-FE-00.md): árvore ativa/legado, inventário, achados priorizados, contratos faltantes, plano por página, comandos e limitações. Baseline: 15 capturas em 1440×900, 1024×768 e 390×844; ações principais em navegador, vídeos normal/reduzido e complemento com toque. Evidências em `artifacts/redesign-frontend/FE-00/`, ignoradas pelo Git. Lint, TypeScript, build e lint do script passaram. Sem alterações na UI; não há comparação de redesign antes/depois. IDs inválidos, sessão fixa e integrações ausentes permanecem como achados para os tickets indicados, sem impedir a conclusão do diagnóstico.

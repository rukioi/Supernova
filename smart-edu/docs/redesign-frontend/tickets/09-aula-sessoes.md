# FE-09 — Aula: experiências, sessões e acesso aos resultados

- Status: a fazer
- Fase: 02
- Dependências: [FE-08](08-aulas-timeline.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 7.4, 9.1, 9.8; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/journey-lessons.tsx; components/smart-edu-app.tsx; data/model.ts; lib/store.ts`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): primeira e segunda aulas concluídas abrem a mesma `/resultados/sessao-segmento`; a primeira exibe resultado com título diferente da aula de origem. `data/model.ts` não tem coleção versionada aula → experiência → sessões. Resolver identidade antes de oferecer múltiplos destinos.

Ligar aula executada a sessões identificadas, preparando o drill-down.

## Implementação

- [ ] Exibir experiências/sessões vinculadas à aula com ID, data e versão executada quando disponíveis.
- [ ] Para múltiplas sessões, mostrar escolha explícita em vez de somar ou misturar métricas.
- [ ] Preservar turma/aula de origem no destino e retorno, mantendo URLs antigas de resultados.
- [ ] Tratar vínculo/relatório ausente como indisponível; documentar integração faltante.

## Critérios de aceite

- [ ] Aula → experiência → sessão → resultado tem destino rastreável.
- [ ] Duas sessões não compartilham métricas por engano.
- [ ] Sessão ausente não abre relatório padrão de demonstração.

## Validação deste ticket

Validar zero/uma/múltiplas sessões com fixtures identificadas em testes; entrar por link direto e retornar à aula.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

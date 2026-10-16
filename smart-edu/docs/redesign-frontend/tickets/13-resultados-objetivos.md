# FE-13 — Gráficos: objetivos, evidências e participação

- Status: a fazer
- Fase: 03
- Dependências: [FE-12](12-resultados-tempo.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 9.4 B, 9.4 C, 9.7; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/journey-results.tsx; data/model.ts; containers de FE-12`.

## Resultado esperado

Explicar aprendizagem e participação sem confundir ausência com dificuldade.

## Implementação

- [ ] Criar barras horizontais ordenadas ou dot plot por objetivo com quantidade de evidências e acesso ao detalhe.
- [ ] Heatmap objetivo×aula somente com dados suficientes; distinguir lacuna de zero.
- [ ] Representar total, participantes, ausentes e respostas registradas com denominadores explícitos.
- [ ] Selecionar objetivo abre questões/evidências em contexto, preservando filtros e origem.

## Critérios de aceite

- [ ] Tempo, objetivos e participação usam linguagens visuais adequadas e distintas.
- [ ] Insuficiente/não avaliado não se confunde com desempenho baixo.
- [ ] Seleção, legenda e tooltip acessíveis sem depender de cor/hover.

## Validação deste ticket

Reconciliar totais, selecionar objetivo e evidência; testar ausência de respostas, nome longo e conjunto grande no mobile.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

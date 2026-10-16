# FE-12 — Gráficos: evolução temporal e antes/depois

- Status: a fazer
- Fase: 03
- Dependências: [FE-11](11-resultados-visoes.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 9.4 A, 9.4 D, 9.6; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/journey-results.tsx; Recharts existente; components/ui/chart.tsx se aplicável`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): 43/69/72 e +29 pp são constantes de apresentação, sem avaliações comparáveis. Recharts está instalado, mas não é usado na página ativa. Ausência de observações deve produzir estado de insuficiência, sem preencher séries artificialmente.

Mostrar evolução com gráficos interativos sustentados por medições comparáveis.

## Implementação

- [ ] Criar ChartContainer onde houver repetição real: contexto, unidade, legenda, filtros e estados.
- [ ] Implementar linha/área com observações ordenadas no tempo; manter lacunas sem interpolação enganosa.
- [ ] Criar slope chart/comparação de dois momentos apenas com medições disponíveis; usar pontos percentuais corretamente.
- [ ] Adicionar tooltip por hover/foco/toque, seleção, destaque e abertura de aula/sessão; transicionar sem loops.

## Critérios de aceite

- [ ] Valores, eixos, unidade e período legíveis; resumo/tabela equivalente acessível.
- [ ] Seleção abre registro correto e mantém filtro no retorno.
- [ ] Comparação ausente/incompatível tem estado honesto; reduced motion aplica destino imediatamente.

## Validação deste ticket

Conferir valores contra a fonte, série curta/com lacunas e comparação indisponível; selecionar por teclado/toque e trocar filtros rapidamente.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

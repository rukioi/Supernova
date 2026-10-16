# FE-06 — Turmas: coleção editorial e checkpoints

- Status: a fazer
- Fase: 02
- Dependências: [FE-05](05-overview-operacao.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 6.1, 6.2; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/journey-classes.tsx; components/product/journey-ui.tsx; lib/store.ts`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): capturas desktop/tablet mostram superfícies fragmentadas nas turmas secundárias e panda sobre “Próximo encontro” em 1024px. Investigar wrappers Tilt/Stagger e composição 3D antes de consolidar cards; criação e filtros locais funcionaram nesta rodada.

Fazer cada turma comunicar identidade, situação e progresso com busca e alternância úteis.

## Implementação

- [ ] Redesenhar coleção/lista; destaque deriva da turma atual/selecionada, não apenas da posição da busca.
- [ ] Exibir curso, alunos, módulo, estado, progresso e próximo evento quando disponíveis; remover progresso fixo apresentado como real.
- [ ] Tornar checkpoints navegáveis com rótulos; evitar controles interativos aninhados no link do card.
- [ ] Animar filtro/alternância com layout estável; preservar filtros no retorno e funcionamento de criação existente.

## Critérios de aceite

- [ ] Busca, filtro e coleção/lista preservam resultados e seleção.
- [ ] Estados concluído/atual/futuro refletem registros disponíveis e levam à turma correta.
- [ ] Card, CTA e checkpoints operáveis sem cliques ambíguos por teclado/toque.

## Validação deste ticket

Filtrar uma turma, abrir checkpoint, voltar e alternar lista; testar busca vazia e turma nova sem aulas.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

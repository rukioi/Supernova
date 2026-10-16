# FE-17 — Material: detalhe contextual e reutilização

- Status: a fazer
- Fase: 04
- Dependências: [FE-16](16-materiais-biblioteca.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 8.3, 11, 12; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/material-library.tsx; primitives de dialog/drawer existentes; lib/store.ts`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): Dialog fecha com Escape e devolve foco, mas “Ir para preparação” não associa o material ao rascunho. Wizard inicia com arquivo fixo. Faltam assetId/URL/bytes persistentes e relação material ↔ aula; preservar foco e explicitar indisponibilidade de abrir o arquivo.

Explorar e associar material sem perder a biblioteca.

## Implementação

- [ ] Abrir painel com preview, metadados e aulas relacionadas; adaptar a view/bottom sheet no mobile.
- [ ] Implementar foco inicial, contenção quando modal, Escape e retorno ao acionador.
- [ ] Conectar abrir/reutilizar/associar ao rascunho conforme suporte real; sucesso apenas após confirmação.
- [ ] Preservar seleção/filtros; tratar arquivo indisponível e preview incompatível.

## Critérios de aceite

- [ ] Associação altera rascunho correto e pode ser conferida no planejamento.
- [ ] Sem integração, ação fica explicitamente indisponível; toast sozinho não representa sucesso.
- [ ] Painel cabe no viewport, rola adequadamente e não perde foco.

## Validação deste ticket

Abrir/fechar/reutilizar e conferir rascunho; repetir por teclado/toque e com preview indisponível.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

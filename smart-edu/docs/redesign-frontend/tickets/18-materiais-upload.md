# FE-18 — Material: upload e estados de recuperação

- Status: a fazer
- Fase: 04
- Dependências: [FE-17](17-materiais-detalhe.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 8.4, 13; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/material-library.tsx; lib/store.ts; contrato identificado em FE-00`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): seleção local salva somente nome/tipo/tamanho/data (confirmado após reload), sem conteúdo ou upload. Faltam transporte, armazenamento, confirmação, erro e idempotência; “Disponível para planejamento” não comprova arquivo enviado. Contrato mínimo documentado no relatório.

Dar feedback fiel ao envio e distinguir seleção local de disponibilidade no sistema.

## Implementação

- [ ] Inspecionar suporte real; mapear seleção, validação, envio, processamento, disponível e erro.
- [ ] Percentual somente se fornecido pelo transporte; sem isso, usar progresso indeterminado.
- [ ] Evitar duplicação, permitir recuperação e cancelar apenas se o transporte suportar.
- [ ] Sem backend, entregar seleção/validação local identificada e manter critérios de envio pendentes com contrato necessário.

## Critérios de aceite

- [ ] Disponível somente após confirmação; arquivo selecionado não parece publicado.
- [ ] Erro permite recuperação sem duplicação e preserva contexto.
- [ ] Conclusão integral exige envio real validado; implementação local fica parcial com dependência registrada.

## Validação deste ticket

Testar arquivo inválido, envio válido, falha e nova tentativa. Mock identificado pode validar UI, mas não comprova integração real.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

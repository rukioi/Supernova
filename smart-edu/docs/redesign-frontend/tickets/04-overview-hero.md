# FE-04 — Visão Geral: hero com jornada interativa

- Status: a fazer
- Fase: 01
- Dependências: [FE-03](03-shell-contexto.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 5.1, 5.3; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/journey-workspace.tsx; components/product/preparation-map.tsx; components/product/journey-ui.tsx; app/campus.css`.

## Resultado esperado

Criar o primeiro grande momento visual: centro de comando com próximo passo claro.

## Implementação

- [ ] Recompor hero azul com título editorial, turma, objetivo imediato e CTA de preparar/continuar aula.
- [ ] Evoluir mapa SVG/HTML com checkpoints, etapa atual e próximo encontro baseados nos dados disponíveis.
- [ ] Orquestrar entrada única: título, traçado, checkpoint atual e próxima experiência; não bloquear uso.
- [ ] Dar rótulos, foco/seleção e navegação aos checkpoints; simplificar mapa no mobile mantendo ações.

## Critérios de aceite

- [ ] Em 1440×900, o início da área operacional aparece na primeira dobra.
- [ ] Checkpoint abre aula correta por mouse, teclado e toque.
- [ ] Sem loops; progresso vem de estado disponível e demonstração permanece identificada.

## Validação deste ticket

Capturar antes/depois em 1440×900 e 390×844; gravar entrada e seleção com movimento normal/reduzido.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

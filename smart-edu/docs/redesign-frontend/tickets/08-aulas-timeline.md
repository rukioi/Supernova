# FE-08 — Aulas: timeline editorial expansível

- Status: a fazer
- Fase: 02
- Dependências: [FE-07](07-turma-detalhe.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 7.1, 7.2, 7.3; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/journey-lessons.tsx; components/product/lessons-journey.tsx; components/product/journey-ui.tsx`.

## Resultado esperado

Tornar passado, presente e futuro reconhecíveis numa progressão interativa.

## Implementação

- [ ] Dar maior peso à aula atual com template, duração, preparação e CTA; compactar concluídas e reduzir peso das futuras.
- [ ] Implementar expansão inline com layout motion, aria-expanded e ações por estado.
- [ ] Revelar percurso no scroll sem alterar conclusão; estados vêm dos registros.
- [ ] Resumo de módulo sticky limitado no desktop e recolhível no mobile, com objetivos/dificuldades somente com evidências.

## Critérios de aceite

- [ ] Conclusão não muda ao rolar/expandir; aula atual é dominante.
- [ ] Expansão preserva foco e posição útil, sem sobreposição.
- [ ] Aula futura não oferece resultado inexistente; CTA atual abre fluxo correto.

## Validação deste ticket

Expandir aulas por teclado em desktop/mobile com e sem reduced motion; verificar scroll e resumo.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

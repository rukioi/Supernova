# FE-15 — Drill-down completo e perfil individual

- Status: a fazer
- Fase: 03
- Dependências: [FE-14](14-resultados-sessao.md), [FE-09](09-aula-sessoes.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 9.1, 9.7, 9.8, 10; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/smart-edu-app.tsx (StudentProfile/Roster); components/product/journey-results.tsx; router/dados ativos`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): `/turmas/empreendedorismo/alunos/fe00-inexistente` exibe Ana Clara Martins pelo fallback `students[0]`; nenhuma validação de pertencimento/autorização acadêmica foi demonstrada. Corrigir ID inválido e preservar turma/sessão/filtros no retorno antes de expandir o drill-down.

Completar investigação até o aluno com navegação e retorno previsíveis.

## Implementação

- [ ] Ligar turma → aula → sessão → objetivo/questão → aluno com breadcrumbs e IDs, evitando modais sobre modais.
- [ ] Drawer para investigação breve; página dedicada para perfil completo; retorno restaura filtros, aba, período e posição útil.
- [ ] Substituir fallback para students[0] e percentuais/evidências arbitrários por registros identificados ou indisponibilidade.
- [ ] Respeitar autorização no acesso individual inclusive URL direta; se serviço autoritativo faltar, isolar demo e registrar integração pendente.

## Critérios de aceite

- [ ] Percurso funciona nos dois sentidos sem trocar turma/sessão/aluno.
- [ ] ID inválido, sem permissão e sem evidência têm estados distintos.
- [ ] Nenhuma alegação de privacidade em produção baseada só no client.

## Validação deste ticket

Percorrer fluxo por mouse/teclado, recarregar detalhe, voltar/avançar e testar URL inválida/não autorizada. Fechar marco 03 com captura e gravação.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

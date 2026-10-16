# FE-07 — Turma: ambiente contextual e aba Resultados

- Status: a fazer
- Fase: 02
- Dependências: [FE-06](06-turmas-colecao.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 6.3, 10; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/smart-edu-app.tsx (ClassDetail); components/product/classes.tsx; components/product/journey-results.tsx`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): turma principal usa ClassDetail interno a `smart-edu-app.tsx`; outras usam `classes.tsx`, que continua ativo. Convites/exportação/configuração não integram backend; criação de turma é apenas localStorage. Preservar estados iniciais das turmas sem evidências.

Permitir trabalhar dentro de uma turma, incluindo resultados, sem perder seu contexto.

## Implementação

- [ ] Inspecionar os caminhos atuais de detalhe e alinhar comportamento na árvore ativa, sem refatorar legado sem uso.
- [ ] Estruturar Visão Geral, Aulas, Alunos, Resultados e Recompensas conforme capacidades existentes; preservar outras abas úteis.
- [ ] Usar ID da rota em seletores, cabeçalho e ações; ID desconhecido não pode abrir silenciosamente a primeira turma.
- [ ] Persistir aba conforme FE-03; preparar Resultados para FE-11 com estado honesto até integração.

## Critérios de aceite

- [ ] Duas turmas não exibem os mesmos dados por fallback.
- [ ] Resultados existe dentro da turma e mantém seu nome/ID.
- [ ] Link direto, recarregamento e retorno funcionam; recompensas não sugerem administração remota inexistente.

## Validação deste ticket

Abrir abas por clique e URL, recarregar, trocar turma e testar ID inválido.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

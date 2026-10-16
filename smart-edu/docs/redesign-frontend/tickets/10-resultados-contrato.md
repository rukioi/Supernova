# FE-10 — Resultados: contrato de dados e integridade

- Status: a fazer
- Fase: 03
- Dependências: [FE-09](09-aula-sessoes.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 9.1, 9.4, 9.8, 13; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/journey-results.tsx; lib/demo-data.ts; lib/store.ts; data/model.ts; data/seed.ts`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): métricas e comparações de JourneyResults são literais; roster/presença incluem derivações da seed. Faltam respostas, denominadores, versão executada, observações comparáveis e autorização por turma/aluno. O prefixo `/resultados/*` aceita IDs inexistentes e exibe a sessão fixa. Não promover demo a indicador real.

Estabelecer fontes e regras antes de desenhar gráficos que possam sugerir conclusões incorretas.

## Implementação

- [ ] Mapear métricas, unidade, denominador, período, origem, evidência, contexto e versão executada.
- [ ] Criar seletores/adaptadores sobre tipos existentes para disponível, insuficiente, vazio, erro e sem permissão.
- [ ] Separar ausente, não respondeu e resposta incorreta; separar XP/ranking de domínio pedagógico.
- [ ] Definir comparabilidade temporal/antes-depois e remover percentuais/diferenças arbitrários.
- [ ] Isolar e identificar demo; registrar campos/APIs faltantes e tickets afetados.

## Critérios de aceite

- [ ] Toda métrica tem origem/denominador; ausência não vira zero de aprendizagem.
- [ ] Comparações incompatíveis são impedidas com explicação.
- [ ] Evidência insuficiente não gera diagnóstico; autorização não é simulada escondendo botões.

## Validação deste ticket

Verificar seletores com ausência, evidência insuficiente, períodos incompatíveis, sessões distintas e acesso negado. Se backend faltar, registrar bloqueio de integração sem alegar segurança implementada.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

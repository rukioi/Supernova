# FE-11 — Resultados: visão global e visão da turma

- Status: a fazer
- Fase: 03
- Dependências: [FE-10](10-resultados-contrato.md), [FE-07](07-turma-detalhe.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 9.1, 9.3; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/journey-results.tsx; components/smart-edu-app.tsx; components/product/product-shell.tsx`.

## Resultado esperado

Conectar análise geral ao ambiente da turma com resumo claro e contextual.

## Implementação

- [ ] Criar/evoluir entrada global preservando rotas atuais e consumindo FE-10.
- [ ] Compor resumo assimétrico com período, participação e principal sinal disponível.
- [ ] Integrar visão agregada à aba Resultados com turma fixada pelo contexto.
- [ ] Persistir filtros/período; fornecer destinos de aula/sessão e estrutura acessível para gráficos seguintes.

## Critérios de aceite

- [ ] Contexto e sinal principal compreensíveis sem percorrer cards equivalentes.
- [ ] Global abre uma turma; aba contextual não mistura turmas.
- [ ] Filtros alteram dados; carregamento/erro não mostram dados antigos como atuais.

## Validação deste ticket

Aplicar período/turma, abrir contexto, voltar e recarregar; verificar restauração e ausência de dados.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

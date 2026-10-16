# FE-16 — Materiais: biblioteca editorial e filtros

- Status: a fazer
- Fase: 04
- Dependências: [FE-15](15-resultados-drilldown.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 8.1, 8.2, 8.3; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/material-library.tsx; components/product/materials.tsx; lib/store.ts`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): cards não preenchem visualmente suas colunas, inclusive no mobile; capas repetem a mesma estrutura. Busca, vazio e detalhe funcionam, mas o acervo é demo/local e não possui URLs de arquivo nem vínculos de aula no modelo atual.

Criar acervo reconhecível, fácil de explorar e conectado ao planejamento.

## Implementação

- [ ] Diferenciar PDF, documento, slides, links e tipos suportados por previews/capas consistentes.
- [ ] Usar miniatura real quando segura/disponível; capa gráfica indica tipo sem inventar conteúdo.
- [ ] Exibir título, tipo, data, informações relevantes e vínculos com aulas quando disponíveis.
- [ ] Busca/filtros combinados com transição curta de layout e preservação no retorno.

## Critérios de aceite

- [ ] Tipos distinguíveis sem depender apenas de cor ou ícone genérico repetido.
- [ ] Filtros alteram coleção; vazio oferece recuperação.
- [ ] Títulos longos e quantidades variadas mantêm hierarquia no mobile.

## Validação deste ticket

Combinar busca/tipo, limpar filtros e abrir material; conferir preview ausente e links conforme suporte real.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

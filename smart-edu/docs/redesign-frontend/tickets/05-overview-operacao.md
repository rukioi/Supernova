# FE-05 — Visão Geral: pulso, descobertas e continuidade

- Status: a fazer
- Fase: 01
- Dependências: [FE-04](04-overview-hero.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 5.2, 5.3; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/journey-workspace.tsx; components/product/preparation-map.tsx; lib/store.ts`.

## Resultado esperado

Transformar conteúdo abaixo do hero em decisões operacionais conectadas à jornada.

## Implementação

- [ ] Compor regiões distintas: próxima experiência, pulso da turma, descobertas recentes e continuidade.
- [ ] Conectar preparação ao rascunho e descobertas às evidências/resultados; diferenciar ação de informação.
- [ ] Usar grid assimétrico e superfícies com hierarquia, evitando quatro cards equivalentes.
- [ ] Aplicar revelação discreta e conexão visual com a jornada; tratar vazio, erro e carregamento sem inventar dados.

## Critérios de aceite

- [ ] Continuar abre fluxo e rascunho corretos.
- [ ] Descobertas apontam para evidências disponíveis; nenhuma métrica de preenchimento.
- [ ] Situação atual e próximo passo compreensíveis sem depender da animação.

## Validação deste ticket

Continuar rascunho, voltar e abrir evidência; repetir sem dados e no mobile. Fechar marco 01 com evidências visuais.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

# FE-03 — Shell, contexto ativo e transições

- Status: parcial
- Fase: 01
- Dependências: [FE-02](02-sistema-motion.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 4.3, 10, 11; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/product-shell.tsx; components/smart-edu-app.tsx; components/product/editorial-motion.tsx`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): shell deriva contexto de pathname/rascunho/primeira turma; home, detalhes e resultados usam fontes diferentes. Perfil/notificações só geram toast. Infraestrutura de autenticação existente não comprova autorização acadêmica por turma/aluno.

Manter orientação e continuidade ao navegar entre áreas e turmas.

## Implementação

- [x] Distinguir navegação global/contextual; explicitar turma, breadcrumb e retorno.
- [x] Preservar shell/cabeçalho e transicionar somente conteúdo pertinente, sem remontar a aplicação inteira.
- [x] Definir preservação de filtros, abas e período por URL/estado compatível com o router existente.
- [ ] Manter identidade de turma/aula na navegação; usar transição contextual equivalente quando shared element real causar instabilidade.

## Critérios de aceite

- [ ] URLs existentes continuam acessíveis por entrada direta/recarregamento.
- [ ] Voltar/avançar restaura contexto e filtros sem trocar a identidade dos dados.
- [ ] Foco e título acompanham navegação; shell permanece estável em trocas rápidas.

## Validação deste ticket

Abrir links diretos, navegar entre duas turmas e usar histórico. Conferir foco e filtros preservados.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

## Registro da rodada

Implementação e alcance dos checks em [VALIDACAO-FE-03.md](../VALIDACAO-FE-03.md). Checklist geral permanece aberto por evidências e validações pendentes.

# FE-19 — Refinamento integrado e validação final

- Status: a fazer
- Fase: 04
- Dependências: [FE-18](18-materiais-upload.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 12, 14, 15, 16, 17; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `cinco páginas ativas; components/product/product-shell.tsx; CSS ativo; scripts existentes`.

## Resultado esperado

Consolidar experiência marcante, coerente e funcional de ponta a ponta.

## Implementação

- [ ] Revisar ritmo, assimetria, tipografia, superfícies e ícones nas cinco páginas; corrigir aparência genérica/incompatível.
- [ ] Executar home → preparação; turma → aula → sessão → aluno → retorno; material → associação → planejamento.
- [ ] Validar 1440×900, 1024×768 e 390×844, teclado, toque, zoom 200%, reduced motion e estados extremos.
- [ ] Inspecionar custo de animação, layout shift, sobreposição, overflow e foco; remover loops e custo sem propósito.
- [ ] Executar lint, TypeScript e build pelos scripts reais; checks aplicáveis com falhas anteriores separadas de regressões.

## Critérios de aceite

- [ ] Cinco páginas compartilham identidade, possuem composições próprias e demonstram melhoria de tarefa.
- [ ] Momentos visuais/microinterações comprovados; nenhuma tarefa espera animação.
- [ ] Sem regressões críticas abertas; pendências externas não são declaradas concluídas.
- [ ] Antes/depois, gravações, comandos/resultados disponíveis e marcos fechados por evidência.

## Validação deste ticket

Executar a matriz de VALIDACAO.md. Registrar por fluxo: passou, falhou, não executado ou bloqueado, com reprodução e artefatos.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

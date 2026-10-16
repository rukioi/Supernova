# FE-14 — Sessão: abas, gameplay, questões e insights

- Status: a fazer
- Fase: 03
- Dependências: [FE-13](13-resultados-objetivos.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 9.2, 9.3, 9.4 E, 9.5, 9.6; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `components/product/journey-results.tsx; components/ui/animated-tabs.tsx; components/product/journey-ui.tsx`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): `?intencao=reforco` não é consumido pelo wizard; “Preparar reforço” só navega. Valores de questões/gameplay são demonstrativos; aba Questões exige rolagem interna no mobile. Abas funcionam por setas, mas precisam de associação semântica aos painéis.

Transformar relatório de sessão em análise útil com gameplay e aprendizagem separados.

## Implementação

- [ ] Estruturar Resumo, Aprendizagem, Gameplay, Alunos e Questões com indicador ativo e estado preservado.
- [ ] Criar visual próprio para ranking/equipes, recursos e eventos disponíveis; XP não representa aprendizagem.
- [ ] Diversificar insights positivo, atenção, comparação e próxima ação, ligando conclusões às evidências.
- [ ] Tornar questões exploráveis com respostas, contexto e ligação a objetivo/aluno quando autorizado.
- [ ] Preparar reforço apenas como sugestão/rascunho revisável; não aplicar alteração pedagógica automaticamente.

## Critérios de aceite

- [ ] Resumo informa resultado principal, ponto de atenção e fonte.
- [ ] Abas/filtros mantêm sessão correta e seleção pertinente.
- [ ] Insight sem evidência não vira fato; reforço não publica nem altera material aprovado automaticamente.

## Validação deste ticket

Trocar abas por teclado, abrir questão/evidência, preparar rascunho e voltar. Conferir separação semântica/visual de ranking e aprendizagem.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

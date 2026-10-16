# Redesign significativo do frontend — Smart Edu / Supernova

Este backlog divide o prompt original em **20 tickets executáveis**. O objetivo é uma mudança forte de composição, hierarquia, navegação, visualização de dados e resposta às ações. Movimento faz parte da entrega funcional de cada página.

A [direção criativa original](DIRECAO-CRIATIVA.md) foi preservada integralmente. Ela governa a intenção visual; este índice governa a sequência. **Resultados vem antes de Materiais**, conforme a prioridade mais recente, substituindo a ordem da seção 13.1 original.

## Como executar

1. Ler [CONTRATO-DE-EXECUCAO.md](CONTRATO-DE-EXECUCAO.md), direção criativa e ticket escolhido.
2. Começar por FE-00 e implementar um ticket por vez, verificando dependências no código atual.
3. Validar no navegador a superfície alterada antes de seguir; fechar cada fase com revisão integrada.
4. Registrar evidências, limitações e status. Ação falsa, animação sem função ou dado fabricado não fecha ticket.

Nenhum ticket foi implementado ou validado pela reorganização documental original. Em 15/10/2026, FE-00 foi executado: [auditoria, baseline e plano por página](AUDITORIA-FE-00.md), e FE-01 recebeu [implementação e validação das fundações visuais](VALIDACAO-FE-01.md). FE-02 recebeu [consolida??o e valida??o do sistema de motion](VALIDACAO-FE-02.md). Os demais tickets permanecem abertos. Documentação histórica e alterações locais são insumos, não prova de conclusão desta rodada.

## 01 — Design System + Visão Geral

Identidade, linguagem de movimento e primeiro grande momento visual.

- [x] [FE-00 — Auditoria do frontend ativo e baseline](tickets/00-auditoria.md)
- [x] [FE-01 — Design system: cor, tipografia e superfícies](tickets/01-fundacoes-visuais.md)
- [x] [FE-02 — Motion compartilhado e primitives de interação](tickets/02-sistema-motion.md)
- [ ] [FE-03 — Shell, contexto ativo e transições](tickets/03-shell-contexto.md) ? parcial; ver [validação](VALIDACAO-FE-03.md)
- [ ] [FE-04 — Visão Geral: hero com jornada interativa](tickets/04-overview-hero.md)
- [ ] [FE-05 — Visão Geral: pulso, descobertas e continuidade](tickets/05-overview-operacao.md)

**Saída da fase:** Hero contextual, operação útil e movimento compartilhado demonstrados em desktop/mobile.

## 02 — Turmas + Aulas

Coleção de jornadas, contexto persistente e progressão interativa.

- [ ] [FE-06 — Turmas: coleção editorial e checkpoints](tickets/06-turmas-colecao.md)
- [ ] [FE-07 — Turma: ambiente contextual e aba Resultados](tickets/07-turma-detalhe.md)
- [ ] [FE-08 — Aulas: timeline editorial expansível](tickets/08-aulas-timeline.md)
- [ ] [FE-09 — Aula: experiências, sessões e acesso aos resultados](tickets/09-aula-sessoes.md)

**Saída da fase:** Entrar em turma, expandir aula, escolher sessão e voltar mantendo contexto/filtros.

## 03 — Resultados

Fontes confiáveis, gráficos adequados e investigação até o aluno.

- [ ] [FE-10 — Resultados: contrato de dados e integridade](tickets/10-resultados-contrato.md)
- [ ] [FE-11 — Resultados: visão global e visão da turma](tickets/11-resultados-visoes.md)
- [ ] [FE-12 — Gráficos: evolução temporal e antes/depois](tickets/12-resultados-tempo.md)
- [ ] [FE-13 — Gráficos: objetivos, evidências e participação](tickets/13-resultados-objetivos.md)
- [ ] [FE-14 — Sessão: abas, gameplay, questões e insights](tickets/14-resultados-sessao.md)
- [ ] [FE-15 — Drill-down completo e perfil individual](tickets/15-resultados-drilldown.md)

**Saída da fase:** Entender sinal principal e percorrer turma → aula → sessão → aluno com retorno preservado.

## 04 — Materiais + refinamento

Biblioteca conectada ao planejamento e revisão integrada.

- [ ] [FE-16 — Materiais: biblioteca editorial e filtros](tickets/16-materiais-biblioteca.md)
- [ ] [FE-17 — Material: detalhe contextual e reutilização](tickets/17-materiais-detalhe.md)
- [ ] [FE-18 — Material: upload e estados de recuperação](tickets/18-materiais-upload.md)
- [ ] [FE-19 — Refinamento integrado e validação final](tickets/19-refinamento-validacao.md)

**Saída da fase:** Material chega ao planejamento conforme suporte real; cinco páginas revisadas sem regressões críticas.

## Prompt para executar um ticket

```text
Implemente smart-edu/docs/redesign-frontend/tickets/XX-nome.md.
Leia o AGENTS.md aplicável, CONTRATO-DE-EXECUCAO.md e DIRECAO-CRIATIVA.md.
Confira dependências na implementação atual, não só no checklist.
Preserve alterações locais. Entregue ações, estados, responsividade e motion.
Valide no navegador e registre evidências de comportamento e movimento.
Informe mudanças, verificações executadas e pendências reais.
Não avance automaticamente para o ticket seguinte.
```

## Rastreabilidade do prompt original

| Seções originais | Tickets responsáveis |
|---|---|
| 1 e 13 — diagnóstico e arquitetura | FE-00; contrato comum |
| 2 e 3 — conceito, paleta e tipografia | FE-01; direção preservada |
| 4 — motion | FE-02/03; interações de cada página |
| 5 — Visão Geral | FE-04/05 |
| 6 — Turmas | FE-06/07 |
| 7 — Aulas | FE-08/09 |
| 8 — Materiais | FE-16/17/18 |
| 9 — Resultados | FE-10 a FE-15 |
| 10 — navegação e coesão | FE-03/07/09/15 |
| 11 — componentes prioritários | FE-01/02; gráficos/insights FE-12/13/14; drawer FE-15/17 |
| 12 e 14 — acessibilidade e validação | Todos; matriz comum; FE-19 |
| 15 a 17 e instrução final — qualidade | Contrato comum; marcos de fase; FE-19 |

Status: a fazer, em andamento, parcial, bloqueado, concluído. Dependência externa ausente deve indicar contrato/serviço necessário e critérios ainda abertos. Não fechar fase com critérios obrigatórios pendentes.

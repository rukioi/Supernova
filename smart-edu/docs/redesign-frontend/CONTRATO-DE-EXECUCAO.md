# Contrato de execução

## Direção e escopo

Evoluir o software existente para um ecossistema educacional vivo. A [direção integral](DIRECAO-CRIATIVA.md) é leitura obrigatória. Não reduzir o trabalho a cores, arredondamento e fade-in. Cada página deve mudar sua composição conforme a tarefa. O índice define a ordem: Design System + Visão Geral → Turmas + Aulas → Resultados → Materiais + refinamento.

Esta pasta planeja implementação, não declara redesign concluído. Todos os tickets começam abertos mesmo quando há componentes semelhantes: reutilizar e completar após auditoria.

## Base encontrada nesta organização

- React 19, Next 16, Vinext/Vite, TypeScript e Tailwind 4 aparecem no package.json. Confirmar entrypoint pelos scripts e árvore ativa.
- Motion e Recharts já são dependências; há primitives shadcn/Base UI/Radix e componentes locais. Reutilizar antes de adicionar bibliotecas.
- `components/smart-edu-app.tsx` conecta `journey-*` e `material-library.tsx`; também existem caminhos legados. Alterar código ativo, não tela sem uso.
- `lib/store.ts` usa estado local/localStorage; `lib/demo-data.ts` fornece demonstração. Não presumir persistência remota ou dados acadêmicos reais.
- Há alterações locais e arquivos ainda não rastreados. Preservar e inspecionar; não fazer reset ou sobrescrever trabalho para facilitar o redesign.
- [Documentação existente](../README.md), auditoria, direção e motion históricos são insumos. Afirmações antigas de checks aprovados não validam esta rodada.

## Regras de implementação

1. Ler [AGENTS.md](../../AGENTS.md) e instruções específicas aplicáveis. Antes de componentes importantes, consultar referências e MCPs shadcn/Motion conforme esse arquivo. Se indisponíveis, informar e usar documentação oficial. Verificar skills realmente disponíveis, sem presumir instalações antigas.
2. Inspecionar componentes/dados antes de editar. Não reconstruir, trocar router/stack ou introduzir bibliotecas concorrentes sem necessidade demonstrada.
3. Entregar ações reais: CTA navega/altera estado correto; filtro filtra; expansão revela; aba muda painel; gráfico responde à seleção. Toast não comprova ação.
4. Preservar URLs e contratos funcionais. Hierarquia: professor → turma → módulo → aula → experiência → sessão. Materiais são reutilizáveis; dados individuais respeitam autorização existente.
5. Reutilizar tokens/primitives por comportamento real. Não antecipar biblioteca genérica nem dar a todas as páginas o mesmo grid de cards.
6. Dados faltantes recebem estados explícitos; demos são identificadas. Não inventar denominadores, datas, evidências, antes/depois ou progresso. XP/ranking não mede domínio pedagógico.
7. Sem backend, entregar somente a parte independente, documentar contrato necessário e manter integração pendente. Não simular autorização, upload, convite ou publicação em produção.

## Contrato de movimento

**Cada movimento tem gatilho, propósito e estado final.** Registrar comportamento demonstrado além da aparência.

| Gatilho | Propósito e entrega |
|---|---|
| Entrada na Visão Geral | Título → percurso → checkpoint → próxima experiência; uma vez na entrada pertinente |
| Entrada numa turma | Identidade/contexto acompanham navegação; shell estável |
| Expansão de aula | Conteúdo e timeline se reorganizam de forma compreensível |
| Filtro alterado | Dados/layout transitam ao novo conjunto; dados antigos não parecem atuais |
| Seleção em gráfico | Destaque de ponto/série e abertura de evidência identificada |
| Material aberto | Painel mantém origem, seleção e retorno de foco |
| Atualização confirmada | Feedback finito representa estado efetivo, sem progresso/conclusão falsos |

CSS para respostas simples, Motion existente para layout/orquestração e SVG onde adequado. Priorizar transform/opacity; sem loops decorativos, scroll hijacking ou animação em tudo. Reduced motion mantém significado e estado final com pouco ou nenhum movimento espacial. Grandes momentos ficam no hero, timeline e troca de contexto; tarefas cotidianas recebem movimentos curtos e precisos.

## Definição comum de pronto

- Critérios específicos atendidos, incluindo vazio, erro, indisponibilidade e carregamento quando aplicáveis.
- Transformação substancial quando o ticket trata composição; antes/depois na mesma rota, viewport e estado.
- Ação funcional e movimento demonstrados por interação/gravação: screenshot não comprova animação.
- Teclado, foco, toque, responsividade e reduced motion verificados na superfície alterada.
- Checks aplicáveis executados e registrados conforme [VALIDACAO.md](VALIDACAO.md), sem aprovação presumida.
- Arquivos, evidências e pendências documentados; status parcial/bloqueado quando faltar integração necessária.

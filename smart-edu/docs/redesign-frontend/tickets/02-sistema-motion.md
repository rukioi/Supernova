# FE-02 — Motion compartilhado e primitives de interação

- Status: conclu?do em 15/10/2026
- Fase: 01
- Dependências: [FE-01](01-fundacoes-visuais.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 4, 11, 12; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `lib/motion.ts; components/product/editorial-motion.tsx; components/ui/animated-tabs.tsx; checkpoint.tsx; counter.tsx; progress-bar.tsx; stagger.tsx; scroll-line.tsx; tilt-card.tsx`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): `react-rewards` resolve pelo package não rastreado do diretório pai, sem declaração neste projeto. Rever confetti no CTA, tilt/superfícies fragmentadas e duplicação Counter/CountUp, antes de consolidar motion; não presumir instalação limpa validada.

Dar respostas precisas às ações e preparar grandes momentos visuais sem animar tudo.

## Implementação

- [x] Consolidar tokens CSS/Motion existentes: micro 120–180ms, seleção 160–240ms, expansão 240–360ms, painel 280–420ms; ajustar por propósito.
- [x] Revisar primitives locais antes de criar equivalentes a AnimatedCard, ProgressJourney e AnimatedMetric; evitar sistemas paralelos.
- [x] Implementar feedback de pressionar, selecionar, expandir e atualizar dados; stagger curto, entrada única por contexto e sem bloquear interação.
- [x] Garantir foco equivalente a hover, toque sem hover e reduced motion, inclusive em scroll programático.
- [x] Remover tilt/contagem/loops quando não representarem ação ou atualização real.

## Critérios de aceite

- [x] Seleção, expansão e progresso demonstram causa e consequência em interações reais.
- [x] Entrada não reinicia ao menor scroll nem atrasa clique ou leitura.
- [x] Sem biblioteca concorrente; reduced motion mantém conteúdo e estado final.

## Validação deste ticket

Testar teclado, toque emulado e movimento reduzido. Alternar estados rapidamente e interromper transições; verificar estabilidade e foco.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

## Entrega FE-02

Implementa??o, arquivos, comandos, evid?ncias e limita??es: [VALIDACAO-FE-02.md](../VALIDACAO-FE-02.md). Sem novas depend?ncias. Instala??o limpa n?o foi executada; a depend?ncia impl?cita de react-rewards foi removida do c?digo.

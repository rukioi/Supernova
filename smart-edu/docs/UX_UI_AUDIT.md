# Auditoria UX/UI do Supernova

Data: 09/10/2026. Fonte funcional: `../../docs/SUPERNOVA-Documentao-do-Produto.md`. Esse documento descreve também funcionalidades futuras; ausência no MVP é uma lacuna de cobertura, não comprovação de defeito.

## Superfícies e jornada

React 19, vinext/Next, Tailwind 4, CSS de produto, Motion 14, Radix/Base UI, Lucide. Rotas ativas são resolvidas em `components/smart-edu-app.tsx`: home, turmas, detalhe/roster/perfil, aulas, biblioteca, preparação em sete etapas, resultados, prévia e cockpit. A home ativa é `journey-workspace.tsx`; `dashboard.tsx`, `game.tsx` e `wizard.tsx` são implementações antigas e seus problemas não devem ser atribuídos automaticamente ao fluxo ativo.

Professor: selecionar turma → planejar contexto → material/escopo → aprovar mapa → escolher formato → selecionar questões → revisar/prévia → aprovar → conduzir sessão → interpretar evidências. Aluno: a perspectiva Aluno é implementada na prévia, com resposta, escolha de rota, justificativa, revisão e resultado. Hub autenticado de aluno, convites e servidor autoritativo não estão presentes nas rotas examinadas.

## Achados e intervenções

| Severidade | Localização/evidência | Impacto | Solução e situação |
|---|---|---|---|
| Alto | `app/preview.css`: alternativas 12px, detalhes 11px, fases secundárias 9px | Informação necessária para decidir é pequena; desconforto de leitura no celular | Alternativas 14/13px, fases 13/12px e botões 13px implementados |
| Alto | `app/journey.css`: seletor de turma escondido em ≤760px | Professor perde a troca de contexto no dispositivo móvel | Mesmo dropdown acessível disponibilizado no cabeçalho móvel |
| Alto | `smart-edu-app.tsx`: revisão abria nova aba; testes do diálogo falhavam | Professor sai do contexto de preparação e o retorno ao acionador não é controlado | Integrado o diálogo de prévia existente; teste de Escape/foco passou |
| Alto | `preview-boards.tsx`: três diagramas mínimos com baixo contraste de etapas e pouca diferenciação | Difícil perceber o que mudou e qual a estratégia de cada formato | Três mapas táticos maiores, legendas e foco por fase implementados |
| Alto | Contrato de prévia é local; `experience-preview.tsx` possui estado React, sem eventos de servidor | Não comprova sincronização nem integridade de uma partida real | Mantida indicação de simulação; nenhum movimento foi apresentado como evento remoto |
| Médio | `journey-workspace.tsx`: mascote ocupa área que poderia explicar preparação | Informação operacional fica subordinada à decoração | Percurso com sete etapas ligado a `draft.step`/`draft.approved` implementado |
| Médio | `journey-ui.tsx` e `smart-edu-app.tsx`: pequeno marcador editorial antes de cada título | Títulos competem com metadados e repetem contexto da navegação | Marcadores removidos dos cabeçalhos compartilhados |
| Médio | `journey.css`: superfícies usam borda e sombra como padrão | Todos os painéis parecem igualmente elevados | Painéis compartilhados planos e superfície primária navy com ação lime implementados |
| Médio | `globals.css`: texto secundário #68758c | Contraste varia conforme superfície | Token secundário reforçado para #52627a; teste visual não equivale a certificação WCAG |
| Médio | `journey-results.tsx`: resultados e recomendação usam fixtures | Leitor pode inferir resultados reais | Manter rotulagem de demonstração; dados acadêmicos reais dependem de integração |
| Médio | `app/game-maps.css`: redução de movimento removia todos os transforms | Marcador voltava à origem em vez de conservar sua posição | Regra removida; hook reduz duração e mantém geometria final |
| Baixo | `journey.css`: easing omitido de interações e botão com sombra rígida | Feedback de controle inconsistente | Easing compartilhado, pressão discreta e sombra rígida removida |

Não foi encontrado um defeito crítico comprovado na revisão estática. Nenhuma aprovação de acessibilidade integral é inferida dessa afirmação.

## Revisão de engenharia de design

| Antes | Depois | Por quê |
|---|---|---|
| Mascote como área principal de apoio | Percurso da preparação, etapa e conclusão reais | Explicar o próximo movimento do professor |
| Mesma expressão de mapas pequenos | Rota de investigação, fortificação e rede de conceitos | Diferenciar estratégias e tornar estados legíveis |
| Movimento `y` no contêiner | String `transform` e duração curta | Usar a implementação existente com menos trabalho por frame |
| Remover transform em movimento reduzido | Atualização imediata à posição final | Preservar o significado do estado |

## Pontos preservados

Revisão e aprovação docentes, pontos separados de evidências, respostas privadas no telão, radio groups e dialogs existentes, foco de teclado, navegação móvel, fontes locais e tokens semânticos. Conquista no tabuleiro continua dependendo de resposta correta, decisão confirmada e revisão; seleção provisória não concede conquista.

## Validação e limites

Playwright MCP não é exposto diretamente como ferramenta nesta sessão, mas foi acessado por um cliente JSON-RPC local (`scripts/playwright-mcp-campus.mjs`) usando o servidor já instalado. Capturas e resultado de overflow estão em `artifacts/campus/mcp`. Motion MCP foi consultado; o shadcn MCP não estava exposto, então foi consultada a documentação oficial https://ui.shadcn.com/docs/components/radix/dialog. Artefatos válidos mostram Smart Edu e são capturados em `127.0.0.1:3000`. As primeiras imagens da porta 5173 pertenciam a outro produto e foram descartadas como evidência.

Resultados de validação são registrados em `IMPLEMENTATION_PLAN.md` e `artifacts/campus/after/report.json`; capturas isoladas não comprovam gestos físicos, latência de rede, servidor autoritativo, WCAG completa ou desempenho em dispositivo real.

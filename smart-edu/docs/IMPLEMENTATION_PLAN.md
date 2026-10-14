# Plano e registro de implementação

## Ordem

1. Ler prompt, documentação funcional, AGENTS, tokens, rotas ativas e skills. Concluído.
2. Auditoria estática e distinção entre código ativo e legado. Concluído; `UX_UI_AUDIT.md`.
3. Reforçar tokens de contraste, títulos compartilhados e feedback. Implementado.
4. Home: superfície primária, mapa de preparação ligado ao rascunho e rotulagem de sessão de demonstração. Implementado.
5. Três mapas: geometrias distintas, legendas, transições causais e redução de movimento. Implementado.
6. Inspecionar desktop/mobile, teclado, preview, overflow; corrigir a rodada de achados. Concluído nas superfícies prioritárias.
7. Registrar lint, TypeScript, build e testes existentes com saídas reais. Concluído.

## Organização

Agentes auxiliares Luna com esforço baixo: auditoria somente leitura e mapas de jogos. A auditoria auxiliar apontou problemas em componentes legados; o agente principal verificou a árvore ativa antes de classificá-los. Nenhum problema do legado foi apresentado como falha comprovada do wizard ativo.

Mapas: `preview-boards.tsx` / `game-maps.css`. Preparação: `preparation-map.tsx` / `journey-workspace.tsx`. Feedback: `campus.css`. Tokens e composição existentes foram ajustados nos seus próprios arquivos. Script `implement-campus.mjs` documenta transformações já aplicadas; não é migração recorrente e não deve ser executado novamente.

## Cobertura funcional

As melhorias preservam funcionalidades existentes e controles docentes. Não há APIs reais de publicação/convites/partida conectadas neste escopo. O hub do aluno completo e a sincronização autoritativa permanecem trabalho funcional futuro, conforme o documento do produto. Não foram inventados resultados acadêmicos nem regras.

## Registro de checks

TypeScript, lint e build de produção passaram na primeira execução. Testes de controles existentes passaram em desktop/mobile e teclado; expectativa de raio do menu foi alinhada aos 16px do design system existente. A inspeção de sete rotas em 1440px/390px encontrou zero overflow de página e zero erros JavaScript. O MCP Playwright foi usado por cliente local, com captura da home nos dois tamanhos e título Smart Edu confirmado. Após isso, uma rodada de correção reforçou legibilidade dos mapas e deslocamento interno no celular.

O teste de preview detectou a abertura em nova aba no wizard ativo, embora o componente de diálogo já existisse. A revisão foi integrada ao diálogo com Escape, foco protegido e retorno ao acionador. O teste completo passou após essa correção: 54 combinações de formato/fase/perspectiva; feedback e consequências; isolamento do rascunho; limites do diálogo em 1024/390px; Escape e retorno de foco; movimento reduzido; conteúdo editado e seleção vazia.

Confirmação final: TypeScript exit 0; lint exit 0 (dois avisos em scripts auxiliares corrigidos depois); build exit 0. Os scripts auxiliares corrigidos receberam checagem focada adicional. Verificação final das sete rotas em 1440/390px: zero erros JS, zero overflow de página, foco em botão com movimento reduzido e viewport do mapa deslocado internamente. Capturas dos três mapas existem nos dois tamanhos. Não há script `test` no package.json; foram usados os testes Playwright existentes de preview e controles.

Detector Impeccable executado uma vez: exit code 1, com um conjunto extenso de advisories sobre valores literais/escala no CSS existente e aviso de bordas grossas em superfícies antigas. Esse check não foi declarado aprovado; os itens precisam ser interpretados no contexto de componentes ativos. Não foi usado um score artificial de WCAG ou performance.

As primeiras capturas em localhost:5173 foram invalidadas: outra aplicação ocupava a porta. O servidor correto é localhost:3000. A baseline visual do Supernova não foi capturada antes da primeira alteração; não se alega comparação válida antes/depois. Capturas finais são registradas em `artifacts/campus/after`.

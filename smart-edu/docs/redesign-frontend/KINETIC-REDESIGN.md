# Supernova — redesign cinético

Implementação de 16/10/2026, seguindo DIRECAO-CRIATIVA.md e a preferência explícita por movimento perceptível.

## Direção aplicada

O contraste navy, azul elétrico e lima agora acompanha títulos em duas vozes, acentos manuscritos, botões com profundidade e seletores de modo animados. As páginas mantêm composições distintas: jornada ilustrada na Visão Geral, coleção de territórios em Turmas, checkpoints em Aulas, capas em Materiais e placares editoriais em Resultados.

As ilustrações WebP de expedição, defesa e conquista já disponíveis no projeto foram reutilizadas. Nenhuma dependência de animação foi adicionada.

## Movimento implementado

- Revelação do título principal por linhas, com transformação e máscara.
- Cenário da Visão Geral com movimento ambiente e controle de pausa.
- Cards com inclinação moderada seguindo o ponteiro e retorno por mola; desativado para touch e movimento reduzido.
- Abas com seletor compartilhado, ícones e transição por mola; setas do teclado preservadas.
- Seções reveladas uma vez ao entrar no campo de visão; linha de leitura acompanha o scroll sem alterar progresso pedagógico.
- Coleção de materiais com saída, entrada e reorganização ao filtrar.
- Jogos com trilha de fases, marcador de fase, progresso da missão, seleção de alternativas e feedback animado.
- Barras de XP proporcionais às pontuações da sessão, com entrada escalonada.

## Verificação

- TypeScript e ESLint executados com sucesso.
- Build de produção executado com sucesso; permanece o aviso de chunks maiores que 500 kB.
- Playwright: oito rotas em 1440, 1024 e 390 px; execução móvel com movimento reduzido. Foram exercitados os formatos de jogo, avanço de fase, resposta, perspectiva docente, pausa, abas por teclado, filtros, diálogo de material e links de checkpoints.
- Teste específico de movimento compara transformações em momentos distintos, verifica a pausa do cenário, a resposta do card ao ponteiro e a ausência desses movimentos com preferência reduzida.
- Revisão visual por capturas. Corrigida a visibilidade da coleção de turmas em movimento reduzido e o alongamento desnecessário dos painéis no detalhe de turma.
- Revisão 21st de seis componentes compartilhados: zero apontamentos. Busca de componentes no catálogo não disponível por falta de login.

Artefatos em `artifacts/kinetic-redesign/`. Scripts:

```
node scripts/verify-kinetic-redesign.mjs <caminho-para-playwright/index.mjs>
node scripts/verify-motion-behavior.mjs <caminho-para-playwright/index.mjs>
```

## Referências consultadas

- [Motion: layout e elementos compartilhados](https://motion.dev/docs/react-layout-animations)
- [Motion: animação associada ao scroll](https://motion.dev/docs/react-scroll-animations)
- [Motion Primitives: inclinação de cards](https://motion-primitives.com/docs/tilt)
- [shadcn: tabs](https://v3.shadcn.com/docs/components/tabs)

Os MCPs específicos de Motion/shadcn não estavam disponíveis; foram consultadas as fontes públicas oficiais. A skill gpt-taste foi inspecionada, mas seu fluxo de landing page com AIDA e GSAP não foi adotado: a direção do produto pede evolução do aplicativo existente usando Motion.

## Escopo preservado

O produto continua um MVP com demonstrações locais claramente identificadas, sem novo backend. A prévia dos jogos altera apenas seu estado de simulação; aprovação pedagógica e publicação continuam sob decisão docente. Testes não constituem auditoria completa WCAG nem ensaio em dispositivos físicos.

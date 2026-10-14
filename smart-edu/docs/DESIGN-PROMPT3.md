# Smart Edu — aprender é uma jornada visível

## Auditoria antes da implementação

- Shell único, porém dois sistemas de UI (`se-*` e `product/ui.tsx`) e componentes antigos sem uso.
- Tipografia display nos títulos, números e materiais; escala funcional frequentemente abaixo de 13 px.
- Estilos empilhados em `product.css`, `studio.css`, `editorial.css`, `visual-reset.css` e `learning-colors.css`, com tokens divergentes e cores literais.
- Cards de turma e material definidos pela posição no grid, sem semântica de estado.
- Progresso de aulas e preparação já existe nos dados, mas é apresentado como números e faixas isoladas.
- A imagem da equipe completa não comunica estados individuais. As novas pranchas contêm poses e textos; precisam de recortes transparentes.
- Navegação desktop permanece funcional; no celular ocupa três faixas e disputa espaço com o conteúdo.

## Sistema único

Tokens semânticos: ink #091B3A, action #2557F5, action-dark #193BB8, achievement #DDF45A, success #216344 sobre mint #BFEAD7, discovery #654090 sobre lavender #E8DDF8, attention #943D24 sobre peach #FFE1CB, canvas #F5F7FC, surface #FFFFFF, border #DCE3EF, muted #68758C.

Display somente na saudação, módulo e experiência. H1 funcional 36–44 px; títulos secundários sans; corpo 15–17 px; metadados 13–14 px. Grid máximo 1440 px, espaçamento 4/8/12/16/24/32/48/64. Botão principal azul, positivo lime, secundário branco, ghost aberto. Uma ação dominante por seção.

Componentes compartilhados: cabeçalho de página, botão, estado semântico, trilha de etapas, progresso animado, contador e mascote contextual. Cards separados por função: ação, progresso, conteúdo, insight e feedback.

## Dados e comportamento

Preservar rotas, armazenamento local, fluxos e regras. Preparação é calculada a partir da etapa e aprovações reais do rascunho; não apresentar 75% arbitrariamente. A jornada usa as duas aulas realizadas de seis já presentes na demonstração. XP aparece apenas onde os dados já o fornecem. Nenhum nível ou streak fictício.

## Mascotes

Preparar PNGs individuais com fundo transparente a partir das pranchas fornecidas, sem textos ou cenários. Panda: próximo desafio/conquista. Pato: orientação/intervenção. Pinguim: avanço/feedback positivo. Cérebro: evidências de aprendizagem. Usar um personagem por momento contextual, sem equipe completa. Não executar mais de um idle por viewport; respeitar movimento reduzido.

## Validação

Capturas antes/depois das cinco áreas em 1440×900, 1280×800 e 390×844. Verificar funcionalidades, teclado, toque, overflow, contraste dos tokens, abas, progresso, feedback e ausência de imagens quebradas. Revisar as imagens, não apenas o build.

## Implementação concluída

`journey.css` substitui os overrides `visual-reset.css` e `learning-colors.css` no layout. O shell, botões e cabeçalhos compartilham os tokens e componentes de `journey-ui.tsx`. As cinco áreas usam o mesmo sistema, com anatomias diferentes para ação, conteúdo, evidência e conquista.

- Visão geral: preparação real, ciclo docente, sinais de aprendizagem e trilha do módulo.
- Turmas: contexto em destaque, demais jornadas compactas, criação e feedback com pinguim.
- Aulas: mapa, encontros concluídos, encontro atual e aulas futuras; preparar uma aula preserva o título/contexto do rascunho.
- Materiais: busca, cinco filtros, detalhes acessíveis e cards neutros com acentos semânticos.
- Resultados: objetivos, evolução, dificuldade, acompanhamento e intervenção; XP permanece na aba de gameplay.
- Celular: navegação inferior com indicador da área atual, alvos de toque e conteúdo reorganizado.
- Motion: hover 160 ms, pressão do botão, transições de contexto, progresso ao entrar na tela, contadores e celebração breve. Somente o mascote do hero recebe duas respirações discretas; tudo respeita movimento reduzido.

## Assets e prompts

Edição com o gerador de imagens integrado, a partir de `../panda.png`, `../pato.png`, `../pinguim.png` e `../cerebro.png`, mantendo a identidade e removendo o fundo das pranchas. PNGs transparentes salvos em:

- `public/mascots/panda.png`
- `public/mascots/pato.png`
- `public/mascots/pinguim.png`
- `public/mascots/cerebro.png`

Prompt usado individualmente para cada prancha: extrair somente o personagem grande de corpo inteiro à esquerda; preservar rosto, roupas, acessórios, cores, traço e pose; remover textos, poses menores, cenário, sombra no chão, estrelas e órbitas; manter pés, membros e objetos completos; centralizar com margem de 5%; fundo transparente com alpha; sem redesenhar o personagem.

## Auditoria final

Capturas das cinco áreas em 1440×900, 1280×800 e 390×844: `artifacts/learning-colors/prompt3-final/`. Capturas anteriores: `artifacts/learning-colors/prompt3-before/`.

Relatórios de interação: `artifacts/learning-colors/interactions/report.json` e `artifacts/learning-colors/journey/report.json`. Busca/filtros, upload de metadados, modal, Escape, retorno de foco, hover, toque, abas e setas do teclado, movimento reduzido, criação/persistência de turmas, trilha recolhível, preparação da aula futura, retomada do rascunho, abertura de sessão, intervenção, busca global e navegação móvel passaram.

Sem overflow horizontal nas 15 combinações de rota/tamanho e sem imagens quebradas. Contrastes AA dos tokens: texto 16,31; muted sobre branco 4,65; ação 5,58; sucesso 5,44; descoberta 6,00; atenção 5,72; conquista 13,96. Esses testes verificam os tokens; não substituem uma auditoria completa de todos os textos e estados do produto.

Revisão visual: cinco telas desktop, home em 1280, cinco telas móveis e feedback de criação inspecionados. Foram corrigidos o cabeçalho antigo duplicado de Resultados, o carregamento dos mascotes, a separação entre as abas Resumo/Aprendizagem e o contexto da trilha quando o rascunho muda.

Verificações técnicas: TypeScript e build passaram. Lint sem erros; dois avisos preexistentes no componente antigo `dashboard.tsx`.

Nenhum backend ou nova regra de gamificação foi introduzido. Os indicadores da sessão continuam sendo os dados da demonstração. Seleção de arquivo conserva o comportamento existente de armazenar metadados localmente.

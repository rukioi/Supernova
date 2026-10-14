# SMART EDU — REDESIGN PROFUNDO DO FRONTEND / PRODUCT UI

Você está trabalhando em um produto web autenticado chamado **Smart Edu**.

NÃO é uma landing page.
NÃO transforme o produto em um site de marketing.
NÃO reconstrua tudo do zero sem necessidade.
NÃO altere regras de negócio, entidades, dados ou fluxos funcionais já existentes.

O objetivo desta tarefa é realizar uma REFATORAÇÃO PROFUNDA da experiência visual e interativa do frontend existente.

Quero sair de uma aparência de:

- dashboard SaaS genérico;
- sidebar administrativa tradicional;
- cards repetitivos;
- tipografia pouco legível;
- páginas que simplesmente aparecem e desaparecem;
- grids sem personalidade;
- navegação com pouca sensação de localização;

para uma experiência que pareça um:

> **produto educacional premium + estúdio de experiências interativas + ferramenta profissional para professores.**

O resultado precisa transmitir simultaneamente:

- credibilidade;
- clareza;
- tecnologia;
- educação;
- gamificação;
- personalidade;
- sofisticação;
- energia;
- controle.

A interface NÃO pode parecer:
- portal governamental;
- sistema acadêmico antigo;
- template de dashboard comprado;
- clone do Linear;
- clone do Notion;
- clone do Duolingo;
- “site feito por IA” cheio de gradientes, glows e glassmorphism;
- landing page adaptada para virar dashboard.

---

# 1. PRIMEIRO: AUDITE O PROJETO EXISTENTE

Antes de modificar qualquer coisa:

1. identifique o framework utilizado;
2. identifique sistema de rotas;
3. identifique bibliotecas de UI;
4. identifique biblioteca de animação, se existir;
5. identifique fontes atuais;
6. identifique tokens CSS existentes;
7. identifique componentes compartilhados;
8. identifique layouts globais;
9. identifique as páginas já implementadas;
10. identifique componentes que podem ser preservados.

Depois disso, implemente o redesign.

NÃO pare apenas em uma análise ou relatório.

Faça as mudanças no código.

Preserve:
- rotas;
- dados;
- mocks;
- fluxos;
- funcionalidades;
- regras de negócio.

Refatore estrutura visual e componentes quando necessário.

---

# 2. DIREÇÃO DE DESIGN

Use como referências conceituais:

- https://loftylab.framer.website/
- https://cohesion.framer.ai/
- https://impeccable.style/

NÃO copie essas interfaces.

Extraia delas princípios:

## Lofty Lab
- personalidade visual forte;
- composição editorial;
- tipografia como elemento de marca;
- assimetria;
- grandes áreas de respiro;
- cor usada intencionalmente;
- experiência que não parece um template.

## Cohesion
- elementos que respondem à interação;
- cards que possuem comportamento;
- sensação tátil;
- interface que reage ao usuário;
- objetos visuais que parecem vivos.

## Impeccable
Aplicar conceitos equivalentes a:

- audit;
- typeset;
- layout;
- clarify;
- adapt;
- animate;
- delight;
- distill;
- polish.

Toda decisão visual deve melhorar:
- hierarquia;
- clareza;
- legibilidade;
- intenção;
- resposta à interação.

---

# 3. LINGUAGEM VISUAL DO SMART EDU

Quero uma direção que pode ser descrita como:

> **Editorial Academic × Game Studio × Product Interface**

A interface deve ser profissional sem ser fria.

Gamificada sem ser infantil.

Expressiva sem ser caótica.

Colorida sem virar carnaval visual.

Moderna sem depender de efeitos “AI aesthetic”.

---

# 4. REMOVER A SIDEBAR ATUAL

A sidebar vertical escura existente domina demais a interface e deixa o produto parecido com qualquer dashboard administrativo.

REMOVER a sidebar persistente como principal sistema de navegação.

Criar uma arquitetura de navegação mais própria.

## Desktop

Utilizar uma navegação horizontal superior.

Estrutura aproximada:

[ Smart Edu ]    [ contexto atual / turma ]    Visão geral   Turmas   Aulas   Materiais   Resultados

                                                  Buscar   Notificações   Perfil

A navegação deve parecer parte do produto e não um navbar de landing page.

Ela pode ter aproximadamente 64–72px.

Ela pode permanecer sticky.

Não usar uma enorme barra escura ocupando lateral da tela.

---

# 5. CONTEXTO DA TURMA

Hoje existe "Turma em foco" na sidebar.

Transformar isso em um elemento contextual mais sofisticado.

Exemplo:

┌────────────────────────────────────┐
│ ● Empreendedorismo e Inovação  ˅   │
│   38 alunos · Módulo 2             │
└────────────────────────────────────┘

Pode funcionar como:

- context switcher;
- dropdown;
- acesso rápido à turma;
- indicação persistente do contexto atual.

O usuário deve conseguir trocar de turma sem retornar obrigatoriamente à listagem.

No desktop, pode ficar próximo do logotipo ou da navegação.

No mobile, transformar em seletor compacto.

---

# 6. LOCALIZAÇÃO: O USUÁRIO PRECISA SABER ONDE ESTÁ

Este ponto é obrigatório.

A hierarquia do produto é:

Turma
→ Módulo
→ Aula
→ Experiência
→ Partida

Cada página deve comunicar seu contexto.

Criar um sistema consistente de:

- botão voltar;
- breadcrumb;
- eyebrow/context label;
- título;
- subtítulo contextual;
- ações da página.

Exemplo:

← Turmas

EMPREENDEDORISMO / MÓDULO 2

Segmento de Clientes

Validação e Modelagem de Negócios
· 30 de setembro
· Experiência executada

Evitar breadcrumbs minúsculos e quase invisíveis.

O botão voltar deve ser funcional.

Preferencialmente:
- voltar no histórico quando possível;
- fallback para a entidade pai quando não existir histórico válido.

Em telas menores, reduzir breadcrumb para:

← Empreendedorismo

Não mostrar caminhos gigantes.

---

# 7. HIERARQUIA DE CADA PÁGINA

Aplicar a seguinte estrutura mental:

1. ONDE ESTOU
2. O QUE É ESTA PÁGINA
3. QUAL É O DADO MAIS IMPORTANTE
4. QUAL É A PRINCIPAL AÇÃO
5. QUAIS SÃO AS INFORMAÇÕES DE APOIO
6. O QUE POSSO EXPLORAR DEPOIS

Não deixar tudo com a mesma força visual.

Atualmente muitos elementos competem entre si.

Um título e um botão não devem disputar igualmente a atenção.

Uma página deve possuir apenas uma ação primária clara.

---

# 8. TIPOGRAFIA — REFAZER A HIERARQUIA

A fonte display condensada atual tem personalidade, mas está sendo utilizada em excesso.

Ela funciona em:

- títulos muito grandes;
- números hero;
- chamadas especiais;
- labels editoriais pontuais.

Ela NÃO deve aparecer em:
- nomes pequenos de módulos;
- tabelas;
- labels;
- textos funcionais;
- botões;
- informações que precisam ser escaneadas rapidamente.

Criar um sistema de duas famílias:

## Fonte funcional

Preferência conceitual:

- Instrument Sans;
- Geist;
- Inter;
- Manrope;
- ou equivalente já disponível no projeto.

Ela deve atender:
- menus;
- corpo;
- botões;
- dados;
- filtros;
- formulários;
- tabelas;
- tabs.

## Fonte display

Manter ou substituir a atual por uma fonte editorial condensada apenas se realmente contribuir para a identidade.

Uso restrito:

H1 de destaque.
Grandes números.
Momentos editoriais.

Exemplo:

eyebrow:
11–12px / 600 / tracking amplo

body:
14–16px / 400–500

UI label:
13–14px / 500–600

page title:
clamp(36px, 5vw, 68px)

display hero:
clamp(54px, 7vw, 92px)

Não usar 11–12px em textos importantes.

Usar line-height confortável.

Usar:

font-variant-numeric: tabular-nums;

em:
- métricas;
- porcentagens;
- horários;
- placares;
- contagens.

---

# 9. GRID E ESPAÇAMENTO

Evitar colocar todo conteúdo dentro de cards com borda.

Isso produz efeito de dashboard genérico.

Alternar entre:

- superfícies abertas;
- linhas editoriais;
- cards;
- blocos de cor;
- informações inline;
- painéis destacados.

Adotar grid consistente.

Desktop:
max-width aproximado de 1440px.

Padding lateral responsivo.

Usar bastante espaço negativo.

Base de spacing:
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.

Criar ritmo vertical claro.

---

# 10. SISTEMA DE CORES

Preservar a personalidade já iniciada no produto.

Base sugerida:

--ink: navy profundo
--paper: off-white quente
--blue: cobalt Smart Edu
--orange: tangerine
--acid: amarelo ácido claro
--mint: verde/mint
--lilac: lilás

NÃO usar todas simultaneamente em cada tela.

Regra:

80% base neutra
15% cor estrutural
5% cor de ênfase

Usar cor com significado:

blue:
ação / sistema / experiências

green:
progresso / concluído / evidência positiva

orange:
atenção / próximo passo / energia

yellow:
seleção / destaque contextual

lilac:
variação temática / categorias

Não depender somente da cor para representar estados.

---

# 11. NÃO ABUSAR DE BORDAS E SOMBRAS

Evitar:

- card branco + border #ddd em absolutamente tudo;
- shadow em cada componente;
- radius excessivamente arredondado;
- pills para qualquer texto;
- glassmorphism;
- glow azul/roxo;
- gradient mesh.

Preferir:

- separação por espaço;
- contraste de fundo;
- linhas de 1px;
- tipografia;
- escala;
- alinhamento;
- composição.

Cards podem ter raio entre aproximadamente 10–18px, dependendo do contexto.

Não transformar tudo em "bento grid".

---

# 12. MOTION SYSTEM

A interface precisa ter movimento.

Mas movimento deve explicar:
- origem;
- destino;
- mudança;
- seleção;
- hierarquia.

Não usar animação como decoração gratuita.

Criar um motion system consistente.

## Microinterações
Duração aproximada:
120–220ms

Usar em:
- hover;
- focus;
- botão;
- icon;
- chips;
- pequenas seleções.

## Mudança de estado
220–360ms

Usar em:
- tabs;
- filtros;
- dropdown;
- accordions;
- troca lista/coleção;
- expansão de cards.

## Mudança de contexto
320–520ms

Usar em:
- troca de página;
- abrir experiência;
- entrar em turma;
- mudar módulo;
- abrir detalhe.

Usar easing natural ou spring controlado.

Nada elástico demais.

---

# 13. TRANSIÇÕES ENTRE PÁGINAS

Atualmente a sensação de:

"clicou → sumiu → apareceu outra coisa"

precisa desaparecer.

Implementar route/page transitions quando tecnicamente compatível com o framework.

Ao navegar:

página atual:
opacity 1 → 0
y 0 → -6px

próxima:
opacity 0 → 1
y 10px → 0

Transição curta.

Não bloquear a navegação.

Quando origem e destino compartilham um objeto, considerar shared-element/layout transition.

Exemplo:

Card "Empreendedorismo e Inovação"
→
abre página da turma

O card pode visualmente expandir/transformar-se no cabeçalho da turma.

Criar continuidade espacial.

---

# 14. TROCA DE TABS

Exemplo:

Visão geral
Aulas
Módulos
Alunos
Resultados
Recompensas
Configurações

NÃO substituir conteúdo instantaneamente.

Criar:

- indicador ativo animado;
- crossfade;
- pequeno deslocamento horizontal ou vertical;
- layout transition;
- preservação de scroll quando fizer sentido.

O indicador da tab deve deslizar entre itens.

Não desaparecer e surgir em outro local.

---

# 15. TROCA COLEÇÃO / LISTA

Na tela de turmas e outros locais onde existe:

Coleção | Lista

A troca precisa parecer uma transformação do mesmo conteúdo.

Usar animação de layout/FLIP/shared layout.

Cards devem reposicionar suavemente.

Não desmontar a tela inteira e reconstruí-la visualmente.

---

# 16. SCROLL

Quero uma página que responda ao scroll.

NÃO criar scroll hijacking.

NÃO alterar artificialmente a velocidade da roda do mouse.

NÃO bloquear o scroll nativo.

Usar:

- smooth scrolling apenas em navegação interna;
- sticky sections;
- sticky headers contextuais;
- reveal discreto ao entrar no viewport;
- progressão visual;
- pequenas transformações ligadas ao scroll;
- parallax extremamente sutil apenas em elementos decorativos.

O usuário deve sentir movimento, mas continuar com total controle.

---

# 17. INTERAÇÃO DOS CARDS

Cards importantes precisam responder fisicamente ao usuário.

Em hover:

- translateY entre -2 e -4px;
- mudança sutil de borda/fundo;
- imagem ou ilustração pode ampliar 1.01–1.03;
- seta pode deslocar alguns pixels;
- conteúdo secundário pode ganhar contraste.

No click/tap:

- feedback imediato;
- scale muito discreto;
- transição para próximo estado.

Nada de cards pulando exageradamente.

Adicionar `cursor: pointer` somente quando realmente forem clicáveis.

Todo card clicável deve ser acessível via teclado.

---

# 18. PREPARAR AULA — TRANSFORMAR EM EXPERIÊNCIA PRINCIPAL

A área "Preparar aula" já é uma das melhores direções do produto.

Levar ainda mais longe.

Ela deve parecer:

> um studio de criação de experiência educacional.

Não um formulário administrativo.

Criar uma progressão visual:

01 Conteúdo
02 Escopo
03 Mapa pedagógico
04 Experiência
05 Revisão
06 Prévia
07 Pronto

Mas não como wizard genérico.

Usar uma timeline/progress track elegante e contextual.

Ao clicar em um card de opção:

- selecionado responde imediatamente;
- card pode expandir;
- detalhes surgem suavemente;
- conteúdo seguinte entra sem salto brusco.

Ao mudar de template de experiência:

- preview visual muda com transição;
- painel lateral mantém contexto;
- informações relacionadas atualizam suavemente.

---

# 19. TELA "VISUALIZAR EXPERIÊNCIA"

Esta tela deve servir como referência estética para o restante do produto.

Hoje ela já possui:

- grande palco azul;
- contexto;
- preview;
- inspector lateral.

Melhorar essa lógica.

O preview deve parecer uma aplicação dentro da aplicação.

Dar profundidade por:
- contraste;
- layering;
- motion;
- transições internas.

O painel lateral pode ser sticky.

A troca:

Aluno | Telão | Professor

deve animar o viewport em vez de substituir tudo instantaneamente.

A troca de:

Expedição Estratégica
Linha de Defesa
Conquista de Territórios

deve usar uma transição visual clara.

Se possível:
- preview visual;
- mudança da composição;
- microanimação temática.

---

# 20. HOME / VISÃO GERAL

A home não deve parecer um dashboard com 12 widgets.

Ela deve contar:

> "O que merece minha atenção agora?"

Organização desejada:

PRIMEIRO
próxima aula / sessão em foco

SEGUNDO
o que mudou desde a última aula

TERCEIRO
turmas

QUARTO
atividade recente / continuidade

A ação:

+ Preparar aula

deve ser uma das âncoras da tela.

Evitar métricas aleatórias apenas para preencher espaço.

O grande painel "Aula em foco" pode permanecer expressivo.

Aproveitar blocos grandes de cor como assinatura visual.

---

# 21. TELA DE TURMAS

Não quero apenas três grandes rows brancos iguais.

Criar mais caráter editorial.

Cada turma pode possuir:

- número grande;
- status;
- nome;
- disciplina/período;
- alunos;
- módulo atual;
- próxima aula;
- pequena evidência de progresso.

Mas criar hierarquia.

Nome da turma deve ser escaneável facilmente.

A fonte display não pode prejudicar leitura.

Ao passar o mouse, revelar ação de abertura com movimento.

Ao clicar:
usar transição espacial.

---

# 22. PÁGINA DA TURMA

Cabeçalho deve comunicar:

EMPREENDEDORISMO E INOVAÇÃO
Administração · 3º período · 2026.2

38 alunos
Módulo 2 de 6
8 experiências
82% participação

Mas não colocar quatro cards gigantes simplesmente porque são métricas.

Criar uma faixa editorial/data strip.

Pode ter:

38
alunos matriculados

02 / 06
módulo atual

08
experiências

82%
participação

Integrada à composição.

Tabs abaixo.

A ação "Preparar aula" permanece primária.

"Convidar alunos" secundária.

---

# 23. AULAS / MÓDULOS

Criar sensação de sequência pedagógica.

Em vez de tabela comum:

01 ── Identificação de Problemas ───────── ✓
02 ── Segmento de Clientes ─────────────── ✓
03 ── Proposta de Valor ───────────── agora
04 ── Validação de Hipóteses ───────────── próximo

Criar linha/progressão vertical ou horizontal quando apropriado.

Status precisa ser compreendido sem depender apenas de badges.

Ao abrir módulo:
expandir suavemente.

---

# 24. RESULTADOS

A tela de resultados precisa parecer ferramenta de interpretação, não BI empresarial.

Prioridade:

1. o que aconteceu;
2. o que foi aprendido;
3. onde existe dificuldade;
4. o que exige atenção;
5. detalhes.

Evitar jogar gráficos e números simultaneamente.

Manter separação clara entre:

APRENDIZAGEM
e
GAMEPLAY

A área "Padrão que merece sua atenção" pode se tornar um componente de destaque mais forte.

Sugestão da IA deve parecer assistiva.

Nunca deve parecer decisão automática.

Representar:

Sinal encontrado
→ Evidência
→ Sugestão
→ Professor decide

---

# 25. MICROCOPY

Reduzir linguagem excessivamente administrativa.

Evitar:

"Gerenciar"
"Visualizar informações"
"Executar operação"

quando puder usar:

"Abrir turma"
"Preparar aula"
"Ver evolução"
"Revisar"
"Continuar"

A interface deve falar como ferramenta profissional, não ERP.

---

# 26. PERSONALIDADE

Criar alguns elementos proprietários do Smart Edu.

Por exemplo:

- numeração editorial 01 / 02 / 03;
- pequeno símbolo de estrela/asterisco/orbita;
- linhas gráficas;
- labels de seção;
- composição tipográfica;
- blocos cromáticos grandes;
- pequenas ilustrações geométricas;
- marcadores de progresso.

Mas criar uma gramática visual consistente.

Não adicionar elementos decorativos diferentes em cada tela.

---

# 27. COMMAND PALETTE

Se tecnicamente razoável para o MVP, implementar uma Command Palette:

⌘K / Ctrl+K

Permitir navegar rapidamente para:

- turmas;
- aulas;
- materiais;
- resultados;
- preparar aula.

Isso adiciona personalidade de produto e melhora navegação sem depender de sidebar.

Não tornar obrigatório para usar a aplicação.

---

# 28. RESPONSIVIDADE

O frontend precisa funcionar de verdade em:

- desktop grande;
- notebook;
- tablet;
- mobile.

Não apenas diminuir elementos.

## Desktop
top navigation completa.

## Notebook
reduzir gaps e labels secundárias.

## Tablet
menu principal pode virar menu contextual compacto.

## Mobile
usar:
- top bar compacta;
- back/context;
- bottom navigation para funções principais, se fizer sentido;
OU
- menu acessível por botão.

Não reintroduzir uma sidebar móvel gigante.

Cards:
1 coluna quando necessário.

Data strips:
scroll horizontal controlado ou grid 2x2.

Tabs:
scroll horizontal com indicador.

Previews:
painel inspector vira bottom sheet / drawer.

---

# 29. ACESSIBILIDADE

Obrigatório:

- contraste adequado;
- focus-visible;
- navegação por teclado;
- aria-label quando necessário;
- área mínima de toque adequada;
- headings semânticos;
- estados não dependentes somente de cor.

Respeitar:

prefers-reduced-motion

Se usuário solicitar movimento reduzido:
- remover transforms desnecessários;
- manter fades curtos ou nenhum;
- não prejudicar navegação.

---

# 30. ESTADOS DA UI

Criar ou padronizar:

- loading;
- skeleton;
- empty state;
- error;
- success;
- disabled;
- hover;
- focus;
- selected;
- processing.

Evitar spinner solitário ocupando a tela.

Skeleton deve refletir a estrutura real do conteúdo.

---

# 31. DESIGN TOKENS

Centralizar tokens.

Criar/revisar:

colors
spacing
radii
border
shadow
typography
motion
z-index
container sizes

Evitar valores mágicos repetidos em componentes.

Se o projeto já possui design system:
evoluir o sistema existente.

Não criar dois sistemas paralelos.

---

# 32. DOCUMENTAR A DIREÇÃO

Criar ou atualizar:

DESIGN.md

Documentar de forma curta:

## Brand intent
Credible, playful, editorial, educational, energetic.

## Typography
Display + Functional.

## Colors
Base + semantic accents.

## Spacing
Escala.

## Radius
Regras.

## Motion
Micro / state / context.

## Components
Navigation, cards, buttons, tabs, contextual header.

## Anti-patterns
- sidebar SaaS;
- excessive pills;
- generic card grids;
- AI gradients/glow;
- glassmorphism;
- huge border radius;
- abrupt route changes;
- tiny unreadable typography.

O objetivo é impedir que futuras telas voltem para o visual genérico anterior.

---

# 33. IMPLEMENTAÇÃO DE MOTION

Se o projeto já possui uma biblioteca de animação:
utilize-a.

Se for React e não existir nenhuma solução equivalente, avalie usar Motion/Framer Motion APENAS se fizer sentido para a arquitetura existente.

Não adicionar dependência pesada sem necessidade.

CSS transitions são suficientes para microinterações simples.

Usar uma biblioteca de motion para:
- shared layout;
- presença;
- route transitions;
- reordenação;
- expansão sofisticada.

---

# 34. PERFORMANCE

Motion não pode tornar a aplicação lenta.

Preferir animar:
- transform;
- opacity.

Evitar animar:
- width;
- height;
- top;
- left;

quando uma alternativa performática for possível.

Evitar enormes listeners de scroll.

Usar IntersectionObserver ou equivalente para scroll reveal.

Não criar efeitos que provoquem layout thrashing.

---

# 35. NÃO FAZER

Não faça um redesign cosmético superficial.

Não apenas:
- troque cores;
- arredonde cards;
- adicione shadows;
- coloque gradiente;
- adicione fade em tudo.

Quero mudança perceptível na:

- arquitetura da navegação;
- hierarquia;
- tipografia;
- composição;
- ritmo;
- interação;
- transições;
- responsividade;
- personalidade.

Também NÃO:

- transforme tudo em bento grid;
- use dashboard sidebar tradicional;
- use background gradient roxo/azul;
- use glow em botões;
- crie glass cards;
- use ícones gigantes aleatórios;
- adicione emojis na interface;
- use animações exageradas;
- infantilize a gamificação.

---

# 36. ORDEM DE EXECUÇÃO

Execute em etapas:

FASE 1
Auditar código e criar design tokens.

FASE 2
Refatorar shell global:
- top navigation;
- context switcher;
- breadcrumbs;
- back navigation;
- container.

FASE 3
Refatorar tipografia e componentes básicos:
- buttons;
- tabs;
- cards;
- metrics;
- status;
- inputs;
- filters.

FASE 4
Adicionar motion system.

FASE 5
Refatorar:
- Visão Geral;
- Turmas;
- Página da Turma;
- Resultados;
- Visualização da Experiência;
- Preparar Aula.

FASE 6
Responsividade.

FASE 7
Accessibility + reduced motion.

FASE 8
Polish final e remoção de inconsistências.

---

# 37. CRITÉRIOS DE ACEITAÇÃO

Ao finalizar, preciso conseguir responder SIM para:

1. A sidebar tradicional desapareceu?
2. Consigo saber claramente em que página estou?
3. Consigo saber em qual turma/módulo/aula estou?
4. Existe um botão Voltar previsível?
5. A navegação principal está acessível?
6. Os títulos são fáceis de ler?
7. A fonte display é usada com parcimônia?
8. Dados importantes são escaneáveis rapidamente?
9. Existe uma ação principal clara por contexto?
10. Cards respondem ao hover/click?
11. Trocar tabs possui continuidade visual?
12. Trocar módulo não gera corte seco?
13. Mudar visualização coleção/lista possui transição?
14. Navegação entre páginas parece contínua?
15. O scroll possui vida sem scroll-jacking?
16. Preparar Aula parece um studio, não formulário?
17. Resultados prioriza interpretação?
18. A página da turma parece uma jornada e não ERP?
19. O frontend é responsivo de verdade?
20. O produto parece diferente de um dashboard SaaS genérico?
21. O produto continua claramente sendo Smart Edu?
22. Gamificação está presente sem infantilização?
23. A aplicação parece premium já na primeira impressão?

Se alguma resposta for NÃO:
continue refinando.

---

# 38. RESULTADO FINAL ESPERADO

Quero abrir o Smart Edu e perceber imediatamente:

"isso é uma plataforma de experiências educacionais"

e não:

"isso é mais um dashboard".

A primeira impressão precisa ser marcante.

Mas, depois do impacto inicial, a aplicação precisa ser extremamente fácil de entender.

A regra final é:

> PERSONALIDADE NA PRIMEIRA IMPRESSÃO.
> CLAREZA DURANTE O USO.
> CONTINUIDADE DURANTE A NAVEGAÇÃO.
> CONTROLE PARA O PROFESSOR.
> MOVIMENTO COM PROPÓSITO.
> GAMIFICAÇÃO SEM INFANTILIZAÇÃO.

Implemente isso no frontend existente.
Não entregue apenas sugestões.
Faça as alterações, teste as principais rotas e refine o resultado visual.
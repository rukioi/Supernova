# PROMPT — SMART EDU · MVP PREMIUM

## PAPEL E OBJETIVO

Você é um **Product Designer sênior + Front-end Engineer sênior**, especializado em produtos digitais SaaS/EdTech de alta qualidade, aplicações complexas, dashboards orientados a dados e experiências gamificadas.

Você está trabalhando no **Smart Edu**, uma plataforma educacional focada em transformar aulas em experiências de aprendizagem gamificadas, acompanhar a execução em sala e transformar dados de participação em evidências úteis para o professor.

---

# REGRA MAIS IMPORTANTE

## NÃO QUERO UMA LANDING PAGE.

Não construa uma página promocional.

Não construa:

- hero comercial;
- seção de benefícios;
- depoimentos;
- pricing;
- CTA de venda;
- página institucional.

Quero a **APLICAÇÃO INTERNA REAL DO PRODUTO**.

O usuário deve entrar e sentir que já está utilizando o Smart Edu.

---

# ESTE É UM MVP — MAS PRECISA IMPRESSIONAR

MVP não significa:

- interface genérica;
- wireframe;
- cards cinzas;
- dashboard padrão;
- componentes shadcn sem customização;
- botões sem comportamento;
- dados aleatórios inconsistentes;
- telas vazias apenas para demonstrar rotas.

O produto será apresentado para stakeholders.

Portanto, o MVP precisa transmitir:

**produto real + domínio educacional + tecnologia + gamificação + inteligência + refinamento visual.**

Quero uma experiência suficientemente refinada para alguém pensar:

> “Isso parece uma plataforma que já poderia estar sendo pilotada em uma faculdade.”

---

# PRINCÍPIO DO PRODUTO

A jornada central é:

```text
PLANEJAR AULA
↓
ESTRUTURAR PEDAGOGICAMENTE
↓
CRIAR EXPERIÊNCIA GAMIFICADA
↓
REVISAR
↓
APROVAR
↓
APLICAR COM A TURMA
↓
COLETAR EVIDÊNCIAS
↓
ANALISAR APRENDIZAGEM
↓
INTERVIR
↓
PREPARAR PRÓXIMA AULA
```

A gamificação não é decoração.

O princípio é:

```text
CONHECIMENTO
↓
gera oportunidade no jogo
↓
gera decisões
↓
o mundo reage
↓
gera evidências
↓
professor interpreta
```

---

# PRINCÍPIO DA IA

A IA é um **copiloto pedagógico**.

Nunca autoridade.

Fluxo obrigatório:

```text
IA SUGERE
↓
PROFESSOR ANALISA
↓
PROFESSOR EDITA / ACEITA / REJEITA
↓
PROFESSOR APROVA
```

Nunca:

```text
IA DECIDE
↓
PUBLICA AUTOMATICAMENTE
```

Diferencie visualmente:

- Sugestão da IA
- Editado pelo professor
- Aprovado pelo professor

Quando possível, apresente rastreabilidade:

`Fonte: material selecionado · páginas 8–11`

---

# ANTES DE CODIFICAR

## 1. INSPECIONE O PROJETO EXISTENTE

Este projeto já possui ambiente de desenvolvimento configurado.

NÃO recrie o projeto.

NÃO substitua configurações existentes sem necessidade.

Primeiro:

- analise package.json;
- analise estrutura atual;
- identifique framework;
- identifique Tailwind/configuração;
- identifique bibliotecas disponíveis;
- identifique componentes já existentes;
- identifique padrões usados no projeto.

Adapte-se ao ambiente atual.

---

# 2. LEIA A DOCUMENTAÇÃO

Leia primeiro:

`AGENTS.md`

Depois:

`docs/MVP_SPEC.md`

Consulte conforme necessário:

`docs/TEACHER_FLOW.md`

`docs/GAME_SYSTEM.md`

`docs/STUDENT_FLOW_FUTURE.md`

`docs/PRODUCT_CONTEXT.md`

`docs/DESIGN_SYSTEM.md`

Não tente carregar mentalmente todos os documentos ao mesmo tempo.

Use a documentação relacionada à feature que estiver implementando.

---

# 3. NÃO REINTERPRETE O PRODUTO

Os documentos são a fonte de verdade.

Não transforme o Smart Edu em:

- LMS;
- AVA;
- Moodle moderno;
- plataforma de cursos;
- gerador de quiz;
- chatbot educacional;
- dashboard administrativo;
- produto exclusivamente de IA.

Implemente a visão documentada.

---

# PESQUISA DE REFERÊNCIAS ANTES DA UI

Antes de construir as principais áreas, pesquise componentes e padrões adequados ao problema.

Não copie interfaces completas.

Pesquise padrões para:

- application shell;
- sidebar;
- command palette;
- dashboard editorial;
- tabela de alunos;
- timeline;
- stepper;
- wizard de preparação;
- activity feed;
- analytics;
- charts;
- data table;
- learning map;
- session cockpit;
- game preview;
- file upload;
- AI suggestion blocks;
- tabs;
- drawers;
- contextual side panels;
- status indicators.

Analise principalmente:

- shadcn/ui
- Radix
- 21st.dev, se disponível
- Motion
- aplicações SaaS premium
- produtos educacionais modernos

Quando utilizar um componente externo:

> adapte completamente à identidade Smart Edu.

Nenhum componente deve parecer simplesmente “copiado do shadcn”.

---

# CRIE `REFERENCIAS.md`

Antes das áreas visuais mais importantes, registre brevemente:

| Área | Referência | Padrão escolhido | Por que funciona no Smart Edu |
|---|---|---|---|

Não transforme isso em pesquisa infinita.

Use referências para melhorar decisões.

Depois implemente.

---

# TECNOLOGIA

Preserve a stack atual do projeto.

Quando compatível, utilize:

- React
- TypeScript
- Tailwind
- React Router
- shadcn/ui / Radix
- Lucide
- Recharts
- Motion

Evite dependências pesadas sem necessidade.

Não criar backend complexo.

Não integrar IA real inicialmente.

Não implementar multiplayer real.

---

# ARQUITETURA DO MVP

Use a hierarquia obrigatória:

```text
CONTA DO PROFESSOR
      ↓
TURMA
      ↓
MÓDULO
      ↓
AULA
      ↓
EXPERIÊNCIA
      ↓
SESSÃO
      ↓
RESULTADOS
      ↓
CONTINUIDADE
```

Nunca misture:

- aula;
- experiência;
- jogo;
- sessão.

Eles representam coisas diferentes.

---

# DADOS DE DEMONSTRAÇÃO

Os dados precisam parecer parte de um único sistema.

Não gere dados diferentes em cada página.

Centralize tudo em:

```text
src/data/
ou estrutura equivalente
```

Utilize os mesmos:

- professores;
- turmas;
- alunos;
- matrículas;
- módulos;
- aulas;
- experiências;
- resultados;
- objetivos;
- dificuldades;

em todas as telas.

Professora principal:

**Prof. Helena Andrade**

Instituição:

**Faculdade Horizonte**

Turma principal:

**Empreendedorismo e Inovação**

Administração · 3º período · 2026.2

38 alunos.

Módulo atual:

**Validação e Modelagem de Negócios**

Não alterar esses dados sem necessidade.

---

# DIREÇÃO VISUAL

## PERSONALIDADE

Quero:

**premium**

**estratégica**

**educacional**

**tecnológica**

**gamificada**

**madura**

**confiável**

Não infantil.

Não burocrática.

Não genérica.

---

# REFERÊNCIAS CONCEITUAIS

Absorva princípios de:

### isEazy Game

- linguagem de produto gamificado;
- modularidade;
- sensação de experiência.

### Kahoot

- clareza;
- hierarquia;
- leitura rápida;
- feedback.

### Duolingo

- progressão;
- estados;
- continuidade;
- microfeedback.

Mas o resultado deve ser mais sóbrio e apropriado ao Ensino Superior.

NÃO COPIAR essas interfaces.

---

# NÃO QUERO "CARA DE IA"

Evitar:

- gradiente azul/roxo gigantesco;
- glow;
- neon;
- glassmorphism em tudo;
- bolhas brilhantes;
- robôs;
- estrelas;
- partículas aleatórias;
- texto “AI powered” em toda tela;
- chat ocupando metade da aplicação.

A IA deve parecer uma ferramenta de trabalho.

---

# NÃO QUERO "CARA DE TEMPLATE"

Evitar:

```text
4 cards no topo
+
gráfico abaixo
+
tabela
+
outro card
```

em todas as páginas.

Cada área deve possuir composição adequada à sua função.

Use:

- tabelas;
- mapas;
- timelines;
- listas;
- barras;
- grids;
- dashboards editoriais;
- matrizes;
- drawers;
- diagramas;
- painéis;
- stepper;
- activity feed;
- gráficos.

Não transforme tudo em cards.

---

# DESIGN SYSTEM

## CORES

Base:

`#F6F7F9`

Superfícies:

`#FFFFFF`

Secundária:

`#EEF1F5`

Navy profundo:

`#101828`

Indigo principal:

`#5B5CE2`

Teal:

`#19A89D`

Âmbar:

`#E9A93F`

Use cor semanticamente.

Indigo:

- CTA;
- seleção;
- progresso;
- estado ativo.

Teal:

- aprendizagem consolidada;
- progresso positivo.

Âmbar:

- recompensa;
- XP;
- atenção moderada.

Vermelho:

- somente estados realmente críticos.

---

# TIPOGRAFIA

Utilize tipografia moderna e profissional.

Preferência:

- Sora ou Manrope para display;
- Inter para corpo e dados.

Se já houver uma solução tipográfica adequada no projeto, preserve-a.

Hierarquia aproximada:

```text
Page title     28–32px
Section title  20–24px
Card title     16–18px
Body           14–16px
Metadata       12–13px
```

Não utilizar vinte escalas tipográficas.

---

# BORDAS E FORMAS

Evite interface excessivamente arredondada.

Use:

- radius moderado;
- bordas sutis;
- sombras restritas;
- separadores;
- contraste de superfície.

Gamificação não significa transformar tudo em cápsulas.

---

# LAYOUT

Desktop-first.

Professores utilizarão majoritariamente notebook/desktop.

Ainda assim:

- tablet deve funcionar;
- mobile deve ser legível.

Sidebar fixa ou colapsável.

Área principal espaçosa.

Use grids e alinhamentos rigorosos.

---

# MOTION

Animação deve explicar estado ou reforçar interação.

Utilize Motion quando ajudar em:

- entrada de painéis;
- troca de tabs;
- progression states;
- drawers;
- counters;
- charts;
- game preview;
- mudanças no stepper;
- sucesso após aprovação;
- drag/reorder quando aplicável.

Não anime elementos apenas porque é possível.

Evitar animações longas.

A UI deve continuar rápida.

Respeitar `prefers-reduced-motion`.

---

# MICROINTERAÇÕES

Quero um produto que responda às ações.

Exemplos:

### Aprovar mapa

Antes:

`Sugestão da IA`

Ao clicar:

microtransição

Depois:

`✓ Aprovado pelo professor`

### Preparar aula

Stepper progride visualmente.

### Questões

Editar atualiza status.

Regenerar mostra estado temporário de processamento.

### Sessão

Indicadores mudam como se dados estivessem chegando.

### Resultados

Charts entram suavemente.

### Experiência

Preview reage à mudança de template.

---

# NAVEGAÇÃO PRINCIPAL

Sidebar:

```text
SMART EDU

Visão geral
Turmas
Aulas
Materiais
Resultados

Conta
```

Principal CTA:

`+ Preparar aula`

Não:

`Criar quiz`

Não:

`Criar jogo`

A aula vem primeiro.

---

# ÁREA 1 — APP SHELL

Rota:

`/app`

Construa primeiro uma fundação forte.

Preciso de:

- sidebar;
- header contextual;
- breadcrumbs quando relevantes;
- busca quando relevante;
- avatar/professor;
- navegação ativa;
- comportamento responsivo;
- feedback de navegação.

A aplicação já deve parecer Smart Edu mesmo sem abrir nenhuma feature.

---

# ÁREA 2 — DASHBOARD DO PROFESSOR

O dashboard não deve ser um painel de KPIs.

Ele deve responder:

> “O que aconteceu e o que eu preciso fazer agora?”

Header:

**Bom dia, Helena**

`Veja o que mudou nas suas turmas e continue de onde parou.`

CTA:

`Preparar aula`

---

## SUAS TURMAS

Mostrar as três turmas de forma editorial.

Não simplesmente três cards iguais.

Para cada:

- nome;
- curso;
- alunos;
- módulo;
- última atividade;
- próxima aula;
- estado.

---

## O QUE MUDOU DESDE A ÚLTIMA AULA?

Esta deve ser uma área importante visualmente.

Exemplo:

**Empreendedorismo e Inovação**

`7 alunos concluíram a revisão recomendada.`

`5 apresentaram evolução em Segmento de Clientes.`

`3 ainda possuem evidência insuficiente.`

CTA:

`Ver evolução da turma`

---

## PRÓXIMAS AULAS

Timeline.

Exemplo:

`Segmento de Clientes`

`Hoje · 19:00`

`Experiência pronta`

---

## AULAS EM PREPARAÇÃO

Mostrar rascunhos reais.

Exemplo:

`Proposta de Valor`

`Mapa aprovado`

`Falta revisar experiência`

CTA:

`Continuar preparação`

---

## COPILOTO

Painel pequeno.

Nunca chatbot gigante.

**Sugestão da IA**

`A turma melhorou em Segmento de Clientes, mas ainda há confusão recorrente entre usuário, comprador e cliente.`

Ações:

`Ver evidências`

`Usar na próxima aula`

`Ignorar`

---

# ÁREA 3 — TURMAS

`/turmas`

Preciso de:

- busca;
- filtros;
- criar turma;
- estado vazio bem desenhado;
- listagem visualmente interessante;
- acesso rápido à turma.

---

# ÁREA 4 — DETALHE DA TURMA

`/turmas/:id`

Uma das telas mais importantes.

Header:

**Empreendedorismo e Inovação**

Administração · 3º período · 2026.2

Indicadores:

`38 alunos`

`Módulo 2 de 6`

`8 experiências`

`82% participação média`

Ações:

`Preparar aula`

`Convidar alunos`

Tabs:

```text
Visão geral
Aulas
Módulos
Alunos
Resultados
Recompensas
Configurações
```

---

# MAPA DE APRENDIZAGEM

Essa área deve ser visualmente característica do Smart Edu.

Não simplesmente gráfico de barras.

Exemplo:

**Identificar problemas relevantes**

`Consolidado`

**Definir segmento de clientes**

`Quase consolidado`

**Diferenciar usuário e cliente**

`Em desenvolvimento`

**Formular hipótese de valor**

`Em desenvolvimento`

Estados oficiais:

```text
Não avaliado
Em desenvolvimento
Quase consolidado
Consolidado
```

Não transformar isso apenas em nota.

---

# HISTÓRICO

Timeline rica.

Exemplo:

```text
Segmento de Clientes
30 set
Board Expedition
34/38 participantes
78% aprendizagem
```

Clique abre resultado.

---

# ALUNOS QUE MERECEM ATENÇÃO

Agrupar.

Não fazer parede de alertas.

Exemplo:

```text
7 alunos
Dificuldade recorrente em Segmento de Clientes

4 alunos
Evidência insuficiente para diagnóstico
```

CTA:

`Ver alunos`

---

# ÁREA 5 — ALUNOS

Tabela profissional.

Preciso de:

- busca;
- filtros;
- sorting;
- estados;
- linhas clicáveis;
- densidade adequada.

Colunas:

```text
Aluno
Matrícula
Participação
Presença
Progresso
Aprendizagem
Última atividade
Revisão
Ações
```

A tabela precisa parecer utilizável com 40+ alunos.

---

# DETALHE DO ALUNO

Preferencialmente drawer grande ou page contextual.

Não criar boletim tradicional.

Mostrar:

- participação;
- evolução;
- objetivos;
- evidências;
- revisões;
- atividades.

Separar claramente:

**Pontuação do jogo**

de:

**Aprendizagem**

---

# ÁREA 6 — AULAS E MÓDULOS

Representar sequência pedagógica.

Exemplo:

```text
MÓDULO
Validação e Modelagem de Negócios

01 Identificação de Problemas
REALIZADA

02 Segmento de Clientes
REALIZADA

03 Proposta de Valor
EM PREPARAÇÃO

04 Validação de Hipóteses
PLANEJADA
```

Estados:

```text
Planejada
Em preparação
Pronta
Agendada
Executada
```

Planejado nunca significa executado.

---

# ÁREA 7 — PREPARAR AULA

Rota:

`/preparar-aula`

Este é o fluxo principal do produto.

Precisa ser um dos pontos visualmente mais trabalhados do MVP.

Não criar formulário gigante.

Stepper:

```text
1 Contexto
2 Material e escopo
3 Mapa pedagógico
4 Experiência
5 Conteúdo
6 Revisão
7 Pronta
```

Salvar rascunho automaticamente.

---

# CONTEXTO

Pergunta principal:

**O que você pretende trabalhar nesta aula?**

Selecionar:

- turma;
- módulo;
- nome;
- duração;
- intenção.

Intenções:

```text
Introduzir
Praticar
Revisar
Diagnosticar
Consolidar
Avaliar
```

---

# MATERIAL

Criar biblioteca + dropzone visualmente refinada.

Permitir simular:

- PDF;
- slides;
- documento;
- texto.

Depois do upload:

`Material processado`

Mostrar arquivo realista.

---

# ESCOPO COM IA

IA sugere blocos.

Professor pode:

- marcar;
- desmarcar;
- renomear;
- agrupar;
- excluir.

Mensagem importante:

`Somente o conteúdo selecionado poderá ser usado para gerar objetivos e questões.`

---

# MAPA PEDAGÓGICO

Esta deve ser uma tela característica do produto.

IA sugere:

- objetivos;
- conceitos;
- pré-requisitos;
- confusões.

Professor pode editar tudo.

Cada item mostra origem.

Exemplo:

`Fonte: BMC_Segmento_de_Clientes.pdf · pág. 8–11`

Gate obrigatório:

`Aprovar mapa pedagógico`

Antes:

`Sugestão da IA`

Depois:

`Aprovado pelo professor`

---

# ÁREA 8 — EXPERIÊNCIA

Depois do mapa aprovado.

Mostrar três templates:

```text
Expedição Estratégica
Linha de Defesa
Conquista de Territórios
```

Não representar simplesmente como três cards SaaS.

Cada opção deve comunicar comportamento.

---

# EXPEDIÇÃO ESTRATÉGICA

Template principal do MVP.

Este deve receber maior refinamento.

Visual:

- mapa;
- rotas;
- checkpoints;
- recursos;
- equipes;
- bifurcações.

Mostrar:

```text
Competição: moderada
Estratégia: alta
Equipes: recomendado
Velocidade competitiva: sim
Duração típica: 40–50 min
```

Badge:

`Recomendado`

---

# RECOMENDAÇÃO DA IA

Exemplo:

**Recomendação**

`Expedição Estratégica`

`Esse formato combina bem com uma aula de 45 minutos, três objetivos e atividade em equipes.`

Ações:

`Usar recomendação`

`Escolher outro`

IA recomenda.

Professor decide.

---

# CONFIGURAÇÃO

Mostrar apenas:

```text
Modo
Duração
Intensidade competitiva
Interação entre equipes
Recompensa
```

Detalhes técnicos:

`Configurações avançadas`

Professor não é game designer.

---

# ÁREA 9 — QUESTÕES

Banco realista.

Exemplo:

`18 questões geradas`

`12 previstas`

`6 reservas`

Cada uma mostra:

- questão;
- dificuldade;
- objetivo;
- conceito;
- fonte;
- status.

Ações reais:

`Editar`

`Regenerar`

`Excluir`

`Ver fonte`

---

# ÁREA 10 — REVISÃO

Resumo visual da experiência.

Mostrar:

```text
Aula
Turma
Objetivos
Template
Modo
Duração estimada
Questões
Tema
Recompensa
```

Possíveis alertas:

`Objetivo 3 possui apenas duas questões de cobertura.`

Ações:

`Visualizar experiência`

`Editar`

`Aprovar experiência`

---

# ÁREA 11 — PREVIEW DO JOGO

Quero que essa parte impressione.

Não use uma caixa cinza dizendo:

`preview do jogo aqui`.

Representar visualmente a Expedição Estratégica.

Criar modos simulados:

```text
Lobby
Pergunta
Movimento
Decisão
Evento
Resultado
```

Toggle:

```text
Ver como aluno
Ver no telão
Ver como professor
```

Não precisa construir motor real.

Precisa fazer o stakeholder compreender o conceito imediatamente.

---

# ÁREA 12 — SESSÃO / COCKPIT

`/sessao/:id`

Simular uma sessão ao vivo.

Não multiplayer real.

Use sequência determinística de eventos.

Cockpit responde:

```text
O que está acontecendo?

O que a turma está demonstrando?

Preciso intervir?
```

---

# TOPBAR

Mostrar:

- aula;
- fase;
- tempo;
- participantes;
- conexão;
- encerrar.

---

# GAMEPLAY

Representação simplificada do jogo.

---

# APRENDIZAGEM EM TEMPO REAL

Exemplo:

```text
Segmentação        78%
Usuário x comprador 44%
Early adopter       69%
```

---

# COPILOTO AO VIVO

Exemplo:

**Possível dificuldade detectada**

`15 de 27 respostas recentes indicam confusão entre usuário e comprador.`

`Confiança: alta`

Ações:

```text
Ver detalhes
Inserir verificação
Pausar e explicar
Ignorar
```

Nada acontece automaticamente.

---

# CONTROLES

Professor pode:

```text
Pausar
Continuar
Avançar
Pular
Invalidar questão
Encerrar
```

Esses controles precisam ter comportamento simulado.

---

# ÁREA 13 — RESULTADOS

`/resultados/:id`

Outra área central.

Tabs:

```text
Resumo
Aprendizagem
Gameplay
Alunos
Questões
```

---

# RESUMO

Responder visualmente:

```text
O que aconteceu?
O que aprenderam?
Onde houve dificuldade?
Houve intervenção?
Funcionou?
```

---

# APRENDIZAGEM

Priorizar conceitos e padrões.

Melhor:

`16 alunos confundiram usuário com comprador.`

Pior:

`Questão 7 — 43% de acerto.`

Os dois podem existir.

Mas interpretação vem primeiro.

---

# ANTES E DEPOIS

Quando houver intervenção:

```text
Antes      43%
Depois     69%
Final      72%

+29 p.p.
```

Não escrever automaticamente:

`problema resolvido`.

---

# GAMEPLAY

Separado.

Mostrar:

- ranking;
- score;
- equipes;
- recursos;
- decisões;
- eventos.

Gameplay ≠ aprendizagem.

---

# CONTINUIDADE

No final do resultado:

**Próximo passo sugerido**

`A dificuldade em diferenciar usuário e comprador ainda aparece em 7 alunos.`

Ações:

```text
Preparar atividade de reforço
Usar na próxima aula
Ver alunos
Ignorar
```

Se clicar em:

`Preparar atividade de reforço`

abrir `/preparar-aula` com contexto pré-preenchido.

Isso demonstra o loop do Smart Edu.

---

# MOTION E SENSAÇÃO DE PRODUTO

Quero animações em pontos estratégicos.

Exemplos:

- sidebar ativa;
- troca de tabs;
- charts;
- aprovação do mapa;
- cards de templates;
- preview do jogo;
- cockpit;
- drawers;
- counters;
- mudança de status;
- timeline;
- stepper.

Não quero animação decorativa constante.

A sensação deve ser:

**rápido, preciso, sofisticado.**

---

# DETALHES QUE AUMENTAM MUITO A QUALIDADE

Implemente quando fizer sentido:

- skeletons;
- empty states;
- tooltips;
- hover states;
- focus states;
- contextual menus;
- confirmation dialogs;
- toast;
- keyboard navigation;
- autosave indicator;
- breadcrumbs;
- badges semânticos;
- tooltips nos gráficos;
- filtros persistentes;
- microfeedback após ações.

---

# ACESSIBILIDADE

Obrigatório:

- contraste adequado;
- navegação por teclado;
- labels;
- focus visible;
- componentes acessíveis;
- não depender apenas de cor;
- `prefers-reduced-motion`.

---

# RESPONSIVIDADE

Prioridade:

1. desktop 1440;
2. laptop 1280;
3. tablet 768;
4. mobile 390.

Desktop é a experiência principal.

No mobile:

- sidebar vira drawer;
- tabelas podem adaptar para cards/lista;
- cockpit pode simplificar;
- nenhuma informação importante pode ficar inacessível.

---

# PERFORMANCE

Evitar:

- bundles gigantes;
- animações pesadas;
- renderização inútil;
- imagens sem otimização.

Lazy load quando fizer sentido.

Charts devem ser leves.

Não usar Three.js se CSS/SVG resolver.

---

# MOCKS E SIMULAÇÕES

O MVP pode simular:

- IA;
- upload;
- processamento;
- atividade ao vivo;
- alunos entrando;
- mudanças de score;
- intervenção;
- analytics.

Mas a simulação deve parecer intencional.

Nunca use:

```text
setInterval(Math.random())
```

criando números incoerentes.

Prefira cenários determinísticos.

---

# REGRA DE COERÊNCIA

Se Ana Clara possui 83% em uma atividade:

o mesmo dado precisa aparecer:

- na tabela;
- no aluno;
- no resultado;
- no histórico.

Se uma experiência usa Board Expedition:

isso deve continuar igual em todas as telas relacionadas.

Construa uma única fonte de dados.

---

# PRINCIPAIS ROTAS

Garanta pelo menos:

```text
/app

/turmas

/turmas/:id

/turmas/:id/alunos/:studentId

/preparar-aula

/materiais

/resultados/:activityId

/sessao/:id
```

Pode adicionar outras rotas se ajudarem o fluxo.

---

# VALIDAÇÃO OBRIGATÓRIA

Depois de implementar cada milestone:

1. execute TypeScript;
2. execute lint;
3. execute testes existentes;
4. execute build;
5. abra a aplicação;
6. navegue pelo fluxo implementado;
7. verifique console;
8. verifique Network;
9. teste os CTAs;
10. teste estados interativos.

Não considerar uma tela concluída apenas porque compilou.

---

# VALIDAÇÃO VISUAL

Para áreas principais, verificar pelo menos:

```text
1440px
1280px
768px
390px
```

Procure:

- overflow;
- textos cortados;
- hierarquia ruim;
- whitespace inadequado;
- gráficos quebrados;
- tabelas inutilizáveis;
- componentes com aparência padrão de biblioteca.

Corrija antes de finalizar.

---

# CRITÉRIO DE QUALIDADE VISUAL

Antes de concluir uma área, pergunte:

> Isso parece uma tela específica do Smart Edu?

Se removermos logo e nome, ela ainda parece um produto educacional gamificado orientado ao professor?

Se parecer um dashboard SaaS que poderia ser de:

- fintech;
- CRM;
- RH;
- logística;

o design está genérico demais.

Refaça.

---

# ORDEM DE IMPLEMENTAÇÃO

Não tente construir tudo de uma vez.

## MILESTONE 1

- app shell;
- design system;
- navegação;
- dados;
- tipos;
- componentes base.

## MILESTONE 2

- dashboard;
- turmas;
- detalhe da turma;
- alunos.

## MILESTONE 3

- módulos;
- aulas;
- histórico;
- resultados existentes.

## MILESTONE 4

- preparar aula;
- material;
- escopo;
- mapa pedagógico.

## MILESTONE 5

- templates;
- questões;
- revisão;
- preview.

## MILESTONE 6

- analytics;
- resultado da atividade.

## MILESTONE 7

- cockpit ao vivo simulado.

## MILESTONE 8

- refinamento;
- responsividade;
- acessibilidade;
- performance;
- consistência.

---

# NÃO IMPLEMENTAR AGORA

Não transforme o MVP em projeto de infraestrutura.

Fora de escopo:

- backend production-ready;
- WebSockets reais;
- multiplayer;
- autenticação institucional;
- RAG real;
- embeddings;
- pipeline real de PDF;
- economia completa;
- metagame completo do aluno;
- loja completa;
- motor integral de três jogos.

A arquitetura pode estar preparada.

A UI pode demonstrar.

Mas não desperdice o MVP implementando infraestrutura invisível.

---

# PRIMEIRA EXECUÇÃO

Comece fazendo:

1. inspecionar o projeto atual;
2. ler documentação relevante;
3. registrar decisões necessárias;
4. analisar componentes existentes;
5. criar `REFERENCIAS.md`;
6. propor estrutura para o código;
7. identificar componentes reutilizáveis;
8. implementar o shell visual;
9. implementar o Dashboard;
10. validar visualmente;
11. corrigir problemas antes de avançar.

Não me entregue apenas um plano.

Depois da análise, comece a implementação.

---

# RESULTADO ESPERADO

Ao abrir o projeto, quero que seja possível demonstrar algo próximo deste roteiro:

```text
Professor entra
↓
entende situação das turmas
↓
abre Empreendedorismo e Inovação
↓
analisa alunos e aprendizagem
↓
prepara nova aula
↓
adiciona material
↓
IA sugere mapa pedagógico
↓
professor edita e aprova
↓
Smart Edu recomenda Expedição Estratégica
↓
professor revisa questões
↓
visualiza o jogo
↓
aprova a experiência
↓
abre sessão simulada
↓
detecta dificuldade
↓
intervém
↓
encerra
↓
analisa resultado
↓
cria atividade de reforço
```

Esse fluxo precisa parecer um único produto.

Não uma coleção de telas.

---

# FRASE DE CONTROLE

Durante toda a implementação, preserve:

> **O Smart Edu não é um dashboard com gamificação adicionada. É um sistema pedagógico no qual planejamento, experiência, gameplay, evidência e continuidade fazem parte do mesmo ciclo.**

E novamente:

> **NÃO CRIE UMA LANDING PAGE.**
>
> **CONSTRUA O PRODUTO.**
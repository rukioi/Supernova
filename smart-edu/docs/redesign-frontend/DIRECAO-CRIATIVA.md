# SMART EDU / SUPERNOVA
## Redesign de Frontend — Creative Direction, Motion Design, Visual System & Product Experience

### PAPEL

Atue como um time sênior composto por:

- **Creative Director:** responsável por identidade visual, impacto e diferenciação.
- **Staff Product Designer:** responsável por usabilidade, hierarquia, navegação e coerência entre telas.
- **Motion Designer:** responsável por animações funcionais, transições e experiência espacial.
- **Senior Frontend Engineer:** responsável por implementação, desempenho, responsividade e qualidade do código.
- **Data Visualization Designer:** responsável por gráficos, representações de progresso e exploração de resultados.

Utilize como referência os princípios de qualidade visual associados a **Impeccable, Taste Skill e à abordagem de motion de Emil Kowalski**, quando essas skills estiverem disponíveis no ambiente. Não presuma que elas estão instaladas: primeiro verifique.

O objetivo é transformar o frontend existente do Smart Edu em uma experiência visualmente memorável, dinâmica, colorida, gamificada e profissional.

**Não construir uma landing page. Não reconstruir o projeto do zero. Evoluir o software existente.**

---

# 1. DIAGNÓSTICO DO FRONTEND

O projeto já possui cinco páginas principais:

1. Visão Geral — `/app`
2. Turmas — `/turmas`
3. Aulas — `/aulas`
4. Materiais — `/materiais`
5. Resultados — atualmente com telas como `/resultados/sessao-segmento`

As capturas de tela fornecidas representam a implementação atual.

Problemas identificados:

- As telas internas parecem excessivamente estáticas.
- Muitas páginas repetem a composição: título, subtítulo, filtros e cards brancos.
- As transições entre páginas não comunicam continuidade.
- A gamificação aparece em elementos decorativos, mas pouco no comportamento da interface.
- O sistema possui poucas respostas visuais às interações.
- Parte da tipografia condensada prejudica a legibilidade.
- Falta diversidade nas representações dos dados.
- Os cards não apresentam hierarquia suficientemente diferenciada.
- Resultados pedagógicos e resultados competitivos precisam de visualizações próprias.
- A navegação entre turma, aula, sessão e aluno precisa ser mais contextual.

A solução NÃO é adicionar `fadeIn` em tudo.

É criar uma experiência com direção de arte, composição, hierarquia, movimento significativo e feedback contextual.

---

# 2. VISÃO CRIATIVA

## Conceito: THE LIVING LEARNING SYSTEM

O Smart Edu deve transmitir a sensação de um **ecossistema educacional vivo**.

A interface deve comunicar:

**Conhecimento → Experiência → Participação → Evolução → Descoberta.**

A plataforma deve combinar:

- Clareza e confiança de um software educacional profissional.
- Personalidade visual de um produto digital contemporâneo.
- Reações e progressão típicas de videogames.
- Narrativa visual de uma experiência editorial.
- Visualização de dados de uma boa plataforma analítica.

### Referências conceituais

**Duolingo:** feedback, progressão, estados e reforço visual.

**Kahoot:** energia, contraste, sensação de atividade e participação.

**isEazy Game:** mecânicas visuais de gamificação.

**Linear:** precisão de interação, transições cuidadosas e consistência.

**Stripe:** hierarquia visual, organização de informações e composição.

**Interfaces editoriais contemporâneas:** títulos expressivos, grids assimétricos, ritmo visual e uso intencional de espaços vazios.

Não reproduzir literalmente o layout de nenhuma referência.

A identidade final precisa ser reconhecida como Smart Edu.

---

# 3. DESIGN SYSTEM — EVOLUÇÃO VISUAL

## 3.1 Paleta

Preservar a identidade azul e lima do projeto, mas expandir o sistema cromático.

Sugestão inicial de tokens:

| Token | Cor | Função |
|---|---|---|
| Navy | `#081A42` | Navegação, superfícies escuras, identidade |
| Electric Blue | `#2855FF` | Ações, progresso, elementos ativos |
| Acid Lime | `#DFFF4F` | Destaques especiais, progressão e ações prioritárias |
| Lavender | `#A98BFF` | Descobertas, materiais e dados complementares |
| Coral | `#FF826B` | Atenção, intervenção e destaques específicos |
| Teal | `#29C5AD` | Evolução e estados positivos |
| Cloud | `#F4F6FC` | Fundo principal |
| Ink | `#102044` | Texto principal |

Essas cores são pontos de partida. Auditar contraste e harmonização antes de consolidar.

### Regras

- Não transformar todas as páginas em superfícies azuis.
- Usar cores vibrantes em regiões estratégicas.
- Permitir superfícies escuras, brancas, coloridas e neutras.
- Evitar gradientes artificiais em excesso.
- Evitar glow neon desnecessário.
- Evitar que todos os cards tenham a mesma aparência.
- Cores semânticas precisam manter consistência.
- Nunca depender exclusivamente da cor para comunicar um estado.

**Colorido não significa visualmente caótico.**

## 3.2 Tipografia

Criar hierarquia tipográfica real.

Direção recomendada:

**Display:** Space Grotesk ou Sora, com pesos fortes.

**Interface:** Inter ou DM Sans.

**Elementos editoriais especiais:** uma fonte condensada pode ser utilizada pontualmente, mas nunca para blocos longos ou informações críticas.

A implementação atual utiliza algumas composições condensadas em que as palavras parecem visualmente comprimidas.

Corrigir essa característica.

### Hierarquia

- Display grande somente em regiões de destaque.
- H1 expressivo, mas proporcional ao contexto.
- H2 claramente distinto do título principal.
- Títulos de cards legíveis.
- Labels pequenas, sem excesso de caixa alta.
- Métricas com números tabulares, sempre que adequado.
- Textos secundários com contraste suficiente.

Usar tipografia fluida com `clamp()`.

Aplicar controle de largura de linhas, espaçamento, peso, altura de linha e quebras de texto.

Não utilizar uma fonte diferente para cada seção.

---

# 4. MOTION DESIGN SYSTEM

Criar uma camada compartilhada de movimento para toda a aplicação.

Motion deve comunicar:

1. Entrada.
2. Continuidade.
3. Mudança de estado.
4. Causa e consequência.
5. Progressão.
6. Descoberta.
7. Feedback.

## 4.1 Princípio de movimento

**Todo movimento deve ter uma razão.**

Um componente pode se mover porque:

- Foi selecionado.
- Está sendo expandido.
- Mudou de estado.
- Recebeu novos dados.
- Faz parte de uma progressão.
- Está sendo detalhado.
- O usuário mudou de contexto.

Evitar efeitos simplesmente decorativos em elementos de leitura.

## 4.2 Motion tokens

Estabelecer tokens globais de duração e easing.

Valores iniciais sugeridos:

- Microinteração: 120–180 ms.
- Hover e seleção: 160–240 ms.
- Expansão de card: 240–360 ms.
- Transição de painel: 280–420 ms.
- Revelação editorial: 350–600 ms.
- Celebrações e progressão: 500–900 ms, apenas quando justificadas.

Utilizar easing natural e springs amortecidas, sem excesso de elasticidade.

Não aplicar a mesma duração e curva para tudo.

## 4.3 Padrões de interação

### A. Page transitions

Ao navegar:

- Preservar visualmente o contexto sempre que possível.
- Manter o cabeçalho estável.
- Transicionar o conteúdo principal com deslocamento sutil e mudança de opacidade.
- Não animar a página inteira como se estivesse sendo substituída por um slide.

### B. Staggered reveal

Quando uma página é aberta:

- Título aparece.
- Contexto secundário aparece.
- Área principal se revela.
- Cards entram com intervalos discretos.

O usuário não deve esperar toda a animação terminar para interagir.

### C. Hover responsivo

Cards importantes devem oferecer:

- Pequena elevação.
- Mudança sutil de superfície ou contorno.
- Deslocamento de ícone ou seta.
- Feedback de foco equivalente via teclado.

Evitar escalas exageradas.

### D. Shared element transitions

Sempre que tecnicamente adequado:

O usuário seleciona uma turma.

O card da turma se transforma conceitualmente no cabeçalho da página de detalhes.

Ao selecionar uma aula, a identidade visual daquela aula acompanha a navegação para seu detalhe.

Se animação compartilhada real for complexa ou incompatível com o roteamento atual, usar uma transição contextual equivalente, sem introduzir instabilidade.

### E. Scroll-driven storytelling

Criar movimentos associados ao scroll onde fizer sentido:

- Progressão de uma timeline.
- Aparecimento de capítulos.
- Elementos que acompanham a leitura.
- Revelação gradual de indicadores.
- Ativação visual de etapas percorridas.

Não usar parallax exagerado, scroll hijacking ou elementos que dificultem a navegação.

### F. Data motion

Gráficos devem reagir ao usuário:

- Barras mudam suavemente com os filtros.
- Tooltips surgem com precisão.
- Seleções destacam séries.
- Alterações de período apresentam transições.
- Drill-down preserva visualmente a seleção anterior.

Não animar métricas continuamente.

### G. Reduced motion

Respeitar `prefers-reduced-motion`.

Reduzir ou remover movimento espacial desnecessário para usuários que preferem menos animação.

## 4.4 Implementação

Primeiro auditar as dependências existentes.

Se o projeto já utilizar Motion/Framer Motion, aproveitar essa solução.

Caso contrário, avaliar a adoção de uma única biblioteca de motion consistente com a stack.

Usar CSS para transições simples e a biblioteca para orquestrações, layout transitions e animações mais elaboradas.

GSAP/ScrollTrigger somente quando houver uma necessidade concreta não atendida pela solução principal.

Evitar múltiplas bibliotecas concorrentes.

Priorizar `transform` e `opacity`, reduzir reflows e evitar animações custosas no scroll.

---

# 5. PÁGINA 01 — VISÃO GERAL `/app`

## Objetivo

Esta página deve funcionar como um **centro de comando educacional**, e não apenas como uma página de apresentação.

O professor precisa perceber imediatamente:

- Em qual turma está.
- Qual é o módulo atual.
- O que já aconteceu.
- Qual é o próximo passo.
- Como sua turma está evoluindo.
- Qual ação precisa realizar.

## 5.1 Hero principal

A composição azul existente é um ponto forte e deve ser evoluída, não descartada.

Atualmente o hero é muito grande e parte do espaço visual é ocupada por elementos que parecem uma composição estática.

### Redesenhar como uma jornada animada

Manter uma composição editorial com:

**Lado esquerdo:**

- Frase principal de impacto.
- Contexto da turma.
- Objetivo imediato.
- CTA prioritário para preparar a próxima aula.

**Lado direito:**

Criar um mapa de progressão com checkpoints, próximo encontro, eventos e pequenos indicadores contextuais.

O mapa pode utilizar SVG e elementos HTML posicionados de maneira responsiva.

### Movimento

Ao carregar:

1. O título aparece com revelação tipográfica discreta.
2. A linha de progresso é desenhada.
3. O checkpoint atual recebe destaque.
4. O card da próxima experiência aparece.
5. Uma animação curta representa a passagem para a próxima etapa.

A animação de entrada deve acontecer uma vez, não continuamente.

No hover ou seleção de um checkpoint:

- Ele aumenta discretamente.
- Mostra informações da aula.
- Destaca a conexão correspondente.
- Permite navegar, quando aplicável.

No scroll, o hero pode apresentar uma transição visual sutil para a área seguinte.

### Importante

O hero não pode consumir praticamente toda a primeira dobra em desktop.

Reduzir sua altura para que o início da área operacional também fique visível.

## 5.2 Seção seguinte — Jornada da turma

Substituir a sensação de dashboard estático por um layout modular.

Criar regiões visualmente distintas:

**Próxima experiência**

Card prioritário com progresso da preparação e ação principal.

**Pulso da turma**

Resumo de evolução e participação real.

**Descobertas recentes**

Indicadores de aprendizagem obtidos nas experiências anteriores.

**Continuidade**

O que foi concluído, o que precisa de atenção e qual etapa vem depois.

Usar composições de tamanhos diferentes, evitando quatro cards idênticos.

## 5.3 Motion no scroll

A linha visual da jornada pode continuar no conteúdo seguinte, conectando o hero ao progresso do módulo.

Os cards devem surgir com movimentos discretos, não com efeitos excessivos.

## Critério de aceite

A Visão Geral precisa parecer um ambiente ativo e contextual, não uma landing page dentro do aplicativo.

---

# 6. PÁGINA 02 — TURMAS `/turmas`

## Objetivo

Transformar a listagem de turmas em uma **coleção de jornadas educacionais**, na qual cada turma possui personalidade, progresso e contexto.

## 6.1 Layout geral

Manter o título principal e a busca, mas melhorar a organização.

Criar:

- Cabeçalho com identidade editorial.
- Busca e filtros compactos.
- Alternância entre visualização em cards e lista.
- Destaque para turma atual ou selecionada.
- Coleção das demais turmas.

A diferenciação visual deve vir de dados e estados reais.

## 6.2 Redesign dos cards

Os cards atuais são excessivamente parecidos.

Cada card deve conter:

- Nome da turma.
- Disciplina ou curso.
- Quantidade de alunos.
- Módulo atual.
- Estado da jornada.
- Progresso das aulas.
- Próximo evento real, quando existir.
- Acesso principal.

### Composição visual

Criar cards mais editoriais.

O card em destaque pode ser maior que os demais.

Utilizar fundos suaves com cores de destaque específicas e consistentes com o contexto.

Não criar uma cor completamente diferente e aleatória para cada turma.

### Progressão

A timeline de seis aulas é um elemento valioso.

Evoluir para uma representação interativa:

- Concluída: estado consolidado.
- Atual: checkpoint destacado.
- Futura: estado neutro.
- Hover/foco: identificação da aula.
- Seleção: navegação contextual.

### Motion

Ao passar o mouse:

- O contorno muda.
- O card eleva suavemente.
- Um pequeno elemento visual reage.
- A ação principal fica mais evidente.

Ao clicar:

A navegação deve sugerir a entrada no ambiente daquela turma, preservando sua identidade.

## 6.3 Detalhe da turma — requisito essencial

Criar ou aprimorar uma visão contextual da turma.

Estrutura recomendada:

`Turma → Visão Geral | Aulas | Alunos | Resultados | Recompensas`

Nessa visão, o professor encontra:

**Visão Geral:** progresso, participantes, módulo atual, próxima aula e sinais importantes.

**Aulas:** sequência de aulas e experiências dessa turma.

**Alunos:** lista, matrícula/identificador acadêmico quando disponível, vínculo, participação e acesso individual.

**Resultados:** evolução agregada e resultados de cada aula/sessão.

**Recompensas:** acompanhamento ou administração da economia da turma, conforme funcionalidades existentes.

### Requisito

A aba **Resultados deve existir dentro da turma**.

A área global de resultados também pode continuar existindo para análises entre turmas.

## Critério de aceite

O professor precisa acessar os resultados de uma turma sem abandonar o contexto dela.

---

# 7. PÁGINA 03 — AULAS `/aulas`

## Objetivo

Esta deve ser uma das páginas mais expressivas do produto.

A jornada das aulas precisa parecer uma **progressão de aprendizagem**, com continuidade e diferenciação clara entre passado, presente e futuro.

## 7.1 Redesenho da timeline

A timeline vertical atual é uma boa estrutura inicial, mas seus cards ainda parecem uma lista estática.

Transformá-la em uma timeline editorial interativa.

### Aulas concluídas

Representação mais compacta.

Mostrar:

- Nome.
- Data ou sequência.
- Status.
- Breve resumo do que foi executado.
- Acesso às evidências/resultados.

Ao expandir, apresentar informações adicionais sem navegar necessariamente para outra página.

### Aula atual

Deve ser visualmente dominante.

Usar:

- Card expandido.
- Cor de destaque.
- Número da aula em evidência.
- Título forte.
- Template de experiência.
- Duração.
- Estado real da preparação.
- CTA principal.

O card atual pode ter uma composição assimétrica com uma ilustração ou elemento temático e uma região editorial para o conteúdo.

### Aulas futuras

Utilizar visual mais discreto.

Mostrar intenção e planejamento sem sugerir que conteúdos futuros já foram executados.

## 7.2 Motion da timeline

Ao rolar a página:

- A linha de progressão pode ser revelada.
- Checkpoints entram em foco.
- A etapa atual recebe destaque.
- Estados anteriores permanecem claros.

A linha deve refletir o estado real dos dados, e não marcar uma aula como concluída simplesmente porque o usuário rolou a página.

### Expansão de aula

Ao clicar em uma aula:

- O card expande usando layout animation.
- Informações adicionais surgem.
- A timeline ajusta seu layout suavemente.
- O professor encontra ações pertinentes ao estado daquela aula.

Não criar um modal para toda interação pequena.

## 7.3 Contexto lateral

Evoluir a coluna do módulo atual.

Ela pode mostrar:

- Módulo.
- Progresso real.
- Aulas concluídas.
- Objetivos abordados.
- Próxima atividade.
- Dificuldades persistentes, quando houver evidências.

No desktop, avaliar comportamento sticky dentro de limites seguros.

No mobile, converter para um resumo recolhível.

## 7.4 Relação com resultados

Cada aula concluída deve permitir:

**Aula → Experiência executada → Sessão → Resultado.**

Se existir mais de uma sessão de uma mesma aula, mostrar a lista de sessões, sem misturar suas métricas.

## Critério de aceite

O usuário deve distinguir imediatamente aulas concluídas, aula atual e aulas futuras, além de navegar para os respectivos resultados sem procurar em outra área.

---

# 8. PÁGINA 04 — MATERIAIS `/materiais`

## Objetivo

A biblioteca não deve parecer um gerenciador genérico de arquivos.

Precisa representar um **acervo de conhecimento conectado ao planejamento das aulas**.

## 8.1 Composição visual

Evoluir a página para uma biblioteca editorial.

Introduzir diversidade controlada entre:

- PDF.
- Documento.
- Slides.
- Link.
- Outros tipos suportados.

Cada tipo pode utilizar linguagem de preview e uma cor de apoio própria.

Evitar repetir a mesma ilustração genérica de documento nos três cards.

## 8.2 Cards

Cada card deve apresentar:

- Preview apropriado ao material.
- Tipo.
- Título.
- Informações relevantes.
- Data.
- Vínculo com aulas, quando existir.
- Ações disponíveis.

Se for possível gerar miniaturas reais de maneira segura, utilizá-las.

Caso contrário, criar capas gráficas consistentes por tipo de conteúdo.

Não inventar páginas ou capas que façam parecer que o arquivo contém algo que não contém.

## 8.3 Interação

Ao selecionar um material:

Abrir um painel de detalhes contextual, quando adequado.

Exibir:

- Preview.
- Metadados.
- Aulas relacionadas.
- Ações de abrir, reutilizar ou associar ao planejamento.

### Motion

- Cards reagem ao hover.
- Filtros alteram a coleção com transição de layout.
- Painel de detalhes aparece com movimento lateral curto.
- Elementos selecionados mantêm sua identidade visual.

## 8.4 Upload

Transformar a área de adicionar material em uma interação agradável.

Quando existir upload funcional, utilizar estados:

1. Seleção.
2. Validação.
3. Envio.
4. Processamento, quando necessário.
5. Disponível.
6. Erro, com ação de recuperação.

A movimentação deve refletir o progresso real.

Não simular conclusão de upload antes do retorno do sistema.

## Critério de aceite

A biblioteca deve ser visualmente reconhecível, fácil de explorar e conectada à preparação das experiências.

---

# 9. PÁGINA 05 — RESULTADOS

## Objetivo

Esta página precisa deixar de parecer um relatório de métricas isoladas e evoluir para um **laboratório de aprendizagem e desempenho**.

O professor precisa compreender:

1. O que aconteceu?
2. Quem participou?
3. O que a turma demonstrou aprender?
4. Onde apareceram dificuldades?
5. Como os alunos evoluíram?
6. Qual pode ser o próximo passo pedagógico?

Essa página deve ser uma das mais bem trabalhadas visualmente, mas continuar extremamente legível.

## 9.1 Estrutura de navegação — Drill-down

Implementar uma arquitetura de exploração contextual.

### Nível 1 — Resultados gerais

Visão agregada de turmas, períodos e sessões.

Mostrar uma visão comparativa somente quando existirem dados compatíveis.

### Nível 2 — Resultados da turma

Disponível dentro do detalhe da turma.

Mostrar:

- Evolução pedagógica.
- Participação.
- Módulos.
- Aulas realizadas.
- Experiências executadas.
- Pontos de atenção.

### Nível 3 — Resultado da aula/sessão

Mostrar o relatório detalhado de uma sessão ou conjunto de sessões identificadas.

### Nível 4 — Aluno

Permitir explorar participação, evidências e evolução individual, respeitando permissões.

O professor deve manter claro o caminho de navegação.

**Exemplo:**

Turmas → Empreendedorismo e Inovação → Resultados → Aula 02 → Sessão de 30/set → Alunos → Aluno selecionado.

Ao voltar, preservar filtros, período e contexto de navegação sempre que possível.

## 9.2 Resultado detalhado — Layout

Manter abas conceitualmente semelhantes às atuais, evoluindo a visualização:

**Resumo | Aprendizagem | Gameplay | Alunos | Questões**

A navegação entre abas deve possuir um indicador ativo animado e preservar o estado relevante.

## 9.3 Cabeçalho

Apresentar:

- Aula/experiência.
- Turma.
- Sessão e data.
- Participantes.
- Resumo principal.

Utilizar métricas grandes e expressivas, mas não criar quatro cards idênticos simplesmente para preencher o grid.

Explorar uma composição assimétrica em que a métrica mais importante tenha destaque.

## 9.4 Visualizações

Substituir a dependência excessiva de números e barras de progresso por diferentes formas adequadas de visualização.

### A. Evolução temporal

Gráfico de linha ou área para representar mudanças ao longo do tempo.

Usar somente observações reais e períodos comparáveis.

Interação:

- Hover/foco mostra valor e contexto.
- Seleção destaca um ponto.
- O professor pode abrir a aula relacionada.

### B. Objetivos de aprendizagem

Criar uma visualização comparativa por objetivo.

Exemplos:

- Barras horizontais ordenadas.
- Dot plot.
- Heatmap por objetivo e aula, quando houver dados suficientes.

Mostrar o estado e a quantidade de evidências quando relevante.

### C. Participação

Mostrar claramente:

- Total de alunos.
- Participantes.
- Ausentes.
- Respostas efetivamente registradas.

Não confundir ausência com erro pedagógico.

### D. Antes e depois

Quando houver avaliações comparáveis:

Utilizar slope chart ou gráfico de comparação de dois momentos.

Mostrar:

- Situação anterior.
- Situação posterior.
- Variação em pontos percentuais, quando cabível.

Nunca criar comparação antes/depois sem medições reais.

### E. Gameplay

Criar visualização própria para:

- Ranking competitivo.
- Equipes.
- Pontuação.
- Recursos.
- Eventos relevantes.
- Desempenho estratégico.

Separar claramente dados de gameplay de dados de aprendizagem.

**Vencer uma partida não é o mesmo que demonstrar maior domínio pedagógico.**

## 9.5 Cards de insights

Reformular os cards atuais.

Em vez de vários painéis brancos repetidos, criar diferentes formatos:

**Insight positivo**

Superfície neutra ou com destaque Teal.

Apresenta uma conquista pedagógica observada, com evidências.

**Ponto de atenção**

Superfície Coral suave.

Mostra o conceito, a natureza do sinal, a evidência e o grupo afetado, quando disponível.

**Comparação**

Painel editorial com visualização antes/depois.

**Próxima ação**

Card claramente distinguível que oferece aprofundamento ou preparação de reforço.

A IA pode sugerir intervenções, mas o professor precisa aprovar qualquer alteração pedagógica.

## 9.6 Motion nos gráficos

Os gráficos devem ter:

- Revelação discreta na primeira entrada.
- Transições entre conjuntos de dados.
- Tooltips bem posicionados.
- Seleção animada.
- Highlight de série.
- Drill-down contextual.

Evitar animações permanentes.

Não criar gráficos 3D decorativos que dificultem a leitura.

## 9.7 Drill-down visual

Ao selecionar um objetivo, aula ou estudante:

Preferir navegação contextual, painel lateral ou página de detalhe, de acordo com a profundidade da informação.

Para explorações rápidas, um drawer é apropriado.

Para análises completas, utilizar página dedicada.

Não abrir sucessivos modais sobre modais.

## 9.8 Privacidade e integridade

- Dados pedagógicos individuais são privados.
- O acesso depende da permissão do usuário.
- Ranking competitivo e domínio pedagógico são métricas separadas.
- Evidências insuficientes não devem ser apresentadas como diagnóstico conclusivo.
- Dados fictícios não podem aparecer como se fossem reais.
- Não usar valores arbitrários para completar visualizações vazias.
- Histórico de uma sessão deve permanecer associado à versão da experiência efetivamente executada.

## Critério de aceite

Em poucos segundos, o professor deve identificar o principal resultado da sessão e seu ponto de atenção.

Em poucos cliques, deve conseguir investigar turma, aula, objetivo, questão e aluno.

---

# 10. NAVEGAÇÃO E COESÃO ENTRE PÁGINAS

A plataforma precisa ter identidade contínua.

## 10.1 Hierarquia canônica

Respeitar a organização:

Conta do professor → Turma → Módulo → Aula → Experiência → Partida/Sessão.

Materiais pertencem a uma biblioteca reutilizável e podem ser relacionados a diferentes aulas.

## 10.2 Navegação global e contextual

Estabelecer distinção clara entre:

**Navegação global:** acesso às áreas gerais do produto.

**Navegação contextual:** exploração de uma turma, módulo ou aula.

Não duplicar opções de navegação sem necessidade.

O professor deve compreender sempre qual turma está selecionada.

## 10.3 Transições entre contextos

Quando o professor entra em uma turma:

- Atualizar claramente nome e contexto.
- Preservar elementos de identidade do card de origem quando possível.
- Apresentar as opções disponíveis naquela turma.
- Permitir voltar sem perder filtros.

## 10.4 Consistência

Todas as páginas compartilham:

- Tipografia.
- Paleta de tokens.
- Sistema de espaçamento.
- Comportamento dos botões.
- Estados de hover e foco.
- Transições.
- Navegação.
- Estilo dos ícones.
- Bordas e superfícies.
- Comportamentos responsivos.

Porém, **não devem compartilhar exatamente a mesma composição visual**.

A consistência vem do sistema de design, não da repetição de templates de página.

---

# 11. COMPONENTES VISUAIS PRIORITÁRIOS

Criar ou refatorar componentes reutilizáveis conforme a necessidade:

### MotionPage

Transição consistente entre rotas e contextos.

### AnimatedCard

Card com estados interativos, suporte a teclado e layout transition opcional.

### ProgressJourney

Componente visual de progressão para módulos, turmas ou experiências, com variantes horizontal e vertical.

### AnimatedMetric

Exibição de métricas com transição somente quando os dados realmente mudarem.

### InsightPanel

Painel de informações pedagógicas com variantes positivas, neutras e de atenção.

### ContextualDrawer

Painel para exploração de detalhes sem perder a página principal.

### ChartContainer

Estrutura compartilhada para gráficos, incluindo título, explicação, filtros, legenda e estados de carregamento.

### StatusBadge

Componente consistente para estados de aula, preparação, execução e conclusão.

### PageHeader

Estrutura flexível de cabeçalho, com variantes visuais diferentes entre páginas.

Não transformar todos os componentes em abstrações genéricas.

Criar variantes quando elas representarem comportamentos reais e repetidos.

---

# 12. RESPONSIVIDADE E ACESSIBILIDADE

O redesign precisa funcionar em desktop, tablet e mobile.

### Desktop

Explorar grids editoriais, colunas assimétricas e painéis contextuais.

### Tablet

Reduzir colunas e preservar ações prioritárias.

### Mobile

- Simplificar composições.
- Eliminar dependência de hover.
- Transformar painéis laterais em bottom sheets ou views apropriadas.
- Garantir acesso a gráficos e detalhes.
- Não reduzir toda a experiência a uma coluna de cards idênticos.
- Manter touch targets confortáveis.

### Acessibilidade

- Navegação por teclado.
- Foco visível.
- Contraste adequado.
- Estados descritos também por texto ou ícone.
- Ferramentas de dados acessíveis.
- Animações compatíveis com reduced motion.
- Nenhuma informação crítica deve depender de animação.

---

# 13. REGRAS DE IMPLEMENTAÇÃO

Antes de modificar o código:

1. Inspecionar a arquitetura atual.
2. Identificar framework, router e biblioteca de estilos.
3. Mapear os componentes compartilhados.
4. Identificar bibliotecas de motion e gráficos existentes.
5. Localizar as cinco páginas.
6. Verificar estados, tipos, dados e fluxos já implementados.
7. Identificar integrações ou funcionalidades que não podem ser quebradas.

**Não presumir a stack.**

Não substituir tecnologias do projeto sem justificativa.

Não reescrever módulos funcionais apenas para facilitar a animação.

Não criar backends fictícios.

Quando algum recurso depender de dados ainda não existentes, deixar isso explícito e implementar apenas uma apresentação honesta com estados adequados.

Preservar URLs existentes sempre que possível e adicionar navegação contextual sem quebrar acessos anteriores.

## 13.1 Ordem de execução

### Etapa 1 — Auditoria visual e técnica

Identificar problemas, componentes e oportunidades.

### Etapa 2 — Design foundations

Implementar tokens, tipografia, espaçamento, superfícies, estados e arquitetura básica do motion.

### Etapa 3 — Componentes compartilhados

Refatorar o necessário para permitir consistência.

### Etapa 4 — Visão Geral

Criar a direção visual principal do produto.

### Etapa 5 — Turmas

Implementar coleção, progresso interativo e navegação contextual.

### Etapa 6 — Aulas

Implementar timeline dinâmica, estados e expansão.

### Etapa 7 — Materiais

Criar biblioteca editorial, previews e interações.

### Etapa 8 — Resultados

Melhorar data visualization e implementar o drill-down de frontend.

### Etapa 9 — Refinamento integrado

Revisar navegação, transições, responsividade e consistência visual entre todas as páginas.

Não deixar cinco páginas com estilos incompatíveis.

---

# 14. TESTES E VALIDAÇÃO

Validar as cinco páginas em diferentes viewports.

Testar:

- Navegação principal.
- Entrada e saída de turma.
- Seleção de aula.
- Expansão de cards.
- Filtros de materiais.
- Mudança de abas de resultados.
- Drill-down.
- Estado de carregamento.
- Estado vazio.
- Erros.
- Reduced motion.
- Navegação por teclado.
- Responsividade.
- Comportamento de scroll.

Verificar se as animações não provocam:

- Layout shift excessivo.
- Elementos fora da tela.
- Sobreposição indevida.
- Travamentos.
- Scroll horizontal acidental.
- Perda de foco.
- Atraso na interação.
- Regressões funcionais.

Se houver Playwright disponível, utilizar screenshots e testes de interação para validar visualmente os resultados.

Executar lint, typecheck e build conforme scripts reais do projeto.

Não declarar testes como concluídos se não forem executados.

---

# 15. CRITÉRIOS FINAIS DE QUALIDADE

O trabalho somente estará adequado quando:

**01 — Identidade:** as cinco páginas forem reconhecidas como partes do mesmo produto.

**02 — Diferenciação:** cada página tiver composição e linguagem visual coerentes com sua função.

**03 — Movimento:** a interface utilizar motion para comunicar estado, continuidade e consequência.

**04 — Hierarquia:** o usuário identificar imediatamente títulos, informações prioritárias e ações principais.

**05 — Gamificação:** progressão, descobertas, conquistas e estados aparecerem na experiência de interação, não apenas como decoração.

**06 — Dados:** os resultados forem visualmente expressivos e interpretáveis.

**07 — Drill-down:** o professor conseguir navegar de turma para aula, sessão e aluno, respeitando o contexto e as permissões.

**08 — Usabilidade:** nenhuma animação comprometer a execução de tarefas.

**09 — Responsividade:** a interface manter qualidade visual e funcional em todos os tamanhos relevantes.

**10 — Integridade:** os fluxos existentes permanecerem funcionais, sem dados simulados apresentados como reais.

---

# 16. O QUE NÃO QUERO

- Landing page no lugar do sistema.
- Layout genérico de dashboard SaaS.
- Cards brancos idênticos espalhados por todas as telas.
- Gradientes exagerados com estética genérica de IA.
- Glow neon em todas as bordas.
- Animações de entrada repetidas ao menor scroll.
- Parallax exagerado.
- Componentes que pulam excessivamente no hover.
- Gráficos apenas decorativos.
- Mascotes espalhados aleatoriamente.
- Tipografia condensada e ilegível.
- Ícones e badges usados sem propósito.
- Todas as páginas com o mesmo layout.
- Skeletons eternos ou dados fictícios apresentados como verdadeiros.
- Mudanças que quebrem a funcionalidade existente.
- Apenas mudanças cosméticas sem melhoria de experiência.
- Efeitos visualmente impressionantes, mas desconectados da tarefa do professor.

---

# 17. RESULTADO ESPERADO

Ao final, o Smart Edu deve parecer um software educacional de nova geração.

Ao abrir a Visão Geral, o professor encontra um centro de comando vivo.

Ao entrar em Turmas, percebe uma coleção organizada de jornadas, cada uma com identidade e progresso.

Ao abrir Aulas, acompanha uma sequência interativa de experiências educacionais.

Ao acessar Materiais, explora uma biblioteca visualmente interessante e funcional.

Ao acessar Resultados, entra em um ambiente sofisticado de análise, no qual consegue aprofundar dados da turma, da aula, da sessão e do aluno.

**O visual deve gerar impacto. O movimento deve gerar entendimento. A organização deve gerar confiança.**

## INSTRUÇÃO FINAL

Não se limite a trocar cores, adicionar animações simples ou aumentar o arredondamento de cards.

Questione as composições atuais.

Explore hierarquia, assimetria, contraste, tipografia, ritmo, superfícies, visualização de dados, continuidade espacial e motion.

Tome decisões de direção de arte coerentes com o contexto de uma plataforma profissional de educação gamificada.

Primeiro apresente uma auditoria objetiva e o plano de execução por página. Em seguida, implemente o redesign em etapas, respeitando a arquitetura e validando o resultado no navegador.

**Priorize qualidade visual e experiência real de produto, não quantidade de efeitos.**
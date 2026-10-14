# SMART EDU — VISUAL RESET
## NÃO É UMA NOVA REFATORAÇÃO FUNCIONAL

O frontend já foi refatorado funcionalmente.

A navegação superior, roteamento, seletor de turma, responsividade,
componentes e regras de negócio atuais devem ser PRESERVADOS sempre
que estiverem funcionando.

O problema agora é exclusivamente:

DIREÇÃO DE ARTE
COMPOSIÇÃO
HIERARQUIA VISUAL
PERSONALIDADE
DENSIDADE
RITMO
INTERAÇÃO

O resultado atual foi tecnicamente correto, porém visualmente
insatisfatório e genérico.

NÃO considere lint, build, TypeScript ou Playwright como evidência
de que esta tarefa visual foi concluída.

Eles são apenas requisitos técnicos mínimos.

---

# 0. IMPORTANTE: O DESIGN ATUAL É UMA ANTI-REFERÊNCIA

Analise as telas atuais.

Elas NÃO representam a direção desejada.

Problemas atuais que precisam ser corrigidos:

1. excesso de fundo creme/off-white em toda a aplicação;
2. pouco contraste entre página e superfícies;
3. excesso de grandes cards pastel;
4. grid excessivamente regular;
5. aparência de dashboard SaaS;
6. aparência de sistema acadêmico em Aulas;
7. pouca diferença visual entre áreas importantes e secundárias;
8. ausência de profundidade;
9. ausência de uma assinatura visual Smart Edu;
10. cards usados para organizar praticamente qualquer informação;
11. composição excessivamente segura;
12. muito espaço vazio sem função composicional;
13. interface correta, porém pouco memorável.

NÃO tente apenas "polir" essas telas.

RECOMPONHA-AS.

---

# 1. ESCOPO DESTA ITERAÇÃO

NÃO redesenhe o sistema inteiro.

Trabalhe SOMENTE nestas três páginas:

1. VISÃO GERAL
2. TURMAS
3. AULAS E MÓDULOS

Essas três páginas serão usadas para calibrar a direção visual
de todo o restante do produto.

Não avance para outras páginas.

---

# 2. DIREÇÃO

A nova direção é:

EDITORIAL DIGITAL
×
LEARNING STUDIO
×
GAME DESIGN
×
SOFTWARE PROFISSIONAL

Não quero:

"dashboard educacional bonito"

Quero:

"um produto digital educacional que possui sua própria linguagem visual"

Palavras-chave:

confiante
editorial
contemporâneo
expressivo
preciso
interativo
tecnológico
gamificado
maduro
não infantil
não corporativo genérico

---

# 3. PRINCÍPIO MAIS IMPORTANTE

NÃO CONSTRUA A PÁGINA A PARTIR DE CARDS.

Primeiro componha a página.

Depois decida quais elementos realmente precisam ser cards.

Utilize também:

- superfícies abertas;
- linhas;
- grandes blocos tipográficos;
- faixas;
- divisórias;
- progress tracks;
- agrupamento por proximidade;
- áreas full-bleed quando apropriado;
- assimetria controlada;
- mudanças de escala.

Espaço em branco deve possuir intenção.

Não crie enormes vazios simplesmente para parecer minimalista.

---

# 4. FUNDO

O fundo atual é um dos problemas principais.

NÃO utilize creme/bege uniforme em todo o viewport.

Criar uma arquitetura de superfícies.

A base da aplicação deve ser:

branco / quase branco neutro.

O tom quente pode aparecer pontualmente.

Utilizar contraste de seções quando necessário:

WHITE
SOFT NEUTRAL
NAVY
COBALT
SOFT ACCENT

Não aplicar cor pastel em cada card.

Grandes blocos de cor devem ser raros e intencionais.

---

# 5. PALETA

Preservar a identidade Smart Edu:

NAVY
COBALT BLUE
ORANGE
ACID YELLOW
MINT / GREEN
LILAC

Mas:

NAVY + WHITE devem estruturar o sistema.

COBALT é a principal energia digital.

ORANGE e ACID são acentos.

MINT e LILAC entram contextualmente.

Não exibir todas as cores ao mesmo tempo.

---

# 6. TIPOGRAFIA

Quero duas vozes.

### FUNCIONAL
Muito legível.

Usar em:

navigation
body
metadata
buttons
inputs
metrics
tabs

### EDITORIAL / DISPLAY
Característica.

Usar somente em:

grandes títulos
numeração
momentos especiais
experiências
algumas métricas hero

Não usar tipografia display em pequenos textos operacionais.

O título deve ser expressivo sem prejudicar leitura.

---

# 7. NAVEGAÇÃO SUPERIOR

A arquitetura atual pode permanecer.

Mas refine visualmente.

O seletor de turma atual está grande e com aparência de formulário.

Transforme-o em um CONTEXT SWITCHER.

Ele deve indicar:

● Empreendedorismo e Inovação
  Módulo 2

e abrir as outras turmas.

Precisa parecer um objeto de navegação,
não um select/input.

A navegação não pode lembrar navbar de landing page.

Active state deve possuir personalidade Smart Edu.

---

# 8. VISÃO GERAL

RECOMPOR COMPLETAMENTE.

Pergunta da tela:

> O que merece a atenção do professor agora?

Hierarquia:

1. CONTEXTO / SAUDAÇÃO
2. AULA EM FOCO
3. MOVIMENTO DE APRENDIZAGEM
4. CONTINUIDADE DAS TURMAS

AULA EM FOCO precisa ser o maior momento visual da home.

Ela precisa parecer:

"isso vai acontecer"

e não:

"este é um card com dados".

Pode utilizar um grande bloco COBALT ou NAVY.

Experimentar composição editorial.

Conteúdo:

SEGMENTO
DE CLIENTES.

Empreendedorismo e Inovação

19:00
Sala 204
38 estudantes
45 minutos

[ ABRIR SESSÃO → ]

A ilustração pode participar da composição,
mas nunca competir com o título.

---

# 9. APRENDIZAGEM EM MOVIMENTO

Não transformar em três cards de KPI.

Criar uma área editorial de sinais.

Exemplo:

07
estudantes concluíram
a revisão recomendada

────────────────────

05
evoluíram em
Segmento de Clientes

────────────────────

● 3 estudantes precisam de atenção →

Usar hierarquia de números + texto.

---

# 10. TURMAS NA HOME

Não mostrar três grandes retângulos idênticos.

Pode utilizar:

lista editorial
stack
rail horizontal
cards assimétricos
ou composição híbrida.

Cada turma deve comunicar rapidamente:

nome
curso
alunos
módulo
próximo momento

O hover deve transformar o objeto.

Exemplo:

01
Empreendedorismo e Inovação
Administração · 38 alunos

Validação e Modelagem de Negócios
Hoje · 19:00                    →

---

# 11. PÁGINA TURMAS

A tela atual com 3 grandes cards pastel é rejeitada.

RECOMPOR.

O objetivo é explorar os contextos de ensino do professor.

Não fazer:

[ CARD ][ CARD ][ CARD ]

todos iguais.

Criar diferença entre:

TURMA ATIVA / EM FOCO

e

DEMAIS TURMAS.

Por exemplo:

a turma em foco pode ocupar uma faixa maior.

As demais podem aparecer numa composição mais compacta.

Mostrar informação com clareza sem transformar cada turma em
um mini dashboard.

---

# 12. PÁGINA AULAS E MÓDULOS

A tela atual se parece com uma tabela dentro de um card branco.

ESSA DIREÇÃO ESTÁ REJEITADA.

Quero que esta página comunique:

SEQUÊNCIA
PROGRESSO
TEMPO
CONTINUIDADE

Ela precisa parecer uma jornada pedagógica.

Usar visual de progressão/timeline.

Por exemplo:

01 — Identificação de Problemas
     Executada · consolidado 89%

02 — Segmento de Clientes
     Executada · 78%

03 — PROPOSTA DE VALOR
     EM PREPARAÇÃO
     [ Continuar preparação → ]

04 — Validação de Hipóteses
     Próxima

05 — Modelagem de Receitas
     Planejada

06 — Síntese do Modelo
     Planejada

A aula atual precisa possuir protagonismo.

Aulas executadas devem parecer história.

Aulas futuras devem parecer horizonte.

NÃO colocar tudo com o mesmo peso.

---

# 13. NÃO USE CARD PARA STATUS SIMPLES

Por exemplo:

Executada
Planejada
Em preparação

não precisam obrigatoriamente virar pills.

Utilize também:

texto
ícone
ponto
linha
peso
posição
contraste

Evitar excesso de badges.

---

# 14. ASIMETRIA CONTROLADA

Evitar grid perfeito em todas as seções.

Quero composição.

Exemplo desktop:

7 colunas
+
5 colunas

ou

8
+
4

ou

elemento principal
+
rail de contexto.

A interface deve ter ritmo semelhante a um editorial.

Não comprometer alinhamento e legibilidade.

---

# 15. MOVIMENTO

Só depois da nova composição estar correta.

Adicionar:

hover
press
shared transitions
tab movement
page transition
scroll reveal

Mas não use movimento para mascarar uma composição fraca.

---

# 16. INTERAÇÕES

Cards/linhas clicáveis:

hover:
translateY(-2px) ou transformação equivalente

seta:
move 3–5px

bordas/cores:
mudança sutil

Elementos de aula:

ao hover:
revelar contexto adicional.

Turmas:

ao hover:
aumentar destaque da ação.

Não usar efeitos exuberantes.

---

# 17. REFERÊNCIAS

Analise visualmente:

https://loftylab.framer.website/
https://cohesion.framer.ai/
https://impeccable.style/

NÃO copie componentes.

Observe:

Lofty:
- escala;
- personalidade;
- composição;
- tipografia;
- inesperado.

Cohesion:
- comportamento dos objetos;
- interatividade;
- transições.

Impeccable:
- hierarquia;
- ritmo;
- clareza;
- craft.

---

# 18. ANTI-PATTERNS

PROIBIDO nesta iteração:

sidebar
bento dashboard
glassmorphism
gradient mesh
AI glow
fundo bege integral
três cards idênticos em linha
card branco para cada seção
pill para cada metadata
12 widgets na home
shadows decorativas
border radius exagerado
visual de ERP
visual de LMS tradicional
visual de template SaaS
visual infantil

---

# 19. PROCESSO DE IMPLEMENTAÇÃO

Faça isso em PASSOS.

## PASSO 1

Capture o estado atual das três páginas em desktop.

Salve como BEFORE.

## PASSO 2

Implemente SOMENTE:

- background/surfaces;
- shell visual;
- typography;
- layout/composição.

NÃO adicione motion ainda.

## PASSO 3

Capture novamente.

Analise visualmente:

- existe hierarquia?
- existe contraste?
- existe uma assinatura?
- a página ainda parece dashboard?
- tudo ainda está dentro de cards?

Se ainda parecer dashboard:

ITERAR.

Não avance.

## PASSO 4

Depois da composição aprovada internamente:

adicione microinterações e motion.

## PASSO 5

Capture:

1440×900
1280×800
390×844

das três páginas.

---

# 20. VISUAL QA

Playwright funcional não é suficiente.

Faça VISUAL QA.

Antes de considerar concluído, responda internamente:

"Se eu removesse o logotipo Smart Edu desta tela,
ela ainda pareceria um template comum?"

Se SIM:

não está pronta.

Outra pergunta:

"Esta interface poderia ser confundida com
um dashboard financeiro, CRM ou LMS?"

Se SIM:

não está pronta.

Outra:

"Existe uma área que causa impacto visual
nos primeiros 2 segundos?"

Se NÃO:

não está pronta.

---

# 21. NÃO DECLARE SUCESSO COM BASE EM BUILD

Ao final NÃO use como conclusão principal:

"lint passou"
"TypeScript passou"
"build passou"
"rotas passaram"

Esses são checks obrigatórios, não critérios visuais.

A conclusão deve descrever:

1. o que mudou na composição;
2. como a hierarquia foi reconstruída;
3. como o dashboard genérico foi eliminado;
4. como a linguagem Smart Edu passou a aparecer;
5. onde estão as screenshots de comparação.

---

# 22. IMPORTANTE

NÃO ALTERE AS OUTRAS PÁGINAS.

A calibração desta linguagem visual será feita primeiro nestas 3.

VISÃO GERAL
TURMAS
AULAS E MÓDULOS

Só depois essa linguagem será propagada para:

Resultados
Preparar Aula
Materiais
Experiência
Cockpit

Implemente agora esta calibração visual.
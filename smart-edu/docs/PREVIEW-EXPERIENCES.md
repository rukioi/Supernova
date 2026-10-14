# Prévia interativa de experiências

A revisão abre a prévia em outra aba do navegador, mantendo a preparação e o rascunho na aba original. Perspectiva, formato, fases e estrutura pedagógica permanecem disponíveis durante a exploração.

## Relação com a documentação Supernova

Referência: `../SUPERNOVA-Documentao-do-Produto.md`, seções 5, 8.7–8.9, 9.6–9.8, 10 e 13.

| Formato | Mecânica | Propósito pedagógico |
| --- | --- | --- |
| Expedição Estratégica | Rota de campo ou análise, recursos limitados, indício contraditório | Investigar, tomar decisões com consequências e rever uma hipótese |
| Linha de Defesa | Pilares de conceito, evidência e limites; teste e contraprova | Construir um argumento verificável e reconhecer suas limitações |
| Conquista de Territórios | Mapa de áreas conectadas, aplicação, negociação de fronteiras | Transferir conceitos a um caso e justificar conexões em equipe |

Esses três formatos são interpretações das dinâmicas cooperativas e baseadas em desafios descritas no documento; o documento não prescreve suas regras específicas.

As seis fases apresentam regras e objetivo, questão selecionada, planejamento, decisão com justificativa, evento com revisão e síntese com reflexão. A pergunta usa o texto, as opções, o gabarito, a explicação e a fonte do rascunho. Seleções vazias permanecem vazias. Objetivos aprovados, quantidade de questões, modo e duração vêm do estado da aula.

A perspectiva Aluno permite testar respostas e escolhas. Telão usa leitura coletiva e não expõe respostas ou justificativas individuais. Professor mostra intenção pedagógica, justificativa e pausa manual para discussão. O modo individual não exibe ranking público.

Feedback explica o conceito e as consequências. Pontuação do jogo e registros de aprendizagem são apresentados separadamente: os registros não constituem diagnóstico automático de domínio. A configuração numérica de XP por checkpoint é respeitada; recompensas em XP sem valor numérico usam 100 XP ilustrativos na prévia. Recompensas simbólicas exibem a configuração escolhida. Sem pontuação mantém apenas os registros.

## Limites e isolamento

Esta é uma simulação local, não um motor de sessão multiplayer. Perguntas e objetivos usam o rascunho; situações de estratégia e contraprova são cenários demonstrativos. A troca de formato reinicia as respostas locais desse formato e não altera a escolha aprovada da aula. Abrir a prévia registra apenas a visualização, conforme o gate existente. Respostas, justificativas, pontos e intervenções não são publicados nem gravados nos resultados reais.

Implementação: diálogo e RadioGroup já instalados, Motion existente para transições curtas e SVG para os três mapas. Nenhuma dependência nova ou serviço pago.

O fluxo atual foi verificado no navegador: abrir a prévia cria outra aba, mantém a revisão na aba original e carrega os controles da experiência.

# Sistema de movimento

Fonte de verdade: tokens de `app/globals.css`, CSS de superfície e hooks `useReducedMotion`. Não há uma segunda biblioteca de animação.

| Evento | Propósito | Técnica | Tempo |
|---|---|---|---|
| Pressionar botão | Confirmar entrada | transform scale(.97), CSS | 160ms |
| Trocar contexto/tela | Continuidade | ContextTransition, opacity/transform | 180ms |
| Atualizar preparação | Mostrar etapa | conector scaleY, posição da seleção | 280/180ms |
| Barra de progresso | Mostrar progresso real | scaleX, Motion/CSS | token state ou componente existente |
| Resposta/consequência | Evidenciar confirmação | feedback finito, opacity/translateY | 240ms |
| Conclusão | Distinguir recompensa/evidência | entrada do painel de resultado | 280ms |
| Mudar fase no mapa | Mostrar posição e estratégia | transform, SVG atributos e pathLength | spring finita |

Easing compartilhado `cubic-bezier(.22,1,.36,1)`. Mapas usam mola amortecida com stiffness 240, damping 30 e mass .9. Não há loops adicionados. Geometria SVG admite atualização de atributos e desenho de linhas, conforme documentação consultada via Motion MCP: `motion://docs/react/react-svg-animation`.

## Estado e causalidade

A prévia é uma simulação local. `answered` vem de resposta correta; `decision` só chega após confirmação; `revised` vem da revisão. Recursos permanecem nos valores anteriores: inicial 120, depois 80 ou 40 conforme decisão confirmada. O tabuleiro não calcula XP, não redefine economia e não escreve aprendizagem. Territórios conquistados conservam o mapeamento anterior dos registros para nós.

## Acessibilidade e custo

Movimento reduzido atualiza imediatamente o destino; não se remove o transform que posiciona o marcador. Hover espacial é restrito a pointer fine/hover hover. Botões continuam com foco e alvos de toque. Entradas não bloqueiam clique nem leitura; sem uso permanente de will-change, sem blur caro e sem render React a cada movimento de ponteiro.

No celular, um viewport independente permite deslizar o mapa ou explorar pelo teclado. Uma mudança de fase centraliza a posição atual dentro desse viewport, sem rolar a página; a preferência de movimento reduzido torna esse deslocamento imediato. Cabeçalho e legenda continuam fixos na composição do tabuleiro.

As capturas desktop/mobile e o teste de movimento reduzido são em Chromium/Edge local. Desempenho em hardware físico de baixa potência e sincronização de sessão real ainda exigem ambiente apropriado.

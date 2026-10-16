# FE-01 — Design system: cor, tipografia e superfícies

- Status: implementado e validado no recorte FE-01 (15/10/2026)
- Fase: 01
- Dependências: [FE-00](00-auditoria.md)
- Contrato: [direção criativa](../DIRECAO-CRIATIVA.md), seções 2, 3, 11, 12; [regras de execução](../CONTRATO-DE-EXECUCAO.md).
- Pontos de entrada a confirmar na árvore ativa: `app/globals.css; app/campus.css; app/journey.css; app/layout.tsx; components/product/journey-ui.tsx`.

## Resultado esperado

Insumo [FE-00](../AUDITORIA-FE-00.md): tokens semânticos já existem em globals.css, mas a cascata importa onze folhas e há overrides em campus.css. Studio Sans/Display/Hand e Arcade Display coexistem com Arial no hero; não presumir Sora/Space Grotesk. Há textos de apoio abaixo de 12px nas cinco superfícies.

Criar uma identidade expressiva e legível que sustente composições diferentes.

## Implementação

- [x] Consolidar tokens semânticos navy/azul/lima e apoios lavender/coral/teal; auditar contraste antes de adotar cores sugeridas.
- [x] Avaliar fontes Studio atuais frente à direção proposta; justificar display/interface sem trocar fontes apenas por preferência.
- [x] Definir escala fluida com clamp(), números tabulares, largura de leitura, espaçamentos, bordas e superfícies.
- [x] Aplicar a base em controles/cabeçalhos compartilhados, mantendo variantes reais e hierarquia entre cards.

## Critérios de aceite

- [x] Textos críticos sem compressão; títulos e ações distinguíveis.
- [x] Combinações de texto/superfície verificadas; estado usa texto/ícone além da cor.
- [x] Botões, inputs, badges e foco demonstrados numa superfície ativa em desktop/mobile.

## Validação deste ticket

Comparar baseline e resultado numa página ativa; conferir títulos longos, zoom de 200%, foco e contraste.

Aplicar a [validação comum](../VALIDACAO.md) na superfície alterada. Anexar captura antes/depois e gravação curta quando houver movimento. Informar viewport, dados utilizados, comandos executados e limitações. Não marcar validação planejada como executada.

## Limites e entrega

Executar este recorte e ajustes compartilhados indispensáveis. Preservar alterações locais e fluxos existentes. Não criar backend fictício, trocar stack ou entregar controles decorativos/dados inventados. Se faltar integração, entregar a parte independente com estado honesto; critérios dependentes continuam abertos.

Ao terminar, registrar arquivos alterados, comportamento, evidências e pendências. Atualizar status acima e checklist do índice somente conforme resultado comprovado.

## Entrega e evidências

Registro completo: [FE-01 — implementação e validação](../VALIDACAO-FE-01.md). Tokens em `app/globals.css`; aplicação compartilhada em `app/foundations.css`, importada por `app/layout.tsx`. As alterações locais anteriores foram preservadas. Não foram acrescentadas dependências nem alterados fluxos/dados.

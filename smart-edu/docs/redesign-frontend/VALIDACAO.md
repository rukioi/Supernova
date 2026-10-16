# Validação e evidências

Roteiro a executar durante a implementação. Nenhum teste de frontend foi executado pela criação deste backlog.

## Por ticket

Guardar evidências em `smart-edu/artifacts/redesign-frontend/FE-XX/` durante a implementação; não criar arquivos vazios para preencher a pasta.

| Verificação | Evidência esperada |
|---|---|
| Baseline/resultado | Mesma rota, viewport, estado e dados; capturas antes/depois |
| Movimento | Gravação com gatilho, resposta e destino; normal e reduzido |
| Funcionalidade | Ação e efeito comprovados no destino/estado; console verificado |
| Estados | Disponível, vazio, carregamento, erro, insuficiente e sem permissão quando aplicáveis |
| Teclado | Ordem, ativação, abas, Escape e retorno de foco conforme padrão |
| Mobile/tablet | Sem dependência de hover, cortes, sobreposição ou overflow da página |
| Dados | Origem, unidade, denominador e contexto; demo identificada |

Viewports: 1440×900, 1024×768 e 390×844. Conferir zoom de 200% nas áreas alteradas. Gráfico/tabela largo pode ter rolagem interna identificada e acessível; página não ganha scroll horizontal acidental.

## Integração por fase

- 01: home → checkpoint → preparação → retorno; conferir rascunho e primeira dobra.
- 02: buscar turma → contexto → abas → expandir aula → escolher sessão → retorno preservado.
- 03: global → turma → aula/sessão → objetivo/questão → aluno → retorno; IDs inválidos, insuficiência e permissão conforme infraestrutura existente.
- 04: filtrar biblioteca → detalhe → associação → planejamento; envio real quando existir; repetir fluxos anteriores.

## Checks técnicos

Executar em `smart-edu/`, com gerenciador/ambiente confirmados em FE-00:

```text
npm run lint
npx tsc --noEmit
npm run build
```

Não há scripts `test` ou `typecheck` no package.json consultado nesta organização. Confirmar antes de executar. TypeScript acima é comando direto dependente da configuração real.

Inspecionar compatibilidade, dependências e URLs antes de usar `scripts/audit-campus.mjs`, `scripts/run-campus-check.mjs` e verificações existentes de preview/controles. Não executar `implement-campus.mjs`, `refine-campus.mjs` ou `integrate-preview.mjs` como rotina: registram transformações históricas.

Confirmar que a porta corresponde ao Smart Edu antes de capturar. Usar Playwright se disponível; não presumir caminhos/pacotes de outra máquina. Se automação faltar, inspecionar manualmente no navegador e registrar alcance; não equivale a teste automatizado executado.

Testes novos devem proteger fluxos, cálculos e regressões relevantes: identidade, comparabilidade e drill-down. Evitar testes que apenas repetem classes CSS/valores da implementação. Lint/build completos ao fechar cada fase; ampliar checks quando mudança ou falha justificar.

## Registro durante execução

```text
Ticket/status:
Ambiente, comando de inicialização e URL:
Rotas, dados e viewports:
Mudança visual e comportamento demonstrado:
Capturas e gravações:
Checks/comandos executados + resultado:
Falhas, reprodução e regressão/problema preexistente:
Dependências externas e critérios ainda abertos:
```

Resultados: passou, falhou, não executado ou bloqueado. Não declarar pronto com ação falsa, fluxo crítico quebrado ou critério obrigatório pendente. Qualidade vem da direção criativa, não da quantidade de efeitos/arquivos.

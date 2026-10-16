# Design e experiência do Supernova

- [Redesign significativo do frontend — 20 tickets](redesign-frontend/README.md): direção integral, quatro fases, dependências e aceite funcional/visual.

- [Auditoria UX/UI](UX_UI_AUDIT.md): problemas, evidências, severidade e cobertura funcional.
- [Direção de arte](DESIGN_DIRECTION.md): identidade e decisões visuais.
- [Sistema de movimento](MOTION_SYSTEM.md): tokens, causalidade e acessibilidade.
- [Plano e validação](IMPLEMENTATION_PLAN.md): implementação, checks e limites.

Servidor local: http://127.0.0.1:3000. Evidências finais em `../artifacts/campus/after`; uso real do MCP Playwright em `../artifacts/campus/mcp`.

Para repetir os checks no mesmo ambiente: `node scripts/audit-campus.mjs after`, `node scripts/run-campus-check.mjs preview`, `node scripts/run-campus-check.mjs controls`. Os scripts de navegador apontam para a instalação local já existente do Playwright. Scripts `implement-campus.mjs`, `refine-campus.mjs` e `integrate-preview.mjs` registram alterações já aplicadas; não devem ser executados como rotina.

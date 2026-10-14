# Smart Edu: UI e movimento

Antes de implementar componentes visuais importantes, verifique os componentes existentes e pesquise referências. Consulte o MCP shadcn para primitives e padrões estruturais; consulte o MCP Motion para animação, transição, gestos e layout. Se um MCP estiver indisponível, informe e use documentação pública oficial. Considere Motion Primitives e referências open source, adaptadas ao design system existente.

Prefira CSS/Tailwind, depois Motion, SVG e componentes open source quando reduzirem código. Canvas só quando CSS/SVG não bastarem; WebGL/Three.js só com ganho visual necessário. Não adicione bibliotecas quando as dependências existentes resolverem. Não use Motion+, bibliotecas premium, Runway, geração paga de vídeo ou assets como requisito.

Movimento comunica estado, continuidade espacial, progresso, causa e efeito, sucesso ou contexto. Prefira transform, opacity, springs discretas e stagger curto. Use AnimatePresence somente quando necessário. Respeite prefers-reduced-motion. Evite animação longa, bounce excessivo, glow constante, parallax gratuito, partículas e movimento decorativo.

Preserve a linguagem: educação, estratégia, progressão, evidência e gamificação madura. Evite aparência de shadcn padrão, template SaaS, landing page ou playground. Pesquise composição, hierarquia, interação, timing e feedback; não copie referências cegamente.

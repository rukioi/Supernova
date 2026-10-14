# Smart Edu — decisões de implementação

- O workspace original contém prompt, documentação e referências, mas não contém aplicação, package.json, AGENTS.md ou a pasta docs citada no prompt. Nenhuma configuração existente foi substituída.
- Aplicação isolada em `smart-edu/`, usando React, TypeScript, Next/Vinext, Tailwind e os componentes Radix/shadcn disponíveis no starter. Identidade visual própria.
- Nome na interface: Smart Edu, conforme prompt; visão pedagógica: documentação Supernova.
- Dados de demonstração centralizados em `data/`; estado local explícito neste navegador. Sem backend, autenticação institucional, IA ou multiplayer reais.
- `Draft` representa a preparação da aula e sua experiência; `Session` representa uma aplicação. Aprovação do mapa e aprovação da experiência são gates diferentes.
- Alterar conteúdo invalida a aprovação. Publicar requer revisão e preview explícitos.
- O cenário de sessão usa eventos determinísticos. Pontuação de jogo permanece separada das evidências de aprendizagem.

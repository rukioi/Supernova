# Supernova — Smart Edu

Aplicação educacional para preparar aulas, organizar turmas e materiais, experimentar atividades gamificadas e acompanhar resultados. O MVP usa dados de demonstração e armazenamento local no navegador; não exige credenciais para explorar a interface.

## Como rodar

Requisitos: Node.js 22.13 ou superior, npm e Git.

```sh
git clone https://github.com/rukioi/Supernova.git
cd Supernova/smart-edu
npm ci
npm run dev
```

Abra http://localhost:5173. Para escolher outra porta:

```sh
npm run dev -- --port 3000
```

## Verificação e build

Execute dentro de `smart-edu/`:

```sh
npx tsc --noEmit
npm run lint
npm run build
npm start
```

`npm start` abre a versão compilada com Wrangler local; use o endereço impresso no terminal. O build utiliza Vinext/Vite e gera `dist/`. A pasta `build/` contém código de integração e deve permanecer versionada.

## Organização

- `smart-edu/`: aplicação React e TypeScript, com roteamento compatível com Next.js e execução Vinext/Vite.
- `smart-edu/app/`, `components/`, `data/`, `lib/`: páginas, interface, modelos e lógica.
- `smart-edu/public/`: imagens, fontes e SVGs usados pela aplicação; mascotes em `mascots/` e atividades em `experiences/`.
- `smart-edu/docs/`: decisões, design, auditorias e documentação técnica. `STARTER.md` preserva a documentação original da infraestrutura.
- `smart-edu/scripts/`: execução e verificações. Alguns scripts de auditoria dependem de caminhos locais do Playwright; scripts de implementação registram alterações históricas e não devem ser executados para iniciar o app.
- `docs/`: documentação geral do produto.
- `prompts/`: prompts de criação, melhoria e refatoração, preservados em seus arquivos originais.
- `referencias/`: referências visuais completas e documentação das fontes.
- `referencias/imagens-originais/`: imagens originais, incluindo as versões PNG dos mascotes e das atividades.

Dependências, builds, logs, evidências locais de navegador, configurações de ferramentas e segredos são ignorados pelo Git. O lockfile é versionado para instalações reproduzíveis.

As referências de terceiros são preservadas para consulta; atribuições existentes permanecem nos arquivos de referência e em `smart-edu/public/lofty/README.md`.

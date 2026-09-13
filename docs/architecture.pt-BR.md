# Arquitetura

Como o código é organizado e por quê.

## Estrutura

```text
src/
├── app/                    rotas finas, só compõem features
│   ├── layout.tsx          layout raiz: casco HTML, Header, Footer
│   ├── page.tsx            página inicial
│   ├── not-found.tsx       página 404, também resolve deep links do app
│   └── privacy-policy/
│
├── features/               um diretório por feature
│   ├── about/
│   ├── community/
│   ├── contribution/
│   ├── faq/
│   ├── features-showcase/
│   ├── hero/
│   ├── layout/             header, menu do header, footer
│   ├── learning-path/
│   ├── legal/              conteúdo da política de privacidade
│   ├── official-resources/
│   ├── screenshots/        carrossel e visualizador de imagens
│   └── theme-customization/
│
└── shared/                 código sem feature própria
    ├── components/         link-button, github-button, play-store-button
    │   └── ui/             primitivas shadcn (button, accordion, breadcrumb)
    ├── lib/                cn (mesclagem de classes), site (URLs externas)
    └── motion/              variantes do framer-motion usadas entre features
```

Cada feature mantém só as camadas que realmente precisa:

```text
features/<nome>/
├── components/       a UI da feature
├── data/              conteúdo estático (só quando a feature tem algum)
├── <nome>.types.ts   os tipos próprios da feature (só quando tem algum)
└── index.ts           a API pública da feature
```

## Regras de dependência

- Imports só vão pra baixo: `app` → `features` → `shared`.
- `shared/` nunca importa de `features/`.
- `app/` e uma feature só podem alcançar outra feature pelo seu barril
  `index.ts`, nunca um arquivo interno dela. Os próprios arquivos internos
  de uma feature estão liberados pra ela mesma.
- Arquivos em kebab-case, componentes em PascalCase.

O `import/no-restricted-paths` do `eslint.config.mjs` é o que de fato
garante essas regras: `pnpm lint` falha num import que cruza a fronteira,
então este documento não corre o risco de descolar do que é realmente
permitido, como aconteceria com uma convenção só de comentário.

## Exceções

Nenhuma no momento. Todo import entre features passa por um barril.

## Renderização

- `app/page.tsx` e `app/layout.tsx` são Server Components: só compõem
  componentes de feature, sem hook ou estado próprio.
- A maioria dos componentes de feature são Client Components
  (`"use client"`), já que quase toda seção anima com
  `framer-motion`/`motion`. Converter uma seção pra Server Component
  significaria abandonar sua animação, o que está fora do escopo das
  etapas de reestruturação (rastreado separadamente, junto com o resto do
  trabalho de animação).
- O site inteiro é estático: toda rota é pré-renderizada em tempo de
  build (`next build`), sem renderização de servidor por requisição e sem
  dado dinâmico.

## Decisões

- **Por que SSG.** O site não tem conta de usuário, conteúdo por
  visitante nem dado que muda entre requisições: um catálogo de
  conteúdo, screenshots, uma FAQ, uma política de privacidade. Não há
  nada pra renderizar por requisição, então pré-renderizar toda rota em
  tempo de build torna cada uma um arquivo estático, cacheável na borda,
  sem o custo de uma renderização de servidor que ninguém precisa.
- **Por que feature-first.** O site é uma única página longa feita de
  seções claramente separadas (hero, screenshots, FAQ, ...), cada uma com
  sua própria copy, variantes de animação e, em alguns casos, seu próprio
  dado. Agrupar por feature mantém tudo que uma seção precisa num só
  lugar, em vez de espalhar entre árvores paralelas de `components/`,
  `constants/` e `@types/` como o projeto fazia antes desta
  reestruturação — a estrutura que este documento descreve substituiu
  aquilo.

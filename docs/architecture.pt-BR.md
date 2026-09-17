# Arquitetura

Como o código é organizado e por quê.

## Estrutura

```text
src/
├── app/
│   ├── [locale]/            o site de verdade, roteado por idioma
│   │   ├── layout.tsx       casco HTML, Header, Footer, NextIntlClientProvider
│   │   ├── page.tsx         página inicial
│   │   ├── not-found.tsx    página 404
│   │   ├── opengraph-image.tsx
│   │   └── privacy-policy/
│   ├── (deep-links)/        layout raiz só em inglês, independente de idioma
│   │   ├── layout.tsx       seu próprio casco HTML (nunca com prefixo de idioma)
│   │   ├── widgets/[...slug]/
│   │   ├── packages/[...slug]/
│   │   ├── functions/[...slug]/
│   │   ├── elements/[...slug]/
│   │   └── uis/[...slug]/
│   ├── manifest.ts, robots.ts, sitemap.ts
│   └── globals.css
│
├── features/                 um diretório por feature
│   ├── about/
│   ├── catalog/
│   ├── contribution/
│   ├── deep-links/            a página "abrindo no app"
│   ├── faq/
│   ├── features-showcase/
│   ├── hero/
│   ├── languages/
│   ├── layout/                header, menu do header, footer
│   ├── learning-path/
│   ├── legal/                  conteúdo da política de privacidade
│   ├── official-resources/
│   ├── quality/
│   ├── screenshots/             carrossel e visualizador de imagens
│   ├── share/
│   ├── theme-customization/
│   └── whats-new/
│
├── i18n/                      fiação do next-intl: roteamento, navegação, config de requisição
│
└── shared/                    código sem feature própria
    ├── components/             link-button, github-button, play-store-button
    │   └── ui/                 primitivas shadcn (button, accordion, breadcrumb)
    ├── lib/                    cn (mesclagem de classes), site (URLs externas), locale-alternates
    └── motion/                 variantes do motion (antes framer-motion) usadas entre features

messages/                    um arquivo JSON por idioma (en, pt-BR, es)
middleware.ts                middleware de detecção/redirecionamento de idioma do next-intl
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

## Roteamento por idioma

O site é servido em três idiomas via `next-intl`: inglês (`en`, sem
prefixo, o padrão), `pt-BR` e `es` (ambos prefixados, ex.:
`/pt-BR/privacy-policy`). `middleware.ts` e `src/i18n/routing.ts` definem
isso; `src/app/[locale]/` guarda toda rota localizada, com seu próprio
layout raiz que lê `params.locale` e renderiza `<html lang={locale}>`.

**As rotas invariantes ficam de propósito fora de `[locale]`.** Os deep
links do app (`/widgets/[...slug]`, `/packages/[...slug]`,
`/functions/[...slug]`, `/elements/[...slug]`, `/uis/[...slug]`) e os dois
arquivos estáticos em `public/` (`.well-known/assetlinks.json`,
`app-ads.txt`) precisam resolver exatamente nessas URLs, sem prefixo de
idioma, porque são referenciados pelo app Android e pela verificação de
asset-links do Google Play — uma URL que mudasse pra `/en/...` quebraria
os dois. As rotas de deep link vivem no próprio grupo de rotas
`(deep-links)`, com um layout raiz só em inglês
(`src/app/(deep-links)/layout.tsx`); um grupo de rotas não afeta o
caminho da URL, mas permite que essa subárvore tenha um casco
`<html>`/`<body>` e um contexto de tradução completamente independentes
do `[locale]`. Os dois arquivos estáticos em `public/` não são afetados
por nada disso, já que o matcher do `middleware.ts` os exclui
diretamente.

## Renderização

- `app/[locale]/page.tsx` e `app/[locale]/layout.tsx` são Server
  Components: só compõem componentes de feature, sem hook ou estado
  próprio.
- A maioria dos componentes de feature são Client Components
  (`"use client"`), já que quase toda seção anima com `motion`. Converter
  uma seção pra Server Component significaria abandonar sua animação, o
  que está fora do escopo das etapas de reestruturação (rastreado
  separadamente, junto com o resto do trabalho de animação).
- A página inicial e a política de privacidade são estáticas:
  pré-renderizadas em tempo de build pra cada idioma
  (`generateStaticParams`), sem renderização de servidor por requisição.
  As cinco rotas de deep link são a exceção — são renderizadas no
  servidor sob demanda (`ƒ` no resumo de rotas do `next build`), já que o
  slug do catálogo na URL é conteúdo arbitrário compartilhado por
  usuários e não dá pra enumerar de antemão.

## Decisões

- **Por que SSG pra página inicial e política de privacidade.** Nenhuma
  das duas tem conta de usuário, conteúdo por visitante ou dado que muda
  entre requisições: um catálogo de conteúdo, screenshots, uma FAQ, uma
  política de privacidade. Não há nada pra renderizar por requisição,
  então pré-renderizar torna cada uma um arquivo estático, cacheável na
  borda, sem o custo de uma renderização de servidor que ninguém precisa.
- **Por que as rotas de deep link são a única exceção dinâmica.** Cada
  rota resolve um slug arbitrário do catálogo compartilhado pelo app
  (ex.: `/widgets/algum-widget`) numa página redirecionadora "abrir no
  app". O conjunto de slugs possíveis não é conhecido em tempo de build e
  cresce conforme o catálogo do app cresce, então não dá pra enumerar
  estaticamente como o resto do site.
- **Por que feature-first.** O site é uma única página longa feita de
  seções claramente separadas (hero, screenshots, FAQ, ...), cada uma com
  sua própria copy, variantes de animação e, em alguns casos, seu próprio
  dado. Agrupar por feature mantém tudo que uma seção precisa num só
  lugar, em vez de espalhar entre árvores paralelas de `components/`,
  `constants/` e `@types/` como o projeto fazia antes desta
  reestruturação — a estrutura que este documento descreve substituiu
  aquilo.

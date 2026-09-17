# Testes

## O que realmente merece um teste aqui

Cobertura é um piso, não uma meta. Veja os pisos e o porquê deles em
`vitest.config.mts`. O que importa mais que o número é _o quê_ testar:

- **Lógica de verdade**: um cálculo, um branch, um pedaço de estado que
  pode dar errado. O casamento de categoria do `resolveAppDeepLink`, o
  estado aberto/fechado do menu do header, o abrir/fechar do accordion da
  FAQ — todos merecem um teste.
- **Interação real do usuário**: clicar em algo, esperar um resultado
  específico. Os testes de componente aqui renderizam o componente de
  verdade e interagem com ele por meio de queries da Testing Library
  (`getByRole`, `getByText`), não acessando os internos.
- **Alvos de link**: todo botão ou link que aponta pra algum lugar
  externo (GitHub, Play Store, portfólio do autor) merece uma verificação
  — é exatamente o tipo de coisa que um erro de copiar e colar quebra
  silenciosamente.

Toda seção "estática" (`catalog-section.tsx`, `languages-section.tsx`,
`share-section.tsx`, `whats-new-section.tsx`, `quality-section.tsx`,
`learning-path-section.tsx`, `theme-customization-content.tsx`,
`theme-customization-section.tsx`, `contribution-section.tsx`,
`official-resources-section.tsx`, `features-section.tsx`,
`about-me-section.tsx`, `screenshots-section.tsx`, `hero-section.tsx` e
`privacy-policy-content.tsx`) tem seu próprio teste agora: o título
traduzido renderiza, cada card/link vindo de dado está presente, e os
links externos apontam pro lugar certo. Até "markup fixo sem branch"
merece uma verificação de renderização — é exatamente o tipo de arquivo
que um copiar-colar errado ou uma chave de tradução faltando quebra
silenciosamente, sem nada no `pnpm lint` ou `tsc` pra pegar.

O que deliberadamente **não** é perseguido, e fica excluído da cobertura
em `vitest.config.mts`:

- **Dado puro e objetos de variante**: `shared/motion/**`, os arrays
  estáticos em `features/*/data/*.ts` (exceto `faqs.ts`, exercitado
  indiretamente via `faq-section.test.tsx`), e
  `theme-customization/lib/code-snippet.ts`, e
  `whats-new/data/releases.ts`. Nada pra ramificar.
- **Primitivas shadcn/Radix** (`shared/components/ui/**`): só
  estilização, sem lógica nossa.
- **`app/[locale]/page.tsx` e `app/[locale]/privacy-policy/page.tsx`**:
  composição pura de componentes de feature já testados, sem lógica
  própria. Cobertos de verdade pelo `e2e/smoke.spec.ts` em vez disso.

## Gap conhecido, não exclusão

Este continua contando contra o piso de cobertura, de propósito, pra
consertá-lo aumentar o número em vez de ser esquecido silenciosamente:

- **`onDotButtonClick` em `screenshots-carousel.tsx`**: nunca vê um
  `emblaApi` verdadeiro sob jsdom, já que o embla nunca inicializa de
  verdade sem larguras de slide reais (veja "Dublês de teste" abaixo) —
  clicar num botão de dot no teste de componente sempre cai no branch de
  retorno antecipado. O comportamento real de navegar ao clicar é coberto
  por `e2e/navigation.spec.ts`.

## Dublês de teste

- **Gaps do jsdom são reais e merecem um comentário, não um gambiarra.**
  `IntersectionObserver`, `ResizeObserver` e `matchMedia` simplesmente não
  existem no jsdom; veja os polyfills em `vitest.setup.ts` — o
  `whileInView` do `framer-motion` precisa do primeiro, o
  `embla-carousel` precisa dos outros dois.
- **A propagação de stagger do Framer Motion nem sempre resolve no
  jsdom**, mesmo com o `IntersectionObserver` com polyfill (veja o
  comentário em `faq-section.test.tsx`): um item aninhado sob um pai
  `whileInView` pode ficar preso na sua variante `hidden`. Verifique
  `toBeInTheDocument()`/atributos de estado ali em vez de
  `toBeVisible()`, e deixe a checagem visual de verdade pro e2e.
- **O embla-carousel precisa de layout de verdade** (larguras de slide,
  entradas de `ResizeObserver` com dimensões reais) pra decidir até onde
  consegue rolar, o que o jsdom não consegue fornecer. Navegação de
  verdade é só e2e (`e2e/navigation.spec.ts`); o teste de componente só
  verifica o estado inicial e as partes que não dependem de layout medido
  (o visualizador de imagem abrindo e fechando).
- **`onLoad`/`onError` do `next/image` não chegam no componente via
  `fireEvent.load`/`fireEvent.error`**: internamente ele chama
  `img.decode()`, que o jsdom não implementa, então o wrapper que
  chamaria o handler de verdade nunca roda. `image-viewer.test.tsx` e
  `screenshot-thumbnail.test.tsx` mockam o `next/image` pra uma `<img>`
  simples, pra que as props passem pelo sistema de eventos normal do
  React.
- **`getTranslations` de `next-intl/server` lança erro sob jsdom**
  ("not supported in Client Components"), já que lê um contexto restrito
  à requisição que só existe durante uma renderização de servidor de
  verdade do Next.js. Pra testar um Server Component assíncrono que o
  chama diretamente (não com um argumento explícito `{ locale,
namespace }`, que funciona isolado), mocke `next-intl/server` com
  `createTranslator` do `next-intl` — a primitiva client-safe que o
  `getTranslations` usa por baixo dos panos. Veja
  `privacy-policy-content.test.tsx`.

## Instabilidades conhecidas no e2e

- **`e2e/a11y.spec.ts` relatava intermitentemente uma violação de
  `color-contrast` no header/hero**, mais comum sob execução
  `fullyParallel`, mas não só nela — também reproduzia isolado, só que com
  menos frequência. Causa raiz: a animação de entrada do header anima a
  opacidade via WAAPI do Framer Motion, e `MotionConfig
reducedMotion="user"` (`motion-provider.tsx`) neutraliza só animações de
  transform/layout por design da própria lib, não de opacidade — então o
  axe podia capturar uma cor interpolada no meio do fade como falha de
  contraste, mesmo com `reducedMotion: "reduce"` no teste. Corrigido
  esperando o header chegar a `opacity: 1` antes de rodar
  `axe.analyze()`, em vez de mexer na animação em si.

## Rodando as suítes

```bash
pnpm test              # Vitest em modo watch
pnpm run test:run       # Vitest uma vez
pnpm run test:coverage  # Vitest uma vez, com os pisos de cobertura garantidos
pnpm run test:e2e       # Playwright, contra um app já buildado
```

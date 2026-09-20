# Testes

## Cobertura é um piso, não uma meta

Os pisos em `vitest.config.mts` são o medido menos uma margem pequena
(medido era 99.11/99.06/98.63/100 em 2026-09-20, pisos ajustados pra
97/97/97/99), não uma meta pra escrever teste em direção a ela. Suba-os
sempre que uma mudança melhorar o agregado de forma mensurável; baixar um
piso precisa de um motivo na mensagem do commit. O que importa mais que o
número é _o quê_ testar:

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

Todo componente de seção (`features/*/components/*-section.tsx` e
`*-content.tsx`) tem seu próprio teste: o título traduzido renderiza,
cada card/link vindo de dado está presente, e os links externos apontam
pro lugar certo. Até "markup fixo sem branch" merece uma verificação de
renderização — é exatamente o tipo de arquivo que um copiar-colar errado
ou uma chave de tradução faltando quebra silenciosamente, sem nada no
`pnpm lint` ou `tsc` pra pegar.

O que deliberadamente **não** é perseguido, e fica excluído da cobertura
em `vitest.config.mts`:

- **Dado puro**: os arrays estáticos em `features/*/data/**` e o código
  de exemplo em `examples/lib/code-snippet.ts`. Nada pra ramificar.
- **Primitivas shadcn/Radix** (`shared/components/ui/**`): só
  estilização, sem lógica nossa.
- **`app/[locale]/page.tsx` e `app/[locale]/privacy-policy/page.tsx`**:
  composição pura de componentes de feature já testados, sem lógica
  própria. Cobertos de verdade pelo `e2e/smoke.spec.ts` em vez disso.
- **Configuração declarativa sem branch nosso** (`i18n/routing.ts`,
  `i18n/navigation.ts`, `proxy.ts`, `shared/lib/fonts.ts`) e
  **convenções de rota geradas** (`app/manifest.ts`, `app/robots.ts`,
  `app/[locale]/opengraph-image.tsx`). O `i18n/request.ts` parece igual
  mas não é: ele escolhe um idioma de reserva, que é um branch de
  verdade, então é testado direto (veja "Dublês de teste" abaixo) em vez
  de excluído.

Um arquivo que só exporta constantes (`shared/lib/site.ts`,
`shared/lib/catalog-stats.ts`) não precisa de entrada de exclusão nem de
teste próprio: as únicas "declarações" dele (incluindo um `.reduce` sobre
um array literal) rodam no momento em que qualquer coisa importa o
módulo, então ele já aparece com 100% assim que um teste o toca. O
`catalog-stats.ts` carregava uma entrada de exclusão que nunca precisou.

## Gap conhecido, não exclusão

Este continua contando contra o piso de cobertura, de propósito, pra
consertá-lo aumentar o número em vez de ser esquecido silenciosamente:

- **`onDotButtonClick` em `screenshots-carousel.tsx`**: nunca vê um
  `emblaApi` verdadeiro sob jsdom, já que o embla nunca inicializa de
  verdade sem larguras de slide reais (veja "Dublês de teste" abaixo) —
  clicar num botão de dot no teste de componente sempre cai no branch de
  retorno antecipado. O comportamento real de navegar ao clicar é coberto
  por `e2e/navigation.spec.ts`.

## Instabilidades conhecidas na cobertura

- **A porcentagem de branch do `count-up.tsx` varia em cerca de um
  branch entre execuções idênticas** (99.06% numa, 98.6% na outra). O
  teste "lands on the final value once the animation ends" dispara um
  loop de `requestAnimationFrame` de verdade com 50ms de duração; se ele
  termina em um tick ou em vários depende da velocidade da máquina
  rodando o teste, o que vira o branch `if (progress < 1) frame =
requestAnimationFrame(tick)`. A margem entre o agregado medido e o
  piso de `branches` absorve isso; simular os timers pra fixar esse
  branch não compensa pela indireção extra por causa de um branch só.

## Dublês de teste

- **Gaps do jsdom são reais e merecem um comentário, não um gambiarra.**
  `IntersectionObserver`, `ResizeObserver` e `matchMedia` simplesmente não
  existem no jsdom; veja os polyfills em `vitest.setup.ts` — o
  `embla-carousel` precisa deles. Também não há App Router, então o
  `vitest.setup.ts` fixa o `usePathname()` do `next/navigation` em `/`
  pro seletor de idioma do footer.
- **O embla-carousel precisa de layout de verdade** (larguras de slide,
  entradas de `ResizeObserver` com dimensões reais) pra decidir até onde
  consegue rolar, o que o jsdom não consegue fornecer. Navegação de
  verdade é só e2e (`e2e/navigation.spec.ts`); o teste de componente só
  verifica o estado inicial e as partes que não dependem de layout medido
  (o visualizador de imagem abrindo e fechando).
- **`onLoad`/`onError` do `next/image` não chegam no componente via
  `fireEvent.load`/`fireEvent.error`**: internamente ele chama
  `img.decode()`, que o jsdom não implementa, então o wrapper que
  chamaria o handler de verdade nunca roda. `image-viewer.test.tsx` mocka o `next/image` pra uma `<img>`
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
  contraste, mesmo com `reducedMotion: "reduce"` no teste. O redesign
  removeu o Motion de vez (toda animação agora é CSS, e a regra global de
  `prefers-reduced-motion` no `globals.css` cancela todas), então a causa
  sumiu junto com a espera por `opacity: 1` que a contornava.

## Rodando as suítes

```bash
pnpm test              # Vitest em modo watch
pnpm run test:run       # Vitest uma vez
pnpm run test:coverage  # Vitest uma vez, com os pisos de cobertura garantidos
pnpm run test:e2e       # Playwright, contra um app já buildado
```

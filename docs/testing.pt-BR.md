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

O que deliberadamente **não** é perseguido, e fica excluído da cobertura
em `vitest.config.mts`:

- **Seções estáticas sem branch**: `catalog-section.tsx`,
  `languages-section.tsx`,
  `learning-path-section.tsx`,
  `theme-customization-content.tsx`, `contribution-section.tsx`,
  `official-resources-section.tsx`, `features-section.tsx`,
  `about-me-section.tsx`, `screenshots-section.tsx` (o wrapper) e
  `privacy-policy-content.tsx`.
  Markup fixo sem props e sem renderização condicional — não há lógica
  pra dar errado.
- **`theme-customization-section.tsx`**: um Server Component assíncrono
  que chama o Shiki em tempo de build. Sem equivalente em jsdom pra
  renderizá-lo; a chamada ao Shiki é coberta por `highlight-code.test.ts`
  e a saída é coberta por `theme-code-card.test.tsx`.
- **Dado puro e objetos de variante**: `shared/motion/**`, os arrays
  estáticos em `features/*/data/*.ts` (exceto `faqs.ts`, exercitado
  indiretamente via `faq-section.test.tsx`), e
  `theme-customization/lib/code-snippet.ts`. Nada pra ramificar.
- **Primitivas shadcn/Radix** (`shared/components/ui/**`): só
  estilização, sem lógica nossa.
- **`app/page.tsx` e `app/privacy-policy/page.tsx`**: composição pura de
  componentes de feature já testados, sem lógica própria. Cobertos de
  verdade pelo `e2e/smoke.spec.ts` em vez disso.

## Gaps conhecidos, não exclusões

Estes continuam contando contra o piso de cobertura, de propósito, pra
consertá-los aumentar o número em vez de serem esquecidos silenciosamente:

- **`hero-section.tsx`**: ainda sem teste unitário dedicado; sua animação
  de entrada e os fundos de blob são cobertos indiretamente por
  `e2e/no-js.spec.ts` e `e2e/reduced-motion.spec.ts`.
- **Alguns branches em `image-viewer.tsx` e `screenshots-carousel.tsx`**:
  estados de erro e casos extremos ainda não cobertos.

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

## Rodando as suítes

```bash
pnpm test              # Vitest em modo watch
pnpm run test:run       # Vitest uma vez
pnpm run test:coverage  # Vitest uma vez, com os pisos de cobertura garantidos
pnpm run test:e2e       # Playwright, contra um app já buildado
```

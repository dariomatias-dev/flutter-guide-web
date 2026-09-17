# Arquitectura

Cómo está organizado el código y por qué.

## Estructura

```text
src/
├── app/
│   ├── [locale]/            el sitio real, enrutado por idioma
│   │   ├── layout.tsx       cascarón HTML, Header, Footer, NextIntlClientProvider
│   │   ├── page.tsx         página de inicio
│   │   ├── not-found.tsx    página 404
│   │   ├── opengraph-image.tsx
│   │   └── privacy-policy/
│   ├── (deep-links)/        layout raíz solo en inglés, independiente del idioma
│   │   ├── layout.tsx       su propio cascarón HTML (nunca con prefijo de idioma)
│   │   ├── widgets/[...slug]/
│   │   ├── packages/[...slug]/
│   │   ├── functions/[...slug]/
│   │   ├── elements/[...slug]/
│   │   └── uis/[...slug]/
│   ├── manifest.ts, robots.ts, sitemap.ts
│   └── globals.css
│
├── features/                 un directorio por feature
│   ├── about/
│   ├── catalog/
│   ├── contribution/
│   ├── deep-links/            la página "abriendo en la app"
│   ├── faq/
│   ├── features-showcase/
│   ├── hero/
│   ├── languages/
│   ├── layout/                header, menú del header, footer
│   ├── learning-path/
│   ├── legal/                  contenido de la política de privacidad
│   ├── official-resources/
│   ├── quality/
│   ├── screenshots/             carrusel y visor de imágenes
│   ├── share/
│   ├── theme-customization/
│   └── whats-new/
│
├── i18n/                      cableado de next-intl: enrutamiento, navegación, config de solicitud
│
└── shared/                    código sin feature propia
    ├── components/             link-button, github-button, play-store-button
    │   └── ui/                 primitivas shadcn (button, accordion, breadcrumb)
    ├── lib/                    cn (fusión de clases), site (URLs externas), locale-alternates
    └── motion/                 variantes de motion (antes framer-motion) usadas entre features

messages/                    un archivo JSON por idioma (en, pt-BR, es)
middleware.ts                middleware de detección/redirección de idioma de next-intl
```

Cada feature mantiene solo las capas que realmente necesita:

```text
features/<nombre>/
├── components/       la UI de la feature
├── data/              contenido estático (solo cuando la feature tiene alguno)
├── <nombre>.types.ts   los tipos propios de la feature (solo cuando tiene alguno)
└── index.ts            la API pública de la feature
```

## Reglas de dependencia

- Los imports solo van hacia abajo: `app` → `features` → `shared`.
- `shared/` nunca importa de `features/`.
- `app/` y una feature solo pueden alcanzar otra feature a través de su
  barril `index.ts`, nunca un archivo interno de ella. Los propios
  archivos internos de una feature están permitidos para ella misma.
- Archivos en kebab-case, componentes en PascalCase.

El `import/no-restricted-paths` de `eslint.config.mjs` es lo que
realmente hace cumplir estas reglas: `pnpm lint` falla ante un import que
cruza el límite, así que este documento no corre el riesgo de
desactualizarse respecto a lo que realmente está permitido, como sí
podría pasar con una convención que solo existiera en un comentario.

## Excepciones

Ninguna por ahora. Todo import entre features pasa por un barril.

## Enrutamiento por idioma

El sitio se sirve en tres idiomas mediante `next-intl`: inglés (`en`, sin
prefijo, el predeterminado), `pt-BR` y `es` (ambos con prefijo, p. ej.
`/pt-BR/privacy-policy`). `middleware.ts` y `src/i18n/routing.ts` definen
esto; `src/app/[locale]/` contiene toda ruta localizada, con su propio
layout raíz que lee `params.locale` y renderiza `<html lang={locale}>`.

**Las rutas invariantes quedan fuera de `[locale]` a propósito.** Los
deep links de la app (`/widgets/[...slug]`, `/packages/[...slug]`,
`/functions/[...slug]`, `/elements/[...slug]`, `/uis/[...slug]`) y los
dos archivos estáticos bajo `public/` (`.well-known/assetlinks.json`,
`app-ads.txt`) deben resolverse exactamente en esas URLs, sin prefijo de
idioma, porque la app Android y la verificación de asset-links de Google
Play los referencian directamente — una URL que cambiara a `/en/...`
rompería ambas cosas. Las rutas de deep link viven en su propio grupo de
rutas `(deep-links)`, con un layout raíz solo en inglés
(`src/app/(deep-links)/layout.tsx`); un grupo de rutas no afecta la ruta
de la URL, pero permite que ese subárbol tenga un cascarón
`<html>`/`<body>` y un contexto de traducción completamente
independientes de `[locale]`. Los dos archivos estáticos bajo `public/`
no se ven afectados por nada de esto, ya que el matcher de
`middleware.ts` los excluye directamente.

## Renderizado

- `app/[locale]/page.tsx` y `app/[locale]/layout.tsx` son Server
  Components: solo componen componentes de feature, sin hooks ni estado
  propio.
- La mayoría de los componentes de feature son Client Components
  (`"use client"`), ya que casi toda sección anima con `motion`.
  Convertir una sección a Server Component significaría abandonar su
  animación, lo cual está fuera del alcance de los pasos de
  reestructuración (rastreado por separado, junto con el resto del
  trabajo de animación).
- La página de inicio y la política de privacidad son estáticas:
  pre-renderizadas en tiempo de build para cada idioma
  (`generateStaticParams`), sin renderizado de servidor por solicitud.
  Las cinco rutas de deep link son la excepción — se renderizan en el
  servidor bajo demanda (`ƒ` en el resumen de rutas de `next build`), ya
  que el slug del catálogo en la URL es contenido arbitrario compartido
  por usuarios y no se puede enumerar de antemano.

## Decisiones

- **Por qué SSG para la página de inicio y la política de privacidad.**
  Ninguna de las dos tiene cuentas de usuario, contenido por visitante ni
  datos que cambien entre solicitudes: un catálogo de contenido, capturas
  de pantalla, una FAQ, una política de privacidad. No hay nada que
  renderizar por solicitud, así que pre-renderizar convierte a cada una
  en un archivo estático, cacheable en el borde, sin el costo de un
  renderizado de servidor que nadie necesita.
- **Por qué las rutas de deep link son la única excepción dinámica.**
  Cada ruta resuelve un slug arbitrario del catálogo compartido desde la
  app (p. ej. `/widgets/algun-widget`) en una página redirectora "abrir
  en la app". El conjunto de slugs posibles no se conoce en tiempo de
  build y crece conforme crece el catálogo de la app, así que no se
  puede enumerar estáticamente como el resto del sitio.
- **Por qué feature-first.** El sitio es una única página larga hecha de
  secciones claramente separadas (hero, capturas de pantalla, FAQ, ...),
  cada una con su propio copy, variantes de animación y, en algunos
  casos, sus propios datos. Agrupar por feature mantiene todo lo que una
  sección necesita en un solo lugar, en vez de repartirlo entre árboles
  paralelos de `components/`, `constants/` y `@types/` como hacía el
  proyecto antes de esta reestructuración: la estructura que describe
  este documento reemplazó eso.

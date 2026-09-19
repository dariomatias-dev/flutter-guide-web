# Arquitectura

Cómo está organizado el código y por qué.

## Estructura

```text
src/
├── app/
│   ├── [locale]/             el sitio real, enrutado por idioma
│   │   ├── layout.tsx       cascarón HTML, Header, Footer, NextIntlClientProvider
│   │   ├── page.tsx         página de inicio
│   │   ├── not-found.tsx    página 404
│   │   ├── opengraph-image.tsx
│   │   └── privacy-policy/
│   ├── (deep-links)/         layout raíz solo en inglés, independiente del idioma
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
│   ├── catalog/              el bento del catálogo y la franja de paquetes de pub.dev
│   ├── changelog/            notas de versión obtenidas del CHANGELOG.md de la app, la página /changelog y el adelanto "Novedades" de la home
│   ├── deep-links/           la página "abriendo en la app"
│   ├── download-cta/         la franja final "obtén la app"
│   ├── examples/             ventana de código + vista previa, resaltado con shiki en build
│   ├── faq/
│   ├── features-showcase/    grilla de funciones y tarjeta del autor
│   ├── hero/
│   ├── layout/               header, menú del header, footer, selector de idioma
│   ├── legal/                contenido de la política de privacidad
│   ├── open-source/          métricas de calidad e invitación a contribuir
│   ├── screenshots/          carrusel y visor de imágenes
│   └── share/
│
├── i18n/                      cableado de next-intl: enrutamiento, navegación, config de solicitud
│
└── shared/                    código sin feature propia
    ├── components/             logo, section-heading, phone-frame, botones, íconos de marca
    │   └── ui/                 primitivas shadcn (accordion, breadcrumb, dialog)
    └── lib/                    cn (fusión de clases), site (URLs externas), locale-alternates

messages/                    un archivo JSON por idioma (en, pt-BR, es)
src/proxy.ts                 proxy de detección/redirección de idioma de next-intl (el middleware de Next 16)
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

El sitio se sirve en tres idiomas mediante `next-intl`: inglés (`en`,
sin prefijo, el predeterminado), `pt-BR` y `es` (ambos con prefijo,
p. ej. `/pt-BR/privacy-policy`). La detección de idioma está
desactivada (`localeDetection: false`), así que `/` siempre sirve inglés
y el idioma solo cambia cuando la persona elige uno. `src/proxy.ts` y `src/i18n/routing.ts` definen
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
`src/proxy.ts` los excluye directamente.

## Renderizado

- `app/[locale]/page.tsx` y `app/[locale]/layout.tsx` son Server
  Components: solo componen componentes de feature, sin hooks ni estado
  propio.
- Los componentes de sección son Server Components siempre que no
  tengan estado propio; solo el header, el selector de idioma, el
  carrusel de capturas, el acordeón del FAQ, los contadores animados y
  la página de deep link llegan al cliente. La aparición al hacer scroll
  es un pequeño componente de cliente (`RevealObserver`) que agrega
  `.is-visible` a los elementos `.reveal`; el estado oculto inicial solo
  depende de `@media (scripting: enabled)`, así que el contenido sigue
  visible sin JavaScript o con movimiento reducido.
- La política de privacidad es estática: pre-renderizada en tiempo de
  build para cada idioma (`generateStaticParams`). La página de inicio y
  `/changelog` también se pre-renderizan, y luego se regeneran en segundo
  plano como máximo una vez por hora (regeneración estática incremental),
  porque muestran datos de versiones obtenidos del `CHANGELOG.md` de la
  app en GitHub. Las cinco rutas de deep link son la excepción — se
  renderizan en el servidor bajo demanda (`ƒ` en el resumen de rutas de
  `next build`), ya que el slug del catálogo en la URL es contenido
  arbitrario compartido por usuarios y no se puede enumerar de antemano.

## Decisiones

- **Por qué SSG para la página de inicio y la política de privacidad.**
  Ninguna de las dos tiene cuentas de usuario, contenido por visitante ni
  datos que cambien entre solicitudes: un catálogo de contenido, capturas
  de pantalla, una FAQ, una política de privacidad. No hay nada que
  renderizar por solicitud, así que pre-renderizar convierte a cada una
  en un archivo estático, cacheable en el borde, sin el costo de un
  renderizado de servidor que nadie necesita.
- **Por qué el changelog se obtiene y no se copia.** El `CHANGELOG.md`
  de la app (formato Keep a Changelog) es la única fuente de verdad de las
  versiones. Obtenerlo y parsearlo (`features/changelog`) hace que una
  versión nueva aparezca en el sitio en menos de una hora, sin deploy y
  sin copia que mantener sincronizada. Se mantiene en inglés, como está
  escrito; la interfaz de la página está traducida. Si GitHub no responde,
  la página muestra un enlace al archivo en vez de fallar.
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

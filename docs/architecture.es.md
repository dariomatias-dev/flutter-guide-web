# Arquitectura

Cómo está organizado el código y por qué.

## Estructura

```text
src/
├── app/                    rutas delgadas, solo componen features
│   ├── layout.tsx          layout raíz: cascarón HTML, Header, Footer
│   ├── page.tsx            página de inicio
│   ├── not-found.tsx       página 404, también resuelve deep links de la app
│   └── privacy-policy/
│
├── features/               un directorio por feature
│   ├── about/
│   ├── community/
│   ├── contribution/
│   ├── faq/
│   ├── features-showcase/
│   ├── hero/
│   ├── layout/             header, menú del header, footer
│   ├── learning-path/
│   ├── legal/              contenido de la política de privacidad
│   ├── official-resources/
│   ├── screenshots/        carrusel y visor de imágenes
│   └── theme-customization/
│
└── shared/                 código sin feature propia
    ├── components/         link-button, github-button, play-store-button
    │   └── ui/             primitivas shadcn (button, accordion, breadcrumb)
    ├── lib/                cn (fusión de clases), site (URLs externas)
    └── motion/              variantes de framer-motion usadas entre features
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

## Renderizado

- `app/page.tsx` y `app/layout.tsx` son Server Components: solo componen
  componentes de feature, sin hooks ni estado propio.
- La mayoría de los componentes de feature son Client Components
  (`"use client"`), ya que casi toda sección anima con
  `framer-motion`/`motion`. Convertir una sección a Server Component
  significaría abandonar su animación, lo cual está fuera del alcance de
  los pasos de reestructuración (rastreado por separado, junto con el
  resto del trabajo de animación).
- Todo el sitio es estático: cada ruta se pre-renderiza en tiempo de
  build (`next build`), sin renderizado de servidor por solicitud y sin
  datos dinámicos.

## Decisiones

- **Por qué SSG.** El sitio no tiene cuentas de usuario, contenido por
  visitante ni datos que cambien entre solicitudes: un catálogo de
  contenido, capturas de pantalla, una FAQ, una política de privacidad.
  No hay nada que renderizar por solicitud, así que pre-renderizar cada
  ruta en tiempo de build convierte a cada una en un archivo estático,
  cacheable en el borde, sin el costo de un renderizado de servidor que
  nadie necesita.
- **Por qué feature-first.** El sitio es una única página larga hecha de
  secciones claramente separadas (hero, capturas de pantalla, FAQ, ...),
  cada una con su propio copy, variantes de animación y, en algunos
  casos, sus propios datos. Agrupar por feature mantiene todo lo que una
  sección necesita en un solo lugar, en vez de repartirlo entre árboles
  paralelos de `components/`, `constants/` y `@types/` como hacía el
  proyecto antes de esta reestructuración: la estructura que describe
  este documento reemplazó eso.

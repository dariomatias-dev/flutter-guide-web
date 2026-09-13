# Seguridad

## Qué es el sitio

Un sitio Next.js generado estáticamente: ningún código de servidor corre
en tiempo de solicitud (cada ruta es HTML pre-renderizado), sin base de
datos, sin cuentas de usuario, sin formularios que recolecten o
almacenen datos. La mayoría de las clases de vulnerabilidad del lado del
servidor (inyección SQL, bypass de autenticación, manejo de sesión) no
aplican aquí porque las superficies que atacarían no existen.

## Cabeceras y CSP

El `headers()` de `next.config.ts` aplica una Content-Security-Policy,
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Strict-Transport-Security` y `Permissions-Policy` en cada respuesta. La
CSP queda restringida a `'self'` para scripts, estilos, imágenes,
fuentes y conexiones, ya que el sitio no carga nada externo.
`script-src` y `style-src` incluyen `'unsafe-inline'`: el App Router
inyecta un `<script>` inline para su payload de streaming de RSC, y
Motion/Radix fijan atributos `style` inline (animaciones de entrada,
variables CSS del accordion) — ninguno de los dos funciona bajo una CSP
estricta sin un nonce por solicitud, lo cual requeriría middleware
corriendo en cada solicitud, incompatible con la salida totalmente
estática de este sitio. Ver `e2e/security.spec.ts` para las
verificaciones de las cabeceras.

## Escaneo automatizado

- **`pnpm audit`**, **`osv-scanner`**, **`gitleaks`**: corren en el job
  `vulnerabilities` de `ci.yml` en cada push y pull request, solo
  informativo.
- **CodeQL**: análisis estático para JavaScript/TypeScript, vía
  `.github/workflows/codeql.yml`, en push, pull request, y agenda
  semanal.
- **`dependency-review.yml`**: hace fallar un pull request que introduce
  un advisory nuevo de alta severidad o una licencia no permitida (ver
  `docs/dependencies.md`).
- **Renovate**: mantiene las dependencias al día en una agenda semanal
  (ver `docs/dependencies.md`); una actualización relevante para
  seguridad se evalúa como cualquier otro PR de Renovate.

## Reportar

Ver `SECURITY.md` en la raíz del repositorio.

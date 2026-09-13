# Rendimiento

## Presupuesto de tamaño de bundle

`scripts/check-bundle-size.mjs` lee el HTML pre-renderizado de `/` y
`/privacy-policy` en `.next/server/app/`, resuelve cada
`/_next/static/chunks/*.js` referenciado al archivo ya compilado, lo
comprime con gzip, y suma el total. Falla (salida distinta de cero) si
alguna ruta supera su presupuesto:

| Ruta              | Presupuesto (gzip) | Medido el 2026-09-13 |
| ----------------- | ------------------ | -------------------- |
| `/`               | 420.000 bytes      | 361.410 bytes        |
| `/privacy-policy` | 390.000 bytes      | 334.657 bytes        |

El presupuesto deja un margen de más o menos 15% por encima del valor
medido: suficiente para absorber una actualización de dependencia
rutinaria sin alarma, y lo bastante ajustado para detectar una regresión
real (una dependencia nueva pesada, un módulo que termina en el bundle
del cliente por accidente).

Ejecútalo localmente después de un build:

```sh
pnpm run build
pnpm run check-bundle-size
```

También corre como un paso del job `build` en CI, justo después del
build mismo.

### Aumentar el presupuesto

Si un cambio de verdad necesita más JS (una función interactiva nueva,
no un import accidental), mide el nuevo total con el comando de arriba y
aumenta el número en `scripts/check-bundle-size.mjs`, actualizando la
tabla aquí y explicando el motivo en el mensaje de commit — la misma
regla que bajar el piso de cobertura en `docs/testing.md`.

### Por qué tamaño gzip, no tamaño bruto del archivo

El tamaño gzip se aproxima a lo que realmente cruza la red hacia el
usuario, ya que Vercel (y la mayoría de los hosts estáticos) comprime
las respuestas JS en tránsito. El tamaño bruto del archivo haría el
presupuesto más estricto que la realidad, y no premiaría el código
amigable con la minificación/compresión de la forma en que lo hace el
tamaño gzip.

# Performance

## Bundle size budget

`scripts/check-bundle-size.mjs` reads the prerendered HTML for `/` and
`/privacy-policy` from `.next/server/app/`, resolves every
`/_next/static/chunks/*.js` it references to the built file, gzips it, and
sums the total. It fails (non-zero exit) if either route goes over its
budget:

| Route             | Budget (gzip) | Measured 2026-09-13 |
| ----------------- | ------------- | ------------------- |
| `/`               | 420,000 bytes | 361,410 bytes       |
| `/privacy-policy` | 390,000 bytes | 334,657 bytes       |

The budget leaves roughly 15% headroom above the measured size — enough to
absorb a routine dependency bump without alarm, tight enough to catch a
real regression (a heavy new dependency, an accidentally-client-bundled
module).

Run it locally after a build:

```sh
pnpm run build
pnpm run check-bundle-size
```

It also runs as a step in the `build` job in CI, right after the build
itself.

### Raising the budget

If a change legitimately needs more JS (a new interactive feature, not an
accidental import), measure the new total with the command above and raise
the number in `scripts/check-bundle-size.mjs`, updating the table here and
explaining why in the commit message — the same rule as lowering the
coverage floor in `docs/testing.md`.

### Why gzip size, not raw file size

Gzip size approximates what actually crosses the network to a user, since
Vercel (and most static hosts) compress JS responses in transit. Raw file
size would make the budget stricter than reality, and wouldn't reward
minification/compression-friendly code the way gzip size does.

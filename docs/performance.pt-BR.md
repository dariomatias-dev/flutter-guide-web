# Performance

## Orçamento de tamanho de bundle

`scripts/check-bundle-size.mjs` lê o HTML pré-renderizado de `/` e
`/privacy-policy` em `.next/server/app/`, resolve cada
`/_next/static/chunks/*.js` referenciado pro arquivo já compilado,
comprime com gzip, e soma o total. Ele falha (saída diferente de zero) se
alguma rota passar do orçamento:

| Rota              | Orçamento (gzip) | Medido em 2026-09-13 |
| ----------------- | ---------------- | -------------------- |
| `/`               | 420.000 bytes    | 361.410 bytes        |
| `/privacy-policy` | 390.000 bytes    | 334.657 bytes        |

O orçamento deixa uma folga de mais ou menos 15% acima do valor medido —
suficiente pra absorver uma atualização de dependência de rotina sem
alarde, apertado o bastante pra pegar uma regressão de verdade (uma
dependência nova pesada, um módulo indo pro bundle do cliente por
acidente).

Rode localmente depois de um build:

```sh
pnpm run build
pnpm run check-bundle-size
```

Também roda como um passo do job `build` no CI, logo depois do build em
si.

### Aumentando o orçamento

Se uma mudança precisa de fato de mais JS (uma funcionalidade interativa
nova, não um import acidental), meça o novo total com o comando acima e
aumente o número em `scripts/check-bundle-size.mjs`, atualizando a
tabela aqui e explicando o porquê na mensagem de commit — a mesma regra
de diminuir o piso de cobertura em `docs/testing.md`.

### Por que tamanho gzip, não tamanho bruto do arquivo

O tamanho gzip aproxima o que realmente atravessa a rede até o usuário,
já que a Vercel (e a maioria dos hosts estáticos) comprime as respostas
JS em trânsito. O tamanho bruto do arquivo deixaria o orçamento mais
rígido do que a realidade, e não recompensaria código
amigável à minificação/compressão do jeito que o tamanho gzip faz.

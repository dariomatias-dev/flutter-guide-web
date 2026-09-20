# Pipeline de CI/CD

## Workflows

### `ci.yml`

Roda em todo push pra `main` e todo pull request.

- **`commit-lint`**: valida o título do PR contra `commitlint.ci.config.mjs`.
  Só em pull request, já que não há título de PR num push simples.
- **`quality`**: `format:check`, `lint`, `typecheck`. Um gate obrigatório.
- **`unit`**: `test:coverage`, garantindo os pisos em `vitest.config.mts`,
  depois envia pro Codecov. O Codecov recusa envios sem token, então o
  passo é pulado quando `CODECOV_TOKEN` não existe e falha o job quando um
  envio com token dá errado: uma falha silenciosa deixaria o badge de
  cobertura mostrando um commit antigo. Um gate obrigatório.
- **`vulnerabilities`**: `pnpm audit`, `osv-scanner` contra o lockfile,
  `gitleaks`. Só relatório (`continue-on-error` em cada passo).
- **`build`**: `next build`, envia `.next` como artefato pro `e2e` e pro
  `lighthouse`. As actions de artefato ficam fixadas na v4, que é o que o
  servidor de artefatos local do `act` suporta (nektos/act#6022), e o
  envio precisa de `include-hidden-files` porque `.next` começa com ponto.
  Um gate obrigatório.
- **`e2e`**: baixa o artefato do build, roda a suíte do Playwright. Um
  gate obrigatório.
- **`lighthouse`**: baixa o artefato do build, roda `lhci autorun` contra
  o build de produção. Só relatório.

### `codeql.yml`, `dependency-review.yml`, `release-please.yml`

Cada um faz uma coisa: análise estática, um gate de licença/advisory em
PRs, e automação de PR de release a partir de Conventional Commits. Veja
`docs/dependencies.md` pra como o Renovate e o release-please interagem.

## O que roda de verdade localmente, e o que não roda

Todo arquivo de workflow é validado (YAML/JSON, `eslint`, `commitlint`,
schema) antes de ser commitado, mas nem todo job roda de ponta a ponta
nesta máquina — alguns precisam de um PR de verdade, um push de verdade,
ou uma API do GitHub que o `act` não consegue simular. Pra esses jobs,
"pronto" significa que o arquivo existe e é válido, não uma execução de
verdade.

Testável via `act`:

- `act -j quality`, `act -j build`, `act -j e2e`: rodam de verdade.
- `act -j vulnerabilities`: roda de verdade; o `gitleaks-action` falha
  sob o `act` porque o payload de evento simulado não tem
  `repository.owner`, então esse job só é exercitado de verdade por um
  push real.
- `act -j unit`: roda de verdade. O upload pro Codecov é pulado, já que o
  `act` não tem `CODECOV_TOKEN`.
- `act -j lighthouse`: o job em si passa, mas o `lhci` falha no
  healthcheck porque a imagem Docker do `act` não tem Chrome instalado
  (o runner `ubuntu-latest` de verdade tem).

Não testável via `act` (validade do arquivo é o critério de conclusão):
`commit-lint` (precisa de um título de PR de verdade), `codeql.yml`
(precisa do GitHub Advanced Security), `dependency-review.yml` (precisa
do dependency graph do GitHub), `release-please.yml` (precisa de
permissão de escrita pra abrir um PR de release).

## Rodando o `act` localmente

```sh
act -j <nome-do-job>
```

O `.actrc` fixa a imagem do runner em `catthehacker/ubuntu:act-latest`.
`actions/upload-artifact` e `actions/download-artifact` ficam fixados em
`v4` no `ci.yml` — versões mais novas não funcionam com o servidor de
artefato local do `act` (`nektos/act#6022`).

## Depurando uma falha de e2e

1. Rode `pnpm run test:e2e` localmente primeiro — é mais rápido de
   iterar do que o `act`.
2. Uma falha no CI envia `playwright-report/` e `test-results/` como
   artefato; baixe e abra `playwright-report/index.html` pra ver traces,
   screenshots e vídeos de cada teste que falhou.
3. O `mobile-chrome` só roda as specs `smoke`, `app-integration`, `a11y`
   e `navigation` (veja `testMatch` em `playwright.config.ts`) — uma
   falha específica desse projeto quase sempre é um problema de viewport
   mobile ou de interação por toque, não um problema compartilhado.

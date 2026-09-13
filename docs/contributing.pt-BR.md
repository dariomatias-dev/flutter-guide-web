# Contribuindo

## Configuração

```sh
git clone https://github.com/dariomatias-dev/flutter-guide-web.git
cd flutter-guide-web
pnpm install
```

Node.js 24+ e pnpm 10 são necessários; a versão do pnpm fica fixada no
campo `packageManager` do `package.json`. Veja o
[Começando](../README.pt-BR.md#começando) do README pra rodar o servidor
de desenvolvimento.

## Antes de abrir um pull request

- [ ] Código e comentários estão em inglês (veja `AGENTS.md`).
- [ ] Código novo segue a estrutura em `docs/architecture.md` — arquivos
      próprios da feature, não espalhados em árvores paralelas.
- [ ] Uma mudança de comportamento tem um teste; veja `docs/testing.md`
      pro que merece um.
- [ ] `pnpm run verify` passa localmente.
- [ ] A mensagem de commit segue a convenção do `AGENTS.md`.

## O gate local

```sh
pnpm run verify
```

Espelha o que o CI roda: typecheck, lint, checagem de formatação, testes
unitários com cobertura, build, e testes end-to-end. Use
`pnpm run verify --fast` pra pular o build e o e2e enquanto itera.

## O que o CI verifica

| Job               | O que faz                                         | Bloqueia o merge?  |
| ----------------- | ------------------------------------------------- | ------------------ |
| `commit-lint`     | Valida o título do PR (Conventional Commits)      | Sim                |
| `quality`         | Checagem de formatação, lint, typecheck           | Sim                |
| `unit`            | Testes unitários com cobertura, envia pro Codecov | Sim                |
| `vulnerabilities` | `pnpm audit`, `osv-scanner`, `gitleaks`           | Não (só relatório) |
| `build`           | Build de produção                                 | Sim                |
| `e2e`             | Testes end-to-end do Playwright                   | Sim                |
| `lighthouse`      | Lighthouse CI contra o build                      | Não (só relatório) |

O CodeQL, a checagem de dependency review, e o Renovate rodam como
workflows separados; veja `docs/ci.md` e `docs/dependencies.md`.

## Reproduzindo o CI localmente

```sh
act -j <nome-do-job>
```

Uma rodada verde do `act` é um sinal forte, não uma garantia — alguns
jobs precisam de um PR ou push de verdade e não rodam localmente de
jeito nenhum. Veja `docs/ci.md` pra quais são, e como depurar uma falha
de e2e.

## Trabalhando com um agente de IA

Este repositório carrega instruções de agente em `AGENTS.md` (e
`CLAUDE.md`, que só aponta pra ele). Mudar esse arquivo é uma mudança
normal, revisada como qualquer outra.

## Atualizações de dependência

O Renovate abre PRs de atualização de dependência numa agenda semanal.
Veja `docs/dependencies.md` pra quais pacotes ficam fixados, por quê, e
como triar um PR do Renovate.

## Convenções de commit e branch

Conventional Commits, com escopo por área (não caminho de arquivo); veja
`AGENTS.md`. Nomes de branch descrevem o que contêm, não a ferramenta ou
processo que os criou.

Ao participar deste projeto, você concorda em seguir o
[Código de Conduta](../CODE_OF_CONDUCT.md).

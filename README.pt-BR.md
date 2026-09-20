<br>
<div align="center">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</div>
<br>

<p align="center">
<a href="https://github.com/dariomatias-dev/flutter-guide-web/actions/workflows/ci.yml"><img src="https://github.com/dariomatias-dev/flutter-guide-web/actions/workflows/ci.yml/badge.svg" alt="CI: build passando"></a>
<a href="https://codecov.io/github/dariomatias-dev/flutter-guide-web"><img src="https://codecov.io/github/dariomatias-dev/flutter-guide-web/graph/badge.svg" alt="Cobertura reportada ao Codecov"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="Licença: MIT"></a>
<img src="https://img.shields.io/badge/node-%3E%3D24-339933?logo=node.js&logoColor=white" alt="Node.js: 24 ou superior">
</p>

<p align="center">
<a href="README.md">English</a> · <a href="README.es.md">Español</a> · <strong>Português (BR)</strong>
</p>

<h1 align="center">FlutterGuide</h1>

<p align="center">
O site oficial do app Android FlutterGuide: um catálogo gratuito e de código aberto de exemplos executáveis de Flutter e Dart, cada um com prévia ao vivo e o código-fonte.
<br>
<a href="#sobre-o-projeto"><strong>Explore a documentação »</strong></a>
<br>
<br>
<a href="https://github.com/dariomatias-dev/flutter-guide-web/issues/new?template=bug_report.yml">Reportar Bug</a> ·
<a href="https://github.com/dariomatias-dev/flutter-guide-web/issues/new?template=feature_request.yml">Sugerir Funcionalidade</a>
</p>

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Prévia](#prévia)
- [Funcionalidades](#funcionalidades)
- [O App](#o-app)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Começando](#começando)
- [Scripts](#scripts)
- [Testes](#testes)
- [Deploy](#deploy)
- [Documentação](#documentação)
- [Contribuindo](#contribuindo)
- [Segurança](#segurança)
- [Licença](#licença)
- [Autor](#autor)

## Sobre o Projeto

Este repositório contém o site do app FlutterGuide, no ar em
[flutter-guide-web.vercel.app](https://flutter-guide-web.vercel.app/). Ele apresenta o catálogo
do app, mostra suas telas, responde às dúvidas mais comuns e encaminha o visitante para a Play
Store.

O site também serve as rotas de que o próprio app depende: os links compartilháveis
(`/widgets/<nome>` e outros quatro caminhos), o arquivo de verificação dos Android App Links e
a política de privacidade referenciada na ficha da loja.

O app FlutterGuide fica em um repositório separado,
[flutter_guide_app](https://github.com/dariomatias-dev/flutter_guide_app).

## Prévia

Telas do app, as mesmas que o site coloca diante do visitante:

<div align="center">
<img src="public/screenshots/01_home.png" width="200" alt="Tela inicial do app">
<img src="public/screenshots/05_component_detail.png" width="200" alt="A prévia ao vivo de um exemplo">
<img src="public/screenshots/06_component_code.png" width="200" alt="O código-fonte do mesmo exemplo">
</div>

## Funcionalidades

- Uma página em três idiomas (inglês, português e espanhol), roteada pelo `next-intl`.
- Uma página de changelog montada a partir do `CHANGELOG.md` do app no GitHub, interpretada no
  build e regenerada de hora em hora, que também alimenta a prévia da home e o selo de versão
  no topo.
- Páginas de link direto que abrem no app o exemplo compartilhado, com a Play Store como
  alternativa.
- Carrossel de capturas com visualizador em tela cheia, e um aparelho Android desenhado em CSS.
- Animações de entrada e de revelação ao rolar feitas em CSS: sem biblioteca de animação, e o
  conteúdo continua visível sem JavaScript e com movimento reduzido.
- Acessibilidade verificada com o axe em cada página, no CI.
- SEO: URLs canônicas por idioma, hreflang, sitemap, robots, imagem de Open Graph e JSON-LD.
- Cabeçalhos de segurança com Content Security Policy, verificados de ponta a ponta.

## O App

O app organiza seu catálogo em cinco categorias. Cada exemplo tem um link compartilhável que
este site resolve para dentro do app:

| Categoria | O que cobre                             |
| --------- | --------------------------------------- |
| Widgets   | Widgets nativos e personalizados        |
| Funções   | Funções e trechos reutilizáveis em Dart |
| Pacotes   | Pacotes conhecidos da comunidade        |
| Elementos | Peças menores de interface              |
| UIs       | Padrões de interface e telas completas  |

Baixe o **FlutterGuide** na **Google Play Store**:

<a href="https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide" target="_blank">
<img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Disponível no Google Play" width="200">
</a>

## Tecnologias

- Next.js (App Router) com React e TypeScript em modo estrito.
- Tailwind CSS v4, com os tokens definidos em `src/app/globals.css`.
- `next-intl` para roteamento, mensagens e formatação em três idiomas.
- Primitivas do Radix UI (dialog, dropdown menu, accordion), embrulhadas no estilo shadcn.
- Embla Carousel para as capturas, e Shiki para o destaque de sintaxe no build.
- Vitest com Testing Library, e Playwright com axe.
- ESLint, Prettier, Husky, commitlint, Renovate e GitHub Actions.

## Arquitetura

O código é organizado por feature em `src/features/<nome>/`, com apenas o que é realmente
compartilhado em `src/shared/`. A direção das dependências (`app` → `features` → `shared`) é
garantida pelo ESLint, então um import que cruza a fronteira falha no `pnpm run lint`. Veja
[docs/architecture.pt-BR.md](docs/architecture.pt-BR.md).

## Começando

Pré-requisitos: Node.js 24 ou superior, e pnpm 10 (fixado no campo `packageManager` do
`package.json`).

```bash
git clone https://github.com/dariomatias-dev/flutter-guide-web.git
cd flutter-guide-web
pnpm install
pnpm run dev                  # http://localhost:3000
```

## Scripts

| Comando                      | Descrição                                           |
| ---------------------------- | --------------------------------------------------- |
| `pnpm run dev`               | Servidor de desenvolvimento                         |
| `pnpm run build`             | Build de produção                                   |
| `pnpm run start`             | Serve o build de produção                           |
| `pnpm run lint`              | ESLint                                              |
| `pnpm run typecheck`         | `tsc --noEmit`                                      |
| `pnpm run format`            | Prettier (escrita)                                  |
| `pnpm run test`              | Vitest (modo watch)                                 |
| `pnpm run test:run`          | Vitest (execução única)                             |
| `pnpm run test:coverage`     | Vitest com os pisos de cobertura                    |
| `pnpm run test:e2e`          | Playwright (navegação, a11y, SEO, links do app)     |
| `pnpm run check-bundle-size` | Verifica o orçamento de bundle (exige build antes)  |
| `pnpm run verify`            | O gate local completo, na ordem em que o CI executa |

## Testes

- Testes unitários e de componente com Vitest e Testing Library (`pnpm run test:run`), com
  pisos de cobertura garantidos no CI.
- Testes de ponta a ponta com Playwright (`pnpm run test:e2e`), cobrindo navegação,
  acessibilidade com axe, metadados de SEO e as rotas de que o app Android depende.
- Um comando roda o mesmo gate do CI, na mesma ordem: `pnpm run verify`.

Veja [docs/testing.pt-BR.md](docs/testing.pt-BR.md) para o que é testado, o que fica de fora de
propósito e por quê.

## Deploy

O deploy roda na Vercel, com uma prévia por pull request e produção a cada merge na `main`. O
[CI no GitHub Actions](.github/workflows/ci.yml) roda os gates que bloqueiam o merge: formato,
lint, tipos, paridade da documentação, testes unitários com cobertura, build com orçamento de
bundle e a suíte de ponta a ponta. As varreduras de dependências e de segredos rodam como
relatório. As versões são geradas pelo
[release-please](https://github.com/googleapis/release-please), que mantém um pull request
aberto com o `CHANGELOG.md` e o incremento de versão.

## Documentação

| Documento                                  | Cobre                                         |
| ------------------------------------------ | --------------------------------------------- |
| [Arquitetura](docs/architecture.pt-BR.md)  | Estrutura, regras de camadas, decisões        |
| [Testes](docs/testing.pt-BR.md)            | O que é testado, pisos de cobertura, lacunas  |
| [CI](docs/ci.pt-BR.md)                     | Jobs do pipeline e como rodá-los localmente   |
| [Dependências](docs/dependencies.pt-BR.md) | Versões fixadas, Renovate, triagem            |
| [Performance](docs/performance.pt-BR.md)   | Orçamento de tamanho de bundle                |
| [Segurança](docs/security.pt-BR.md)        | Cabeçalhos, CSP, varredura de dependências    |
| [Contribuindo](CONTRIBUTING.md)            | Setup, gate local, pull requests              |
| [Código de Conduta](CODE_OF_CONDUCT.md)    | Comportamento esperado nos espaços do projeto |

## Contribuindo

Relatos de bug, correções e ajustes de conteúdo são bem-vindos. Veja o
[CONTRIBUTING.md](CONTRIBUTING.md) para o setup, o gate local (`pnpm run verify`) e a convenção
de commits. A participação segue o [Código de Conduta](CODE_OF_CONDUCT.md).

## Segurança

Encontrou uma vulnerabilidade? Não abra uma issue pública. Veja
[docs/security.pt-BR.md](docs/security.pt-BR.md) para reportar em particular.

## Licença

Distribuído sob a **Licença MIT**. Veja o arquivo [LICENSE](LICENSE) para os detalhes.

## Autor

Desenvolvido por **Dário Matias Sales**:

- Portfólio: [https://dariomatias-dev.com](https://dariomatias-dev.com)
- GitHub: [https://github.com/dariomatias-dev](https://github.com/dariomatias-dev)
- E-mail: [dariomatias.dev@gmail.com](mailto:dariomatias.dev@gmail.com)
- Instagram: [https://instagram.com/dariomatias_dev](https://instagram.com/dariomatias_dev)
- LinkedIn: [https://linkedin.com/in/dariomatias-dev](https://linkedin.com/in/dariomatias-dev)

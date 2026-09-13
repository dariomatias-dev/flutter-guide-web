# Segurança

## O que o site é

Um site Next.js gerado estaticamente: nenhum código de servidor roda em
tempo de requisição (toda rota é HTML pré-renderizado), sem banco de
dados, sem conta de usuário, sem formulário que colete ou armazene dado.
A maioria das classes de vulnerabilidade de servidor (injeção de SQL,
bypass de autenticação, gestão de sessão) não se aplica aqui porque as
superfícies que elas atacariam não existem.

## Cabeçalhos e CSP

O `headers()` do `next.config.ts` aplica uma Content-Security-Policy,
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Strict-Transport-Security` e `Permissions-Policy` em toda resposta. A
CSP fica restrita a `'self'` pra scripts, estilos, imagens, fontes e
conexões, já que o site não carrega nada externo. `script-src` e
`style-src` incluem `'unsafe-inline'`: o App Router injeta um `<script>`
inline pro payload de streaming do RSC, e Motion/Radix definem atributos
`style` inline (animações de entrada, variáveis CSS do accordion) —
nenhum dos dois funciona sob uma CSP estrita sem um nonce por requisição,
o que exigiria middleware rodando em toda requisição, incompatível com a
saída totalmente estática deste site. Veja `e2e/security.spec.ts` pras
verificações dos cabeçalhos.

## Varredura automatizada

- **`pnpm audit`**, **`osv-scanner`**, **`gitleaks`**: rodam no job
  `vulnerabilities` do `ci.yml` em todo push e pull request, só
  relatório.
- **CodeQL**: análise estática pra JavaScript/TypeScript, via
  `.github/workflows/codeql.yml`, em push, pull request, e agenda
  semanal.
- **`dependency-review.yml`**: falha um pull request que introduz um
  advisory novo de alta severidade ou uma licença não permitida (veja
  `docs/dependencies.md`).
- **Renovate**: mantém as dependências em dia numa agenda semanal (veja
  `docs/dependencies.md`); uma atualização relevante pra segurança é
  triada como qualquer outro PR do Renovate.

## Reportando

Veja `SECURITY.md` na raiz do repositório.

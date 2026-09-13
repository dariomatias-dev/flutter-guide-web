# Dependências

## Versões exatas, e por quê

A maioria das dependências usa `^`, então o Renovate pode atualizá-las
livremente. Algumas ficam fixadas numa versão exata de propósito:

- **`react`, `react-dom`**: mantidas em sincronia com a versão exata que
  o release instalado do `next` espera.
- **`next`, `eslint-config-next`**: atualizadas juntas à mão, já que um
  major do Next pode mudar padrões (novas regras do ESLint, o Turbopack
  virando padrão, etc.) que precisam de um olhar no nível do código-fonte,
  não uma atualização automática.

O Renovate está configurado pra deixar `next`, `eslint-config-next`,
`react` e `react-dom` intocados (veja `renovate.json`). Atualizar
qualquer um deles é uma mudança dedicada própria, não um PR do Renovate.

## Configuração do Renovate

`renovate.json` estende `config:recommended` com:

- **Agenda semanal**: um lote de PRs por semana em vez de um por release.
- **Prefixo de commit `build(deps):`**, batendo com a convenção de commit
  deste repositório.
- **GitHub Actions agrupadas** num único PR por semana, já que atualizar
  versões de action raramente precisa de revisão individual.

## Triando um PR do Renovate

1. Leia as notas de release linkadas no corpo do PR em busca de algo que
   quebre.
2. Rode `pnpm run verify` localmente no branch do PR.
3. Se for um único pacote de baixo risco (um bump patch ou minor com
   `verify` limpo), faça merge como está.
4. Se afeta algo com UI visível (`motion`, `embla-carousel-react`,
   `tailwindcss`, `@radix-ui/*`), confira o app num navegador antes de
   fazer merge, não só a suíte de testes — regressões visuais não
   derrubam testes.
5. Se `verify` falhar, decida se o conserto pertence ao mesmo PR
   (pequeno, mecânico) ou como uma mudança de acompanhamento (qualquer
   coisa que afete o comportamento de `src/` além de renomear um import).

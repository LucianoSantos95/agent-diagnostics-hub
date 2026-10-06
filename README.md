# Diagnóstico de Agente de IA

Questionário guiado que descobre **qual frente de automação com IA vale a pena
atacar primeiro** num negócio pequeno (atendimento, vendas, operação ou
financeiro) e entrega um plano: ferramenta recomendada, por que ela, como
começar e erros comuns. O resultado pode ser enviado por e-mail e baixado como
playbook em PDF.

Parte do ecossistema [Focus Inteligente](https://focusinteligente.com.br).

## Como funciona

Sete perguntas, nesta ordem: perfil de trabalho, gargalo principal, tamanho do
time, volume diário, a tarefa que mais consome tempo (texto livre), a meta para
os próximos 3 meses (texto livre) e o que a pessoa já usa.

Com as respostas, o motor decide:

- **Frente**: atendimento, vendas, operação ou financeiro. Time mínimo com
  volume alto desloca a frente para atendimento.
- **Sub-caso**: o texto livre é roteado para um caso de uso concreto (por
  exemplo `instagram-dm`, `email-sequencia`, `nota-fiscal`, `cobranca`).
- **Forma da recomendação**: uma ferramenta, ferramenta + complemento
  (quando já existe outro sistema para ligar), agente sob medida ou validar
  antes (quando as respostas se contradizem).
- **Confiança** (alta, média ou baixa), que muda o tom do texto entregue.

O motor (`src/features/diagnostico/engine/recomendacao.ts`) é um conjunto de
regras determinísticas e testáveis, sem chamada a modelo de linguagem.

## Stack

React 19, TypeScript, Vite, React Router 7, Tailwind CSS 3, Supabase (Postgres
e Edge Functions em Deno), oxlint e vitest. Construído com a plataforma
Lovable.

## Estrutura

```
src/
  features/diagnostico/
    engine/        regras de recomendação (puras, com testes)
    questions/     componentes das perguntas
    screens/       telas do fluxo e do resultado
    playbooks/     catálogo e montagem do playbook para impressão/PDF
    hooks/         estado e persistência do diagnóstico
    resultado/     blocos da tela de resultado
  lib/mcp/         ferramentas expostas pelo servidor MCP
  pages/           rotas (diagnóstico, landing pages de SEO, descadastro)
supabase/
  functions/       Edge Functions (e-mail transacional, PDF, MCP, progresso)
  migrations/      esquema do banco
docs/              auditoria de perguntas e playbook de SEO/GEO
```

Rotas públicas: `/diagnostico-agente-ia`, `/chatbot-para-empresas`,
`/automacao-de-atendimento`, `/ia-para-pequenas-empresas` e `/unsubscribe`.

## MCP

O projeto expõe um servidor MCP com duas ferramentas, `calcular-diagnostico` e
`listar-ferramentas`, para que assistentes de IA possam rodar o diagnóstico e
consultar o catálogo. O código-fonte fica em `src/lib/mcp`; a Edge Function
`supabase/functions/mcp` é gerada a partir dele pelo plugin Vite da Lovable e
não deve ser editada à mão.

## Rodando localmente

Pré-requisitos: Node 20+ (ou Bun) e um projeto Supabase.

```bash
bun install        # ou: npm install
cp .env.example .env
bun run dev        # ou: npm run dev
```

Variáveis em `.env` (ambas públicas, usadas no navegador):

| Variável | Para que serve |
|---|---|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | chave pública (anon) do projeto |

Segredos das Edge Functions (e-mail, etc.) ficam configurados no Supabase e
nunca no repositório.

## Scripts

| Comando | O que faz |
|---|---|
| `bun run dev` | servidor de desenvolvimento |
| `bun run build` | checagem de tipos e build de produção |
| `bun run test` | testes do motor de recomendação |
| `bun run lint` | análise estática com oxlint |

## Testes

`src/features/diagnostico/engine/recomendacao.test.ts` cobre a classificação de
perfil, a leitura do que a pessoa já usa, o roteamento de texto livre para
sub-casos e o resultado completo, incluindo os casos de borda (respostas
vazias, deslocamento para atendimento, quem já testou e desistiu).

## Documentação

- [`docs/AUDITORIA-PERGUNTAS.md`](docs/AUDITORIA-PERGUNTAS.md): auditoria das
  perguntas contra o resultado entregue.
- [`docs/SEO-GEO.md`](docs/SEO-GEO.md) e
  [`docs/SEO-GEO-PLAYBOOK.md`](docs/SEO-GEO-PLAYBOOK.md): estratégia de SEO e
  de visibilidade em respostas de IA (GEO).

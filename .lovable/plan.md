
# Plano de Implementação

## Pré-requisito: Figma MCP
O Figma MCP ainda **não está conectado**. Assim que você:
1. Abrir Figma Desktop → Dev Mode (Shift+D) → "Enable desktop MCP server"
2. Ativar em Settings → Connectors → Local MCP servers no Lovable
3. Colar o link do frame de referência

…eu extraio anima/logo direto do seu arquivo. Enquanto isso, sigo com o que **não** depende do Figma (itens 1–4 abaixo). O item 5 (refinamento fino do logo/animações via referência sua) fica em espera até o frame chegar.

---

## 1. Logo "Focus Indica" — conceito orbital novo
**Arquivo:** `src/assets/focus-indica-logo.svg` (substituir)

- Símbolo geométrico abstrato alinhado à estética *architectural tech*:
  - Núcleo sólido em `#4f46e5` (indigo accent)
  - 2 anéis orbitais concêntricos (traços finos, dashed)
  - 1 partícula orbital destacada (indicando "foco/direção")
- Sem gradiente rosa/roxo antigo — paleta 100% Midnight Indigo
- Versão que funciona em dark e light (via `currentColor` nos traços)

## 2. Header dinâmico com scroll
**Arquivo:** `src/components/Header.tsx`

- Hook `useScrollY()` novo para detectar posição
- Ao passar de **80px**:
  - Altura reduz `60px → 48px` (transição 300ms)
  - Badge "Diagnóstico gratuito" faz fade-out + slide
  - Wordmark "Focus Indica" anima kerning: `letter-spacing: -0.3px → -1.2px` (letras se aproximam)
  - Fundo ganha `backdrop-blur` mais intenso + borda mais sutil
- Já respeita `var(--text-primary)` e `var(--surface)`, então **acompanha o tema** automaticamente (dark/light toggle já funciona nos tokens)

## 3. Botão "Deixar feedback" com cor chamativa
**Arquivos:** `src/features/diagnostico/resultado/CaixaFeedback.tsx` + `src/components/FeedbackDialog.tsx` (trigger)

- Novo estilo do CTA de feedback:
  - Fundo `#F59E0B` (amber vibrante) com glow sutil `box-shadow: 0 0 24px rgba(245,158,11,0.4)`
  - Texto branco, peso 600
  - Micro-animação `animate-glow-pulse` (já existe no CSS) no hover
  - Ícone de balão de fala à esquerda
- Contrasta com o resto (que é todo indigo/violeta), puxando o olho

## 4. Tela de Resultado — expansão de ferramentas + combinações
**Arquivo:** `src/features/diagnostico/screens/TelaResultado.tsx` + novo `src/features/diagnostico/resultado/StackRecomendada.tsx` + dados em `src/features/diagnostico/engine/recomendacao.ts`

Adicionar 3 blocos novos abaixo do bloco atual "Ferramentas recomendadas":

### 4a. Stack Completa por Categoria
Kit de 4–6 ferramentas cobrindo o fluxo inteiro da categoria escolhida. Ex. para "atendimento":
- Agente: Typebot
- Automação: Make
- CRM: RD Station
- Analytics: PostHog
- IA geral: ChatGPT

### 4b. Ferramentas Gerais de IA (bloco fixo, aparece em todas categorias)
ChatGPT, Claude, Gemini, Perplexity — cada uma com:
- Nome + link
- **"Como usar no seu negócio"** (2–3 frases práticas específicas por ferramenta)
- Ex.: *"Claude é forte em textos longos — use para revisar contratos, escrever propostas comerciais e sumarizar reuniões"*

### 4c. Combinações Lógicas (fluxos)
3 combinações prontas mostrando **como as ferramentas se encaixam**:
- **Fluxo 1** — "Captação → Qualificação → Venda": Instagram → ManyChat → Typebot → RD Station CRM → ChatGPT (redação de proposta)
- **Fluxo 2** — "Atendimento 24/7 com escalonamento humano": Typebot (bot) → Make (roteamento) → WhatsApp humano → Notion (registro)
- **Fluxo 3** — "Operação com IA de bolso": Google Sheets → Make → Claude API → Slack (notificação)

Cada fluxo em card horizontal com setas entre os passos.

## 5. Animações refinadas (aguardando Figma)
Quando o frame chegar via MCP:
- Extraio timing curves, delays e durations do seu arquivo
- Aplico em: entrada da TelaAbertura (orbital), transição TelaPerguntas→TelaAnalise, reveal do TelaResultado

Até lá, mantenho os `animate-glow-pulse`, `animate-float-y` e `fade-in` já presentes.

---

## Detalhes técnicos

```text
Arquivos a criar:
- src/hooks/useScrollY.ts
- src/features/diagnostico/resultado/StackRecomendada.tsx
- src/features/diagnostico/resultado/FerramentasIAGeral.tsx
- src/features/diagnostico/resultado/CombinacoesLogicas.tsx

Arquivos a editar:
- src/assets/focus-indica-logo.svg (redesenho completo)
- src/components/Header.tsx (scroll dynamics + kerning)
- src/features/diagnostico/resultado/CaixaFeedback.tsx (CTA amber)
- src/features/diagnostico/screens/TelaResultado.tsx (composição dos novos blocos)
- src/features/diagnostico/engine/recomendacao.ts (dados de stack/combos por categoria)
```

O logo (SVG) usa `currentColor` + variável `--accent`, então já responde ao toggle de tema. O header lê `var(--surface)`/`var(--text-primary)` — troca de cor com o tema é automática.

## Ordem de execução
1. Logo novo (item 1) — visível em toda navegação
2. Header dinâmico (item 2) — impacto imediato de percepção
3. Feedback amber (item 3) — mudança pontual
4. Expansão TelaResultado (item 4) — maior volume de conteúdo
5. (Depois do Figma) refinamento de animações (item 5)

Aprova para eu implementar do 1 ao 4 agora?

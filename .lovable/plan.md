
# Redesign profissional do diagnóstico

Escopo: abertura, perguntas, análise, resultado e as 3 landing pages SEO. Fonte de verdade visual = seu arquivo Figma (via MCP local) quando estiver conectado. Caso ainda não esteja, uso a skill `redesign` para gerar 3 direções renderizadas e você escolhe uma antes de eu implementar.

## Pré-requisito

Habilitar o Figma MCP local (Figma Desktop → Dev Mode → Enable desktop MCP server → conectar em Settings → Connectors no Lovable). Sem isso o passo "Extração do Figma" abaixo é substituído pelo fluxo `redesign`.

## Fase 1 — Fundação do design system

Antes de mexer em qualquer tela, consolido o sistema em `src/index.css` + `tailwind.config.js`:

1. **Extração do Figma** (se conectado): leio tokens de cor, tipografia, espaçamento, radius, sombras e componentes do arquivo que você indicar. Mapeio 1:1 para variáveis CSS semânticas (`--background`, `--foreground`, `--primary`, `--surface`, `--text-*`, gradientes, sombras).
2. **Fallback sem Figma**: rodo a skill `redesign` — 3 perguntas visuais (paleta, tipografia, layout) + 3 direções renderizadas para você escolher. A direção escolhida vira o sistema.
3. **Tipografia**: substituo qualquer default genérico por um par distintivo (display + body) carregado via Google Fonts.
4. **Motion**: adiciono `framer-motion` e defino 3–4 primitivas de animação (fade-up, stagger, hover-lift, page-enter) para uso consistente.

Entregável: tokens novos + preview visual do sistema aplicado num componente-piloto (botão + card) antes de propagar.

## Fase 2 — Telas do diagnóstico

Refino, uma por uma, mantendo toda a lógica de negócio intacta (`useDiagnostico`, engine, edge functions, captura de e-mail/orçamento). Só CSS/JSX/motion.

1. **TelaAbertura** — hero com hierarquia clara, CTA mais assertivo, prova social/contadores se fizerem sentido, animação de entrada.
2. **TelaPerguntas** — progresso mais elegante, transições entre perguntas, tratamento visual distinto para múltipla escolha vs. texto livre, foco em legibilidade mobile.
3. **TelaAnalise** — micro-storytelling durante o "carregamento" (steps animados em vez de spinner genérico).
4. **TelaResultado** — refinamento do hero por categoria, hierarquia dos blocos (ferramentas → gate de e-mail → guia → orçamento → CTA), tratamento premium do CTA comercial. Este é o ponto de maior conversão, recebe atenção extra.

## Fase 3 — Landing pages SEO

`LandingLayout` + as 3 páginas (`AutomacaoAtendimento`, `ChatbotEmpresas`, `IaPequenasEmpresas`):

- Editorial-grade: hero com tipografia grande, sumário lateral em desktop, blocos com respiração, FAQ em accordion refinado.
- Ilustração/imagem hero gerada sob medida por LP (imagegen) — evita cara de template.
- CTA final destacado, mas sem gritar.
- Mantém o JSON-LD FAQ e o SEO atual intactos.

## Fase 4 — Componentes compartilhados

- **Header** e **Footer**: alinhar ao novo sistema (não redesenhar do zero, só refinar).
- **PageBackground**: ajustar cores das ondas/grid às novas variáveis para não destoar.
- **Dialogs** (`FeedbackDialog`, `CaseRealDialog`): padronizar com o novo radius/sombra/tipografia.

## Fora de escopo

- Lógica do diagnóstico, engine de recomendação, edge functions, e-mails transacionais, MCP server, banco.
- Adicionar/remover perguntas ou categorias.
- Autenticação.

## Detalhes técnicos

- Zero cor hardcoded em componentes — tudo via tokens semânticos no CSS.
- Todo componente novo/refatorado usa `framer-motion` para entrada/hover consistentes.
- Mobile-first; verifico em 375px, 768px e 1280px.
- Após cada fase, screenshot via Playwright para validação visual antes de seguir.

## Ordem de execução sugerida

```text
Fase 1 (fundação)  →  validação visual
   ↓
Fase 2.4 (Resultado — maior impacto)  →  validação
   ↓
Fase 2.1 (Abertura)  →  validação
   ↓
Fase 2.2 + 2.3 (Perguntas + Análise)
   ↓
Fase 3 (LPs)
   ↓
Fase 4 (polimento compartilhado)
```

Confirmando o plano: se o Figma já estiver conectado quando você aprovar, começo pela extração dos tokens. Se não, disparo o fluxo `redesign` para você escolher a direção visual antes de qualquer código.

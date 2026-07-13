# Trazer mais gente para o diagnóstico

## O diagnóstico dos dados (Semrush, mercado BR)

O site hoje tem **8 palavras-chave ranqueando e ~0 tráfego orgânico** no Brasil. O motivo é claro: você está otimizado para termos que ninguém busca.

| Termo atual do site | Volume/mês | Termos que PMEs realmente buscam | Volume/mês | Dificuldade |
|---|---|---|---|---|
| "diagnóstico de ia" | ~0 | **agente de ia** | 3.600 | 38 (viável) |
| "agente de ia para empresas" | 10 | **chatbot para empresas** | 210 | **14 (muito fácil)** |
| | | **automação de atendimento** | 170 | 20 (fácil) |
| | | **atendimento automatizado whatsapp** | 140 | 21 (fácil) |
| | | **chatbot atendimento whatsapp** | 110 | 35 (viável) |
| | | **ia para pequenas empresas** | 50 | 0 (muito fácil) |

**Conclusão importante:** nenhum *conector* traz tráfego. Conectores movem leads *depois* que eles chegam. O que traz tráfego é conteúdo/páginas otimizadas para os termos certos. O conector **Semrush** faz sentido depois — para acompanhar posição desses termos dentro do próprio app — mas não é o próximo passo.

## O plano (3 etapas, ordem importa)

### Etapa 1 — Reorientar a página inicial (rápido, alto impacto)

Hoje o `<title>` e `<meta description>` do `index.html` giram em torno de "Diagnóstico de Agente de IA". Trocar o eixo para os termos que **têm volume e são vencíveis**, sem mudar o produto:

- `<title>` novo: algo como *"Qual agente de IA sua PME precisa? Descubra em 2 minutos"* — encaixa "agente de IA" (3.600/mês) e sinaliza público PME.
- `<meta description>`: mencionar chatbot, atendimento no WhatsApp, automação de vendas — os termos com KDI baixo.
- H1 e subtítulo da `TelaAbertura`: mesma reorientação, sem redesenhar a tela.

### Etapa 2 — Criar 3 landing pages temáticas (o que realmente move o ponteiro)

Cada uma otimizada para um dos termos vencíveis, com CTA para o diagnóstico. Rotas novas no React Router, sem tocar no fluxo do diagnóstico:

1. `/chatbot-para-empresas` → alvo "chatbot para empresas" (KDI 14, 210/mês) + "chatbot atendimento whatsapp".
2. `/automacao-de-atendimento` → alvo "automação de atendimento" (KDI 20) + "atendimento automatizado whatsapp".
3. `/ia-para-pequenas-empresas` → alvo "ia para pequenas empresas" (KDI 0) + "inteligência artificial para empresas".

Cada landing tem: H1 exato com o termo, 3-4 blocos explicativos (o que é, quando faz sentido, custo típico, exemplos), FAQ curta (SEO de "People Also Ask") e CTA "Descubra em 2 minutos qual agente sua empresa precisa" apontando para `/`. Sem backend novo — só páginas.

Cada rota entra no `sitemap.xml` e no fluxo de metadados por rota (via `react-helmet-async`, que ainda não está no projeto e precisa ser adicionado).

### Etapa 3 — Só então: conector Semrush para monitorar (opcional)

Depois que as 3 landings estiverem no ar por ~30 dias, aí sim o conector **Semrush** justifica: painel interno no app mostrando posição atual de cada termo-alvo, evolução mensal e novas oportunidades de conteúdo. **Não faz sentido conectar agora** porque não há o que monitorar (0 tráfego, 3 termos ranqueando).

## Detalhes técnicos

- Etapa 1: edita `index.html`, `src/features/diagnostico/screens/TelaAbertura.tsx`. Sem novas dependências.
- Etapa 2: adiciona `react-helmet-async`, cria `src/pages/lp/ChatbotEmpresas.tsx`, `AutomacaoAtendimento.tsx`, `IaPequenasEmpresas.tsx`; adiciona rotas em `App.tsx`; atualiza `public/sitemap.xml` (ou converte para o script gerador se você preferir).
- Etapa 2 usa apenas componentes shadcn/ui e tokens que já existem em `index.css` — nenhum redesign.
- Etapa 3 (se acontecer): `standard_connectors--connect` para Semrush + uma rota `/admin/seo` protegida.

## Fora de escopo

- Redesign visual do app.
- Alterar o fluxo do diagnóstico ou o cálculo da recomendação.
- Google Ads / mídia paga (é outra conversa; SEO orgânico primeiro rende antes de gastar em ads).
- Conectar CRM/Slack/Sheets agora — leads já são capturados; o gargalo é *chegar até o formulário*.

## O que eu preciso de você

Antes de implementar, confirme se topa **começar pela Etapa 1** (rápida, low-risk) e me diga se quer que eu **já entregue as 3 landings da Etapa 2 no mesmo turno** ou prefere revisar a Etapa 1 primeiro.

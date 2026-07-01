# Estratégia de SEO + GEO — Diagnóstico de Agente de IA

> Documento de referência para posicionar o produto tanto no **Google** (SEO clássico)
> quanto nos **motores de resposta com IA** (GEO — Generative Engine Optimization:
> ChatGPT, Gemini, Perplexity, Claude, Google AI Overviews).
>
> Domínio-alvo: `https://diagnostico.focusinteligente.com.br`
> Produto: quiz gratuito de 6 perguntas que diagnostica qual agente de IA uma PME precisa primeiro.
> Marca: **Focus Custom** (desenvolve agentes de IA sob medida).

---

## 1. Palavras-chave e intenção de busca

### Cluster principal (fundo de funil — alta intenção)
| Palavra-chave | Intenção | Onde atacar |
|---|---|---|
| qual agente de ia minha empresa precisa | Diagnóstico/decisão | H1, title, FAQ |
| agente de ia para atendimento | Comercial | Conteúdo categoria |
| agente de ia para vendas / follow-up | Comercial | Conteúdo categoria |
| automação com ia para pequenas empresas | Comercial | Subtítulo, conteúdo |
| chatbot whatsapp para empresa | Comercial | Categoria atendimento |
| como automatizar cobrança de clientes | Informacional→comercial | Categoria financeiro |

### Cluster informacional (topo — alimenta GEO)
- "o que é um agente de IA"
- "diferença entre chatbot e agente de IA"
- "quanto custa implementar IA na empresa"
- "por que ferramentas de IA não funcionam" (dor central do produto)

### Long-tail conversacional (GEO — como as pessoas perguntam à IA)
- "qual ferramenta de IA usar para responder clientes no WhatsApp"
- "minha empresa perde vendas por falta de follow-up, o que fazer"
- "vale a pena contratar agente de IA personalizado ou usar ferramenta pronta"

---

## 2. SEO técnico (checklist aplicado)

- [x] `<html lang="pt-BR">`
- [x] `<title>` único, com keyword + benefício + "gratuito"
- [x] `meta description` ≤ 160 caracteres, com CTA
- [x] `<link rel="canonical">`
- [x] `meta robots` = `index, follow, max-image-preview:large`
- [x] **Open Graph** completo (title, description, type, url, image, locale, site_name)
- [x] **Twitter Card** = `summary_large_image`
- [x] `theme-color` (dark navy) para barra do mobile
- [x] Meta geográficas (`geo.region=BR`, `geo.placename`)
- [x] `robots.txt` apontando o sitemap
- [x] `sitemap.xml`
- [x] Imagem social `og-image` (1200×630) — **exportar PNG a partir do SVG-fonte**
- [x] Favicon SVG

### Pendências de infraestrutura (fora do código)
- **HTTPS + domínio próprio**: apontar `diagnostico.focusinteligente.com.br` no Lovable.
- **Google Search Console**: verificar propriedade e submeter o sitemap.
- **Core Web Vitals**: o app é leve (Vite + React), mas medir LCP/CLS após deploy.
- **og-image.png**: exportar o `public/og-image.svg` para PNG 1200×630 (redes sociais
  raramente renderizam og-image em SVG). Colocar como `public/og-image.png`.

---

## 3. Dados estruturados (Schema.org / JSON-LD)

Aplicados via `react-helmet-async` na página:

| Schema | Função | Ganho |
|---|---|---|
| `FAQPage` | 4 perguntas/respostas | Rich snippet no Google + fonte direta para IA |
| `Organization` | Define a entidade **Focus Custom** | Knowledge graph, confiança, GEO |
| `WebApplication` | Descreve o diagnóstico como ferramenta gratuita | Elegibilidade a rich results |

> **Por que isso importa para GEO:** modelos de IA extraem `FAQPage` e `Organization`
> quase literalmente. Uma resposta bem estruturada no schema tem alta chance de ser
> citada quando alguém pergunta à IA "qual agente de IA minha empresa precisa".

---

## 4. GEO — Generative Engine Optimization

GEO é otimizar para ser **citado como fonte** por IAs, não só ranqueado. Princípios aplicados:

### 4.1 Conteúdo extraível e visível (não só no schema)
Adicionada uma seção de conteúdo textual **visível e semântica** na landing
(`ConteudoSEO`), com `<h2>`/`<h3>`, porque crawlers de IA priorizam texto renderizado.
O quiz sozinho (SPA) não dá conteúdo indexável — a seção resolve isso.

### 4.2 Clareza de entidade
Toda página deixa explícito, em texto:
- **O que é** o produto (diagnóstico gratuito de 6 perguntas).
- **Quem faz** (Focus Custom, empresa brasileira de agentes de IA sob medida).
- **Para quem** (PMEs brasileiras).
- **As 4 categorias** nomeadas e definidas (atendimento, vendas, operação, financeiro).

### 4.3 Respostas auto-contidas
Cada resposta da FAQ é completa em si mesma (a IA pode citar sem precisar do resto da
página). Frases afirmativas, diretas, com números quando possível.

### 4.4 Estrutura pergunta→resposta
Títulos em forma de pergunta ("O que é um agente de IA?") batem exatamente com prompts
de usuários. Isso aumenta a chance de match semântico no retrieval da IA.

### 4.5 `llms.txt`
Arquivo `public/llms.txt` (padrão emergente) descrevendo o produto, a marca e os links
principais em markdown limpo — um "resumo para IAs" na raiz do site. O `robots.txt`
libera explicitamente GPTBot, PerplexityBot, ClaudeBot, Google-Extended etc.

### 4.6 Sinais de autoridade (E-E-A-T)
- Posição neutra: o produto recomenda **ferramentas de mercado reais** (Typebot, Make,
  Asaas...), o que sinaliza honestidade — modelos de IA favorecem fontes não puramente
  promocionais.
- Recomendações específicas e acionáveis (passo a passo), não genéricas.

---

## 5. Roadmap de conteúdo (próximos passos para dominar as buscas)

Para virar referência (e não só ter uma landing), a Focus deveria publicar — no blog do
site principal, linkando para o diagnóstico:

1. **"Chatbot x Agente de IA: qual a diferença real?"** — captura topo de funil.
2. **"Por que 6 em cada 10 PMEs desistem de IA no primeiro ano"** — a dor central, com o
   diagnóstico como solução.
3. **Uma página por categoria**: "Agente de IA para atendimento no WhatsApp", etc. Cada
   uma linkando para o quiz e para a sessão gratuita.
4. **Comparativos de ferramentas** (Typebot x ManyChat, Make x Zapier) — altíssimo volume
   de busca informacional + GEO, e você já tem o conteúdo-base no motor de recomendação.

Cada artigo = uma porta de entrada. O diagnóstico = o conversor. A sessão = o fechamento.

---

## 6. Medição

| Métrica | Ferramenta | Meta inicial |
|---|---|---|
| Impressões / cliques orgânicos | Search Console | crescer m/m |
| Citações em IA | Busca manual no ChatGPT/Perplexity/Gemini | aparecer em 3 meses |
| Taxa de conclusão do quiz | View `diagnostico_funil` (Supabase) | > 40% |
| Captura de e-mail (desbloqueio) | `diagnostico_leads.email` | > 25% dos que veem resultado |
| Clique no CTA WhatsApp | `diagnostico_leads.quer_consultoria` | > 8% |

---

## 7. Resumo do que foi aplicado

- `index.html`: OG, Twitter, robots, theme-color, geo, canonical.
- `DiagnosticoPage.tsx`: JSON-LD com FAQPage + Organization + WebApplication.
- `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`.
- `public/og-image.svg`: fonte da imagem social (exportar para PNG 1200×630).
- `ConteudoSEO.tsx`: seção de conteúdo textual visível na landing (SEO + GEO).

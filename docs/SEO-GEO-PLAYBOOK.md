# Playbook de SEO + GEO (reutilizável)

> Template genérico para ranquear no **Google** (SEO) e ser citado por **IAs**
> (GEO — Generative Engine Optimization: ChatGPT, Gemini, Perplexity, Claude,
> Google AI Overviews). Substitua os `{{PLACEHOLDERS}}` em cada projeto.
>
> Placeholders usados:
> `{{SITE_URL}}` (ex.: https://exemplo.com.br) · `{{BRAND}}` · `{{TITLE}}` ·
> `{{DESCRIPTION}}` · `{{OG_IMAGE_URL}}` · `{{PRODUTO}}` · `{{PAIS}}`

---

## 0. Princípios (o que muda no jogo)

**SEO** = ser **encontrado e ranqueado** por buscadores.
**GEO** = ser **entendido e citado como fonte** por modelos de IA.

Os dois se sobrepõem, mas GEO exige extras: texto extraível, respostas
auto-contidas, clareza de entidade e liberação explícita para bots de IA.

Regra de ouro: **conteúdo em texto real, semântico e renderizado** vence.
SPA (React/Vue) que só monta via JS entrega pouco para crawler — sempre tenha
uma camada de conteúdo textual visível (ou SSR/pré-render).

---

## 1. Pesquisa de palavras-chave (faça antes de escrever)

Monte 3 clusters:

1. **Fundo de funil (alta intenção)** — quem já quer resolver. Ataque no
   `<title>`, `<h1>` e FAQ. Ex.: "{{PRODUTO}} para [caso de uso]".
2. **Topo informacional** — quem está aprendendo. Alimenta GEO. Ex.: "o que é
   [tema]", "diferença entre X e Y", "quanto custa [tema]".
3. **Long-tail conversacional** — como as pessoas **perguntam à IA** (frases
   inteiras). Ex.: "vale a pena [X] ou [Y] para [situação]".

Ferramentas: Google Search Console (o que já traz tráfego), autocomplete do
Google, "People also ask", e perguntar à própria IA "o que as pessoas
perguntam sobre {{tema}}".

---

## 2. SEO técnico — checklist

- [ ] `<html lang="{{idioma}}">` (ex.: `pt-BR`)
- [ ] `<title>` único por página, keyword no início, ≤ ~60 caracteres
- [ ] `meta description` ≤ 155 caracteres, com benefício + CTA
- [ ] `<link rel="canonical">` absoluto em toda página
- [ ] `meta robots` = `index, follow, max-image-preview:large, max-snippet:-1`
- [ ] **Open Graph** completo (title, description, type, url, image, locale, site_name)
- [ ] **Twitter Card** = `summary_large_image`
- [ ] `theme-color`
- [ ] `robots.txt` apontando o sitemap
- [ ] `sitemap.xml` com todas as URLs indexáveis
- [ ] `og-image` **1200×630 em PNG/JPG** (redes sociais não renderizam SVG)
- [ ] Favicon
- [ ] 1 único `<h1>` por página; hierarquia `h2`/`h3` coerente
- [ ] URLs limpas e descritivas; HTTPS; sem conteúdo importante só atrás de JS
- [ ] Core Web Vitals ok (LCP, CLS, INP) — medir no PageSpeed Insights
- [ ] Imagens com `alt` descritivo e `width`/`height`

### Pós-deploy (fora do código)
- [ ] Google Search Console: verificar propriedade + **enviar sitemap**
- [ ] "Inspeção de URL" → **Solicitar indexação** das páginas principais
- [ ] Bing Webmaster Tools (também alimenta o Copilot)

---

## 3. Template de `<head>` (copiar e colar)

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <title>{{TITLE}}</title>
    <meta name="description" content="{{DESCRIPTION}}" />
    <meta name="author" content="{{BRAND}}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="{{SITE_URL}}/" />
    <meta name="theme-color" content="#0a1628" />

    <!-- Geo (se local/regional) -->
    <meta name="geo.region" content="BR" />
    <meta name="geo.placename" content="{{PAIS}}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="{{BRAND}}" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:title" content="{{TITLE}}" />
    <meta property="og:description" content="{{DESCRIPTION}}" />
    <meta property="og:url" content="{{SITE_URL}}/" />
    <meta property="og:image" content="{{OG_IMAGE_URL}}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{TITLE}}" />
    <meta name="twitter:description" content="{{DESCRIPTION}}" />
    <meta name="twitter:image" content="{{OG_IMAGE_URL}}" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

> Em SPA (Vite/React) use `react-helmet-async` para setar title/description/canonical
> por rota. Em Next.js use a Metadata API ou `next-seo`.

---

## 4. Dados estruturados (JSON-LD) — os que mais rendem

Cole dentro de `<script type="application/ld+json">`. Escolha os aplicáveis.

### Organization (marca — em toda página ou no home)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{{BRAND}}",
  "url": "{{SITE_URL}}",
  "logo": "{{SITE_URL}}/logo.png",
  "description": "{{DESCRIPTION}}",
  "areaServed": { "@type": "Country", "name": "{{PAIS}}" },
  "sameAs": [
    "https://www.linkedin.com/company/SEU_PERFIL",
    "https://www.instagram.com/SEU_PERFIL"
  ]
}
```

### WebSite (habilita sitelinks / busca)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{BRAND}}",
  "url": "{{SITE_URL}}",
  "inLanguage": "pt-BR"
}
```

### FAQPage (altíssimo valor para SEO e GEO)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pergunta exatamente como o usuário digitaria?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resposta completa e auto-contida em 1-3 frases, com números quando possível."
      }
    }
  ]
}
```

### Article / BlogPosting (para conteúdo de blog)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{TITLE}}",
  "description": "{{DESCRIPTION}}",
  "image": "{{OG_IMAGE_URL}}",
  "datePublished": "AAAA-MM-DD",
  "dateModified": "AAAA-MM-DD",
  "author": { "@type": "Organization", "name": "{{BRAND}}" },
  "publisher": { "@type": "Organization", "name": "{{BRAND}}", "logo": { "@type": "ImageObject", "url": "{{SITE_URL}}/logo.png" } },
  "mainEntityOfPage": "{{SITE_URL}}/slug-do-post"
}
```

### BreadcrumbList (navegação)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "{{SITE_URL}}/" },
    { "@type": "ListItem", "position": 2, "name": "Seção", "item": "{{SITE_URL}}/secao" }
  ]
}
```

> Valide sempre em: https://validator.schema.org e no Rich Results Test do Google.

---

## 5. `robots.txt` (libera bots de IA — chave do GEO)

```
User-agent: *
Allow: /

# Motores de IA — explicitamente permitidos
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: {{SITE_URL}}/sitemap.xml
```

> Se **não** quiser que a IA use seu conteúdo para treino mas **quer** ser citado,
> a política é mais sutil (ex.: bloquear `GPTBot` mas liberar `OAI-SearchBot`).
> Para ganhar visibilidade em IA, o padrão é **liberar todos**.

---

## 6. `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>{{SITE_URL}}/</loc>
    <lastmod>AAAA-MM-DD</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- repita <url> para cada página -->
</urlset>
```

---

## 7. `llms.txt` (resumo do site para IAs — coloque na raiz)

Arquivo em markdown limpo na raiz (`/llms.txt`). Padrão emergente que alguns
crawlers de IA já consomem; e serve como "cartão de visita" legível.

```markdown
# {{BRAND}}

> Uma frase clara do que é o produto/empresa, para quem e o principal benefício.

## O que oferece
- Item 1 — descrição curta.
- Item 2 — descrição curta.

## Quem é
{{BRAND}} — quem faz, onde atua ({{PAIS}}), diferencial. Site: {{SITE_URL}}

## Perguntas frequentes
- **Pergunta?** Resposta auto-contida e direta.
- **Pergunta?** Resposta auto-contida e direta.

## Links
- Site: {{SITE_URL}}
- Contato: {{SITE_URL}}/contato
```

---

## 8. GEO — como escrever para ser citado por IA

1. **Conteúdo visível e semântico** (não só no schema). Se for SPA, tenha uma
   seção textual real na página (headings + parágrafos), ou use SSR/pré-render.
2. **Clareza de entidade**: deixe explícito em texto — **o que é**, **quem faz**,
   **para quem**, **onde atua**. IAs constroem "quem é você" a partir disso.
3. **Respostas auto-contidas**: cada resposta faz sentido sozinha (a IA cita sem
   precisar do resto da página). Frases afirmativas, diretas, com números.
4. **Títulos em forma de pergunta** que batem com prompts reais de usuário.
5. **Dados e especificidade**: números, passos, comparações. IA prefere fonte
   concreta a marketing vago.
6. **Autoridade / E-E-A-T**: autor claro, posição honesta (cite alternativas
   reais quando fizer sentido), datas de atualização, links para fontes.
7. **Consistência de marca** (NAP): mesmo nome, descrição e links em todo lugar
   (site, llms.txt, schema, redes) — reforça a entidade.

---

## 9. Medição

| Métrica | Onde | O que observa |
|---|---|---|
| Impressões / cliques orgânicos | Search Console | ranqueamento SEO |
| Consultas que trazem tráfego | Search Console | quais keywords pegam |
| Citações em IA | perguntar no ChatGPT/Perplexity/Gemini | presença GEO |
| CTR do resultado | Search Console | qualidade de title/description |
| Core Web Vitals | PageSpeed Insights | saúde técnica |
| Conversão da página | seu analytics | valor real do tráfego |

**Teste de GEO manual (mensal):** pergunte às IAs as long-tail do seu cluster 3
e veja se seu site aparece/é citado. É o "ranking" do GEO hoje.

---

## 10. Notas por stack

- **Vite + React (SPA):** `react-helmet-async` para meta por rota; coloque
  `robots.txt`, `sitemap.xml`, `llms.txt`, `og-image.png` em `public/`. Atenção:
  conteúdo só-JS indexa mal — tenha seção textual visível ou pré-render.
- **Next.js:** Metadata API (`generateMetadata`), `app/sitemap.ts`,
  `app/robots.ts`; SSR/SSG já entrega HTML pronto (ótimo para SEO/GEO).
- **Astro / sites estáticos:** melhor cenário — HTML puro, rápido, indexável.

---

## 11. Ordem de execução num projeto novo

1. Definir keywords (3 clusters).
2. Escrever `<title>` + `description` de cada página.
3. Colar o `<head>` template + JSON-LD aplicáveis.
4. Criar `robots.txt`, `sitemap.xml`, `llms.txt`, `og-image.png`.
5. Garantir conteúdo textual visível (seção FAQ + "o que é/quem faz").
6. Deploy → Search Console → enviar sitemap → solicitar indexação.
7. Medir mensalmente (SEO no Search Console, GEO perguntando às IAs).
```

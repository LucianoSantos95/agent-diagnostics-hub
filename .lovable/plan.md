# Ajustes Focus Indica

## 1. Header (canto superior esquerdo)
- Substituir o logo atual pelo novo ícone enviado (raio roxo/azul). Upload via `lovable-assets` → `src/assets/focus-icon.png.asset.json`.
- Texto ao lado: manter **"Focus Indica"** porém no formato compacto antigo (uma única "pílula" tipográfica, sem o azul separado em "Indica"). Vai virar texto único branco/cinza claro com peso 700.
- Logo + nome ficam dentro de um `<Link to="/">` (react-router) — clique volta ao menu principal (TelaAbertura, resetando o flow).
- Para resetar o flow ao clicar no logo, exponho um `resetDiagnostico()` no hook e o Header dispara um evento (ou usamos navegação + key reset na DiagnosticoPage).

## 2. Footer
- Aumentar logo de `height: 22px` para `height: 40px`.
- Ajustar gap/padding para acomodar o tamanho maior.

## 3. Botão "Feedback" + popup
- Abaixo do link "Case real" no card direito da TelaAbertura, adicionar botão "Deixar feedback".
- Ao clicar, abre `FeedbackDialog` (modal leve, mesmo padrão do `CaseRealDialog`) com 3 campos obrigatórios:
  - Nome (texto, max 100)
  - E-mail (validação)
  - Mensagem ("descreva aqui", textarea, max 1000)
- Validação client-side com Zod. Submit grava em nova tabela `feedbacks` no banco.

### Migration (nova tabela)
```sql
CREATE TABLE public.feedbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  mensagem text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.feedbacks TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.feedbacks TO authenticated;
GRANT ALL ON public.feedbacks TO service_role;
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert feedbacks" ON public.feedbacks FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth read feedbacks" ON public.feedbacks FOR SELECT TO authenticated USING (true);
```

## 4. Animação de ondulação (constante de fundo)
- Remover `CursorRipple` da TelaAbertura.
- Criar `BackgroundWaves` — componente fixo `position: absolute inset-0`, com 3-4 SVG/divs circulares em camadas que pulsam continuamente (keyframes `wave-pulse` escala 1→1.4 + opacidade), independente do mouse.
- **Aplicar em TODAS as telas do flow**: `TelaAbertura`, `TelaPerguntas`, `TelaAnalise`, `TelaResultado` recebem o mesmo `BackgroundWaves` + mesmos blobs animados + grid overlay (extraio para `<PageBackground />` reutilizável).

## 5. Tema Claro — correções de legibilidade
Em `src/index.css`, revisar tokens `.theme-claro`:
- `--page-bg`: gradiente suave azul-claro (`#f0f4ff → #e0e7ff`) em vez do branco puro
- `--text-primary`: `#0f172a` (forte contraste)
- `--text-secondary`: `#334155`
- `--text-muted`: `#475569`
- `--surface`: `rgba(255,255,255,0.85)` com `border: rgba(15,23,42,0.12)`
- Headings que usam `text-white` hardcoded em TelaAbertura: migrar para `color: var(--text-primary)` (atualmente ilegíveis no claro).
- Subtítulos/stats que usam `#93c5fd` ou `rgba(147,197,253,...)` hardcoded → trocar por `var(--text-secondary)`.
- Botão CTA: manter gradiente azul (funciona nos dois temas).
- `--logo-filter`: `none` no claro (logo preto sobre fundo claro).

## 6. Envio de PDF por e-mail (com domínio focusinteligente.com.br)
Fluxo: usuário digita e-mail em `CapturaEmail` → grava em `diagnostico_leads` → invoca edge function `send-diagnostico-pdf`.

### Infra
1. `setup_email_infra` (cria queue, suppression, etc.)
2. `scaffold_transactional_email` (cria send-transactional-email + handle-email-unsubscribe + template base) — usuário precisará completar setup do domínio `focusinteligente.com.br` (subdomínio `notify.focusinteligente.com.br` ou similar) via dialog `<presentation-open-email-setup>` se ainda não houver.

### Geração de PDF
- Edge function nova: `gerar-diagnostico-pdf/index.ts`
- Usa `npm:pdf-lib` no Deno para montar PDF server-side com:
  - Header com logo Focus (embed via base64 da asset)
  - Título "Seu Diagnóstico Focus Indica"
  - Categoria recomendada + descrição (props do payload)
  - As 7 respostas do usuário (lookup em `diagnostico_respostas` por session_id)
  - Cores brand (#2563eb, #1d4ed8)
  - Rodapé com CTA
- Retorna PDF bytes em base64.

### Novo template de e-mail
- `_shared/transactional-email-templates/diagnostico-resultado.tsx` — corpo curto: "Olá! Aqui está seu diagnóstico personalizado. PDF em anexo."
- **Atenção**: anexos não são suportados pelo sistema de email do Lovable. Solução: salvar o PDF em Supabase Storage (bucket `diagnosticos-pdf`, público com URL assinada) e enviar **link de download** no e-mail.

### Edge function `enviar-diagnostico`
- Recebe `{ session_id, email, categoria }`
- Gera PDF (chama `gerar-diagnostico-pdf` ou inline)
- Faz upload para Storage → obtém URL assinada (7 dias)
- Invoca `send-transactional-email` com `templateName: 'diagnostico-resultado'`, `templateData: { downloadUrl, categoria }`

### Cliente
- `CapturaEmail` atualizado para chamar `supabase.functions.invoke('enviar-diagnostico', { body: { session_id, email, categoria } })` após gravar lead.

## Arquivos
**Novos**: `src/assets/focus-icon.png.asset.json`, `src/components/BackgroundWaves.tsx`, `src/components/PageBackground.tsx`, `src/components/FeedbackDialog.tsx`, `supabase/functions/enviar-diagnostico/index.ts`, `supabase/functions/_shared/transactional-email-templates/diagnostico-resultado.tsx`.

**Editados**: `Header.tsx`, `Footer.tsx`, `index.css` (tema claro), `TelaAbertura.tsx` (botão feedback + PageBackground, remove CursorRipple), `TelaPerguntas.tsx` / `TelaAnalise.tsx` / `TelaResultado.tsx` (PageBackground), `CapturaEmail.tsx` (invoca edge function), `_shared/transactional-email-templates/registry.ts`.

**Removidos**: `CursorRipple.tsx`.

**Migrations**: 1 nova migration para tabela `feedbacks`.

**Infra email**: `setup_email_infra` + `scaffold_transactional_email` + (se necessário) dialog de setup do domínio.

## Ordem de execução
1. Migration `feedbacks`
2. Upload do ícone novo
3. UI: Header, Footer, PageBackground, BackgroundWaves, FeedbackDialog, tema claro
4. Setup email infra + scaffold transactional + dialog domínio (se necessário)
5. Template `diagnostico-resultado` + edge function `enviar-diagnostico` + storage bucket
6. CapturaEmail invoca a function
7. Deploy edge functions

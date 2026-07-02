## Objetivo
Enviar o guia completo do diagnóstico por e-mail usando a infraestrutura nativa de e-mail do Lovable, com um botão para baixar o PDF gerado (via Signed URL do bucket privado `diagnosticos-pdf`).

## Fluxo final
```text
Usuário conclui diagnóstico
        │
        ▼
Edge Function `enviar-diagnostico`
  1. Gera PDF (pdf-lib) com recomendação + respostas
  2. Sobe PDF no bucket privado `diagnosticos-pdf`
  3. Cria Signed URL (validade 7 dias)
  4. Invoca `send-transactional-email` com o template
        │
        ▼
Fila nativa (pgmq) → process-email-queue → entrega
        │
        ▼
Usuário recebe e-mail branded com:
  - Resumo do diagnóstico
  - Botão "Baixar guia completo (PDF)"
```

## Passos de implementação

1. **Infra de e-mail app (transacional)**
   - Rodar `email_domain--scaffold_transactional_email` para criar `send-transactional-email`, `handle-email-unsubscribe`, `handle-email-suppression` e o registry de templates.
   - Criar página de unsubscribe no path retornado pelo scaffold.

2. **Template React Email** em `supabase/functions/_shared/transactional-email-templates/diagnostico-guia.tsx`
   - Marca Focus Inteligente (cores/tipografia coerentes com o app, body `#ffffff`).
   - Preview text, saudação, resumo curto do resultado (nível/recomendação principal), botão "Baixar guia completo (PDF)" apontando para `downloadUrl`, aviso de validade do link (7 dias) e assinatura.
   - Props: `nome?`, `nivel`, `recomendacaoResumo`, `downloadUrl`.
   - Registrar em `registry.ts` como `diagnostico-guia`.

3. **Ajustar `enviar-diagnostico`**
   - Manter geração do PDF e upload no bucket `diagnosticos-pdf`.
   - Remover o envio antigo (com anexo/link improvisado).
   - Criar Signed URL de 7 dias (`storage.from('diagnosticos-pdf').createSignedUrl(path, 60*60*24*7)`).
   - Chamar `supabase.functions.invoke('send-transactional-email', { body: { templateName: 'diagnostico-guia', recipientEmail, idempotencyKey: \`diagnostico-\${sessionId}\`, templateData: { nome, nivel, recomendacaoResumo, downloadUrl } } })`.
   - Retornar `{ ok: true }` para o cliente (sem expor a URL).

4. **Cliente**
   - Nenhuma mudança de contrato: `CapturaEmail` continua chamando `enviar-diagnostico`. Apenas ajustar mensagem de sucesso ("Enviamos seu guia completo para o e-mail informado").

5. **Deploy + teste real**
   - Deploy das edge functions afetadas.
   - Disparar um envio de teste com um e-mail real fornecido pelo usuário e verificar entrega + link do PDF funcionando.

## Detalhes técnicos
- Bucket `diagnosticos-pdf` permanece privado; acesso ao PDF só pela Signed URL do e-mail.
- Idempotência por `sessionId` evita duplicidade se a Edge Function for reinvocada.
- Sem anexos (não suportado pela infra nativa) — usamos link assinado, que é o padrão recomendado.
- Sender: domínio `notify.diagnostico.focusinteligente.com.br` já configurado; se DNS ainda não estiver verificado, os e-mails ficam na fila e saem automaticamente após verificação.

## Fora de escopo
- Redesign do PDF em si.
- Mudanças em outras telas do diagnóstico.

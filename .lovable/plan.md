## O que muda

Hoje o feedback só existe como um modal acessível pela tela de abertura — na tela de resultado não há nada, então fica "escondido". Vou colocar uma **caixinha de feedback inline** que aparece automaticamente assim que o usuário desbloqueia o guia com o e-mail, posicionada logo antes do guia de implementação.

## Onde entra no fluxo

```text
[Email desbloqueado] ──► 📝 Caixinha de feedback (NOVO)
                    └─► 📋 Guia de implementação (accordion)
                    └─► 💰 Pergunta de orçamento
                    └─► 🎯 CTA comercial
```

## Como fica a caixinha

Um card compacto no mesmo estilo visual dos outros blocos da tela de resultado (mesma paleta, borda suave, `animate-fade-up`):

- Título curto: **"Como foi essa experiência pra você?"**
- Subtítulo de 1 linha explicando que ajuda a melhorar o diagnóstico
- Um `textarea` (mensagem, obrigatório, até 2000 chars)
- Botão **"Enviar feedback"**
- Após envio: colapsa em um estado de agradecimento discreto ("Recebido, obrigado 🙌"), sem sumir da tela

Nome e e-mail **não** são pedidos de novo — o e-mail já foi capturado no passo anterior, então reaproveito ele e uso "Diagnóstico" como nome padrão. Isso reduz atrito drasticamente vs. o modal atual (3 campos).

## Onde grava

Mesma tabela `feedbacks` que o `FeedbackDialog` já usa, mesmo schema (`nome`, `email`, `mensagem`) — só que preenchidos automaticamente com o contexto que já temos.

## Detalhes técnicos

- Novo componente `src/features/diagnostico/resultado/CaixaFeedback.tsx` recebendo `email: string` como prop.
- `TelaResultado.tsx`: guardar o e-mail no `useState` local no `CapturaEmail.onDesbloquear(email)` (mudar a assinatura para passar o e-mail) e renderizar `<CaixaFeedback email={emailCapturado} />` como primeiro filho do bloco desbloqueado, antes do accordion.
- `CapturaEmail.tsx`: `onDesbloquear` passa a receber o e-mail já validado.
- Validação com Zod no client antes do insert (mesmo padrão do `FeedbackDialog`).
- `FeedbackDialog` no rodapé/tela de abertura **continua existindo** — quem quiser deixar feedback antes de fazer o diagnóstico ainda pode.

## Fora de escopo

- Não vou mexer no design do `FeedbackDialog` existente.
- Não vou remover o acesso ao feedback pela tela de abertura.
- Sem nova tabela, sem edge function nova.

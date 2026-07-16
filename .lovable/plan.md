# Plano: Logo visível + Auditoria de coerência

## Parte 1 — Redesenhar logo (`src/assets/focus-indica-logo.svg`)

Problema: o logo atual usa `currentColor` com opacidades baixas (0.28–0.55) em traços finos (2–3px). Fica **quase invisível** no header (32–36px) e em fundos escuros.

Nova versão — mesma linguagem orbital, muito mais legível:

- **Núcleo dominante**: círculo central maior (raio 80 em vez de 46), gradiente indigo sólido (`#6366f1 → #4f46e5`), com halo suave para dar presença.
- **Órbita única, contínua e grossa**: um anel elíptico inclinado (~20°) com stroke 8px e opacidade 0.9 em `#a5b4fc` — desenho reconhecível a 16px.
- **2 partículas orbitais sólidas**: uma grande (`#f59e0b` âmbar — combina com o novo botão de feedback), uma pequena (`#818cf8`). Cores sólidas, sem opacidade.
- **Foco visual** ("Focus"): pequeno crosshair/mira sobre o núcleo, remetendo ao nome.
- **Sem `currentColor`** nos elementos principais — cores fixas garantem contraste em light e dark. Órbita externa decorativa fica em `currentColor` opacidade 0.2 (apenas ornamento).
- viewBox 0 0 512 512 mantido para não quebrar imports.

Resultado: leitura clara a partir de 20px, identidade "orbital + foco" preservada, harmoniza com a paleta indigo + âmbar já em uso.

## Parte 2 — Auditoria: perguntas ↔ conteúdo entregue

Vou revisar contra `recomendacao.ts` (motor), `TelaPerguntas.tsx` (6 perguntas) e a tela de resultado.

### Achados preliminares (a confirmar durante a auditoria)

1. **P6 nunca é usada.** A pergunta 6 ("Se desse certo, o que mudaria em 3 meses?") é coletada mas **não aparece em lugar nenhum do resultado**. Precisa ser usada — proposta: exibir em `BlocoPersonalizacao` como "Sua meta em 3 meses: …" e citar no `porque`.

2. **P5 só dispara `avisoToolsGenericas` para 1 das 3 opções.** "Uso algo hoje mas quero melhorar" e "Não, seria minha primeira vez" são ignoradas. Proposta: tom do texto se adapta (iniciante vs. já-usa).

3. **Divergência de enum P5 entre `TelaPerguntas` e a tool MCP** (`calcular-diagnostico.ts`):
   - Tela: "Não, seria minha primeira vez" / "Sim, testei mas não deu certo" / "Sim, uso algo hoje mas quero melhorar"
   - MCP: "Sim, testei mas não deu certo" / "Não, nunca tentei" / "Uso algumas coisas soltas"
   → o schema Zod da MCP rejeita respostas reais do site. Alinhar os dois.

4. **P2 (time) só influencia o `porque` de vendas/operacao/financeiro.** Em atendimento, `porqueBase` usa `fraseVolume` mas ignora `fraseTime` mesmo em cenários small-team. OK conceitualmente, mas vale citar time também.

5. **Regra de override (time pequeno + alto volume → atendimento)**: hoje sobrescreve silenciosamente. Proposta: manter override, mas incluir 1 linha no `porque` explicando por que virou atendimento mesmo tendo marcado outro gargalo — senão o usuário estranha.

6. **Novos blocos (Stack/Combinações/IA Geral)** não olham para P2/P3/P4 — são estáticos por categoria. Não é bug, mas a promessa "personalizado" pesa. Marcar como melhoria futura ou passar `p2/p3` para eles.

### Entregável da auditoria

Um arquivo `docs/AUDITORIA-PERGUNTAS.md` listando: cada pergunta → o que é feito hoje com a resposta → gaps → recomendação de fix (com prioridade Alta/Média/Baixa). **Sem alterar código do motor nessa etapa** — só o logo é modificado agora. Os fixes de motor ficam para uma próxima aprovação, para você decidir quais aplicar.

## Arquivos

- Editar: `src/assets/focus-indica-logo.svg`
- Criar: `docs/AUDITORIA-PERGUNTAS.md`

Ordem: 1) logo → 2) auditoria em markdown.

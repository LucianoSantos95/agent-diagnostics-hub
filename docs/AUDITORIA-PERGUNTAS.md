# Auditoria — Perguntas × Resultado entregue

Data: 2026-07-16
Escopo: `src/features/diagnostico/screens/TelaPerguntas.tsx`, `src/features/diagnostico/engine/recomendacao.ts`, `src/features/diagnostico/screens/TelaResultado.tsx` e blocos filhos, `src/lib/mcp/tools/calcular-diagnostico.ts`.

Legenda de prioridade: **[A]** Alta (quebra promessa de valor ou schema), **[M]** Média (melhoria clara de percepção), **[B]** Baixa (polimento).

---

## P1 — "Onde está o maior gargalo?"
- **Uso hoje:** define a `categoria` do resultado (atendimento / vendas / operacao / financeiro) via `P1_MAP`. Determina TODO o conteúdo entregue.
- **Gap:** override silencioso — quando P2 = "Só eu"/"2 a 5" **e** P3 = "Mais de 50", a categoria é forçada para `atendimento` mesmo se o usuário marcou outra coisa. O usuário não é avisado.
- **Recomendação [M]:** manter a regra (é boa), mas quando o override dispara, adicionar uma linha ao `porque`: _"Você marcou X como gargalo, mas com time pequeno e mais de 50 contatos/dia, o atendimento vira o freio real antes de qualquer outra coisa."_

## P2 — "Quantas pessoas trabalham com você?"
- **Uso hoje:** entra em `fraseTime` e é usada no `porque` das categorias **vendas / operacao / financeiro**. Também participa da regra de override (junto com P3).
- **Gap:** em `atendimento`, `fraseTime` é ignorada — só `fraseVolume` entra no `porque`. Os blocos novos (Stack, Combinações, IA Geral) não olham para P2.
- **Recomendação [M]:** incluir `fraseTime` também no `porque` de atendimento. **[B]** passar `p2` para `StackRecomendada` / `CombinacoesLogicas` para ajustar sugestões (ex.: "Só eu" → priorizar tools gratuitas; ">20 pessoas" → sugerir planos pagos e integração com CRM existente).

## P3 — "Quantas mensagens/contatos por dia?"
- **Uso hoje:** entra em `fraseVolume` (usado só no `porque` de `atendimento`) e participa do override para atendimento.
- **Gap:** volume é sinal forte também para **vendas** (muito lead = precisa de CRM com automação) e **operacao** (alto volume = ROI maior de automação). Hoje é ignorado nessas categorias.
- **Recomendação [M]:** citar `fraseVolume` também em vendas e operacao. Ajustar plano recomendado das ferramentas conforme volume.

## P4 — "Tarefa que mais consome seu tempo" (texto livre)
- **Uso hoje:** citada literalmente no `porque` (_'Você destacou "X" como…'_) e usada em `BlocoPersonalizacao`.
- **Gap:** nenhum crítico. Texto entra sem sanitização visível — se o usuário escrever algo muito longo, quebra o layout do `porque`.
- **Recomendação [B]:** truncar em ~120 caracteres com "…" ao inserir no `porque`. `BlocoPersonalizacao` pode manter o texto completo.

## P5 — "Já tentou alguma ferramenta de IA antes?"
- **Uso hoje:** apenas `"Sim, testei mas não deu certo"` liga a flag `avisoToolsGenericas` (que mostra a caixa amarela "Você já tentou antes"). As outras 2 opções não têm efeito.
- **Gaps:**
  1. **[A] Divergência de enum entre a tela e a MCP tool.**
     - Tela (`TelaPerguntas.tsx`): `"Não, seria minha primeira vez"` / `"Sim, testei mas não deu certo"` / `"Sim, uso algo hoje mas quero melhorar"`
     - MCP (`calcular-diagnostico.ts`): `"Sim, testei mas não deu certo"` / `"Não, nunca tentei"` / `"Uso algumas coisas soltas"`
     - O schema Zod da MCP rejeita 2 de 3 respostas reais do site. **Chamadas MCP com respostas reais quebram.**
  2. **[M]** As outras 2 opções (iniciante / já usa) não personalizam o tom.
- **Recomendação:**
  - **[A]** Alinhar o enum da MCP ao da tela (fonte da verdade = tela).
  - **[M]** Ramificar `comoComecar`/`porque` por perfil: iniciante → passos mais didáticos; já-usa → focar em integração e evolução; testou-e-falhou → manter aviso atual.

## P6 — "Se desse certo, o que mudaria em 3 meses?" (texto livre)
- **Uso hoje:** **NENHUM.** A resposta é coletada, salva no estado, mas nunca aparece em nenhuma tela nem entra no `calcularResultado`.
- **Gap [A]:** promessa quebrada — o usuário responde algo pessoal e não vê retorno. Além disso, é o sinal mais rico de motivação/ROI que temos.
- **Recomendação [A]:** exibir no topo do resultado (ou em `BlocoPersonalizacao`) como card destacado: _"Sua meta em 3 meses: **{p6}**"_ seguido de _"Esse agente é o caminho mais curto até lá porque…"_ (frase por categoria). Opcional: usar no e-mail transacional também.

---

## Blocos novos do resultado (Stack / Combinações / IA Geral)

- **Estado:** puramente estáticos por categoria. Não leem P2, P3, P4, P5 nem P6.
- **Impacto:** o resultado parece "template" após o hero. Contradiz a promessa de personalização anunciada em `BlocoPersonalizacao`.
- **Recomendação [M]:** injetar `p2` (tamanho) e `p3` (volume) em pelo menos `StackRecomendada` para modular o plano sugerido (grátis vs. pago) e a ordem das ferramentas. **[B]** citar P4 em `CombinacoesLogicas` como "no seu caso: {p4} → esta combinação resolve".

---

## Resumo priorizado

| Prioridade | Item | Onde |
| --- | --- | --- |
| **A** | P6 nunca é usada — exibir no resultado | `TelaResultado.tsx` + `recomendacao.ts` |
| **A** | Enum P5 divergente entre tela e MCP tool | `src/lib/mcp/tools/calcular-diagnostico.ts` |
| **M** | Override P1→atendimento silencioso — explicar no `porque` | `recomendacao.ts` |
| **M** | P5 (iniciante / já usa) sem efeito no tom | `recomendacao.ts` |
| **M** | P2/P3 subutilizadas fora do `porque` de atendimento/vendas | `recomendacao.ts` + blocos novos |
| **B** | Truncar P4 no `porque` para não quebrar layout | `recomendacao.ts` |
| **B** | Passar P2/P3/P4 para Stack/Combinações | blocos novos |

Nenhum código do motor foi alterado nesta auditoria — apenas o logo. Aguardando aprovação para aplicar os fixes acima.

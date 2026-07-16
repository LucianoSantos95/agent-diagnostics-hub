# Recomendação: aplicar os 2 fixes críticos + 2 melhorias de alto retorno

Priorizo o que dá mais valor com menor risco. Deixo de fora o que é polimento.

## Fix 1 — [A] Usar a P6 no resultado

Hoje ela é coletada e jogada fora. É o dado mais motivacional que temos.

- Adicionar card **"Sua meta em 3 meses"** logo abaixo do hero em `TelaResultado.tsx`, exibindo o texto do usuário entre aspas + uma ponte por categoria (ex.: *"Esse agente encurta o caminho porque libera as horas que hoje somem em atendimento repetitivo"*).
- Passar `respostas[6]` do `DiagnosticoFlow` até `TelaResultado` (já temos `respostas` lá — só usar).
- Também citar no `porque` do motor (uma linha adicional se P6 tiver conteúdo).

## Fix 2 — [A] Alinhar enum P5 entre tela e MCP tool

`src/lib/mcp/tools/calcular-diagnostico.ts` rejeita 2 de 3 respostas reais.

- Substituir o enum Z de P5 pelas 3 strings exatas de `TelaPerguntas.tsx`:
  - `"Não, seria minha primeira vez"`
  - `"Sim, testei mas não deu certo"`
  - `"Sim, uso algo hoje mas quero melhorar"`

## Fix 3 — [M] Explicar o override P1 → atendimento

Quando time pequeno + >50 contatos/dia força atendimento sobre outra escolha, o usuário fica confuso.

- Em `recomendacao.ts`, quando o override dispara, prefixar o `porque` com uma linha do tipo: *"Você marcou {gargaloOriginal}, mas com {p2} e {p3}, o atendimento vira o freio real antes de qualquer outra coisa — por isso o diagnóstico foi ajustado."*
- Guardar o `gargaloOriginal` antes de sobrescrever `categoria`.

## Fix 4 — [M] Ramificar tom por P5

Aproveitar as 3 respostas de P5, não só uma.

- `avisoToolsGenericas` continua ligado só para "testei mas não deu certo".
- Adicionar `perfilExperiencia: 'iniciante' | 'testou-falhou' | 'ja-usa'` no resultado.
- `comoComecar` ganha uma frase de abertura diferente por perfil (iniciante = mais didático; já-usa = focar em integração; testou-falhou = mantém aviso amarelo atual).

## O que fico fora de escopo (por enquanto)

- **[B]** Truncar P4 no `porque` — só entra se você reportar quebra de layout.
- **[B]** Passar P2/P3/P4 para Stack/Combinações/IA Geral — retorno menor, mexe em 3 componentes novos. Faz sentido em uma segunda rodada.

## Arquivos afetados

- `src/features/diagnostico/engine/recomendacao.ts` (P6, override, P5)
- `src/features/diagnostico/screens/TelaResultado.tsx` (card meta 3 meses)
- `src/lib/mcp/tools/calcular-diagnostico.ts` (enum P5)
- possivelmente `src/features/diagnostico/resultado/BlocoPersonalizacao.tsx` se fizer mais sentido colocar a meta lá em vez de card separado — decido durante a implementação.

## Ordem

1. Motor (`recomendacao.ts`) — adiciona `perfilExperiencia`, override explicado, uso de P6.
2. UI — card de meta 3 meses no resultado.
3. MCP tool — realinhar enum.
4. Verificar build.

Aprova essa fatia? Se quiser incluir os itens [B] também, é só dizer.  
Pode incluir os itens [B] também
## Escopo

Três ajustes pontuais reportados após a última rodada de auditoria.

---

### Ponto 1 — Contraste dos botões nas perguntas

**Problema:** os botões de resposta em `MultipleChoiceQuestion.tsx` e o botão "← Voltar" em `TelaPerguntas.tsx` usam cores fixas (`rgba(255,255,255,0.04)` de fundo, `#cbd5e1` de texto, borda branca translúcida). No tema escuro atual (fundo quase preto) o botão "não selecionado" fica praticamente invisível — baixo contraste entre a superfície do card e o botão.

**Correção:**
- Elevar o contraste do estado "não selecionado":
  - Fundo: `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.06)` sobre um card mais escuro, com **borda visível** `rgba(165,180,252,0.22)` (indigo suave) em vez da branca quase transparente.
  - Texto: passar de `#cbd5e1` para `#e2e8f0` e aumentar peso para `600`.
  - Adicionar `box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04)` para reforçar a borda no dark.
- Hover não-selecionado: subir para `rgba(79,70,229,0.10)` + borda `rgba(79,70,229,0.4)` — mesma linguagem do estado selecionado, só que atenuada.
- Aplicar o mesmo tratamento ao botão "← Voltar" (mesmo motivo: hoje fica quase invisível ao lado do CTA principal).

Arquivos:
- `src/features/diagnostico/questions/MultipleChoiceQuestion.tsx`
- `src/features/diagnostico/screens/TelaPerguntas.tsx` (só o botão Voltar)

---

### Ponto 2 — Guias práticos abrem no meio da página

**Problema:** os cards de "Guias práticos para PMEs" (em `ConteudoSEO.tsx`) usam `<Link>` do React Router. Como o React Router **não** rola para o topo em troca de rota, o usuário chega em `/chatbot-para-empresas` (e demais) no mesmo offset vertical em que estava antes — o que dá a sensação de "abriu no fim do guia".

**Correção:** adicionar um componente `ScrollToTop` global.

- Criar `src/components/ScrollToTop.tsx`:
  - Usa `useLocation()` para escutar `pathname`.
  - `useEffect` chama `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })`.
- Montar em `src/App.tsx` como filho direto do `<BrowserRouter>`, antes das `<Routes>`.

Isso resolve também qualquer futura navegação para outras rotas do app.

---

### Ponto 3 — Só citar o agente quando as respostas justificarem

**Problema atual em `engine/recomendacao.ts`:** o motor **sempre** produz um `titulo` no formato "Agente de Atendimento / Vendas / Operação / Financeiro" e o `porque` sempre cita o agente pelo nome, mesmo quando:
- A P4 (tarefa que mais consome) contradiz a P1 (ex.: P1 = atendimento, P4 = "fechamento contábil");
- A P5 indica "já uso algo hoje" numa categoria diferente da P1;
- O override de atendimento (time enxuto + volume >50) é acionado com P1 apontando outro gargalo — hoje só reescreve o texto, mas continua **empurrando o nome do agente**.

Isso viola a diretriz de que o agente só deve ser citado nominalmente quando o conjunto de respostas for coerente.

**Correção — introduzir um nível de "confiança" no diagnóstico:**

1. **Calcular `confianca: 'alta' | 'media' | 'baixa'`** em `calcularResultado`:
   - Sinais que somam confiança: P4 contém palavras-chave da categoria (dicionário simples por categoria: atendimento → "responder, cliente, whatsapp, dm"; vendas → "lead, follow, proposta, cobrar resposta"; operação → "planilha, relatório, dado, cadastro"; financeiro → "cobrança, boleto, caixa, inadimplente"); P2/P3 coerentes com o padrão da categoria; P5 na mesma linha.
   - `alta`: 2+ sinais fortes alinhados com P1.
   - `media`: P1 claro mas P4 vago ou neutro.
   - `baixa`: P1 conflita com P4/override, ou P4 vazio/curto demais.

2. **Nomear o agente só em `alta`:**
   - `alta` → `titulo` = "Agente de X" (comportamento atual).
   - `media` → `titulo` = "Prioridade: X" (ex.: "Prioridade: atendimento ao cliente"), e o `porque` fala de "uma frente de automação em X", **sem** vender o "agente" ainda.
   - `baixa` → `titulo` = "Diagnóstico exploratório: X é a hipótese inicial", `porque` explica quais respostas soaram conflitantes e sugere validar antes de escolher a ferramenta. Não cita "Agente de X".

3. **Refletir a confiança na UI (`TelaResultado.tsx`):**
   - Passar `confianca` para o hero e mostrar um selo pequeno no corner mark (hoje "Diagnóstico · 01"): "Confiança alta / média / a validar".
   - Em `media`/`baixa`, esconder o bloco "Stack completa para essa categoria" e "Combinações lógicas" — eles pressupõem certeza. Manter apenas "Ferramentas para começar agora" e "IA de uso geral" (que já são úteis independentemente da categoria).
   - `CTAComercial` continua aparecendo, mas com copy alternativa em `baixa` ("quer que a gente valide contigo antes de recomendar ferramenta?").

4. **Ajustar a MCP tool (`calcular-diagnostico.ts`)** para expor `confianca` no `structuredContent`.

5. **Documentar a regra em `docs/AUDITORIA-PERGUNTAS.md`** (uma seção "Regras de citação do agente").

Arquivos:
- `src/features/diagnostico/engine/recomendacao.ts` (lógica principal + campo novo)
- `src/features/diagnostico/screens/TelaResultado.tsx` (selo + esconder blocos condicionais)
- `src/lib/mcp/tools/calcular-diagnostico.ts` (schema de saída)
- `docs/AUDITORIA-PERGUNTAS.md` (nota curta)

---

## Fora de escopo

- Não vou refazer o design geral do resultado nem tocar em textos que já foram aprovados na auditoria anterior.
- Não vou mexer no tema claro/escuro global — só nos dois componentes de baixo contraste apontados.
- Não vou adicionar novas perguntas ao diagnóstico; a lógica de confiança usa apenas as 6 já existentes.

## Detalhes técnicos

```text
calcularResultado(respostas)
  ├─ categoria = P1_MAP[P1]  (com override existente)
  ├─ sinais = analisarSinais(p1, p2, p3, p4, p5)
  │     ├─ p4KeywordMatch(categoria, p4) → 0/1/2
  │     ├─ overrideAtendimento ativo → -1
  │     └─ p4.length < 15 → -1
  ├─ confianca = classificar(sinais)
  └─ titulo/porque montados conforme confianca
```

O dicionário de keywords fica no próprio arquivo (constante), sem dependência nova.

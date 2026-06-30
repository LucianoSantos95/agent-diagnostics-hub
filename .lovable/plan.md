# Plano de ajustes — Focus Indica

## 1. Renomeação global
Substituir todas as ocorrências de "FocusCustom" / "Focus Custom" por **"Focus Indica"** (Header, Footer, `index.html` title/meta se aplicável, qualquer copy interna).

## 2. Logo da marca (imagem enviada)
- Salvar a logo "Focus" enviada como asset via lovable-assets (`src/assets/focus-logo.png.asset.json`).
- **Header**: trocar o ícone atual (check em gradiente azul/roxo) pela imagem da logo Focus. Em tema escuro, aplicar `filter: invert(1)` para manter legibilidade (logo é preta).
- **Footer**: substituir o bloco `FocusCustom` (SVG check + texto) pela mesma logo Focus clicável, mantendo o link e o texto "Um produto criado pela".

## 3. Seletor de tema (claro / escuro / padrão)
- Ícone de lâmpada (`Lightbulb` do lucide-react) ao lado do título "Diagnóstico Gratuito" no Header.
- Click abre dropdown com 3 opções: **Claro**, **Escuro**, **Padrão** (atual — azul-marinho profundo).
- Implementação:
  - Criar `src/contexts/ThemeContext.tsx` com estado `'claro' | 'escuro' | 'padrao'`, persistido em `localStorage`.
  - Aplicar classe no `<html>` (`theme-claro`, `theme-escuro`, `theme-padrao`).
  - Refatorar `src/index.css` com tokens HSL por tema (background, foreground, card, muted, accent, border).
  - **Importante**: hoje os componentes (TelaResultado, Footer, etc.) usam cores hardcoded em `style={{...}}` (`#070f1e`, `#cbd5e1`, `rgba(...)`). Vou migrar essas cores para variáveis CSS (`var(--bg-base)`, `var(--text-primary)` etc.) para que reajam à troca de tema. Escopo: arquivos das telas do diagnóstico + Header + Footer.
- Padrão inicial: **Padrão** (visual atual).

## 4. Animação de ripple no cursor (tela inicial)
- Componente `CursorRipple` montado apenas em `TelaAbertura`.
- Em `mousemove`, throttle (~80ms), cria um `<span>` posicionado no ponto do cursor com keyframe `ripple` (scale 0→4, opacity 0.4→0) duração ~900ms, então remove.
- Cor da onda usa token de tema (sutil — `rgba(var(--accent-rgb), 0.15)`).
- Pointer-events none, z-index baixo, não interfere com cliques.

## 5. Popup "Case Real"
- Localizar botão/link "Case Real" (presumível em `TelaAbertura` ou `CTAComercial` — confirmar na implementação).
- Usar `Dialog` do shadcn.
- Conteúdo: 3 cards de depoimento placeholder marcados com `[EDITAR — nome]`, `[EDITAR — empresa]`, `[EDITAR — depoimento]`, com avatar circular cinza, estrelas e citação. Comentário no topo do array: `// TODO: substituir pelos depoimentos reais`.

## 6. Banco de dados (migração)
Aplicar exatamente o SQL fornecido pelo usuário, com os ajustes obrigatórios da plataforma:
- Adicionar `GRANT` statements antes de habilitar RLS:
  - `GRANT INSERT, UPDATE ON ... TO anon` (policies permitem anon insert/update).
  - `GRANT ALL ON ... TO service_role` em todas as três tabelas.
  - `GRANT SELECT, INSERT, UPDATE, DELETE ... TO authenticated` (para futuro dashboard).
- Manter `CHECK (pergunta_numero BETWEEN 1 AND 7)`, índices, FKs e policies como enviadas.
- Ordem: CREATE TABLE → GRANT → ENABLE RLS → CREATE POLICY → CREATE INDEX.
- Tabelas já são referenciadas em `useDiagnostico.ts` (`diagnostico_sessions`, `diagnostico_respostas`, `diagnostico_leads`), então após a migração os inserts existentes passam a funcionar.

## Detalhes técnicos
- **Stack**: nenhuma dependência nova exceto possivelmente confirmar shadcn `Dialog` já instalado.
- **Tokens de tema** (HSL em `index.css`):
  - `padrao`: bg `220 60% 6%`, fg `213 95% 85%`, accent `217 91% 60%`
  - `escuro`: bg `0 0% 4%`, fg `0 0% 95%`, accent `217 91% 60%`
  - `claro`: bg `0 0% 100%`, fg `222 47% 11%`, accent `217 91% 55%`
- **Arquivos a editar**: `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/features/diagnostico/screens/TelaAbertura.tsx`, `TelaResultado.tsx`, `src/index.css`, `src/App.tsx` (envolver com ThemeProvider).
- **Arquivos novos**: `src/contexts/ThemeContext.tsx`, `src/components/ThemeToggle.tsx`, `src/components/CursorRipple.tsx`, `src/components/CaseRealDialog.tsx`, `src/assets/focus-logo.png.asset.json`.
- **Migração Supabase**: uma única chamada com o SQL completo + grants.

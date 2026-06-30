# Ajustes finos — Focus Indica

## 1. Novo logo no header (similar ao site focusinteligente.com.br)
O site da Focus usa um símbolo limpo e minimalista no estilo monoline com o nome "focus" em peso leve. Vou:

- Gerar um ícone novo via `imagegen` (PNG transparente, ~512×512) no estilo do site: símbolo geométrico minimalista azul/branco, traço fino, fundo limpo.
- Subir como asset (`src/assets/focus-mark.png.asset.json`) e substituir o ícone atual no `Header.tsx`.
- Manter o tamanho ~32px de altura no header.

## 2. Texto "Focus Indica" em Montserrat Alternates
- Instalar a fonte: `bun add @fontsource/montserrat-alternates` (pesos 600 e 700).
- Importar em `src/main.tsx`: `import '@fontsource/montserrat-alternates/600.css'` e `/700.css`.
- Aplicar `fontFamily: '"Montserrat Alternates", sans-serif'` somente no `<span>` do nome no `Header.tsx`, peso 700, mantendo o tracking atual.

## 3. Rodapé mais compacto
Em `src/components/Footer.tsx`:
- Logo: `height: 80` → `height: 44`.
- Padding: `28px 24px` → `14px 24px`.
- Gap: `14` → `10`.
- Tamanho do texto "Um produto criado pela": `14` → `13`.

Resultado: rodapé fica numa faixa fina, sem dominar a tela.

## 4. Ondas de fundo mais visíveis
Em `src/index.css`, aumentar a opacidade dos tokens `--wave-color-*` nos três temas (mantendo a paleta de cada um):

- **Padrão (azul escuro)**: `--wave-color-1` 0.18 → 0.42, `--wave-color-2` 0.14 → 0.34, `--wave-color-3` 0.10 → 0.28.
- **Escuro**: 0.06 → 0.18, 0.05 → 0.15, 0.04 → 0.13 (sutil, mas perceptível no preto).
- **Claro**: 0.18 → 0.32, 0.14 → 0.26, 0.12 → 0.22.

Também reduzir o `blur` das ondas de `40px` → `30px` em `.bg-wave` para os contornos ficarem mais definidos sem perder o efeito suave, e aumentar o pico do `wave-pulse` de `opacity 0.95` → `1` e escala `1.35` → `1.45`.

## Arquivos
- **Novos**: `src/assets/focus-mark.png.asset.json`
- **Editados**: `src/main.tsx` (import da fonte), `src/components/Header.tsx` (novo ícone + fonte), `src/components/Footer.tsx` (compactar), `src/index.css` (opacidade das ondas + keyframe).
- **Removidos**: `src/assets/focus-icon.png.asset.json` (antigo, substituído).

## Sem mudanças
Lógica do diagnóstico, PDF, feedback, autenticação — nada disso é tocado nesta rodada.

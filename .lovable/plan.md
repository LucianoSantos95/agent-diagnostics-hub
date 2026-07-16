# Plano: Animar o logo

Animação sutil, contínua, respeitando a linguagem orbital. Não distrai, não pesa em performance (só CSS transforms + opacity).

## Efeitos

1. **Órbita principal (anel elíptico inclinado)** — rotação lenta e contínua (~24s por volta). Gira o grupo inteiro, então as duas partículas (âmbar e indigo claro) orbitam junto naturalmente.
2. **Núcleo** — pulso sutil de escala (1 → 1.04 → 1) em ~3.5s, com o halo pulsando em opacidade acompanhando. Dá sensação de "vida".
3. **Crosshair (mira do foco)** — piscada leve (opacidade 0.7 ↔ 1) sincronizada com o pulso do núcleo, reforçando o conceito "focus indica".
4. **Órbita externa decorativa (tracejada)** — rotação inversa muito lenta (~40s) só pra criar profundidade.
5. **Hover / no header** — ao passar o mouse no header, a velocidade da rotação principal acelera (~8s) usando `animation-duration` via classe extra. Toque de interatividade sem exagero.
6. **Respeita `prefers-reduced-motion`** — se o usuário tiver movimento reduzido, tudo fica estático. Regra padrão de acessibilidade.

## Onde mora o código

- Adicionar `@keyframes` (`fi-spin`, `fi-spin-reverse`, `fi-pulse-core`, `fi-blink`) em `src/index.css` como utilitários dedicados (prefixo `fi-` pra não colidir com o resto).
- Converter `src/assets/focus-indica-logo.svg` num componente React `src/components/FocusIndicaLogo.tsx` (mesmo path visual, com `className` nos grupos animáveis). Isso permite classes CSS por elemento — não dá pra fazer isso com `<img src=".svg" />`.
- Atualizar `src/components/Header.tsx` para usar `<FocusIndicaLogo />` em vez do `<img>` atual. Grupo com `.fi-logo-root` recebe a classe `fi-hover` no hover do header.
- `respects prefers-reduced-motion` via `@media (prefers-reduced-motion: reduce)` em `index.css`.

## Arquivos

- Criar: `src/components/FocusIndicaLogo.tsx`
- Editar: `src/index.css` (keyframes + classes)
- Editar: `src/components/Header.tsx` (trocar `<img>` por `<FocusIndicaLogo />`)
- Manter: `src/assets/focus-indica-logo.svg` (fica como fallback para OG/e-mail, onde não roda JS)

## Fora de escopo
- Animações Motion/GSAP com física complexa — CSS puro é mais leve e suficiente pra logo de header.
- Interações de scroll no logo — o header já encolhe/comprime na rolagem.

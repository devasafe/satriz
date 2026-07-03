# Satriz — Home como jornada 3D (scroll-driven)

A home inteira é **uma experiência 3D contínua**. Um objeto (o "blob" âmbar) é o
**fio condutor**: ele se move e se transforma conforme o scroll, e cada cena
tem seu próprio **tipo de movimento** + conteúdo sobreposto (HTML).

## Arquitetura
- Um único `<Canvas>` dentro de um **trilho alto** (`sticky` segura a cena enquanto rola).
- Um `progress` global (0→1) calculado do scroll (sem re-render — via `useRef`).
- Cada cena ocupa uma **faixa** do progress; usamos **`smoothstep(start, end, p)`**
  pra animar posição/escala/opacidade com suavidade.
- Overlays HTML (textos, formulário) posicionados por cima, com opacidade dirigida
  pelas faixas.

## Storyboard (o roteiro)

| # | Cena | Movimento do blob | Conteúdo | Status |
|---|------|-------------------|----------|--------|
| 1 | Abertura | pulsa no centro + segue mouse | Manifesto "Um clube de gente que cria coisas" | 🔨 a fazer |
| 2 | Studio | desliza p/ esquerda | "Satriz Studio — mais que Software House" | ✅ feito |
| 3 | Serviços | encolhe ao centro, serviços **orbitam** | Sites · Sistemas · E-commerce · Automações | ⬜ |
| 4 | Processo | **viaja em zigue-zague** por 4 pontos | Briefing → Design → Dev → No ar | ⬜ |
| 5 | A visão | **ramifica em 3 mini-blobs** (matriz) | Software, editorial e moda sob uma marca só | ⬜ |
| 6 | Portfólio | vira fundo, cards deslizam por cima | Projetos (Guedes, Corretores…) | ⬜ |
| 7 | FAQ | vai pro canto, perguntas abrem do lado | Dúvidas comuns | ⬜ |
| 8 | Contato | **explode/estilhaça → vira formulário** | Form de orçamento (nome, contato, msg) | ⬜ |
| — | Chamada | desliza p/ direita | CTA "Faça o seu orçamento" | ✅ feito |

> A cena "Chamada" (CTA) pode virar a ponte pro Contato (cena 8): o CTA aparece,
> e ao rolar mais o blob explode no formulário.

## Princípio de construção
Incremental, **uma cena por vez** — a mesma abordagem que funcionou. Cada cena
nova = uma faixa de `smoothstep` + seu overlay. Refatorar pra "sistema de cenas"
quando o `if/else` do blob ficar grande demais.

## Componente
`components/Scene3D.tsx` — client, R3F (`three` + `@react-three/fiber` + `@react-three/drei`).

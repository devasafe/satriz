# Multi-página + Intro/Pop-up + Página de Criador — Design

**Data:** 2026-07-02
**Projeto:** satriz (Next.js App Router)

## Objetivo

Transformar o site one-pager em multi-página (rotas do Next), adicionar uma
intro de entrada (splash) que também mascara o tempo de carregamento, um pop-up
"É um criador?" e uma nova página `/criador` com formulário funcional.

## Escopo

1. Reestruturar as seções atuais em páginas (App Router).
2. Mover a moldura compartilhada (Nav, Footer, WhatsAppFab) para o layout raiz.
3. Intro splash + pop-up "É um criador?" (1x por aba / sessionStorage).
4. Nova página `/criador` reutilizando o formulário que hoje vive no Scene3D,
   ligada ao backend de leads.
5. Limpeza da cena final do Scene3D (remover form fake / id duplicado).

Fora de escopo: redesenho de seções, novo model de banco, autenticação de criador.

## 1. Arquitetura multi-página (App Router)

Moldura compartilhada movida de `app/page.tsx` para `app/layout.tsx`:
`Nav`, `Footer`, `WhatsAppFab` passam a renderizar em todas as rotas.

Mapa de rotas (reutilizando os componentes de seção existentes, sem reescrevê-los):

| Rota | Conteúdo |
|---|---|
| `/` (home) | `Scene3D` (intro 3D) + `Hero` + `ProofBar` |
| `/servicos` | `Servicos` + `PorQue` + `Processo` (âncora `#processo`) |
| `/projetos` | `Trabalho` |
| `/contato` | `Orcamento` + `Faq` |
| `/criador` | **nova** — pitch + formulário de criador (ver §3) |

Detalhes:
- Home mantém as transições de reveal opacas: `Scene3D → Hero → ProofBar`.
- Páginas internas ganham espaçamento no topo para não ficarem sob a Nav fixa
  (as seções hoje usam `border-t`/padding próprios; adicionar wrapper com
  `pt` suficiente para compensar o header fixo).
- Nav troca âncoras por rotas via `NAV_LINKS` (lib/data.ts):
  Serviços → `/servicos`, Projetos → `/projetos`, Contato → `/contato`.
  "Processo" vira âncora dentro de `/servicos` (`/servicos#processo`).
  CTA "Faça o seu orçamento" → `/contato`. Usar `next/link` para navegação client-side.

## 2. Intro (splash) + pop-up

Componente client `EntryGate` renderizado no layout raiz (cobre a entrada no site).

Comportamento:
- Ao montar: lê `sessionStorage["satriz:entered"]`.
  - Se presente → não faz nada (vai direto pro conteúdo).
  - Se ausente → exibe o **splash** (overlay `fixed inset-0`, z alto) com o
    monograma Satriz animado + indicador sutil de carregando.
- O splash permanece pelo **maior** entre: (a) tempo mínimo (~1.6–2s) e
  (b) evento `window load` — é o que "ganha tempo" para o 3D carregar.
- Ao terminar o splash → exibe o **pop-up "É um criador?"** (modal centralizado,
  com backdrop) e botões **Sim** / **Não**:
  - **Sim** → `router.push("/criador")` + grava a flag.
  - **Não** → fecha (fade-out) e mostra a home + grava a flag.
- Grava `sessionStorage["satriz:entered"] = "1"` ao concluir → não repete na
  mesma aba (reaparece se fechar/reabrir a aba).
- `prefers-reduced-motion`: sem animações; splash mínimo (ou pula direto pro pop-up).
- Acessibilidade: foco preso no modal, fechar com Esc = "Não", `aria` adequados.

Notas de implementação:
- Como o splash lê `sessionStorage`, renderizar só no cliente (evitar mismatch de
  hidratação): montar via `useEffect`/estado `mounted` antes de decidir exibir.

## 3. Página `/criador`

- Pitch curto convidando criadores (dev/designer/editor/estilista), no tom do
  `ClubMini`.
- **Formulário reutilizado do Scene3D** (cena final): campos nome, contato,
  "conta sua ideia" (mensagem). Extrair o markup do form num componente
  compartilhado (ex.: `components/CriadorForm.tsx` ou `LeadForm` genérico) e
  torná-lo funcional.
  - Título/copy adaptados ao contexto de criador (não "Faça o seu seu orçamento").
  - Envio: `POST /api/lead` com `{ nome, contato, mensagem, origem: "criador" }`.
  - Estados: idle / enviando / ok / erro (mesmo padrão do `Orcamento`).

### Backend
- `lib/models/Lead.ts`: adicionar `"criador"` ao enum de `origem`
  (`["orcamento", "club", "criador"]`).
- `app/api/lead/route.ts`: aceitar `origem === "criador"` (hoje força
  orcamento/club). Sem novos campos de schema.
- Leads de criador aparecem no `/admin` existente (origem "criador").

## 4. Limpeza do Scene3D

Como o formulário passa para `/criador` e `/contato` é o contato real:
- Remover o form fake da cena final (o `id="contato"` duplicado some).
- Manter o painel laranja subindo, terminando com **título + 2 botões**:
  - **Faça o seu orçamento** → `/contato`
  - **Sou criador** → `/criador`
- Ajustar a lógica de `rise`/overlays da cena final conforme necessário.

## Pré-requisito de implementação

O `AGENTS.md` avisa que esta versão do Next difere do conhecido. **Antes de
escrever roteamento/layout**, ler os guias relevantes em
`node_modules/next/dist/docs/` (App Router, `layout`, navegação com `next/link`,
`metadata`).

## Critérios de sucesso

- Navegar entre `/`, `/servicos`, `/projetos`, `/contato`, `/criador` com Nav
  funcional e moldura (Nav/Footer/WhatsApp) em todas.
- Ao entrar (1ª vez na aba): splash aparece, some após carregar, pop-up pergunta
  "É um criador?"; Sim → `/criador`, Não → home; não repete na mesma aba.
- `/criador` envia e persiste um lead com `origem: "criador"` (visível no `/admin`).
- Sem `id="contato"` duplicado; build/typecheck limpos.

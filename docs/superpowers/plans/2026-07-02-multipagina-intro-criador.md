# Multi-página + Intro/Pop-up + Página de Criador — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reestruturar o site one-pager em multi-página (App Router), com intro splash + pop-up "É um criador?" e uma página `/criador` com formulário funcional.

**Architecture:** Moldura compartilhada (Nav/Footer/WhatsAppFab) vai pro `app/layout.tsx`. Cada grupo de seções vira uma rota. Um `EntryGate` client no layout mostra splash + pop-up 1x por aba. O `/criador` reaproveita o formulário do Scene3D, agora ligado ao `/api/lead` com `origem: "criador"`.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind, Mongoose/MongoDB.

## Global Constraints

- **Esta versão do Next difere do conhecido.** Antes de escrever roteamento/layout/navegação, LER os guias em `node_modules/next/dist/docs/` (App Router, `layout`, `next/link`, `next/navigation`, `metadata`). Heed deprecation notices.
- **Sem runner de testes** no projeto e **não é repositório git**. Portão de verificação de cada tarefa = `npx tsc --noEmit` limpo + verificação manual no `npm run dev` (e `npm run build` na tarefa final). Não há passo de commit.
- Responder/copy sempre em **português** com acentuação correta.
- Reaproveitar componentes existentes; não reescrever seções.
- Cores/tokens via classes Tailwind já existentes (`bg-ink`, `text-bone`, `bg-flush`, `border-line`, `.shell`, `.eyebrow`, `.input`).

---

### Task 1: Moldura no layout + home reduzida

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: componentes `Nav`, `Footer`, `WhatsAppFab`, `Scene3D`, `Hero`, `ProofBar` (já existem).
- Produces: `/` renderizando Scene3D + Hero + ProofBar; Nav/Footer/WhatsApp presentes em todas as rotas via layout.

- [ ] **Step 1: Ler o guia do App Router/layout desta versão do Next**

Ler os arquivos relevantes em `node_modules/next/dist/docs/` sobre `layout`, componentes compartilhados e `metadata`. Confirmar a assinatura de `RootLayout({ children })` e onde montar chrome persistente.

- [ ] **Step 2: Mover a moldura para o layout raiz**

Em `app/layout.tsx`, importar e renderizar a moldura dentro do `<body>`, envolvendo `{children}`:

```tsx
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
```

```tsx
      <body className="grain min-h-screen bg-ink font-sans text-bone">
        <Nav />
        {children}
        <Footer />
        <WhatsAppFab />
      </body>
```

- [ ] **Step 3: Reduzir `app/page.tsx` ao conteúdo da home**

Substituir o conteúdo inteiro de `app/page.tsx` por (mantém as transições de reveal opacas Scene3D→Hero→ProofBar):

```tsx
import Hero from "@/components/Hero";
import Scene3D from "@/components/Scene3D";
import ProofBar from "@/components/ProofBar";

export default function Home() {
  return (
    <main>
      {/* Camada 0 — experiência 3D (fica parada no último frame durante o hold). */}
      <div className="relative z-0">
        <Scene3D />
      </div>

      {/* Camada 1 — Hero sobe cobrindo o 3D e fica parada. */}
      <div className="sticky top-0 z-10 -mt-[100svh] min-h-screen bg-ink shadow-[0_-24px_60px_rgba(0,0,0,0.55)]">
        <Hero />
      </div>

      {/* Camada 2 — ProofBar sobe por cima da Hero. */}
      <div className="relative z-20 bg-ink shadow-[0_-24px_60px_rgba(0,0,0,0.55)]">
        <ProofBar />
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0, sem erros.

- [ ] **Step 5: Verificar no dev server**

Run: `npm run dev` e abrir `http://localhost:3000`.
Expected: home mostra a intro 3D + Hero + ProofBar; Nav no topo, Footer e botão de WhatsApp presentes.

---

### Task 2: Páginas de rota /servicos, /projetos, /contato

**Files:**
- Create: `app/servicos/page.tsx`
- Create: `app/projetos/page.tsx`
- Create: `app/contato/page.tsx`

**Interfaces:**
- Consumes: `Servicos`, `PorQue`, `Processo`, `Trabalho`, `Orcamento`, `Faq` (já existem).
- Produces: rotas `/servicos`, `/projetos`, `/contato`. Cada página usa `<main className="pt-28 md:pt-32">` para não ficar sob a Nav fixa.

- [ ] **Step 1: Criar `app/servicos/page.tsx`**

```tsx
import type { Metadata } from "next";
import Servicos from "@/components/Servicos";
import PorQue from "@/components/PorQue";
import Processo from "@/components/Processo";

export const metadata: Metadata = { title: "Serviços — Satriz Club" };

export default function ServicosPage() {
  return (
    <main className="pt-28 md:pt-32">
      <Servicos />
      <PorQue />
      <Processo />
    </main>
  );
}
```

- [ ] **Step 2: Criar `app/projetos/page.tsx`**

```tsx
import type { Metadata } from "next";
import Trabalho from "@/components/Trabalho";

export const metadata: Metadata = { title: "Projetos — Satriz Club" };

export default function ProjetosPage() {
  return (
    <main className="pt-28 md:pt-32">
      <Trabalho />
    </main>
  );
}
```

- [ ] **Step 3: Criar `app/contato/page.tsx`**

```tsx
import type { Metadata } from "next";
import Orcamento from "@/components/Orcamento";
import Faq from "@/components/Faq";

export const metadata: Metadata = { title: "Contato — Satriz Club" };

export default function ContatoPage() {
  return (
    <main className="pt-28 md:pt-32">
      <Orcamento />
      <Faq />
    </main>
  );
}
```

- [ ] **Step 4: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 5: Verificar rotas no dev**

Abrir `/servicos`, `/projetos`, `/contato`.
Expected: cada rota mostra suas seções abaixo da Nav (sem ficar cortada pelo header); `/servicos#processo` rola até o Processo.

---

### Task 3: Nav com rotas (next/link)

**Files:**
- Modify: `lib/data.ts` (NAV_LINKS)
- Modify: `components/Nav.tsx`

**Interfaces:**
- Consumes: `NAV_LINKS` (agora com hrefs de rota).
- Produces: navegação client-side via `next/link` para `/servicos`, `/projetos`, `/contato`, `/criador`, `/`.

- [ ] **Step 1: Atualizar `NAV_LINKS` em `lib/data.ts`**

Substituir o bloco `NAV_LINKS`:

```ts
export const NAV_LINKS = [
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Processo", href: "/servicos#processo" },
  { label: "Contato", href: "/contato" },
] as const;
```

- [ ] **Step 2: Trocar `<a>` por `<Link>` em `components/Nav.tsx`**

Adicionar import no topo:

```tsx
import Link from "next/link";
```

Trocar a logo, os links do menu, o CTA e os itens do menu mobile de `<a href=...>` para `<Link href=...>` (mesmas classes). Pontos exatos:
- Logo: `<a href="#topo" ...>` → `<Link href="/" ...>`.
- Cada link do map: `<a href={l.href} ...>` → `<Link href={l.href} ...>`.
- CTA desktop: `<a href="#contato" ...>` → `<Link href="/contato" ...>`.
- Menu mobile: os `<a href={l.href}>` e o `<a href="#contato">` viram `<Link>` (manter `onClick={() => setOpen(false)}`).

- [ ] **Step 3: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 4: Verificar navegação no dev**

Clicar nos itens da Nav (desktop e mobile).
Expected: navega entre as páginas sem full reload; CTA "Faça o seu orçamento" vai pra `/contato`; logo volta pra `/`.

---

### Task 4: Backend aceita origem "criador"

**Files:**
- Modify: `lib/models/Lead.ts:9`
- Modify: `app/api/lead/route.ts:21`

**Interfaces:**
- Produces: `POST /api/lead` aceita `origem: "criador"` e persiste; `Lead.origem` enum inclui `"criador"`.

- [ ] **Step 1: Adicionar "criador" ao enum de origem**

Em `lib/models/Lead.ts`, trocar a linha do campo `origem`:

```ts
    origem: { type: String, enum: ["orcamento", "club", "criador"], default: "orcamento" },
```

- [ ] **Step 2: Aceitar "criador" no route handler**

Em `app/api/lead/route.ts`, substituir a criação do lead para validar as três origens:

```ts
    const origensValidas = ["orcamento", "club", "criador"] as const;
    const origem = origensValidas.includes(body?.origem) ? body.origem : "orcamento";

    await dbConnect();
    await Lead.create({
      nome,
      contato,
      tipo: String(body?.tipo ?? ""),
      mensagem: String(body?.mensagem ?? ""),
      origem,
    });
```

- [ ] **Step 3: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 4: Verificar o endpoint**

Com o dev rodando e o MongoDB configurado:
Run: `curl -s -X POST http://localhost:3000/api/lead -H "Content-Type: application/json" -d '{"nome":"Teste","contato":"teste@x.com","mensagem":"oi","origem":"criador"}'`
Expected: `{"ok":true}` (201). Conferir no `/admin` que o lead aparece com origem "criador".

---

### Task 5: Formulário de criador reutilizável + página /criador

**Files:**
- Create: `components/CriadorForm.tsx`
- Create: `app/criador/page.tsx`

**Interfaces:**
- Consumes: `POST /api/lead` (Task 4) com `origem: "criador"`.
- Produces: `<CriadorForm />` (client) e a rota `/criador`.

- [ ] **Step 1: Criar `components/CriadorForm.tsx`**

Reaproveita os campos do form do Scene3D (nome, contato, mensagem), agora funcional:

```tsx
"use client";

import { useState } from "react";

type Status = "idle" | "enviando" | "ok" | "erro";

export default function CriadorForm() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setStatus("enviando");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, contato, mensagem, origem: "criador" }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setNome("");
      setContato("");
      setMensagem("");
    } catch {
      setStatus("erro");
    }
  }

  if (status === "ok") {
    return (
      <div className="mt-7 flex flex-col items-center rounded-2xl border border-line bg-ink p-8 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-flush/15 text-2xl text-flush">✓</span>
        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">Recebido!</h3>
        <p className="mt-2 text-bone-dim">A gente vai te chamar pra criar junto.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 text-sm text-bone underline transition-colors hover:text-flush">
          Enviar outro
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="mt-7 space-y-3">
      <input
        required
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Seu nome"
        className="input"
      />
      <input
        required
        value={contato}
        onChange={(e) => setContato(e.target.value)}
        placeholder="WhatsApp ou e-mail"
        className="input"
      />
      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        rows={3}
        placeholder="Conta sua ideia — o que você cria, links de portfólio…"
        className="input resize-none"
      />
      <button
        type="submit"
        disabled={status === "enviando"}
        className="w-full rounded-full bg-flush py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-bone disabled:opacity-60"
      >
        {status === "enviando" ? "Enviando…" : "Quero entrar pro club"}
      </button>
      {status === "erro" && (
        <p className="text-center text-sm text-flush">Não rolou agora. Tenta de novo.</p>
      )}
    </form>
  );
}
```

- [ ] **Step 2: Criar `app/criador/page.tsx`**

```tsx
import type { Metadata } from "next";
import CriadorForm from "@/components/CriadorForm";

export const metadata: Metadata = { title: "Entrar pra Satriz — Criadores" };

export default function CriadorPage() {
  return (
    <main className="pt-28 md:pt-32">
      <section className="shell py-20 md:py-28">
        <div className="mx-auto max-w-md">
          <p className="eyebrow text-center">Satriz Club · criadores</p>
          <h1 className="mt-4 text-center font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Entrar pra <span className="text-flush">Satriz</span>
          </h1>
          <p className="mt-4 text-center text-bone-dim">
            Dev, designer, editor ou estilista? A Satriz é um coletivo de
            criadores. Conta o que você faz — e vamos criar junto.
          </p>
          <CriadorForm />
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 4: Verificar o fluxo no dev**

Abrir `/criador`, preencher e enviar.
Expected: estado "Enviando…" → "Recebido!"; lead com origem "criador" no `/admin`.

---

### Task 6: Limpeza da cena final do Scene3D (form → botões)

**Files:**
- Modify: `components/Scene3D.tsx` (cena 8: bloco do `form` ref e, se necessário, `id`)

**Interfaces:**
- Consumes: rotas `/contato` e `/criador` (Tasks 2 e 5).
- Produces: Scene3D sem `id="contato"` duplicado; painel laranja termina com 2 botões (links).

- [ ] **Step 1: Ler a cena 8 atual**

Localizar em `components/Scene3D.tsx` o bloco com `ref={form}` e `id="contato"` (o `<form>` fake com inputs). O `ref={laranja}` (painel) permanece.

- [ ] **Step 2: Substituir o conteúdo do form pelos botões**

Adicionar `import Link from "next/link";` no topo do arquivo. Trocar o `<div ref={form} ... id="contato">…</div>` (todo o conteúdo interno do form fake) por um bloco de CTA com dois links, mantendo `ref={form}` e o `style={{ transform: "translateY(100vh)" }}` inicial (o tick continua controlando o `translateY`), **removendo** o `id="contato"`:

```tsx
        <div ref={form} style={{ transform: "translateY(100vh)" }} className="absolute inset-0 flex items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-ink/60">bora criar junto?</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Vamos <span className="text-bone">começar</span>
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contato"
                className="rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-bone transition-colors hover:bg-ink-2"
              >
                Faça o seu orçamento
              </Link>
              <Link
                href="/criador"
                className="rounded-full border border-ink/30 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink/10"
              >
                Sou criador
              </Link>
            </div>
          </div>
        </div>
```

- [ ] **Step 3: Confirmar que o tick ainda referencia `form`/`laranja`**

Verificar que a lógica de `rise`/`panelY` no `useEffect` do tick continua setando `laranja.current` e `form.current` (não remover). O `pointerEvents` do `form` pode continuar sendo alternado por `rise`.

- [ ] **Step 4: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 5: Verificar no dev**

Rolar a home até o fim da experiência 3D.
Expected: painel laranja sobe e termina com os botões "Faça o seu orçamento" e "Sou criador", que navegam para `/contato` e `/criador`. Buscar por `id="contato"` no DOM da home → só deve existir na página `/contato` (não na home).

---

### Task 7: EntryGate (splash + pop-up "É um criador?")

**Files:**
- Create: `components/EntryGate.tsx`
- Modify: `app/layout.tsx` (renderizar `<EntryGate />`)
- Modify: `app/globals.css` (keyframe da barra de loading)

**Interfaces:**
- Consumes: `Monograma` (existe), `next/navigation` `useRouter`.
- Produces: overlay de entrada 1x por aba (sessionStorage `satriz:entered`).

- [ ] **Step 1: Ler o guia de navegação do Next desta versão**

Confirmar em `node_modules/next/dist/docs/` o import correto de `useRouter`/`router.push` (App Router usa `next/navigation`).

- [ ] **Step 2: Adicionar o keyframe da barra em `app/globals.css`**

Dentro de `@layer utilities`, adicionar:

```css
  @keyframes loadingbar {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(250%); }
  }
```

- [ ] **Step 3: Criar `components/EntryGate.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Monograma from "@/components/Monograma";

const KEY = "satriz:entered";
type Phase = "hidden" | "splash" | "ask";

export default function EntryGate() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("splash");

    const minMs = reduce ? 300 : 1800;
    const minTime = new Promise<void>((r) => setTimeout(r, minMs));
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) =>
            window.addEventListener("load", () => r(), { once: true }),
          );

    let alive = true;
    Promise.all([minTime, loaded]).then(() => {
      if (alive) setPhase("ask");
    });
    return () => {
      alive = false;
    };
  }, []);

  function finish(to?: string) {
    sessionStorage.setItem(KEY, "1");
    setPhase("hidden");
    if (to) router.push(to);
  }

  useEffect(() => {
    if (phase !== "ask") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink">
      {phase === "splash" ? (
        <div className="flex flex-col items-center gap-6">
          <Monograma size={64} className="animate-pulse" />
          <div className="h-1 w-40 overflow-hidden rounded-full bg-line">
            <div className="h-full w-1/3 rounded-full bg-flush animate-[loadingbar_1.2s_ease-in-out_infinite]" />
          </div>
        </div>
      ) : (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="entrygate-title"
          className="mx-6 w-full max-w-sm rounded-3xl border border-line bg-ink-2 p-8 text-center"
        >
          <p className="eyebrow">Satriz Club</p>
          <h2 id="entrygate-title" className="mt-3 font-display text-3xl font-extrabold tracking-tight">
            É um criador?
          </h2>
          <p className="mt-3 text-bone-dim">
            Dev, designer, editor ou estilista? Entra pro coletivo.
          </p>
          <div className="mt-7 flex gap-3">
            <button
              onClick={() => finish("/criador")}
              className="flex-1 rounded-full bg-flush py-3 text-sm font-semibold text-ink transition-colors hover:bg-bone"
            >
              Sim
            </button>
            <button
              onClick={() => finish()}
              className="flex-1 rounded-full border border-line py-3 text-sm font-medium text-bone transition-colors hover:border-bone"
            >
              Não
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Renderizar `<EntryGate />` no layout**

Em `app/layout.tsx`, importar e renderizar como primeiro filho do `<body>`:

```tsx
import EntryGate from "@/components/EntryGate";
```

```tsx
      <body className="grain min-h-screen bg-ink font-sans text-bone">
        <EntryGate />
        <Nav />
        {children}
        <Footer />
        <WhatsAppFab />
      </body>
```

- [ ] **Step 5: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 6: Verificar o fluxo de entrada no dev**

Abrir o site numa aba nova (ou limpar `sessionStorage`).
Expected: splash aparece com monograma + barra; some após ~1.8s (ou após o load); pop-up "É um criador?" aparece; "Sim" → `/criador`; "Não" → fecha e mostra a home. Recarregar a mesma aba → não reaparece. Fechar e reabrir a aba → reaparece.

---

### Task 8: Verificação final (build)

**Files:** nenhum (validação).

- [ ] **Step 1: Typecheck geral**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 2: Build de produção**

Run: `npm run build`
Expected: build conclui sem erros; rotas `/`, `/servicos`, `/projetos`, `/contato`, `/criador` listadas na saída.

- [ ] **Step 3: Smoke test manual**

Run: `npm run start` (ou `npm run dev`) e percorrer: entrada (splash+pop-up), navegação pela Nav, `/criador` enviando lead, ausência de `id="contato"` duplicado na home.
Expected: tudo conforme os critérios de sucesso do spec.

---

## Self-Review (feito na escrita)

- **Cobertura do spec:** multi-página (Tasks 1–3), intro+pop-up (Task 7), `/criador` funcional (Tasks 4–5), limpeza do Scene3D (Task 6), leitura dos docs do Next (Tasks 1/7, Global Constraints). ✓
- **Placeholders:** nenhum "TBD/TODO"; todo passo de código traz o código real. ✓
- **Consistência de tipos/nomes:** `origem: "criador"` usado igual em Lead (Task 4), api/lead (Task 4), CriadorForm (Task 5). `EntryGate` sessionStorage key `satriz:entered` consistente. Componentes referenciados existem (`Monograma`, `Nav`, `Footer`, `WhatsAppFab`, seções). ✓

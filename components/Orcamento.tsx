"use client";

import { useState } from "react";
import { SERVICOS, CONTACT_EMAIL, WHATSAPP_HREF } from "@/lib/data";

const TIPOS = [...SERVICOS.map((s) => s.nome), "Outro / não sei ainda"];

export default function Orcamento() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [tipo, setTipo] = useState<string>(TIPOS[0]);
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState<"idle" | "enviando" | "ok" | "erro">("idle");

  async function Faça(e: React.FormEvent) {
    e.preventDefault();
    setStatus("enviando");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, contato, tipo, mensagem: descricao, origem: "orcamento" }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setNome("");
      setContato("");
      setDescricao("");
      setTipo(TIPOS[0]);
    } catch {
      setStatus("erro");
    }
  }

  return (
    <section id="contato" className="border-t border-line py-20 md:py-28">
      <div className="shell">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-7 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, #ffa31a 0%, transparent 70%)" }}
          />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr]">
            {/* pitch */}
            <div>
              <p className="eyebrow">Faça o seu orçamento</p>
              <h2 className="mt-5 max-w-md font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
                Vamos tirar sua ideia do papel.
              </h2>
              <p className="mt-5 max-w-md text-bone-dim">
                Conta o que você precisa e a gente responde rápido com os
                próximos passos. Orçamento sem compromisso — e você fala direto
                com quem vai desenvolver.
              </p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-flush hover:text-flush"
              >
                <span aria-hidden>💬</span>
                Chamar no WhatsApp
              </a>
              <p className="mt-4 font-mono text-xs text-bone-dim">
                Prefere e-mail?{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-bone underline hover:text-flush">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            {/* form */}
            {status === "ok" ? (
              <div className="flex flex-col items-start justify-center rounded-2xl border border-line bg-ink p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-flush/15 text-2xl text-flush">
                  ✓
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">Recebido!</h3>
                <p className="mt-2 text-bone-dim">
                  A gente já vai te chamar. Pra agilizar, é só mandar um oi no WhatsApp.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-bone underline transition-colors hover:text-flush"
                >
                  Enviar outro
                </button>
              </div>
            ) : (
            <form onSubmit={Faça}>
              <label className="mb-5 block">
                <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-dim">
                  Seu nome
                </span>
                <input
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como te chamam"
                  className="input"
                />
              </label>

              <label className="mb-5 block">
                <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-dim">
                  E-mail ou WhatsApp
                </span>
                <input
                  required
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                  placeholder="pra gente te responder"
                  className="input"
                />
              </label>

              <label className="mb-5 block">
                <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-dim">
                  Tipo de projeto
                </span>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="input appearance-none"
                >
                  {TIPOS.map((t) => (
                    <option key={t} value={t} className="bg-ink-2">
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mb-5 block">
                <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-dim">
                  Sobre o projeto
                </span>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={3}
                  placeholder="O que você quer construir, prazo, referências…"
                  className="input resize-none"
                />
              </label>

              <button
                type="submit"
                disabled={status === "enviando"}
                className="w-full rounded-full bg-flush px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-bone disabled:opacity-60"
              >
                {status === "enviando" ? "Enviando…" : "Faça o seu orçamento"}
              </button>
              {status === "erro" && (
                <p className="mt-3 text-center text-sm text-flush">
                  Não rolou agora. Tenta de novo ou chama no WhatsApp.
                </p>
              )}
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

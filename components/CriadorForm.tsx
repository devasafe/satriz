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

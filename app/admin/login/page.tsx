"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senha }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setErro("Senha incorreta.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-6">
      <form onSubmit={entrar} className="w-full max-w-sm">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-flush font-display text-sm font-extrabold text-ink">
            S
          </span>
          <span className="font-display text-sm font-bold tracking-tight">
            SATRIZ<span className="text-bone-dim"> CLUB</span>
          </span>
        </div>

        <h1 className="mt-8 font-display text-2xl font-bold tracking-tight">Painel de leads</h1>
        <p className="mt-2 text-sm text-bone-dim">Acesso restrito. Entre com a senha do admin.</p>

        <label className="mt-7 block">
          <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-dim">
            Senha
          </span>
          <input
            type="password"
            required
            autoFocus
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input"
            placeholder="••••••••"
          />
        </label>

        {erro && <p className="mt-3 text-sm text-flush">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-full bg-flush px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-bone disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}

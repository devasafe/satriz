"use client";

import { useState } from "react";
import { PAPEIS, CONTACT_EMAIL } from "@/lib/data";

export default function Club() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [papel, setPapel] = useState<string>(PAPEIS[0]);
  const [sobre, setSobre] = useState("");

  function aplicar(e: React.FormEvent) {
    e.preventDefault();
    const assunto = `Entrar pro club — ${papel}`;
    const corpo = [
      `Nome: ${nome}`,
      `Contato: ${contato}`,
      `Área: ${papel}`,
      "",
      "Sobre mim / portfólio:",
      sobre,
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      assunto
    )}&body=${encodeURIComponent(corpo)}`;
  }

  return (
    <section id="club" className="border-t border-line py-20 md:py-28">
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
        {/* lado esquerdo — convite */}
        <div>
          <p className="eyebrow">Entre pro club</p>
          <h2 className="mt-5 max-w-md font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Procuramos quem cria.
          </h2>
          <p className="mt-5 max-w-md text-bone-dim">
            O club é feito de membros, não de funcionários. Se você é bom de
            ofício e quer assinar junto o que a gente constrói — manda sua
            aplicação. Cada divisão precisa de gente boa.
          </p>

          <div className="mt-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-dim">
              Vagas abertas!
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {PAPEIS.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-bone-dim"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* lado direito — formulário */}
        <form
          onSubmit={aplicar}
          className="rounded-2xl border border-line bg-ink-2 p-6 md:p-8"
        >
          <Field label="Seu nome">
            <input
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Como te chamam"
              className="input"
            />
          </Field>

          <Field label="E-mail ou @">
            <input
              required
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              placeholder="voce@email.com"
              className="input"
            />
          </Field>

          <Field label="Área">
            <select
              value={papel}
              onChange={(e) => setPapel(e.target.value)}
              className="input appearance-none"
            >
              {PAPEIS.map((p) => (
                <option key={p} value={p} className="bg-ink-2">
                  {p}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Sobre você / portfólio">
            <textarea
              value={sobre}
              onChange={(e) => setSobre(e.target.value)}
              rows={3}
              placeholder="O que você faz e onde dá pra ver seu trabalho."
              className="input resize-none"
            />
          </Field>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-flush px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-bone"
          >
            Enviar aplicação
          </button>
          <p className="mt-3 text-center font-mono text-[0.65rem] text-bone-dim">
            Abre seu e-mail com tudo preenchido pra {CONTACT_EMAIL}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-dim">
        {label}
      </span>
      {children}
    </label>
  );
}

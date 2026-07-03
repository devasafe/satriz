import { CONTACT_EMAIL } from "@/lib/data";

export default function Contato() {
  return (
    <section id="contato" className="border-t border-line py-20 md:py-28">
      <div className="shell">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-10 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -bottom-24 h-80 w-80 rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, #ffa31a 0%, transparent 70%)" }}
          />
          <div className="relative">
            <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
              Tem um projeto ou
              <br />
              quer fazer parte?
            </h2>
            <p className="mt-5 max-w-md text-bone-dim">
              Toda conversa começa por um e-mail. Conta o que você tem em mente —
              a gente responde rápido.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  "Quero começar um projeto"
                )}`}
                className="rounded-full bg-flush px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-bone"
              >
                Começar um projeto
              </a>
              <a
                href="#club"
                className="rounded-full border border-line px-6 py-3.5 text-sm font-medium text-bone transition-colors hover:border-bone"
              >
                Entrar pro club
              </a>
              <span className="font-mono text-xs text-bone-dim">{CONTACT_EMAIL}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { CONTACT_EMAIL } from "@/lib/data";

// Credencial de membro — assinatura de marca, usada na coluna direita do hero.
export default function Credential() {
  return (
    <div className="w-full max-w-sm -rotate-2 transition-transform duration-500 hover:rotate-0">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-ink-3 to-ink-2 p-6 shadow-2xl shadow-black/50">
        {/* faixa superior */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-flush font-display text-xs font-extrabold text-ink">
              S
            </span>
            <span className="font-display text-xs font-bold tracking-tight">SATRIZ CLUB</span>
          </div>

          <span className="rounded-full border border-flush/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-flush">
            Desenvolvedor Fullstack
          </span>
        </div>

        {/* número de membro */}
        <div className="mt-8">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-bone-dim">
            Cartão Nº
          </p>
          <p className="mt-1 font-display text-5xl font-extrabold tracking-tight">0001</p>
        </div>

        {/* portador */}
        <div className="mt-7">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-bone-dim">
            Portador
          </p>
          <p className="mt-1 border-b border-dashed border-line pb-1 font-display text-lg text-bone-dim">
            — Asafe Mota —
          </p>
        </div>

        {/* dados */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-bone-dim">
              Admissão
            </p>
            <p className="mt-1 font-mono text-sm">2023</p>
          </div>
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-bone-dim">
              Divisões
            </p>
            <p className="mt-1 font-mono text-[0.7rem] leading-snug">Estúdio · Revista · Moda</p>
          </div>
        </div>

        {/* assinatura */}
        <div className="mt-6 flex items-end justify-between border-t border-line pt-4">
          <span
            className="text-2xl text-flush"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400 }}
          >
            satriz
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-bone-dim">
            {CONTACT_EMAIL}
          </span>
        </div>
      </div>
    </div>
  );
}

import { DIFERENCIAIS, STACK } from "@/lib/data";

export default function PorQue() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Por que a Satriz</p>
          <h2 className="mt-5 max-w-sm font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Um estúdio, não uma fábrica.
          </h2>
          <p className="mt-4 max-w-sm text-bone-dim">
            Você não vira mais um número numa esteira. Cada projeto é tratado
            como prova — porque leva a nossa assinatura.
          </p>

          <div className="mt-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-dim">
              Construído com
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {STACK.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-line px-3 py-1.5 font-mono text-xs text-bone-dim"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {DIFERENCIAIS.map((d) => (
            <li key={d.titulo} className="bg-ink p-7">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-flush/10 font-display text-sm font-bold text-flush">
                ✦
              </span>
              <h3 className="mt-5 font-display text-lg font-bold tracking-tight">{d.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-dim">{d.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

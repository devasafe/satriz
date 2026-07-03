import { PROCESSO } from "@/lib/data";

export default function Processo() {
  return (
    <section id="processo" className="border-t border-line py-20 md:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Como funciona</p>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Do primeiro oi ao projeto no ar.
          </h2>
          <p className="mt-4 text-bone-dim">
            Simples e sem mistério. Você sabe o que vem em cada etapa.
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PROCESSO.map((p) => (
            <li key={p.n} className="flex min-h-[12rem] flex-col justify-between bg-ink p-7">
              <span className="font-display text-4xl font-extrabold text-flush">{p.n}</span>
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

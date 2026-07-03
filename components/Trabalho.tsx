import { PROJETOS } from "@/lib/data";

export default function Trabalho() {
  return (
    <section id="trabalho" className="border-t border-line py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Feito pela Satriz</p>
            <h2 className="mt-5 max-w-md font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Projetos que já estão no ar.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-bone-dim">
            É o selo que aparece no rodapé de cada projeto. Clicou e chegou
            aqui? É isso que a gente faz.
          </p>
        </div>

        <ul className="mt-12 border-t border-line">
          {PROJETOS.map((p, i) => {
            const externo = p.href?.startsWith("http");
            return (
            <li key={p.nome}>
              <a
                href={p.href ?? "#contato"}
                target={externo ? "_blank" : undefined}
                rel={externo ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-6 transition-colors hover:bg-ink-2 md:gap-8 md:px-2"
              >
                <span className="font-mono text-xs text-bone-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-xl font-bold tracking-tight transition-colors group-hover:text-flush md:text-2xl">
                    {p.nome}
                  </span>
                  <span className="mt-0.5 block text-sm text-bone-dim">{p.tipo}</span>
                </span>
                <span className="flex items-center gap-4">
                  <span className="hidden font-mono text-xs text-bone-dim sm:inline">
                    {p.ano}
                  </span>
                  <span className="text-bone-dim transition-transform group-hover:translate-x-1 group-hover:text-flush">
                    ↗
                  </span>
                </span>
              </a>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

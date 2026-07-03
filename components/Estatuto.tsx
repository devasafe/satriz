import { ESTATUTO } from "@/lib/data";

export default function Estatuto() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">O código da casa</p>
            <h2 className="mt-5 max-w-xs font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Três regras. Sem exceção.
            </h2>
            <p className="mt-5 max-w-sm text-bone-dim">
              Não é uma empresa com funcionários. É um clube de gente que cria —
              e clube tem estatuto.
            </p>
          </div>

          <ul className="flex flex-col">
            {ESTATUTO.map((art) => (
              <li
                key={art.n}
                className="grid grid-cols-[auto_1fr] gap-6 border-t border-line py-7 first:border-t-0 first:pt-0 md:gap-10"
              >
                <span className="font-mono text-sm text-flush">{art.n}</span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {art.titulo}
                  </h3>
                  <p className="mt-2 max-w-lg text-bone-dim">{art.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

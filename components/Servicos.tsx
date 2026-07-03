import { SERVICOS } from "@/lib/data";

export default function Servicos() {
  return (
    <section id="servicos" className="border-t border-line py-20 md:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow">O que a gente faz</p>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Tudo que seu projeto digital precisa.
          </h2>
          <p className="mt-4 text-bone-dim">
            De um site simples a um sistema completo — fullstack e sob medida,
            do jeito que o seu negócio precisa.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {SERVICOS.map((s, i) => (
            <article key={s.nome} className="bg-ink p-7 transition-colors hover:bg-ink-2">
              <span className="font-mono text-sm text-bone-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold tracking-tight">{s.nome}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-flush">
                {s.resumo}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone-dim">{s.descricao}</p>
            </article>
          ))}

          {/* célula de CTA — fecha o grid e puxa pra conversão */}
          <a
            href="#contato"
            className="group flex flex-col justify-between bg-ink-2 p-7 transition-colors hover:bg-ink-3"
          >
            <span className="font-mono text-sm text-flush">→</span>
            <div className="mt-6">
              <h3 className="font-display text-xl font-bold tracking-tight">
                Tem outra ideia?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                Conta o que você precisa. Se dá pra construir, a gente constrói.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors group-hover:text-flush">
                Faça o seu orçamento
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

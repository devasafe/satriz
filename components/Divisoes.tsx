import { DIVISOES } from "@/lib/data";

export default function Divisoes() {
  return (
    <section id="divisoes" className="border-t border-line py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">As divisões</p>
            <h2 className="mt-5 max-w-md font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Uma marca. Vários ofícios.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-bone-dim">
            Cada coisa que a Satriz cria vira uma divisão. Hoje rodando uma;
            as outras chegam no tempo certo.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {DIVISOES.map((d) => (
            <article
              key={d.n}
              className="flex min-h-[15rem] flex-col justify-between bg-ink p-7 transition-colors hover:bg-ink-2"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm text-bone-dim">{d.n}</span>
                <StatusTag status={d.status} />
              </div>
              <div className="mt-10">
                <h3 className="font-display text-2xl font-bold tracking-tight">{d.nome}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-flush">
                  {d.oficio}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-bone-dim">{d.descricao}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatusTag({ status }: { status: "ativo" | "em breve" }) {
  const ativo = status === "ativo";
  return (
    <span
      className={`flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] ${
        ativo ? "text-flush" : "text-bone-dim"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${ativo ? "bg-flush" : "bg-bone-dim"}`}
      />
      {ativo ? "Ativo" : "Em breve"}
    </span>
  );
}

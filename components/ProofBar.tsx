const ITENS = [
  "Ponta a ponta (fullstack)",
  "Você fala direto com o dev",
  "Stack moderna",
  "Suporte depois do lançamento",
];

export default function ProofBar() {
  return (
    <div className="border-y border-line bg-ink-2/50">
      <div className="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5">
        {ITENS.map((item) => (
          <span
            key={item}
            className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-bone-dim"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-flush" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

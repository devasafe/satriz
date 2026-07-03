import { FAQ } from "@/lib/data";

export default function Faq() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow">Dúvidas</p>
          <h2 className="mt-5 max-w-xs font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Antes de perguntar.
          </h2>
        </div>

        <div className="border-t border-line">
          {FAQ.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold tracking-tight transition-colors hover:text-flush">
                {item.q}
                <span className="text-bone-dim transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 pr-8 text-bone-dim">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

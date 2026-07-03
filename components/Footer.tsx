import { NAV_LINKS, SOCIALS, CONTACT_EMAIL, WHATSAPP_HREF, WHATSAPP_DISPLAY } from "@/lib/data";
import Monograma from "@/components/Monograma";

export default function Footer() {
  return (
    <footer className="border-t border-line pt-16 pb-10">
      <div className="shell">
        {/* wordmark gigante */}
        <p className="font-display text-[18vw] font-extrabold leading-none tracking-tighter text-ink-3 select-none md:text-[12rem]">
          SATRIZ
        </p>

        <div className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* assinatura — o selo */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
              <Monograma size={20} />
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-bone-dim">
                Desenvolvido por Satriz Club
              </span>
            </span>
            <p className="mt-4 max-w-xs text-sm text-bone-dim">
              O selo que assina cada projeto. Coletivo criativo — software,
              editorial e moda sob uma marca só.
            </p>
          </div>

          {/* navegação */}
          <nav>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-dim">
              Navegar
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-bone transition-colors hover:text-flush">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contato / redes */}
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-dim">
              Onde achar
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-bone transition-colors hover:text-flush"
                >
                  WhatsApp <span className="text-bone-dim">{WHATSAPP_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm text-bone transition-colors hover:text-flush"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-bone transition-colors hover:text-flush"
                  >
                    {s.label} <span className="text-bone-dim">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-bone-dim sm:flex-row sm:items-center sm:justify-between">
          <span>Registro Nº 0001 · Est. 2026 · satriz.club</span>
          <span>© {new Date().getFullYear()} Satriz Club</span>
        </div>
      </div>
    </footer>
  );
}

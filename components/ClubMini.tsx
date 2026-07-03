import { CONTACT_EMAIL } from "@/lib/data";

export default function ClubMini() {
  return (
    <section id="club" className="border-t border-line py-14">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <p className="eyebrow">Satriz Club</p>
            <p className="mt-3 text-lg text-bone-dim">
              A Satriz também é um coletivo de criadores. Se você é{" "}
              <span className="text-bone">dev, designer, editor ou estilista</span> e
              quer criar junto — entre pro club.
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Entrar pro club")}`}
            className="shrink-0 rounded-full border border-line px-6 py-3 text-sm font-medium text-bone transition-colors hover:border-flush hover:text-flush"
          >
            Entrar pro club
          </a>
        </div>
      </div>
    </section>
  );
}

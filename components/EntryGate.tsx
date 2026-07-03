"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Monograma from "@/components/Monograma";

const KEY = "satriz:entered";
type Phase = "hidden" | "splash" | "ask" | "leaving";
// duração do slide de saída (deve casar com a classe duration-700 abaixo)
const EXIT_MS = 700;

export default function EntryGate() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("splash");

    const minMs = reduce ? 300 : 1800;
    const minTime = new Promise<void>((r) => setTimeout(r, minMs));
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) =>
            window.addEventListener("load", () => r(), { once: true }),
          );

    let alive = true;
    Promise.all([minTime, loaded]).then(() => {
      if (alive) setPhase("ask");
    });
    return () => {
      alive = false;
    };
  }, []);

  function finish(to?: string) {
    sessionStorage.setItem(KEY, "1");
    // navega ANTES do slide: a tela seguinte já fica montada por baixo do
    // overlay, então o slide pra cima a revela. (EntryGate vive no layout,
    // então persiste durante a navegação.)
    if (to) router.push(to);
    setPhase("leaving");
    window.setTimeout(() => setPhase("hidden"), EXIT_MS);
  }

  useEffect(() => {
    if (phase !== "ask") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        phase === "leaving" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {phase === "splash" ? (
        <div className="flex flex-col items-center gap-6">
          <Monograma size={64} className="animate-pulse" />
          <div className="h-1 w-40 overflow-hidden rounded-full bg-line">
            <div className="h-full w-1/3 rounded-full bg-flush animate-[loadingbar_1.2s_ease-in-out_infinite]" />
          </div>
        </div>
      ) : (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="entrygate-title"
          className="mx-6 w-full max-w-sm rounded-3xl border border-line bg-ink-2 p-8 text-center"
        >
          <p className="eyebrow">Satriz Club</p>
          <h2 id="entrygate-title" className="mt-3 font-display text-3xl font-extrabold tracking-tight">
            É um criador?
          </h2>
          <p className="mt-3 text-bone-dim">
            Dev, designer, editor ou estilista? Entra pro coletivo.
          </p>
          <div className="mt-7 flex gap-3">
            <button
              onClick={() => finish("/criador")}
              className="flex-1 rounded-full bg-flush py-3 text-sm font-semibold text-ink transition-colors hover:bg-bone"
            >
              Sim
            </button>
            <button
              onClick={() => finish()}
              className="flex-1 rounded-full border border-line py-3 text-sm font-medium text-bone transition-colors hover:border-bone"
            >
              Não
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

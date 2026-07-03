"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/data";
import Monograma from "@/components/Monograma";
import { useTransicao } from "@/components/PageTransition";

// Liquid glass: fundo translúcido claro + blur + borda/realce sutis.
const glass =
  "border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-white/[0.08]";
// Variante laranja pro CTA (mantém o destaque, mas em vidro).
const glassCTA =
  "border border-flush/30 bg-flush/15 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-flush/20";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { navegar } = useTransicao();

  // Intercepta o clique: em vez de navegar na hora, dispara a cortina.
  function irPara(href: string) {
    return (e: React.MouseEvent) => {
      // Deixa cliques de "abrir em nova aba" (ctrl/cmd/meio) passarem normal.
      if (e.metaKey || e.ctrlKey || e.shiftKey || (e as React.MouseEvent).button === 1) return;
      e.preventDefault();
      setOpen(false);
      navegar(href);
    };
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="shell flex h-20 items-center justify-between gap-3">
        {/* Pílula 1 — logo */}
        <Link
          href="/"
          onClick={irPara("/")}
          className={`group flex items-center gap-2.5 rounded-full px-4 py-2.5 ${glass}`}
          aria-label="Satriz Club"
        >
          <Monograma size={24} className="transition-transform duration-300 group-hover:scale-105" />
          <span className="font-display text-sm font-bold tracking-tight">
            SATRIZ<span className="text-bone-dim"> CLUB</span>
          </span>
        </Link>

        {/* Pílula 2 — links de navegação */}
        <ul className={`hidden items-center gap-7 rounded-full px-7 py-3 md:flex ${glass}`}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={irPara(l.href)}
                className="font-mono text-xs uppercase tracking-[0.15em] text-bone-dim transition-colors hover:text-bone"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Pílula 3 — CTA "Faça o seu orçamento" */}
        <Link
          href="/contato"
          onClick={irPara("/contato")}
          className={`hidden items-center rounded-full px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-flush transition-colors hover:text-bone md:inline-flex ${glassCTA}`}
        >
          Faça o seu orçamento
        </Link>

        {/* Mobile — botão hambúrguer em pílula de vidro */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex h-11 w-11 items-center justify-center rounded-full md:hidden ${glass}`}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-bone transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-bone transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-bone transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Menu mobile — card de vidro flutuante */}
      {open && (
        <div className="shell md:hidden">
          <ul className={`flex flex-col gap-1 rounded-3xl p-4 ${glass}`}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={irPara(l.href)}
                  className="block rounded-xl px-3 py-2 font-mono text-sm uppercase tracking-[0.15em] text-bone-dim transition-colors hover:bg-white/5 hover:text-bone"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contato"
                onClick={irPara("/contato")}
                className={`block rounded-full px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.15em] text-flush ${glassCTA}`}
              >
                Faça o seu orçamento
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

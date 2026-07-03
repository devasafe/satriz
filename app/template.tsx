"use client";

import { usePathname } from "next/navigation";

// Transição de troca de página: o template re-monta a cada navegação, então a
// página que entra recebe a animação de entrada, em sincronia com a cortina.
//
// A home usa layout com camadas `sticky` (Scene3D/Hero/ProofBar). Um `transform`
// num ancestral quebra o sticky — então nela o conteúdo entra só com FADE
// (o "subindo" vem da cortina). Nas outras páginas: fade + slide pra cima.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return <div className={isHome ? "pagein-fade" : "pagein"}>{children}</div>;
}

import type { Metadata } from "next";
import Trabalho from "@/components/Trabalho";

export const metadata: Metadata = { title: "Projetos — Satriz Club" };

export default function ProjetosPage() {
  return (
    <main className="pt-28 md:pt-32">
      <Trabalho />
    </main>
  );
}

import type { Metadata } from "next";
import Orcamento from "@/components/Orcamento";
import Faq from "@/components/Faq";

export const metadata: Metadata = { title: "Contato — Satriz Club" };

export default function ContatoPage() {
  return (
    <main className="pt-28 md:pt-32">
      <Orcamento />
      <Faq />
    </main>
  );
}

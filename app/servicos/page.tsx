import type { Metadata } from "next";
import Servicos from "@/components/Servicos";
import PorQue from "@/components/PorQue";
import Processo from "@/components/Processo";

export const metadata: Metadata = { title: "Serviços — Satriz Club" };

export default function ServicosPage() {
  return (
    <main className="pt-28 md:pt-32">
      <Servicos />
      <PorQue />
      <Processo />
    </main>
  );
}

import Hero from "@/components/Hero";
import Scene3D from "@/components/Scene3D";
import ProofBar from "@/components/ProofBar";

export default function Home() {
  return (
    <main>
      {/* Camada 0 — experiência 3D (fica parada no último frame durante o hold). */}
      <div className="relative z-0">
        <Scene3D />
      </div>

      {/* Camada 1 — Hero sobe cobrindo o 3D e fica parada. */}
      <div className="sticky top-0 z-10 -mt-[100svh] min-h-screen bg-ink shadow-[0_-24px_60px_rgba(0,0,0,0.55)]">
        <Hero />
      </div>

      {/* Camada 2 — ProofBar sobe por cima da Hero. */}
      <div className="relative z-20 bg-ink shadow-[0_-24px_60px_rgba(0,0,0,0.55)]">
        <ProofBar />
      </div>
    </main>
  );
}

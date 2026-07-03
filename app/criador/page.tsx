import type { Metadata } from "next";
import CriadorForm from "@/components/CriadorForm";

export const metadata: Metadata = { title: "Entrar pra Satriz — Criadores" };

export default function CriadorPage() {
  return (
    <main className="pt-28 md:pt-32">
      <section className="shell py-20 md:py-28">
        <div className="mx-auto max-w-md">
          <p className="eyebrow text-center">Satriz Club · criadores</p>
          <h1 className="mt-4 text-center font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Entrar pra <span className="text-flush">Satriz</span>
          </h1>
          <p className="mt-4 text-center text-bone-dim">
            Dev, designer, editor ou estilista? A Satriz é um coletivo de
            criadores. Conta o que você faz — e vamos criar junto.
          </p>
          <CriadorForm />
        </div>
      </section>
    </main>
  );
}

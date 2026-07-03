"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { STATUSES, GRUPOS, grupoDaOrigem, type LeadView, type StatusKey } from "@/lib/leads";

export default function AdminKanban() {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadView[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro("");
    const res = await fetch("/api/leads");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    if (!res.ok) {
      setErro("Erro ao carregar. Confira a conexão com o banco.");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setLeads(data.leads ?? []);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function mover(id: string, status: StatusKey) {
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function excluir(id: string) {
    if (!confirm("Excluir este lead?")) return;
    setLeads((prev) => prev.filter((l) => l._id !== id));
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
  }

  async function sair() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-line bg-ink/85 backdrop-blur">
        <div className="flex items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-flush font-display text-sm font-extrabold text-ink">
              S
            </span>
            <div>
              <p className="font-display text-sm font-bold leading-none tracking-tight">
                Painel de leads
              </p>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-bone-dim">
                {leads.length} no total
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={carregar}
              className="rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-bone-dim transition-colors hover:text-bone"
            >
              Atualizar
            </button>
            <button
              onClick={sair}
              className="rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-bone-dim transition-colors hover:border-flush hover:text-flush"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {erro && <p className="px-8 py-6 text-sm text-flush">{erro}</p>}

      {loading ? (
        <p className="px-8 py-10 font-mono text-sm text-bone-dim">Carregando…</p>
      ) : (
        <div className="flex flex-col gap-10 px-5 py-6 md:px-8">
          {GRUPOS.map((grupo) => {
            const doGrupo = leads.filter((l) => grupoDaOrigem(l.origem) === grupo.key);
            return (
              <section key={grupo.key}>
                <div className="mb-4 flex items-center gap-3 border-b border-line pb-3">
                  <h2 className="font-display text-lg font-bold tracking-tight">{grupo.label}</h2>
                  <span className="rounded-full bg-ink-2 px-2.5 py-0.5 font-mono text-xs text-bone-dim">
                    {doGrupo.length}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <div className="flex min-w-max gap-4">
                    {STATUSES.map((col) => {
                      const items = doGrupo.filter((l) => l.status === col.key);
                      const colId = `${grupo.key}:${col.key}`;
                      const ativo = overCol === colId;
                      return (
                        <div
                          key={col.key}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setOverCol(colId);
                          }}
                          onDragLeave={() => setOverCol((c) => (c === colId ? null : c))}
                          onDrop={() => {
                            if (dragId) mover(dragId, col.key);
                            setDragId(null);
                            setOverCol(null);
                          }}
                          className={`flex w-72 shrink-0 flex-col rounded-2xl border p-3 transition-colors ${
                            ativo ? "border-flush bg-ink-2" : "border-line bg-ink-2/40"
                          }`}
                        >
                          <header className="flex items-center justify-between px-1 pb-3">
                            <span className="font-display text-sm font-bold tracking-tight">
                              {col.label}
                            </span>
                            <span className="font-mono text-xs text-bone-dim">{items.length}</span>
                          </header>

                          <div className="flex flex-col gap-2">
                            {items.map((l) => (
                              <Card
                                key={l._id}
                                lead={l}
                                onDragStart={() => setDragId(l._id)}
                                onDragEnd={() => setDragId(null)}
                                onExcluir={() => excluir(l._id)}
                              />
                            ))}
                            {items.length === 0 && (
                              <p className="px-1 py-6 text-center font-mono text-[0.65rem] uppercase tracking-[0.15em] text-bone-dim/60">
                                vazio
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Card({
  lead,
  onDragStart,
  onDragEnd,
  onExcluir,
}: {
  lead: LeadView;
  onDragStart: () => void;
  onDragEnd: () => void;
  onExcluir: () => void;
}) {
  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="cursor-grab rounded-xl border border-line bg-ink p-4 transition-colors hover:border-bone-dim active:cursor-grabbing"
    >
      <h3 className="font-display text-sm font-bold leading-tight tracking-tight">{lead.nome}</h3>

      {lead.tipo && <p className="mt-1 text-xs text-bone-dim">{lead.tipo}</p>}

      <a
        href={responderHref(lead.contato)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block truncate text-sm text-bone transition-colors hover:text-flush"
      >
        {lead.contato}
      </a>

      {lead.mensagem && (
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-bone-dim">{lead.mensagem}</p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-line pt-2">
        <span className="font-mono text-[0.6rem] text-bone-dim">{formatarData(lead.createdAt)}</span>
        <button
          onClick={onExcluir}
          className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-bone-dim transition-colors hover:text-flush"
        >
          Excluir
        </button>
      </div>
    </article>
  );
}

function responderHref(contato: string) {
  if (contato.includes("@")) return `mailto:${contato}`;
  const digits = contato.replace(/\D/g, "");
  if (digits.length >= 10) return `https://wa.me/${digits.startsWith("55") ? digits : "55" + digits}`;
  return `https://wa.me/?text=${encodeURIComponent(contato)}`;
}

function formatarData(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

import type { LeadType } from "@/lib/models/Lead";

/**
 * Dispara os dados de um lead para o webhook do n8n, que cuida de formatar e
 * enviar a notificação (Telegram). Propositalmente desacoplado do canal: o site
 * só grita "chegou lead", quem decide o destino é o workflow do n8n.
 *
 * Nunca lança: qualquer falha é registrada e engolida, porque uma notificação
 * que falha não pode custar um lead já salvo no banco. Se a URL não estiver
 * configurada, vira no-op (útil em dev e mantém o site funcionando sem o n8n).
 */
export async function notificarLead(lead: LeadType): Promise<void> {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!url) return;

  const payload = {
    nome: lead.nome,
    contato: lead.contato,
    tipo: lead.tipo ?? "",
    mensagem: lead.mensagem ?? "",
    origem: lead.origem ?? "orcamento",
    criadoEm: new Date().toISOString(),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Satriz-Secret": process.env.N8N_LEAD_WEBHOOK_SECRET ?? "",
      },
      body: JSON.stringify(payload),
      // Não segura a resposta ao visitante se o n8n estiver lento/fora do ar.
      signal: AbortSignal.timeout(3000),
    });

    if (!res.ok) {
      console.error("notificarLead: n8n respondeu", res.status);
    }
  } catch (err) {
    console.error("notificarLead: falha ao chamar o n8n", err);
  }
}

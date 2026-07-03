// Constantes de lead compartilhadas (seguras pro client — sem mongoose aqui).

export const STATUSES = [
  { key: "novo", label: "Novo" },
  { key: "contato", label: "Em contato" },
  { key: "proposta", label: "Proposta" },
  { key: "fechado", label: "Fechado" },
  { key: "perdido", label: "Perdido" },
] as const;

export type StatusKey = (typeof STATUSES)[number]["key"];

export const STATUS_KEYS: string[] = STATUSES.map((s) => s.key);

export type Origem = "orcamento" | "club" | "criador";

// Grupos do painel: cada lead cai em um deles pela origem.
export const GRUPOS = [
  { key: "orcamento", label: "Orçamentos", origens: ["orcamento"] },
  { key: "satriz", label: "Entrar pra Satriz", origens: ["criador", "club"] },
] as const;

export type GrupoKey = (typeof GRUPOS)[number]["key"];

export function grupoDaOrigem(origem: Origem): GrupoKey {
  return origem === "orcamento" ? "orcamento" : "satriz";
}

export type LeadView = {
  _id: string;
  nome: string;
  contato: string;
  tipo: string;
  mensagem: string;
  origem: Origem;
  status: StatusKey;
  createdAt: string;
};

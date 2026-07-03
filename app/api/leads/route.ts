import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";

type LeadDoc = {
  _id: unknown;
  nome: string;
  contato: string;
  tipo?: string;
  mensagem?: string;
  origem?: "orcamento" | "club" | "criador";
  status?: string;
  createdAt?: Date;
};

export async function GET() {
  try {
    await dbConnect();
    const docs = (await Lead.find().sort({ createdAt: -1 }).lean()) as unknown as LeadDoc[];
    const leads = docs.map((d) => ({
      _id: String(d._id),
      nome: d.nome,
      contato: d.contato,
      tipo: d.tipo ?? "",
      mensagem: d.mensagem ?? "",
      origem: d.origem ?? "orcamento",
      status: d.status ?? "novo",
      createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : "",
    }));
    return NextResponse.json({ leads });
  } catch (err) {
    console.error("GET /api/leads", err);
    return NextResponse.json({ error: "Erro ao carregar leads." }, { status: 500 });
  }
}

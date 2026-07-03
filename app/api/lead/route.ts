import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const nome = String(body?.nome ?? "").trim();
    const contato = String(body?.contato ?? "").trim();

    if (!nome || !contato) {
      return NextResponse.json({ error: "Nome e contato são obrigatórios." }, { status: 400 });
    }

    const origensValidas = ["orcamento", "club", "criador"] as const;
    const origem = origensValidas.includes(body?.origem) ? body.origem : "orcamento";

    await dbConnect();
    await Lead.create({
      nome,
      contato,
      tipo: String(body?.tipo ?? ""),
      mensagem: String(body?.mensagem ?? ""),
      origem,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/lead", err);
    return NextResponse.json({ error: "Não foi possível registrar agora." }, { status: 500 });
  }
}

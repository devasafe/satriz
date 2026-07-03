import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
import { STATUS_KEYS } from "@/lib/leads";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const status = String(body?.status ?? "");

    if (!STATUS_KEYS.includes(status)) {
      return NextResponse.json({ error: "Status inválido." }, { status: 400 });
    }

    await dbConnect();
    const updated = await Lead.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PATCH /api/leads/[id]", err);
    return NextResponse.json({ error: "Erro ao atualizar." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    await Lead.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/leads/[id]", err);
    return NextResponse.json({ error: "Erro ao excluir." }, { status: 500 });
  }
}

import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, isAuthed } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const authed = isAuthed(token);
  const { pathname } = req.nextUrl;

  // Protege a API de leitura/edição de leads.
  if (pathname.startsWith("/api/leads")) {
    if (!authed) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    return NextResponse.next();
  }

  // Protege o painel (exceto a tela de login).
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/leads", "/api/leads/:path*"],
};

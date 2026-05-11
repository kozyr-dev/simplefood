import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require an authenticated session (refresh_token cookie present)
const protectedRoutes = ["/checkout"];

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((r) => path.startsWith(r));

  if (isProtected && !request.cookies.has("refresh_token")) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico).*)"],
};

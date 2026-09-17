import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const ROLE_HIERARCHY: Record<string, number> = {
  PUBLIC: 0,
  USER: 1,
  OPERATOR: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
  LEADER: 5,
  AUDITOR: 6,
};

function hasAccess(userRole: string, requiredRole: string): boolean {
  const userLevel = ROLE_HIERARCHY[userRole] ?? 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] ?? 0;
  return userLevel >= requiredLevel;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const userRole = (session?.user as unknown as { role: string })?.role ?? "PUBLIC";

  // API route protection
  if (pathname.startsWith("/api/")) {
    const publicApiPaths = [
      "/api/auth",
      "/api/services",
      "/api/categories",
      "/api/faqs",
      "/api/announcements",
    ];
    const isPublicApi = publicApiPaths.some((p) => pathname.startsWith(p));

    if (isPublicApi && !pathname.startsWith("/api/auth/register")) {
      if (req.method === "GET") {
        return NextResponse.next();
      }
    }

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (pathname.startsWith("/api/applications")) {
      if (!hasAccess(userRole, "USER")) {
        return NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }
    }

    if (pathname.startsWith("/api/payments")) {
      if (!hasAccess(userRole, "USER")) {
        return NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }
    }

    return NextResponse.next();
  }

  // Page route protection
  if (pathname.startsWith("/dashboard")) {
    if (!session?.user) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!hasAccess(userRole, "USER")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/applications/:path*", "/api/payments/:path*"],
};

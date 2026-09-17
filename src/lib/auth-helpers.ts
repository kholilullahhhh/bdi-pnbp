import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export async function getAuthSession(): Promise<AuthSession | null> {
  const session = await auth();
  if (!session?.user) return null;
  return {
    userId: (session.user as unknown as { id: string }).id,
    email: session.user.email ?? "",
    name: session.user.name ?? "",
    role: (session.user as unknown as { role: string }).role,
  };
}

export async function requireAuth(): Promise<
  { session: AuthSession; error?: never } | { session?: never; error: NextResponse }
> {
  const session = await getAuthSession();
  if (!session) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }
  return { session };
}

export async function requireRole(
  ...roles: string[]
): Promise<
  { session: AuthSession; error?: never } | { session?: never; error: NextResponse }
> {
  const result = await requireAuth();
  if (result.error) return result;
  if (!roles.includes(result.session.role)) {
    return {
      error: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      ),
    };
  }
  return result;
}

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

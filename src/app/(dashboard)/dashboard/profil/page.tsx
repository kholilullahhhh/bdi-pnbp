export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileClient } from "@/components/dashboard/profile-client";

export default async function ProfilPage() {
  const session = await auth();
  const userId = (session?.user as unknown as { id: string })?.id;
  if (!userId) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any = null;

  try {
    user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  } catch (error) {
    console.error("Profil page DB error:", error);
  }
  if (!user) return null;

  return <ProfileClient user={user} />;
}

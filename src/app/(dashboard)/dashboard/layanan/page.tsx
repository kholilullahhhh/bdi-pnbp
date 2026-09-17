export const dynamic = "force-dynamic";

import { getServices } from "@/lib/db-queries";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { LayananDashboard } from "@/components/dashboard/layanan-dashboard";
import { redirect } from "next/navigation";

export default async function DashboardLayananPage() {
  const session = await auth();
  const userId = (session?.user as unknown as { id: string })?.id;

  if (!userId) {
    redirect("/login");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let services: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let categories: any[] = [];

  try {
    [services, categories] = await Promise.all([
      getServices(),
      prisma.serviceCategory.findMany({ select: { id: true, name: true }, orderBy: { sortOrder: "asc" } }),
    ]);
  } catch (error) {
    console.error("Layanan page DB error:", error);
  }

  return <LayananDashboard services={services} categories={categories} />;
}

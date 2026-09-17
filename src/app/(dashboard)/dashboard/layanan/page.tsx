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

  const [services, categories] = await Promise.all([
    getServices(),
    prisma.serviceCategory.findMany({ select: { id: true, name: true }, orderBy: { sortOrder: "asc" } }),
  ]);

  return <LayananDashboard services={services} categories={categories} />;
}

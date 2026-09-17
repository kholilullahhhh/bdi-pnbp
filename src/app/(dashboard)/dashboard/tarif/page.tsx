export const dynamic = "force-dynamic";

import { getTariffs } from "@/lib/db-queries";
import { prisma } from "@/lib/prisma";
import { TariffTable } from "@/components/admin/tariff-table";

export default async function TarifPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tariffs: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let services: any[] = [];

  try {
    [tariffs, services] = await Promise.all([
      getTariffs(),
      prisma.service.findMany({ select: { id: true, name: true }, orderBy: { sortOrder: "asc" } }),
    ]);
  } catch (error) {
    console.error("Tarif page DB error:", error);
  }

  return <TariffTable tariffs={tariffs} services={services} />;
}

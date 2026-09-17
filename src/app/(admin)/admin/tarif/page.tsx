import { getTariffs } from "@/lib/db-queries";
import { prisma } from "@/lib/prisma";
import { TariffTable } from "@/components/admin/tariff-table";

export default async function AdminTarifPage() {
  const [tariffs, services] = await Promise.all([
    getTariffs(),
    prisma.service.findMany({ select: { id: true, name: true }, orderBy: { sortOrder: "asc" } }),
  ]);

  return <TariffTable tariffs={tariffs} services={services} />;
}

import { getServices } from "@/lib/db-queries";
import { prisma } from "@/lib/prisma";
import { ServiceTable } from "@/components/admin/service-table";

export default async function AdminLayananPage() {
  const [services, categories] = await Promise.all([
    getServices(),
    prisma.serviceCategory.findMany({ select: { id: true, name: true }, orderBy: { sortOrder: "asc" } }),
  ]);

  return <ServiceTable services={services} categories={categories} />;
}

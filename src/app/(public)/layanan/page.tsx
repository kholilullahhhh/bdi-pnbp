export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { LayananClient } from "./layanan-client";

export default async function LayananPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let services: any[] = [];
  try {
    services = await prisma.service.findMany({
      where: { isActive: true, status: "ACTIVE" },
      include: {
        category: true,
        tariffs: {
          where: { verificationStatus: "VERIFIED" },
          orderBy: { effectiveStartDate: "desc" },
        },
      },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("Layanan page DB error:", error);
  }

  return <LayananClient services={services} />;
}

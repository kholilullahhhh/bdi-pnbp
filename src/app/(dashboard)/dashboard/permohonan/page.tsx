export const dynamic = "force-dynamic";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PermohonanClient } from "@/components/dashboard/permohonan-client";

export default async function PermohonanPage() {
  const session = await auth();
  const userId = (session?.user as unknown as { id: string })?.id;
  if (!userId) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let applications: any[] = [];

  try {
    applications = await prisma.application.findMany({
      where: { userId },
      include: {
        service: { select: { name: true } },
        invoice: { select: { totalAmount: true, status: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Permohonan page DB error:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Permohonan Saya</h1>
          <p className="text-muted-foreground mt-1">Daftar permohonan layanan PNBP</p>
        </div>
        <Link href="/layanan">
          <Button><Plus className="mr-1.5 h-4 w-4" />Ajukan Baru</Button>
        </Link>
      </div>
      {applications.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <FileText className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">Belum ada permohonan yang diajukan.</p>
          <Link href="/layanan">
            <Button><Plus className="mr-1.5 h-4 w-4" />Ajukan Permohonan</Button>
          </Link>
        </div>
      ) : (
        <PermohonanClient applications={applications} />
      )}
    </div>
  );
}

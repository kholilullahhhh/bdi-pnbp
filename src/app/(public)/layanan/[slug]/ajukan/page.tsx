import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAuthSession } from "@/lib/auth-helpers";
import { getServiceBySlug } from "@/lib/db-queries";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { AjukanFormClient } from "./ajukan-form-client";

export const dynamic = "force-dynamic";

export default async function AjukanPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getAuthSession();
  if (!session) {
    const { slug } = await params;
    redirect(`/login?callbackUrl=/layanan/${slug}/ajukan`);
  }

  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const latestTariff = service.tariffs?.[0];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href={`/layanan/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Detail Layanan
          </Link>

          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {/* Service Summary Header */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-800 p-6 text-white">
              <p className="text-primary-200/80 text-sm mb-1">Mengajukan Layanan</p>
              <h1 className="text-2xl font-bold">{service.name}</h1>
              <p className="text-primary-100/70 text-sm mt-1">{service.category?.name || "Layanan PNBP"}</p>
            </div>

            {/* Form */}
            <AjukanFormClient
              serviceId={service.id}
              serviceName={service.name}
              serviceDescription={service.description}
              serviceRequirements={service.requirements}
              serviceProcedure={service.procedure}
              tariffName={latestTariff?.name || null}
              tariffPrice={latestTariff ? Number(latestTariff.price) : null}
              tariffUnit={latestTariff?.unit || null}
              estimationTime={service.estimationTime}
              targetUser={service.targetUser}
              userName={session.name}
              userEmail={session.email}
            />
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}

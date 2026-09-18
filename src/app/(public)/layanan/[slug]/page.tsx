import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  ArrowRight,
  GraduationCap,
  Users,
  Home,
  Compass,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { getServiceBySlug } from "@/lib/db-queries";
import { formatCurrency } from "@/lib/utils";
import { getServiceImage } from "@/lib/service-images";

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  Users,
  Home,
  Compass,
  Award,
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Layanan Tidak Ditemukan" };
  return {
    title: `${service.name} — PNBP BDI Makassar`,
    description: service.description.slice(0, 160),
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  const Icon = iconMap[service.category?.icon || ""] || GraduationCap;
  const latestTariff = service.tariffs?.[0];
  const heroImage = getServiceImage(service);

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 py-12 lg:py-16">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/layanan"
              className="inline-flex items-center gap-1.5 text-sm text-primary-200 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Daftar Layanan
            </Link>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    {service.name}
                  </h1>
                  <Badge className="bg-emerald-400/20 text-emerald-200 border-emerald-400/30">
                    Tersedia
                  </Badge>
                </div>
                <p className="text-primary-200/80 mt-1">
                  {service.category?.name || "Layanan PNBP"}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg className="relative block w-full h-8 sm:h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
              <path d="M0,0 C150,90 350,-40 500,65 C650,170 900,10 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Hero Image */}
                {heroImage && (
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border/60 shadow-sm bg-muted">
                    <Image
                      src={heroImage}
                      alt={service.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Description */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h2 className="text-lg font-bold text-foreground mb-3">Deskripsi Layanan</h2>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>

                {/* Requirements */}
                {service.requirements && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary-600" />
                      Persyaratan
                    </h2>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {service.requirements}
                    </div>
                  </div>
                )}

                {/* Procedure */}
                {service.procedure && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary-600" />
                      Prosedur
                    </h2>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {service.procedure}
                    </div>
                  </div>
                )}

                {/* Payment Info */}
                {service.paymentInfo && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary-600" />
                      Informasi Pembayaran
                    </h2>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {service.paymentInfo}
                    </div>
                  </div>
                )}

                {/* Cancellation */}
                {service.cancellation && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h2 className="text-lg font-bold text-foreground mb-3">Pembatalan</h2>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {service.cancellation}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Apply Card */}
                <div className="bg-white rounded-xl border border-border overflow-hidden sticky top-24">
                  <div className="bg-gradient-to-r from-primary-700 to-primary-800 p-5 text-white">
                    <h3 className="font-bold text-lg">Ajukan Layanan Ini</h3>
                    <p className="text-primary-100/80 text-sm mt-1">
                      Mulai proses pengajuan Anda sekarang
                    </p>
                  </div>
                  <div className="p-5 space-y-4">
                    {latestTariff && (
                      <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                        <p className="text-xs font-semibold text-primary-700 uppercase tracking-wider mb-1">
                          Tarif
                        </p>
                        <p className="text-lg font-bold text-primary-900">
                          {formatCurrency(Number(latestTariff.price))}
                        </p>
                        <p className="text-xs text-primary-600">per {latestTariff.unit}</p>
                      </div>
                    )}
                    {service.estimationTime && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Estimasi: {service.estimationTime}
                      </div>
                    )}
                    {service.targetUser && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          Target Pengguna
                        </p>
                        <p className="text-sm text-foreground">{service.targetUser}</p>
                      </div>
                    )}
                    <Link href={`/layanan/${slug}/ajukan`}>
                      <Button className="w-full shadow-md hover:shadow-lg transition-shadow" size="lg">
                        Ajukan Sekarang
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground text-center">
                      Isi form pengajuan untuk layanan ini
                    </p>
                  </div>
                </div>

                {/* Tariffs List */}
                {service.tariffs.length > 1 && (
                  <div className="bg-white rounded-xl border border-border p-5">
                    <h3 className="font-bold text-foreground mb-3">Daftar Tarif</h3>
                    <div className="space-y-3">
                      {service.tariffs.map((tariff) => (
                        <div key={tariff.id} className="border-b border-border/60 last:border-0 pb-3 last:pb-0">
                          <p className="text-sm font-medium text-foreground">{tariff.name}</p>
                          <p className="text-lg font-bold text-primary-700">
                            {formatCurrency(Number(tariff.price))}
                            <span className="text-xs font-normal text-muted-foreground ml-1">
                              / {tariff.unit}
                            </span>
                          </p>
                          {tariff.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">{tariff.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}


import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Award,
  Users,
  GraduationCap,
  Building2,
  MessageSquareText,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  { icon: ShieldCheck, label: "Resmi Kemenperin" },
  { icon: Award, label: "Sertifikasi BNSP" },
  { icon: Users, label: "Instruktur Profesional" },
];

const services = [
  {
    icon: GraduationCap,
    title: "Pelatihan Industri",
    description: "Program diklat untuk pengembangan kompetensi.",
    color: "from-blue-500/20 to-cyan-500/5",
  },
  {
    icon: Building2,
    title: "Penyewaan Fasilitas",
    description: "Pengajuan penggunaan fasilitas balai.",
    color: "from-indigo-500/20 to-blue-500/5",
  },
  {
    icon: MessageSquareText,
    title: "Konsultasi Industri",
    description: "Informasi dan konsultasi layanan industri.",
    color: "from-emerald-500/20 to-teal-500/5",
  },
];

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-112px)] items-center overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80)" }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/80" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_45%,rgba(30,64,175,0.35),transparent_55%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_95%)]" />
      </div>

      {/* Main Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">

          {/* LEFT: Main Content */}
          <div className="relative z-10 max-w-2xl lg:translate-y-3">

            {/* Badge */}
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[11px] font-medium text-slate-200 sm:text-xs">
                Layanan PNBP Resmi — BDI Makassar
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-4 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.7rem] lg:text-[2.8rem] xl:text-5xl">
              Akselerasi SDM &amp;
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                Fasilitas Industri Unggulan
              </span>
            </h1>

            {/* Description */}
            <p className="mb-6 max-w-xl text-sm leading-6 text-slate-300 sm:text-[15px] sm:leading-7">
              Portal resmi pengajuan layanan diklat terpadu, penyewaan
              fasilitas modern, dan konsultasi industri di bawah naungan
              BPSDMI Kementerian Perindustrian RI.
            </p>

            {/* CTA */}
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/layanan" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-10 w-full rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 sm:w-auto"
                >
                  Eksplorasi Layanan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/panduan" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-10 w-full rounded-lg border-white/15 bg-white/5 px-5 text-sm font-medium text-white backdrop-blur-md hover:border-white/30 hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <BookOpen className="mr-2 h-4 w-4 text-slate-300" />
                  Panduan Pengajuan
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-5">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2"
                >
                  <div className="rounded-md border border-white/10 bg-white/5 p-1.5">
                    <item.icon className="h-3.5 w-3.5 text-sky-300" />
                  </div>

                  <span className="text-[11px] font-medium text-slate-300 sm:text-xs">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Visual Service Panel */}
          <div className="relative mx-auto hidden w-full max-w-md lg:block">

            {/* Decorative Glow */}
            <div className="absolute -inset-8 rounded-full bg-blue-600/10 blur-3xl" />

            {/* Main Visual Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">

              {/* Card Header */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2 text-xs text-slate-400">
                    <Sparkles className="h-3.5 w-3.5 text-sky-300" />
                    Layanan Terpadu
                  </div>

                  <h2 className="text-lg font-bold tracking-tight text-white">
                    Layanan BDI Makassar
                  </h2>
                </div>

                <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-2.5">
                  <Building2 className="h-5 w-5 text-blue-300" />
                </div>
              </div>

              {/* Service Cards */}
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className={`group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-gradient-to-r ${service.color} p-3.5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-slate-950/50">
                      <service.icon className="h-5 w-5 text-sky-300" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-white">
                        {service.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {service.description}
                      </p>
                    </div>

                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400/80" />
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs text-slate-400">
                  Informasi layanan resmi
                </span>

                <Link
                  href="/layanan"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 transition-colors hover:text-sky-200"
                >
                  Selengkapnya
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Floating Decorative Label */}
            <div className="absolute -bottom-5 -left-6 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/95 px-4 py-3 shadow-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  Pelayanan Terpadu
                </p>
                <p className="text-[10px] text-slate-400">
                  Balai Diklat Industri Makassar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </section>
  );
}
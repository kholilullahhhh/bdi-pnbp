import Link from "next/link";
import { ArrowRight, GraduationCap, Users, Home, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  Users,
  Home,
  Compass,
};

const serviceImages: Record<string, string> = {
  "diklat-pelatihan": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
  "jasa-narasumber": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
  "penyewaan-fasilitas": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
  "wisata-edukasi": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
};

const serviceGradients: Record<string, string> = {
  "diklat-pelatihan": "from-blue-500 to-blue-700",
  "jasa-narasumber": "from-emerald-500 to-emerald-700",
  "penyewaan-fasilitas": "from-amber-500 to-amber-700",
  "wisata-edukasi": "from-violet-500 to-violet-700",
};

const fallbackServices = [
  {
    id: "1",
    name: "Diklat & Pelatihan",
    description: "Pelatihan berbasis kompetensi industri dengan sistem 3 in 1: pelatihan, sertifikasi, dan penempatan kerja.",
    slug: "diklat-pelatihan",
    category: { name: "Pelatihan", icon: "GraduationCap" },
    badge: "Unggulan",
  },
  {
    id: "2",
    name: "Jasa Narasumber",
    description: "Seminar, workshop, dan pendampingan teknis oleh instruktur berpengalaman di bidangnya.",
    slug: "jasa-narasumber",
    category: { name: "Konsultasi", icon: "Users" },
  },
  {
    id: "3",
    name: "Penyewaan Fasilitas",
    description: "Aula, laboratorium modern, ruang kelas, dan asrama untuk mendukung kegiatan operasional Anda.",
    slug: "penyewaan-fasilitas",
    category: { name: "Fasilitas", icon: "Home" },
  },
  {
    id: "4",
    name: "Wisata Edukasi",
    description: "Kunjungan pembelajaran langsung terkait proses pengolahan produk pangan & desain kemasan.",
    slug: "wisata-edukasi",
    category: { name: "Edukasi", icon: "Compass" },
    badge: "Populer",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ServicesSection({ services }: { services?: any[] }) {
  const displayServices = services && services.length > 0 ? services : fallbackServices;

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700 bg-primary-50 border-primary-200 rounded-full">
            Katalog Layanan PNBP
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pilihan Layanan Sesuai Kebutuhan Anda
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Temukan solusi pelatihan SDM, konsultasi teknis, hingga sewa sarana prasarana industri dengan tarif resmi PNBP.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((s) => {
            const Icon = iconMap[s.category?.icon] || GraduationCap;
            const imgSrc = serviceImages[s.slug];
            const gradient = serviceGradients[s.slug] || "from-primary-500 to-primary-700";

            return (
              <Link key={s.id} href={`/layanan/${s.slug}`} className="group block h-full">
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary-200 h-full flex flex-col overflow-hidden">
                  {/* Thumbnail Image */}
                  <div
                    className="relative h-48 overflow-hidden bg-cover bg-center"
                    style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : undefined}
                  >
                    {!imgSrc && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                    {s.badge && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/90 text-slate-900 border-0 text-[11px] font-semibold backdrop-blur-md shadow-sm px-2.5 py-0.5">
                          {s.badge}
                        </Badge>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3">
                      <div className="p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-primary-700 shadow-sm border border-white/20">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-primary-600 uppercase tracking-wider">
                        {s.category?.name || "Layanan"}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                        {s.name}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {s.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-primary-600">
                      <span>Lihat Detail Layanan</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors px-5 py-2.5 rounded-full hover:bg-primary-50"
          >
            Lihat Seluruh Katalog Layanan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

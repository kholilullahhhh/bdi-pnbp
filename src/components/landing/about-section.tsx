import { CheckCircle2, GraduationCap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: GraduationCap, title: "Diklat 3 in 1", desc: "Pelatihan, sertifikasi, & penempatan" },
  { icon: Award, title: "LSP-P2 BNSP", desc: "Sertifikasi standar kompetensi nasional" },
];

const checkItems = [
  "Sistem Diklat 3 in 1 Terintegrasi",
  "Sertifikasi Resmi dari BNSP",
  "Jejaring Mitra Industri Luas",
  "Laboratorium & Fasilitas Modern",
];

export function AboutSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Left */}
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="outline" className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700 bg-primary-50 border-primary-200 rounded-full">
              Profil Lembaga
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Mewujudkan SDM Industri Berdaya Saing Global
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Balai Diklat Industri (BDI) Makassar merupakan Unit Pelaksana Teknis di bawah Badan Pengembangan Sumber Daya Manusia Industri (BPSDMI) Kementerian Perindustrian RI.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Berfokus pada bidang spesialisasi Industri Agro, Pangan, Fitofarmaka, dan Desain Kemasan, kami berkomitmen mengakselerasi kompetensi tenaga kerja industri Indonesia.
            </p>

            <div className="pt-4 grid sm:grid-cols-2 gap-3.5">
              {checkItems.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 sm:text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image & Overlay Badges Right */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 right-6 sm:right-auto grid grid-cols-2 gap-3 max-w-sm">
                {features.map((f) => (
                  <div key={f.title} className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/80">
                    <f.icon className="h-5 w-5 text-primary-600 mb-2" />
                    <p className="text-xs font-bold text-slate-900">{f.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
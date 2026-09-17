import { Search, UserPlus, FileCheck, CreditCard, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  { step: "01", icon: Search, title: "Pilih Layanan", desc: "Cari dan pilih jenis layanan PNBP yang Anda butuhkan." },
  { step: "02", icon: UserPlus, title: "Daftar & Ajukan", desc: "Buat akun resmi dan lengkapi berkas formulir permohonan." },
  { step: "03", icon: FileCheck, title: "Verifikasi Dokumen", desc: "Tim verifikator memeriksa kelayakan kelengkapan berkas." },
  { step: "04", icon: CreditCard, title: "Pembayaran PNBP", desc: "Lakukan pembayaran melalui kode billing SIMPONI resmi." },
  { step: "05", icon: CheckCircle2, title: "Pelaksanaan Layanan", desc: "Nikmati layanan dan terima bukti penyelesaian pengajuan." },
];

export function FlowSection() {
  return (
    <section className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <Badge variant="outline" className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-300 bg-primary-950/50 border-primary-800 rounded-full">
            Alur Permohonan
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            5 Langkah Mudah Mengakses Layanan
          </h2>
          <p className="text-slate-400 text-base">
            Proses pengajuan yang transparan, terintegrasi, dan terpantau secara online.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-0.5 bg-slate-800 z-0" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center shadow-lg group-hover:border-primary-500 group-hover:bg-slate-800 transition-all duration-300">
                    <s.icon className="h-8 w-8 text-primary-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full border-2 border-slate-900">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
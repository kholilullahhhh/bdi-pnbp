import { MapPin, Phone, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const contacts = [
  {
    icon: MapPin,
    title: "Alamat Kantor",
    lines: ["Jl. Perintis Kemerdekaan Km 17", "Makassar, Sulawesi Selatan 90242"],
  },
  {
    icon: Phone,
    title: "Kontak Layanan",
    lines: ["Telp: (0411) 556617", "WhatsApp: 0822-9331-9335"],
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    lines: ["Senin – Kamis: 08:00 – 16:00 WITA", "Jumat: 08:00 – 16:30 WITA"],
  },
];

export function ContactSection() {
  return (
    <section className="py-24 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700 bg-primary-50 border-primary-200 rounded-full">
            Informasi Pelayanan
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hubungi atau Kunjungi Kami
          </h2>
          <p className="text-slate-600 text-base">
            Tim Helpdesk BDI Makassar siap memberikan informasi dan layanan konsultasi.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contacts.map((c) => (
            <div key={c.title} className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm text-center space-y-4 hover:border-primary-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
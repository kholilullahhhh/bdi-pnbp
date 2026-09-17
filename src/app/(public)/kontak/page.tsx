import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { PageHero } from "@/components/landing/page-hero";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

export default function KontakPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <main className="flex-1">
        <PageHero
          title="Hubungi Kami"
          description="Kami siap membantu informasi dan layanan PNBP Balai Diklat Industri Makassar."
          badge="Kontak"
          imageAlt="Kontak BDI Makassar"
        />

        <section className="py-16 lg:py-24 bg-slate-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-6">
            
            {/* Card Alamat */}
            <Card className="bg-white border-slate-200/80 hover:border-primary-500/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 rounded-2xl group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3.5 text-base font-bold text-slate-900">
                  <div className="w-11 h-11 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <MapPin className="h-5 w-5" />
                  </div>
                  Alamat Kantor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  Jl. Perintis Kemerdekaan Km 17
                  <br />
                  <span className="text-slate-500 font-normal">
                    Kota Makassar, Sulawesi Selatan
                  </span>
                </p>
              </CardContent>
            </Card>

            {/* Card Telepon & WhatsApp */}
            <Card className="bg-white border-slate-200/80 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 rounded-2xl group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3.5 text-base font-bold text-slate-900">
                  <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Phone className="h-5 w-5" />
                  </div>
                  Telepon & WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-600">
                  Telepon: <span className="font-semibold text-slate-900">0411-556617</span>
                </p>
                <p className="text-sm text-slate-600">
                  WhatsApp: <span className="font-semibold text-slate-900">0822-9331-9335</span>
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/6282293319335"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3.5 py-2 rounded-xl transition-all"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Chat via WhatsApp
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Card Email */}
            <Card className="bg-white border-slate-200/80 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 rounded-2xl group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3.5 text-base font-bold text-slate-900">
                  <div className="w-11 h-11 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Mail className="h-5 w-5" />
                  </div>
                  Email Resmi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:bdimks.kemenperin@gmail.com"
                  className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1.5"
                >
                  bdimks.kemenperin@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* Card Jam Layanan */}
            <Card className="bg-white border-slate-200/80 hover:border-amber-500/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 rounded-2xl group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3.5 text-base font-bold text-slate-900">
                  <div className="w-11 h-11 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>
                  Jam Layanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5">
                <p className="text-sm text-slate-700">
                  <span className="text-slate-500">Senin — Kamis:</span>{" "}
                  <span className="font-semibold text-slate-900">07:00 — 16:00 WITA</span>
                </p>
                <p className="text-sm text-slate-700">
                  <span className="text-slate-500">Jumat:</span>{" "}
                  <span className="font-semibold text-slate-900">07:30 — 16:30 WITA</span>
                </p>
              </CardContent>
            </Card>

          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
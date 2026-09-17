import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
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
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 py-16 lg:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-white/10 text-primary-100 hover:bg-white/20 backdrop-blur-md border-white/20 mb-4">
              Kontak
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Hubungi Kami
            </h1>
            <p className="mt-4 text-lg text-primary-200/80 max-w-2xl mx-auto">
              Kami siap membantu informasi layanan PNBP
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg className="relative block w-full h-8 sm:h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
              <path d="M0,0 C150,90 350,-40 500,65 C650,170 900,10 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-5">
            <Card className="hover:shadow-lg transition-shadow border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-primary-800 rounded-xl flex items-center justify-center shadow-md">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  Alamat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Jl. Perintis Kemerdekaan Km 17
                  <br />
                  Kota Makassar, Sulawesi Selatan
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-primary-800 rounded-xl flex items-center justify-center shadow-md">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  Telepon & WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Telepon: <span className="font-medium text-foreground">0411-556617</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  WhatsApp: <span className="font-medium text-foreground">0822-9331-9335</span>
                </p>
                <a
                  href="https://wa.me/6282293319335"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors mt-2"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Chat via WhatsApp
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-primary-800 rounded-xl flex items-center justify-center shadow-md">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:bdimks.kemenperin@gmail.com"
                  className="text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
                >
                  bdimks.kemenperin@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-primary-800 rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  Jam Layanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Senin — Kamis: 07:00 — 16:00 WITA
                </p>
                <p className="text-sm text-muted-foreground">
                  Jumat: 07:30 — 16:30 WITA
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

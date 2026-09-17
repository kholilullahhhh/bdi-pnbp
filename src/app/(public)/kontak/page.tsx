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
        <section className="gradient-hero py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-white/15 text-white border-white/20 mb-4">
              Kontak
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Hubungi Kami
            </h1>
            <p className="mt-4 text-lg text-primary-100/80 max-w-2xl mx-auto">
              Kami siap membantu informasi layanan PNBP
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-5">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary-700" />
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

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-primary-700" />
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

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary-700" />
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

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary-700" />
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

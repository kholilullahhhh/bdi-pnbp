import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        {/* Header */}
        <section className="gradient-bg py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">Kontak Kami</h1>
              <p className="mt-4 text-lg text-white/80">
                Hubungi kami untuk informasi layanan PNBP
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary-500" />
                    Alamat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Jl. Perintis Kemerdekaan Km 17
                    <br />
                    Kota Makassar
                    <br />
                    Prov. Sulawesi Selatan
                    <br />
                    Indonesia
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary-500" />
                    Telepon & WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600">Telepon: 0411-556617</p>
                  <p className="text-gray-600">WhatsApp: 0822-9331-9335</p>
                  <a
                    href="https://wa.me/6282293319335"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 mt-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Chat via WhatsApp
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary-500" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:bdimks.kemenperin@gmail.com"
                    className="text-primary-500 hover:text-primary-600"
                  >
                    bdimks.kemenperin@gmail.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary-500" />
                    Jam Layanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p className="text-gray-600">
                    Senin - Kamis: 07:00 - 16:00 WITA
                  </p>
                  <p className="text-gray-600">
                    Jumat: 07:30 - 16:30 WITA
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

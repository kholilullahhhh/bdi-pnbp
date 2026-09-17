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
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";

export default function PembayaranPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="gradient-hero py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-white/15 text-white border-white/20 mb-4">
              Pembayaran
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Informasi Pembayaran
            </h1>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Card className="border-amber-200 bg-warning-light">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-900">
                      Informasi Penting
                    </h3>
                    <p className="text-sm text-amber-800 mt-1">
                      Mekanisme pembayaran masih manual. Hubungi kami untuk
                      informasi kanal pembayaran terkini. Selalu gunakan kanal
                      pembayaran resmi yang tertera di instruksi pembayaran.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alur Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Daftar & Ajukan",
                      desc: "Daftar layanan dan submit permohonan melalui sistem.",
                    },
                    {
                      step: "2",
                      title: "Verifikasi & Instruksi",
                      desc: "Admin melakukan verifikasi dan mengirimkan instruksi pembayaran.",
                    },
                    {
                      step: "3",
                      title: "Lakukan Pembayaran",
                      desc: "Bayar sesuai instruksi melalui kanal pembayaran yang ditentukan.",
                    },
                    {
                      step: "4",
                      title: "Konfirmasi & Selesai",
                      desc: "Petugas memverifikasi pembayaran dan mengonfirmasi status lunas.",
                    },
                  ].map((s) => (
                    <div
                      key={s.step}
                      className="flex items-start gap-4 p-4 rounded-xl bg-surface"
                    >
                      <div className="w-8 h-8 bg-primary-700 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {s.step}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{s.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary-700" />
                  Catatan Penting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Status &quot;Lunas&quot; hanya diberikan setelah verifikasi
                    petugas, bukan setelah upload bukti transfer.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Upload bukti transfer tidak otomatis mengubah status
                    pembayaran.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Hubungi 0411-556617 atau WhatsApp 0822-9331-9335 untuk
                    pertanyaan pembayaran.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Hindari melakukan pembayaran di luar kanal resmi yang
                    tertera.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

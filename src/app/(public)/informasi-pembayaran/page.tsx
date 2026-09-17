import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";

export default function InformasiPembayaranPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />

      <main className="flex-1">
        {/* Header */}
        <section className="gradient-bg py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <CreditCard className="h-12 w-12 text-white/80 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-white">
                Informasi Pembayaran
              </h1>
              <p className="mt-4 text-lg text-white/80">
                Panduan pembayaran PNBP BDI Makassar
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Warning */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-800">
                      Informasi Penting
                    </h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Mekanisme pembayaran PNBP BDI Makassar saat ini masih
                      dilakukan secara manual. Untuk informasi terkini mengenai
                      kanal pembayaran yang tersedia, silakan hubungi kami.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* General Info */}
            <Card>
              <CardHeader>
                <CardTitle>Bagaimana Pembayaran Dilakukan?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        1. Daftar Layanan
                      </h4>
                      <p className="text-sm text-gray-600">
                        Pilih layanan yang tersedia dan submit pendaftaran.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        2. Verifikasi & Instruksi Bayar
                      </h4>
                      <p className="text-sm text-gray-600">
                        Admin memverifikasi pendaftaran dan mengirimkan
                        instruksi pembayaran beserta jumlah tagihan.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        3. Lakukan Pembayaran
                      </h4>
                      <p className="text-sm text-gray-600">
                        Bayar sesuai instruksi yang diterima melalui kanal yang
                        ditentukan.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        4. Konfirmasi & Layanan
                      </h4>
                      <p className="text-sm text-gray-600">
                        Petugas memverifikasi pembayaran dan layanan dapat
                        dimulai.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary-500" />
                  Catatan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span>
                      Status &quot;Lunas&quot; hanya diberikan setelah pembayaran
                      diverifikasi oleh petugas yang berwenang.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span>
                      Pengunggahan bukti transfer tidak otomatis mengubah status
                      pembayaran.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span>
                      Untuk pertanyaan mengenai pembayaran, silakan hubungi
                      0411-556617 atau WhatsApp 0822-9331-9335.
                    </span>
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

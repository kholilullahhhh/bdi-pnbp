import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { CreditCard, AlertCircle, CheckCircle2, Info } from "lucide-react";

export default function PembayaranPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="gradient-bg py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <CreditCard className="h-12 w-12 text-white/80 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white">Informasi Pembayaran</h1>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            <Card className="border-yellow-200 bg-yellow-50"><CardContent className="pt-6"><div className="flex items-start gap-3"><AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" /><div><h3 className="font-semibold text-yellow-800">Informasi Penting</h3><p className="text-sm text-yellow-700 mt-1">Mekanisme pembayaran masih manual. Hubungi kami untuk informasi kanal pembayaran terkini.</p></div></div></CardContent></Card>
            <Card>
              <CardHeader><CardTitle>Alur Pembayaran</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {["Daftar layanan dan submit permohonan", "Admin verifikasi dan kirim instruksi bayar", "Bayar sesuai instruksi melalui kanal yang ditentukan", "Petugas verifikasi pembayaran dan konfirmasi status"].map((s, i) => (
                  <div key={s} className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><div><span className="font-medium text-gray-900">{i + 1}. </span><span className="text-sm text-gray-600">{s}</span></div></div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Info className="h-5 w-5 text-blue-700" />Catatan</CardTitle></CardHeader>
              <CardContent><ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" /><span>Status &quot;Lunas&quot; hanya diberikan setelah verifikasi petugas.</span></li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" /><span>Upload bukti transfer tidak otomatis mengubah status.</span></li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" /><span>Hubungi 0411-556617 untuk pertanyaan pembayaran.</span></li>
              </ul></CardContent>
            </Card>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

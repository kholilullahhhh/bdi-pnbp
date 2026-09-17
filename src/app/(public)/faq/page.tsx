"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

const categories = [
  { name: "Umum", items: [
    { q: "Apa itu PNBP?", a: "PNBP adalah Penerimaan Negara Bukan Pajak, yaitu penerimaan negara dari sumber bukan pajak yang dipungut berdasarkan peraturan yang berlaku." },
    { q: "Apa itu BDI Makassar?", a: "Balai Diklat Industri (BDI) Makassar adalah Unit Pelaksana Teknis di bawah BPSDMI Kementerian Perindustrian RI yang menyelenggarakan pendidikan dan pelatihan industri." },
  ]},
  { name: "Pendaftaran", items: [
    { q: "Bagaimana cara mendaftar pelatihan?", a: "Daftar melalui website di bagian Layanan, atau hubungi WhatsApp 0822-9331-9335. Bisa juga datang langsung ke kantor BDI Makassar." },
    { q: "Persyaratan apa saja yang diperlukan?", a: "Bervariasi per program. Umumnya: KTP/Paspor, pas foto, surat pengantar instansi (jika ditugaskan)." },
  ]},
  { name: "Pembayaran", items: [
    { q: "Apakah pelatihan dipungut biaya?", a: "Beberapa program dikenakan tarif PNBP, lainnya gratis (APBN). Tarif ditampilkan di halaman layanan." },
    { q: "Bagaimana cara pembayaran?", a: "Setelah verifikasi, Anda terima instruksi pembayaran. Bayar melalui kanal yang ditentukan, lalu tunggu konfirmasi petugas." },
  ]},
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg">
      <button className="w-full flex items-center justify-between p-4 text-left" onClick={() => setOpen(!open)}>
        <span className="font-medium text-gray-900">{q}</span>
        {open ? <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />}
      </button>
      {open && <div className="px-4 pb-4 text-gray-600 text-sm">{a}</div>}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="gradient-bg py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <HelpCircle className="h-12 w-12 text-white/80 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white">FAQ</h1>
            <p className="mt-4 text-lg text-white/80">Pertanyaan yang sering diajukan</p>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 space-y-8">
            {categories.map((c) => (
              <div key={c.name}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{c.name}</h2>
                <div className="space-y-3">{c.items.map((i) => <Item key={i.q} q={i.q} a={i.a} />)}</div>
              </div>
            ))}
            <Card className="mt-12">
              <CardHeader><CardTitle>Ada pertanyaan lain?</CardTitle></CardHeader>
              <CardContent><p className="text-gray-600 mb-2">Hubungi kami: Telepon 0411-556617 | WhatsApp 0822-9331-9335 | Email bdimks.kemenperin@gmail.com</p></CardContent>
            </Card>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

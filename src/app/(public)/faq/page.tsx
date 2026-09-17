"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

const categories = [
  {
    name: "Umum",
    items: [
      {
        q: "Apa itu PNBP?",
        a: "PNBP adalah Penerimaan Negara Bukan Pajak, yaitu penerimaan negara dari sumber bukan pajak yang dipungut berdasarkan peraturan yang berlaku.",
      },
      {
        q: "Apa itu BDI Makassar?",
        a: "Balai Diklat Industri (BDI) Makassar adalah Unit Pelaksana Teknis di bawah BPSDMI Kementerian Perindustrian RI yang menyelenggarakan pendidikan dan pelatihan industri.",
      },
      {
        q: "Siapa yang dapat menggunakan layanan PNBP?",
        a: "Layanan terbuka untuk masyarakat umum, UMKM, instansi pemerintah, dunia usaha, sekolah, dan universitas.",
      },
    ],
  },
  {
    name: "Pendaftaran",
    items: [
      {
        q: "Bagaimana cara mendaftar pelatihan?",
        a: "Daftar melalui website di bagian Layanan, atau hubungi WhatsApp 0822-9331-9335. Bisa juga datang langsung ke kantor BDI Makassar.",
      },
      {
        q: "Persyaratan apa saja yang diperlukan?",
        a: "Bervariasi per program. Umumnya: KTP/Paspor, pas foto, surat pengantar instansi (jika ditugaskan), dan formulir pendaftaran.",
      },
      {
        q: "Apakah ada batasan usia untuk mendaftar?",
        a: "Tidak ada batasan usia formal. Setiap program memiliki persyaratan teknis yang berbeda. Silakan cek detail program yang diminati.",
      },
    ],
  },
  {
    name: "Pembayaran",
    items: [
      {
        q: "Apakah pelatihan dipungut biaya?",
        a: "Beberapa program dikenakan tarif PNBP, lainnya gratis (APBN). Tarif ditampilkan di halaman layanan.",
      },
      {
        q: "Bagaimana cara pembayaran?",
        a: "Setelah verifikasi, Anda terima instruksi pembayaran. Bayar melalui kanal yang ditentukan, lalu tunggu konfirmasi petugas.",
      },
      {
        q: "Apakah ada bukti pembayaran?",
        a: "Ya, setelah pembayaran terverifikasi, Anda akan menerima bukti pembayaran resmi yang dapat diunduh dari dashboard.",
      },
    ],
  },
  {
    name: "Layanan",
    items: [
      {
        q: "Apakah layanan sudah tersedia secara online?",
        a: "Saat ini sistem masih dalam pengembangan. Beberapa layanan sudah dapat diakses online, lainnya masih melalui WhatsApp atau datang langsung.",
      },
      {
        q: "Bagaimana cara melacak status permohonan?",
        a: "Masuk ke dashboard pengguna, lalu lihat menu Permohonan untuk melihat status terkini.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${open ? "border-primary-200 bg-primary-50/30" : "border-border"}`}>
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-primary-50/50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-foreground pr-4">{q}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
          {a}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");

  const filtered = categories
    .map((c) => ({
      ...c,
      items: c.items.filter(
        (i) =>
          !search ||
          i.q.toLowerCase().includes(search.toLowerCase()) ||
          i.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((c) => c.items.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 py-16 lg:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-white/10 text-primary-100 hover:bg-white/20 backdrop-blur-md border-white/20 mb-4">
              FAQ
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg className="relative block w-full h-8 sm:h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
              <path d="M0,0 C150,90 350,-40 500,65 C650,170 900,10 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Input
                placeholder="Cari pertanyaan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-md border-primary-200 focus-visible:ring-primary-500"
              />
            </div>

            <div className="space-y-10">
              {filtered.map((c) => (
                <div key={c.name}>
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <HelpCircle className="h-4 w-4 text-primary-700" />
                    </div>
                    {c.name}
                  </h2>
                  <div className="space-y-3">
                    {c.items.map((i) => (
                      <FaqItem key={i.q} q={i.q} a={i.a} />
                    ))}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Tidak ada pertanyaan yang cocok dengan pencarian Anda
                  </p>
                </div>
              )}
            </div>

            <Card className="mt-12 border-primary-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center">
                    <HelpCircle className="h-4.5 w-4.5 text-primary-700" />
                  </div>
                  Ada pertanyaan lain?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hubungi kami: Telepon{" "}
                  <span className="font-medium text-foreground">0411-556617</span>{" "}
                  | WhatsApp{" "}
                  <span className="font-medium text-foreground">
                    0822-9331-9335
                  </span>{" "}
                  | Email{" "}
                  <span className="font-medium text-foreground">
                    bdimks.kemenperin@gmail.com
                  </span>
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

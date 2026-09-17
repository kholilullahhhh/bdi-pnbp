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
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-alt transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-foreground pr-4">{q}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
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
        <section className="gradient-hero py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-white/15 text-white border-white/20 mb-4">
              FAQ
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h1>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Input
                placeholder="Cari pertanyaan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="space-y-10">
              {filtered.map((c) => (
                <div key={c.name}>
                  <h2 className="text-xl font-bold text-foreground mb-4">
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

            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Ada pertanyaan lain?</CardTitle>
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

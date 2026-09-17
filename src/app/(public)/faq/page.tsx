import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    name: "Umum",
    items: [
      {
        q: "Apa itu PNBP?",
        a: "PNBP adalah Penerimaan Negara Bukan Pajak, yaitu penerimaan negara yang berasal dari penerimaan bukan pajak yang dipungut berdasarkan undang-undang atau peraturan yang berlaku. Di BDI Makassar, PNBP diperoleh dari layanan pelatihan, sertifikasi, penyewaan fasilitas, dan lainnya.",
      },
      {
        q: "Apa itu BDI Makassar?",
        a: "Balai Diklat Industri (BDI) Makassar adalah Unit Pelaksana Teknis di bawah Badan Pengembangan Sumber Daya Manusia Industri (BPSDMI) Kementerian Perindustrian RI yang menyelenggarakan pendidikan dan pelatihan di bidang industri.",
      },
    ],
  },
  {
    name: "Pendaftaran",
    items: [
      {
        q: "Bagaimana cara mendaftar pelatihan?",
        a: "Anda dapat mendaftar melalui website resmi kami di bagian Layanan, atau menghubungi WhatsApp kami di 0822-9331-9335. Pendaftaran juga dapat dilakukan datang langsung ke kantor BDI Makassar.",
      },
      {
        q: "Persyaratan apa saja yang diperlukan?",
        a: "Persyaratan bervariasi untuk setiap program. Umumnya diperlukan KTP/Paspor, pas foto, dan surat pengantar dari instansi (jika ditugaskan). Lihat detail persyaratan pada halaman layanan yang tersedia.",
      },
    ],
  },
  {
    name: "Tarif & Pembayaran",
    items: [
      {
        q: "Apakah pelatihan dipungut biaya?",
        a: "Beberapa program pelatihan kami dikenakan tarif PNBP sesuai ketentuan yang berlaku, sementara program lainnya mungkin gratis (dibiayai APBN). Informasi tarif akan ditampilkan pada setiap program yang tersedia.",
      },
      {
        q: "Bagaimana cara pembayaran PNBP?",
        a: "Setelah pendaftaran Anda diverifikasi, Anda akan menerima instruksi pembayaran. Pembayaran dapat dilakukan melalui transfer bank atau mekanisme lain yang ditentukan.",
      },
    ],
  },
  {
    name: "Sertifikasi",
    items: [
      {
        q: "Apakah BDI Makassar menyediakan sertifikasi?",
        a: "Ya, BDI Makassar memiliki Lembaga Sertifikasi Profesi (LSP) P1 yang terlisensi BNSP dengan 15 skema sertifikasi kompetensi di bidang pengolahan pangan dan industri.",
      },
      {
        q: "Siapa yang bisa mengikuti sertifikasi?",
        a: "Sertifikasi terbuka untuk alumni pelatihan BDI Makassar dan masyarakat umum yang memenuhi persyaratan kompetensi sesuai skema sertifikasi yang tersedia.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-900">{question}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 text-gray-600 text-sm">{answer}</div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />

      <main className="flex-1">
        {/* Header */}
        <section className="gradient-bg py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <HelpCircle className="h-12 w-12 text-white/80 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-white">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-lg text-white/80">
                Pertanyaan yang sering diajukan tentang layanan PNBP BDI Makassar
              </p>
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {faqCategories.map((category) => (
                <div key={category.name}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {category.name}
                  </h2>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <FAQItem
                        key={item.q}
                        question={item.q}
                        answer={item.a}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Ada pertanyaan lain?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Jika pertanyaan Anda belum terjawab di atas, silakan hubungi kami:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Telepon: 0411-556617</p>
                  <p>WhatsApp: 0822-9331-9335</p>
                  <p>Email: bdimks.kemenperin@gmail.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

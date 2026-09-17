"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Apa itu layanan PNBP BDI Makassar?",
    answer:
      "PNBP (Penerimaan Negara Bukan Pajak) adalah layanan resmi Balai Diklat Industri Makassar yang mencakup pelatihan industri, penyewaan fasilitas, jasa narasumber, dan wisata edukasi. Layanan ini diatur oleh peraturan perundang-undangan yang berlaku.",
  },
  {
    question: "Layanan apa saja yang tersedia?",
    answer:
      "Terdapat 4 kategori layanan utama: (1) Diklat & Pelatihan berbasis kompetensi industri, (2) Jasa Narasumber untuk seminar dan workshop, (3) Penyewaan Fasilitas seperti aula, ruang belajar, dan laboratorium, serta (4) Wisata Edukasi Industri untuk kunjungan pembelajaran.",
  },
  {
    question: "Bagaimana cara mengajukan permohonan layanan?",
    answer:
      "Anda perlu membuat akun terlebih dahulu, kemudian login ke sistem. Pilih layanan yang diinginkan, isi formulir pengajuan lengkap dengan dokumen persyaratan, lalu kirim permohonan. Tim kami akan memverifikasi dokumen Anda.",
  },
  {
    question: "Apakah pengguna harus membuat akun?",
    answer:
      "Ya, akun diperlukan untuk mengajukan permohonan dan melacak status permohonan Anda. Registrasi gratis dan hanya memerlukan data dasar seperti nama, email, dan informasi instansi.",
  },
  {
    question: "Bagaimana cara mengetahui status permohonan?",
    answer:
      "Setelah login, Anda dapat melihat status permohonan melalui dashboard 'Permohonan Saya'. Status akan diperbarui secara real-time mulai dari DRAFT, SUBMITTED, UNDER_REVIEW, hingga COMPLETED.",
  },
  {
    question: "Bagaimana mekanisme pembayaran?",
    answer:
      "Setelah permohonan disetujui, Anda akan menerima tagihan (invoice) yang dapat dilihat di menu 'Pembayaran'. Lakukan pembayaran sesuai nominal tagihan, lalu unggah bukti pembayaran. Petugas akan memverifikasi pembayaran Anda.",
  },
  {
    question: "Bagaimana cara menghubungi pengelola?",
    answer:
      "Anda dapat menghubungi kami melalui telepon di (0411) 556617, WhatsApp di 0822-9331-9335, atau email ke bdimks.kemenperin@gmail.com. Kami melayani pada hari Senin-Kamis pukul 08:00-16:00 WITA dan Jumat pukul 08:00-16:30 WITA.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 px-3 py-1 text-xs uppercase tracking-wider font-semibold"
          >
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-4 text-muted-foreground">
            Temukan jawaban atas pertanyaan umum mengenai layanan PNBP.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-border/60 rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-surface/50 transition-colors"
                aria-expanded={openIndex === idx}
              >
                <span className="text-sm font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    openIndex === idx && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

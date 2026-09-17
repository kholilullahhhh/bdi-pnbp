import { NextResponse } from "next/server";

const faqs = [
  {
    id: "1",
    question: "Apa itu PNBP?",
    answer: "PNBP adalah Penerimaan Negara Bukan Pajak, yaitu penerimaan negara yang berasal dari penerimaan bukan pajak yang dipungut berdasarkan undang-undang atau peraturan yang berlaku.",
    category: "Umum",
  },
  {
    id: "2",
    question: "Bagaimana cara mendaftar pelatihan?",
    answer: "Anda dapat mendaftar melalui website resmi kami di bagian Layanan, atau menghubungi WhatsApp kami di 0822-9331-9335.",
    category: "Pendaftaran",
  },
  {
    id: "3",
    question: "Apakah pelatihan dipungut biaya?",
    answer: "Beberapa program dikenakan tarif PNBP, sementara program lainnya mungkin gratis (dibiayai APBN). Informasi tarif ditampilkan pada setiap program.",
    category: "Tarif",
  },
  {
    id: "4",
    question: "Bagaimana cara pembayaran PNBP?",
    answer: "Setelah pendaftaran diverifikasi, Anda akan menerima instruksi pembayaran melalui kanal yang ditentukan oleh BDI Makassar.",
    category: "Pembayaran",
  },
  {
    id: "5",
    question: "Apakah BDI Makassar menyediakan sertifikasi?",
    answer: "Ya, BDI Makassar memiliki LSP P1 yang terlisensi BNSP dengan 15 skema sertifikasi kompetensi di bidang pengolahan pangan dan industri.",
    category: "Sertifikasi",
  },
  {
    id: "6",
    question: "Bagaimana cara menyewa fasilitas?",
    answer: "Anda dapat menyewa aula atau ruang rapat melalui form online di website kami. Pilih fasilitas, tentukan tanggal, dan submit pendaftaran.",
    category: "Penyewaan",
  },
];

export async function GET() {
  return NextResponse.json(faqs);
}

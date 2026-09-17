import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistem Informasi PNBP BDI Makassar",
  description:
    "Sistem Informasi Penerimaan Negara Bukan Pajak Balai Diklat Industri Makassar - Kementerian Perindustrian RI",
  keywords: [
    "PNBP",
    "BDI Makassar",
    "Balai Diklat Industri",
    "Kementerian Perindustrian",
    "Pelatihan Industri",
    "Sertifikasi Kompetensi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}

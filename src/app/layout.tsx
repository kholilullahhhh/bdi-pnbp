import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistem Informasi PNBP BDI Makassar",
  description: "Sistem Informasi Penerimaan Negara Bukan Pajak Balai Diklat Industri Makassar - Kementerian Perindustrian RI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased font-sans bg-white text-gray-900">{children}</body>
    </html>
  );
}

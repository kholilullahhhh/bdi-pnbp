import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sistem Informasi PNBP — BDI Makassar",
    template: "%s | PNBP BDI Makassar",
  },
  description:
    "Sistem Informasi Penerimaan Negara Bukan Pajak Balai Diklat Industri Makassar — Kementerian Perindustrian RI",
  keywords: [
    "PNBP",
    "BDI Makassar",
    "Balai Diklat Industri",
    "Kementerian Perindustrian",
    "pelatihan industri",
    "sertifikasi kompetensi",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground font-sans min-h-screen">
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            className: "text-sm",
          }}
        />
      </body>
    </html>
  );
}

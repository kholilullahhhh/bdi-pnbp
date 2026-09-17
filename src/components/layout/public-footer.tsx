import Link from "next/link";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Clock,
} from "lucide-react";

const links = {
  layanan: [
    { name: "Diklat & Pelatihan", href: "/layanan#diklat" },
    { name: "Jasa Narasumber", href: "/layanan#narasumber" },
    { name: "Penyewaan Fasilitas", href: "/layanan#penyewaan" },
    { name: "Wisata Edukasi", href: "/layanan#wisata" },
    { name: "Sertifikasi", href: "/layanan#sertifikasi" },
  ],
  info: [
    { name: "Tentang BDI", href: "/panduan" },
    { name: "Panduan Penggunaan", href: "/panduan" },
    { name: "FAQ", href: "/faq" },
    { name: "Kontak Kami", href: "/kontak" },
    { name: "Informasi Pembayaran", href: "/informasi-pembayaran" },
  ],
  terkait: [
    {
      name: "Kementerian Perindustrian",
      href: "https://kemenperin.go.id",
      external: true,
    },
    {
      name: "BPSDMI",
      href: "https://bpsdmi.kemenperin.go.id",
      external: true,
    },
    {
      name: "SIDIA",
      href: "https://sidia.kemenperin.go.id",
      external: true,
    },
  ],
};

export function PublicFooter() {
  return (
    <footer className="bg-primary-950 text-primary-200" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">
                  BDI MAKASSAR
                </p>
                <p className="text-[11px] text-primary-400 leading-tight">
                  Balai Diklat Industri
                </p>
              </div>
            </Link>
            <p className="text-sm text-primary-300 leading-relaxed">
              Lembaga pendidikan dan pelatihan di bidang industri yang unggul
              dan terpercaya di bawah Kementerian Perindustrian RI.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary-400" />
                <span>Jl. Perintis Kemerdekaan Km 17, Kota Makassar</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary-400" />
                <span>0411-556617</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary-400" />
                <span>bdimks.kemenperin@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 flex-shrink-0 text-primary-400" />
                <span>Sen–Kam: 07:00–16:00, Jum: 07:30–16:30</span>
              </div>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Layanan PNBP
            </h3>
            <ul className="space-y-2.5">
              {links.layanan.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-sm text-primary-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Informasi
            </h3>
            <ul className="space-y-2.5">
              {links.info.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-sm text-primary-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tautan terkait */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Tautan Terkait
            </h3>
            <ul className="space-y-2.5">
              {links.terkait.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-300 hover:text-white transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
                  >
                    {l.name}
                    {l.external && (
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-primary-400">
          <p>
            &copy; {new Date().getFullYear()} Balai Diklat Industri Makassar.
            Hak Cipta Dilindungi.
          </p>
          <p>Sistem Informasi PNBP BDI Makassar</p>
        </div>
      </div>
    </footer>
  );
}

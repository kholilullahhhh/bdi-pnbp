import Link from "next/link";
import { Building2, Phone, Mail, MapPin, ExternalLink, Clock } from "lucide-react";

const links = {
  layanan: [
    { name: "Diklat & Pelatihan", href: "/layanan#diklat" },
    { name: "Jasa Narasumber", href: "/layanan#narasumber" },
    { name: "Penyewaan Fasilitas", href: "/layanan#penyewaan" },
    { name: "Wisata Edukasi", href: "/layanan#wisata" },
  ],
  info: [
    { name: "Tentang BDI Makassar", href: "/panduan" },
    { name: "Panduan Penggunaan", href: "/panduan" },
    { name: "FAQ", href: "/faq" },
    { name: "Kontak & Lokasi", href: "/kontak" },
  ],
  terkait: [
    { name: "Kementerian Perindustrian", href: "https://kemenperin.go.id" },
    { name: "BPSDMI Kemenperin", href: "https://bpsdmi.kemenperin.go.id" },
    { name: "Portal SIINas", href: "https://siinas.kemenperin.go.id" },
  ],
};

export function PublicFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Identity & Address */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none">BDI MAKASSAR</p>
                <p className="text-[11px] text-slate-400 mt-1">Kementerian Perindustrian RI</p>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unit Pelaksana Teknis diklat industri spesialisasi Agro, Pangan, Fitofarmaka, dan Desain Kemasan.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary-400 shrink-0 mt-0.5" />
                <span>Jl. Perintis Kemerdekaan Km 17, Makassar</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary-400 shrink-0" />
                <span>(0411) 556617</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary-400 shrink-0" />
                <span>bdimks.kemenperin@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Nav 1: Services */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">Layanan PNBP</h3>
            <ul className="space-y-2.5 text-xs">
              {links.layanan.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav 2: Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">Informasi</h3>
            <ul className="space-y-2.5 text-xs">
              {links.info.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">Tautan Terkait</h3>
            <ul className="space-y-2.5 text-xs">
              {links.terkait.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    {l.name}
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Balai Diklat Industri Makassar. Hak Cipta Dilindungi.</p>
          <p>Sistem Informasi Layanan PNBP</p>
        </div>
      </div>
    </footer>
  );
}
import Link from "next/link";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";

const footerLinks = {
  layanan: [
    { name: "Diklat & Pelatihan", href: "/layanan#diklat" },
    { name: "Jasa Narasumber", href: "/layanan#narasumber" },
    { name: "Penyewaan Fasilitas", href: "/layanan#penyewaan" },
    { name: "Wisata Edukasi", href: "/layanan#wisata" },
    { name: "Sertifikasi", href: "/layanan#sertifikasi" },
  ],
  informasi: [
    { name: "Tentang BDI", href: "/tentang" },
    { name: "Panduan", href: "/panduan" },
    { name: "FAQ", href: "/faq" },
    { name: "Pengumuman", href: "/pengumuman" },
    { name: "Kontak", href: "/kontak" },
  ],
  terkait: [
    { name: "Kementerian Perindustrian", href: "https://kemenperin.go.id", external: true },
    { name: "BPSDMI", href: "https://bpsdmi.kemenperin.go.id", external: true },
    { name: "SIDIA", href: "https://sidia.kemenperin.go.id", external: true },
  ],
};

export function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">
                  BDI MAKASSAR
                </p>
                <p className="text-[10px] text-gray-400 leading-tight">
                  Balai Diklat Industri
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Balai Diklat Industri Makassar adalah lembaga pendidikan dan
              pelatihan di bidang industri yang unggul, berbasis kompetensi,
              dan berdaya saing.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Jl. Perintis Kemerdekaan Km 17, Kota Makassar, Prov.
                  Sulawesi Selatan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>0411-556617</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>bdimks.kemenperin@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Layanan PNBP
            </h3>
            <ul className="space-y-2">
              {footerLinks.layanan.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Informasi
            </h3>
            <ul className="space-y-2">
              {footerLinks.informasi.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Terkait */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Tautan Terkait
            </h3>
            <ul className="space-y-2">
              {footerLinks.terkait.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors flex items-center gap-1"
                  >
                    {link.name}
                    {link.external && (
                      <ExternalLink className="h-3 w-3" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Balai Diklat Industri Makassar.
              Hak Cipta Dilindungi.
            </p>
            <p>Sistem Informasi PNBP BDI Makassar</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

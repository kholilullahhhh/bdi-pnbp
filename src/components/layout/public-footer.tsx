import Link from "next/link";
import { Building2, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const links = {
  layanan: [
    { name: "Diklat & Pelatihan", href: "/layanan" },
    { name: "Jasa Narasumber", href: "/layanan" },
    { name: "Penyewaan Fasilitas", href: "/layanan" },
    { name: "Wisata Edukasi", href: "/layanan" },
  ],
  info: [
    { name: "Tentang BDI", href: "/panduan" },
    { name: "Panduan", href: "/panduan" },
    { name: "FAQ", href: "/faq" },
    { name: "Kontak", href: "/kontak" },
  ],
  terkait: [
    { name: "Kementerian Perindustrian", href: "https://kemenperin.go.id" },
    { name: "BPSDMI", href: "https://bpsdmi.kemenperin.go.id" },
    { name: "SIDIA", href: "https://sidia.kemenperin.go.id" },
  ],
};

export function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">BDI MAKASSAR</p>
              <p className="text-[10px] text-gray-400">Balai Diklat Industri</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">Lembaga pendidikan dan pelatihan di bidang industri yang unggul, berbasis kompetensi, dan berdaya saing.</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" /><span>Jl. Perintis Kemerdekaan Km 17, Kota Makassar</span></div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 flex-shrink-0" /><span>0411-556617</span></div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 flex-shrink-0" /><span>bdimks.kemenperin@gmail.com</span></div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Layanan PNBP</h3>
          <ul className="space-y-2">{links.layanan.map((l) => <li key={l.name}><Link href={l.href} className="text-sm hover:text-white transition-colors">{l.name}</Link></li>)}</ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Informasi</h3>
          <ul className="space-y-2">{links.info.map((l) => <li key={l.name}><Link href={l.href} className="text-sm hover:text-white transition-colors">{l.name}</Link></li>)}</ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Tautan Terkait</h3>
          <ul className="space-y-2">{links.terkait.map((l) => <li key={l.name}><a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors flex items-center gap-1">{l.name}<ExternalLink className="h-3 w-3" /></a></li>)}</ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Balai Diklat Industri Makassar. Hak Cipta Dilindungi.</p>
          <p>Sistem Informasi PNBP BDI Makassar</p>
        </div>
      </div>
    </footer>
  );
}

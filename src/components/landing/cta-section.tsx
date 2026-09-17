import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 text-white shadow-2xl">
          {/* Glowing Gradients */}
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-600/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl space-y-3 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Siap Meningkatkan Kualitas SDM Industri Anda?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Konsultasikan kebutuhan pelatihan, penyewaan sarana, atau pendampingan teknis bersama tim kami.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 shrink-0">
              <Link href="/layanan" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-12 bg-primary-600 text-white hover:bg-primary-500 font-semibold px-7 rounded-xl shadow-lg shadow-primary-600/30">
                  Mulai Pengajuan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/kontak" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 border-white/20 bg-white/5 text-white hover:bg-white/10 font-semibold px-7 rounded-xl backdrop-blur-md">
                  <Headphones className="mr-2 h-4 w-4 text-slate-300" />
                  Hubungi Helpdesk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
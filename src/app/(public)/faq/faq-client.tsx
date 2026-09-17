"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { PageHero } from "@/components/landing/page-hero";
import { cn } from "@/lib/utils";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sortOrder: number;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "border rounded-xl overflow-hidden transition-colors",
        open ? "border-primary-200 bg-primary-50/30" : "border-border/60 hover:border-primary/20"
      )}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between p-5 text-left hover:bg-primary-50/50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-foreground pr-4">{q}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
            open && "rotate-180 text-primary-600"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
          {a}
        </div>
      </div>
    </div>
  );
}

export function FAQClient({ faqs }: { faqs: FAQ[] }) {
  const [search, setSearch] = useState("");

  const categories = faqs.reduce<Record<string, FAQ[]>>((acc, faq) => {
    const cat = faq.category || "Umum";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});

  const filtered = Object.entries(categories)
    .map(([name, items]) => ({
      name,
      items: items.filter(
        (i) =>
          !search ||
          i.question.toLowerCase().includes(search.toLowerCase()) ||
          i.answer.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((c) => c.items.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <PageHero
          title="Pertanyaan yang Sering Diajukan"
          badge="FAQ"
          imageAlt="FAQ layanan PNBP"
        />

        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="relative max-w-md">
                <Input
                  placeholder="Cari pertanyaan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-10">
              {filtered.map((c) => (
                <div key={c.name}>
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <HelpCircle className="h-4 w-4 text-primary-700" />
                    </div>
                    {c.name}
                  </h2>
                  <div className="space-y-3">
                    {c.items.map((i) => (
                      <FaqItem key={i.id} q={i.question} a={i.answer} />
                    ))}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {faqs.length === 0
                      ? "Belum ada FAQ yang tersedia"
                      : "Tidak ada pertanyaan yang cocok dengan pencarian Anda"}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-12 bg-primary-50 border border-primary-200 rounded-2xl p-6 lg:p-8">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center">
                  <HelpCircle className="h-4 w-4 text-primary-700" />
                </div>
                Ada pertanyaan lain?
              </h3>
              <p className="text-muted-foreground">
                Hubungi kami: Telepon{" "}
                <span className="font-medium text-foreground">0411-556617</span>{" "}
                | WhatsApp{" "}
                <span className="font-medium text-foreground">
                  0822-9331-9335
                </span>{" "}
                | Email{" "}
                <span className="font-medium text-foreground">
                  bdimks.kemenperin@gmail.com
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

const faqs = [
  {
    id: "1",
    question: "Apa itu PNBP?",
    answer: "PNBP adalah Penerimaan Negara Bukan Pajak.",
    category: "Umum",
    sortOrder: 1,
  },
  {
    id: "2",
    question: "Bagaimana cara mendaftar?",
    answer: "Daftar melalui website atau WhatsApp 0822-9331-9335.",
    category: "Pendaftaran",
    sortOrder: 2,
  },
];

export default function FAQAdminPage() {
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    (f) =>
      !search ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Manajemen FAQ
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola pertanyaan yang sering diajukan
          </p>
        </div>
        <Button>
          <Plus className="mr-1.5 h-4 w-4" />
          Tambah FAQ
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar FAQ</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari pertanyaan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <EmptyState
              icon={<HelpCircle className="h-8 w-8" />}
              title="Tidak ada FAQ"
              description="Belum ada FAQ yang terdaftar."
            />
          ) : (
            <div className="space-y-3">
              {filtered.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-border rounded-xl p-4 hover:bg-surface-alt/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="info" className="text-[10px]">
                          {faq.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Urutan: {faq.sortOrder}
                        </span>
                      </div>
                      <p className="font-medium text-foreground mt-2">
                        {faq.question}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Hapus"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

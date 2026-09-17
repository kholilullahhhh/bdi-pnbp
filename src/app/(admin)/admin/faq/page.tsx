"use client";

import { useState } from "react";
import { HelpCircle, Search, Plus, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  { id: "1", question: "Apa itu PNBP?", answer: "PNBP adalah Penerimaan Negara Bukan Pajak.", category: "Umum", sortOrder: 1 },
  { id: "2", question: "Bagaimana cara mendaftar?", answer: "Daftar melalui website atau WhatsApp 0822-9331-9335.", category: "Pendaftaran", sortOrder: 2 },
];

export default function FAQAdminPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Manajemen FAQ</h1><p className="text-gray-600">Kelola pertanyaan yang sering diajukan</p></div>
        <Button><Plus className="h-4 w-4 mr-2" />Tambah FAQ</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar FAQ</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Cari pertanyaan..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">{faq.category}</span>
                      <span className="text-xs text-gray-500">Urutan: {faq.sortOrder}</span>
                    </div>
                    <p className="font-medium text-gray-900 mt-2">{faq.question}</p>
                    <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

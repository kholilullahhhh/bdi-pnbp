"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", instansi: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) { setError("Password tidak cocok"); return; }
    if (form.password.length < 6) { setError("Password minimal 6 karakter"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone || undefined, instansi: form.instansi || undefined, password: form.password }),
      });
      if (!res.ok) { const data = await res.json(); setError(data.error || "Gagal mendaftar"); return; }
      router.push("/login?registered=true");
    } catch { setError("Terjadi kesalahan"); }
    finally { setLoading(false); }
  };

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center"><Building2 className="h-7 w-7 text-white" /></div>
            <div className="text-left"><p className="text-lg font-bold text-blue-800">BDI MAKASSAR</p><p className="text-xs text-gray-500">Sistem Informasi PNBP</p></div>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Daftar Akun Baru</h2>
          <p className="mt-2 text-sm text-gray-600">Sudah punya akun? <Link href="/login" className="font-medium text-blue-700 hover:text-blue-800">Masuk sekarang</Link></p>
        </div>
        <Card>
          <CardHeader><CardTitle>Registrasi</CardTitle><CardDescription>Isi data diri Anda</CardDescription></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">{error}</div>}
              <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Nama Lengkap *</label><Input placeholder="Nama lengkap" value={form.name} onChange={(e) => set("name", e.target.value)} required /></div>
              <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Email *</label><Input type="email" placeholder="email@contoh.com" value={form.email} onChange={(e) => set("email", e.target.value)} required /></div>
              <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Nomor HP</label><Input type="tel" placeholder="081234567890" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></div>
              <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Instansi</label><Input placeholder="Nama instansi" value={form.instansi} onChange={(e) => set("instansi", e.target.value)} /></div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password *</label>
                <div className="relative">
                  <Input type={show ? "text" : "password"} placeholder="Minimal 6 karakter" value={form.password} onChange={(e) => set("password", e.target.value)} required />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" onClick={() => setShow(!show)}>{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                </div>
              </div>
              <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Konfirmasi Password *</label><Input type="password" placeholder="Ulangi password" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} required /></div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Memproses...</> : "Daftar"}</Button>
            </form>
          </CardContent>
        </Card>
        <div className="text-center"><Link href="/" className="text-sm text-gray-600 hover:text-blue-700">&larr; Kembali ke beranda</Link></div>
      </div>
    </div>
  );
}

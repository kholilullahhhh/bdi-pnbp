"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    instansi: "",
    password: "",
    confirm: "",
  });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Password tidak cocok");
      return;
    }
    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          instansi: form.instansi || undefined,
          password: form.password,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal mendaftar");
        toast.error(data.error || "Gagal mendaftar");
        return;
      }
      toast.success("Registrasi berhasil! Silakan masuk.");
      router.push("/login?registered=true");
    } catch {
      setError("Terjadi kesalahan");
      toast.error("Terjadi kesalahan saat registrasi");
    } finally {
      setLoading(false);
    }
  };

  const set = (k: string, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-12 h-12 bg-primary-800 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-primary-800 tracking-tight">
                BDI MAKASSAR
              </p>
              <p className="text-xs text-muted-foreground">
                Sistem Informasi PNBP
              </p>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            Daftar Akun Baru
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-700 hover:text-primary-800 transition-colors"
            >
              Masuk sekarang
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Registrasi</CardTitle>
            <CardDescription>Isi data diri Anda untuk mendaftar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive-light border border-red-200 text-red-800 text-sm rounded-lg p-3">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nama Lengkap <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Nama lengkap"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@contoh.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor HP</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="081234567890"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instansi">Instansi</Label>
                  <Input
                    id="instansi"
                    placeholder="Nama instansi"
                    value={form.instansi}
                    onChange={(e) => set("instansi", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="Minimal 6 karakter"
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShow(!show)}
                    aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {show ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">
                  Konfirmasi Password <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="Ulangi password"
                  value={form.confirm}
                  onChange={(e) => set("confirm", e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" loading={loading}>
                Daftar
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary-700 transition-colors"
          >
            &larr; Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

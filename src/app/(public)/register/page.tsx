
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Eye,
  EyeOff,
  ArrowLeft,
  UserRound,
  ShieldCheck,
} from "lucide-react";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Password tidak cocok");
      toast.error("Password tidak cocok");
      return;
    }

    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
      toast.error("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          instansi: form.instansi || undefined,
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message = data.error || "Gagal mendaftar";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Registrasi berhasil! Silakan masuk.");
      router.push("/login?registered=true");
    } catch {
      setError("Terjadi kesalahan saat registrasi");
      toast.error("Terjadi kesalahan saat registrasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-x-hidden bg-slate-50 px-4 py-6 sm:px-6 lg:h-svh lg:overflow-y-auto lg:px-8 lg:py-4">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="mb-5 flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-blue-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke beranda
          </Link>
        </div>

        {/* Register Card */}
        <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5 backdrop-blur">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* LEFT: Information Panel */}
            <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-7 text-white lg:flex">
              {/* Decorative Circles */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-2xl" />

              <div className="relative">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                  <Building2 className="h-6 w-6 text-sky-300" />
                </div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                  Layanan PNBP Resmi
                </p>

                <h1 className="text-3xl font-bold leading-tight tracking-tight">
                  Mulai Akses
                  <br />
                  Layanan BDI
                  <br />
                  Makassar
                </h1>

                <p className="mt-4 max-w-xs text-sm leading-6 text-blue-100/75">
                  Buat akun untuk mengajukan layanan diklat,
                  penyewaan fasilitas, dan konsultasi industri.
                </p>
              </div>

              <div className="relative mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <ShieldCheck className="h-4 w-4 text-sky-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      Akses Layanan Terpadu
                    </p>
                    <p className="text-xs text-blue-100/60">
                      Dalam satu akun
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 text-xs text-blue-100/50">
                  Balai Diklat Industri Makassar
                  <br />
                  Kementerian Perindustrian RI
                </div>
              </div>
            </div>

            {/* RIGHT: Registration Form */}
            <div className="p-5 sm:p-7 lg:p-8">
              <CardHeader className="mb-5 p-0">
                {/* Mobile Logo */}
                <div className="mb-4 flex items-center gap-2 lg:hidden">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-800 text-white">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    BDI MAKASSAR
                  </span>
                </div>

                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <UserRound className="h-5 w-5" />
                </div>

                <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                  Daftar Akun Baru
                </CardTitle>

                <CardDescription className="mt-1 text-sm text-slate-500">
                  Lengkapi data berikut untuk membuat akun.
                </CardDescription>

                <p className="mt-2 text-xs text-slate-500">
                  Sudah punya akun?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-blue-700 transition-colors hover:text-blue-900"
                  >
                    Masuk sekarang
                  </Link>
                </p>
              </CardHeader>

              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Message */}
                  {error && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs">
                        Nama Lengkap{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Nama lengkap"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className="h-10 text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs">
                        Email{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="email@contoh.com"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className="h-10 text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Institution */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs">
                        Nomor HP
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="081234567890"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className="h-10 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="instansi" className="text-xs">
                        Instansi
                      </Label>
                      <Input
                        id="instansi"
                        name="instansi"
                        autoComplete="organization"
                        placeholder="Nama instansi"
                        value={form.instansi}
                        onChange={(e) => set("instansi", e.target.value)}
                        className="h-10 text-sm"
                      />
                    </div>
                  </div>

                  {/* Password & Confirmation */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="password" className="text-xs">
                        Password{" "}
                        <span className="text-red-500">*</span>
                      </Label>

                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={show ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="Minimal 6 karakter"
                          value={form.password}
                          onChange={(e) => set("password", e.target.value)}
                          className="h-10 pr-10 text-sm"
                          minLength={6}
                          required
                        />

                        <button
                          type="button"
                          onClick={() => setShow(!show)}
                          aria-label={
                            show
                              ? "Sembunyikan password"
                              : "Tampilkan password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
                        >
                          {show ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="confirm" className="text-xs">
                        Konfirmasi Password{" "}
                        <span className="text-red-500">*</span>
                      </Label>

                      <div className="relative">
                        <Input
                          id="confirm"
                          name="confirm"
                          type={showConfirm ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="Ulangi password"
                          value={form.confirm}
                          onChange={(e) => set("confirm", e.target.value)}
                          className="h-10 pr-10 text-sm"
                          minLength={6}
                          required
                        />

                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          aria-label={
                            showConfirm
                              ? "Sembunyikan konfirmasi password"
                              : "Tampilkan konfirmasi password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
                        >
                          {showConfirm ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-1">
                    <Button
                      type="submit"
                      className="h-11 w-full rounded-lg bg-blue-700 text-sm font-semibold text-white shadow-md shadow-blue-700/20 transition-all hover:bg-blue-800"
                      loading={loading}
                      disabled={loading}
                    >
                      {loading ? "Memproses..." : "Buat Akun"}
                    </Button>

                    <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                      Dengan mendaftar, Anda dapat mengakses
                      layanan PNBP BDI Makassar.
                    </p>
                  </div>
                </form>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="mt-4 text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} Balai Diklat Industri Makassar
        </p>
      </div>
    </main>
  );
}
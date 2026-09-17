"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Building2, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) setError("Email atau password salah");
      else { router.push("/dashboard"); router.refresh(); }
    } catch { setError("Terjadi kesalahan"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center"><Building2 className="h-7 w-7 text-white" /></div>
            <div className="text-left"><p className="text-lg font-bold text-blue-800">BDI MAKASSAR</p><p className="text-xs text-gray-500">Sistem Informasi PNBP</p></div>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Masuk ke Akun</h2>
          <p className="mt-2 text-sm text-gray-600">Belum punya akun? <Link href="/register" className="font-medium text-blue-700 hover:text-blue-800">Daftar sekarang</Link></p>
        </div>
        <Card>
          <CardHeader><CardTitle>Login</CardTitle><CardDescription>Masukkan email dan password</CardDescription></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">{error}</div>}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input type="email" placeholder="email@contoh.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Input type={show ? "text" : "password"} placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShow(!show)}>
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Memproses...</> : "Masuk"}
              </Button>
            </form>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
              <p className="font-medium mb-1">Akun Demo:</p>
              <p>Admin: admin@bdi-makassar.go.id / admin123</p>
              <p>User: user@contoh.com / user123</p>
            </div>
          </CardContent>
        </Card>
        <div className="text-center"><Link href="/" className="text-sm text-gray-600 hover:text-blue-700">&larr; Kembali ke beranda</Link></div>
      </div>
    </div>
  );
}

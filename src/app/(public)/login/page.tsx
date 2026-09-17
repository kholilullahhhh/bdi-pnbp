"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Email atau password salah");
        toast.error("Login gagal", { description: "Email atau password salah" });
      } else {
        toast.success("Berhasil masuk");
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Terjadi kesalahan");
      toast.error("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl font-bold text-foreground">Masuk ke Akun</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-medium text-primary-700 hover:text-primary-800 transition-colors"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Login</CardTitle>
            <CardDescription>Masukkan email dan password Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive-light border border-red-200 text-red-800 text-sm rounded-lg p-3">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
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
              <Button type="submit" className="w-full" loading={loading}>
                Masuk
              </Button>
            </form>
            <div className="mt-5 p-3 bg-surface rounded-lg border border-border text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Akun Demo:</p>
              <p>
                Admin:{" "}
                <span className="font-mono">admin@bdi-makassar.go.id</span> /{" "}
                <span className="font-mono">admin123</span>
              </p>
              <p>
                User:{" "}
                <span className="font-mono">user@contoh.com</span> /{" "}
                <span className="font-mono">user123</span>
              </p>
            </div>
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

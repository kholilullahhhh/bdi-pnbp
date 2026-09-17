"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const registered = searchParams.get("registered");
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
        router.push(callbackUrl);
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
    <div className="bg-white rounded-2xl border border-border/60 shadow-lg overflow-hidden">
      <div className="p-6 lg:p-8">
        {registered && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg p-3 mb-4">
            Registrasi berhasil! Silakan masuk dengan akun Anda.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="mt-5 p-3 bg-muted/50 rounded-lg border border-border text-xs text-muted-foreground space-y-1">
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
      </div>
    </div>
  );
}

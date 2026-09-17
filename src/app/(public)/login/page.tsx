import Link from "next/link";
import { Suspense } from "react";
import { Building2 } from "lucide-react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
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

        <Suspense>
          <LoginForm />
        </Suspense>

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

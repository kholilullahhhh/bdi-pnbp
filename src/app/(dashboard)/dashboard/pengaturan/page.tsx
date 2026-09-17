"use client";

import { Building2, Globe, Mail, Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PengaturanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pengaturan</h1>
        <p className="text-muted-foreground mt-1">Konfigurasi sistem informasi</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profil Institusi */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Building2 className="h-4.5 w-4.5 text-white" />
            </div>
            <h3 className="text-base font-bold text-foreground">Profil Institusi</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institusi">Nama Institusi</Label>
              <Input id="institusi" defaultValue="Balai Diklat Industri Makassar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="singkatan">Singkatan</Label>
              <Input id="singkatan" defaultValue="BDI Makassar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kementerian">Kementerian</Label>
              <Input id="kementerian" defaultValue="Kementerian Perindustrian RI" />
            </div>
            <Button><Save className="mr-1.5 h-4 w-4" />Simpan Perubahan</Button>
          </div>
        </div>

        {/* Situs Web */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Globe className="h-4.5 w-4.5 text-white" />
            </div>
            <h3 className="text-base font-bold text-foreground">Situs Web</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website Utama</Label>
              <Input id="website" defaultValue="bdimakassar.kemenperin.go.id" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website-alt">Website Alternatif</Label>
              <Input id="website-alt" defaultValue="bdimakassar.id" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sidia">SIDIA</Label>
              <Input id="sidia" defaultValue="sidia.kemenperin.go.id" />
            </div>
            <Button><Save className="mr-1.5 h-4 w-4" />Simpan Perubahan</Button>
          </div>
        </div>

        {/* Kontak */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Mail className="h-4.5 w-4.5 text-white" />
            </div>
            <h3 className="text-base font-bold text-foreground">Kontak</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-kontak">Email</Label>
              <Input id="email-kontak" defaultValue="bdimks.kemenperin@gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telepon">Telepon</Label>
              <Input id="telepon" defaultValue="0411-556617" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" defaultValue="0822-9331-9335" />
            </div>
            <Button><Save className="mr-1.5 h-4 w-4" />Simpan Perubahan</Button>
          </div>
        </div>

        {/* Notifikasi */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Bell className="h-4.5 w-4.5 text-white" />
            </div>
            <h3 className="text-base font-bold text-foreground">Notifikasi</h3>
          </div>
          <div className="p-6 space-y-0">
            <div className="flex items-center justify-between py-4 border-b border-border/60">
              <div>
                <p className="text-sm font-semibold text-foreground">Notifikasi Email</p>
                <p className="text-xs text-muted-foreground mt-0.5">Kirim notifikasi via email</p>
              </div>
              <button type="button" className="w-11 h-6 bg-primary-600 rounded-full relative transition-colors hover:bg-primary-700" aria-label="Toggle notifikasi email">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 transition-transform shadow-sm" />
              </button>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Auto Notifikasi</p>
                <p className="text-xs text-muted-foreground mt-0.5">Kirim notifikasi otomatis</p>
              </div>
              <button type="button" className="w-11 h-6 bg-gray-300 rounded-full relative transition-colors hover:bg-gray-400" aria-label="Toggle auto notifikasi">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform shadow-sm" />
              </button>
            </div>
            <div className="pt-4">
              <Button><Save className="mr-1.5 h-4 w-4" />Simpan Perubahan</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Settings, Building2, Globe, Mail, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PengaturanPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1><p className="text-gray-600">Konfigurasi sistem</p></div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" />Profil Institusi</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Nama Institusi</label><Input defaultValue="Balai Diklat Industri Makassar" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Singkatan</label><Input defaultValue="BDI Makassar" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Kementerian</label><Input defaultValue="Kementerian Perindustrian RI" /></div>
            <Button>Simpan Perubahan</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" />Situs Web</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Website Utama</label><Input defaultValue="bdimakassar.kemenperin.go.id" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Website Alternatif</label><Input defaultValue="bdimakassar.id" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">SIDIA</label><Input defaultValue="sidia.kemenperin.go.id" /></div>
            <Button>Simpan Perubahan</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" />Kontak</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Email</label><Input defaultValue="bdimks.kemenperin@gmail.com" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Telepon</label><Input defaultValue="0411-556617" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">WhatsApp</label><Input defaultValue="0822-9331-9335" /></div>
            <Button>Simpan Perubahan</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" />Notifikasi</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div><p className="text-sm font-medium text-gray-900">Notifikasi Email</p><p className="text-xs text-gray-500">Kirim notifikasi via email</p></div>
              <div className="w-10 h-6 bg-blue-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" /></div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div><p className="text-sm font-medium text-gray-900">Auto Notifikasi</p><p className="text-xs text-gray-500">Kirim notifikasi otomatis</p></div>
              <div className="w-10 h-6 bg-gray-300 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1" /></div>
            </div>
            <Button>Simpan Perubahan</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import {
  Building2,
  Globe,
  Mail,
  Bell,
  Save,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function PengaturanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pengaturan</h1>
        <p className="text-muted-foreground mt-1">
          Konfigurasi sistem informasi
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profil Institusi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                <Building2 className="h-4 w-4 text-primary-700" />
              </div>
              Profil Institusi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institusi">Nama Institusi</Label>
              <Input
                id="institusi"
                defaultValue="Balai Diklat Industri Makassar"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="singkatan">Singkatan</Label>
              <Input id="singkatan" defaultValue="BDI Makassar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kementerian">Kementerian</Label>
              <Input
                id="kementerian"
                defaultValue="Kementerian Perindustrian RI"
              />
            </div>
            <Button>
              <Save className="mr-1.5 h-4 w-4" />
              Simpan Perubahan
            </Button>
          </CardContent>
        </Card>

        {/* Situs Web */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                <Globe className="h-4 w-4 text-primary-700" />
              </div>
              Situs Web
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website Utama</Label>
              <Input
                id="website"
                defaultValue="bdimakassar.kemenperin.go.id"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website-alt">Website Alternatif</Label>
              <Input id="website-alt" defaultValue="bdimakassar.id" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sidia">SIDIA</Label>
              <Input id="sidia" defaultValue="sidia.kemenperin.go.id" />
            </div>
            <Button>
              <Save className="mr-1.5 h-4 w-4" />
              Simpan Perubahan
            </Button>
          </CardContent>
        </Card>

        {/* Kontak */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary-700" />
              </div>
              Kontak
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-kontak">Email</Label>
              <Input
                id="email-kontak"
                defaultValue="bdimks.kemenperin@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telepon">Telepon</Label>
              <Input id="telepon" defaultValue="0411-556617" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" defaultValue="0822-9331-9335" />
            </div>
            <Button>
              <Save className="mr-1.5 h-4 w-4" />
              Simpan Perubahan
            </Button>
          </CardContent>
        </Card>

        {/* Notifikasi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                <Bell className="h-4 w-4 text-primary-700" />
              </div>
              Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Notifikasi Email
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Kirim notifikasi via email
                </p>
              </div>
              <button
                type="button"
                className="w-10 h-6 bg-primary-600 rounded-full relative transition-colors"
                aria-label="Toggle notifikasi email"
              >
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Auto Notifikasi
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Kirim notifikasi otomatis
                </p>
              </div>
              <button
                type="button"
                className="w-10 h-6 bg-gray-300 rounded-full relative transition-colors"
                aria-label="Toggle auto notifikasi"
              >
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform" />
              </button>
            </div>
            <Separator className="mb-4" />
            <Button>
              <Save className="mr-1.5 h-4 w-4" />
              Simpan Perubahan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

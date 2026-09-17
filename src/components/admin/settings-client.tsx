"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Globe, Mail, Bell, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const defaultSettings: Record<string, Record<string, string>> = {
  institution: {
    name: "Balai Diklat Industri Makassar",
    shortName: "BDI Makassar",
    ministry: "Kementerian Perindustrian RI",
  },
  website: {
    main: "bdimakassar.kemenperin.go.id",
    alt: "bdimakassar.id",
    sidia: "sidia.kemenperin.go.id",
  },
  contact: {
    email: "bdimks.kemenperin@gmail.com",
    phone: "0411-556617",
    whatsapp: "0822-9331-9335",
  },
  notifications: {
    emailEnabled: "true",
    autoEnabled: "false",
  },
};

const settingFields: {
  group: string;
  label: string;
  icon: typeof Building2;
  iconGradient: string;
  fields: { key: string; label: string; placeholder?: string }[];
}[] = [
  {
    group: "institution",
    label: "Profil Institusi",
    icon: Building2,
    iconGradient: "from-blue-500 to-blue-600",
    fields: [
      { key: "name", label: "Nama Institusi" },
      { key: "shortName", label: "Singkatan" },
      { key: "ministry", label: "Kementerian" },
    ],
  },
  {
    group: "website",
    label: "Situs Web",
    icon: Globe,
    iconGradient: "from-violet-500 to-purple-500",
    fields: [
      { key: "main", label: "Website Utama" },
      { key: "alt", label: "Website Alternatif" },
      { key: "sidia", label: "SIDIA" },
    ],
  },
  {
    group: "contact",
    label: "Kontak",
    icon: Mail,
    iconGradient: "from-emerald-500 to-green-500",
    fields: [
      { key: "email", label: "Email" },
      { key: "phone", label: "Telepon" },
      { key: "whatsapp", label: "WhatsApp" },
    ],
  },
];

interface SettingsClientProps {
  initialSettings: Record<string, Record<string, string>>;
}

export function SettingsClient({ initialSettings }: SettingsClientProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<Record<string, Record<string, string>>>(
    initialSettings
  );
  const [saving, setSaving] = useState(false);

  const getValue = (group: string, key: string): string => {
    return settings[group]?.[key] ?? defaultSettings[group]?.[key] ?? "";
  };

  const setValue = (group: string, key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [group]: { ...prev[group], [key]: value },
    }));
  };

  const handleSave = async (group: string) => {
    setSaving(true);
    try {
      const groupData = settings[group] || {};
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: { [group]: groupData } }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal menyimpan");
        return;
      }

      toast.success("Pengaturan berhasil disimpan");
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {settingFields.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.group} className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center gap-3">
              <div className={`w-9 h-9 bg-gradient-to-br ${section.iconGradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <Icon className="h-4.5 w-4.5 text-white" />
              </div>
              <h3 className="text-base font-bold text-foreground">{section.label}</h3>
            </div>
            <div className="p-6 space-y-4">
              {section.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={`${section.group}-${field.key}`}>{field.label}</Label>
                  <Input
                    id={`${section.group}-${field.key}`}
                    value={getValue(section.group, field.key)}
                    onChange={(e) => setValue(section.group, field.key, e.target.value)}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <Button onClick={() => handleSave(section.group)} disabled={saving}>
                {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Save className="mr-1.5 h-4 w-4" />}
                Simpan Perubahan
              </Button>
            </div>
          </div>
        );
      })}

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Bell className="h-4.5 w-4.5 text-white" />
          </div>
          <h3 className="text-base font-bold text-foreground">Notifikasi</h3>
        </div>
        <div className="p-6 space-y-0">
          {[
            { key: "emailEnabled", label: "Notifikasi Email", desc: "Kirim notifikasi via email" },
            { key: "autoEnabled", label: "Auto Notifikasi", desc: "Kirim notifikasi otomatis" },
          ].map((item) => {
            const val = getValue("notifications", item.key);
            const isEnabled = val === "true";
            return (
              <div key={item.key} className="flex items-center justify-between py-4 border-b border-border/60 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setValue("notifications", item.key, isEnabled ? "false" : "true")}
                  className={`w-11 h-6 rounded-full relative transition-colors ${isEnabled ? "bg-primary-600 hover:bg-primary-700" : "bg-gray-300 hover:bg-gray-400"}`}
                  aria-label={`Toggle ${item.label}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${isEnabled ? "right-1" : "left-1"}`} />
                </button>
              </div>
            );
          })}
          <div className="pt-4">
            <Button onClick={() => handleSave("notifications")} disabled={saving}>
              {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Save className="mr-1.5 h-4 w-4" />}
              Simpan Perubahan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  User,
  Shield,
  BookOpen,
  FlaskConical,
  Activity,
  FileCode2,
  PenSquare,
  Globe,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PengaturanPage() {
  const [disclaimerEnabled, setDisclaimerEnabled] = useState(true);

  return (
    <div className="flex-1">
      {/* ==================== TOP BAR ==================== */}
      <div className="flex h-16 items-center justify-between border-b border-border/60 bg-white/50 px-8 backdrop-blur-sm">
        <h1 className="text-lg font-bold text-foreground">Pengaturan</h1>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-8 p-8 pb-24">
        {/* ==================== HEADER ==================== */}
        <header className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Profil & Preferensi
          </h2>
          <p className="text-base text-muted-foreground">
            Kelola informasi pribadi, peran sistem, dan konfigurasi model AI
            Anda.
          </p>
        </header>

        {/* ==================== MAIN CONTENT GRID ==================== */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* ——— LEFT COLUMN (Profil & Keamanan) ——— */}
          <div className="flex flex-col gap-8 lg:col-span-2">

            {/* Card 1: Informasi Profil */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-teal-600" />
                  <CardTitle className="text-base text-foreground">
                    Informasi Profil
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">

                {/* Avatar & Inputs */}
                <div className="flex flex-col gap-8 md:flex-row">
                  {/* Avatar Avatar */}
                  <div className="relative shrink-0">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-slate-400 overflow-hidden ring-4 ring-white shadow-sm">
                      <User className="h-12 w-12" />
                    </div>
                    <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-sm transition-colors hover:text-teal-600">
                      <PenSquare className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Form Grid */}
                  <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-semibold">
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Dr. Budi Santoso, Sp.P"
                        className="rounded-xl border-border/80 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-semibold">
                        Email Institusi
                      </Label>
                      <Input
                        id="email"
                        defaultValue="dr.budi@rsud-jkt.co.id"
                        className="rounded-xl border-border/80 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nip" className="text-xs font-semibold">
                        NIP / ID Medis
                      </Label>
                      <Input
                        id="nip"
                        defaultValue="NIP. 198005122008011009"
                        className="rounded-xl border-border/80 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instansi" className="text-xs font-semibold">
                        Instansi
                      </Label>
                      <Input
                        id="instansi"
                        defaultValue="RSUD Provinsi Jakarta"
                        className="rounded-xl border-border/80 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border/60">
                  <Button
                    variant="outline"
                    className="rounded-xl border-border/80 bg-white px-6 hover:bg-slate-50"
                  >
                    Batal
                  </Button>
                  <Button className="rounded-xl bg-[#007090] px-6 text-white shadow-sm hover:bg-[#005a75]">
                    Simpan Perubahan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Pengaturan Akun & Keamanan */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-slate-700" />
                  <CardTitle className="text-base text-foreground">
                    Pengaturan Akun & Keamanan
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="divide-y divide-border/60 p-0">
                {/* Password */}
                <div className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Ubah Kata Sandi
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Terakhir diubah 3 bulan yang lalu.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-xl border-border/80 bg-white hover:bg-slate-50 font-semibold"
                  >
                    Perbarui
                  </Button>
                </div>

                {/* Delete Account */}
                <div className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Hapus Akun
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tindakan ini permanen dan akan menghapus semua riwayat
                      personal.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-xl border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 font-semibold"
                  >
                    Hapus Akun
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ——— RIGHT COLUMN (Informasi Model & Preferensi) ——— */}
          <div className="flex flex-col gap-8 lg:col-span-1">

            {/* Card 3: Informasi Model AI */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-teal-700" />
                    <CardTitle className="text-base leading-tight">
                      Informasi
                      <br />
                      Model AI
                    </CardTitle>
                  </div>
                  <Badge className="bg-[#dcfce7] text-[#166534] hover:bg-[#dcfce7] font-semibold border-0 tracking-wide text-[10px] rounded-md px-2 py-1">
                    V1.2.4-STABLE
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Arsitektur Dasar */}
                <div className="rounded-xl border border-border/60 bg-slate-50/50 p-4 relative overflow-hidden">
                  <div className="absolute right-4 top-4 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-sm bg-slate-300" />
                    <div className="w-1.5 h-1.5 rounded-sm bg-slate-300" />
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    ARSITEKTUR DASAR
                  </p>
                  <p className="text-sm font-bold text-foreground mb-3">
                    VGG16 Binary Classifier
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Model deep learning pre-trained yang dioptimalkan untuk
                    klasifikasi citra medis dan ekstraksi fitur akustik.
                  </p>
                </div>

                {/* Grid Input/Output */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border/60 bg-white p-3">
                    <FileCode2 className="h-4 w-4 text-slate-500 mb-3" />
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">
                      Format Input
                    </p>
                    <p className="text-xs font-bold text-foreground mb-1">
                      STFT
                    </p>
                    <p className="text-[9px] text-muted-foreground leading-tight">
                      Short-Time Fourier Transform
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-white p-3">
                    <Activity className="h-4 w-4 text-slate-500 mb-3" />
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">
                      Kelas Output
                    </p>
                    <div className="space-y-1.5 mt-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                        Normal
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <div className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                        Pneumonia
                      </div>
                    </div>
                  </div>
                </div>

                {/* Link Dokumentasi */}
                <Button
                  variant="ghost"
                  className="w-full gap-2 text-teal-700 hover:text-teal-800 hover:bg-teal-50 mt-2 font-semibold"
                >
                  <BookOpen className="h-4 w-4" />
                  Lihat Dokumentasi Klinis
                </Button>
              </CardContent>
            </Card>

            {/* Card 4: Preferensi (Bahasa & Switch) */}
            <Card className="border-border/60 shadow-sm">
              <CardContent className="divide-y divide-border/60 p-0">
                {/* Bahasa */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-slate-600" />
                    <Label className="text-xs font-bold">
                      Bahasa Antarmuka
                    </Label>
                  </div>
                  <div className="relative">
                    <select
                      className="h-10 w-full appearance-none rounded-xl border border-border/80 bg-white px-3 text-sm text-foreground outline-none transition-all hover:border-muted-foreground/40 focus:border-teal-500 focus:ring-[3px] focus:ring-teal-500/20"
                      defaultValue="id"
                    >
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}

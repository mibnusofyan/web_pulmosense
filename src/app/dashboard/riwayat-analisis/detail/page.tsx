"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  Save,
  AlertTriangle,
  Stethoscope,
  Maximize2,
  RefreshCcw,
} from "lucide-react";

export default function DetailHasilPrediksiPage() {
  return (
    <div className="flex-1 space-y-8 p-8">
      {/* ==================== HEADER ==================== */}
      <div className="space-y-4">
        <Link
          href="/dashboard/riwayat-analisis"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Riwayat
        </Link>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Detail Hasil Prediksi
            </h1>
            <p className="text-base text-muted-foreground">
              ID Pasien: PS-2023-10492 • 24 Okt 2023, 14:30
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/80 bg-white hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Unduh PDF
            </Button>
            <Button className="gap-2 rounded-xl bg-teal-700 text-white hover:bg-teal-800">
              <Save className="h-4 w-4" />
              Simpan
            </Button>
          </div>
        </div>
      </div>

      {/* ==================== MAIN CONTENT GRID ==================== */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        {/* ——— LEFT COLUMN ——— */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Card 1: Hasil Analisis AI */}
          <Card className="overflow-hidden border-border/60 shadow-sm">
            <CardContent className="p-0">
              {/* Top section: Result & Confidence */}
              <div className="flex flex-col justify-between gap-6 bg-gradient-to-br from-rose-50/50 via-white to-white p-8 md:flex-row md:items-center">
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Hasil Analisis AI
                  </div>
                  <h2 className="text-4xl font-bold text-rose-700">
                    Indikasi
                    <br />
                    Pneumonia
                  </h2>
                  <Badge
                    variant="outline"
                    className="inline-flex gap-1.5 border-rose-200 bg-rose-50 px-3 py-1 text-rose-700 hover:bg-rose-50"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Risiko Tinggi
                  </Badge>
                </div>

                {/* Confidence Circle */}
                <div className="flex shrink-0 items-center justify-center rounded-2xl bg-slate-50 p-6 ring-1 ring-border/50">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-muted">
                    {/* Fake progress ring using border slice - in real app use an SVG circle */}
                    <svg className="absolute inset-0 h-full w-full -rotate-90">
                      <circle
                        cx="42"
                        cy="42"
                        r="42"
                        className="fill-none stroke-rose-600 stroke-[6]"
                        strokeDasharray="264"
                        strokeDashoffset="20" // ~92%
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-lg font-bold text-foreground">
                      92.4%
                    </span>
                  </div>
                  <div className="ml-4 flex flex-col">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Tingkat
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      Kepercayaan
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom section: Rekomendasi Medis */}
              <div className="border-t border-border/60 p-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-bold text-teal-800">
                  <Stethoscope className="h-4 w-4" />
                  Rekomendasi Medis
                </div>
                <div className="rounded-xl border border-teal-100 bg-slate-50/80 p-5 text-sm leading-relaxed text-foreground">
                  Disarankan melakukan pemeriksaan klinis lanjutan. Diperlukan
                  konfirmasi radiologi (X-Ray/CT Scan) dan evaluasi gejala
                  klinis oleh dokter spesialis paru untuk penegakan diagnosis
                  final.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Visualisasi Audio Paru */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Visualisasi Audio Paru</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* STFT Spectrogram Placeholder */}
              <div className="group relative overflow-hidden rounded-xl border border-border/80 bg-slate-900">
                <div className="absolute left-0 right-0 top-0 flex items-center justify-between bg-slate-900/60 p-3 backdrop-blur-sm z-10">
                  <span className="text-xs font-semibold text-white">
                    STFT Spectrogram
                  </span>
                  <Maximize2 className="h-4 w-4 text-white/70 hover:text-white cursor-pointer" />
                </div>
                <div className="relative h-[220px] w-full flex items-center justify-center overflow-hidden">
                  {/* Fake spectrogram background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
                  <div className="h-1 w-full bg-cyan-500/50 absolute top-1/2 -translate-y-1/2" />
                  <div className="w-1 h-32 bg-yellow-400 absolute left-1/2 -translate-x-1/2 blur-[2px] shadow-[0_0_20px_10px_rgba(250,204,21,0.4)]" />
                  <div className="w-0.5 h-16 bg-yellow-200 absolute left-1/2 -translate-x-1/2 shadow-[0_0_10px_5px_rgba(250,204,21,0.8)]" />
                  <div className="w-32 h-16 bg-pink-500/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-md" />
                </div>
              </div>

              {/* Heatmap Grad-CAM Placeholder */}
              <div className="group relative overflow-hidden rounded-xl border border-border/80 bg-slate-900">
                <div className="absolute left-0 right-0 top-0 flex items-center justify-between bg-slate-900/60 p-3 backdrop-blur-sm z-10">
                  <span className="text-xs font-semibold text-white">
                    Heatmap Grad-CAM
                  </span>
                  <Maximize2 className="h-4 w-4 text-white/70 hover:text-white cursor-pointer" />
                </div>
                <div className="relative h-[220px] w-full flex items-center justify-center overflow-hidden">
                   {/* Fake heatmap background */}
                   <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:14px_14px] opacity-20" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900" />
                   {/* Fake heatmap wave */}
                   <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d opacity-80" preserveAspectRatio="none">
                      <path d="M0,25 Q10,25 20,20 T40,30 T60,10 T80,35 T100,25 L100,50 L0,50 Z" fill="rgba(225,29,72,0.4)" className="blur-xl" />
                      <path d="M0,25 Q10,25 20,20 T40,30 T60,10 T80,35 T100,25" fill="none" stroke="rgba(251,113,133,0.8)" strokeWidth="1" className="blur-sm" />
                      <path d="M50,15 Q60,5 70,25" fill="none" stroke="rgba(253,224,71,0.9)" strokeWidth="2" className="blur-[1px] shadow-[0_0_10px_#fde047]" />
                   </svg>
                   <div className="absolute top-10 left-4 text-[10px] text-white/50 font-mono">23.9</div>
                   <div className="absolute bottom-4 left-0 w-full flex justify-around opacity-30">
                     {[...Array(20)].map((_, i) => (
                       <div key={i} className="w-px h-2 bg-white" />
                     ))}
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ——— RIGHT COLUMN ——— */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Card 3: Analisis Frekuensi */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Analisis Frekuensi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Low Frequency */}
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                  <span className="text-foreground">Low Frequency (&lt; 200Hz)</span>
                  <span className="text-foreground">Tinggi</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-rose-600"
                    style={{ width: "90%" }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  Indikasi crackles kasar
                </p>
              </div>

              {/* Mid Frequency */}
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                  <span className="text-foreground">Mid Frequency (200-600Hz)</span>
                  <span className="text-foreground">Normal</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-teal-600"
                    style={{ width: "45%" }}
                  />
                </div>
              </div>

              {/* High Frequency */}
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                  <span className="text-foreground">High Frequency (&gt; 600Hz)</span>
                  <span className="text-foreground">Sedang</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-500"
                    style={{ width: "65%" }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  Potensi wheezing ringan
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Button Analisis Ulang */}
          <Button
            variant="outline"
            className="w-full gap-2 rounded-xl border-border/80 bg-white py-6 text-teal-700 hover:bg-slate-50 hover:text-teal-800"
          >
            <RefreshCcw className="h-4 w-4" />
            Analisis Ulang Data
          </Button>

          {/* Medical Disclaimer */}
          <div className="rounded-xl border border-border/60 bg-slate-100/50 p-5">
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-foreground">
              MEDICAL DISCLAIMER
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground font-medium">
              Sistem ini menggunakan kecerdasan buatan untuk membantu analisis
              awal. Hasil ini <strong>bukanlah diagnosis medis final</strong> dan
              tidak menggantikan penilaian klinis oleh dokter profesional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  FileAudio,
  RefreshCcw,
  Stethoscope,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  formatBytes,
  formatDateTime,
  getAnalysisTone,
  getDisplayPrediction,
} from "@/lib/analysis-format";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

import { VisualizationGallery } from "./visualization-gallery";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{
    id?: string;
  }>;
};

const BAND_ORDER = ["Low", "Mid", "High"];

function sortBands<T extends { bandName: string }>(bands: T[]) {
  return [...bands].sort((a, b) => {
    const indexA = BAND_ORDER.indexOf(a.bandName);
    const indexB = BAND_ORDER.indexOf(b.bandName);
    return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
  });
}

export default async function DetailHasilPrediksiPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  if (!params?.id) {
    notFound();
  }

  const analysis = await prisma.analysis.findUnique({
    where: {
      id: params.id,
    },
    include: {
      frequencyBands: true,
    },
  });

  if (!analysis) {
    notFound();
  }

  const dateTime = formatDateTime(analysis.createdAt);
  const tone = getAnalysisTone(analysis.riskLevel, analysis.prediction);
  const sortedBands = sortBands(analysis.frequencyBands);

  return (
    <div className="flex flex-1 flex-col gap-8 p-8">
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard/riwayat-analisis"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Riwayat
        </Link>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Detail Hasil Prediksi
            </h1>
            <p className="text-base text-muted-foreground">
              ID Analisis: {analysis.id} - {dateTime.date}, {dateTime.time}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/analisis-baru">
              <Button
                variant="outline"
                className="gap-2 rounded-xl border-border/80 bg-white hover:bg-slate-50"
              >
                <RefreshCcw className="h-4 w-4" />
                Analisis Ulang
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <Card className="overflow-hidden border-border/60 shadow-sm">
            <CardContent className="p-0">
              <div
                className={cn(
                  "flex flex-col justify-between gap-6 p-8 md:flex-row md:items-center",
                  tone === "danger" &&
                    "bg-gradient-to-br from-rose-50/50 via-white to-white",
                  tone === "success" &&
                    "bg-gradient-to-br from-emerald-50/50 via-white to-white",
                  tone === "warning" &&
                    "bg-gradient-to-br from-slate-100/70 via-white to-white",
                )}
              >
                <div className="flex flex-col gap-4">
                  <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Hasil Analisis AI
                  </div>
                  <h2
                    className={cn(
                      "text-4xl font-bold",
                      tone === "danger" && "text-rose-700",
                      tone === "success" && "text-emerald-700",
                      tone === "warning" && "text-slate-700",
                    )}
                  >
                    {getDisplayPrediction(analysis.prediction)}
                  </h2>
                  <Badge
                    variant="outline"
                    className={cn(
                      "inline-flex w-fit gap-1.5 px-3 py-1",
                      tone === "danger" &&
                        "border-rose-200 bg-rose-50 text-rose-700",
                      tone === "success" &&
                        "border-emerald-200 bg-emerald-50 text-emerald-700",
                      tone === "warning" &&
                        "border-slate-200 bg-slate-100 text-slate-700",
                    )}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Risiko {analysis.riskLevel}
                  </Badge>
                </div>

                <div className="flex shrink-0 items-center justify-center rounded-2xl bg-slate-50 p-6 ring-1 ring-border/50">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-muted">
                    <span className="text-lg font-bold text-foreground">
                      {analysis.confidence.toFixed(1)}%
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

              <div className="border-t border-border/60 p-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-bold text-teal-800">
                  <Stethoscope className="h-4 w-4" />
                  Rekomendasi Medis
                </div>
                <div className="rounded-xl border border-teal-100 bg-slate-50/80 p-5 text-sm leading-relaxed text-foreground">
                  {analysis.recommendation ||
                    "Tidak ada rekomendasi tambahan dari AI service."}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Visualisasi Audio Paru</CardTitle>
            </CardHeader>
            <CardContent>
              <VisualizationGallery
                images={[
                  {
                    title: "STFT Spectrogram",
                    url: analysis.spectrogramUrl,
                    alt: "STFT spectrogram hasil analisis",
                  },
                  {
                    title: "Heatmap Grad-CAM",
                    url: analysis.gradcamUrl,
                    alt: "Grad-CAM hasil analisis",
                  },
                  {
                    title: "Overlay + Raw Waveform",
                    url: analysis.overlayWaveformUrl,
                    alt: "Overlay Grad-CAM dan raw waveform hasil analisis",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-1">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Data Analisis</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-slate-50/80 p-4">
                <FileAudio className="h-5 w-5 text-slate-500" />
                <div className="min-w-0">
                  <div className="truncate font-semibold text-foreground">
                    {analysis.audioFileName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatBytes(analysis.fileSize)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/60 bg-white p-3">
                  <div className="text-xs text-muted-foreground">Pasien</div>
                  <div className="mt-1 font-semibold text-foreground">
                    {analysis.patientName || "-"}
                  </div>
                </div>
                <div className="rounded-xl border border-border/60 bg-white p-3">
                  <div className="text-xs text-muted-foreground">
                    Sample Rate
                  </div>
                  <div className="mt-1 font-semibold text-foreground">
                    {analysis.sampleRate ? `${analysis.sampleRate} Hz` : "-"}
                  </div>
                </div>
              </div>
              {analysis.frequencyFocus ? (
                <div className="rounded-xl border border-border/60 bg-white p-3">
                  <div className="text-xs text-muted-foreground">
                    Fokus Frekuensi
                  </div>
                  <div className="mt-1 font-semibold text-foreground">
                    {analysis.frequencyFocus}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Analisis Frekuensi</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {sortedBands.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Data energy band tidak tersedia.
                </p>
              ) : (
                sortedBands.map((band) => (
                  <div key={band.id}>
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                      <span className="text-foreground">
                        {band.bandName}{" "}
                        {band.rangeHz ? `(${band.rangeHz})` : ""}
                      </span>
                      <span className="text-foreground">
                        {band.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={Math.min(100, band.percentage)} />
                    {band.description ? (
                      <p className="mt-1.5 text-[11px] text-muted-foreground">
                        {band.description}
                      </p>
                    ) : null}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <div className="rounded-xl border border-border/60 bg-slate-100/50 p-5">
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-foreground">
              MEDICAL DISCLAIMER
            </h4>
            <p className="text-xs font-medium leading-relaxed text-muted-foreground">
              Sistem ini menggunakan kecerdasan buatan untuk membantu analisis
              awal. Hasil ini <strong>bukanlah diagnosis medis final</strong>{" "}
              dan tidak menggantikan penilaian klinis oleh dokter profesional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

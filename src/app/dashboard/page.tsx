import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bell,
  Plus,
  BarChart3,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileAudio2,
  Mic,
  AudioWaveform,
  BrainCircuit,
  ScanEye,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  Static Data                                                        */
/* ================================================================== */

const stats = [
  {
    label: "Total Analisis",
    value: "1,248",
    icon: BarChart3,
    gradient: "from-teal-500 to-cyan-500",
    iconBg: "bg-teal-50",
    iconText: "text-teal-600",
    shadow: "shadow-teal-500/10",
  },
  {
    label: "Indikasi Pneumonia",
    value: "342",
    icon: ShieldAlert,
    gradient: "from-rose-500 to-pink-500",
    iconBg: "bg-rose-50",
    iconText: "text-rose-600",
    shadow: "shadow-rose-500/10",
  },
  {
    label: "Hasil Normal",
    value: "856",
    icon: ShieldCheck,
    gradient: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    shadow: "shadow-emerald-500/10",
  },
  {
    label: "Confidence Rendah",
    value: "50",
    icon: AlertTriangle,
    gradient: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    shadow: "shadow-amber-500/10",
  },
];

const recentAnalyses = [
  {
    id: 1,
    date: "24 Okt 2023",
    fileName: "px_104_crackle.wav",
    result: "Pneumonia" as const,
    confidence: 94,
  },
  {
    id: 2,
    date: "24 Okt 2023",
    fileName: "px_105_normal.wav",
    result: "Normal" as const,
    confidence: 88,
  },
  {
    id: 3,
    date: "23 Okt 2023",
    fileName: "px_106_wheeze.wav",
    result: "Pneumonia" as const,
    confidence: 65,
  },
];

const workflowSteps = [
  {
    step: 1,
    title: "Input WAV",
    description: "Sinyal audio suara paru-paru pasien direkam.",
    icon: Mic,
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    step: 2,
    title: "Konversi STFT",
    description: "Audio diubah menjadi representasi visual Spektrogram.",
    icon: AudioWaveform,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    step: 3,
    title: "VGG16 Model",
    description: "CNN menganalisis pola spektrogram untuk klasifikasi.",
    icon: BrainCircuit,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    step: 4,
    title: "Grad-CAM",
    description: "Visualisasi area fokus AI untuk interpretasi medis (XAI).",
    icon: ScanEye,
    gradient: "from-emerald-500 to-teal-500",
  },
];

/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-8">
      {/* ==================== HEADER ==================== */}
      <header className="flex items-start justify-between">
        <div className="animate-fade-in-up space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Selamat Datang di PulmoSense
          </h1>
          <p className="text-sm text-muted-foreground">
            Sistem Analisis Suara Paru-Paru berbasis AI (VGG16).
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <button
            className="relative rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-white hover:text-foreground hover:shadow-sm"
            aria-label="Notifikasi"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-slate-50" />
          </button>
        </div>
      </header>

      {/* ==================== STATS CARDS ==================== */}
      <div className="grid grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className={cn(
                "group cursor-default border-0 bg-white shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                `hover:${stat.shadow}`,
                `animate-fade-in-up-${i + 1}`
              )}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                    stat.iconBg
                  )}
                >
                  <Icon className={cn("h-6 w-6", stat.iconText)} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ==================== BOTTOM SECTION ==================== */}
      <div className="grid grid-cols-5 gap-5">
        {/* ——— Analisis Terbaru (Table) ——— */}
        <Card className="col-span-3 animate-fade-in-up-3 border-0 bg-white shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <CardTitle className="text-base">Analisis Terbaru</CardTitle>
            <CardAction>
              <Link
                href="/dashboard/riwayat-analisis"
                className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
              >
                Lihat Semua
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tanggal
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Nama File
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Hasil
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Confidence
                  </TableHead>
                  <TableHead className="w-16 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAnalyses.map((row) => (
                  <TableRow key={row.id} className="group/row cursor-pointer">
                    <TableCell className="text-muted-foreground">
                      {row.date}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 font-medium">
                        <FileAudio2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="truncate">{row.fileName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ResultBadge result={row.result} />
                    </TableCell>
                    <TableCell>
                      <ConfidenceBar value={row.confidence} />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg text-teal-600 opacity-0 transition-opacity group-hover/row:opacity-100"
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ——— Alur Kerja AI ——— */}
        <Card className="col-span-2 animate-fade-in-up-4 border-0 bg-white shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <CardTitle className="text-base">Alur Kerja AI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-6">
              {/* Connecting vertical line */}
              <div className="absolute left-5 top-3 bottom-3 w-px bg-gradient-to-b from-teal-200 via-indigo-200 to-emerald-200" />

              {workflowSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="relative flex gap-4">
                    {/* Icon circle */}
                    <div
                      className={cn(
                        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-md",
                        step.gradient
                      )}
                    >
                      <Icon className="h-[18px] w-[18px] text-white" />
                    </div>

                    {/* Text */}
                    <div className="pt-0.5">
                      <p className="text-sm font-semibold text-foreground">
                        {step.step}. {step.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */

function ResultBadge({ result }: { result: "Pneumonia" | "Normal" }) {
  if (result === "Pneumonia") {
    return (
      <Badge className="rounded-lg border-0 bg-rose-100 text-rose-700 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400">
        Pneumonia
      </Badge>
    );
  }
  return (
    <Badge className="rounded-lg border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
      Normal
    </Badge>
  );
}

function ConfidenceBar({ value }: { value: number }) {
  const color =
    value >= 80
      ? "bg-gradient-to-r from-teal-500 to-cyan-500"
      : value >= 60
        ? "bg-gradient-to-r from-amber-400 to-orange-400"
        : "bg-gradient-to-r from-rose-400 to-pink-400";

  return (
    <div className="flex items-center gap-2.5">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-semibold tabular-nums text-muted-foreground">
        {value}%
      </span>
    </div>
  );
}

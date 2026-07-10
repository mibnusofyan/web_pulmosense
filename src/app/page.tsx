import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  AudioWaveform,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  FileAudio2,
  FileCode2,
  FlaskConical,
  History,
  ShieldCheck,
  Stethoscope,
  UploadCloud,
  Waves,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "PulmoSense - Skrining Suara Paru Berbasis AI",
  description:
    "Landing page PulmoSense untuk skrining awal pneumonia dari audio WAV dengan VGG16/VGG19, Grad-CAM, dan dashboard riwayat analisis.",
};

const navItems = [
  { href: "#alur", label: "Alur" },
  { href: "#model", label: "Model" },
  { href: "#visualisasi", label: "Visualisasi" },
  { href: "#keamanan", label: "Keamanan" },
];

const heroRail = [
  { label: "WAV", icon: FileAudio2 },
  { label: "STFT", icon: AudioWaveform },
  { label: "VGG16/VGG19", icon: BrainCircuit },
  { label: "Grad-CAM", icon: ShieldCheck },
  { label: "Riwayat", icon: History },
];

const workflowSteps = [
  {
    label: "Upload WAV",
    description: "Tenaga medis memilih rekaman suara paru dalam format WAV.",
    icon: UploadCloud,
  },
  {
    label: "Preprocessing",
    description: "Audio dibuat mono, dinormalisasi, lalu diproses untuk model.",
    icon: Activity,
  },
  {
    label: "STFT 224x224",
    description: "Sinyal diubah menjadi citra spektrogram untuk CNN.",
    icon: AudioWaveform,
  },
  {
    label: "VGG16 / VGG19",
    description: "Model transfer learning mengklasifikasi NORMAL atau PNEUMONIA.",
    icon: BrainCircuit,
  },
  {
    label: "XAI",
    description: "Grad-CAM, overlay waveform, dan energy band membantu peninjauan.",
    icon: ShieldCheck,
  },
  {
    label: "Riwayat",
    description: "Hasil analisis tersimpan ke PostgreSQL melalui Prisma.",
    icon: History,
  },
];

const technicalParams = [
  { label: "Durasi proses", value: "4 detik", icon: Activity },
  { label: "Sample rate", value: "4.000 Hz", icon: AudioWaveform },
  { label: "Bandpass", value: "100-1800 Hz", icon: FileCode2 },
  { label: "Kelas output", value: "NORMAL / PNEUMONIA", icon: FlaskConical },
];

const visualizationCards = [
  {
    title: "STFT Spectrogram",
    description: "Representasi frekuensi audio paru.",
    image: "/examples/spectrogram.png",
    alt: "Contoh STFT spectrogram dari AI service PulmoSense",
  },
  {
    title: "Heatmap Grad-CAM",
    description: "Area kontribusi model pada spektrogram.",
    image: "/examples/gradcam.png",
    alt: "Contoh heatmap Grad-CAM dari AI service PulmoSense",
  },
  {
    title: "Overlay + Raw Waveform",
    description: "Overlay heatmap dengan sinyal audio mentah.",
    image: "/examples/overlay_waveform.png",
    alt: "Contoh overlay waveform dari AI service PulmoSense",
  },
];


export default function LandingPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-white text-slate-950">
      <HeroSection />
      <WorkflowSection />
      <ResultsSection />
      <OperationsSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-[84svh] overflow-hidden bg-slate-950 text-white">
      <Image
        src="/lung-scan-bg.png"
        alt="Visual paru dan gelombang audio untuk PulmoSense"
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover brightness-[0.44] saturate-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/20 to-transparent" />

      <div className="relative z-10 flex w-full flex-col">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-8">
          <BrandMark tone="dark" />
          <nav className="hidden items-center gap-8 text-sm font-medium text-white/76 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            asChild
            size="lg"
            className="hidden rounded-lg bg-teal-500 px-5 font-semibold text-white shadow-lg shadow-teal-950/20 hover:bg-teal-400 md:inline-flex"
          >
            <Link href="/dashboard">
              Masuk Dashboard
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </header>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-8 px-6 pb-10 pt-6 lg:px-8 lg:pt-12">
          <div className="flex max-w-3xl flex-col gap-6">
            <h1 className="text-5xl font-semibold leading-none text-white md:text-8xl">
              PulmoSense
            </h1>
            <p className="max-w-2xl text-lg font-medium leading-7 text-white/86 md:text-2xl md:leading-10">
              Skrining awal pneumonia dari suara paru, dengan upload WAV, model
              VGG16/VGG19, dan visualisasi XAI dalam satu dashboard.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-lg bg-teal-500 px-6 text-base font-semibold text-white shadow-lg shadow-teal-950/20 hover:bg-teal-400"
              >
                <Link href="/dashboard">
                  Masuk Dashboard
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-lg border-white/60 bg-white/8 px-6 text-base font-semibold text-white backdrop-blur hover:bg-white/14 hover:text-white"
              >
                <Link href="#alur">
                  Lihat Alur
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-white/76">
              <ShieldCheck className="size-5 text-teal-300" />
              <span>Alat bantu skrining awal, bukan diagnosis final.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-lg border border-white/18 bg-slate-950/44 p-2 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:grid-cols-5">
            {heroRail.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={cn(
                    "relative flex min-h-14 items-center gap-3 rounded-md px-3 text-white",
                    index === heroRail.length - 1 && "col-span-2 md:col-span-1",
                  )}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-teal-300/25 bg-teal-300/12 text-teal-200 md:size-10">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold">{item.label}</span>
                  {index < heroRail.length - 1 ? (
                    <ArrowRight className="ml-auto hidden size-4 text-white/50 md:block" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section id="alur" className="bg-white py-14 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:px-8">
        <SectionHeading
          title="Dari suara paru hingga insight klinis"
          description="PulmoSense mengubah rekaman WAV menjadi spektrogram STFT, menjalankan model VGG, lalu menyimpan hasil dan visualisasi ke dashboard."
        />

        <div className="grid gap-3 md:grid-cols-6">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.label}
                className="rounded-lg border-slate-200 bg-white py-0 shadow-sm"
              >
                <CardContent className="flex min-h-52 flex-col gap-5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-lg border border-teal-100 bg-teal-50 text-teal-700">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex size-7 items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold text-slate-950">{step.label}</h3>
                    <p className="text-sm leading-6 text-slate-600">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div id="model" className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {technicalParams.map((param) => {
              const Icon = param.icon;
              return (
                <div
                  key={param.label}
                  className="flex min-h-28 items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 ring-1 ring-slate-200">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-slate-500">{param.label}</span>
                    <span className="text-xl font-semibold text-slate-950">{param.value}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_0.75fr] md:items-center">
              <PipelinePreviewImage
                title="STFT Spectrogram"
                image="/examples/spectrogram.png"
              />
              <ArrowRight className="mx-auto hidden size-5 text-teal-600 md:block" />
              <PipelinePreviewImage
                title="Grad-CAM"
                image="/examples/gradcam.png"
              />
              <ArrowRight className="mx-auto hidden size-5 text-teal-600 md:block" />
              <div className="flex h-full min-h-44 flex-col items-center justify-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 text-center">
                <Stethoscope className="size-10 text-teal-700" />
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-teal-700">NORMAL</span>
                  <span className="text-sm font-medium text-slate-500">/</span>
                  <span className="font-semibold text-rose-600">PNEUMONIA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  return (
    <section id="visualisasi" className="bg-slate-50 py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:px-8">
        <SectionHeading
          centered
          title="Hasil yang dapat ditinjau ulang"
          description="Setiap analisis menyimpan prediksi, confidence, rekomendasi, visualisasi STFT, Grad-CAM, overlay waveform, dan energy band ke PostgreSQL."
        />

        <div className="grid gap-3 md:grid-cols-3">
          <StatusBadge label="NORMAL" tone="success" />
          <StatusBadge label="PNEUMONIA" tone="danger" />
          <StatusBadge label="Confidence Rendah" tone="warning" />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
          <div className="grid lg:grid-cols-[240px_1fr]">
            <aside className="hidden border-r border-slate-200 bg-white p-5 lg:flex lg:flex-col lg:justify-between">
              <div className="flex flex-col gap-6">
                <BrandMark />
                <div className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                  {["Dashboard", "Analisis Baru", "Riwayat Analisis", "Pengaturan"].map((item) => (
                    <div
                      key={item}
                      className={cn(
                        "rounded-lg px-3 py-2",
                        item === "Riwayat Analisis"
                          ? "bg-teal-50 text-teal-800"
                          : "text-slate-600",
                      )}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                Role admin/superadmin
              </div>
            </aside>

            <div className="flex flex-col gap-6 p-4 md:p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-slate-950">Riwayat Analisis</h3>
                  <p className="text-sm text-slate-500">
                    Detail hasil prediksi tersimpan dan dapat dibuka ulang.
                  </p>
                </div>
                <Button
                  asChild
                  className="w-fit rounded-lg bg-teal-700 text-white hover:bg-teal-800"
                >
                  <Link href="/dashboard/analisis-baru">
                    Analisis Baru
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500 md:grid-cols-[1.4fr_1fr_1fr_0.7fr]">
                    <span>FILE AUDIO</span>
                    <span>PREDIKSI</span>
                    <span>RISIKO</span>
                    <span className="hidden md:block">AKSI</span>
                  </div>
                  {[
                    ["pneumonia (5).wav", "PNEUMONIA", "Tinggi"],
                    ["rekaman-paru.wav", "NORMAL", "Rendah"],
                    ["sample-audio.wav", "PNEUMONIA", "Confidence Rendah"],
                  ].map(([fileName, prediction, risk]) => (
                    <div
                      key={fileName}
                      className="grid grid-cols-[1.2fr_0.8fr_0.8fr] items-center gap-3 border-b border-slate-100 px-4 py-4 text-sm last:border-b-0 md:grid-cols-[1.4fr_1fr_1fr_0.7fr]"
                    >
                      <span className="truncate font-medium text-slate-950">{fileName}</span>
                      <span
                        className={cn(
                          "font-semibold",
                          prediction === "NORMAL" ? "text-teal-700" : "text-rose-600",
                        )}
                      >
                        {prediction}
                      </span>
                      <span className="text-slate-600">{risk}</span>
                      <span className="hidden font-semibold text-teal-700 md:block">Detail</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-semibold text-slate-950">Detail Hasil Prediksi</h4>
                    <Badge className="rounded-md border-0 bg-rose-100 text-rose-700 hover:bg-rose-100">
                      PNEUMONIA
                    </Badge>
                  </div>
                  <div className="mt-5 flex flex-col gap-4 text-sm">
                    <DetailRow label="Confidence" value="Tersimpan dari AI service" />
                    <DetailRow label="Rekomendasi Medis" value="Pemeriksaan klinis lanjutan" />
                    <DetailRow label="Fokus Frekuensi" value="Dari hasil Grad-CAM" />
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                      Hasil ini bukan diagnosis akhir dan harus ditinjau oleh tenaga medis.
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {visualizationCards.map((card) => (
                  <Card
                    key={card.title}
                    className="rounded-lg border-slate-200 bg-white py-0 shadow-sm"
                  >
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-base">{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                        <Image
                          src={card.image}
                          alt={card.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OperationsSection() {
  return (
    <section id="keamanan" className="bg-white py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-slate-950 p-8 text-white md:p-10">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950/80" />
          <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex max-w-2xl flex-col gap-4">
              <h2 className="text-3xl font-semibold md:text-4xl">
                Mulai dari dashboard analisis
              </h2>
              <p className="text-base leading-7 text-white/74">
                Hasil model adalah alat bantu skrining awal dan perlu validasi
                klinis oleh tenaga medis.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-lg bg-teal-500 px-6 font-semibold text-white hover:bg-teal-400"
              >
                <Link href="/dashboard">
                  Masuk Dashboard
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-lg border-white/45 bg-white/8 px-6 font-semibold text-white hover:bg-white/14 hover:text-white"
              >
                <Link href="#dokumentasi">
                  Baca Dokumentasi
                  <BookOpen data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <footer className="flex flex-col justify-between gap-5 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row md:items-center">
          <BrandMark />
          <div className="flex flex-wrap items-center gap-5">
            <Link href="#keamanan" className="hover:text-slate-950">
              Medical Disclaimer
            </Link>
            <Link href="#dokumentasi" className="hover:text-slate-950">
              Dokumentasi
            </Link>
            <Link href="/dashboard" className="hover:text-slate-950">
              Dashboard
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}

function SectionHeading({
  title,
  description,
  centered = false,
}: {
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        centered && "mx-auto text-center",
      )}
    >
      <h2 className="text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
        {title}
      </h2>
      <p className="text-lg leading-8 text-slate-600">{description}</p>
    </div>
  );
}

function BrandMark({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <Link href="/" className="flex w-fit items-center gap-3">
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-lg",
          isDark ? "bg-white/10 text-teal-200 ring-1 ring-white/18" : "bg-teal-600 text-white",
        )}
      >
        <Waves className="size-5" />
      </span>
      <span className={cn("text-lg font-semibold", isDark ? "text-white" : "text-slate-950")}>
        PulmoSense
      </span>
    </Link>
  );
}

function PipelinePreviewImage({ title, image }: { title: string; image: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-950">{title}</span>
      </div>
      <div className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <Image
          src={image}
          alt={`Contoh ${title} PulmoSense`}
          fill
          sizes="(min-width: 1024px) 24vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: "success" | "danger" | "warning";
}) {
  return (
    <div
      className={cn(
        "flex min-h-16 items-center justify-center gap-3 rounded-lg border bg-white px-5 text-sm font-semibold shadow-sm",
        tone === "success" && "border-teal-100 text-teal-700",
        tone === "danger" && "border-rose-100 text-rose-600",
        tone === "warning" && "border-amber-100 text-amber-700",
      )}
    >
      {tone === "success" ? <CheckCircle2 className="size-5" /> : null}
      {tone === "danger" ? <Stethoscope className="size-5" /> : null}
      {tone === "warning" ? <AlertTriangle className="size-5" /> : null}
      {label}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-950">{value}</span>
    </div>
  );
}

"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  FileAudio,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PENDING_ANALYSIS_KEY,
  type PendingAnalysis,
} from "@/lib/analysis-session";
import { cn } from "@/lib/utils";

const DEFAULT_MODEL_NAME: PendingAnalysis["modelName"] = "vgg16";

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kilobytes = bytes / 1024;
  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(1)} KB`;
  }

  return `${(kilobytes / 1024).toFixed(1)} MB`;
}

function isWavFile(file: File) {
  return file.name.toLowerCase().endsWith(".wav");
}

export default function AnalisisBaruPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);

  const selectFile = (file?: File) => {
    if (!file) {
      return;
    }

    if (!isWavFile(file)) {
      setSelectedFile(null);
      setError("Pilih file audio dengan format .wav.");
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      return;
    }

    if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    selectFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    selectFile(e.target.files?.[0]);
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) {
      setError("Pilih file WAV terlebih dahulu sebelum memulai analisis.");
      return;
    }

    setIsPreparing(true);
    setError(null);

    try {
      const fileDataUrl = await readFileAsDataUrl(selectedFile);
      const pendingAnalysis: PendingAnalysis = {
        patientName: patientName.trim(),
        fileName: selectedFile.name,
        fileType: selectedFile.type || "audio/wav",
        fileSize: selectedFile.size,
        fileDataUrl,
        modelName: DEFAULT_MODEL_NAME,
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem(
        PENDING_ANALYSIS_KEY,
        JSON.stringify(pendingAnalysis),
      );

      router.push("/dashboard/analisis-baru/proses");
    } catch {
      setError("File gagal disiapkan untuk analisis. Coba pilih ulang file WAV.");
      setIsPreparing(false);
    }
  };

  return (
    <div className="relative flex min-h-full flex-col">
      <div className="flex flex-1 flex-col gap-8 p-8 pb-24">
        <header className="flex animate-fade-in-up flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Analisis Audio Paru-paru
          </h1>
          <p className="text-base text-muted-foreground">
            Unggah atau rekam suara pernapasan pasien untuk dianalisis.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="col-span-2 animate-fade-in-up-1">
            <Card className="flex h-full flex-col border-0 bg-white shadow-sm ring-1 ring-border/50">
              <div className="border-b border-border/50 px-6 py-4">
                <div className="flex items-center font-semibold text-teal-700">
                  <FileAudio className="mr-2 h-4 w-4" />
                  Upload WAV
                </div>
              </div>
              <CardContent className="flex flex-1 items-center justify-center p-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".wav,audio/wav,audio/x-wav"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div
                  className={cn(
                    "flex h-full min-h-[360px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition-all duration-200",
                    dragActive
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-border/60 bg-slate-50/50 hover:border-teal-400/50 hover:bg-slate-50",
                  )}
                  onClick={() => fileInputRef.current?.click()}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 shadow-sm">
                    {selectedFile ? (
                      <CheckCircle2 className="h-8 w-8" />
                    ) : (
                      <UploadCloud className="h-8 w-8" />
                    )}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {selectedFile
                      ? selectedFile.name
                      : "Tarik & Lepas File WAV di sini"}
                  </h3>
                  <p className="mb-8 text-sm text-muted-foreground">
                    {selectedFile
                      ? `${formatBytes(selectedFile.size)} siap dianalisis.`
                      : "atau klik untuk menelusuri file dari komputer Anda."}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-border/80 bg-white px-8 hover:bg-slate-50 hover:text-teal-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    {selectedFile ? "Ganti File" : "Pilih File"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1 flex flex-col gap-6">
            <Card className="animate-fade-in-up-3 border-0 bg-white shadow-sm ring-1 ring-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Data Pasien</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="patient-name" className="text-xs font-semibold">
                    Nama Pasien
                  </Label>
                  <Input
                    id="patient-name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="rounded-xl border-border/80 bg-white hover:border-muted-foreground/40 focus:border-teal-500 focus:ring-teal-500/20"
                  />
                </div>
              </CardContent>
            </Card>

            {error ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-[260px] right-0 z-20 flex items-center justify-end border-t border-border/60 bg-white/80 px-8 py-4 backdrop-blur-xl">
        <Button
          type="button"
          size="lg"
          disabled={!selectedFile || isPreparing}
          className="h-11 gap-2 rounded-xl border-0 bg-teal-600 px-8 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/30 disabled:translate-y-0 disabled:opacity-60"
          onClick={handleStartAnalysis}
        >
          <Sparkles className="h-4 w-4" />
          {isPreparing ? "Menyiapkan File..." : "Proses Analisis"}
        </Button>
      </div>
    </div>
  );
}

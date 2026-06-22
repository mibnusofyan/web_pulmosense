"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Check,
  ExternalLink,
  Loader2,
  RefreshCcw,
  X,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { predictAudio } from "@/lib/ai-service";
import { saveAnalysis } from "@/lib/analysis-records";
import {
  LAST_ANALYSIS_RESULT_KEY,
  PENDING_ANALYSIS_KEY,
  type PendingAnalysis,
  type StoredAnalysisResult,
} from "@/lib/analysis-session";
import { cn } from "@/lib/utils";

function buildSteps(modelName: string) {
  return [
    { id: 1, title: "Membaca file audio" },
    { id: 2, title: "Menyiapkan FormData" },
    {
      id: 3,
      title: "Mengirim ke AI service",
      subtitle: "FastAPI sedang memproses audio...",
    },
    { id: 4, title: `Menjalankan ${modelName.toUpperCase()}` },
    { id: 5, title: "Grad-CAM + Overlay Waveform" },
    { id: 6, title: "Menyimpan hasil" },
    { id: 7, title: "Laporan" },
  ];
}

function parsePendingAnalysis(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as PendingAnalysis;
    if (!parsed.fileName || !parsed.fileDataUrl || !parsed.modelName) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function getStatusText(result: StoredAnalysisResult | null, error: string | null) {
  if (error) {
    return "Analisis gagal";
  }

  if (result) {
    return "Analisis selesai";
  }

  return "AI sedang menganalisis";
}

export default function ProsesAnalisisPage() {
  const router = useRouter();
  const hasStartedRef = useRef(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [modelName, setModelName] =
    useState<PendingAnalysis["modelName"]>("vgg16");
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] =
    useState<StoredAnalysisResult | null>(null);

  useEffect(() => {
    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;
    let cancelled = false;

    async function runAnalysis() {
      const pending = parsePendingAnalysis(
        sessionStorage.getItem(PENDING_ANALYSIS_KEY),
      );

      if (!pending) {
        setError("Tidak ada file WAV yang siap dianalisis. Silakan unggah file terlebih dahulu.");
        return;
      }

      setModelName(pending.modelName);

      try {
        setCurrentStep(1);
        const fileResponse = await fetch(pending.fileDataUrl);
        const fileBlob = await fileResponse.blob();

        if (cancelled) {
          return;
        }

        setCurrentStep(2);
        const wavFile = fileBlob.slice(
          0,
          fileBlob.size,
          pending.fileType || "audio/wav",
        );

        setCurrentStep(3);
        setCurrentStep(4);
        const result = await predictAudio(
          wavFile,
          pending.fileName,
          pending.modelName,
        );

        if (cancelled) {
          return;
        }

        setCurrentStep(6);
        const savedAnalysis = await saveAnalysis({
          patientName: pending.patientName,
          fileName: pending.fileName,
          fileSize: pending.fileSize,
          result,
        });

        if (cancelled) {
          return;
        }

        setCurrentStep(7);
        const storedResult: StoredAnalysisResult = {
          analysisId: savedAnalysis.id,
          patientName: pending.patientName,
          fileName: pending.fileName,
          fileSize: pending.fileSize,
          createdAt: savedAnalysis.createdAt,
          result,
        };

        sessionStorage.setItem(
          LAST_ANALYSIS_RESULT_KEY,
          JSON.stringify(storedResult),
        );
        sessionStorage.removeItem(PENDING_ANALYSIS_KEY);
        setAnalysisResult(storedResult);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "AI service gagal memproses audio.",
          );
        }
      }
    }

    void runAnalysis();

    return () => {
      cancelled = true;
    };
  }, []);

  const steps = buildSteps(modelName);
  const isFinished = Boolean(analysisResult);
  const statusText = getStatusText(analysisResult, error);

  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.16))] w-full items-center justify-center p-8">
      <Card className="flex w-full max-w-3xl flex-col overflow-hidden border-border/60 bg-white shadow-lg shadow-teal-900/5 md:flex-row">
        <div className="flex w-full flex-col items-center justify-center bg-slate-50/30 p-10 md:w-1/2">
          <div className="mb-12 flex items-center justify-center gap-2">
            <svg
              className="h-8 w-8 text-teal-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0" />
              <circle cx="12" cy="12" r="1" />
            </svg>
            <span className="text-2xl font-bold tracking-tight text-teal-800">
              PulmoSense
            </span>
          </div>

          {!isFinished && !error ? (
            <div className="mb-8 flex h-16 items-end justify-center gap-1.5">
              {[4, 8, 5, 12, 6, 10, 4, 11].map((height, i) => (
                <div
                  key={i}
                  className="w-2 animate-pulse rounded-t-full bg-teal-400"
                  style={{
                    height: `${height * 4}px`,
                    animationDelay: `${i * 150}ms`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          ) : null}

          <div className="flex w-full flex-col items-center gap-4 text-center">
            <Badge
              variant={error ? "destructive" : isFinished ? "secondary" : "outline"}
            >
              {statusText}
            </Badge>

            {analysisResult ? (
              <div className="flex w-full flex-col gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {analysisResult.result.prediction}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Confidence {analysisResult.result.confidence.toFixed(2)}%
                  </p>
                </div>
                <Progress value={analysisResult.result.confidence} />
                <div className="rounded-xl border border-border/60 bg-white p-4 text-left text-sm text-muted-foreground">
                  {analysisResult.result.recommendation}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" asChild>
                    <a
                      href={analysisResult.result.spectrogram_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Spectrogram
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href={analysisResult.result.gradcam_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Grad-CAM
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="col-span-2" asChild>
                    <a
                      href={analysisResult.result.overlay_waveform_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Overlay + Raw Waveform
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                {analysisResult.analysisId ? (
                  <Button
                    className="rounded-xl bg-teal-700 text-white hover:bg-teal-800"
                    onClick={() =>
                      router.push(
                        `/dashboard/riwayat-analisis/detail?id=${analysisResult.analysisId}`,
                      )
                    }
                  >
                    Lihat Detail
                  </Button>
                ) : null}
              </div>
            ) : error ? (
              <Alert variant="destructive" className="text-left">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Request gagal</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-foreground">
                  AI sedang menganalisis
                  <br />
                  pola suara paru...
                </h2>
                <p className="px-4 text-sm text-muted-foreground">
                  Harap tunggu, request sedang dikirim ke FastAPI.
                </p>
              </div>
            )}

            {error ? (
              <Button
                variant="outline"
                className="rounded-xl border-border/80 bg-white"
                onClick={() => router.push("/dashboard/analisis-baru")}
              >
                <RefreshCcw className="h-4 w-4" />
                Unggah Ulang
              </Button>
            ) : null}
          </div>
        </div>

        <div className="hidden w-px bg-border/50 md:block" />
        <div className="h-px w-full bg-border/50 md:hidden" />

        <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
          <div className="relative flex flex-col gap-6">
            <div className="absolute bottom-4 left-[15px] top-4 w-px bg-border/60" />

            {steps.map((step) => {
              const isCompleted = isFinished || step.id < currentStep;
              const isCurrent = !isFinished && !error && step.id === currentStep;
              const isPending = !isCompleted && !isCurrent && !error;
              const isError = Boolean(error) && step.id === currentStep;

              return (
                <div key={step.id} className="relative flex items-start gap-4">
                  <div className="relative z-10 flex shrink-0 items-center justify-center bg-white">
                    {isCompleted ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-300 text-white shadow-sm ring-4 ring-white">
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                    ) : null}
                    {isCurrent ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-600 bg-white shadow-sm ring-4 ring-white">
                        <Loader2 className="h-4 w-4 animate-spin text-teal-700" />
                      </div>
                    ) : null}
                    {isError ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm ring-4 ring-white">
                        <X className="h-4 w-4" />
                      </div>
                    ) : null}
                    {isPending ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted bg-white text-xs font-semibold text-muted-foreground ring-4 ring-white">
                        {step.id}
                      </div>
                    ) : null}
                  </div>

                  <div className="pt-1.5">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        isCompleted || isCurrent ? "text-teal-800" : "",
                        isError ? "text-destructive" : "",
                        isPending ? "font-medium text-muted-foreground" : "",
                      )}
                    >
                      {step.title}
                    </p>
                    {step.subtitle && isCurrent ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {step.subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

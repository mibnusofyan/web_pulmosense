"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Membersihkan audio", status: "completed" },
  { id: 2, title: "Menyamakan sample rate", status: "completed" },
  {
    id: 3,
    title: "Membuat STFT",
    subtitle: "Mengekstraksi fitur spektrum...",
    status: "current",
  },
  { id: 4, title: "Menjalankan VGG16", status: "pending" },
  { id: 5, title: "Grad-CAM", status: "pending" },
  { id: 6, title: "Laporan", status: "pending" },
];

export default function ProsesAnalisisPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(3);

  // Simulate progress (optional, just for demo feeling)
  useEffect(() => {
    const timer = setTimeout(() => {
      // For now, it stays on step 3 as requested in the design,
      // but in reality we would navigate to the result page after some time.
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.16))] w-full items-center justify-center p-8">
      <Card className="flex w-full max-w-3xl flex-col md:flex-row overflow-hidden border-border/60 bg-white shadow-lg shadow-teal-900/5">
        
        {/* ================= LEFT PANE ================= */}
        <div className="flex w-full flex-col items-center justify-center p-10 md:w-1/2 bg-slate-50/30">
          {/* Logo */}
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
              ParuScan AI
            </span>
          </div>

          {/* Animated Equalizer */}
          <div className="mb-8 flex h-16 items-end justify-center gap-1.5">
            {[4, 8, 5, 12, 6, 10, 4, 11].map((height, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 rounded-t-full bg-teal-400",
                  "animate-pulse"
                )}
                style={{
                  height: `${height * 4}px`,
                  animationDelay: `${i * 150}ms`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>

          {/* Text Content */}
          <div className="text-center space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              AI sedang menganalisis
              <br />
              pola suara paru...
            </h2>
            <p className="text-sm text-muted-foreground px-4">
              Harap tunggu, proses ini memastikan akurasi diagnostik tinggi.
            </p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden w-px bg-border/50 md:block" />
        <div className="h-px w-full bg-border/50 md:hidden" />

        {/* ================= RIGHT PANE ================= */}
        <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
          <div className="relative space-y-6">
            
            {/* Vertical Connecting Line (Background) */}
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border/60" />

            {STEPS.map((step) => {
              const isCompleted = step.status === "completed";
              const isCurrent = step.status === "current";
              const isPending = step.status === "pending";

              return (
                <div key={step.id} className="relative flex items-start gap-4">
                  {/* Status Icon */}
                  <div className="relative z-10 flex shrink-0 items-center justify-center bg-white">
                    {isCompleted && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-300 text-white shadow-sm ring-4 ring-white">
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                    )}
                    {isCurrent && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-600 bg-white shadow-sm ring-4 ring-white">
                        <div className="h-2.5 w-2.5 rounded-full bg-teal-600" />
                      </div>
                    )}
                    {isPending && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted bg-white text-xs font-semibold text-muted-foreground ring-4 ring-white">
                        {step.id}
                      </div>
                    )}
                  </div>

                  {/* Step Text */}
                  <div className={"pt-1.5"}>
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        isCompleted ? "text-teal-800" : "",
                        isCurrent ? "text-teal-800" : "",
                        isPending ? "text-muted-foreground font-medium" : ""
                      )}
                    >
                      {step.title}
                    </p>
                    {step.subtitle && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {step.subtitle}
                      </p>
                    )}
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

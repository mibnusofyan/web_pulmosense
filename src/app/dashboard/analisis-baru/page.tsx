"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileAudio,
  Mic,
  UploadCloud,
  Info,
  CheckCircle2,
  Clock,
  VolumeX,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalisisBaruPage() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // handle file drop here
  };

  return (
    <div className="relative flex min-h-full flex-col">
      <div className="flex-1 space-y-8 p-8 pb-24">
        {/* ==================== HEADER ==================== */}
        <header className="animate-fade-in-up space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Analisis Audio Paru-paru
          </h1>
          <p className="text-base text-muted-foreground">
            Unggah atau rekam suara pernapasan pasien untuk dianalisis.
          </p>
        </header>

        {/* ==================== MAIN CONTENT ==================== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* ——— LEFT COLUMN: UPLOAD ——— */}
          <div className="col-span-2 animate-fade-in-up-1">
            <Card className="flex h-full flex-col border-0 bg-white shadow-sm ring-1 ring-border/50">
              <div className="border-b border-border/50 px-6 py-4">
                <div className="flex items-center text-teal-700 font-semibold">
                  <FileAudio className="mr-2 h-4 w-4" />
                  Upload WAV
                </div>
              </div>
              <CardContent className="flex flex-1 items-center justify-center p-6">
                <div
                  className={cn(
                    "flex h-full min-h-[360px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200",
                    dragActive
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-border/60 bg-slate-50/50 hover:border-teal-400/50 hover:bg-slate-50"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-6 shadow-sm">
                    <UploadCloud className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    Tarik & Lepas File WAV di sini
                  </h3>
                  <p className="mb-8 text-sm text-muted-foreground">
                    atau klik untuk menelusuri file dari komputer Anda.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full border-border/80 bg-white px-8 hover:bg-slate-50 hover:text-teal-700"
                  >
                    Pilih File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ——— RIGHT COLUMN: DATA PASIEN ——— */}
          <div className="col-span-1 space-y-6">
            {/* Data Pasien */}
            <Card className="animate-fade-in-up-3 border-0 bg-white shadow-sm ring-1 ring-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">
                  Data Pasien
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="patient-id" className="text-xs font-semibold">
                    Nama Pasien
                  </Label>
                  <Input
                    id="patient-id"
                    placeholder="Contoh: Budi Santoso"
                    className="rounded-xl border-border/80 bg-white hover:border-muted-foreground/40 focus:border-teal-500 focus:ring-teal-500/20"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ==================== BOTTOM ACTION BAR ==================== */}
      <div className="fixed bottom-0 left-[260px] right-0 z-20 flex items-center justify-end border-t border-border/60 bg-white/80 px-8 py-4 backdrop-blur-xl">
        <Link href="/dashboard/analisis-baru/proses">
          <Button
            size="lg"
            className="h-11 gap-2 rounded-xl border-0 bg-teal-600 px-8 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/30"
          >
            <Sparkles className="h-4 w-4" />
            Proses Analisis
          </Button>
        </Link>
      </div>
    </div>
  );
}

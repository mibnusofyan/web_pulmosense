"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  Filter,
  Plus,
  FileAudio,
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const HISTORY_DATA = [
  {
    id: "1",
    date: "12 Okt 2024",
    time: "09:41 AM",
    file: "P-882_anterior_L.wav",
    prediction: "Wheezing Terdeteksi",
    confidence: 92,
    riskLevel: "Tinggi",
    type: "danger", // custom property for styling
  },
  {
    id: "2",
    date: "12 Okt 2024",
    time: "08:15 AM",
    file: "P-881_posterior_R.wav",
    prediction: "Suara Paru Normal",
    confidence: 98,
    riskLevel: "Rendah",
    type: "success",
  },
  {
    id: "3",
    date: "11 Okt 2024",
    time: "14:30 PM",
    file: "P-880_lateral_L.wav",
    prediction: "Crackles Ringan",
    confidence: 75,
    riskLevel: "Sedang",
    type: "warning",
  },
];

export default function RiwayatAnalisisPage() {
  return (
    <div className="flex-1 space-y-8 p-8">
      {/* ==================== HEADER ==================== */}
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Riwayat Analisis
          </h1>
          <p className="text-base text-muted-foreground">
            Kelola dan tinjau hasil analisis suara paru-paru sebelumnya.
          </p>
        </div>
        <Link href="/dashboard/analisis-baru">
          <Button className="h-10 gap-2 rounded-xl bg-teal-700 px-6 font-semibold text-white hover:bg-teal-800">
            <Plus className="h-4 w-4" />
            Analisis Baru
          </Button>
        </Link>
      </header>

      {/* ==================== FILTERS & SEARCH ==================== */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari berdasarkan ID Analisis, Pasien..."
            className="h-10 w-full rounded-xl border-border/80 bg-white pl-10 hover:border-muted-foreground/40 focus:border-teal-500 focus:ring-teal-500/20"
          />
        </div>
        <div className="flex w-full items-center gap-3 md:w-auto">
          <Button
            variant="outline"
            className="h-10 w-full justify-between gap-2 rounded-xl border-border/80 bg-white px-4 hover:bg-slate-50 md:w-auto"
          >
            Semua Tanggal
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full justify-between gap-2 rounded-xl border-border/80 bg-white px-4 hover:bg-slate-50 md:w-auto"
          >
            Semua Hasil
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* ==================== DATA TABLE ==================== */}
      <div className="rounded-xl border border-border/80 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[180px] font-semibold">
                TANGGAL & WAKTU
              </TableHead>
              <TableHead className="font-semibold">FILE AUDIO</TableHead>
              <TableHead className="font-semibold">PREDIKSI AI</TableHead>
              <TableHead className="w-[150px] font-semibold">
                CONFIDENCE
              </TableHead>
              <TableHead className="w-[150px] font-semibold">
                TINGKAT RISIKO
              </TableHead>
              <TableHead className="w-[100px] text-right font-semibold">
                AKSI
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {HISTORY_DATA.map((item) => (
              <TableRow key={item.id} className="group">
                {/* Date & Time */}
                <TableCell>
                  <div className="font-semibold text-foreground">
                    {item.date}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {item.time}
                  </div>
                </TableCell>

                {/* File Audio */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <FileAudio className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-foreground">
                      {item.file}
                    </span>
                  </div>
                </TableCell>

                {/* Prediction Pill Badge */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-3 py-1 font-medium border-0",
                      item.type === "danger" &&
                        "bg-rose-100 text-rose-700",
                      item.type === "success" &&
                        "bg-emerald-100 text-emerald-700",
                      item.type === "warning" &&
                        "bg-slate-100 text-slate-700"
                    )}
                  >
                    {item.prediction}
                  </Badge>
                </TableCell>

                {/* Confidence Bar */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-muted/50">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          item.type === "danger" && "bg-rose-600",
                          item.type === "success" && "bg-teal-600",
                          item.type === "warning" && "bg-slate-600"
                        )}
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {item.confidence}%
                    </span>
                  </div>
                </TableCell>

                {/* Risk Level */}
                <TableCell>
                  <div className="flex items-center gap-1.5 font-medium">
                    {item.type === "danger" && (
                      <>
                        <AlertTriangle className="h-4 w-4 text-rose-600" />
                        <span className="text-rose-700">{item.riskLevel}</span>
                      </>
                    )}
                    {item.type === "success" && (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-700">{item.riskLevel}</span>
                      </>
                    )}
                    {item.type === "warning" && (
                      <>
                        <Info className="h-4 w-4 text-slate-600" />
                        <span className="text-slate-700">{item.riskLevel}</span>
                      </>
                    )}
                  </div>
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Link href={`/dashboard/riwayat-analisis/detail?id=${item.id}`}>
                    <Button
                      variant="ghost"
                      className="h-8 gap-1 font-semibold text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                    >
                      Detail
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ==================== PAGINATION ==================== */}
        <div className="flex items-center justify-between border-t border-border/60 px-6 py-4">
          <span className="text-sm text-muted-foreground font-medium">
            Menampilkan 1-3 dari 45 hasil
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-border/80 text-muted-foreground hover:bg-slate-50 hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-border/80 text-muted-foreground hover:bg-slate-50 hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

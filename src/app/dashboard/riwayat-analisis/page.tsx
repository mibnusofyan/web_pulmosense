import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileAudio,
  Filter,
  Info,
  Plus,
  Search,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import {
  formatDateTime,
  getAnalysisTone,
  getDisplayPrediction,
} from "@/lib/analysis-format";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

export default async function RiwayatAnalisisPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params?.q?.trim() ?? "";

  const where = query
    ? {
        OR: [
          { id: { contains: query, mode: "insensitive" as const } },
          { patientName: { contains: query, mode: "insensitive" as const } },
          { audioFileName: { contains: query, mode: "insensitive" as const } },
          { prediction: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : undefined;

  const [analyses, totalCount] = await Promise.all([
    prisma.analysis.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
      select: {
        id: true,
        patientName: true,
        audioFileName: true,
        prediction: true,
        confidence: true,
        riskLevel: true,
        createdAt: true,
      },
    }),
    prisma.analysis.count({ where }),
  ]);

  return (
    <div className="flex flex-1 flex-col gap-8 p-8">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
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

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <form className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={query}
            placeholder="Cari ID, pasien, file, atau prediksi..."
            className="h-10 w-full rounded-xl border-border/80 bg-white pl-10 hover:border-muted-foreground/40 focus:border-teal-500 focus:ring-teal-500/20"
          />
        </form>
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
            {analyses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-40 text-center text-sm text-muted-foreground"
                >
                  Belum ada hasil analisis yang tersimpan.
                </TableCell>
              </TableRow>
            ) : (
              analyses.map((item) => {
                const dateTime = formatDateTime(item.createdAt);
                const tone = getAnalysisTone(item.riskLevel, item.prediction);

                return (
                  <TableRow key={item.id} className="group">
                    <TableCell>
                      <div className="font-semibold text-foreground">
                        {dateTime.date}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {dateTime.time}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <FileAudio className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-medium text-foreground">
                            {item.audioFileName}
                          </div>
                          {item.patientName ? (
                            <div className="text-xs text-muted-foreground">
                              {item.patientName}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-0 px-3 py-1 font-medium",
                          tone === "danger" && "bg-rose-100 text-rose-700",
                          tone === "success" &&
                            "bg-emerald-100 text-emerald-700",
                          tone === "warning" && "bg-slate-100 text-slate-700",
                        )}
                      >
                        {getDisplayPrediction(item.prediction)}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-muted/50">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              tone === "danger" && "bg-rose-600",
                              tone === "success" && "bg-teal-600",
                              tone === "warning" && "bg-slate-600",
                            )}
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {item.confidence.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5 font-medium">
                        {tone === "danger" ? (
                          <>
                            <AlertTriangle className="h-4 w-4 text-rose-600" />
                            <span className="text-rose-700">
                              {item.riskLevel}
                            </span>
                          </>
                        ) : null}
                        {tone === "success" ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            <span className="text-emerald-700">
                              {item.riskLevel}
                            </span>
                          </>
                        ) : null}
                        {tone === "warning" ? (
                          <>
                            <Info className="h-4 w-4 text-slate-600" />
                            <span className="text-slate-700">
                              {item.riskLevel}
                            </span>
                          </>
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <Link
                        href={`/dashboard/riwayat-analisis/detail?id=${item.id}`}
                      >
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
                );
              })
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t border-border/60 px-6 py-4">
          <span className="text-sm font-medium text-muted-foreground">
            Menampilkan {analyses.length} dari {totalCount} hasil
          </span>
        </div>
      </div>
    </div>
  );
}

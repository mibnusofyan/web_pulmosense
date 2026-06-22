import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Shield,
  BookOpen,
  FlaskConical,
  Activity,
  FileCode2,
} from "lucide-react";
import { requireUser } from "@/lib/auth/session";
import { ProfileForm } from "./profile-form";

export const dynamic = "force-dynamic";

/* ================================================================== */
/*  Page Component (Server)                                            */
/* ================================================================== */

export default async function PengaturanPage() {
  const user = await requireUser();

  return (
    <div className="flex-1">
      {/* ==================== TOP BAR ==================== */}
      <div className="flex h-16 items-center justify-between border-b border-border/60 bg-white/50 px-8 backdrop-blur-sm">
        <h1 className="text-lg font-bold text-foreground">Pengaturan</h1>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-8 p-8 pb-24">
        {/* ==================== HEADER ==================== */}
        <header className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Profil & Preferensi
          </h2>
          <p className="text-base text-muted-foreground">
            Kelola informasi pribadi, peran sistem, dan konfigurasi model AI
            Anda.
          </p>
        </header>

        {/* ==================== MAIN CONTENT GRID ==================== */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* ——— LEFT COLUMN (Profil & Keamanan) ——— */}
          <div className="flex flex-col gap-8 lg:col-span-2">

            {/* Card 1: Informasi Profil (Client Component) */}
            <ProfileForm defaultName={user.name} defaultEmail={user.email} />

            {/* Card 2: Pengaturan Akun & Keamanan */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-slate-700" />
                  <CardTitle className="text-base text-foreground">
                    Pengaturan Akun & Keamanan
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="divide-y divide-border/60 p-0">
                {/* Password */}
                <div className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Ubah Kata Sandi
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Perbarui kata sandi Anda secara berkala untuk keamanan
                      akun.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-xl border-border/80 bg-white font-semibold hover:bg-slate-50"
                  >
                    Perbarui
                  </Button>
                </div>

                {/* Delete Account */}
                <div className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Hapus Akun
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Tindakan ini permanen dan akan menghapus semua riwayat
                      personal.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-xl border-rose-200 bg-rose-50 font-semibold text-rose-600 hover:bg-rose-100 hover:text-rose-700"
                  >
                    Hapus Akun
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ——— RIGHT COLUMN (Informasi Model AI) ——— */}
          <div className="flex flex-col gap-8 lg:col-span-1">

            {/* Card 3: Informasi Model AI */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-teal-700" />
                    <CardTitle className="text-base leading-tight">
                      Informasi
                      <br />
                      Model AI
                    </CardTitle>
                  </div>
                  <Badge className="rounded-md border-0 bg-[#dcfce7] px-2 py-1 text-[10px] font-semibold tracking-wide text-[#166534] hover:bg-[#dcfce7]">
                    V1.2.4-STABLE
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Arsitektur Dasar */}
                <div className="relative overflow-hidden rounded-xl border border-border/60 bg-slate-50/50 p-4">
                  <div className="absolute right-4 top-4 flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-sm bg-slate-300" />
                    <div className="h-1.5 w-1.5 rounded-sm bg-slate-300" />
                  </div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    ARSITEKTUR DASAR
                  </p>
                  <p className="mb-3 text-sm font-bold text-foreground">
                    VGG16 Binary Classifier
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Model deep learning pre-trained yang dioptimalkan untuk
                    klasifikasi citra medis dan ekstraksi fitur akustik.
                  </p>
                </div>

                {/* Grid Input/Output */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border/60 bg-white p-3">
                    <FileCode2 className="mb-3 h-4 w-4 text-slate-500" />
                    <p className="mb-1 text-[10px] font-bold uppercase text-muted-foreground">
                      Format Input
                    </p>
                    <p className="mb-1 text-xs font-bold text-foreground">
                      STFT
                    </p>
                    <p className="text-[9px] leading-tight text-muted-foreground">
                      Short-Time Fourier Transform
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-white p-3">
                    <Activity className="mb-3 h-4 w-4 text-slate-500" />
                    <p className="mb-1 text-[10px] font-bold uppercase text-muted-foreground">
                      Kelas Output
                    </p>
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                        Normal
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <div className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                        Pneumonia
                      </div>
                    </div>
                  </div>
                </div>

                {/* Link Dokumentasi */}
                <Button
                  variant="ghost"
                  className="mt-2 w-full gap-2 font-semibold text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                >
                  <BookOpen className="h-4 w-4" />
                  Lihat Dokumentasi Klinis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

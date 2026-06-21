"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Activity,
  ShieldCheck,
  Stethoscope,
  Info,
  Waves,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-dvh bg-white">
      {/* ====================== LEFT PANEL — FORM ====================== */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-12 lg:w-[54%] lg:px-20">
        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-teal-100/40 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-100/30 blur-[100px]" />

        <div className="relative z-10 w-full max-w-[420px] space-y-8">
          {/* ——— Brand ——— */}
          <div className="animate-fade-in-up space-y-3 text-center">
            <div className="mx-auto mb-2 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/25 ring-4 ring-teal-500/10">
              <Waves className="h-7 w-7 text-white" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                ParuScan AI
              </span>
            </h1>

            <p className="text-sm text-muted-foreground">
              Skrining Suara Paru Berbasis AI
            </p>
          </div>

          {/* ——— Form ——— */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div className="animate-fade-in-up-1 space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <div className="group relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-teal-600" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="dr.nama@rumahsakit.com"
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-border bg-muted/30 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground hover:border-muted-foreground/40 focus:border-teal-500 focus:ring-[3px] focus:ring-teal-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="animate-fade-in-up-2 space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <div className="group relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-teal-600" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-12 w-full rounded-xl border border-border bg-muted/30 pl-11 pr-12 text-sm outline-none transition-all placeholder:text-muted-foreground hover:border-muted-foreground/40 focus:border-teal-500 focus:ring-[3px] focus:ring-teal-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
                >
                  Lupa Password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <div className="animate-fade-in-up-3 pt-1">
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-xl border-0 bg-gradient-to-r from-teal-600 to-cyan-600 text-base font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-teal-700 hover:to-cyan-700 hover:shadow-xl hover:shadow-teal-600/30 active:translate-y-0"
              >
                Masuk Sistem
                <LogIn className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>

          {/* ——— Divider ——— */}
          <div className="animate-fade-in-up-4 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              atau
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          {/* ——— Google Login ——— */}
          <div className="animate-fade-in-up-4">
            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full gap-3 rounded-xl text-sm font-medium transition-all hover:bg-muted/60"
            >
              <GoogleIcon />
              Login dengan Akun Institusi
            </Button>
          </div>
        </div>
      </div>

      {/* ===================== RIGHT PANEL — HERO ===================== */}
      <div className="hidden overflow-hidden lg:flex lg:w-[46%] lg:flex-col">
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#072e3f] via-[#0c4a5e] to-[#0a3548]" />

          {/* Background image */}
          <Image
            src="/lung-scan-bg.png"
            alt=""
            fill
            sizes="46vw"
            className="object-cover opacity-40 mix-blend-luminosity"
            priority
          />

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#072e3f]/95 via-transparent to-[#072e3f]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#072e3f]/60 to-transparent" />

          {/* Scanning sweep line */}
          <div className="absolute inset-x-0 h-px animate-scan-sweep bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />

          {/* Animated scanning rings */}
          <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
            <div className="animate-pulse-ring h-[380px] w-[380px] rounded-full border border-teal-400/20" />
            <div className="animate-pulse-ring absolute inset-8 rounded-full border border-cyan-400/15 [animation-delay:1.2s]" />
            <div className="animate-pulse-ring absolute inset-16 rounded-full border border-teal-300/10 [animation-delay:2.4s]" />
          </div>

          {/* ——— Floating Glass Cards ——— */}

          {/* Card 1 — Akurasi Tinggi */}
          <div className="absolute right-8 top-[18%] animate-float xl:right-14">
            <Card className="border-white/[0.12] bg-white/[0.08] shadow-2xl shadow-black/20 backdrop-blur-2xl">
              <CardContent className="flex items-center gap-3.5 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-white">
                    Akurasi Tinggi
                  </p>
                  <p className="text-xs text-teal-200/60">
                    Analisis pola suara
                  </p>
                  <div className="h-1.5 w-36 overflow-hidden rounded-full bg-white/10">
                    <div className="animate-progress-fill h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Card 2 — Real-time */}
          <div className="absolute left-6 top-[46%] animate-float-delayed xl:left-12">
            <Card className="border-white/[0.12] bg-white/[0.08] shadow-2xl shadow-black/20 backdrop-blur-2xl">
              <CardContent className="flex items-center gap-3.5 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Real-time</p>
                  <p className="text-xs text-teal-200/60">
                    Deteksi suara paru
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Card 3 — AI-Powered */}
          <div className="absolute bottom-[18%] right-10 animate-float-slow xl:right-16">
            <Card className="border-white/[0.12] bg-white/[0.08] shadow-2xl shadow-black/20 backdrop-blur-2xl">
              <CardContent className="flex items-center gap-3.5 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/30">
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    AI-Powered
                  </p>
                  <p className="text-xs text-teal-200/60">
                    Deep learning analysis
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom copy */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-10">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-white/90">
                Deteksi Dini, Penanganan Tepat
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-teal-100/50">
                Platform skrining suara paru berbasis kecerdasan buatan untuk
                membantu tenaga medis dalam deteksi dini kelainan paru.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG Components                                              */
/* ------------------------------------------------------------------ */

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

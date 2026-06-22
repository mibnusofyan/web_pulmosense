"use client";

import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  Mail,
  Waves,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

type ErrorResponse = {
  detail?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (!response.ok) {
        const body = (await response.json()) as ErrorResponse;
        throw new Error(body.detail || "Login gagal diproses.");
      }

      const requestedPath = new URLSearchParams(window.location.search).get("next");
      const destination =
        requestedPath?.startsWith("/dashboard") && !requestedPath.startsWith("//")
          ? requestedPath
          : "/dashboard";

      router.replace(destination);
      router.refresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Login gagal diproses.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-dvh bg-background">
      <main className="flex w-full items-center justify-center px-6 py-12 lg:w-[54%] lg:px-20">
        <div className="flex w-full max-w-[420px] flex-col gap-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/25">
              <Waves className="size-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">PulmoSense</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Masuk untuk mengakses dashboard analisis suara paru.
              </p>
            </div>
          </div>

          {error ? (
            <Alert variant="destructive">
              <AlertTitle>Login gagal</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field data-invalid={Boolean(error)}>
                <FieldLabel htmlFor="login-email">Email</FieldLabel>
                <InputGroup className="h-12 rounded-xl">
                  <InputGroupInput
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="admin@pulmosense.local"
                    autoComplete="email"
                    required
                    disabled={isSubmitting}
                    aria-invalid={Boolean(error)}
                  />
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field data-invalid={Boolean(error)}>
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <InputGroup className="h-12 rounded-xl">
                  <InputGroupInput
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    required
                    disabled={isSubmitting}
                    aria-invalid={Boolean(error)}
                  />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      size="icon-sm"
                      aria-label={
                        showPassword ? "Sembunyikan password" : "Tampilkan password"
                      }
                      onClick={() => setShowPassword((visible) => !visible)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 data-icon="inline-start" className="animate-spin" />
                ) : (
                  <LogIn data-icon="inline-start" />
                )}
                {isSubmitting ? "Memverifikasi..." : "Masuk Sistem"}
              </Button>
            </FieldGroup>
          </form>
        </div>
      </main>

      <aside className="relative hidden min-h-dvh overflow-hidden lg:block lg:w-[46%]">
        <Image
          src="/lung-scan-bg.png"
          alt="Visualisasi pemeriksaan suara paru"
          fill
          sizes="46vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
          <p className="text-2xl font-semibold">Deteksi Dini, Penanganan Tepat</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            Platform skrining suara paru untuk membantu tenaga medis meninjau
            hasil analisis berbasis kecerdasan buatan.
          </p>
        </div>
      </aside>
    </div>
  );
}

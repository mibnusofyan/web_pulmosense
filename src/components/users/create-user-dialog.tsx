"use client";

import { Loader2, Plus, UserPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { UserRole } from "@/lib/auth/config";

type ErrorResponse = {
  detail?: string | Array<{ message?: string }>;
};

function getErrorMessage(body: ErrorResponse) {
  if (typeof body.detail === "string") {
    return body.detail;
  }

  return body.detail?.[0]?.message || "User gagal dibuat.";
}

export function CreateUserDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<UserRole>("admin");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setError(null);
      setRole("admin");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          role,
        }),
      });

      if (!response.ok) {
        throw new Error(getErrorMessage((await response.json()) as ErrorResponse));
      }

      form.reset();
      setOpen(false);
      setRole("admin");
      router.refresh();
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "User gagal dibuat.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus data-icon="inline-start" />
          Tambah User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>Buat User Baru</DialogTitle>
            <DialogDescription>
              Tambahkan akun admin atau superadmin untuk mengakses PulmoSense.
            </DialogDescription>
          </DialogHeader>

          {error ? (
            <Alert variant="destructive">
              <AlertTitle>User gagal dibuat</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <FieldGroup>
            <Field data-invalid={Boolean(error)}>
              <FieldLabel htmlFor="user-name">Nama</FieldLabel>
              <Input
                id="user-name"
                name="name"
                minLength={2}
                maxLength={100}
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(error)}
              />
            </Field>

            <Field data-invalid={Boolean(error)}>
              <FieldLabel htmlFor="user-email">Email</FieldLabel>
              <Input
                id="user-email"
                name="email"
                type="email"
                autoComplete="off"
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(error)}
              />
            </Field>

            <Field data-invalid={Boolean(error)}>
              <FieldLabel htmlFor="user-password">Password awal</FieldLabel>
              <Input
                id="user-password"
                name="password"
                type="password"
                minLength={10}
                maxLength={72}
                autoComplete="new-password"
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(error)}
              />
              <FieldDescription>Minimal 10 karakter.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Role</FieldLabel>
              <ToggleGroup
                type="single"
                variant="outline"
                spacing={0}
                value={role}
                onValueChange={(value) => {
                  if (value === "admin" || value === "superadmin") {
                    setRole(value);
                  }
                }}
                className="w-full"
                aria-label="Pilih role user"
              >
                <ToggleGroupItem value="admin" className="flex-1">
                  Admin
                </ToggleGroupItem>
                <ToggleGroupItem value="superadmin" className="flex-1">
                  Superadmin
                </ToggleGroupItem>
              </ToggleGroup>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Batal
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 data-icon="inline-start" className="animate-spin" />
              ) : (
                <UserPlus data-icon="inline-start" />
              )}
              {isSubmitting ? "Menyimpan..." : "Buat User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

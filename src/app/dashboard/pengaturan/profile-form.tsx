"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, PenSquare, Check, Loader2 } from "lucide-react";
import { updateProfile, type ProfileState } from "./actions";

/* ================================================================== */
/*  ProfileForm – Client Component                                     */
/* ================================================================== */

type ProfileFormProps = {
  defaultName: string;
  defaultEmail: string;
};

export function ProfileForm({ defaultName, defaultEmail }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState<ProfileState, FormData>(
    updateProfile,
    {},
  );

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-teal-600" />
          <CardTitle className="text-base text-foreground">
            Informasi Profil
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={formAction} className="space-y-8">
          {/* Avatar & Inputs */}
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-400 ring-4 ring-white shadow-sm">
                <User className="h-12 w-12" />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-sm transition-colors hover:text-teal-600"
              >
                <PenSquare className="h-4 w-4" />
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-semibold">
                  Nama Lengkap
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={defaultName}
                  required
                  className="rounded-xl border-border/80 bg-white"
                />
                {state.fieldErrors?.name && (
                  <p className="text-xs text-rose-600">
                    {state.fieldErrors.name[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={defaultEmail}
                  required
                  className="rounded-xl border-border/80 bg-white"
                />
                {state.fieldErrors?.email && (
                  <p className="text-xs text-rose-600">
                    {state.fieldErrors.email[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Status messages */}
          {state.error && (
            <p className="text-sm text-rose-600">{state.error}</p>
          )}
          {state.success && (
            <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <Check className="h-4 w-4" />
              Profil berhasil diperbarui.
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-border/60 pt-4">
            <Button
              type="reset"
              variant="outline"
              className="rounded-xl border-border/80 bg-white px-6 hover:bg-slate-50"
              disabled={isPending}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-[#007090] px-6 text-white shadow-sm hover:bg-[#005a75]"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

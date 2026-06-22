"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

export type ProfileState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

/* ================================================================== */
/*  Update Profile Action                                              */
/* ================================================================== */

const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Nama tidak boleh kosong."),
  email: z
    .string()
    .trim()
    .min(1, "Email tidak boleh kosong.")
    .email("Format email tidak valid."),
});

export async function updateProfile(
  _prevState: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const user = await requireUser();

  const parsed = updateProfileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    // Check if email is already taken by another user
    if (parsed.data.email !== user.email) {
      const existing = await prisma.user.findUnique({
        where: { email: parsed.data.email },
        select: { id: true },
      });

      if (existing && existing.id !== user.id) {
        return {
          success: false,
          error: "Email sudah digunakan oleh akun lain.",
        };
      }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
    });

    revalidatePath("/dashboard", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return {
      success: false,
      error: "Gagal memperbarui profil. Silakan coba lagi.",
    };
  }
}

import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { USER_ROLES } from "@/lib/auth/config";
import { hasSameOrigin } from "@/lib/auth/request";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const createUserSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z
    .string()
    .min(10)
    .max(72)
    .refine(
      (value) => new TextEncoder().encode(value).length <= 72,
      "Password maksimal 72 byte.",
    ),
  role: z.enum(USER_ROLES),
});

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ detail: "Origin request tidak valid." }, { status: 403 });
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ detail: "Session tidak valid." }, { status: 401 });
  }

  if (currentUser.role !== "superadmin") {
    return NextResponse.json(
      { detail: "Hanya superadmin yang dapat membuat user." },
      { status: 403 },
    );
  }

  try {
    const payload = createUserSchema.parse(await request.json());
    const user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        passwordHash: await hash(payload.password, 12),
        role: payload.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        user: {
          ...user,
          createdAt: user.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { detail: error.issues },
        { status: 400 },
      );
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { detail: "Email sudah terdaftar." },
        { status: 409 },
      );
    }

    console.error("Failed to create user", error);
    return NextResponse.json(
      { detail: "User gagal dibuat." },
      { status: 500 },
    );
  }
}

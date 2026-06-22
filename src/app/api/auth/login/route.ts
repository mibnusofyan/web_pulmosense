import { compare, hashSync } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { hasSameOrigin } from "@/lib/auth/request";
import { createSession } from "@/lib/auth/session";
import { isUserRole } from "@/lib/auth/config";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const DUMMY_PASSWORD_HASH = hashSync("paruscan-invalid-password", 12);

const loginSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(128),
});

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ detail: "Origin request tidak valid." }, { status: 403 });
  }

  try {
    const payload = loginSchema.parse(await request.json());
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        passwordHash: true,
      },
    });
    const passwordIsValid = await compare(
      payload.password,
      user?.passwordHash ?? DUMMY_PASSWORD_HASH,
    );

    if (!user || !passwordIsValid || !isUserRole(user.role)) {
      return NextResponse.json(
        { detail: "Email atau password tidak valid." },
        { status: 401 },
      );
    }

    await createSession({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { detail: "Email dan password wajib diisi dengan benar." },
        { status: 400 },
      );
    }

    console.error("Login failed", error);
    return NextResponse.json(
      { detail: "Login gagal diproses." },
      { status: 500 },
    );
  }
}

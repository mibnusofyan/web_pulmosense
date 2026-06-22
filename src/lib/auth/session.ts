import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  AUTH_COOKIE_NAME,
  AUTH_SESSION_SECONDS,
  isUserRole,
  type AuthUser,
} from "@/lib/auth/config";
import { signSessionToken, verifySessionToken } from "@/lib/auth/token";
import { prisma } from "@/lib/prisma";

export async function createSession(user: AuthUser) {
  const token = await signSessionToken({
    userId: user.id,
    role: user.role,
  });
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.PARUSCAN_COOKIE_SECURE === "true",
    path: "/",
    maxAge: AUTH_SESSION_SECONDS,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      passwordHash: true,
    },
  });

  if (!user?.passwordHash || !isUserRole(user.role)) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireSuperadmin() {
  const user = await requireUser();

  if (user.role !== "superadmin") {
    redirect("/dashboard");
  }

  return user;
}

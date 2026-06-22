import { jwtVerify, SignJWT } from "jose";

import {
  AUTH_SESSION_SECONDS,
  isUserRole,
  type UserRole,
} from "@/lib/auth/config";

const TOKEN_ISSUER = "paruscan-web";
const TOKEN_AUDIENCE = "paruscan-web";

export type SessionPayload = {
  userId: string;
  role: UserRole;
};

function getSecretKey() {
  const secret = process.env.PARUSCAN_AUTH_SECRET;

  if (!secret || new TextEncoder().encode(secret).length < 32) {
    throw new Error("PARUSCAN_AUTH_SECRET must contain at least 32 bytes");
  }

  return new TextEncoder().encode(secret);
}

export async function signSessionToken(payload: SessionPayload) {
  return new SignJWT({ role: payload.role })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(payload.userId)
    .setIssuer(TOKEN_ISSUER)
    .setAudience(TOKEN_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${AUTH_SESSION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
    });

    if (!payload.sub || !isUserRole(payload.role)) {
      return null;
    }

    return {
      userId: payload.sub,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

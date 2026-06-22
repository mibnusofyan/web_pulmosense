import { NextResponse } from "next/server";

import { hasSameOrigin } from "@/lib/auth/request";
import { clearSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ detail: "Origin request tidak valid." }, { status: 403 });
  }

  await clearSession();
  return NextResponse.json({ success: true });
}

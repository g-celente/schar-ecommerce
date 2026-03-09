// Deprecated in Next.js 16 — auth protection moved to proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = { matcher: [] };

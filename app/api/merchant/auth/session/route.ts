import { NextResponse } from "next/server";
import { getMerchantSession } from "@/lib/auth/merchant-session";

export const runtime = "nodejs";

export async function GET() {
  const session = await getMerchantSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    user: {
      name: session.userName,
      email: session.userEmail,
      role: session.role,
      merchantName: session.merchantName,
      storeName: session.storeName,
      storeSlug: session.storeSlug,
    },
  });
}

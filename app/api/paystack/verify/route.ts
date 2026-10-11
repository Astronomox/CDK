import { NextResponse, type NextRequest } from "next/server";

/**
 * Confirms a Paystack transaction server-side using the secret key.
 * The browser never sees the secret. Used for logging and future donor records.
 */
export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");
  if (!reference || !/^[\w-]{4,100}$/.test(reference)) {
    return NextResponse.json({ ok: false, error: "Invalid reference" }, { status: 400 });
  }
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Payments not configured" }, { status: 503 });
  }
  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    const body = (await res.json()) as { status: boolean; data?: { status: string; amount: number; currency: string } };
    const ok = res.ok && body.status && body.data?.status === "success";
    if (ok) {
      console.info(`[paystack] verified ${reference}: ${body.data!.currency} ${body.data!.amount / 100}`);
    } else {
      console.warn(`[paystack] could not verify ${reference}`);
    }
    return NextResponse.json({ ok });
  } catch (error) {
    console.error("[paystack] verify failed", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}

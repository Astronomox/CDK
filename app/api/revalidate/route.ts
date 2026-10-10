import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Sanity webhook target. Refreshes every page after content is published.
 * Configure in Sanity: POST https://<domain>/api/revalidate with header
 * "Authorization: Bearer <SANITY_REVALIDATE_SECRET>".
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidated: true });
}

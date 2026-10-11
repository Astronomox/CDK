import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { FormKind } from "./schemas";

/** Supabase tables. See supabase/migrations for the schema and access rules. */
export const TABLES: Record<FormKind, string> = {
  volunteer: "volunteer_applications",
  schoolOutreach: "school_outreach_enquiries",
  partner: "partner_enquiries",
  itemDonation: "item_donation_enquiries",
};

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  client ??= createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}

const toSnake = (key: string) => key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);

export async function saveSubmission(kind: FormKind, data: Record<string, unknown>): Promise<{ ok: boolean }> {
  const supabase = getClient();
  if (!supabase) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[forms] Supabase not configured. ${kind} submission not stored (development only).`);
      return { ok: true };
    }
    console.error("[forms] Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
    return { ok: false };
  }

  const row = Object.fromEntries(Object.entries(data).map(([k, v]) => [toSnake(k), v === "" ? null : v]));
  const { error } = await supabase.from(TABLES[kind]).insert(row);
  if (error) {
    console.error(`[forms] Failed to store ${kind} submission`, error.message);
    return { ok: false };
  }
  return { ok: true };
}

import "server-only";
import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "./env";

const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
      token: process.env.SANITY_API_READ_TOKEN || undefined,
    })
  : null;

/** Pages are statically generated and refreshed at most every 10 minutes (or on webhook). */
export const REVALIDATE_SECONDS = 600;

export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: REVALIDATE_SECONDS, tags: ["sanity"] } });
  } catch (error) {
    console.error("[sanity] query failed", error);
    return null;
  }
}

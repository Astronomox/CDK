export const apiVersion = "2025-10-01";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** When false the site renders the seed content in lib/content/seed.ts. */
export const sanityConfigured = /^[a-z0-9-]+$/.test(projectId);

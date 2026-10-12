import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getProgrammes, getProjects, getStories } from "@/lib/content";

export const revalidate = 3600;

const STATIC_PATHS = [
  "/",
  "/about",
  "/programmes",
  "/impact",
  "/impact/projects",
  "/impact/gallery",
  "/impact/videos",
  "/impact/testimonials",
  "/get-involved",
  "/get-involved/volunteer",
  "/get-involved/donate",
  "/get-involved/donate-items",
  "/get-involved/partner",
  "/partners",
  "/stories",
  "/contact",
  "/privacy",
  "/safeguarding",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programmes, projects, stories] = await Promise.all([getProgrammes(), getProjects(), getStories()]);
  const now = new Date();
  return [
    ...STATIC_PATHS.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...programmes.map((p) => ({ url: absoluteUrl(`/programmes/${p.slug}`), lastModified: now, priority: 0.8 })),
    ...projects.map((p) => ({ url: absoluteUrl(`/impact/projects/${p.slug}`), lastModified: p.date ? new Date(p.date) : now, priority: 0.6 })),
    ...stories.map((s) => ({ url: absoluteUrl(`/stories/${s.slug}`), lastModified: new Date(s.publishedAt), priority: 0.6 })),
  ];
}

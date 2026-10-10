/**
 * Content access for pages. Reads from Sanity when configured, otherwise from
 * the seed content. Both paths apply the same safeguarding rules:
 *  - child-related documents render only when `approved` is true
 *  - images that show identifiable children render only with confirmed consent
 *  - partner logos render only with display permission
 */
import "server-only";
import { cache } from "react";
import { sanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/client";
import {
  galleryQuery,
  partnersQuery,
  programmesQuery,
  projectBySlugQuery,
  projectsQuery,
  storiesQuery,
  storyBySlugQuery,
  testimonialsQuery,
  videosQuery,
} from "@/sanity/queries";
import {
  seedGallery,
  seedPartners,
  seedProgrammes,
  seedProjects,
  seedStories,
  seedTestimonials,
  seedVideos,
  PLACEHOLDERS,
} from "./seed";
import type { GalleryItem, Img, Partner, Programme, Project, Story, Testimonial, Video } from "./types";

export * from "./types";

type RawImg = Partial<Img> & { showsIdentifiableChildren?: boolean; consentConfirmed?: boolean };

/** Returns null for missing images and for images of identifiable children without consent. */
export function safeImg(raw: RawImg | null | undefined): Img | null {
  if (!raw?.src) return null;
  if (raw.showsIdentifiableChildren && !raw.consentConfirmed) return null;
  return {
    src: raw.src,
    alt: raw.alt || "",
    width: raw.width || 1200,
    height: raw.height || 900,
    lqip: raw.lqip,
  };
}

function safeImgs(list: (RawImg | null)[] | null | undefined): Img[] {
  return (list || []).map(safeImg).filter((x): x is Img => x !== null);
}

function onlyApproved<T extends { approved: boolean }>(items: T[]): T[] {
  return items.filter((item) => item.approved === true);
}

function youtubeId(url?: string | null): string | undefined {
  if (!url) return undefined;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match?.[1];
}

type RawVideo = Omit<Video, "poster" | "youtubeId"> & { youtubeUrl?: string; poster?: RawImg };
function mapVideo(v: RawVideo): Video {
  return {
    id: v.id,
    title: v.title,
    description: v.description,
    youtubeId: youtubeId(v.youtubeUrl),
    fileUrl: v.fileUrl,
    poster: safeImg(v.poster) ?? undefined,
    projectTitle: v.projectTitle,
  };
}

type RawPartner = Omit<Partner, "logo"> & { logo?: RawImg | null };
function mapPartner(p: RawPartner): Partner {
  return { ...p, logo: safeImg(p.logo) ?? undefined };
}

type RawProject = Omit<Project, "coverImage" | "photos" | "videos" | "sponsors" | "whatWeDid"> & {
  coverImage?: RawImg;
  photos?: RawImg[];
  videos?: RawVideo[];
  sponsors?: RawPartner[];
  whatWeDid?: string[];
};
function mapProject(p: RawProject): Project {
  return {
    ...p,
    whatWeDid: p.whatWeDid || [],
    coverImage: safeImg(p.coverImage) ?? PLACEHOLDERS.outreach,
    photos: safeImgs(p.photos),
    videos: (p.videos || []).map(mapVideo),
    testimonials: p.testimonials || [],
    sponsors: (p.sponsors || []).map(mapPartner),
  };
}

type RawStory = Omit<Story, "coverImage"> & { coverImage?: RawImg };
function mapStory(s: RawStory): Story {
  return { ...s, body: s.body || [], coverImage: safeImg(s.coverImage) ?? undefined };
}

export const getProgrammes = cache(async (): Promise<Programme[]> => {
  if (!sanityConfigured) return seedProgrammes;
  type Raw = Omit<Programme, "image"> & { image?: RawImg };
  const data = await sanityFetch<Raw[]>(programmesQuery);
  if (!data?.length) return seedProgrammes;
  return data.map((p) => ({
    ...p,
    highlights: p.highlights || [],
    image: safeImg(p.image) ?? seedProgrammes.find((s) => s.slug === p.slug)?.image ?? PLACEHOLDERS.outreach,
  }));
});

export async function getProgramme(slug: string): Promise<Programme | undefined> {
  return (await getProgrammes()).find((p) => p.slug === slug);
}

export const getProjects = cache(async (): Promise<Project[]> => {
  if (!sanityConfigured) return onlyApproved(seedProjects);
  const data = await sanityFetch<RawProject[]>(projectsQuery);
  return (data || []).map(mapProject);
});

export async function getProject(slug: string): Promise<Project | undefined> {
  if (!sanityConfigured) return onlyApproved(seedProjects).find((p) => p.slug === slug);
  const data = await sanityFetch<RawProject>(projectBySlugQuery, { slug });
  return data ? mapProject(data) : undefined;
}

export const getGallery = cache(async (): Promise<GalleryItem[]> => {
  if (!sanityConfigured) return onlyApproved(seedGallery);
  type Raw = Omit<GalleryItem, "image"> & { image?: RawImg };
  const data = await sanityFetch<Raw[]>(galleryQuery);
  return (data || []).flatMap((item) => {
    const image = safeImg(item.image);
    return image ? [{ ...item, image }] : [];
  });
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  if (!sanityConfigured) return onlyApproved(seedTestimonials);
  return (await sanityFetch<Testimonial[]>(testimonialsQuery)) || [];
});

export const getVideos = cache(async (): Promise<Video[]> => {
  if (!sanityConfigured) return onlyApproved(seedVideos);
  const data = await sanityFetch<RawVideo[]>(videosQuery);
  return (data || []).map(mapVideo).filter((v) => v.youtubeId || v.fileUrl);
});

export const getPartners = cache(async (): Promise<Partner[]> => {
  if (!sanityConfigured) return seedPartners;
  const data = await sanityFetch<RawPartner[]>(partnersQuery);
  return (data || []).map(mapPartner);
});

export const getStories = cache(async (): Promise<Story[]> => {
  if (!sanityConfigured) return onlyApproved(seedStories);
  const data = await sanityFetch<RawStory[]>(storiesQuery);
  return (data || []).map(mapStory);
});

export async function getStory(slug: string): Promise<Story | undefined> {
  if (!sanityConfigured) return onlyApproved(seedStories).find((s) => s.slug === slug);
  const data = await sanityFetch<RawStory>(storyBySlugQuery, { slug });
  return data ? mapStory(data) : undefined;
}

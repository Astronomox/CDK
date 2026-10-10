import type { PortableTextBlock } from "@portabletext/react";

export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Base64 blur preview from Sanity, when available. */
  lqip?: string;
  /** True for the labelled placeholder artwork shipped with the site. */
  placeholder?: boolean;
};

export type ProgrammeSkill = {
  title: string;
  description?: string;
  status: "planned" | "open" | "running";
};

export type Programme = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  highlights: string[];
  audience?: string;
  status: "active" | "in-development";
  image: Img;
  skills?: ProgrammeSkill[];
  order: number;
};

export type Partner = {
  id: string;
  name: string;
  kind: "sponsor" | "partner";
  description?: string;
  website?: string;
  /** Only present when logo display permission has been confirmed. */
  logo?: Img;
};

export type Testimonial = {
  id: string;
  quote: string;
  /** Display attribution, e.g. "Teacher, Lagos". Never a child's full name. */
  attribution: string;
  role: "child" | "parent" | "teacher" | "school-admin" | "volunteer" | "sponsor";
};

export type Video = {
  id: string;
  title: string;
  description?: string;
  youtubeId?: string;
  fileUrl?: string;
  poster?: Img;
  projectTitle?: string;
};

export type GalleryCategory = "school-outreaches" | "games" | "creative-activities" | "donations" | "volunteers" | "events";

export type GalleryItem = {
  id: string;
  image: Img;
  caption?: string;
  category: GalleryCategory;
  projectTitle?: string;
};

export type Project = {
  slug: string;
  title: string;
  date?: string;
  location: string;
  school?: string;
  context: string;
  whatWeDid: string[];
  childrenReached?: number;
  outcome: string;
  coverImage: Img;
  photos: Img[];
  videos: Video[];
  testimonials: Testimonial[];
  sponsors: Partner[];
  /** Shown while full project details are still being compiled. */
  detailsPending?: boolean;
};

export type StoryCategory =
  | "project-story"
  | "outreach-update"
  | "volunteer-story"
  | "programme-announcement"
  | "impact-story"
  | "partner-story"
  | "upcoming-activity";

export type Story = {
  slug: string;
  title: string;
  category: StoryCategory;
  publishedAt: string;
  excerpt: string;
  coverImage?: Img;
  body: PortableTextBlock[];
};

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  "school-outreaches": "School outreaches",
  games: "Games",
  "creative-activities": "Creative activities",
  donations: "Donations",
  volunteers: "Volunteers",
  events: "Events",
};

export const STORY_CATEGORY_LABELS: Record<StoryCategory, string> = {
  "project-story": "Project story",
  "outreach-update": "Outreach update",
  "volunteer-story": "Volunteer story",
  "programme-announcement": "Programme announcement",
  "impact-story": "Impact story",
  "partner-story": "Partner story",
  "upcoming-activity": "Upcoming activity",
};

export const TESTIMONIAL_ROLE_LABELS: Record<Testimonial["role"], string> = {
  child: "Child",
  parent: "Parent or guardian",
  teacher: "Teacher",
  "school-admin": "School administrator",
  volunteer: "Volunteer",
  sponsor: "Sponsor",
};

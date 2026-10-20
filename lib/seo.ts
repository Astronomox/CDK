import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

/**
 * Default share image (app/opengraph-image.jpg). Pages that set their own openGraph lose the
 * file-based image Next.js adds at the root, so it is passed explicitly here.
 */
const SHARE_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Pupils in green uniforms cheer and hold up books at a Cheer The Kids outreach, with the Cheer The Kids logo in the corner.",
};

export function pageMetadata({ title, description, path, image, type = "website", noIndex }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image }] : [SHARE_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      locale: "en_NG",
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getGallery } from "@/lib/content";
import { EmptyState, PageHeader, Section } from "@/components/ui/primitives";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Shield } from "@/components/icons";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: "Photos from Cheer The Kids outreaches, games, creative activities, donations, volunteers and events.",
  path: "/impact/gallery",
});

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <PageHeader
        eyebrow="Our Impact"
        title="Gallery"
        intro="Laughter, games, learning and celebration from our outreaches."
        crumbs={[{ label: "Our Impact", href: "/impact" }, { label: "Gallery" }]}
      />
      <Section>
        <h2 className="sr-only">Photos</h2>
        <p className="mb-8 flex max-w-3xl items-start gap-3 rounded-2xl bg-canvas-tint p-4 text-sm text-ink">
          <Shield className="mt-0.5 size-5 shrink-0 text-blue" />
          We only publish photos of children when a parent or guardian has given consent and the image has passed our safeguarding review.
        </p>
        {items.length ? (
          <GalleryGrid items={items} />
        ) : (
          <EmptyState title="Photos are on their way" action={{ href: SITE.socials.instagram, label: "See moments on Instagram", external: true }}>
            We are reviewing photos from our outreaches and will share them here once consent is confirmed.
          </EmptyState>
        )}
      </Section>
    </>
  );
}

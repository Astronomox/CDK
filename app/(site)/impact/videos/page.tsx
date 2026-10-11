import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getVideos } from "@/lib/content";
import { EmptyState, PageHeader, Section } from "@/components/ui/primitives";
import { VideoEmbed } from "@/components/VideoEmbed";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Videos",
  description: "Watch Cheer d’Kids outreaches in action.",
  path: "/impact/videos",
});

export default async function VideosPage() {
  const videos = await getVideos();
  return (
    <>
      <PageHeader
        eyebrow="Our Impact"
        title="Videos"
        intro="See what an outreach feels like. Videos load only when you press play, to save your data."
        crumbs={[{ label: "Our Impact", href: "/impact" }, { label: "Videos" }]}
      />
      <Section>
        <h2 className="sr-only">All videos</h2>
        {videos.length ? (
          <div className="grid gap-10 md:grid-cols-2">
            {videos.map((v) => (
              <VideoEmbed key={v.id} video={v} />
            ))}
          </div>
        ) : (
          <EmptyState title="Videos are on their way" action={{ href: SITE.socials.instagram, label: "Watch on Instagram", external: true }}>
            We are preparing videos from our outreaches and will share them here once consent is confirmed.
          </EmptyState>
        )}
      </Section>
    </>
  );
}

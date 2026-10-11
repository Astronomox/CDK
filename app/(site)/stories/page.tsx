import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getStories } from "@/lib/content";
import { EmptyState, PageHeader, Section } from "@/components/ui/primitives";
import { StoryCard } from "@/components/sections/cards";
import { SocialLinks } from "@/components/layout/SocialLinks";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Stories and news",
  description: "Project stories, outreach updates, volunteer stories and programme announcements from Cheer d’Kids.",
  path: "/stories",
});

export default async function StoriesPage() {
  const stories = await getStories();
  return (
    <>
      <PageHeader
        eyebrow="Stories and news"
        title="Stories and news"
        intro="Outreach updates, volunteer stories, programme announcements and what is coming up next."
        crumbs={[{ label: "Stories and News" }]}
      />
      <Section>
        <h2 className="sr-only">Latest stories</h2>
        {stories.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        ) : (
          <EmptyState title="Stories are on their way" action={{ href: SITE.socials.instagram, label: "Follow us on Instagram", external: true }} />
        )}
      </Section>
      <Section tone="gold-soft">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Never miss an update</h2>
            <p className="mt-2 text-muted-foreground">Follow {SITE.name} for outreach moments as they happen.</p>
          </div>
          <SocialLinks withLabels />
        </div>
      </Section>
    </>
  );
}

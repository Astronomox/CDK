import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/lib/site";
import { getStories, getStory, STORY_CATEGORY_LABELS } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageHeader, Section, formatDate } from "@/components/ui/primitives";
import { StoryCard } from "@/components/sections/cards";
import { RichText } from "@/components/RichText";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";

export const revalidate = 600;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getStories()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return {};
  const cover = story.coverImage && !story.coverImage.placeholder ? story.coverImage.src : undefined;
  return pageMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/stories/${slug}`,
    type: "article",
    image: cover ? (cover.startsWith("http") ? cover : absoluteUrl(cover)) : undefined,
  });
}

export default async function StoryPage({ params }: Params) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();
  const more = (await getStories()).filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={STORY_CATEGORY_LABELS[story.category]}
        title={story.title}
        intro={
          <p>
            <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
          </p>
        }
        crumbs={[{ label: "Stories and News", href: "/stories" }, { label: story.title }]}
      />
      <Section>
        <article className="mx-auto max-w-3xl">
          {story.coverImage ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[28px]">
              <MediaImage image={story.coverImage} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          ) : null}
          <p className="mb-6 text-xl font-medium text-ink">{story.excerpt}</p>
          <RichText value={story.body} />
        </article>
      </Section>
      {more.length ? (
        <Section tone="soft" labelledBy="more-heading">
          <h2 id="more-heading" className="text-3xl font-bold">
            More stories
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </Section>
      ) : null}
      <CtaBand
        title="Be part of the next story"
        actions={[
          { href: "/get-involved/volunteer", label: "Volunteer With Us", trackLabel: "story_volunteer" },
          { href: "/get-involved/donate", label: "Support Our Mission" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: story.title,
          description: story.excerpt,
          datePublished: story.publishedAt,
          mainEntityOfPage: absoluteUrl(`/stories/${story.slug}`),
          author: { "@type": "Organization", name: SITE.name },
          publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo-transparent.png") } },
        }}
      />
    </>
  );
}

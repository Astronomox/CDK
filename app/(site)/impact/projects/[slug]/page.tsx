import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getProject, getProjects } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { CheckList, PageHeader, Section, formatDate } from "@/components/ui/primitives";
import { PartnerTile, TestimonialCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";
import { VideoEmbed } from "@/components/VideoEmbed";
import { Calendar, MapPin, School, Users } from "@/components/icons";

export const revalidate = 600;
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const image = project.coverImage.placeholder ? undefined : project.coverImage.src;
  return pageMetadata({
    title: project.title,
    description: project.context.slice(0, 160),
    path: `/impact/projects/${slug}`,
    image: image?.startsWith("http") ? image : image ? absoluteUrl(image) : undefined,
    type: "article",
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const date = project.dateLabel ?? formatDate(project.date);
  const facts = [
    { label: "Location", value: project.location, Icon: MapPin },
    project.school ? { label: "School or community", value: project.school, Icon: School } : null,
    date ? { label: "Date", value: date, Icon: Calendar } : null,
    project.childrenReached ? { label: "Children reached", value: project.reachedLabel ?? project.childrenReached.toLocaleString("en-NG"), Icon: Users } : null,
  ].filter((f): f is NonNullable<typeof f> => f !== null);

  return (
    <>
      <PageHeader
        eyebrow="Project story"
        title={project.title}
        crumbs={[
          { label: "Our Impact", href: "/impact" },
          { label: "Projects", href: "/impact/projects" },
          { label: project.title },
        ]}
      >
        <dl className="flex flex-wrap gap-3">
          {facts.map(({ label, value, Icon }) => (
            <div key={label} className="flex items-center gap-2 rounded-full bg-white px-4 py-2">
              <Icon className="size-4 text-purple" />
              <dt className="sr-only">{label}</dt>
              <dd className="font-heading text-sm font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="space-y-10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px]">
              <MediaImage image={project.coverImage} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </div>
            {project.detailsPending ? (
              <p className="rounded-2xl bg-canvas-warm p-5 text-ink">
                We are still compiling the full details of this project. Dates, schools and photos will be added as they are confirmed.
              </p>
            ) : null}
            <section aria-labelledby="context-heading">
              <h2 id="context-heading" className="text-2xl font-bold">
                The need
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">{project.context}</p>
            </section>
            {project.whatWeDid.length ? (
              <section aria-labelledby="did-heading">
                <h2 id="did-heading" className="text-2xl font-bold">
                  What we did
                </h2>
                <div className="mt-4">
                  <CheckList items={project.whatWeDid} />
                </div>
              </section>
            ) : null}
            <section aria-labelledby="outcome-heading" className="rounded-[28px] bg-blue p-8 text-white">
              <h2 id="outcome-heading" className="text-2xl font-bold text-white">
                Outcome
              </h2>
              <p className="mt-3 text-lg text-white">{project.outcome}</p>
            </section>
          </article>

          <aside className="space-y-10">
            {project.testimonials.length ? (
              <section aria-labelledby="voices-heading" className="space-y-8">
                <h2 id="voices-heading" className="text-2xl font-bold">
                  Voices
                </h2>
                {project.testimonials.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
              </section>
            ) : null}
            {project.sponsors.length ? (
              <section aria-labelledby="sponsors-heading">
                <h2 id="sponsors-heading" className="text-2xl font-bold">
                  Made possible by
                </h2>
                <ul className="mt-4 grid gap-3">
                  {project.sponsors.map((s) => (
                    <PartnerTile key={s.id} partner={s} />
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </div>
      </Section>

      {project.photos.length ? (
        <Section tone="soft" labelledBy="photos-heading">
          <h2 id="photos-heading" className="text-3xl font-bold">
            Photos
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {project.photos.map((img, i) => (
              <li key={`${img.src}-${i}`} className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                <MediaImage image={img} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {project.videos.length ? (
        <Section labelledBy="videos-heading">
          <h2 id="videos-heading" className="text-3xl font-bold">
            Videos
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {project.videos.map((v) => (
              <VideoEmbed key={v.id} video={v} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Make the next outreach possible"
        actions={[
          { href: "/get-involved/donate", label: "Support Our Mission", trackLabel: "project_donate" },
          { href: "/get-involved/volunteer", label: "Volunteer With Us" },
        ]}
      />
    </>
  );
}

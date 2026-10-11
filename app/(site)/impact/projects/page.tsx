import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getProjects } from "@/lib/content";
import { EmptyState, PageHeader, Section } from "@/components/ui/primitives";
import { ProjectCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Stories from Cheer d’Kids school and community outreaches in Lagos and Kwara.",
  path: "/impact/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHeader
        eyebrow="Our Impact"
        title="Projects"
        intro="Each project tells the story of an outreach: where we went, what we did, and what changed."
        crumbs={[{ label: "Our Impact", href: "/impact" }, { label: "Projects" }]}
      />
      <Section>
        <h2 className="sr-only">All projects</h2>
        {projects.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <EmptyState title="Project stories are on their way" action={{ href: SITE.socials.instagram, label: "See updates on Instagram", external: true }}>
            We are compiling the full story of each outreach, with photos shared only with the right consent.
          </EmptyState>
        )}
      </Section>
      <CtaBand
        title="Be part of the next story"
        actions={[
          { href: "/get-involved/donate", label: "Support Our Mission", trackLabel: "projects_donate" },
          { href: "/get-involved/partner", label: "Sponsor an outreach" },
        ]}
      />
    </>
  );
}

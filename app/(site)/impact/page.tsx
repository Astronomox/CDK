import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/content";
import { PageHeader, Section, SectionHeading } from "@/components/ui/primitives";
import { StatsBand } from "@/components/sections/StatsBand";
import { ProjectCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowRight, Book, Camera, Heart, Play } from "@/components/icons";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Our impact",
  description: "Over 2,000 children reached through 7 school and community outreaches in Lagos and Kwara. See our projects, photos, videos and testimonials.",
  path: "/impact",
});

export default async function ImpactPage() {
  const projects = await getProjects();

  const sections = [
    { href: "/impact/projects", title: "Projects", text: "The story of each outreach.", Icon: Book, tone: "bg-purple text-white" },
    { href: "/impact/gallery", title: "Gallery", text: "Moments of joy, shared with consent.", Icon: Camera, tone: "bg-blue text-white" },
    { href: "/impact/videos", title: "Videos", text: "See an outreach in action.", Icon: Play, tone: "bg-gold text-ink" },
    { href: "/impact/testimonials", title: "Testimonials", text: "In the words of the people involved.", Icon: Heart, tone: "bg-purple text-white" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Our impact"
        title="Over 2,000 children reached through 7 outreaches"
        intro="Our documented activities so far have taken place in Lagos and Kwara. Here is the evidence, shared honestly and with consent."
        crumbs={[{ label: "Our Impact" }]}
      />

      <Section labelledBy="explore-heading">
        <h2 id="explore-heading" className="sr-only">
          Explore our impact
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map(({ href, title, text, Icon, tone }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-[20px] border border-line bg-white p-6 transition-shadow hover:shadow-[0_12px_32px_rgba(23,63,97,0.12)]"
              >
                <span aria-hidden className={`grid size-12 place-items-center rounded-full ${tone}`}>
                  <Icon className="size-6" />
                </span>
                <span className="mt-4 font-heading text-xl font-semibold">{title}</span>
                <span className="mt-1 flex-1 text-muted-foreground">{text}</span>
                <span aria-hidden className="mt-4 inline-flex items-center gap-1.5 font-heading font-semibold text-blue-deep">
                  View <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <StatsBand />

      {projects.length ? (
        <Section labelledBy="recent-heading">
          <SectionHeading id="recent-heading" eyebrow="Projects" title="Recent project stories" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Help us reach the next 2,000 children"
        text="Your support makes the next outreach possible."
        actions={[
          { href: "/get-involved/donate", label: "Support Our Mission", trackLabel: "impact_donate" },
          { href: "/get-involved/volunteer", label: "Volunteer With Us" },
        ]}
      />
    </>
  );
}

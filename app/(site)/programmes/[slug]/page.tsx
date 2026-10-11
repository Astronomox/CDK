import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getProgramme, getProgrammes, type Programme } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckList, Eyebrow, PageHeader, Section, SectionHeading } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/CtaBand";
import { SchoolOutreachForm } from "@/components/forms/Forms";
import { Steps } from "@/components/sections/Steps";
import { SCHOOL_JOURNEY, VOLUNTEER_JOURNEY } from "@/lib/journeys";

export const revalidate = 600;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProgrammes()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const programme = await getProgramme(slug);
  if (!programme) return {};
  return pageMetadata({ title: programme.title, description: programme.summary, path: `/programmes/${slug}` });
}

const SKILL_STATUS = { planned: "Under consideration", open: "Open for applications", running: "Running now" } as const;

function Extras({ programme }: { programme: Programme }) {
  if (programme.slug === "school-outreaches") {
    return (
      <>
        <Section tone="soft" labelledBy="how-heading">
          <SectionHeading id="how-heading" eyebrow="How it works" title="Bringing an outreach to your school" />
          <Steps steps={SCHOOL_JOURNEY} />
          <p className="mt-8 max-w-2xl text-muted-foreground">
            Where sponsors make it possible, we distribute relief items such as bags, shoes, books and other approved items.
          </p>
        </Section>
        <Section id="invite" labelledBy="invite-heading">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>For schools</Eyebrow>
              <h2 id="invite-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
                Invite Cheer d’Kids to Your School
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Share a few details and we will get in touch to plan a joyful visit.
              </p>
            </div>
            <div className="rounded-[28px] border border-line bg-white p-6 sm:p-8">
              <SchoolOutreachForm />
            </div>
          </div>
        </Section>
      </>
    );
  }

  if (programme.slug === "volunteer-training") {
    return (
      <>
        <Section tone="soft" labelledBy="journey-heading">
          <SectionHeading
            id="journey-heading"
            eyebrow="The volunteer journey"
            title="From application to your first outreach"
            intro="Training helps every volunteer show up for children with care, energy and good safeguarding practice."
          />
          <Steps steps={VOLUNTEER_JOURNEY} />
        </Section>
        <CtaBand
          title="Ready to volunteer?"
          text="Applications take about five minutes."
          actions={[
            { href: "/get-involved/volunteer#apply", label: "Apply to volunteer", trackLabel: "training_apply" },
            { href: "/get-involved/volunteer", label: "See volunteer roles" },
          ]}
        />
      </>
    );
  }

  if (programme.slug === "skill-acquisition") {
    return (
      <>
        {programme.skills?.length ? (
          <Section tone="soft" labelledBy="skills-heading">
            <SectionHeading id="skills-heading" eyebrow="Skills" title="Skills we are exploring" />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {programme.skills.map((s) => (
                <li key={s.title} className="rounded-[20px] bg-white p-6">
                  <p className="font-heading text-sm font-semibold text-purple">{SKILL_STATUS[s.status] ?? s.status}</p>
                  <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                  {s.description ? <p className="mt-2 text-muted-foreground">{s.description}</p> : null}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}
        <CtaBand
          title="Can you teach a skill?"
          text="If you are a professional who could teach or support a skill, we would love to talk."
          actions={[
            { href: "/get-involved/partner", label: "Partner with us", trackLabel: "skills_partner" },
            { href: SITE.socials.instagram, label: "Follow for updates" },
          ]}
          tone="navy"
        />
      </>
    );
  }

  return (
    <CtaBand
      title="Get involved"
      actions={[
        { href: "/get-involved/volunteer", label: "Volunteer" },
        { href: "/get-involved/donate", label: "Donate" },
      ]}
    />
  );
}

export default async function ProgrammePage({ params }: Params) {
  const { slug } = await params;
  const programme = await getProgramme(slug);
  if (!programme) notFound();

  return (
    <>
      <PageHeader
        eyebrow={programme.status === "in-development" ? "In development" : "Programme"}
        title={programme.title}
        intro={programme.summary}
        crumbs={[{ label: "Programmes", href: "/programmes" }, { label: programme.title }]}
      >
        {programme.slug === "school-outreaches" ? (
          <ButtonLink href="#invite" variant="primary" trackLabel="school_page_invite" arrow>
            Invite us to your school
          </ButtonLink>
        ) : null}
        {programme.slug === "volunteer-training" ? (
          <ButtonLink href="/get-involved/volunteer#apply" variant="primary" trackLabel="training_header_apply" arrow>
            Apply to volunteer
          </ButtonLink>
        ) : null}
      </PageHeader>

      <Section labelledBy="overview-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 id="overview-heading" className="text-3xl font-bold">
              {programme.status === "in-development" ? "What we are building" : "What it involves"}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{programme.intro}</p>
            {programme.highlights.length ? (
              <div className="mt-8">
                <CheckList items={programme.highlights} />
              </div>
            ) : null}
            {programme.audience ? (
              <p className="mt-8 rounded-2xl bg-canvas-warm p-5">
                <span className="font-heading font-semibold">Who it is for: </span>
                {programme.audience}
              </p>
            ) : null}
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
              <MediaImage image={programme.image} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </Section>

      <Extras programme={programme} />
    </>
  );
}

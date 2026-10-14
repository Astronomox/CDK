import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { OUTREACH_PHOTOS } from "@/lib/content/seed";
import { VOLUNTEER_AREAS } from "@/lib/forms/options";
import { VOLUNTEER_JOURNEY } from "@/lib/journeys";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow, PageHeader, Section, SectionHeading } from "@/components/ui/primitives";
import { Steps } from "@/components/sections/Steps";
import { VolunteerForm } from "@/components/forms/Forms";
import { Book, Camera, Heart, School, Sparkle, Users } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Volunteer",
  description:
    "Volunteer with Cheer The Kids. Open to tertiary students, graduates and professionals. Apply, take a short screening test by email, train and join an outreach.",
  path: "/get-involved/volunteer",
});

const WHO = [
  { title: "Tertiary students", text: "Young Nigerians currently in a university, polytechnic or college of education.", Icon: School },
  { title: "Graduates", text: "Graduates of tertiary institutions who want to give their time and energy.", Icon: Book },
  { title: "Professionals", text: "People who can contribute expertise, skills and experience.", Icon: Users },
];

const AREA_ICONS = [Heart, Sparkle, Camera, Camera, Sparkle, Book, Users, Heart];

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        image={OUTREACH_PHOTOS["2025-47"]}
        eyebrow="Get involved"
        title="Volunteer With Us"
        intro="Bring your energy, care and skills to help children rediscover joy and believe in their dreams."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Volunteer" }]}
      >
        <ButtonLink href="#apply" variant="primary" trackLabel="volunteer_header_apply" arrow>
          Apply now
        </ButtonLink>
      </PageHeader>

      <Section labelledBy="who-heading">
        <SectionHeading id="who-heading" eyebrow="Who can volunteer" title="Volunteers we are looking for" />
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {WHO.map(({ title, text, Icon }) => (
            <li key={title} className="rounded-[20px] bg-canvas-tint p-6">
              <Icon className="size-8 text-blue" />
              <h3 className="mt-3 text-xl font-semibold">{title}</h3>
              <p className="mt-1 text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="purple-soft" labelledBy="areas-heading">
        <SectionHeading id="areas-heading" eyebrow="Opportunities" title="Ways you can help" />
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {VOLUNTEER_AREAS.map((area, i) => {
            const Icon = AREA_ICONS[i % AREA_ICONS.length];
            return (
              <li key={area} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-heading font-semibold">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-canvas-warm text-purple">
                  <Icon className="size-5" />
                </span>
                {area}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section labelledBy="journey-heading">
        <SectionHeading
          id="journey-heading"
          eyebrow="What happens next"
          title="Your volunteer journey"
          intro="Every volunteer completes a screening test sent by email and takes part in training before deployment. This keeps children safe and helps you feel ready."
        />
        <div className="[&_li]:bg-canvas-tint">
          <Steps steps={VOLUNTEER_JOURNEY} />
        </div>
      </Section>

      <Section tone="soft" id="apply" labelledBy="apply-heading">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow tone="blue">Application</Eyebrow>
            <h2 id="apply-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
              Apply to volunteer
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              It takes about five minutes. Fields marked with a star are required. We will email you about next steps.
            </p>
          </div>
          <div className="rounded-[28px] bg-white p-6 sm:p-8">
            <VolunteerForm />
          </div>
        </div>
      </Section>
    </>
  );
}

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
            <li key={title} className="lift flex gap-4 rounded-[20px] bg-canvas-tint p-4 sm:p-6 md:block">
              <Icon className="size-7 shrink-0 text-blue md:size-8" />
              <div>
                <h3 className="text-lg font-semibold md:mt-3 md:text-xl">{title}</h3>
                <p className="mt-1 text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="purple-soft" labelledBy="areas-heading">
        <SectionHeading id="areas-heading" eyebrow="Opportunities" title="Ways you can help" />
        <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {VOLUNTEER_AREAS.map((area, i) => {
            const Icon = AREA_ICONS[i % AREA_ICONS.length];
            return (
              <li key={area} className="lift flex items-center gap-2.5 rounded-2xl bg-white p-3 font-heading text-[0.95rem] font-semibold leading-snug sm:gap-3 sm:p-4 sm:text-base">
                <span aria-hidden className="grid size-8 shrink-0 sm:size-10 place-items-center rounded-full bg-canvas-warm text-purple">
                  <Icon className="size-4 sm:size-5" />
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
        <div className="sm:[&_li]:bg-canvas-tint">
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

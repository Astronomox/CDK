import type { Metadata } from "next";
import { SITE, isTodo } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { TEAM } from "@/lib/team";
import { PLACEHOLDERS, OUTREACH_PHOTOS } from "@/lib/content/seed";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageHeader, Section, SectionHeading } from "@/components/ui/primitives";
import { StatsBand } from "@/components/sections/StatsBand";
import { CtaBand } from "@/components/sections/CtaBand";
import { MapPin, Shield } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description: `Learn why ${SITE.name} exists, our mission, vision and core values, and where we work in Southwest Nigeria.`,
  path: "/about",
});

const VALUES = [
  { name: "Compassion", text: "We care about children's realities and respond with empathy." },
  { name: "Joy", text: "We create experiences that allow children to laugh, play, connect and feel celebrated." },
  { name: "Hope", text: "We help children see that their future can hold possibilities beyond their present circumstances." },
  { name: "Empowerment", text: "We encourage children to recognise their abilities and develop confidence." },
  { name: "Dignity", text: "We serve children respectfully and avoid presenting them through pity or helplessness." },
  { name: "Integrity", text: "We communicate honestly, protect trust and handle resources responsibly." },
  { name: "Collaboration", text: "We work with volunteers, schools, sponsors, partners and communities to expand impact." },
];

const VALUE_TONES = ["bg-canvas-warm", "bg-canvas-warm", "bg-canvas-tint"];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        image={OUTREACH_PHOTOS["2024-32"]}
        eyebrow="About us"
        title="Giving children hope. Keeping their spark alive."
        intro={`${SITE.name} is an NGO focused on giving children hope, restoring joy and helping young people develop the self-belief to pursue their dreams and aspirations.`}
        crumbs={[{ label: "About" }]}
      />

      <Section labelledBy="story-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading id="story-heading" eyebrow="Our story" title="Why Cheer The Kids was established" />
            <div className="mt-5 space-y-4 text-lg text-muted-foreground">
              <p>
                Children growing up in difficult family, economic and social circumstances can lose confidence, enthusiasm and hope for the
                future. Their potential is still there. Sometimes it just needs encouragement to shine.
              </p>
              <p>
                {SITE.name} was started to create positive experiences, encouragement and opportunities that help children keep their spark
                alive and believe that their circumstances do not have to define their future.
              </p>
              <p>
                We see children as people with potential, dreams and dignity. That shapes everything we do, from how we run an outreach to how
                we share stories and photos.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
              <MediaImage image={PLACEHOLDERS.team} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="soft" id="mission" labelledBy="mission-heading">
        <h2 id="mission-heading" className="sr-only">
          Mission and vision
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-t-2 border-ink pt-6">
            <p className="font-sans text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-purple">Our mission</p>
            <p className="mt-4 font-heading text-2xl font-medium leading-snug text-ink">{SITE.mission}</p>
          </div>
          <div className="border-t-2 border-ink pt-6">
            <p className="font-sans text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-purple">Our vision</p>
            <p className="mt-4 font-heading text-2xl font-medium leading-snug text-ink">{SITE.vision}</p>
          </div>
        </div>
      </Section>

      <Section id="values" labelledBy="values-heading">
        <SectionHeading id="values-heading" eyebrow="What guides us" title="Our core values" align="center" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <li key={v.name} className={`rounded-[20px] p-6 ${VALUE_TONES[i % 3]}`}>
              <h3 className="text-xl font-semibold">{v.name}</h3>
              <p className="mt-2 text-muted-foreground">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gold-soft" labelledBy="where-heading">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div aria-hidden className="grid size-20 place-items-center rounded-full bg-white text-purple">
            <MapPin className="size-10" />
          </div>
          <div>
            <h2 id="where-heading" className="text-3xl font-bold">
              Where we work
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
              We currently work across {SITE.region}, with documented activities in Lagos and Kwara. We have a long-term view toward reaching
              more children in more places.
            </p>
          </div>
        </div>
      </Section>

      <StatsBand title="Our impact so far" />

      <Section id="team" labelledBy="team-heading">
        <SectionHeading
          id="team-heading"
          eyebrow="Our team"
          title="The people behind every outreach"
          intro={`Meet the directors who lead ${SITE.name}.`}
        />
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
          {TEAM.map((m) => (
            <li key={m.name}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-canvas-warm">
                <MediaImage
                  image={m.photo}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
                  className="object-cover"
                  style={{ objectPosition: m.focus, transform: m.zoom ? `scale(${m.zoom})` : undefined, transformOrigin: m.focus }}
                />
                <span aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 -60px 60px -40px rgba(22,33,46,.25)" }} />
              </div>
              <p className="mt-3 font-heading text-[1.05rem] font-semibold leading-snug text-ink">{m.name}</p>
              <p className="mt-0.5 text-sm text-purple">{m.role}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="registration-heading">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[20px] border border-line bg-white p-8">
            <h2 id="registration-heading" className="sr-only">
              Contact and registration
            </h2>
            <p className="font-sans text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-purple">Get in touch</p>
            <a href={`mailto:${SITE.contact.email}`} className="mt-3 block break-all font-heading text-lg font-semibold text-blue-deep underline underline-offset-4 sm:text-xl">
              {SITE.contact.email}
            </a>
            <a href={`tel:${SITE.contact.phoneIntl}`} className="mt-1 block font-heading text-lg font-semibold text-blue-deep underline underline-offset-4 sm:text-xl">
              {SITE.contact.phone}
            </a>
          </div>
          <div id="registration" className="rounded-[20px] border border-line bg-white p-8">
            <div className="flex items-center gap-3">
              <Shield className="size-7 text-blue" />
              <h2 className="text-2xl font-bold">Registration information</h2>
            </div>
            {isTodo(SITE.registration.rcNumber) ? (
              <p className="mt-3 text-muted-foreground">Our Corporate Affairs Commission (CAC) registration details will be published here.</p>
            ) : (
              <dl className="mt-3">
                <dt className="text-muted-foreground">Registered name</dt>
                <dd className="font-heading text-xl font-semibold">{SITE.legalName}</dd>
                <dt className="mt-3 text-muted-foreground">CAC registration number</dt>
                <dd className="font-heading text-xl font-semibold">RC {SITE.registration.rcNumber}</dd>
              </dl>
            )}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Help a child believe in their dreams"
        text="Volunteer your time, give a gift or partner with us on our next outreach."
        actions={[
          { href: "/get-involved", label: "Get involved", trackLabel: "about_get_involved" },
          { href: "/get-involved/donate", label: "Donate" },
        ]}
      />
    </>
  );
}

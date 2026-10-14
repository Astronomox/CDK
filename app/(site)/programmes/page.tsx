import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { OUTREACH_PHOTOS } from "@/lib/content/seed";
import { getProgrammes } from "@/lib/content";
import { PageHeader, Section } from "@/components/ui/primitives";
import { ProgrammeCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Programmes",
  description: "School outreaches, volunteer training and skill acquisition: how Cheer The Kids helps children build joy and self-belief.",
  path: "/programmes",
});

export default async function ProgrammesPage() {
  const programmes = await getProgrammes();
  return (
    <>
      <PageHeader
        image={OUTREACH_PHOTOS["2026-44"]}
        eyebrow="Programmes"
        title="Programmes that build joy and self-belief"
        intro="Everything we do is designed to help children rediscover joy, believe in themselves and dream big."
        crumbs={[{ label: "Programmes" }]}
      />
      <Section>
        <h2 className="sr-only">All programmes</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p) => (
            <ProgrammeCard key={p.slug} programme={p} />
          ))}
        </div>
      </Section>
      <CtaBand
        title="Invite Cheer The Kids to Your School"
        text="Bring conversation, games, music and encouragement to your pupils."
        actions={[
          { href: "/programmes/school-outreaches#invite", label: "Invite us", trackLabel: "programmes_invite_school" },
          { href: "/get-involved/volunteer", label: "Volunteer with us" },
        ]}
        tone="navy"
      />
    </>
  );
}

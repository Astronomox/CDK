import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHeader, Section } from "@/components/ui/primitives";
import { Shield } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Safeguarding",
  description: `How ${SITE.name} keeps children safe: consent for photos and stories, volunteer screening and training, and how to raise a concern.`,
  path: "/safeguarding",
});

const COMMITMENTS = [
  {
    title: "Consent before publishing",
    text: "We never publish an identifiable photo, video or story of a child without consent from a parent or guardian. Every item is reviewed before it goes online.",
  },
  {
    title: "Careful use of names",
    text: "We do not publish children's full names, and we never pair a child's name with their school or where they live.",
  },
  {
    title: "Dignity in every story",
    text: "We show children as active, capable and joyful. We do not use images that present children through pity or helplessness.",
  },
  {
    title: "Screened and trained volunteers",
    text: "Every volunteer completes a screening test and training before working with children.",
  },
  {
    title: "Minimal personal information",
    text: "We collect only the information we need and restrict who can see it.",
  },
  {
    title: "Removal on request",
    text: "A parent, guardian or young person can ask us to remove a photo, video or story at any time, and we will do so promptly.",
  },
];

export default function SafeguardingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Safeguarding"
        title="Keeping children safe is at the heart of our work"
        intro="Because we work with children, safeguarding is part of everything we do, online and in person."
        crumbs={[{ label: "Safeguarding" }]}
      />
      <Section labelledBy="commitments-heading">
        <h2 id="commitments-heading" className="text-3xl font-bold">
          Our commitments
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COMMITMENTS.map((c) => (
            <li key={c.title} className="rounded-[20px] border border-line p-6">
              <Shield className="size-7 text-blue" />
              <h3 className="mt-3 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-muted-foreground">{c.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="soft" labelledBy="concern-heading">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 sm:p-10">
          <h2 id="concern-heading" className="text-3xl font-bold">
            Raising a concern
          </h2>
          <div className="prose-ctk mt-4 text-lg">
            <p>
              If you are worried about the safety or wellbeing of a child connected with our work, or about the behaviour of anyone
              representing {SITE.name}, please tell us. We take every concern seriously.
            </p>
            <p>
              Email{" "}
              <a href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent("Safeguarding concern")}`}>{SITE.contact.email}</a> with the
              subject &ldquo;Safeguarding concern&rdquo;. You can also use this address to ask us to remove a photo, video or story.
            </p>
            <p>
              <strong>If a child is in immediate danger, call the Nigerian emergency number 112 straight away.</strong>
            </p>
            <p>
              See also our <Link href="/privacy">privacy notice</Link>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

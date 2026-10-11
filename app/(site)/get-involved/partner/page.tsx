import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow, PageHeader, Section } from "@/components/ui/primitives";
import { PartnerForm } from "@/components/forms/Forms";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { Book, Gift, Handshake, Sparkle } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Partner with us",
  description: "Sponsor an outreach, donate relief items or bring your organisation's skills to Cheer d’Kids programmes in Southwest Nigeria.",
  path: "/get-involved/partner",
});

const WAYS = [
  { title: "Sponsor an outreach", text: "Help us bring a full outreach day to a school or community.", Icon: Handshake },
  { title: "Provide relief items", text: "Bags, shoes, books and other approved items for children.", Icon: Gift },
  { title: "Share skills", text: "Support volunteer training or our skill acquisition programme.", Icon: Book },
  { title: "Amplify our work", text: "Media, publicity and storytelling partnerships.", Icon: Sparkle },
];

export default function PartnerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partner With Us"
        title="Let's brighten more smiles together"
        intro="We work with sponsors, organisations, schools and communities to expand our impact. Here is how we can work together."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Partner With Us" }]}
      />
      <Section labelledBy="ways-heading">
        <h2 id="ways-heading" className="text-3xl font-bold">
          Ways to partner
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WAYS.map(({ title, text, Icon }, i) => (
            <li key={title} className="rounded-[20px] border border-line p-6">
              <span aria-hidden className={`grid size-12 place-items-center rounded-full ${["bg-purple text-white", "bg-gold text-ink", "bg-blue text-white", "bg-canvas-warm text-purple"][i]}`}>
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-1 text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <ArrowLink href="/partners">See our sponsors and partners</ArrowLink>
        </p>
      </Section>
      <Section tone="soft" id="enquiry" labelledBy="enquiry-heading">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow tone="blue">Partnership enquiry</Eyebrow>
            <h2 id="enquiry-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
              Start a conversation
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">Tell us a little about your organisation and idea. We will follow up to explore it together.</p>
          </div>
          <div className="rounded-[28px] bg-white p-6 sm:p-8">
            <PartnerForm />
          </div>
        </div>
      </Section>
    </>
  );
}

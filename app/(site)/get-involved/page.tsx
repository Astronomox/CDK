import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader, Section } from "@/components/ui/primitives";
import { ActionCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gift, Handshake, Heart, Users } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Get involved",
  description: "Volunteer, donate money or items, or partner with Cheer d’Kids to help children rediscover joy and self-belief.",
  path: "/get-involved",
});

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title="There is a place for you here"
        intro="Whether you give an afternoon, a gift or your organisation's support, you help a child believe in their dreams."
        crumbs={[{ label: "Get Involved" }]}
      />
      <Section>
        <h2 className="sr-only">Ways to get involved</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <ActionCard
            icon={<Users className="size-7" />}
            title="Volunteer"
            text="For tertiary students, graduates and professionals. Join outreaches, our social media team, photography, videography, design, content or events."
            href="/get-involved/volunteer"
            cta="Apply to volunteer"
            tone="blue"
          />
          <ActionCard
            icon={<Heart className="size-7" />}
            title="Donate"
            text="Give online with Paystack or by bank transfer. Local and international donations are welcome."
            href="/get-involved/donate"
            cta="Support our mission"
            tone="purple"
          />
          <ActionCard
            icon={<Gift className="size-7" />}
            title="Donate items"
            text="We welcome bags, shoes, books and confectioneries for children at our outreaches."
            href="/get-involved/donate-items"
            cta="Donate items"
            tone="gold"
          />
          <ActionCard
            icon={<Handshake className="size-7" />}
            title="Partner with us"
            text="Sponsor an outreach, provide relief items, or bring your organisation's skills to our programmes."
            href="/get-involved/partner"
            cta="Start a conversation"
            tone="purple"
          />
        </div>
      </Section>
      <CtaBand
        title="Invite Cheer d’Kids to Your School"
        text="Are you a teacher or school leader? We would love to visit."
        actions={[{ href: "/programmes/school-outreaches#invite", label: "Invite us", trackLabel: "get_involved_invite_school" }]}
        tone="navy"
      />
    </>
  );
}

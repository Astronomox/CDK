import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHeader, Section } from "@/components/ui/primitives";

export const metadata: Metadata = pageMetadata({
  title: "Privacy notice",
  description: `How ${SITE.name} collects, uses and protects personal information shared through this website.`,
  path: "/privacy",
});

const LAST_UPDATED = "10 October 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy notice"
        intro="We collect as little personal information as we can, use it only to respond to you, and protect it carefully."
        crumbs={[{ label: "Privacy" }]}
      />
      <Section>
        <div className="prose-ctk mx-auto max-w-3xl text-lg">
          <p className="text-base text-muted-foreground">Last updated: {LAST_UPDATED}</p>

          <h2>Who we are</h2>
          <p>
            {SITE.name} is a non-governmental organisation working with children in {SITE.region}. You can contact us about privacy at{" "}
            <a href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent("Privacy request")}`}>{SITE.contact.email}</a>.
          </p>

          <h2>What we collect and why</h2>
          <p>We only collect information you choose to send us through our forms:</p>
          <ul>
            <li>
              <strong>Volunteer applications:</strong> your name, email, phone number, location, age range, academic level, why you want to
              volunteer, your preferred volunteer area and relevant skills. We use this to review your application, send the screening test
              and organise training.
            </li>
            <li>
              <strong>School outreach enquiries:</strong> school name and location, contact person, phone, email, school type, estimated number
              of students, preferred dates and any extra information. We use this to plan an outreach with you.
            </li>
            <li>
              <strong>Partnership enquiries:</strong> your name, organisation, email, optional phone number and message, so we can reply.
            </li>
            <li>
              <strong>Item donation enquiries:</strong> your name, email, phone, the items you would like to give and a preferred delivery
              date, so we can arrange delivery.
            </li>
          </ul>
          <p>We do not ask for more than we need, and we never sell or rent your information.</p>

          <h2>Donations</h2>
          <p>
            Online donations are processed by Paystack. Your card or bank details go directly to Paystack and never reach our website or
            our team. Paystack shares a payment reference and the email you provide so we can confirm your gift.
          </p>

          <h2>How we store and protect your information</h2>
          <ul>
            <li>Form submissions are stored in a secure database that is not publicly accessible.</li>
            <li>Only authorised members of our team can view submissions.</li>
            <li>When a form is submitted, the details are also emailed to our official inbox so we can respond.</li>
            <li>This website uses an encrypted (HTTPS) connection.</li>
            <li>We keep information only as long as we need it for the purpose you shared it for, then delete it.</li>
          </ul>

          <h2>Analytics</h2>
          <p>
            We may use Google Analytics to understand how people use this website, for example how many people visit or apply to volunteer.
            This uses cookies and collects anonymised usage information. It does not tell us who you are.
          </p>

          <h2>Children</h2>
          <p>
            This website is not designed to collect personal information from children. We do not publish identifiable photos, videos or
            stories of children without consent from a parent or guardian. Read our{" "}
            <Link href="/safeguarding">safeguarding commitments</Link>.
          </p>

          <h2>Your rights</h2>
          <p>
            Under the Nigeria Data Protection Act 2023 you can ask to see the information we hold about you, correct it, or ask us to delete
            it. You can also withdraw consent at any time. Email{" "}
            <a href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent("Privacy request")}`}>{SITE.contact.email}</a> and we will
            respond as quickly as we can.
          </p>

          <h2>Changes to this notice</h2>
          <p>We will update this page if the way we handle information changes. The date at the top shows the latest version.</p>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE, isTodo } from "@/lib/site";
import { Eyebrow, PageHeader, Section } from "@/components/ui/primitives";
import { SchoolOutreachForm } from "@/components/forms/Forms";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { Gift, Instagram, Mail, MapPin } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Cheer d’Kids by email or social media, or invite us to bring an outreach to your school.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We would love to hear from you"
        intro="Questions, ideas, invitations or donations: get in touch and a member of our team will reply."
        crumbs={[{ label: "Contact" }]}
      />

      <Section labelledBy="general-heading">
        <h2 id="general-heading" className="sr-only">
          General enquiries
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[20px] bg-canvas-warm p-6 sm:p-8">
            <Mail className="size-8 text-purple" />
            <h3 className="mt-4 text-xl font-semibold">Email</h3>
            <p className="mt-1 text-muted-foreground">For general enquiries.</p>
            <a href={`mailto:${SITE.contact.email}`} className="mt-3 block break-all font-heading font-semibold text-blue-deep underline underline-offset-4">
              {SITE.contact.email}
            </a>
          </div>
          <div className="rounded-[20px] bg-canvas-tint p-6 sm:p-8">
            <Instagram className="size-8 text-blue" />
            <h3 className="mt-4 text-xl font-semibold">Social media</h3>
            <p className="mt-1 text-muted-foreground">Message us or follow our work.</p>
            <div className="mt-4">
              <SocialLinks withLabels />
            </div>
          </div>
          <div className="rounded-[20px] bg-canvas-warm p-6 sm:p-8">
            <MapPin className="size-8 text-purple" />
            <h3 className="mt-4 text-xl font-semibold">Address</h3>
            {isTodo(SITE.contact.officeAddress) ? (
              <p className="mt-1 text-muted-foreground">We work across {SITE.region}. Our correspondence address will be listed here.</p>
            ) : (
              <address className="mt-1 not-italic">{SITE.contact.officeAddress}</address>
            )}
            <div className="mt-4 flex items-start gap-2">
              <Gift className="mt-1 size-5 shrink-0 text-purple" />
              <p>
                <span className="font-semibold">Item donations: </span>
                {SITE.donationAddress.lines.join(", ")}
              </p>
            </div>
            <ArrowLink href="/get-involved/donate-items" className="mt-3">
              Arrange a drop-off
            </ArrowLink>
          </div>
        </div>
        {!isTodo(SITE.contact.phone) ? (
          <p className="mt-6 text-lg">
            Prefer to call?{" "}
            <a href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`} className="font-semibold text-blue-deep underline">
              {SITE.contact.phone}
            </a>
          </p>
        ) : null}
      </Section>

      <Section tone="soft" id="school-outreach" labelledBy="school-heading">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow tone="blue">School outreach</Eyebrow>
            <h2 id="school-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
              Invite Cheer d’Kids to Your School
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our school outreaches bring conversations on purpose and self-belief, games, music and creative activities to your pupils. Tell
              us about your school and we will be in touch.
            </p>
            <ArrowLink href="/programmes/school-outreaches" className="mt-5">
              What happens at an outreach
            </ArrowLink>
          </div>
          <div className="rounded-[28px] bg-white p-6 sm:p-8">
            <SchoolOutreachForm />
          </div>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getPartners } from "@/lib/content";
import { EmptyState, PageHeader, Section } from "@/components/ui/primitives";
import { PartnerTile } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Sponsors and partners",
  description: "The sponsors and partners who make Cheer d’Kids outreaches and relief items possible.",
  path: "/partners",
});

export default async function PartnersPage() {
  const partners = await getPartners();
  const sponsors = partners.filter((p) => p.kind === "sponsor");
  const others = partners.filter((p) => p.kind === "partner");

  return (
    <>
      <PageHeader
        eyebrow="Sponsors and partners"
        title="Made possible together"
        intro="Our sponsors and partners make outreaches, relief items and programmes possible. We only display partner logos with their permission."
        crumbs={[{ label: "Partners" }]}
      />
      {partners.length ? (
        <>
          {sponsors.length ? (
            <Section labelledBy="sponsors-heading">
              <h2 id="sponsors-heading" className="text-3xl font-bold">
                Sponsors
              </h2>
              <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {sponsors.map((p) => (
                  <PartnerTile key={p.id} partner={p} />
                ))}
              </ul>
            </Section>
          ) : null}
          {others.length ? (
            <Section tone={sponsors.length ? "soft" : "white"} labelledBy="partners-list-heading">
              <h2 id="partners-list-heading" className="text-3xl font-bold">
                Partners
              </h2>
              <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {others.map((p) => (
                  <PartnerTile key={p.id} partner={p} />
                ))}
              </ul>
            </Section>
          ) : null}
        </>
      ) : (
        <Section>
          <h2 className="sr-only">Our sponsors and partners</h2>
          <EmptyState title="Partner profiles are coming soon" action={{ href: "/get-involved/partner", label: "Become a partner" }}>
            We are confirming our sponsor and partner list and logo permissions. They will appear here once approved.
          </EmptyState>
        </Section>
      )}
      <CtaBand
        title="Partner With Us"
        text="Sponsor an outreach, provide relief items or share your organisation's skills."
        actions={[{ href: "/get-involved/partner", label: "Partner With Us", trackLabel: "partners_page_cta" }]}
      />
    </>
  );
}

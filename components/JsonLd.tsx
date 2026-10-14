import { SITE, absoluteUrl, isTodo } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped cannot break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationJsonLd(): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE.name,
    alternateName: "Cheer The Kids",
    url: SITE.url,
    logo: absoluteUrl("/brand/logo-transparent.png"),
    description: SITE.description,
    slogan: SITE.tagline,
    email: SITE.contact.email,
    areaServed: [
      { "@type": "State", name: "Lagos", containedInPlace: { "@type": "Country", name: "Nigeria" } },
      { "@type": "State", name: "Kwara", containedInPlace: { "@type": "Country", name: "Nigeria" } },
    ],
    sameAs: [SITE.socials.instagram, SITE.socials.linkedin],
  };
  data.legalName = SITE.legalName;
  if (!isTodo(SITE.contact.phone)) data.telephone = SITE.contact.phoneIntl;
  if (!isTodo(SITE.registration.rcNumber)) data.identifier = { "@type": "PropertyValue", name: "RC number", value: SITE.registration.rcNumber };
  return data;
}

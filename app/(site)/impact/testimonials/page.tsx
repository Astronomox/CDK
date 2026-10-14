import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTestimonials } from "@/lib/content";
import { EmptyState, PageHeader, Section } from "@/components/ui/primitives";
import { TestimonialCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Testimonials",
  description: "What children, parents, teachers, volunteers and sponsors say about Cheer The Kids.",
  path: "/impact/testimonials",
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <PageHeader
        eyebrow="Our Impact"
        title="Testimonials"
        intro="Words from children, parents and guardians, teachers, school administrators, volunteers and sponsors, shared with their consent."
        crumbs={[{ label: "Our Impact", href: "/impact" }, { label: "Testimonials" }]}
      />
      <Section>
        <h2 className="sr-only">All testimonials</h2>
        {testimonials.length ? (
          <ul className="grid gap-10 md:grid-cols-2">
            {testimonials.map((t) => (
              <li key={t.id}>
                <TestimonialCard testimonial={t} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Testimonials are on their way" action={{ href: "/stories", label: "Read our stories" }}>
            We are gathering testimonials with the right consent in place and will share them here soon.
          </EmptyState>
        )}
      </Section>
      <CtaBand
        title="Were you part of an outreach?"
        text="Teachers, volunteers and sponsors: we would love to hear about your experience."
        actions={[{ href: "/contact", label: "Share your experience" }]}
        tone="navy"
      />
    </>
  );
}

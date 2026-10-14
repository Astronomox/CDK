import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { OUTREACH_PHOTOS } from "@/lib/content/seed";
import { SITE } from "@/lib/site";
import { Eyebrow, PageHeader, Section } from "@/components/ui/primitives";
import { Steps } from "@/components/sections/Steps";
import { ItemDonationForm } from "@/components/forms/Forms";
import { MapPin } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Donate items",
  description: "Donate bags, shoes, books and confectioneries to Cheer The Kids. Send an enquiry to confirm items and arrange drop-off in Lagos.",
  path: "/get-involved/donate-items",
});

const STEPS = [
  { title: "Send an enquiry", text: "Tell us what you would like to give." },
  { title: "We confirm", text: "We check what is needed and agree a delivery time." },
  { title: "Drop off", text: "Bring the items to our donation address." },
  { title: "Children receive", text: "Items are distributed at our outreaches." },
];

export default function DonateItemsPage() {
  return (
    <>
      <PageHeader
        image={OUTREACH_PHOTOS["2025-9"]}
        eyebrow="Donate items"
        title="Give items that make a child's day"
        intro="Bags, shoes and books help children show up to school ready to learn. Confectioneries make outreach days a celebration."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Donate Items" }]}
      />

      <Section labelledBy="needed-heading">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="needed-heading" className="text-3xl font-bold">
              Items we currently need
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {SITE.requestedItems.map((item, i) => (
                <li
                  key={item}
                  className={`rounded-[20px] p-6 font-heading text-xl font-semibold ${["bg-canvas-warm", "bg-canvas-warm", "bg-canvas-tint", "bg-canvas-warm"][i % 4]}`}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-muted-foreground">Please give items in good, usable condition.</p>
          </div>
          <div className="rounded-[28px] bg-navy p-8 text-white">
            <MapPin className="size-8 text-gold" />
            <h2 className="mt-3 text-2xl font-bold text-white">Dropping off in {SITE.donationDropOff.area}</h2>
            <p className="mt-3 text-lg leading-relaxed text-white">{SITE.donationDropOff.note}</p>
            <p className="mt-5 text-white">Send an enquiry below and we will reply with the address and a time when we can be there to receive you.</p>
          </div>
        </div>
      </Section>

      <Section tone="soft" labelledBy="how-heading">
        <h2 id="how-heading" className="text-3xl font-bold">
          How it works
        </h2>
        <Steps steps={STEPS} />
      </Section>

      <Section id="enquiry" labelledBy="enquiry-heading">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow>Item donation enquiry</Eyebrow>
            <h2 id="enquiry-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
              Tell us what you would like to give
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">We will get back to you to confirm the items and a delivery time.</p>
          </div>
          <div className="rounded-[28px] border border-line bg-white p-6 sm:p-8">
            <ItemDonationForm />
          </div>
        </div>
      </Section>
    </>
  );
}

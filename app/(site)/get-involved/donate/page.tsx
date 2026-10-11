import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { SITE, isTodo } from "@/lib/site";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Card, PageHeader, Section } from "@/components/ui/primitives";
import { BankTransfer } from "@/components/donate/BankTransfer";
import { PaystackDonate } from "@/components/donate/PaystackDonate";
import { StatsBand } from "@/components/sections/StatsBand";
import { Gift, Heart, Mail, MapPin, Shield } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Donate",
  description: "Support Cheer d’Kids with a gift by Paystack or bank transfer, or donate bags, shoes, books and confectioneries. Local and international donations welcome.",
  path: "/get-involved/donate",
});

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate"
        title="Support Our Mission"
        intro="Your gift helps us run outreaches, provide relief items and keep children's spark alive. Local and international donations are welcome."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Donate" }]}
      />

      <Section id="give">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Card>
            <div className="flex items-center gap-3">
              <span aria-hidden className="grid size-12 place-items-center rounded-full bg-purple text-white">
                <Heart className="size-6" />
              </span>
              <h2 className="text-2xl font-bold">Give online</h2>
            </div>
            <p className="mt-3 text-muted-foreground">Pay securely by card, bank or USSD with Paystack.</p>
            <div className="mt-6">
              <Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-muted" />}>
                <PaystackDonate />
              </Suspense>
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-3">
                <span aria-hidden className="grid size-12 place-items-center rounded-full bg-blue text-white">
                  <Shield className="size-6" />
                </span>
                <h2 className="text-2xl font-bold">Bank transfer</h2>
              </div>
              <p className="mt-3 text-muted-foreground">Transfer directly to our Nigerian bank account.</p>
              <div className="mt-6">
                <BankTransfer />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                After transferring, email{" "}
                <a href={`mailto:${SITE.contact.email}`} className="font-semibold text-blue-deep underline underline-offset-2">
                  {SITE.contact.email}
                </a>{" "}
                so we can thank you and confirm receipt.
              </p>
            </Card>

            <Card>
              <h2 className="text-xl font-bold">Giving from outside Nigeria?</h2>
              {isTodo(SITE.payments.cleva) ? (
                <p className="mt-2 text-muted-foreground">
                  International donations are welcome. Card payments through Paystack may work from abroad. For other options, email us and
                  we will help you give.
                </p>
              ) : (
                <p className="mt-2 text-muted-foreground">{SITE.payments.cleva}</p>
              )}
              <a
                href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent("International donation")}`}
                className="mt-4 inline-flex items-center gap-2 font-heading font-semibold text-blue-deep underline underline-offset-4"
              >
                <Mail className="size-4" /> Email us
              </a>
            </Card>
          </div>
        </div>
      </Section>

      <Section tone="gold-soft" labelledBy="items-heading">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span aria-hidden className="grid size-14 place-items-center rounded-full bg-gold text-ink">
              <Gift className="size-7" />
            </span>
            <h2 id="items-heading" className="mt-4 text-3xl font-bold">
              Donate items
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">We currently welcome:</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SITE.requestedItems.map((item) => (
                <li key={item} className="rounded-full bg-white px-4 py-2 font-heading font-semibold">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <ButtonLink href="/get-involved/donate-items" variant="primary" trackLabel="donate_page_items" arrow>
                Arrange an item donation
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[28px] bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-6 shrink-0 text-purple" />
              <div>
                <h3 className="text-xl font-semibold">Drop-off address</h3>
                <address className="mt-2 not-italic text-lg leading-relaxed">
                  {SITE.donationAddress.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-4 text-muted-foreground">
                  Please send us a quick enquiry first so we can confirm the items and arrange delivery before you travel.
                </p>
                <ArrowLink href="/get-involved/donate-items" className="mt-3">
                  Send a donation enquiry
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <StatsBand title="What your support has helped make possible" />
    </>
  );
}

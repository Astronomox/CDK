"use client";

import { useState } from "react";
import { SITE, hasBankDetails } from "@/lib/site";
import { track } from "@/lib/analytics";
import { Check, Copy, Mail } from "@/components/icons";

export function BankTransfer() {
  const [copied, setCopied] = useState(false);
  const { bankName, accountName, accountNumber } = SITE.payments.bank;

  if (!hasBankDetails()) {
    return (
      <div className="rounded-2xl bg-canvas-warm p-5">
        <p className="font-semibold text-ink">Our bank details are being finalised.</p>
        <p className="mt-1 text-muted-foreground">
          Email us and we will send the official account details straight to you.
        </p>
        <a
          href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent("Bank transfer donation")}`}
          className="mt-3 inline-flex items-center gap-2 font-heading font-semibold text-blue-deep underline underline-offset-4"
        >
          <Mail className="size-4" /> {SITE.contact.email}
        </a>
      </div>
    );
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      track("bank_details_copied");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard can be blocked; the number is still visible to copy by hand.
    }
  }

  return (
    <dl className="divide-y divide-line rounded-2xl border border-line">
      <div className="flex justify-between gap-4 p-4">
        <dt className="text-muted-foreground">Bank</dt>
        <dd className="text-right font-semibold">{bankName}</dd>
      </div>
      <div className="flex justify-between gap-4 p-4">
        <dt className="text-muted-foreground">Account name</dt>
        <dd className="text-right font-semibold">{accountName}</dd>
      </div>
      <div className="flex items-center justify-between gap-4 p-4">
        <dt className="text-muted-foreground">Account number</dt>
        <dd className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold tracking-wider">{accountNumber}</span>
          <button
            type="button"
            onClick={copy}
            className="grid size-10 place-items-center rounded-full bg-canvas-tint text-blue-deep hover:bg-blue hover:text-white"
          >
            {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
            <span className="sr-only">{copied ? "Copied" : "Copy account number"}</span>
          </button>
        </dd>
      </div>
      <p aria-live="polite" className="sr-only">
        {copied ? "Account number copied" : ""}
      </p>
    </dl>
  );
}

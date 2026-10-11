"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SITE, hasPaystack } from "@/lib/site";
import { track } from "@/lib/analytics";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { fieldBase } from "@/components/ui/input";

type PaystackTransaction = { reference: string };
type PaystackPopInstance = {
  newTransaction: (options: {
    key: string;
    email: string;
    amount: number;
    currency: string;
    metadata?: Record<string, unknown>;
    onSuccess: (t: PaystackTransaction) => void;
    onCancel: () => void;
  }) => void;
};

declare global {
  interface Window {
    PaystackPop?: new () => PaystackPopInstance;
  }
}

const SCRIPT_SRC = "https://js.paystack.co/v2/inline.js";

/** Loads the Paystack script only when someone actually clicks donate. */
function loadPaystack(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("Paystack failed to load")));
    if (!existing) {
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export function PaystackDonate() {
  const { suggestedAmounts, minimumAmount, publicKey, currency } = SITE.payments.paystack;
  const params = useSearchParams();
  const requested = Number(params.get("amount"));
  const preset = (suggestedAmounts as readonly number[]).includes(requested);
  const [amount, setAmount] = useState<number>(preset ? requested : suggestedAmounts[1]);
  const [custom, setCustom] = useState(!preset && requested >= minimumAmount ? String(requested) : "");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (!hasPaystack()) {
    return (
      <div className="rounded-2xl bg-canvas-warm p-5">
        <p className="font-semibold text-ink">Online card donations are opening soon.</p>
        <p className="mt-1 text-muted-foreground">In the meantime, please give by bank transfer or email us to arrange your gift.</p>
        <button type="button" disabled className={cn(buttonVariants({ size: "lg" }), "mt-4 w-full cursor-not-allowed bg-muted text-muted-foreground shadow-none")}>
          Donate with Paystack (coming soon)
        </button>
      </div>
    );
  }

  const chosen = custom ? Number(custom.replace(/[^\d]/g, "")) : amount;

  async function donate(e: React.FormEvent) {
    e.preventDefault();
    if (!chosen || chosen < minimumAmount) {
      setStatus("error");
      setMessage(`Please enter at least ${naira(minimumAmount)}.`);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address for your receipt.");
      return;
    }
    setStatus("loading");
    setMessage("");
    track("donate_start", { method: "paystack", value: chosen, currency });
    try {
      await loadPaystack();
      const popup = new window.PaystackPop!();
      popup.newTransaction({
        key: publicKey,
        email,
        amount: chosen * 100, // kobo
        currency,
        metadata: { source: "website_donate_page" },
        onSuccess: async ({ reference }) => {
          track("donate_complete", { method: "paystack", value: chosen, currency });
          setStatus("success");
          setMessage(`Thank you! Your gift of ${naira(chosen)} was received. Reference: ${reference}.`);
          // Server-side confirmation (logs only; the thank-you does not depend on it).
          fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`).catch(() => {});
        },
        onCancel: () => setStatus("idle"),
      });
    } catch {
      setStatus("error");
      setMessage("We could not open the payment window. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-canvas-tint p-6 text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-gold text-ink">
          <Check className="size-7" />
        </div>
        <p className="mt-4 font-heading text-lg font-semibold">{message}</p>
        <p className="mt-2 text-muted-foreground">Paystack will email your receipt.</p>
      </div>
    );
  }

  return (
    <form onSubmit={donate} noValidate className="space-y-5">
      <fieldset>
        <legend className="mb-2 font-heading font-semibold">Choose an amount</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {suggestedAmounts.map((a) => (
            <label
              key={a}
              className="flex min-h-12 cursor-pointer items-center justify-center rounded-2xl bg-muted font-heading font-semibold transition hover:bg-secondary has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-purple"
            >
              <input
                type="radio"
                name="amount"
                value={a}
                checked={!custom && amount === a}
                onChange={() => {
                  setAmount(a);
                  setCustom("");
                }}
                className="sr-only"
              />
              {naira(a)}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="custom-amount" className="mb-1.5 block font-heading font-semibold">
          Or enter another amount (NGN)
        </label>
        <input
          id="custom-amount"
          inputMode="numeric"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder={`Minimum ${naira(minimumAmount)}`}
          className={fieldBase + " h-12"}
        />
      </div>
      <div>
        <label htmlFor="donor-email" className="mb-1.5 block font-heading font-semibold">
          Email for your receipt
        </label>
        <input
          id="donor-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldBase + " h-12"}
        />
        <p className="mt-1.5 text-sm text-muted-foreground">Sent to Paystack only, to email your receipt.</p>
      </div>
      {status === "error" ? (
        <p role="alert" className="font-semibold text-danger">
          {message}
        </p>
      ) : null}
      <button type="submit" disabled={status === "loading"} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
        {status === "loading" ? "Opening secure payment..." : `Donate ${chosen ? naira(chosen) : ""} with Paystack`}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground"><Lock className="size-3.5" /> Secure card, bank and USSD payments by Paystack.</p>
    </form>
  );
}

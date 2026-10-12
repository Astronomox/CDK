"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

/** Amount chips that hand the chosen amount to the donate page. */
export function HomeDonate() {
  const amounts = SITE.payments.paystack.suggestedAmounts;
  const [amount, setAmount] = useState<number>(amounts[1]);
  return (
    <>
      <div className="path-extra">
        <div className="amounts" role="group" aria-label="Choose an amount">
          {amounts.map((a) => (
            <button key={a} className="amount" type="button" aria-pressed={amount === a} onClick={() => setAmount(a)}>
              {naira(a)}
            </button>
          ))}
        </div>
        <p className="amount-note">Prefer a bank transfer? Our account details are on the Donate page.</p>
      </div>
      <div className="path-actions">
        <Link
          className="btn btn--primary"
          href={`/get-involved/donate?amount=${amount}#give`}
          onClick={() => track("cta_click", { label: "home_donate", value: amount })}
        >
          Donate {naira(amount)}
        </Link>
      </div>
    </>
  );
}

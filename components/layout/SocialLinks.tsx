"use client";

import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { Instagram, LinkedIn } from "@/components/icons";

const LINKS = [
  { label: "Instagram", href: SITE.socials.instagram, Icon: Instagram },
  { label: "LinkedIn", href: SITE.socials.linkedin, Icon: LinkedIn },
];

export function SocialLinks({ tone = "dark", withLabels = false }: { tone?: "dark" | "light"; withLabels?: boolean }) {
  const colors =
    tone === "light"
      ? "bg-white/10 text-white hover:bg-gold hover:text-ink"
      : "bg-blue-soft text-blue-deep hover:bg-blue hover:text-white";
  return (
    <ul className="flex flex-wrap gap-3">
      {LINKS.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("social_click", { network: label })}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full transition-colors ${colors} ${withLabels ? "px-4 py-2 font-heading font-semibold" : "size-11 justify-center"}`}
          >
            <Icon className="size-5" />
            {withLabels ? <span>{label}</span> : <span className="sr-only">{SITE.name} on {label} (opens in a new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

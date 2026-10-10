"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type ButtonVariant = "primary" | "blue" | "gold" | "outline" | "light" | "outline-light" | "secondary" | "ghost";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "default" | "sm" | "lg";
  arrow?: boolean;
  className?: string;
  /** Sends a cta_click analytics event with this label. */
  trackLabel?: string;
  external?: boolean;
};

/** Link styled as a shadcn Button, with optional analytics and arrow. */
export function ButtonLink({ href, children, variant = "primary", size = "default", arrow, className, trackLabel, external }: Props) {
  const onClick = trackLabel ? () => track("cta_click", { label: trackLabel, href }) : undefined;
  const content = (
    <>
      {children}
      {arrow ? (
        external ? (
          <ArrowUpRight className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        ) : (
          <ArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />
        )
      ) : null}
    </>
  );
  return (
    <Button asChild variant={variant === "primary" ? "default" : variant} size={size} className={cn("group/btn", className)}>
      {external ? (
        <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={href} onClick={onClick}>
          {content}
        </Link>
      )}
    </Button>
  );
}

/** Text link with arrow, for "Read more" style actions. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-1.5 font-heading font-semibold text-blue-deep underline-offset-4 hover:underline", className)}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import type { Img } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { MediaImage } from "@/components/ui/MediaImage";

/** Small uppercase label above headings ("WHY WE EXIST"). */
export function Eyebrow({ children, tone = "purple" }: { children: React.ReactNode; tone?: "purple" | "blue" | "light" }) {
  const color = tone === "light" ? "text-[#D5E3F0]" : tone === "blue" ? "text-blue" : "text-purple";
  return <p className={cn("mb-3 font-sans text-[0.8125rem] font-bold uppercase tracking-[0.12em]", color)}>{children}</p>;
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h2" | "h1";
  id?: string;
  tone?: "default" | "light";
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", as: Tag = "h2", id, tone = "default", className }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow tone={tone === "light" ? "light" : "purple"}>{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={cn("text-[clamp(1.75rem,1.4rem+1.5vw,2.75rem)] font-semibold leading-[1.15]", tone === "light" && "text-white")}>
        {title}
      </Tag>
      {intro ? <div className={cn("mt-4 text-lg", tone === "light" ? "text-[#D5E3F0]" : "text-muted-foreground")}>{intro}</div> : null}
    </div>
  );
}

const SECTION_TONES = {
  white: "bg-white",
  soft: "bg-canvas-tint",
  muted: "bg-canvas-warm",
  "purple-soft": "bg-canvas-warm",
  "gold-soft": "bg-canvas-warm",
  navy: "bg-blue-ink text-white",
} as const;

export function Section({
  children,
  className,
  tone = "white",
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: keyof typeof SECTION_TONES;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-16 lg:py-24", SECTION_TONES[tone], className)}>
      <div className="container-page relative">{children}</div>
    </section>
  );
}

export type Crumb = { label: string; href?: string };

export function PageHeader({
  title,
  intro,
  eyebrow,
  crumbs = [],
  image,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  eyebrow?: string;
  crumbs?: Crumb[];
  /** Optional image on the right on large screens. */
  image?: Img;
  children?: React.ReactNode;
}) {
  return (
    <header className="bg-canvas-warm pb-14 pt-8 sm:pb-20 sm:pt-10">
      <div className={cn("container-page", image && "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]")}>
        <div>
          {crumbs.length ? (
            <nav aria-label="Breadcrumb" className="mb-8 text-sm">
              <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
                <li>
                  <Link href="/" className="rounded-md hover:text-ink hover:underline">
                    Home
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-1">
                    <ChevronRight aria-hidden className="size-3.5 opacity-60" />
                    {c.href ? (
                      <Link href={c.href} className="rounded-md hover:text-ink hover:underline">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="font-semibold text-ink">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <div className="max-w-3xl">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="text-[clamp(2.375rem,1.7rem+2.8vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.02em]">{title}</h1>
            {intro ? <div className="mt-5 max-w-2xl text-[clamp(1.125rem,1.05rem+0.35vw,1.3125rem)] text-muted-foreground">{intro}</div> : null}
            {children ? <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div> : null}
          </div>
        </div>
        {image ? (
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[28px] lg:block">
            <MediaImage image={image} fill priority sizes="(min-width: 1024px) 40vw, 0px" className="object-cover" />
          </div>
        ) : null}
      </div>
    </header>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-[20px] border border-border bg-white p-6 sm:p-8", className)}>{children}</div>;
}

export function IconBubble({ children, className }: { children: React.ReactNode; tone?: string; className?: string }) {
  return (
    <div aria-hidden className={cn("grid size-12 shrink-0 place-items-center rounded-full bg-canvas-tint text-blue [&_svg]:size-6", className)}>
      {children}
    </div>
  );
}

export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children?: React.ReactNode;
  action?: { href: string; label: string; external?: boolean };
}) {
  const linkClass = "mt-6 inline-flex min-h-11 items-center gap-2 font-heading font-semibold text-blue hover:underline";
  return (
    <div className="rounded-[20px] border border-border bg-canvas-warm p-10 text-center sm:p-14">
      <h3 className="text-2xl font-semibold">{title}</h3>
      {children ? <div className="mx-auto mt-3 max-w-xl text-muted-foreground">{children}</div> : null}
      {action ? (
        action.external ? (
          <a href={action.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {action.label} <ArrowUpRight className="size-4" />
          </a>
        ) : (
          <Link href={action.href} className={linkClass}>
            {action.label} <ArrowRight className="size-4" />
          </Link>
        )
      ) : null}
    </div>
  );
}

export function CheckList({ items, className }: { items: string[]; tone?: string; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-canvas-tint text-blue">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Kept for compatibility; the calm design no longer uses decorative circles. */
export function Circles() {
  return null;
}

export function formatDate(date?: string): string | undefined {
  if (!date) return undefined;
  const d = new Date(`${date.slice(0, 10)}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
}

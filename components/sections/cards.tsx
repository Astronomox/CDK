import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, Quote } from "lucide-react";
import { MediaImage } from "@/components/ui/MediaImage";
import { formatDate } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import {
  STORY_CATEGORY_LABELS,
  TESTIMONIAL_ROLE_LABELS,
  type Partner,
  type Programme,
  type Project,
  type Story,
  type Testimonial,
} from "@/lib/content/types";
import { HeartLine } from "@/components/HeartLine";

/** One card style for the whole site: white, 1px warm border, 20px radius, photo on top. */
const cardShell =
  "lift group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-white focus-within:ring-[3px] focus-within:ring-blue/40";

/** Makes the whole card clickable while keeping a single link in the accessibility tree. */
function StretchedLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="outline-none after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[5px]">
      {children}
    </Link>
  );
}

function CardMedia({ image, ratio = "aspect-[4/3]", sizes, children }: { image: Programme["image"]; ratio?: string; sizes: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden bg-line", ratio)}>
      <MediaImage image={image} fill sizes={sizes} className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
      {children}
    </div>
  );
}

function MoreLink({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden className="mt-auto inline-flex min-h-11 items-center gap-2 pt-1.5 font-heading font-semibold text-blue">
      {children} <ArrowRight className="size-[18px] transition-transform duration-200 group-hover:translate-x-1" />
    </span>
  );
}

export function ProgrammeCard({ programme }: { programme: Programme; index?: number }) {
  return (
    <article className={cardShell}>
      <CardMedia image={programme.image} sizes="(min-width: 1024px) 33vw, (min-width: 700px) 50vw, 100vw">
        {programme.status === "in-development" ? (
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.08em] text-black">
            In development
          </span>
        ) : null}
      </CardMedia>
      <div className="flex flex-1 flex-col gap-2.5 p-6 md:p-7">
        <h3 className="text-[1.375rem] font-semibold">
          <StretchedLink href={`/programmes/${programme.slug}`}>{programme.title}</StretchedLink>
        </h3>
        <p className="text-base text-muted-foreground">{programme.summary}</p>
        <MoreLink>Learn more</MoreLink>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project; featured?: boolean }) {
  const date = project.dateLabel ?? formatDate(project.date);
  return (
    <article className={cardShell}>
      <CardMedia image={project.coverImage} ratio="aspect-[3/2]" sizes="(min-width: 768px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col gap-2.5 p-6 md:p-7">
        <p className="inline-flex items-center gap-2 font-sans text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-blue">
          <span aria-hidden className="size-2 rounded-full bg-blue" />
          {project.location}
        </p>
        <h3 className="text-[1.375rem] font-semibold">
          <StretchedLink href={`/impact/projects/${project.slug}`}>{project.title}</StretchedLink>
        </h3>
        {date ? (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="size-4" /> {date}
          </p>
        ) : null}
        <p className="line-clamp-3 text-base text-muted-foreground">{project.context}</p>
        {project.childrenReached ? (
          <p className="font-heading font-semibold text-ink">{project.reachedLabel ?? `${project.childrenReached.toLocaleString("en-NG")} children reached`}</p>
        ) : null}
        <MoreLink>Read the story</MoreLink>
      </div>
    </article>
  );
}

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className={cardShell}>
      {story.coverImage ? <CardMedia image={story.coverImage} ratio="aspect-[3/2]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" /> : null}
      <div className="flex flex-1 flex-col gap-2.5 p-6 md:p-7">
        <p className="text-sm text-muted-foreground">
          <span className="font-sans text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-purple">{STORY_CATEGORY_LABELS[story.category]}</span>
          <span aria-hidden className="mx-2">
            &middot;
          </span>
          <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
        </p>
        <h3 className="text-xl font-semibold">
          <StretchedLink href={`/stories/${story.slug}`}>{story.title}</StretchedLink>
        </h3>
        <p className="text-base text-muted-foreground">{story.excerpt}</p>
        <MoreLink>Read more</MoreLink>
      </div>
    </article>
  );
}

/** A "way to get involved" card: same card shell, tinted icon circle, one action. */
export function ActionCard({
  icon,
  title,
  text,
  href,
  cta,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
  cta: string;
  tone?: string;
  className?: string;
}) {
  return (
    <article className={cn(cardShell, "p-7 md:p-8", className)}>
      <span aria-hidden className="mb-3 grid size-[52px] place-items-center rounded-full bg-canvas-tint text-blue [&_svg]:size-[26px]">
        {icon}
      </span>
      <h3 className="text-[1.375rem] font-semibold">
        <StretchedLink href={href}>{title}</StretchedLink>
      </h3>
      <p className="mt-2.5 flex-1 text-base text-muted-foreground">{text}</p>
      <MoreLink>{cta}</MoreLink>
    </article>
  );
}

export function TestimonialCard({ testimonial, large = false }: { testimonial: Testimonial; large?: boolean }) {
  return (
    <figure className={cn("h-full rounded-[20px] border border-border bg-white p-7 sm:p-9", large && "sm:p-12")}>
      <Quote aria-hidden className="size-9 fill-purple text-purple" />
      <blockquote className={cn("mt-4 text-ink", large ? "font-heading text-2xl font-medium leading-snug sm:text-3xl" : "text-lg")}>
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5 text-sm">
        <HeartLine className="w-14 shrink-0 text-purple" />
        <span>
          <span className="font-heading font-semibold text-ink">{testimonial.attribution}</span>
          {testimonial.attribution.toLowerCase().includes(TESTIMONIAL_ROLE_LABELS[testimonial.role].toLowerCase()) ? null : (
            <span className="sr-only">, {TESTIMONIAL_ROLE_LABELS[testimonial.role]}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

export function PartnerTile({ partner }: { partner: Partner }) {
  const inner = (
    <>
      {partner.logo ? (
        <div className="relative aspect-square w-full overflow-hidden rounded-[14px] border border-border">
          <MediaImage image={partner.logo} fill sizes="(min-width: 1024px) 220px, 45vw" className="object-contain" />
        </div>
      ) : null}
      <p className={partner.logo ? "mt-3 font-heading text-sm font-semibold text-ink sm:text-base" : "font-heading text-lg font-semibold text-ink"}>
        {partner.name}
      </p>
      {partner.description ? <p className="mt-2 text-sm text-muted-foreground">{partner.description}</p> : null}
    </>
  );
  return (
    <li className="lift flex flex-col items-center rounded-[20px] border border-border bg-white p-3 text-center sm:p-4">
      {partner.website ? (
        <a href={partner.website} target="_blank" rel="noopener noreferrer" className="w-full">
          {inner}
          <span className="sr-only"> (opens {partner.name} website)</span>
          <ArrowUpRight aria-hidden className="mx-auto mt-2 size-4 text-muted-foreground" />
        </a>
      ) : (
        inner
      )}
    </li>
  );
}

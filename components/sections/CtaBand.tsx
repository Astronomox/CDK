import { ButtonLink, type ButtonVariant } from "@/components/ui/ButtonLink";

type Action = { href: string; label: string; variant?: ButtonVariant; trackLabel?: string };

/** Closing call to action: a calm warm panel, primary button plus an outline one. */
export function CtaBand({ title, text, actions }: { title: string; text?: string; actions: Action[]; tone?: string }) {
  return (
    <section className="py-12 lg:py-16">
      <div className="container-page">
        <div className="flex flex-col gap-8 rounded-[28px] bg-canvas-warm px-7 py-10 sm:px-12 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] font-semibold leading-[1.15]">{title}</h2>
            {text ? <p className="mt-3 text-lg text-muted-foreground">{text}</p> : null}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            {actions.map((a, i) => (
              <ButtonLink
                key={a.href}
                href={a.href}
                size="lg"
                variant={a.variant ?? (i === 0 ? "primary" : "outline")}
                trackLabel={a.trackLabel}
                external={/^https?:/.test(a.href)}
              >
                {a.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

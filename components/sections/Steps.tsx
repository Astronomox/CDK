import { cn } from "@/lib/utils";

type Step = { title: string; text: string };

/** Numbered journey in the shared card style. */
export function Steps({ steps, className }: { steps: Step[]; className?: string }) {
  const cols = steps.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <ol className={cn("mt-10 grid gap-4 sm:grid-cols-2", cols, className)}>
      {steps.map((step, i) => (
        <li key={step.title} className="rounded-[20px] border border-border bg-white p-6 sm:p-7">
          <span aria-hidden className="grid size-9 place-items-center rounded-full bg-canvas-tint font-heading text-sm font-semibold text-blue-deep">
            {i + 1}
          </span>
          <h3 className="mt-4 text-lg font-semibold">
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-1.5 text-muted-foreground">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

import { cn } from "@/lib/utils";

type Step = { title: string; text: string };

/** Numbered journey: a compact timeline on phones, the shared card style from 640px. */
export function Steps({ steps, className }: { steps: Step[]; className?: string }) {
  const cols = steps.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <ol className={cn("mt-8 grid sm:grid-cols-2 sm:gap-4", cols, className)}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="lift relative flex gap-4 pb-5 last:pb-0 sm:block sm:rounded-[20px] sm:border sm:border-border sm:bg-white sm:p-7"
        >
          {i < steps.length - 1 ? <span aria-hidden className="absolute bottom-0 left-[17px] top-10 w-0.5 rounded bg-line sm:hidden" /> : null}
          <span
            aria-hidden
            className="relative grid size-9 shrink-0 place-items-center rounded-full bg-purple font-heading text-sm font-semibold text-white sm:bg-canvas-tint sm:text-blue-deep"
          >
            {i + 1}
          </span>
          <div className="pt-1.5 sm:pt-0">
            <h3 className="text-lg font-semibold sm:mt-4">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-0.5 text-muted-foreground sm:mt-1.5">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

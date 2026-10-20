import { cn } from "@/lib/utils";

/**
 * A single line that loops into a heart and carries on: our signature in front of
 * every testimonial name. It draws itself when it scrolls into view (Motion.tsx),
 * or on mount with `auto` (used where the testimonial itself changes).
 */
export function HeartLine({ className, auto = false }: { className?: string; auto?: boolean }) {
  return (
    <svg viewBox="0 0 100 40" aria-hidden focusable="false" className={cn("heart-line", auto && "heart-line--auto", className)}>
      <path
        pathLength={1}
        d="M2 31 C16 31 30 32 42 29 C36 24 33 17 34.5 11.5 C36 5.5 45 4.5 50 12 C55 4.5 64 5.5 65.5 11.5 C67 18 60 25.5 50.5 31.5 C46.5 34 45.5 38.5 49.5 38.5 C53.5 38.5 54 34 51 31.5 C58 29.5 76 30 98 28.5"
      />
    </svg>
  );
}

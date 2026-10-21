"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MediaImage } from "@/components/ui/MediaImage";
import type { TeamMember } from "@/lib/team";

const INTERVAL_MS = 4500;

const REDUCED = "(prefers-reduced-motion: reduce)";
const prefersReducedMotion = () => window.matchMedia(REDUCED).matches;
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * The leadership team, one director at a time: photos crossfade in place (no sideways
 * scrolling). Advances on its own, pauses on hover, focus, when off screen or with the
 * pause button, and never auto-advances for people who prefer reduced motion.
 */
export function TeamSlideshow({ members }: { members: TeamMember[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const still = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => true);
  const root = useRef<HTMLDivElement>(null);
  const count = members.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = !still && !paused && !held && visible && count > 1;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [running, index, count]);

  if (!count) return null;
  const go = (next: number) => setIndex((next + count) % count);
  const current = members[index];

  return (
    <div
      ref={root}
      className="team-show"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our team"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="ts-stage">
        {members.map((m, i) => (
          <figure
            key={m.name}
            className="ts-slide"
            data-active={i === index || undefined}
            aria-hidden={i !== index}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
          >
            <div className="ts-photo">
              <MediaImage
                image={m.photo}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 420px, 88vw"
                style={{ objectPosition: m.focus, transform: m.zoom ? `scale(${m.zoom})` : undefined, transformOrigin: m.focus }}
              />
            </div>
            <figcaption>
              <b>{m.name}</b>
              <span>{m.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="sr-only" aria-live={running ? "off" : "polite"}>
        {current.name}, {current.role}
      </p>

      {count > 1 ? (
        <div className="ts-controls">
          <button type="button" className="ts-arrow" onClick={() => go(index - 1)} aria-label="Previous team member">
            <ChevronLeft aria-hidden />
          </button>
          <div className="ts-dots" role="group" aria-label="Choose a team member">
            {members.map((m, i) => (
              <button
                key={m.name}
                type="button"
                className="ts-dot"
                aria-label={m.name}
                aria-current={i === index || undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button type="button" className="ts-arrow" onClick={() => go(index + 1)} aria-label="Next team member">
            <ChevronRight aria-hidden />
          </button>
          {!still ? (
            <button type="button" className="ts-pause" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
              {paused ? "Play" : "Pause"}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

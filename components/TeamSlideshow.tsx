"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { MediaImage } from "@/components/ui/MediaImage";
import type { TeamMember } from "@/lib/team";

const INTERVAL_MS = 6750;
/** How long the outgoing slide takes to dissolve (matches .ts-slide[data-state="out"] in app/home.css). */
const OUT_MS = 1050;

const REDUCED = "(prefers-reduced-motion: reduce)";
const prefersReducedMotion = () => window.matchMedia(REDUCED).matches;
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * The leadership team, one director at a time, changing in place (no sideways scrolling):
 * the current slide dissolves upward like smoke and the next drifts in from a blur. Advances on its own, pauses on hover, focus, when off screen or with the
 * pause button, and never auto-advances for people who prefer reduced motion.
 */
export function TeamSlideshow({ members }: { members: TeamMember[] }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
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
    const t = window.setTimeout(() => {
      setLeaving(index);
      setIndex((index + 1) % count);
    }, INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [running, index, count]);

  useEffect(() => {
    if (leaving === null) return;
    const t = window.setTimeout(() => setLeaving(null), OUT_MS);
    return () => window.clearTimeout(t);
  }, [leaving]);

  if (!count) return null;
  const go = (next: number) => {
    const target = (next + count) % count;
    if (target === index) return;
    setLeaving(index);
    setIndex(target);
  };
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
            data-state={i === index ? "in" : i === leaving ? "out" : "idle"}
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
            <button
              type="button"
              className="ts-arrow ts-pause"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            >
              {paused ? <Play aria-hidden /> : <Pause aria-hidden />}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { HeartLine } from "@/components/HeartLine";

type Voice = { id: string; quote: string; attribution: string };

const REDUCED = "(prefers-reduced-motion: reduce)";
const prefersReducedMotion = () => window.matchMedia(REDUCED).matches;
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** How long the outgoing quote takes to dissolve (matches .vr-item[data-state="out"] in app/home.css). */
const OUT_MS = 600;

/**
 * One testimonial at a time, no scrolling: the current one dissolves like smoke and the
 * next drifts in word by word. The progress bar on the current dot is the timer: when its
 * animation ends we move on, so pausing the bar pauses everything. Every quote sits in the
 * same grid cell, so the box keeps the height of the longest one and nothing below jumps.
 * Pauses on hover, focus, when off screen, or with the pause button; never rotates for
 * people who prefer reduced motion.
 */
export function VoiceRotator({ voices }: { voices: Voice[] }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const still = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (leaving === null) return;
    const t = window.setTimeout(() => setLeaving(null), OUT_MS);
    return () => window.clearTimeout(t);
  }, [leaving]);

  if (!voices.length) return null;

  const running = !still && !paused && !held && visible && voices.length > 1;
  const go = (next: number) => {
    if (next === index) return;
    setLeaving(index);
    setIndex(next);
  };

  return (
    <div
      ref={root}
      className="voice-rotator"
      data-running={running || undefined}
      data-still={still || undefined}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="vr-stage">
        {voices.map((v, i) => {
          const state = i === index ? "in" : i === leaving ? "out" : "idle";
          const text = `“${v.quote}”`;
          return (
            <figure key={v.id} className="vr-item" data-state={state} aria-hidden={state !== "in"}>
              <blockquote>
                <p>
                  {state === "in"
                    ? text.split(" ").map((w, n) => (
                        <Fragment key={n}>
                          <span className="vr-word" style={{ "--i": n } as React.CSSProperties}>
                            {w}
                          </span>{" "}
                        </Fragment>
                      ))
                    : text}
                </p>
              </blockquote>
              <figcaption>
                <HeartLine auto key={state === "in" ? `h${index}` : "rest"} />
                <span>{v.attribution}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {voices.length > 1 ? (
        <div className="vr-controls">
          <div className="vr-dots" role="group" aria-label="Choose a testimonial">
            {voices.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className="vr-dot"
                aria-label={`Testimonial ${i + 1} of ${voices.length}`}
                aria-current={i === index || undefined}
                onClick={() => go(i)}
              >
                {i === index && !still ? (
                  <span key={index} className="vr-fill" onAnimationEnd={() => go((index + 1) % voices.length)} />
                ) : null}
              </button>
            ))}
          </div>
          {!still ? (
            <button type="button" className="vr-pause" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
              {paused ? "Play" : "Pause"}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

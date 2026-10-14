"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure like "2,000+" up from 0 when it scrolls into view.
 * The real value is always in the page for search engines and screen readers.
 */
export function CountUp({ value, duration = 1100 }: { value: string; duration?: number }) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || Number.isNaN(target) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, prefix, , suffix] = match;
    const format = (n: number) => `${prefix}${n.toLocaleString("en-NG")}${suffix}`;
    setShown(format(0));
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(format(Math.round(target * eased)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once per value
  }, [value]);

  return (
    <span ref={ref}>
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

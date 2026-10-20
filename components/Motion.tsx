"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide motion, kept light for slow networks: no library, one observer.
 *
 * - Scroll reveal: blocks inside each section rise in as they enter the screen,
 *   with grid and list items staggered. Only blocks still below the screen are
 *   hidden, and the hidden state lives in a data attribute this script owns, so
 *   anything it misses (or a re-render replaces) simply stays visible.
 * - Header: `data-scrolled` on <html> once the page has scrolled, for the compact header.
 *
 * Nothing runs for people who prefer reduced motion.
 */

const BLOCKS = "main section :is(.container-page, .wrap) > *";
const STAGGER_MS = 80;
const MAX_STAGGER = 5;
const DONE_AFTER_MS = 1100;

function isRow(el: Element): boolean {
  const kids = el.children.length;
  if (kids < 2 || kids > 16) return false;
  const display = getComputedStyle(el).display;
  return display === "grid" || display === "flex" || el.tagName === "UL" || el.tagName === "OL";
}

/** Sideways scrollers (swipe rows on phones) reveal as one piece. */
function isScroller(el: Element): boolean {
  return el.scrollWidth > el.clientWidth + 4 && getComputedStyle(el).overflowX !== "visible";
}

function targetsFor(block: Element): Element[] {
  if (block.matches(".ribbon, [data-no-reveal]")) return [];
  if (isRow(block) && !isScroller(block)) {
    // A heading-plus-content wrapper: go one level deeper so its own grids stagger.
    const kids = Array.from(block.children);
    return kids.flatMap((kid) => (isRow(kid) && !isScroller(kid) && kid.children.length > 2 ? Array.from(kid.children) : [kid]));
  }
  return [block];
}

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const scrolled = window.scrollY > 16;
      if ((root.dataset.scrolled === "true") !== scrolled) root.dataset.scrolled = String(scrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const pending = new Set<HTMLElement>();
    const timers: number[] = [];

    const finish = (el: HTMLElement) => {
      el.removeAttribute("data-rv");
      el.style.removeProperty("--rv-d");
      pending.delete(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          el.dataset.rv = "in";
          const delay = parseInt(el.style.getPropertyValue("--rv-d") || "0", 10);
          timers.push(window.setTimeout(() => finish(el), DONE_AFTER_MS + delay));
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const frame = requestAnimationFrame(() => {
      const fold = window.innerHeight;
      document.querySelectorAll(BLOCKS).forEach((block) => {
        const targets = targetsFor(block);
        targets.forEach((el, i) => {
          if (!(el instanceof HTMLElement) || el.dataset.rv !== undefined) return;
          const box = el.getBoundingClientRect();
          if (box.top < fold || box.height < 4) return; // on screen already, or a screen-reader-only label
          const siblingIndex = targets.length > 1 ? i % (MAX_STAGGER + 1) : 0;
          el.style.setProperty("--rv-d", `${siblingIndex * STAGGER_MS}ms`);
          el.dataset.rv = "";
          pending.add(el);
          io.observe(el);
        });
      });
    });

    // Heart lines draw themselves once they are well inside the screen.
    const hearts = Array.from(document.querySelectorAll<SVGElement>("main .heart-line:not(.heart-line--auto)"));
    const heartIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          heartIo.unobserve(entry.target);
          (entry.target as SVGElement).dataset.draw = "in";
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.6 },
    );
    hearts.forEach((h) => {
      h.dataset.draw = "";
      heartIo.observe(h);
    });

    const revealAll = () => {
      pending.forEach(finish);
      hearts.forEach((h) => h.removeAttribute("data-draw"));
    };
    window.addEventListener("beforeprint", revealAll);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      heartIo.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener("beforeprint", revealAll);
      revealAll();
    };
  }, [pathname]);

  return null;
}

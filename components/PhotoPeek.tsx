"use client";

import { useEffect, useRef, useState } from "react";

type Peek = { src: string; alt: string };

const HOLD_MS = 380;
/** next/image widths (Next defaults). The preview uses the smallest one that is sharp on this screen. */
const WIDTHS = [640, 750, 828, 1080, 1200, 1920];

function sharperUrl(url: string): string | null {
  if (!url.includes("/_next/image")) return null;
  const need = Math.min(window.innerWidth * (window.devicePixelRatio || 1), 1920);
  const w = WIDTHS.find((x) => x >= need) ?? 1920;
  return url.replace(/([?&]w=)\d+/, (_, k: string) => `${k}${w}`).replace(/([?&]q=)\d+/, (_, k: string) => `${k}90`);
}
const MOVE_TOLERANCE = 10;

/**
 * Press and hold any photo in the page content (touch screens) to see it
 * full screen at full sharpness. Releasing closes it. A normal tap or swipe
 * behaves as usual.
 */
export function PhotoPeek() {
  const [peek, setPeek] = useState<Peek | null>(null);
  const peekedRef = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let startX = 0;
    let startY = 0;

    const findImage = (target: EventTarget | null): HTMLImageElement | null => {
      if (!(target instanceof Element) || !target.closest("main")) return null;
      if (target instanceof HTMLImageElement) return target;
      const host = target.closest("a, figure, li, [data-peek]");
      return host?.querySelector("img") ?? null;
    };

    const cancelTimer = () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      const img = findImage(e.target);
      if (!img) return;
      startX = e.clientX;
      startY = e.clientY;
      peekedRef.current = false;
      cancelTimer();
      timer = setTimeout(() => {
        peekedRef.current = true;
        // Show the copy already on screen instantly, then swap in a sharper one sized to this phone.
        const shown = img.currentSrc || img.src;
        setPeek({ src: shown, alt: img.alt });
        const sharp = sharperUrl(shown);
        if (sharp && sharp !== shown) {
          const pre = new Image();
          pre.onload = () => setPeek((p) => (p && p.src === shown ? { ...p, src: sharp } : p));
          pre.src = sharp;
        }
        navigator.vibrate?.(8);
      }, HOLD_MS);
    };

    const onMove = (e: PointerEvent) => {
      if (timer && Math.hypot(e.clientX - startX, e.clientY - startY) > MOVE_TOLERANCE) cancelTimer();
    };

    const onUp = () => {
      cancelTimer();
      if (peekedRef.current) setPeek(null);
    };

    // A long press must not also follow the link or open the browser menu.
    const onClick = (e: MouseEvent) => {
      if (peekedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        peekedRef.current = false;
      }
    };
    const onContextMenu = (e: Event) => {
      if (timer || peekedRef.current) e.preventDefault();
    };

    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onUp);
    document.addEventListener("click", onClick, true);
    document.addEventListener("contextmenu", onContextMenu);
    return () => {
      cancelTimer();
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("contextmenu", onContextMenu);
    };
  }, []);

  if (!peek) return null;
  return (
    <div
      role="dialog"
      aria-label="Photo preview"
      onClick={() => setPeek(null)}
      className="fixed inset-0 z-[70] grid place-items-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in-0 duration-200"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- already an optimised next/image URL */}
      <img
        src={peek.src}
        alt={peek.alt}
        className="max-h-[78svh] w-auto max-w-full rounded-[20px] object-contain shadow-2xl animate-in zoom-in-95 duration-200"
      />
      <p className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-0 right-0 px-6 text-center text-sm text-white/80">
        {peek.alt}
      </p>
    </div>
  );
}

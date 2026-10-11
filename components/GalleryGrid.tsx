"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { GALLERY_CATEGORY_LABELS, type GalleryCategory, type GalleryItem } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { MediaImage } from "@/components/ui/MediaImage";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

/** Masonry gallery with a full-screen, high-quality lightbox. */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const categories = Array.from(new Set(items.map((i) => i.category)));
  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      {categories.length > 1 ? (
        <div role="group" aria-label="Filter photos by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {(["all", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className="h-11 shrink-0 rounded-full bg-muted px-5 font-heading text-sm font-semibold text-ink transition hover:bg-secondary aria-pressed:bg-ink aria-pressed:text-white"
            >
              {c === "all" ? `All photos (${items.length})` : GALLERY_CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      ) : null}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} photos
      </p>

      <ul className="mt-8 columns-2 gap-3 sm:gap-4 lg:columns-3 [&>li]:mb-3 sm:[&>li]:mb-4">
        {visible.map((item, i) => (
          <li key={item.id} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] bg-canvas-tint text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60"
            >
              <MediaImage
                image={item.image}
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="font-heading text-sm font-semibold">{item.caption ?? GALLERY_CATEGORY_LABELS[item.category]}</span>
                <Expand aria-hidden className="size-5 shrink-0" />
              </span>
              <span className="sr-only">Open photo: {item.caption ?? item.image.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox items={visible} index={openIndex} onIndexChange={setOpenIndex} />
    </div>
  );
}

function Lightbox({ items, index, onIndexChange }: { items: GalleryItem[]; index: number | null; onIndexChange: (i: number | null) => void }) {
  const open = index !== null && items[index] !== undefined;
  const item = open ? items[index] : undefined;
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const isSvg = item?.image.src.endsWith(".svg");

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogContent className="flex-col">
        {item ? (
          <>
            <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-6">
              <p className="font-heading text-sm font-semibold tabular-nums text-white/80">
                {index! + 1} / {items.length}
              </p>
              <DialogClose className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold">
                <X className="size-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            <div
              className="relative flex-1"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
            >
              <Image
                key={item.id}
                src={item.image.src}
                alt={item.image.alt}
                fill
                quality={90}
                sizes="100vw"
                unoptimized={isSvg}
                className="object-contain px-2 animate-in fade-in-0 duration-300 sm:px-20"
                {...(item.image.lqip ? { placeholder: "blur" as const, blurDataURL: item.image.lqip } : {})}
              />
              {items.length > 1 ? (
                <>
                  <NavButton side="left" onClick={() => go(-1)} />
                  <NavButton side="right" onClick={() => go(1)} />
                </>
              ) : null}
            </div>

            <div className="px-4 pb-6 pt-4 text-center text-white sm:px-6">
              <DialogTitle className="text-lg text-white">{item.caption ?? GALLERY_CATEGORY_LABELS[item.category]}</DialogTitle>
              <DialogDescription className="mx-auto mt-1 max-w-2xl text-white/70">
                {item.projectTitle ? `${item.projectTitle}. ` : ""}
                {item.image.alt}
              </DialogDescription>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold",
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6",
      )}
    >
      <Icon className="size-6" />
      <span className="sr-only">{side === "left" ? "Previous photo" : "Next photo"}</span>
    </button>
  );
}

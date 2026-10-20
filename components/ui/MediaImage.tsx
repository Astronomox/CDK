import type React from "react";
import Image from "next/image";
import type { Img } from "@/lib/content/types";

type Props = {
  image: Img;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Fill the parent (parent must be positioned and sized). */
  fill?: boolean;
  quality?: number;
  style?: React.CSSProperties;
};

/**
 * All content images go through here so placeholders, blur previews and
 * responsive sizes are handled the same way everywhere. Sample (placeholder)
 * photos get a visible label so they are never mistaken for real outreach photos.
 * The parent element must be positioned for the label to sit on the image.
 * Photos default to quality 90 (AVIF/WebP) so they stay sharp on high-density phone screens.
 */
export function MediaImage({ image, sizes, className = "", priority, fill, quality = 90, style }: Props) {
  const isSvg = image.src.endsWith(".svg");
  const common = {
    src: image.src,
    alt: image.alt,
    sizes,
    priority,
    quality,
    className,
    style,
    unoptimized: isSvg,
    ...(image.lqip ? { placeholder: "blur" as const, blurDataURL: image.lqip } : {}),
  };
  const label =
    image.placeholder && !isSvg ? (
      <span className="pointer-events-none absolute bottom-3 left-3 z-[1] rounded-full bg-white/90 px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-ink shadow-sm">
        Sample photo
      </span>
    ) : null;
  return (
    <>
      {fill ? <Image {...common} alt={image.alt} fill /> : <Image {...common} alt={image.alt} width={image.width} height={image.height} />}
      {label}
    </>
  );
}

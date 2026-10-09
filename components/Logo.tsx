import Image from "next/image";
import { SITE } from "@/lib/site";

/**
 * The only place the logo is loaded. When the final SVG arrives, drop it in
 * public/brand/ and update SOURCES (and the aspect ratio if it changes).
 *
 * - "light": for white or light backgrounds. A transparent version generated
 *   from the supplied PNG (the original has a solid black background).
 * - "dark": the original supplied artwork, for black backgrounds.
 */
const SOURCES = {
  light: "/brand/logo-transparent.png",
  dark: "/brand/logo.png",
} as const;

const RATIO = 506 / 495; // height / width of the supplied artwork

type LogoProps = {
  variant?: keyof typeof SOURCES;
  /** Rendered width in pixels. */
  width?: number;
  priority?: boolean;
  className?: string;
};

export function Logo({ variant = "light", width = 64, priority = false, className }: LogoProps) {
  return (
    <Image
      src={SOURCES[variant]}
      alt={`${SITE.name} logo`}
      width={width}
      height={Math.round(width * RATIO)}
      priority={priority}
      className={className}
      sizes={`${width}px`}
    />
  );
}

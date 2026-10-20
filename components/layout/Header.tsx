import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SITE } from "@/lib/site";
import { SiteNav } from "./SiteNav";

export function Header() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-xl focus:bg-ink focus:px-4 focus:py-3 focus:font-heading focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <header className="site-header sticky top-0 z-40 border-b border-border bg-white">
        <div className="site-header-bar container-page flex min-h-20 items-center justify-between gap-6 md:min-h-[92px]">
          <Link href="/" className="flex shrink-0 items-center rounded-xl" aria-label={`${SITE.name}, home`}>
            <Logo width={64} priority className="site-logo h-14 w-auto md:h-16" />
          </Link>
          <SiteNav />
        </div>
      </header>
    </>
  );
}

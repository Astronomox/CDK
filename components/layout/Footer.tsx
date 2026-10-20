import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { FOOTER_LINKS } from "@/lib/nav";
import { SITE, isTodo } from "@/lib/site";
import { Instagram, LinkedIn } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black pb-8 pt-10 text-[0.9375rem] text-[#C9D1DB] md:pt-14">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.6fr] lg:gap-16">
          <div>
            <Link href="/" aria-label={`${SITE.name}, home`} className="inline-block rounded-xl">
              <Logo variant="dark" width={132} className="h-auto w-[96px] md:w-[132px]" />
            </Link>
            <p className="mt-[18px] max-w-[22ch] font-heading text-[1.0625rem] font-medium leading-[1.45] text-white">{SITE.tagline}</p>
            <a href={`mailto:${SITE.contact.email}`} className="mt-5 inline-flex min-h-11 items-center gap-2 break-all text-[#C9D1DB] hover:text-gold hover:underline">
              <Mail aria-hidden className="size-4 shrink-0" /> {SITE.contact.email}
            </a>
            {!isTodo(SITE.contact.phone) ? (
              <a href={`tel:${SITE.contact.phoneIntl}`} className="flex min-h-11 items-center gap-2 text-[#C9D1DB] hover:text-gold hover:underline">
                <Phone aria-hidden className="size-4 shrink-0" /> {SITE.contact.phone}
              </a>
            ) : null}
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-y-8">
            {FOOTER_LINKS.map((group) => (
              <div key={group.heading}>
                <h2 className="mb-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white">{group.heading}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex min-h-9 items-center text-[0.9rem] text-[#C9D1DB] hover:text-gold hover:underline md:min-h-10 md:text-[0.9375rem]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#2A2F36] pt-6 md:mt-12">
          <p>
            &copy; {year} {SITE.name}
            {!isTodo(SITE.registration.rcNumber) ? <>. Registered in Nigeria, RC {SITE.registration.rcNumber}.</> : null}
          </p>
          <div className="flex gap-2.5">
            <a
              href={SITE.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${SITE.name} on Instagram (opens in a new tab)`}
              className="grid size-11 place-items-center rounded-full border border-[#3A4048] text-white transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href={SITE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${SITE.name} on LinkedIn (opens in a new tab)`}
              className="grid size-11 place-items-center rounded-full border border-[#3A4048] text-white transition-colors hover:border-gold hover:text-gold"
            >
              <LinkedIn className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

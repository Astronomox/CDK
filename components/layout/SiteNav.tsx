"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { PRIMARY_NAV, type NavItem } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/Logo";

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return item.children?.some((c) => pathname === c.href || pathname.startsWith(`${c.href}/`)) ?? false;
}

export function SiteNav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavigationMenu className="hidden xl:flex" aria-label="Main">
        <NavigationMenuList>
          {PRIMARY_NAV.map((item) => {
            const active = isActive(pathname, item);
            if (!item.children) {
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild active={active}>
                    <Link href={item.href} className={cn(navigationMenuTriggerStyle, active && "text-purple")}>
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            }
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuTrigger data-active={active || undefined}>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[24rem]">
                    <ul className="grid content-start gap-1">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href={item.href} className="block rounded-2xl px-4 py-3 hover:bg-canvas-warm">
                            <span className="font-heading font-semibold text-ink">{item.label} overview</span>
                            <span className="mt-0.5 block text-sm text-muted-foreground">{item.description}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink asChild active={pathname === child.href}>
                            <Link href={child.href} className="block rounded-2xl px-4 py-3 hover:bg-canvas-warm data-[active=true]:bg-canvas-warm">
                              <span className="font-heading font-semibold text-ink">{child.label}</span>
                              {child.description ? <span className="mt-0.5 block text-sm text-muted-foreground">{child.description}</span> : null}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        <ButtonLink href="/get-involved/donate" size="sm" trackLabel="header_donate">
          Donate
        </ButtonLink>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="grid size-12 place-items-center rounded-full border border-border bg-white text-ink transition hover:border-ink/30 xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="gap-0 overflow-y-auto">
            <SheetHeader className="border-b border-border">
              <SheetTitle asChild>
                <Link href="/" onClick={() => setOpen(false)} className="w-fit">
                  <Logo width={52} />
                  <span className="sr-only">{SITE.name} home</span>
                </Link>
              </SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
            </SheetHeader>
            <nav aria-label="Main mobile" className="flex-1 px-3 py-3">
              <Accordion type="single" collapsible className="grid gap-1">
                {PRIMARY_NAV.map((item) =>
                  item.children ? (
                    <AccordionItem key={item.href} value={item.href} className="border-0 bg-transparent px-2 data-[state=open]:bg-muted">
                      <AccordionTrigger className={cn("py-3 text-lg", isActive(pathname, item) && "text-purple")}>{item.label}</AccordionTrigger>
                      <AccordionContent className="pb-3 pr-0">
                        <ul className="grid gap-0.5 border-l-2 border-gold pl-3">
                          {[{ label: `${item.label} overview`, href: item.href }, ...item.children].map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                aria-current={pathname === child.href ? "page" : undefined}
                                className="block rounded-xl px-3 py-2.5 text-base text-ink hover:bg-white aria-[current=page]:font-semibold aria-[current=page]:text-purple"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(pathname, item) ? "page" : undefined}
                      className="block rounded-3xl px-2 py-3 font-heading text-lg font-semibold text-ink hover:bg-muted aria-[current=page]:text-purple"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </Accordion>
            </nav>
            <div className="grid gap-2 border-t border-border p-5">
              <ButtonLink href="/get-involved/donate" trackLabel="mobile_menu_donate">
                Support Our Mission
              </ButtonLink>
              <ButtonLink href="/get-involved/volunteer" variant="outline" trackLabel="mobile_menu_volunteer">
                Volunteer With Us
              </ButtonLink>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CompanyData, HeaderData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { arrowClass, buttonStyles } from "@/components/ui/buttonStyles";

/** id of the landing page section a link points to ("#about" → "about") */
const sectionId = (url: string) => url.replace(/^#/, "");

/** Keeps track of the section in the middle of the screen, so its link is shown as the current one */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

/** true once the page has scrolled past the top, so the bar can lift off with a deeper shadow */
const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return scrolled;
};

/**
  A dark glass bar floating over the top of the page. It keeps its own height out of the page flow
  (negative margin), so the hero runs underneath it; the hero adds the same space at its top.
*/
export const Header = ({ data, company }: { data?: HeaderData; company: CompanyData }) => {
  const [ids] = useState(() => data?.navLinks.map((link) => sectionId(link.url)) ?? []);
  const active = useActiveSection(ids);
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  if (!data) return null;

  // the "Contact Us" button already leads to the contact section, so its link is left out of the desktop menu
  const menuLinks = data.navLinks.filter((link) => link.url !== data.buttonUrl);
  const phone = company.contactItems.find((item) => item.url.startsWith("tel:"));

  /** The logo scrolls back to the top and drops any "#section" from the address bar, without reloading the page */
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <div className="pointer-events-none sticky top-0 z-40 -mb-[5.25rem] h-[5.25rem] lg:-mb-[6rem] lg:h-[6rem]">
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 lg:px-8 lg:pt-4">
        <header
          className={`pointer-events-auto flex h-[4.25rem] items-center justify-between gap-4 rounded-full border border-[var(--color-white-10)] bg-[var(--color-dark-75)] pl-5 pr-2 backdrop-blur-xl transition-shadow duration-300 sm:pl-6 lg:h-[4.75rem] lg:pl-7 ${
            scrolled ? "shadow-[0_1rem_2.5rem_-1rem_var(--color-shadow-header)]" : ""
          }`}
        >
          <Link href={data.logoUrl} onClick={goHome} aria-label={data.homeLabel} className="shrink-0">
            <Image
              src={company.logoLight}
              alt={company.logoAlt}
              width={company.logoWidth}
              height={company.logoHeight}
              preload
              sizes="200px"
              className="h-8 w-auto sm:h-9 lg:h-10"
            />
          </Link>

          <nav aria-label={data.mainNavLabel} className="hidden items-center gap-1 lg:flex">
            {menuLinks.map((link) => {
              const current = sectionId(link.url) === active;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  aria-current={current ? "location" : undefined}
                  className={`relative whitespace-nowrap rounded-full px-4 py-2 font-heading text-[0.9375rem] font-semibold transition-colors ${
                    current ? "bg-[var(--color-white-10)] text-[var(--color-white)]" : "text-[var(--color-white-70)] hover:text-[var(--color-white)]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a href={data.buttonUrl} className={`${buttonStyles.primary} h-11 px-6 max-sm:hidden lg:h-[3.25rem]`}>
              {data.buttonText}
              <Icon name="LuArrowRight" className={arrowClass} strokeWidth={2.4} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? data.closeMenuLabel : data.openMenuLabel}
              className="grid size-12 place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-white)] transition-colors hover:bg-[var(--color-primary-dark)] lg:hidden"
            >
              <Icon name={open ? "LuX" : "LuMenu"} className="size-5" strokeWidth={2.2} />
            </button>
          </div>
        </header>

        {/* phones and tablets: a card that drops down under the bar, only as tall as its links (scrolls if they do not fit) */}
        <nav
          id="mobile-menu"
          aria-label={data.mobileNavLabel}
          inert={!open}
          className={`mt-2 grid max-h-[calc(100dvh-6.5rem)] overflow-hidden rounded-[1.75rem] border border-[var(--color-white-10)] bg-[var(--color-bg-deep)] shadow-[0_1.5rem_3rem_-1rem_var(--color-shadow-float)] transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
            open ? "pointer-events-auto grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-y-auto">
            <ul className="grid gap-1 p-3 sm:grid-cols-2">
              {data.navLinks.map((link) => {
                const current = sectionId(link.url) === active;
                return (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-heading font-semibold transition-colors ${
                        current
                          ? "bg-[var(--color-white-10)] text-[var(--color-white)]"
                          : "text-[var(--color-white-80)] hover:bg-[var(--color-white-6)] hover:text-[var(--color-white)]"
                      }`}
                    >
                      {link.label}
                      <Icon name="LuChevronRight" className="size-4 text-[var(--color-primary-light)]" strokeWidth={2.2} />
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="grid gap-2.5 border-t border-[var(--color-white-10)] p-4 sm:grid-cols-2">
              <a href={data.buttonUrl} onClick={() => setOpen(false)} className={`${buttonStyles.primary} w-full`}>
                {data.buttonText}
                <Icon name="LuArrowRight" className={arrowClass} strokeWidth={2.4} />
              </a>
              {phone && (
                <a href={phone.url} className={`${buttonStyles.ghost} w-full`}>
                  <Icon name={phone.icon} className="size-4" />
                  {phone.lines[0]}
                </a>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

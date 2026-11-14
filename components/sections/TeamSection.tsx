"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TeamData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

const control =
  "grid size-12 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-heading)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] disabled:pointer-events-none disabled:opacity-40";

/**
  The website's team block as a carousel: one row of portraits (four on desktop) with the name card overlapping the
  bottom of each photo. Arrows beside the heading step through it; on phones and tablets it can also be swiped.
*/
export const TeamSection = ({ data }: { data?: TeamData }) => {
  const row = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  /** greys out the arrow that can go no further */
  const update = useCallback(() => {
    const el = row.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  /** scrolls by one card (its width plus the gap) */
  const step = (direction: 1 | -1) => {
    const el = row.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  if (!data) return null;

  return (
    <section id={data.id} className="relative isolate scroll-mt-24 overflow-hidden bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div aria-hidden="true" className="absolute -left-40 top-0 -z-10 size-[28rem] rounded-full bg-[var(--color-primary-8)] blur-3xl" />
      <div aria-hidden="true" className="absolute -right-40 bottom-0 -z-10 size-[24rem] rounded-full bg-[var(--color-accent-15)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading label={data.label} titleTop={data.titleTop} titleAccent={data.titleAccent} description={data.description} className="max-w-2xl" />
          <div data-reveal className="flex shrink-0 gap-2.5">
            <button type="button" onClick={() => step(-1)} disabled={edges.start} aria-label={data.previousLabel} className={control}>
              <Icon name="LuChevronLeft" className="size-5" strokeWidth={2.2} />
            </button>
            <button type="button" onClick={() => step(1)} disabled={edges.end} aria-label={data.nextLabel} className={control}>
              <Icon name="LuChevronRight" className="size-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <ul
          ref={row}
          onScroll={update}
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:gap-5 sm:px-6 lg:mx-0 lg:mt-12 lg:scroll-px-0 lg:gap-6 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {data.members.map((member) => (
            <li
              key={member.id}
              className="group relative shrink-0 basis-[78%] snap-start sm:basis-[calc((100%-1.25rem)/2)] md:basis-[calc((100%-2.5rem)/3)] lg:basis-[calc((100%-4.5rem)/4)]"
            >
              <div className="relative aspect-[4/4.9] overflow-hidden rounded-[1.75rem] bg-[var(--color-bg-subtle)]">
                <Image
                  quality={90}
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 768px) 32vw, (min-width: 640px) 48vw, 78vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-deep-40)] to-transparent" />
              </div>

              {/* name card: under the photo on phones, over the bottom of the photo from tablets up; turns brand blue on hover */}
              <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-[var(--color-white-95)] p-4 shadow-[0_1rem_2rem_-1rem_var(--color-shadow-photo)] backdrop-blur transition-colors duration-300 group-hover:bg-[var(--color-primary)] sm:absolute sm:inset-x-3 sm:bottom-3 sm:mt-0">
                <div className="min-w-0">
                  <h3 className="font-heading text-lg font-bold text-[var(--color-heading)] transition-colors duration-300 group-hover:text-[var(--color-white)] sm:truncate">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-[var(--color-primary)] transition-colors duration-300 group-hover:text-[var(--color-white-80)] sm:truncate">{member.role}</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--color-bg-subtle)] text-[var(--color-primary)] transition-colors duration-300 group-hover:bg-[var(--color-white)]">
                  <Icon name="LuShieldCheck" className="size-5" strokeWidth={2} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

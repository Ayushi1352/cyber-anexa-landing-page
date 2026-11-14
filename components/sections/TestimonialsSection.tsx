"use client";

import Image from "next/image";
import { useState } from "react";
import type { TestimonialsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

const MAX_STARS = 5;

/** a row of stars; `rating` (rounded) of them are filled */
const Stars = ({ rating, className }: { rating: number; className: string }) => (
  <span className="flex gap-0.5" aria-hidden="true">
    {Array.from({ length: MAX_STARS }, (_, n) => (
      <Icon key={n} name="FaStar" className={`${className} ${n < Math.round(rating) ? "text-[var(--color-star)]" : "text-[var(--color-border)]"}`} />
    ))}
  </span>
);

/** fade between slides; all slides share one grid cell so the box is always as tall as the longest one (no jumping) */
const slide = (shown: boolean) =>
  `col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${shown ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`;

const control =
  "grid size-12 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-heading)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)]";

/**
  The website's testimonials: the client's photo with the overall rating on one side, their review on the other,
  and the client faces underneath to switch between reviews (arrows step through them too)
*/
export const TestimonialsSection = ({ data }: { data?: TestimonialsData }) => {
  const [active, setActive] = useState(0);
  if (!data || data.items.length === 0) return null;
  const count = data.items.length;
  const go = (index: number) => setActive((index + count) % count);

  return (
    <section id={data.id} className="relative isolate scroll-mt-24 overflow-hidden bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl gap-x-14 gap-y-10 px-4 sm:px-6 lg:grid-cols-[0.68fr_1.32fr] lg:grid-rows-[auto_1fr] lg:px-8">
        <SectionHeading label={data.label} titleTop={data.titleTop} titleAccent={data.titleAccent} className="lg:col-start-2 lg:row-start-1" />

        {/* client photo on a tilted brand card, with the rating tag; on desktop it is exactly as tall as the review column */}
        <div data-reveal className="relative mx-auto w-full max-w-[22rem] pb-5 pr-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-0 left-5 top-5 rounded-[2rem] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]" />
          <div className="relative grid aspect-[800/921] overflow-hidden rounded-[2rem] bg-[var(--color-bg-subtle)] lg:aspect-auto lg:h-full">
            {data.items.map((item, index) => (
              <div key={item.id} className={`relative ${slide(index === active)}`}>
                <Image quality={90} src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 360px, 90vw" className="object-cover object-top" />
              </div>
            ))}
          </div>
          <div className="absolute -left-3 bottom-10 rounded-2xl bg-[var(--color-bg-main)] p-4 shadow-[0_1.5rem_3rem_-1.25rem_var(--color-shadow-photo)] sm:-left-8 sm:p-5">
            <p className="flex items-baseline gap-1 font-heading text-3xl font-extrabold text-[var(--color-heading)] sm:text-4xl">
              {data.rating}
              <span className="text-base text-[var(--color-text-subtle)]">/5</span>
            </p>
            <p className="mt-1.5" role="img" aria-label={data.ratingLabel.replace("{rating}", String(data.rating))}>
              <Stars rating={data.rating} className="size-4" />
            </p>
            <p className="mt-1.5 text-xs font-medium text-[var(--color-text-muted)]">{data.ratingText}</p>
          </div>
        </div>

        <div data-reveal className="flex min-w-0 flex-col lg:col-start-2 lg:row-start-2">
          <div className="relative rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-6 sm:px-8 sm:pb-7 sm:pt-8">
            <span className="absolute -top-6 left-6 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-[var(--color-white)] shadow-[0_1rem_2rem_-0.75rem_var(--color-shadow-button)] sm:left-9">
              <Icon name="FaQuoteLeft" className="size-5" />
            </span>
            <div className="grid" aria-live="polite">
              {data.items.map((item, index) => (
                <figure key={item.id} aria-hidden={index !== active} className={slide(index === active)}>
                  <Stars rating={MAX_STARS} className="mt-3 size-4" />
                  <blockquote className="mt-3 font-heading text-base font-medium leading-relaxed text-[var(--color-heading)] sm:text-lg">“{item.quote}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--color-primary)] ring-offset-2">
                      <Image src={item.avatar} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading text-lg font-bold text-[var(--color-heading)]">{item.name}</span>
                      <span className="block text-sm text-[var(--color-primary)]">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* client faces to jump to a review, and arrows to step through them */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex -space-x-2">
              {data.items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(index)}
                  aria-label={data.showLabel.replace("{name}", item.name)}
                  aria-pressed={index === active}
                  className={`relative size-11 overflow-hidden rounded-full border-[0.1875rem] transition-[transform,border-color] duration-300 hover:z-10 hover:-translate-y-1 sm:size-12 ${
                    index === active ? "z-10 -translate-y-1 border-[var(--color-primary)]" : "border-[var(--color-bg-main)] grayscale-[60%]"
                  }`}
                >
                  <Image src={item.avatar} alt="" fill sizes="48px" className="object-cover" />
                </button>
              ))}
            </div>
            <div className="flex gap-2.5">
              <button type="button" onClick={() => go(active - 1)} aria-label={data.previousLabel} className={control}>
                <Icon name="LuChevronLeft" className="size-5" strokeWidth={2.2} />
              </button>
              <button type="button" onClick={() => go(active + 1)} aria-label={data.nextLabel} className={control}>
                <Icon name="LuChevronRight" className="size-5" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

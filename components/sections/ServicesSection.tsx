import Image from "next/image";
import type { ServicesData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
  The website's Services page: all nine services as photo cards with the details over a dark wash.
  A swipeable row on phones, then a 2- and 3-column grid; on hover the photo zooms and a blue glow rises.
*/
export const ServicesSection = ({ data }: { data?: ServicesData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className="relative isolate scroll-mt-24 overflow-hidden bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div aria-hidden="true" className="absolute -right-40 top-20 -z-10 size-[30rem] rounded-full bg-[var(--color-primary-8)] blur-3xl" />
      <div aria-hidden="true" className="absolute -left-40 bottom-0 -z-10 size-[26rem] rounded-full bg-[var(--color-accent-15)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* wider on desktop so the long title breaks into two lines instead of three */}
        <SectionHeading
          align="center"
          label={data.label}
          titleTop={data.titleTop}
          titleAccent={data.titleAccent}
          description={data.description}
          className="lg:max-w-[62rem]"
        />

        <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-14 lg:grid-cols-3 lg:gap-6 [&::-webkit-scrollbar]:hidden">
          {data.items.map((item, index) => (
            <li
              key={item.id}
              data-reveal
              data-reveal-delay={(index % 3) * 90}
              className="group relative isolate flex min-h-[26rem] shrink-0 basis-[82%] snap-start flex-col justify-between gap-8 overflow-hidden rounded-[1.75rem] p-5 shadow-[0_1.25rem_2.5rem_-1.75rem_var(--color-shadow-photo)] sm:p-6 lg:aspect-[5/5.6] lg:min-h-0"
            >
              <Image
                quality={90}
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 82vw"
                className="-z-20 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--color-deep-95)] via-[var(--color-deep-70)] to-[var(--color-deep-0)]" />
              {/* blue glow rising from the bottom on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-gradient-to-t from-[var(--color-primary-60)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              {/* thin border that lights up on hover */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-[var(--color-white-10)] transition-colors duration-500 group-hover:ring-[var(--color-primary-light)]" />

              <div className="flex items-start justify-between gap-4">
                <span className="grid size-14 place-items-center rounded-2xl border border-[var(--color-white-20)] bg-[var(--color-white-10)] text-[var(--color-white)] backdrop-blur-md transition-colors duration-500 group-hover:border-transparent group-hover:bg-[var(--color-primary)]">
                  <Icon name={item.icon} className="size-7" strokeWidth={1.7} />
                </span>
                <span className="font-heading text-sm font-bold tracking-[0.16em] text-[var(--color-white-70)]">{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold text-[var(--color-white)] sm:text-[1.375rem]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-white-80)]">{item.text}</p>
                {/* the whole card is clickable through the stretched link */}
                <a
                  href={data.linkUrl}
                  aria-label={`${data.linkText} — ${item.title}`}
                  className="mt-5 inline-flex items-center gap-2.5 font-heading text-sm font-semibold text-[var(--color-white)] transition-colors duration-300 after:absolute after:inset-0 group-hover:text-[var(--color-primary-light)]"
                >
                  {data.linkText}
                  <span className="grid size-8 place-items-center rounded-full bg-[var(--color-white)] text-[var(--color-primary)] transition-[background-color,color,transform] duration-300 group-hover:-rotate-45 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-white)]">
                    <Icon name="LuArrowRight" className="size-4" strokeWidth={2.4} />
                  </span>
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-2 flex items-center justify-center gap-2 text-xs text-[var(--color-text-subtle)] sm:hidden">
          {data.swipeHint}
          <Icon name="LuArrowRight" className="size-3.5" strokeWidth={2.2} />
        </p>
      </div>
    </section>
  );
};

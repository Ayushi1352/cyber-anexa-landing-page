import Image from "next/image";
import type { ProjectsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Desktop tile widths: a wide tile then a narrow one, swapped on the second row */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

/** The website's Projects page: four recent projects as photo tiles in a staggered (bento) grid */
export const ProjectsSection = ({ data }: { data?: ProjectsData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className="scroll-mt-24 bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading label={data.label} titleTop={data.titleTop} titleAccent={data.titleAccent} />
          <p data-reveal className="max-w-md leading-relaxed text-[var(--color-text-muted)] sm:text-[1.0625rem] lg:pb-2">
            {data.description}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          {data.items.map((item, index) => (
            <li
              key={item.id}
              data-reveal
              data-reveal-delay={(index % 2) * 100}
              className={`group relative isolate flex aspect-[4/3.4] flex-col justify-between overflow-hidden rounded-[1.75rem] p-5 sm:aspect-[4/4.2] sm:p-6 lg:aspect-auto lg:h-[24rem] lg:p-7 ${SPANS[index % SPANS.length]}`}
            >
              <Image
                quality={90}
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 720px, (min-width: 640px) 50vw, 100vw"
                className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--color-deep-95)] via-[var(--color-deep-40)] to-[var(--color-deep-0)] transition-opacity duration-500"
              />
              {/* brand glow rising from the bottom on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-[var(--color-primary-60)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-[var(--color-white-20)] bg-[var(--color-deep-70)] px-3.5 py-1.5 font-heading text-xs font-semibold text-[var(--color-white)] backdrop-blur">
                  {item.category}
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--color-white)] text-[var(--color-primary)] transition-[background-color,color,transform] duration-500 group-hover:rotate-45 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-white)]"
                >
                  <Icon name="LuArrowUpRight" className="size-5" strokeWidth={2.2} />
                </span>
              </div>

              <div>
                <span className="font-heading text-xs font-bold tracking-[0.16em] text-[var(--color-accent)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 max-w-md text-balance font-heading text-xl font-bold leading-snug text-[var(--color-white)] sm:text-2xl">{item.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

import Image from "next/image";
import type { WhyData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gridPattern } from "@/components/ui/buttonStyles";

/** heights of the little live activity bars on the photo */
const BARS = ["h-3", "h-5", "h-2.5", "h-6", "h-4", "h-7", "h-3.5"];

/** Why choose CyberAnexa, on the dark security-dashboard background: heading and the SOC photo, beside four reasons */
export const WhySection = ({ data }: { data?: WhyData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className="relative isolate scroll-mt-24 overflow-hidden bg-[var(--color-bg-dark)] py-[var(--section-gap)]">
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridPattern} [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]`} />
      <div aria-hidden="true" className="absolute -left-40 top-1/4 -z-10 size-[32rem] rounded-full bg-[var(--color-primary-40)] blur-[8rem]" />
      <div aria-hidden="true" className="absolute -right-32 bottom-0 -z-10 size-[26rem] rounded-full bg-[var(--color-accent-15)] blur-[8rem]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">
        <div>
          <SectionHeading tone="light" label={data.label} titleTop={data.titleTop} titleAccent={data.titleAccent} description={data.description} />

          <div data-reveal className="group relative mt-10 aspect-[4/3.4] overflow-hidden sm:aspect-[16/11] rounded-[2rem] border border-[var(--color-white-10)]">
            <Image
              quality={90}
              src={data.image}
              alt={data.imageAlt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-85)] via-[var(--color-deep-0)] to-transparent" />
            {/* live status bar over the lower part of the photo */}
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-white-15)] bg-[var(--color-deep-70)] p-2.5 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--color-success-15)] text-[var(--color-success)] sm:size-10">
                  <Icon name="LuActivity" className="size-5" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block font-heading text-sm font-bold leading-tight text-[var(--color-white)] sm:truncate sm:text-base">{data.live.title}</span>
                  <span className="flex items-center gap-1.5 text-xs text-[var(--color-white-70)]">
                    <span className="size-1.5 rounded-full bg-[var(--color-success)]" aria-hidden="true" />
                    {data.live.text}
                  </span>
                </span>
              </div>
              <span aria-hidden="true" className="flex h-7 items-end gap-1 max-sm:hidden">
                {BARS.map((height, index) => (
                  <span
                    key={index}
                    className={`w-1.5 animate-pulse rounded-full bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)] motion-reduce:animate-none ${height}`}
                    style={{ animationDelay: `${index * 180}ms` }}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {data.items.map((item, index) => (
            <li
              key={item.id}
              data-reveal
              data-reveal-delay={(index % 2) * 100}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-[var(--color-white-10)] bg-[var(--color-white-4)] p-6 backdrop-blur-sm transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--color-primary-light)] hover:bg-[var(--color-white-6)] hover:shadow-[0_1.5rem_3rem_-1.5rem_var(--color-shadow-glow)] sm:p-7 ${
                index % 2 === 1 ? "sm:translate-y-8 sm:hover:translate-y-7" : ""
              }`}
            >
              {/* faint big number in the corner */}
              <span aria-hidden="true" className="absolute -right-1 -top-3 font-heading text-[5.5rem] font-extrabold leading-none text-[var(--color-white-4)] transition-colors group-hover:text-[var(--color-white-6)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative grid size-14 place-items-center rounded-2xl border border-[var(--color-white-15)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-[var(--color-white)] shadow-[0_1rem_2rem_-1rem_var(--color-shadow-button)] transition-transform duration-300 group-hover:-rotate-6">
                <Icon name={item.icon} className="size-7" strokeWidth={1.7} />
              </span>
              <h3 className="relative mt-6 font-heading text-xl font-bold text-[var(--color-white)]">{item.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-[var(--color-white-70)] sm:text-[0.9375rem]">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

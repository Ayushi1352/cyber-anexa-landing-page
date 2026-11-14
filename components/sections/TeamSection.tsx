import Image from "next/image";
import type { TeamData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
  The website's team block as security "ID badge" cards: portrait on the left, name, role and a certified tag on the
  right. Three per row on desktop, two on tablets, one under the other on phones.
*/
export const TeamSection = ({ data }: { data?: TeamData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className="relative isolate scroll-mt-24 overflow-hidden bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div aria-hidden="true" className="absolute -left-40 top-0 -z-10 size-[28rem] rounded-full bg-[var(--color-primary-8)] blur-3xl" />
      <div aria-hidden="true" className="absolute -right-40 bottom-0 -z-10 size-[24rem] rounded-full bg-[var(--color-accent-15)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading align="center" label={data.label} titleTop={data.titleTop} titleAccent={data.titleAccent} description={data.description} />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {data.members.map((member, index) => (
            <li
              key={member.id}
              data-reveal
              data-reveal-delay={(index % 3) * 90}
              className="group relative flex items-center gap-5 overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-bg-main)] p-3.5 shadow-[0_1rem_2.5rem_-2rem_var(--color-shadow-card)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--color-primary-25)] hover:shadow-[0_1.75rem_3rem_-2rem_var(--color-shadow-card)]"
            >
              {/* big faint shield in the corner that turns on hover */}
              <Icon
                name="LuShieldCheck"
                className="absolute -bottom-6 -right-6 size-32 text-[var(--color-bg-alt)] transition-[transform,color] duration-500 group-hover:-rotate-12 group-hover:text-[var(--color-bg-subtle)]"
                strokeWidth={1.2}
              />

              {/* portrait with a brand gradient frame */}
              <div className="relative shrink-0 rounded-[1.375rem] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-[0.1875rem]">
                <div className="relative aspect-[3/4] w-28 overflow-hidden rounded-[1.25rem] bg-[var(--color-bg-subtle)] sm:w-32">
                  <Image
                    quality={90}
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="140px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="relative min-w-0 py-2 pr-2">
                <span className="font-heading text-xs font-bold tracking-[0.16em] text-[var(--color-text-subtle)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 font-heading text-lg font-bold text-[var(--color-heading)] sm:text-xl">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-[var(--color-primary)]">{member.role}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-15)] px-3 py-1 text-xs font-semibold text-[var(--color-heading)]">
                  <Icon name="LuBadgeCheck" className="size-3.5 text-[var(--color-success)]" strokeWidth={2.2} />
                  {data.badge}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

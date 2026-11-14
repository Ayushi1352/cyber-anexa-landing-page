import Image from "next/image";
import type { AboutData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** The website's About Us page: an overlapping pair of photos with the 24/7 tag, the story and three numbered strengths */
export const AboutSection = ({ data }: { data?: AboutData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className="scroll-mt-24 bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-stretch lg:gap-16 lg:px-8">
        {/*
          the large meeting photo, the analysts photo overlapping its lower right corner, and the 24/7 tag;
          on desktop the photos fill the column, so they are exactly as tall as the text beside them
        */}
        <div data-reveal className="relative mx-auto w-full max-w-[34rem] pb-[16%] lg:h-full lg:max-w-none lg:pb-0">
          <div
            aria-hidden="true"
            className="absolute -left-4 bottom-[6%] size-32 rounded-3xl bg-[radial-gradient(var(--color-primary-25)_0.09375rem,transparent_0.09375rem)] [background-size:0.875rem_0.875rem] sm:-left-6 sm:size-40"
          />
          <div className="relative aspect-[1000/1060] w-[80%] overflow-hidden lg:absolute lg:left-0 lg:top-0 lg:aspect-auto lg:h-[84%] rounded-[2rem] shadow-[0_2rem_4rem_-2rem_var(--color-shadow-photo)]">
            <Image quality={90} src={data.primaryImage} alt={data.primaryImageAlt} fill sizes="(min-width: 1024px) 470px, 80vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 aspect-[7/8] w-[46%] overflow-hidden lg:aspect-auto lg:h-[54%] rounded-[1.75rem] border-[0.4375rem] border-[var(--color-bg-main)] shadow-[0_1.75rem_3.5rem_-1.5rem_var(--color-shadow-photo)]">
            <Image quality={90} src={data.secondaryImage} alt={data.secondaryImageAlt} fill sizes="(min-width: 1024px) 280px, 46vw" className="object-cover" />
          </div>
          <div className="absolute right-[2%] top-[8%] flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-3 pr-5 text-[var(--color-white)] shadow-[0_1.25rem_2.5rem_-1rem_var(--color-shadow-button)] sm:p-4 sm:pr-6">
            <span className="grid size-11 place-items-center rounded-xl bg-[var(--color-white-15)] sm:size-12">
              <Icon name="LuShieldCheck" className="size-6" strokeWidth={1.9} />
            </span>
            <span>
              <span className="block font-heading text-2xl font-extrabold leading-none sm:text-[1.75rem]">{data.badge.value}</span>
              <span className="mt-1 block text-xs font-medium text-[var(--color-white-80)]">{data.badge.label}</span>
            </span>
          </div>
        </div>

        <div>
          <SectionHeading label={data.label} titleTop={data.titleTop} titleAccent={data.titleAccent} />
          <div data-reveal className="mt-5 space-y-4 leading-relaxed text-[var(--color-text)] sm:text-[1.0625rem]">
            {data.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ol className="mt-8 grid gap-3">
            {data.points.map((point, index) => (
              <li
                key={point.id}
                data-reveal
                data-reveal-delay={index * 90}
                className="group flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-main)] p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary-25)] hover:shadow-[0_1.25rem_2.5rem_-1.5rem_var(--color-shadow-card)] sm:gap-5 sm:p-5"
              >
                <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-[var(--color-bg-subtle)] text-[var(--color-primary)] transition-colors duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-white)]">
                  <Icon name={point.icon} className="size-6" strokeWidth={1.8} />
                  <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-[var(--color-heading)] font-heading text-[0.625rem] font-bold text-[var(--color-white)]">
                    {point.number}
                  </span>
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-lg font-bold text-[var(--color-heading)]">{point.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-[0.9375rem]">{point.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

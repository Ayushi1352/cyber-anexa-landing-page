import Image from "next/image";
import type { CompanyData, ContactData, QuoteFormData } from "@/types/templates.types";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gridPattern } from "@/components/ui/buttonStyles";

/**
  The website's Get a Quote and Contact Us pages in one split card: on the dark side the heading and how to reach
  us; on the light side the quote request form
*/
export const ContactSection = ({ data, form, company }: { data?: ContactData; form?: QuoteFormData; company: CompanyData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className="relative isolate scroll-mt-24 overflow-hidden bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div aria-hidden="true" className="absolute -right-40 top-0 -z-10 size-[30rem] rounded-full bg-[var(--color-primary-8)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] bg-[var(--color-bg-main)] shadow-[0_2.5rem_5rem_-3rem_var(--color-shadow-photo)] ring-1 ring-[var(--color-border)] lg:grid-cols-[0.92fr_1.08fr] lg:rounded-[2.5rem]">
          <div className="relative isolate flex flex-col overflow-hidden bg-[var(--color-bg-deep)] p-6 sm:p-10 lg:p-12">
            <Image quality={75} src={data.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="-z-20 object-cover opacity-40" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-deep-95)] via-[var(--color-deep-85)] to-[var(--color-dark-75)]" />
            <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridPattern}`} />

            <SectionHeading tone="light" label={data.label} titleTop={data.titleTop} titleAccent={data.titleAccent} description={data.description} />

            {/* the contact cards sit at the foot of the panel, level with the form button */}
            <ul className="mt-8 grid gap-3 border-t border-[var(--color-white-10)] pt-8 sm:grid-cols-2 lg:mt-auto">
              {company.contactItems.map((item) => {
                const external = item.url.startsWith("http");
                return (
                  // the address takes the full width, so phone and email sit side by side under it
                  <li key={item.id} className={external ? "sm:col-span-2" : ""}>
                    <a
                      href={item.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex h-full items-center gap-3 rounded-2xl border border-[var(--color-white-10)] bg-[var(--color-white-4)] p-3.5 transition-colors hover:border-[var(--color-primary-light)] hover:bg-[var(--color-white-6)]"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-white)] transition-transform duration-300 group-hover:scale-105">
                        <Icon name={item.icon} className="size-[1.125rem]" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-[var(--color-white-60)]">{item.title}</span>
                        <span className="block break-words font-heading text-sm font-semibold text-[var(--color-white)]">{item.lines.join(" ")}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div data-reveal className="flex flex-col p-6 sm:p-10 lg:p-12">
            <h3 className="font-heading text-2xl font-extrabold tracking-[-0.02em] text-[var(--color-heading)] sm:text-[2rem]">
              {data.form.title} <span className="text-[var(--color-primary)]">{data.form.titleAccent}</span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-[0.9375rem]">{data.form.description}</p>
            <QuoteForm data={form} />
          </div>
        </div>
      </div>
    </section>
  );
};

import Image from "next/image";
import type { CompanyData, FooterData, LinkItem } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { gridPattern } from "@/components/ui/buttonStyles";

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const heading = "font-heading text-base font-bold text-[var(--color-white)] sm:text-lg";
const link = "group inline-flex items-center gap-2 transition-colors hover:text-[var(--color-primary-light)]";
const chevron = "size-3.5 text-[var(--color-primary-light)] transition-transform group-hover:translate-x-0.5";

// The footer shows the white logo, the header menu (`links`) and the company contact details.
export const Footer = async ({
  data,
  company,
  links = [],
}: {
  data?: FooterData;
  company: CompanyData;
  links?: LinkItem[];
}) => {
  if (!data) return null;
  const copyright = data.copyrightText.replace("{year}", String(await currentYear()));

  return (
    <footer className="relative isolate overflow-hidden bg-[var(--color-bg-deep)] text-sm text-[var(--color-white-70)]">
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridPattern} [mask-image:linear-gradient(to_bottom,#000,transparent)]`} />
      <div aria-hidden="true" className="absolute -left-32 -top-32 -z-10 size-96 rounded-full bg-[var(--color-primary-40)] blur-[8rem]" />
      {/* brand line along the top edge */}
      <div aria-hidden="true" className="h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />

      {/* phones and tablets: logo across the top, then Quick Links and Get In Touch side by side */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-10 px-4 py-14 sm:gap-x-10 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_1.1fr] lg:gap-12 lg:px-8 lg:py-16">
        <div className="col-span-2 lg:col-span-1">
          <Image src={company.logoLight} alt={company.name} width={company.logoWidth} height={company.logoHeight} sizes="220px" className="h-auto w-52" />
          <p className="mt-5 max-w-sm leading-relaxed">{data.description}</p>
          <div className="mt-6 flex gap-2.5">
            {data.socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid size-10 place-items-center rounded-full border border-[var(--color-white-10)] bg-[var(--color-white-6)] text-[var(--color-white)] transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]"
              >
                <Icon name={social.icon} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label={data.quickLinksTitle}>
          <h2 className={heading}>{data.quickLinksTitle}</h2>
          <ul className="mt-4 grid gap-2.5 text-xs sm:mt-5 sm:gap-3 sm:text-sm">
            {links.map((item) => (
              <li key={item.id}>
                <a href={item.url} className={link}>
                  <Icon name="LuChevronRight" className={chevron} strokeWidth={2.4} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>{data.contactTitle}</h2>
          <ul className="mt-4 grid gap-3 text-xs sm:mt-5 sm:gap-4 sm:text-sm">
            {company.contactItems.map((item) => {
              const external = item.url.startsWith("http");
              return (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex min-w-0 items-start gap-2 transition-colors sm:gap-3 hover:text-[var(--color-primary-light)]"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-[var(--color-white-10)] sm:size-10 sm:rounded-xl bg-[var(--color-white-6)] text-[var(--color-primary-light)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-white)]">
                      <Icon name={item.icon} className="size-4 sm:size-[1.125rem]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.6875rem] text-[var(--color-white-60)] sm:text-xs">{item.title}</span>
                      <span className="block break-words font-medium text-[var(--color-white-90)]">{item.lines.join(" ")}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-white-10)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>{copyright}</p>
          <p className="font-heading font-semibold uppercase tracking-[0.2em] text-[var(--color-white)]">
            {data.motto.map((word, index) => (
              <span key={word}>
                {index > 0 && <span className="text-[var(--color-accent)]"> • </span>}
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
};

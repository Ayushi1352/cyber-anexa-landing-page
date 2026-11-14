import Image from "next/image";
import type { HeroData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { accentText } from "@/components/ui/SectionHeading";
import { arrowClass, buttonStyles, gridPattern } from "@/components/ui/buttonStyles";

/** Plays once on load (CSS @starting-style), so the hero never waits for JavaScript */
const enter = "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-7 starting:opacity-0";

/** One L-shaped corner of the scanner frame around the photo */
const corner = "absolute size-7 border-[var(--color-accent)] sm:size-9";

/**
  Dark hero under the floating header: headline and buttons on the left, the analyst photo in a "scanner" frame
  with live security cards on the right.
*/
export const HeroSection = ({ data }: { data?: HeroData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className="relative isolate overflow-hidden bg-[var(--color-bg-deep)]">
      {/* square grid that fades out towards the edges, and two soft glows */}
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridPattern} [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]`} />
      <div aria-hidden="true" className="absolute -left-40 -top-40 -z-10 size-[36rem] rounded-full bg-[var(--color-primary-40)] blur-[8rem]" />
      <div aria-hidden="true" className="absolute -bottom-40 right-0 -z-10 size-[30rem] rounded-full bg-[var(--color-accent-15)] blur-[8rem]" />

      {/* the top padding leaves room for the floating header */}
      <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-[var(--section-gap)] pt-[calc(5.25rem+var(--section-gap))] sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-[calc(6rem+3rem)]">
        <div className={`min-w-0 ${enter}`}>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-white-15)] bg-[var(--color-white-6)] py-1.5 pl-1.5 pr-4 font-heading text-xs font-semibold text-[var(--color-white-90)] backdrop-blur sm:text-sm">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]">
              <Icon name="LuShieldCheck" className="size-4 text-[var(--color-white)]" strokeWidth={2} />
            </span>
            {data.label}
          </p>
          <h1 className="mt-6 text-balance font-heading text-[2.5rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[var(--color-white)] sm:text-[3.5rem] lg:text-[4rem]">
            {data.titleTop} <span className={`${accentText} from-[var(--color-primary-light)] via-[var(--color-accent)] to-[var(--color-primary-light)]`}>{data.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-white-70)] sm:text-lg">{data.description}</p>
          <a href={data.buttonUrl} className={`${buttonStyles.primary} mt-9`}>
            {data.buttonText}
            <Icon name="LuArrowRight" className={arrowClass} strokeWidth={2.4} />
          </a>
        </div>

        <div className={`relative mx-auto w-full max-w-[34rem] delay-150 lg:max-w-none ${enter}`}>
          {/* slowly turning dashed rings behind the frame */}
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[115%] -translate-x-1/2 -translate-y-1/2">
            <div className="size-full animate-spin-slow rounded-full border border-dashed border-[var(--color-primary-40)] motion-reduce:animate-none" />
            <div className="absolute inset-[12%] rounded-full border border-[var(--color-white-6)]" />
          </div>

          <div className="relative p-3 sm:p-4">
            <span aria-hidden="true" className={`${corner} left-0 top-0 rounded-tl-2xl border-l-2 border-t-2`} />
            <span aria-hidden="true" className={`${corner} right-0 top-0 rounded-tr-2xl border-r-2 border-t-2`} />
            <span aria-hidden="true" className={`${corner} bottom-0 left-0 rounded-bl-2xl border-b-2 border-l-2`} />
            <span aria-hidden="true" className={`${corner} bottom-0 right-0 rounded-br-2xl border-b-2 border-r-2`} />

            <div className="relative aspect-[5/5.4] overflow-hidden lg:aspect-[5/4.6] rounded-[1.75rem] border border-[var(--color-white-10)] shadow-[0_2rem_5rem_-2rem_var(--color-shadow-glow)]">
              <Image src={data.image} alt={data.imageAlt} fill preload quality={90} sizes="(min-width: 1024px) 560px, 92vw" className="object-cover object-[72%_center]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-70)] via-transparent to-transparent" />
              {/* scanner line sweeping down the photo */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 h-24 -translate-y-full animate-scan bg-gradient-to-b from-transparent to-[var(--color-accent-30)] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[var(--color-accent)] motion-reduce:hidden"
              />
            </div>
          </div>

          {/* live monitoring tag */}
          <p className="absolute right-6 top-8 flex items-center gap-2 rounded-full border border-[var(--color-white-15)] bg-[var(--color-deep-70)] px-3.5 py-2 font-heading text-xs font-semibold text-[var(--color-white)] backdrop-blur-md sm:right-8 sm:top-10">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-success)] motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-[var(--color-success)]" />
            </span>
            {data.monitoring}
          </p>

          {/* threat blocked alert */}
          <div className="absolute -left-2 top-[38%] flex max-w-[15.5rem] animate-float items-center gap-3 rounded-2xl border border-[var(--color-white-15)] bg-[var(--color-deep-85)] p-3 pr-4 shadow-[0_1.25rem_2.5rem_-1rem_var(--color-shadow-float)] backdrop-blur-md motion-reduce:animate-none sm:-left-8 lg:-left-12">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--color-success-15)] text-[var(--color-success)]">
              <Icon name="LuShieldCheck" className="size-6" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-2 font-heading text-sm font-bold text-[var(--color-white)]">
                {data.alert.title}
                <span className="text-[0.6875rem] font-medium text-[var(--color-white-60)]">{data.alert.time}</span>
              </span>
              <span className="block text-xs leading-snug text-[var(--color-white-70)]">{data.alert.text}</span>
            </span>
          </div>

          {/* protection status */}
          <div className="absolute -bottom-4 right-2 w-[13.5rem] animate-float rounded-2xl bg-[var(--color-white)] p-4 shadow-[0_1.5rem_3rem_-1rem_var(--color-shadow-float)] [animation-delay:-3s] motion-reduce:animate-none sm:-right-6 sm:w-60">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-[var(--color-white)]">
                <Icon name="LuLock" className="size-5" strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-medium text-[var(--color-text-muted)]">{data.status.label}</span>
                <span className="block font-heading text-xl font-extrabold text-[var(--color-heading)]">{data.status.value}</span>
              </span>
              <Icon name="LuActivity" className="size-6 text-[var(--color-success)]" strokeWidth={2} />
            </div>
            <span aria-hidden="true" className="mt-3 block h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-subtle)]">
              <span className="block h-full w-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
            </span>
          </div>
        </div>
      </div>

    </section>
  );
};

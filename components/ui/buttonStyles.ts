/** Shared look of the rounded buttons used across the page */
const base =
  "group inline-flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full border-[0.09375rem] px-7 font-heading text-[0.9375rem] font-bold transition-[background-color,color,border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5";

/** soft blue glow under the filled buttons */
const glow = "shadow-[0_0.875rem_2rem_-0.875rem_var(--color-shadow-button)]";

export const buttonStyles = {
  /** filled brand blue for light sections; turns navy on hover */
  primary: `${base} ${glow} border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-white)] hover:border-[var(--color-heading)] hover:bg-[var(--color-heading)] hover:shadow-[0_1.125rem_2.5rem_-1rem_var(--color-shadow-photo)]`,
  /** filled brand blue for dark sections (header, hero, mobile menu); turns white with navy text on hover */
  primaryOnDark: `${base} ${glow} border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-white)] hover:border-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-heading)]`,
  /** see-through glass button for dark backgrounds; fills white on hover */
  ghost: `${base} border-[var(--color-white-20)] bg-[var(--color-white-6)] text-[var(--color-white)] backdrop-blur hover:border-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-heading)]`,
  /** white button for dark or photo backgrounds; turns brand blue on hover */
  light: `${base} border-[var(--color-white)] bg-[var(--color-white)] text-[var(--color-heading)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)]`,
};

/** arrow inside a button that turns up-right on hover */
export const arrowClass = "size-4 shrink-0 transition-transform duration-300 group-hover:-rotate-45";

/** faint square grid drawn behind the dark sections, like a security dashboard */
export const gridPattern =
  "bg-[linear-gradient(var(--color-white-4)_0.0625rem,transparent_0.0625rem),linear-gradient(90deg,var(--color-white-4)_0.0625rem,transparent_0.0625rem)] bg-[length:3.5rem_3.5rem]";

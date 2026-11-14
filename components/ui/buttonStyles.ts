/** Shared look of the rounded buttons used across the page */
const base =
  "group inline-flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full border-[0.09375rem] px-7 font-heading text-[0.9375rem] font-bold transition-[background-color,color,border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5";

export const buttonStyles = {
  /** filled brand blue with a soft glow, turns white with blue text on hover */
  primary: `${base} border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-white)] shadow-[0_0.875rem_2rem_-0.875rem_var(--color-shadow-button)] hover:border-[var(--color-primary-dark)] hover:bg-[var(--color-primary-dark)] hover:shadow-[0_1.125rem_2.5rem_-0.75rem_var(--color-shadow-button)]`,
  /** see-through glass button for dark backgrounds */
  ghost: `${base} border-[var(--color-white-20)] bg-[var(--color-white-6)] text-[var(--color-white)] backdrop-blur hover:border-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-heading)]`,
  /** white button for dark or photo backgrounds */
  light: `${base} border-[var(--color-white)] bg-[var(--color-white)] text-[var(--color-heading)] hover:bg-transparent hover:text-[var(--color-white)]`,
};

/** arrow that nudges right when its button is hovered */
export const arrowClass = "size-4 transition-transform duration-300 group-hover:translate-x-1";

/** faint square grid drawn behind the dark sections, like a security dashboard */
export const gridPattern =
  "bg-[linear-gradient(var(--color-white-4)_0.0625rem,transparent_0.0625rem),linear-gradient(90deg,var(--color-white-4)_0.0625rem,transparent_0.0625rem)] bg-[length:3.5rem_3.5rem]";

type Props = {
  label: string;
  titleTop: string;
  titleAccent: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

/** Brand gradient used for the highlighted words of every title */
export const accentText = "bg-gradient-to-r bg-clip-text text-transparent";

/**
  Section intro used across the page: a small pill label with a live dot, a bold title whose last words
  carry the blue-to-cyan brand gradient, and optional text. `tone="light"` is for the dark sections.
*/
export const SectionHeading = ({ label, titleTop, titleAccent, description, align = "left", tone = "dark", className = "" }: Props) => {
  const center = align === "center";
  const light = tone === "light";

  return (
    <div data-reveal className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-xl"} ${className}`}>
      <p
        className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.16em] ${
          light
            ? "border-[var(--color-white-15)] bg-[var(--color-white-6)] text-[var(--color-primary-light)]"
            : "border-[var(--color-primary-15)] bg-[var(--color-primary-8)] text-[var(--color-primary)]"
        }`}
      >
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-60 motion-reduce:hidden" />
          <span className="relative size-2 rounded-full bg-current" />
        </span>
        {label}
      </p>
      <h2
        className={`mt-5 text-balance font-heading text-[1.875rem] font-extrabold leading-[1.15] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[2.875rem] ${
          light ? "text-[var(--color-white)]" : "text-[var(--color-heading)]"
        }`}
      >
        {titleTop}{" "}
        <span
          className={`${accentText} ${
            light ? "from-[var(--color-primary-light)] to-[var(--color-accent)]" : "from-[var(--color-primary)] to-[var(--color-primary-light)]"
          }`}
        >
          {titleAccent}
        </span>
      </h2>
      {description && (
        <p className={`mt-4 leading-relaxed sm:text-[1.0625rem] ${light ? "text-[var(--color-white-70)]" : "text-[var(--color-text-muted)]"}`}>{description}</p>
      )}
    </div>
  );
};

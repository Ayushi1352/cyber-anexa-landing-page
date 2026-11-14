"use client";

import { useId, useState, type ReactNode } from "react";
import type { FormField, QuoteFormData } from "@/types/templates.types";
import { useDummySubmit } from "@/components/ui/useDummySubmit";
import { Icon } from "@/components/ui/Icon";
import { FormSuccess, Spinner } from "@/components/ui/FormSuccess";
import { buttonStyles } from "@/components/ui/buttonStyles";

/** Soft form fields */
const base =
  "w-full appearance-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-field)] px-4 text-sm text-[var(--color-heading)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-primary)] focus:shadow-[0_0_0_0.25rem_var(--color-primary-8)]";
/** single-line fields and selects share one height */
const control = `${base} h-12`;

/** A field with its label above it (required ones get a red star) */
const Field = ({ field, className = "", children }: { field: FormField; className?: string; children: (id: string) => ReactNode }) => {
  const id = useId();
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-heading text-sm font-semibold text-[var(--color-heading)]">
        {field.label}
        {field.required && <span className="text-[var(--color-primary)]"> *</span>}
      </label>
      {children(id)}
    </div>
  );
};

const ServiceSelect = ({ id, field, options }: { id: string; field: FormField; options: string[] }) => {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <select
        id={id}
        name="service"
        required={field.required}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        // shows the placeholder grey until an option is picked
        className={`${control} cursor-pointer pr-10 ${value === "" ? "text-[var(--color-text-subtle)]" : "text-[var(--color-heading)]"}`}
      >
        <option value="" disabled>
          {field.placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-[var(--color-heading)]">
            {option}
          </option>
        ))}
      </select>
      <Icon name="LuChevronDown" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--color-primary)]" strokeWidth={2.2} />
    </div>
  );
};

/** The quote request form in the contact section (the website's Get a Quote page) */
export const QuoteForm = ({ data }: { data?: QuoteFormData }) => {
  const submit = useDummySubmit();
  if (!data) return null;
  const { fields } = data;

  /** a plain text input for one of the single-line fields */
  const input = (name: keyof QuoteFormData["fields"], type: string, autoComplete?: string) => (
    <Field field={fields[name]}>
      {(id) => <input id={id} name={name} type={type} required={fields[name].required} placeholder={fields[name].placeholder} autoComplete={autoComplete} className={control} />}
    </Field>
  );

  return (
    <>
      {/* remounting the form (via key) after each send clears every field, including the controlled select */}
      <form
        key={submit.round}
        onSubmit={submit.onSubmit}
        onInput={submit.onInput}
        aria-busy={submit.sending}
        // on desktop the form fills its card and the message box takes any spare height, so both halves end level
        className="mt-7 grid gap-4 sm:grid-cols-2 lg:flex-1 lg:grid-rows-[auto_auto_auto_1fr_auto]"
      >
        {input("name", "text", "name")}
        {input("email", "email", "email")}
        {input("company", "text", "organization")}
        {input("phone", "tel", "tel")}
        <Field field={fields.service}>{(id) => <ServiceSelect id={id} field={fields.service} options={data.serviceOptions} />}</Field>
        {input("budget", "text")}
        <Field field={fields.message} className="sm:col-span-2">
          {(id) => (
            <textarea
              id={id}
              name="message"
              required={fields.message.required}
              rows={4}
              placeholder={fields.message.placeholder}
              className={`${base} min-h-[6rem] flex-1 resize-y py-3`}
            />
          )}
        </Field>
        {/* full-width button across both columns, its label centred */}
        <button
          type="submit"
          disabled={submit.sending}
          className={`${buttonStyles.primary} w-full hover:translate-y-0 disabled:cursor-wait disabled:opacity-80 sm:col-span-2`}
        >
          {submit.sending ? (
            <>
              <Spinner className="size-5" />
              {data.sending}
            </>
          ) : (
            <>
              {data.button}
              <Icon name="LuArrowRight" className="size-[1.125rem]" strokeWidth={2.2} />
            </>
          )}
        </button>
      </form>
      {submit.showMessage && (
        <FormSuccess
          name={submit.name}
          title={data.successTitle}
          message={data.success}
          leaving={submit.status === "leaving"}
          visibleFor={submit.visibleFor}
          onClose={submit.dismiss}
          closeLabel={data.closeLabel}
          className="mt-4"
        />
      )}
    </>
  );
};

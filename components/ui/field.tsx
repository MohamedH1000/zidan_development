import { cn } from "@/lib/utils";

/** Shared input surface styling — keeps every form visually consistent. */
export const inputClass =
  "w-full rounded-xl border border-ink-900/12 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500/60 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30";

export function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-ink-600"
    >
      {children}
      {required ? <span className="ml-0.5 text-gold-600">*</span> : null}
    </label>
  );
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs font-medium text-red-600">{children}</p>;
}

export function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(className)}>
      <FieldLabel htmlFor={htmlFor} required={required}>
        {label}
      </FieldLabel>
      {children}
      {error ? <FieldError>{error}</FieldError> : hint ? <p className="mt-1.5 text-xs text-ink-500">{hint}</p> : null}
    </div>
  );
}

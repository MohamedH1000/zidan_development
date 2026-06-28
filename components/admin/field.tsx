import { cn } from "@/lib/utils";

/** Shared dark-theme input styling for the admin dashboard. */
export const adminInput =
  "w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2 text-sm text-cream placeholder:text-ink-500 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30";

export const adminLabel =
  "mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-300";

export function AdminField({
  label,
  children,
  hint,
  className,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <span className={adminLabel}>{label}</span>
      {children}
      {hint ? <p className="mt-1 text-xs text-ink-500">{hint}</p> : null}
    </div>
  );
}

/** Small section heading used to group form fields. */
export function AdminSection({ title }: { title: string }) {
  return (
    <h2 className="mt-8 mb-3 border-b border-white/10 pb-2 font-display text-sm font-semibold uppercase tracking-wide text-gold-400">
      {title}
    </h2>
  );
}

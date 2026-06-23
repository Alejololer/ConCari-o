import { cn } from "@/lib/cn";

const fieldBase =
  "w-full rounded-[11px] border border-line-strong bg-cream px-[14px] py-3 text-[14.5px] text-ink outline-none focus:border-primary";

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-[7px] block text-xs font-semibold uppercase tracking-[.6px] text-mute">
      {children}
    </label>
  );
}

export function Input({ className, ...rest }: React.ComponentProps<"input">) {
  return <input {...rest} className={cn(fieldBase, className)} />;
}

export function Textarea({ className, ...rest }: React.ComponentProps<"textarea">) {
  return <textarea {...rest} className={cn(fieldBase, "min-h-[96px] resize-y", className)} />;
}

export function Select({ className, children, ...rest }: React.ComponentProps<"select">) {
  return (
    <select {...rest} className={cn(fieldBase, className)}>
      {children}
    </select>
  );
}

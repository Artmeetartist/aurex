import { cn } from "@/lib/cn";

/**
 * AUREX mark — an open "A" whose crossbar runs past the right leg:
 * value (the letterform) carried forward across a horizon.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-7 w-7", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      <path d="M6.5 34 L20 6 L33.5 34" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="miter" strokeLinecap="square" />
      <path d="M11.4 24.2 H38.5" stroke="var(--color-gold)" strokeWidth="2.6" strokeLinecap="square" />
    </svg>
  );
}

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className={markClassName} />
      <span className="text-[0.95rem] font-medium tracking-[0.34em] uppercase leading-none">Aurex</span>
    </span>
  );
}

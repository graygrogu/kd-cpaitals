import { cn } from "@/lib/utils";

/** Faint engineering grid — adds "structure" without noise. */
export function GridPattern({ className, id = "grid" }: { className?: string; id?: string }) {
  return (
    <svg aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}>
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0H0V56" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Soft brand glow blobs used behind hero / CTA blocks. */
export function Glow({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute", className)}>
      <div className="h-full w-full rounded-full blur-3xl" />
    </div>
  );
}

/** Rising-line motif = growth. Pure SVG, animates its own stroke on mount. */
export function GrowthLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden className={cn("h-auto w-full", className)}>
      <defs>
        <linearGradient id="gl-stroke" x1="0" y1="140" x2="320" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0E9F6E" stopOpacity="0.25" />
          <stop offset="1" stopColor="#0E9F6E" />
        </linearGradient>
        <linearGradient id="gl-fill" x1="0" y1="0" x2="0" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0E9F6E" stopOpacity="0.16" />
          <stop offset="1" stopColor="#0E9F6E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M4 122 L64 104 L124 108 L184 66 L244 52 L316 14 L316 140 L4 140 Z" fill="url(#gl-fill)" />
      <path
        d="M4 122 L64 104 L124 108 L184 66 L244 52 L316 14"
        stroke="url(#gl-stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="316" cy="14" r="5" fill="#0E9F6E" />
      <circle cx="316" cy="14" r="5" fill="#0E9F6E" className="origin-center animate-pulse-ring" />
    </svg>
  );
}

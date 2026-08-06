import { cn, formatINRShort } from "@/lib/utils";
import { useLang } from "@/i18n";

export function RangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  hint,
  minLabel,
  maxLabel,
  className,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  hint?: string;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("", className)}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <label className="text-[14px] font-semibold text-navy-700">{label}</label>
        <span className="font-display text-lg font-extrabold tabular-nums text-navy-900">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-3 w-full cursor-pointer appearance-none rounded-full bg-navy-100 outline-none touch-manipulation
          [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px]
          [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-500
          [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(10,31,68,0.25)] [&::-webkit-slider-thumb]:transition-transform
          hover:[&::-webkit-slider-thumb]:scale-110
          [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-500"
        style={{ background: `linear-gradient(to right, #0E9F6E 0%, #0E9F6E ${pct}%, #E3EAF4 ${pct}%, #E3EAF4 100%)` }}
      />
      <div className="mt-2 flex justify-between text-[11.5px] font-medium text-navy-400">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      {hint && <p className="mt-1.5 text-[12.5px] text-navy-400">{hint}</p>}
    </div>
  );
}

export function useShort() {
  const { lang } = useLang();
  return (n: number) => formatINRShort(n, lang);
}

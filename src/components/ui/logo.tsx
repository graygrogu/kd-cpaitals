import { cn } from "@/lib/utils";

export function Logo({ className, mono = false }: { className?: string; mono?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 sm:gap-2.5", className)}>
      <svg viewBox="0 0 40 40" className="size-8 shrink-0 sm:size-9" aria-hidden>
        <rect width="40" height="40" rx="10" fill={mono ? "#FFFFFF" : "#0A1F44"} />
        <path
          d="M11.5 28V12h3.7v7.2l6.6-7.2h4.6l-6.6 7.2L27 28h-4.7l-4.9-6.5-2.2 2.3V28z"
          fill={mono ? "#0A1F44" : "#FFFFFF"}
        />
        <circle cx="29.5" cy="14.5" r="2.8" fill="#0E9F6E" />
      </svg>
      <span className="flex min-w-0 flex-col leading-none">
        <span className={cn("font-display text-[15px] font-extrabold tracking-tight sm:text-[17px]", mono ? "text-white" : "text-navy-900")}>
          KD Capitals
        </span>
        <span className={cn("mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em]", mono ? "text-white/60" : "text-navy-400")}>
          Loan Advisory
        </span>
      </span>
    </span>
  );
}

/** Official marks for the lender strip. Names match `lenders.list` in the copy files. */
const LENDER_LOGOS: Record<string, { src: string; dark?: boolean; img?: string }> = {
  "HDFC Bank": { src: "/lenders/hdfc.svg" },
  "ICICI Bank": { src: "/lenders/icici.svg" },
  "State Bank of India": { src: "/lenders/sbi.svg", img: "h-11" },
  "Axis Bank": { src: "/lenders/axis.svg" },
  "Kotak Mahindra Bank": { src: "/lenders/kotak.svg" },
  "Bank of Baroda": { src: "/lenders/bob.png", img: "h-12" },
  "IndusInd Bank": { src: "/lenders/indusind.svg" },
  "Yes Bank": { src: "/lenders/yes.svg" },
  "Bajaj Finserv": { src: "/lenders/bajaj.svg" },
  "Tata Capital": { src: "/lenders/tata.png" },
  "Aditya Birla Finance": { src: "/lenders/aditya-birla.jpg", img: "h-14" },
  "L&T Finance": { src: "/lenders/lt-finance.svg" },
  "Piramal Finance": { src: "/lenders/piramal.svg", dark: true },
  "Fullerton India": { src: "/lenders/fullerton.svg" },
  "Hero FinCorp": { src: "/lenders/hero.png", dark: true },
};

export function LenderMark({ name }: { name: string }) {
  const logo = LENDER_LOGOS[name];

  return (
    <div
      className={cn(
        "flex h-[4.5rem] w-[12.5rem] shrink-0 items-center justify-center rounded-xl border px-4 shadow-ring transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft",
        logo?.dark ? "border-neutral-800 bg-neutral-950" : "border-navy-100 bg-white hover:border-navy-200",
      )}
    >
      {logo ? (
        <img
          src={logo.src}
          alt={name}
          className={cn("w-auto max-w-[10.5rem] object-contain", logo.img ?? "h-10")}
        />
      ) : (
        <span className="whitespace-nowrap font-display text-sm font-bold tracking-tight text-navy-700">{name}</span>
      )}
    </div>
  );
}

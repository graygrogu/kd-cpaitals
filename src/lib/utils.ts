import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ₹12,34,567 — Indian digit grouping */
export function formatINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

/** ₹1.25 Cr / ₹45 L / ₹90,000 — human-readable Indian short form */
export function formatINRShort(n: number, lang: "en" | "hi" = "en"): string {
  const cr = lang === "hi" ? " करोड़" : " Cr";
  const l = lang === "hi" ? " लाख" : " L";
  if (n >= 1e7) {
    const v = n / 1e7;
    return "₹" + (v % 1 === 0 ? v.toFixed(0) : v.toFixed(2).replace(/\.?0+$/, "")) + cr;
  }
  if (n >= 1e5) {
    const v = n / 1e5;
    return "₹" + (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, "")) + l;
  }
  return formatINR(n);
}

/** Standard reducing-balance EMI. Returns monthly EMI, total interest and total payable. */
export function calculateEMI(principal: number, annualRate: number, months: number) {
  const safeP = Math.max(0, principal);
  const safeN = Math.max(1, Math.round(months));
  const r = annualRate / 12 / 100;
  const emi = r === 0 ? safeP / safeN : (safeP * r * Math.pow(1 + r, safeN)) / (Math.pow(1 + r, safeN) - 1);
  const total = emi * safeN;
  return { emi, total, interest: total - safeP, principal: safeP, months: safeN };
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function whatsappHref(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

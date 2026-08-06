export type LeadPayload = {
  loanType: string;
  amount: number;
  income: number;
  name: string;
  phone: string;
  city: string;
  language: string;
  submittedAt: string;
  source: string;
};

/**
 * Swap this for your real endpoint.
 *  - Formspree:  https://formspree.io/f/XXXXXXX
 *  - Google Sheet via Apps Script, Zapier/Make webhook, or your own API.
 * Set VITE_LEAD_ENDPOINT in a .env file — no code change needed.
 */
const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined;

export async function submitLead(payload: LeadPayload): Promise<void> {
  if (!ENDPOINT) {
    // No endpoint configured yet — log so nothing is silently lost in development.
    console.info("[KD Capitals] Lead captured (no VITE_LEAD_ENDPOINT set):", payload);
    await new Promise((r) => setTimeout(r, 700));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Lead submission failed: ${res.status}`);
}

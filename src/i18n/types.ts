export type NavLink = { id: string; label: string };
export type Stat = { value: number; prefix?: string; suffix?: string; label: string };
export type CardRow = { label: string; value: string; tone: "neutral" | "bad" | "good" };
export type ServiceItem = { name: string; desc: string };
export type ServiceGroup = { icon: string; title: string; blurb: string; items: ServiceItem[] };
export type CompareRow = { a: string; b: string };
export type FeeItem = { label: string; value: string; desc: string };
export type Usp = { icon: string; title: string; desc: string };
export type Metric = { value: string; label: string };
export type Impact = { title: string; head: string[]; rows: string[][]; footRow: string[] };
export type CaseStudy = {
  tag: string;
  title: string;
  subtitle: string;
  profile: string;
  requirement: string;
  metrics: Metric[];
  problem: string[];
  strategy: string[];
  result: string[];
  impact?: Impact;
  takeaway: string;
};
export type Testimonial = { quote: string; name: string; role: string };
export type Preset = { label: string; amount: number; rate: number; years: number };
export type TrustItem = { title: string; desc: string };

export interface Dict {
  meta: { langLabel: string; switchTo: string };
  brand: {
    name: string; tagline: string; phone: string; phoneHref: string; whatsapp: string;
    email: string; address: string; instagram: string; linkedin: string;
  };
  nav: { links: NavLink[]; cta: string; menu: string; close: string };
  hero: {
    eyebrow: string; headline1: string; headline2: string; sub: string; badges: string[];
    ctaPrimary: string; ctaSecondary: string; note: string; stats: Stat[];
    cardTitle: string; cardRows: CardRow[]; cardFoot: string; feeNote: string;
  };
  services: { eyebrow: string; heading: string; sub: string; groups: ServiceGroup[]; cta: string };
  compare: {
    eyebrow: string; heading: string; sub: string; story: string[]; highlight: string;
    tableTitle: string; colA: string; colB: string; rows: CompareRow[];
    feeTitle: string; fee: FeeItem[]; punch1: string; punch2: string; cta: string;
  };
  why: {
    eyebrow: string; heading: string; sub: string; founderName: string; founderRole: string;
    founderHeading: string; founderStory: string[]; uspTitle: string; usps: Usp[];
    punch1: string; punch2: string; closing: string;
  };
  cases: {
    eyebrow: string; heading: string; sub: string;
    labels: {
      profile: string; requirement: string; problem: string; strategy: string; result: string;
      takeaway: string; viewImpact: string; hideImpact: string; ticket: string;
    };
    items: CaseStudy[];
    whyTitle: string; whyItems: string[]; closing1: string; closing2: string; cta: string; disclaimer: string;
  };
  testimonials: { eyebrow: string; heading: string; sub: string; items: Testimonial[] };
  lenders: { heading: string; note: string; list: string[] };
  emi: {
    eyebrow: string; heading: string; sub: string; amount: string; rate: string; tenure: string;
    years: string; months: string; monthlyEmi: string; principal: string; interest: string;
    total: string; disclaimer: string; cta: string; presets: string; presetItems: Preset[];
  };
  social: { eyebrow: string; heading: string; sub: string; cta: string; handle: string };
  contact: {
    eyebrow: string; heading: string; sub: string; steps: string[]; q1: string; loanTypes: string[];
    q2Amount: string; q2AmountHint: string; q2Income: string; q2IncomeHint: string;
    q3Name: string; q3NamePh: string; q3Phone: string; q3PhonePh: string; q3City: string;
    q3CityPh: string; q3Consent: string; next: string; back: string; submit: string; submitting: string;
    whatsapp: string; whatsappBtn: string; call: string;
    successTitle: string; successBody: string; successAgain: string;
    errors: { type: string; name: string; phone: string; consent: string; generic: string };
    trust: TrustItem[]; whatsappMsg: string;
  };
  footer: {
    about: string; quickLinks: string; servicesTitle: string; contactTitle: string;
    servicesList: string[]; rights: string; disclaimer: string; privacy: string; terms: string;
  };
}

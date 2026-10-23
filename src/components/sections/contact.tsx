import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedBackground } from "@/components/motion/animated-background";
import { TransitionPanel } from "@/components/motion/transition-panel";
import { Wobble } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { RangeField, useShort } from "@/components/ui/slider";
import { useLang } from "@/i18n";
import { cn, whatsappHref } from "@/lib/utils";
import { submitLead } from "@/lib/submit";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  const { t, lang } = useLang();
  const short = useShort();

  const [step, setStep] = useState(0);
  const prevStep = useRef(0);
  const stepDirection = useRef(1);
  if (prevStep.current !== step) {
    stepDirection.current = step > prevStep.current ? 1 : -1;
    prevStep.current = step;
  }
  const [loanType, setLoanType] = useState("");
  const [amount, setAmount] = useState(5_000_000);
  const [income, setIncome] = useState(1_200_000);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const wa = whatsappHref(t.brand.whatsapp, t.contact.whatsappMsg);

  const next = () => {
    if (step === 0 && !loanType) return setErrors({ type: t.contact.errors.type });
    setErrors({});
    setStep((s) => Math.min(2, s + 1));
  };

  const reset = () => {
    setStep(0);
    setLoanType("");
    setName("");
    setPhone("");
    setCity("");
    setConsent(false);
    setStatus("idle");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = t.contact.errors.name;
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""))) errs.phone = t.contact.errors.phone;
    if (!consent) errs.consent = t.contact.errors.consent;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      await submitLead({
        loanType, amount, income,
        name: name.trim(),
        phone: phone.replace(/\D/g, ""),
        city: city.trim(),
        language: lang,
        submittedAt: new Date().toISOString(),
        source: "website-hero-form",
      });
      setStatus("done");
    } catch {
      setStatus("error");
      setErrors({ form: t.contact.errors.generic });
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-sand-50">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-40 bottom-0 size-[30rem] rounded-full bg-brand-400/[0.09] blur-[110px]" />
        <div className="absolute -right-40 top-0 size-[28rem] rounded-full bg-navy-400/[0.09] blur-[110px]" />
      </div>

      <div className="container">
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.heading} sub={t.contact.sub} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* ── form ── */}
          <Reveal>
            <Wobble intensity={0.16}>
            <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-lift">
              {/* stepper */}
              <div className="flex items-center gap-2 border-b border-navy-100 px-4 py-4 sm:px-6 sm:py-5 md:px-8">
                {t.contact.steps.map((s, i) => (
                  <div key={s} className="flex flex-1 items-center gap-2">
                    <span
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-bold transition-colors duration-300",
                        status === "done" || i < step
                          ? "bg-brand-500 text-white"
                          : i === step
                            ? "bg-navy-900 text-white"
                            : "bg-navy-100 text-navy-400",
                      )}
                    >
                      {status === "done" || i < step ? <Check className="size-3.5" strokeWidth={3.5} /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        "hidden text-[13px] font-semibold transition-colors sm:block",
                        i <= step ? "text-navy-900" : "text-navy-400",
                      )}
                    >
                      {s}
                    </span>
                    {i < 2 && <span className="h-px flex-1 bg-navy-100" />}
                  </div>
                ))}
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {status === "done" ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="py-10 text-center"
                    >
                      <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-500/12">
                        <CheckCircle2 className="size-8 text-brand-600" strokeWidth={2} />
                      </span>
                      <h3 className="mt-5 font-display text-xl font-extrabold text-navy-900">
                        {t.contact.successTitle}
                      </h3>
                      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-navy-500">
                        {t.contact.successBody}
                      </p>
                      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                        <a href={wa} target="_blank" rel="noopener noreferrer">
                          <Button variant="whatsapp" className="w-full sm:w-auto">
                            <MessageCircle />
                            {t.contact.whatsappBtn}
                          </Button>
                        </a>
                        <Button variant="ghost" onClick={reset}>
                          {t.contact.successAgain}
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={onSubmit}>
                      <TransitionPanel activeIndex={step} custom={stepDirection.current}>
                        {[
                          <div key="loan">
                          <h3 className="font-display text-lg font-bold text-navy-900">{t.contact.q1}</h3>
                          <div className="mt-5 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
                            <AnimatedBackground
                              value={loanType || null}
                              onValueChange={(id) => {
                                if (!id) return;
                                setLoanType(id);
                                setErrors({});
                              }}
                              className="rounded-xl bg-brand-50 shadow-[0_0_0_3px_rgba(14,159,110,0.1)]"
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            >
                              {t.contact.loanTypes.map((lt) => (
                                <button
                                  key={lt}
                                  type="button"
                                  data-id={lt}
                                  className={cn(
                                    "min-h-12 w-full rounded-xl border px-3.5 py-3.5 text-left text-[13.5px] font-semibold transition-colors duration-200 sm:px-4 sm:text-[14px]",
                                    loanType === lt
                                      ? "border-brand-500 text-brand-700"
                                      : "border-navy-200 bg-white text-navy-600 hover:border-navy-300 hover:bg-sand-50",
                                  )}
                                >
                                  {lt}
                                </button>
                              ))}
                            </AnimatedBackground>
                          </div>
                          {errors.type && <p className="mt-3 text-[13px] font-medium text-red-600">{errors.type}</p>}
                          </div>,

                          <div key="amounts" className="flex flex-col gap-8">
                          <RangeField
                            label={t.contact.q2Amount}
                            hint={t.contact.q2AmountHint}
                            value={amount}
                            min={100000}
                            max={100000000}
                            step={100000}
                            onChange={setAmount}
                            display={short(amount)}
                            minLabel={short(100000)}
                            maxLabel={short(100000000)}
                          />
                          <RangeField
                            label={t.contact.q2Income}
                            hint={t.contact.q2IncomeHint}
                            value={income}
                            min={200000}
                            max={50000000}
                            step={100000}
                            onChange={setIncome}
                            display={short(income)}
                            minLabel={short(200000)}
                            maxLabel={short(50000000)}
                          />
                          </div>,

                          <div key="details" className="flex flex-col gap-5">
                          <div>
                            <Label htmlFor="name">{t.contact.q3Name}</Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder={t.contact.q3NamePh}
                              autoComplete="name"
                            />
                            {errors.name && <p className="mt-1.5 text-[13px] font-medium text-red-600">{errors.name}</p>}
                          </div>
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <Label htmlFor="phone">{t.contact.q3Phone}</Label>
                              <div className="flex">
                                <span className="grid h-12 place-items-center rounded-l-xl border border-r-0 border-navy-200 bg-sand-50 px-3 text-[15px] font-semibold text-navy-500">
                                  +91
                                </span>
                                <Input
                                  id="phone"
                                  type="tel"
                                  inputMode="numeric"
                                  maxLength={10}
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                  placeholder={t.contact.q3PhonePh}
                                  autoComplete="tel"
                                  className="rounded-l-none"
                                />
                              </div>
                              {errors.phone && <p className="mt-1.5 text-[13px] font-medium text-red-600">{errors.phone}</p>}
                            </div>
                            <div>
                              <Label htmlFor="city">{t.contact.q3City}</Label>
                              <Input
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder={t.contact.q3CityPh}
                                autoComplete="address-level2"
                              />
                            </div>
                          </div>

                          <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-sand-50 p-4">
                            <input
                              type="checkbox"
                              checked={consent}
                              onChange={(e) => setConsent(e.target.checked)}
                              className="mt-0.5 size-4 shrink-0 accent-brand-500"
                            />
                            <span className="text-[13.5px] leading-relaxed text-navy-600">{t.contact.q3Consent}</span>
                          </label>
                          {errors.consent && <p className="text-[13px] font-medium text-red-600">{errors.consent}</p>}
                          {errors.form && <p className="text-[13px] font-medium text-red-600">{errors.form}</p>}
                          </div>,
                        ]}
                      </TransitionPanel>

                      {/* actions */}
                      <div className="mt-8 flex items-center gap-3">
                        {step > 0 && (
                          <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
                            <ArrowLeft />
                            {t.contact.back}
                          </Button>
                        )}
                        <div className="flex-1" />
                        {step < 2 ? (
                          <Button type="button" onClick={next} className="group">
                            {t.contact.next}
                            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                          </Button>
                        ) : (
                          <Button type="submit" variant="accent" disabled={status === "sending"}>
                            <Send />
                            {status === "sending" ? t.contact.submitting : t.contact.submit}
                          </Button>
                        )}
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>

              {/* whatsapp fallback */}
              {status !== "done" && (
                <div className="flex flex-col items-center gap-3 border-t border-navy-100 bg-sand-50 px-6 py-5 sm:flex-row sm:justify-between md:px-8">
                  <p className="text-[14px] font-medium text-navy-500">{t.contact.whatsapp}</p>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button variant="whatsapp" size="sm" className="w-full">
                      <MessageCircle />
                      {t.contact.whatsappBtn}
                    </Button>
                  </a>
                </div>
              )}
            </div>
            </Wobble>
          </Reveal>

          {/* ── side panel ── */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
                <div className="flex flex-col gap-4">
                  <a href={`tel:${t.brand.phoneHref}`} className="group flex items-center gap-3.5 rounded-xl transition-colors duration-200 hover:bg-sand-50 -mx-2 px-2 py-1.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy-900 text-white transition-all duration-200 ease-out group-hover:scale-105 group-hover:bg-brand-500">
                      <Phone className="size-[18px]" strokeWidth={2} />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[12px] font-semibold uppercase tracking-wide text-navy-400">
                        {t.contact.call}
                      </span>
                      <span className="font-display text-[15px] font-bold text-navy-900">{t.brand.phone}</span>
                    </span>
                  </a>
                  <div className="hairline" />
                  <a href={`mailto:${t.brand.email}`} className="group flex items-center gap-3.5 rounded-xl transition-colors duration-200 hover:bg-sand-50 -mx-2 px-2 py-1.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy-900/[0.06] text-navy-700 transition-all duration-200 ease-out group-hover:scale-105 group-hover:bg-navy-900 group-hover:text-white">
                      <Mail className="size-[18px]" strokeWidth={2} />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[12px] font-semibold uppercase tracking-wide text-navy-400">Email</span>
                      <span className="font-display text-[15px] font-bold text-navy-900">{t.brand.email}</span>
                    </span>
                  </a>
                  <div className="hairline" />
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy-900/[0.06] text-navy-700">
                      <MapPin className="size-[18px]" strokeWidth={2} />
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block text-[12px] font-semibold uppercase tracking-wide text-navy-400">Office</span>
                      <span className="block font-display text-[14px] font-bold leading-snug text-navy-900">{t.brand.address}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
                {t.contact.trust.map((tr) => (
                  <div key={tr.title} className="flex gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/12">
                      <Check className="size-3 text-brand-600" strokeWidth={4} />
                    </span>
                    <div>
                      <p className="text-[14px] font-bold text-navy-900">{tr.title}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-navy-500">{tr.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

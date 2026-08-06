import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLang } from "@/i18n";
import { scrollToId } from "@/lib/utils";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-16 text-white/70 pb-24 md:pb-0">
      <div aria-hidden className="absolute -left-40 top-0 size-[26rem] rounded-full bg-brand-500/[0.07] blur-[110px]" />

      <div className="container relative">
        <div className="grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Logo mono />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/50">{t.footer.about}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={t.brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-xl border border-white/10 text-white/60 transition-all duration-200 ease-out hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-brand-300 hover:-translate-y-0.5 active:scale-95"
              >
                <Instagram className="size-[18px]" />
              </a>
              <a
                href={t.brand.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid size-10 place-items-center rounded-xl border border-white/10 text-white/60 transition-all duration-200 ease-out hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-brand-300 hover:-translate-y-0.5 active:scale-95"
              >
                <Linkedin className="size-[18px]" />
              </a>
              <LanguageToggle className="ml-1 border-white/15 bg-white/5" compact />
            </div>
          </div>

          <div>
            <p className="font-display text-[13px] font-bold uppercase tracking-wider text-white">
              {t.footer.quickLinks}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {t.nav.links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="text-[14px] text-white/55 transition-colors duration-200 hover:text-brand-300"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-[13px] font-bold uppercase tracking-wider text-white">
              {t.footer.servicesTitle}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {t.footer.servicesList.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToId("services")}
                    className="text-left text-[14px] text-white/55 transition-colors duration-200 hover:text-brand-300"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-[13px] font-bold uppercase tracking-wider text-white">
              {t.footer.contactTitle}
            </p>
            <ul className="mt-4 flex flex-col gap-3.5">
              <li>
                <a href={`tel:${t.brand.phoneHref}`} className="flex items-start gap-2.5 text-[14px] text-white/55 transition-colors duration-200 hover:text-brand-300">
                  <Phone className="mt-0.5 size-4 shrink-0" />
                  {t.brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${t.brand.email}`} className="flex items-start gap-2.5 text-[14px] text-white/55 transition-colors duration-200 hover:text-brand-300">
                  <Mail className="mt-0.5 size-4 shrink-0" />
                  {t.brand.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[14px] text-white/55">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {t.brand.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <p className="text-[12px] leading-relaxed text-white/35">{t.footer.disclaimer}</p>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-[13px] text-white/40">
            © {year} {t.brand.name}. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[13px] text-white/40 transition-colors duration-200 hover:text-brand-300">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-[13px] text-white/40 transition-colors duration-200 hover:text-brand-300">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

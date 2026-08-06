import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLang } from "@/i18n";
import { cn, scrollToId } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = t.nav.links.map((l) => l.id);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [t.nav.links]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close drawer when resizing up to desktop nav
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(id), open ? 220 : 0);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out",
          scrolled || open
            ? "border-b border-navy-100 bg-white/90 shadow-soft backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <nav className="container flex items-center gap-2 py-3.5 sm:gap-3 sm:py-4 md:py-5">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="KD Capitals — home"
            className="min-h-11 shrink-0 rounded-xl transition-opacity duration-200 hover:opacity-80 active:scale-[0.98]"
          >
            <Logo />
          </button>

          {/* Desktop links only from xl — avoids crush on tablet / Hindi */}
          <ul className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0 xl:flex">
            {t.nav.links.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => go(l.id)}
                    className={cn(
                      "group relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-semibold transition-colors duration-200 2xl:px-3.5 2xl:text-[14px]",
                      isActive ? "text-navy-900" : "text-navy-500 hover:text-navy-900",
                    )}
                  >
                    <span className="relative z-10">{l.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-0 rounded-full bg-navy-900/[0.07]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {!isActive && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-0 rounded-full bg-navy-900/[0.045] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LanguageToggle compact className="hidden sm:inline-flex" />
            <a
              href={`tel:${t.brand.phoneHref}`}
              title={t.brand.phone}
              aria-label={t.brand.phone}
              className="hidden 2xl:inline-flex"
            >
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 px-3 text-[12px] font-semibold [&_svg]:size-3.5"
              >
                <Phone />
                {t.brand.phone}
              </Button>
            </a>
            <Button
              size="sm"
              className="hidden h-9 px-3.5 text-[13px] lg:inline-flex"
              onClick={() => go("contact")}
            >
              {t.nav.cta}
            </Button>
            <button
              type="button"
              className={cn(
                "relative grid size-11 place-items-center rounded-full border bg-white text-navy-900 xl:hidden",
                "transition-all duration-300 ease-out",
                "hover:border-navy-300 hover:bg-sand-50 hover:shadow-soft active:scale-95",
                open ? "border-navy-300 bg-sand-50 shadow-soft" : "border-navy-200",
              )}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="grid place-items-center"
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: easeOut }}
          >
            <motion.button
              type="button"
              aria-label={t.nav.close}
              className="absolute inset-0 bg-navy-950/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="absolute inset-x-0 top-[var(--nav-h)] bottom-0 flex flex-col border-t border-navy-100 bg-white shadow-lift"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.32, ease: easeOut }}
            >
              <div className="container flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain pb-10 pt-4">
                {t.nav.links.map((l, i) => {
                  const isActive = active === l.id;
                  return (
                    <motion.button
                      key={l.id}
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ delay: 0.03 * i + 0.06, duration: 0.28, ease: easeOut }}
                      onClick={() => go(l.id)}
                      className={cn(
                        "group flex min-h-12 items-center justify-between gap-3 border-b border-navy-100 py-4 text-left transition-colors duration-200",
                        "hover:border-navy-200 hover:bg-sand-50/80 active:bg-sand-100",
                        isActive ? "text-navy-900" : "text-navy-700",
                      )}
                    >
                      <span className="font-display text-lg font-bold tracking-tight transition-transform duration-200 group-hover:translate-x-1 sm:text-xl">
                        {l.label}
                      </span>
                      <span
                        className={cn(
                          "size-1.5 shrink-0 rounded-full transition-all duration-300",
                          isActive ? "scale-100 bg-brand-500" : "scale-75 bg-transparent group-hover:scale-100 group-hover:bg-navy-200",
                        )}
                      />
                    </motion.button>
                  );
                })}

                <motion.div
                  className="mt-6 flex flex-col gap-3 pb-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.3, ease: easeOut }}
                >
                  <Button size="lg" className="w-full" onClick={() => go("contact")}>
                    {t.nav.cta}
                  </Button>
                  <a href={`tel:${t.brand.phoneHref}`} className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                      <Phone />
                      {t.brand.phone}
                    </Button>
                  </a>
                  <LanguageToggle className="mx-auto mt-2" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

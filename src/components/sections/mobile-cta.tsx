import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { useLang } from "@/i18n";
import { scrollToId, whatsappHref } from "@/lib/utils";

/** Always-reachable action bar on mobile — the single biggest conversion lever
 *  for users who won't scroll back up to find a button. */
export function MobileCta() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = whatsappHref(t.brand.whatsapp, t.contact.whatsappMsg);

  return (
    <>
      {/* mobile bar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 px-3 pt-3 backdrop-blur-xl md:hidden"
            style={{
              paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
              paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
              paddingRight: "max(0.75rem, env(safe-area-inset-right))",
            }}
          >
            <div className="flex gap-2.5">
              <a
                href={`tel:${t.brand.phoneHref}`}
                aria-label={t.brand.phone}
                className="grid size-12 shrink-0 place-items-center rounded-full border border-navy-200 text-navy-900 transition-all duration-200 ease-out active:scale-95"
              >
                <Phone className="size-5" />
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contact.whatsappBtn}
                className="grid size-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white transition-all duration-200 ease-out active:scale-95"
              >
                <MessageCircle className="size-5" />
              </a>
              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className="h-12 min-w-0 flex-1 truncate rounded-full bg-navy-900 px-4 text-[14px] font-semibold text-white transition-all duration-200 ease-out active:scale-[0.98] sm:text-[15px]"
              >
                {t.nav.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* desktop floating whatsapp */}
      <AnimatePresence>
        {show && (
          <motion.a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contact.whatsappBtn}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="fixed bottom-7 right-7 z-40 hidden size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105 md:grid"
            style={{
              bottom: "max(1.75rem, env(safe-area-inset-bottom))",
              right: "max(1.75rem, env(safe-area-inset-right))",
            }}
          >
            <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-pulse-ring" />
            <MessageCircle className="relative size-6" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}

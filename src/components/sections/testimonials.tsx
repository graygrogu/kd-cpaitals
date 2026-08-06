import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useLang } from "@/i18n";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const children = Array.from(track.children) as HTMLElement[];
      const mid = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let best = Infinity;
      children.forEach((c, i) => {
        const center = c.offsetLeft - track.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(center - mid);
        if (d < best) {
          best = d;
          closest = i;
        }
      });
      setIndex(closest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const count = t.testimonials.items.length;

  return (
    <section id="testimonials" className="section-pad relative overflow-hidden bg-navy-900">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -left-32 top-0 size-[30rem] rounded-full bg-brand-500/10 blur-[110px]" />
        <div className="absolute -right-32 bottom-0 size-[26rem] rounded-full bg-navy-400/15 blur-[110px]" />
      </div>

      <div className="container relative">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-300 backdrop-blur">
            <span className="size-1.5 rounded-full bg-brand-400" />
            {t.testimonials.eyebrow}
          </span>
          <h2 className="h2 mx-auto max-w-3xl text-balance text-white">{t.testimonials.heading}</h2>
          <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-white/55">{t.testimonials.sub}</p>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
          role="region"
          aria-label={t.testimonials.heading}
        >
          {t.testimonials.items.map((item, i) => (
            <motion.figure
              key={item.name + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: Math.min(i, 3) * 0.06 }}
              className="flex w-[86vw] shrink-0 snap-center flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-sm sm:w-[26rem]"
            >
              <div className="flex items-center justify-between">
                <Quote className="size-6 text-brand-400/50" />
                <div className="flex gap-0.5" aria-label="5 out of 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-brand-400 text-brand-400" />
                  ))}
                </div>
              </div>
              <blockquote className="mt-5 flex-1 text-[15px] leading-[1.7] text-white/80">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-500/20 font-display text-sm font-extrabold text-brand-300">
                  {item.name.trim()[0]}
                </span>
                <div className="leading-tight">
                  <p className="font-display text-[14.5px] font-bold text-white">{item.name}</p>
                  <p className="mt-0.5 text-[12.5px] text-white/45">{item.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={() => scrollTo(Math.max(0, index - 1))}
            disabled={index === 0}
            aria-label="Previous"
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-200 ease-out hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex items-center gap-1">
            {t.testimonials.items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="grid h-11 w-8 place-items-center"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300 ease-out",
                    i === index ? "w-6 bg-brand-400" : "w-1.5 bg-white/25",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo(Math.min(count - 1, index + 1))}
            disabled={index === count - 1}
            aria-label="Next"
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-200 ease-out hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

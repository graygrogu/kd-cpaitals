import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { LenderMark } from "@/components/ui/logo";
import { useLang } from "@/i18n";

export function Lenders() {
  const { t } = useLang();
  const half = Math.ceil(t.lenders.list.length / 2);

  return (
    <section id="lenders" className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="container">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center font-display text-[1.5rem] font-bold tracking-tight text-navy-900 md:text-[2rem]">
            {t.lenders.heading}
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-10">
        <div className="mask-fade-x flex flex-col gap-4">
          <Marquee duration="46s">
            {t.lenders.list.slice(0, half).map((n) => (
              <LenderMark key={n} name={n} />
            ))}
          </Marquee>
          <Marquee duration="54s" reverse>
            {t.lenders.list.slice(half).map((n) => (
              <LenderMark key={n} name={n} />
            ))}
          </Marquee>
        </div>
      </Reveal>

      <div className="container">
        <p className="mx-auto mt-8 max-w-2xl text-center text-[12px] leading-relaxed text-navy-400">
          {t.lenders.note}
        </p>
      </div>
    </section>
  );
}

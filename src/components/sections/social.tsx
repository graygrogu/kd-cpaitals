import { ArrowUpRight, Instagram } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Wobble } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n";
import { cn } from "@/lib/utils";

/** Covers of the posts on https://www.instagram.com/kdcapitals9/ — each tile opens that post. */
const POSTS = [
  {
    href: "https://www.instagram.com/kdcapitals9/reel/DMhzo4jy2f4/",
    image: "/instagram/DMhzo4jy2f4.jpg",
    alt: "How Loan Against Securities Is Beneficial",
  },
  {
    href: "https://www.instagram.com/kdcapitals9/reel/DVduc0EiHdS/",
    image: "/instagram/DVduc0EiHdS.jpg",
    alt: "CGTMSE loan for MSMEs",
  },
  {
    href: "https://www.instagram.com/kdcapitals9/reel/DU2hcREjYca/",
    image: "/instagram/DU2hcREjYca.jpg",
    alt: "Filed low ITR — no need to worry",
  },
  {
    href: "https://www.instagram.com/kdcapitals9/reel/DV_JqxViNUd/",
    image: "/instagram/DV_JqxViNUd.jpg",
    alt: "Don't avail a home loan before this",
  },
  {
    href: "https://www.instagram.com/kdcapitals9/reel/DJ6kd3sS7sn/",
    image: "/instagram/DJ6kd3sS7sn.jpg",
    alt: "POV: OD is better than CC",
  },
  {
    href: "https://www.instagram.com/kdcapitals9/p/DUr8LoEiOdB/",
    image: "/instagram/DUr8LoEiOdB.jpg",
    alt: "Under-construction property — things to check",
    wide: true,
  },
] as const;

export function Social() {
  const { t } = useLang();

  return (
    <section id="social" className="section-pad bg-white">
      <div className="container">
        <SectionHeading eyebrow={t.social.eyebrow} title={t.social.heading} sub={t.social.sub} />

        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3" stagger={0.06}>
          {POSTS.map((post) => (
            <StaggerItem key={post.href}>
              <Wobble intensity={0.18}>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-2xl border border-navy-100 bg-navy-950 shadow-ring transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
                >
                  <img
                    src={post.image}
                    alt={post.alt}
                    className={cn("w-full object-cover", "wide" in post && post.wide ? "aspect-[4/5]" : "aspect-[9/16]")}
                  />
                  <span className="pointer-events-none absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-navy-950/55 text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
                    <Instagram className="size-4" />
                    <span className="sr-only">{t.social.handle}</span>
                  </span>
                  <ArrowUpRight className="pointer-events-none absolute bottom-2.5 right-2.5 size-4 text-white opacity-0 drop-shadow transition-opacity duration-200 group-hover:opacity-100" />
                </a>
              </Wobble>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 flex justify-center">
          <a href={t.brand.instagram} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              <Instagram />
              {t.social.cta}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

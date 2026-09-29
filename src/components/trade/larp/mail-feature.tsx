import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowUpRight } from "@/components/ui/icons";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { mailDetails, mailSet } from "./mail-assets";

/**
 * Landing-page spotlight for LARP & Historical Goods: the mail set on a lit
 * stage with three close-ups, linking to the showcase on the trade-line page.
 */
export function MailFeature({ trade, href, className }: { trade: SiteContent["trades"]["larp"]; href: string; className?: string }) {
  const showcase = trade.showcase;
  if (!showcase) return null;
  const thumbs = showcase.details.filter((d) => d.key !== "collar" && d.key !== "mantle");

  return (
    <Reveal className={className}>
      <Link
        href={href}
        className="elevate group/feature relative grid overflow-hidden rounded-xl bg-ink-950 text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-ink lg:grid-cols-12"
      >
        <div className="relative flex flex-col p-8 md:p-12 lg:col-span-5">
          <Eyebrow>
            {showcase.eyebrow} · {trade.name}
          </Eyebrow>
          <h3 className="t-display-sm mt-7 max-w-[16ch] text-ivory">
            {showcase.title}
          </h3>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-mist">{showcase.text}</p>
          <div className="mt-auto flex items-end justify-between gap-6 pt-10">
            <ul className="flex gap-2.5">
              {thumbs.map((d, i) => (
                <li
                  key={d.key}
                  className="relative h-16 w-16 overflow-hidden rounded-md border border-white/12 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/feature:-translate-y-1 md:h-20 md:w-20"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <Image src={mailDetails[d.key].src} alt="" fill sizes="80px" className="object-cover" />
                </li>
              ))}
            </ul>
            <span className="inline-flex shrink-0 items-center gap-3 text-[0.875rem] font-medium">
              <span className="hidden sm:inline">{trade.name}</span>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover/feature:rotate-45 group-hover/feature:border-gold group-hover/feature:bg-gold group-hover/feature:text-ink">
                <ArrowUpRight size={16} />
              </span>
            </span>
          </div>
        </div>

        <div className="relative min-h-[20rem] overflow-hidden bg-[radial-gradient(80%_75%_at_50%_8%,rgb(226_207_152/0.24),transparent_65%),radial-gradient(120%_90%_at_50%_100%,#0f2a2a,#020c0c)] md:min-h-[26rem] lg:col-span-7">
          <span aria-hidden className="absolute inset-y-0 left-0 z-10 hidden w-32 bg-gradient-to-r from-ink-950 to-transparent lg:block" />
          <span aria-hidden className="absolute inset-x-[12%] bottom-[7%] h-[12%] rounded-[50%] bg-black/60 blur-2xl" />
          <div
            className={cn(
              "absolute inset-x-[5%] bottom-[4%] top-[6%] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)]",
              "group-hover/feature:-translate-y-2 group-hover/feature:scale-[1.04]",
            )}
          >
            <Image
              src={mailSet.src}
              alt={showcase.setCaption}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-contain drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)]"
            />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

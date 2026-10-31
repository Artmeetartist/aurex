import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import type { SiteContent } from "@/content/types";
import { mailDetails, mailSet } from "./mail-assets";

/**
 * Landing-page spotlight for LARP & Historical Goods: the mail set on a flat
 * ink stage with three close-ups, linking to the showcase on the trade-line page.
 */
export function MailFeature({ trade, href, className }: { trade: SiteContent["trades"]["larp"]; href: string; className?: string }) {
  const showcase = trade.showcase;
  if (!showcase) return null;
  const thumbs = showcase.details.filter((d) => d.key !== "collar" && d.key !== "mantle");

  return (
    <Reveal className={className}>
      <Link
        href={href}
        className="group/feature grid overflow-hidden rounded-xl bg-ink-950 text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-ink lg:grid-cols-12"
      >
        <div className="flex flex-col p-8 md:p-12 lg:col-span-5">
          <h3 className="t-display-sm max-w-[16ch] text-ivory">{showcase.title}</h3>
          <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ivory/85">{showcase.text}</p>
          <div className="mt-auto pt-10">
            <ul className="flex gap-2.5">
              {thumbs.map((d, i) => (
                <li
                  key={d.key}
                  className="relative h-16 w-16 overflow-hidden rounded-md bg-ink-850 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/feature:-translate-y-1 md:h-20 md:w-20"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <Image src={mailDetails[d.key].src} alt="" fill sizes="80px" className="object-cover" />
                </li>
              ))}
            </ul>
            <span className="mt-8 flex items-center justify-between gap-4 text-[1rem] font-medium">
              {trade.name}
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-800 transition-[background-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover/feature:rotate-45 group-hover/feature:bg-gold group-hover/feature:text-ink">
                <ArrowUpRight size={16} />
              </span>
            </span>
          </div>
        </div>

        <div className="relative min-h-[20rem] overflow-hidden bg-ink-850 md:min-h-[26rem] lg:col-span-7">
          <div className="absolute inset-x-[5%] bottom-[4%] top-[6%] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover/feature:-translate-y-2 group-hover/feature:scale-[1.04]">
            <Image src={mailSet.src} alt={showcase.setCaption} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

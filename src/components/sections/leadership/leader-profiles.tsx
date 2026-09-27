import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { LogoMark } from "@/components/brand/logo";
import { StatusTag } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { leaders } from "@/content/facts";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Leadership team, for an ink surface. Profiles appear only once confirmed in
 * `facts.leaders`; until then a neutral note renders — never placeholder
 * people, silhouettes or names.
 */
export function LeaderProfiles({ content, index }: { content: SiteContent; index?: string }) {
  const copy = content.leadership.profiles;
  const empty = leaders.length === 0;
  // Nothing is published until profiles are confirmed: no placeholder state on a public page.
  if (empty) return null;

  return (
    <div className={cn("container-x", empty && "grid gap-12 lg:grid-cols-12 lg:items-end")}>
      <SectionHeading
        index={index}
        eyebrow={copy.eyebrow}
        title={copy.title}
        accent={copy.accent}
        intro={copy.intro}
        size="md"
        className={cn(empty && "lg:col-span-5")}
      />

      {empty ? (
        <Reveal
          delay={0.1}
          className="relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-850/70 px-7 py-12 sm:px-10 md:px-14 md:py-16 lg:col-span-7"
        >
          <LogoMark className="pointer-events-none absolute -bottom-10 -right-8 -z-10 h-56 w-56 text-ivory opacity-[0.05] md:h-72 md:w-72" />
          <span aria-hidden className="block h-px w-12 bg-gold" />
          <p className="mt-9 max-w-xl text-[clamp(1.375rem,2.1vw,1.875rem)] font-light leading-[1.3] tracking-[-0.022em] text-ivory [text-wrap:pretty]">
            {copy.empty}
          </p>
          <StatusTag className="mt-10">{content.common.comingSoon}</StatusTag>
        </Reveal>
      ) : (
        <RevealGroup as="ul" className="mt-16 grid gap-x-5 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {leaders.map((leader) => (
            <RevealItem as="li" key={leader.name}>
              <article>
                {leader.portrait && (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ink-850">
                    <Image
                      src={leader.portrait}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover saturate-[0.85]"
                    />
                    <div aria-hidden className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10" />
                  </div>
                )}
                <div className={cn("border-t border-white/10 pt-6", leader.portrait && "mt-7")}>
                  <h3 className="t-title font-normal text-ivory">{leader.name}</h3>
                  <p className="t-eyebrow mt-3 text-gold">{leader.role}</p>
                  {leader.bio && <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-mist">{leader.bio}</p>}
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}

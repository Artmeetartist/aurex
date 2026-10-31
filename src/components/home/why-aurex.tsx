import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/content/types";

/** Why AUREX: the heading and a picture of the corridors beside four commitments. */
export function WhyAurex({ content }: { content: SiteContent }) {
  const copy = content.home.why;

  return (
    <section className="surface-ivory section-y relative">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <SectionHeading title={copy.title} intro={copy.intro} tone="dark" size="md" />
          <Reveal delay={0.15} className="relative mt-12 aspect-[4/3] overflow-hidden rounded-xl bg-ivory-200 lg:mt-14">
            <Image
              src="/media/stills/still-coast.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.06}
          className="grid content-start gap-10 sm:grid-cols-2 sm:gap-x-10 lg:col-span-6 lg:col-start-7 lg:grid-cols-1 lg:gap-12 lg:pt-3"
        >
          {copy.pillars.map((p) => (
            <RevealItem as="li" key={p.title} y={12}>
              <h3 className="t-display-sm text-ink">{p.title}</h3>
              <p className="t-body mt-3 max-w-lg text-ink/85">{p.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

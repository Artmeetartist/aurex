"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MaskText } from "@/components/motion/reveal";
import type { PageHero as PageHeroContent } from "@/content/types";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Inner-page opener: framed cinematic still with parallax, breadcrumb,
 * masked H1 and intro. Pass `image` without extension (webp is used).
 */
export function PageHero({
  hero,
  image,
  breadcrumb,
  children,
}: {
  hero: PageHeroContent;
  image?: string;
  breadcrumb: { home: string; homeHref: string; current: string };
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className={cn("surface-ink relative overflow-hidden", image ? "min-h-[86svh]" : "min-h-[62svh]")}
    >
      {image && (
        <div className="absolute inset-2 overflow-hidden rounded-[1.25rem] md:inset-3 md:rounded-[1.75rem]">
          <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
            <Image src={`${image}.webp`} alt="" fill priority sizes="100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        </div>
      )}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={cn(
          "container-x relative flex flex-col justify-end pb-16 pt-[calc(var(--header-h)+5rem)] md:pb-24",
          image ? "min-h-[86svh]" : "min-h-[62svh]",
        )}
      >
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          <ol className="t-eyebrow flex items-center gap-3 text-mist">
            <li>
              <Link href={breadcrumb.homeHref} className="hover:text-ivory">
                {breadcrumb.home}
              </Link>
            </li>
            <li aria-hidden className="h-px w-6 bg-gold/60" />
            <li aria-current="page" className="text-gold">
              {breadcrumb.current}
            </li>
          </ol>
        </motion.nav>

        <MaskText
          as="h1"
          text={hero.title}
          accent={hero.accent}
          delay={0.15}
          className="t-display-xl mt-8 max-w-[16ch] text-ivory"
        />

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            className="t-lead text-ivory/80 md:col-span-7 lg:col-span-6"
          >
            {hero.intro}
          </motion.p>
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }}
              className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9"
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

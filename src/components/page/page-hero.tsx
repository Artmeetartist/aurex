"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Photo } from "@/components/media/photo";
import { MaskText } from "@/components/motion/reveal";
import type { Photo as PhotoData } from "@/content/media";
import type { PageHero as PageHeroContent } from "@/content/types";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Inner-page opener: a framed cinematic image that tilts back in perspective
 * as the page scrolls, with breadcrumb, masked H1 and intro. Pass `image`
 * (local still, no extension) or `photo` (registry photo with fallback), and an
 * optional `tint` colour that gives a page its own atmosphere.
 */
export function PageHero({
  hero,
  image,
  photo,
  tint,
  breadcrumb,
  children,
}: {
  hero: PageHeroContent;
  image?: string;
  photo?: PhotoData;
  tint?: string;
  breadcrumb: { home: string; homeHref: string; current: string; parent?: { label: string; href: string } };
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const hasImage = Boolean(image || photo);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const frameRadius = useTransform(scrollYProgress, [0, 1], [28, 48]);
  const darken = useTransform(scrollYProgress, [0, 0.9], [0, 0.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className={cn("surface-ink relative overflow-hidden [perspective:1400px]", hasImage ? "min-h-[88svh]" : "min-h-[62svh]")}
    >
      {hasImage && (
        <motion.div
          style={{ rotateX: frameRotate, scale: frameScale, borderRadius: frameRadius }}
          className="elevate absolute inset-2 origin-top overflow-hidden bg-ink-850 will-change-transform md:inset-3"
        >
          <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
            {photo ? (
              <Photo photo={photo} eager />
            ) : (
              <Image src={`${image}.webp`} alt="" fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
            )}
          </motion.div>
          {tint && (
            <div aria-hidden className="absolute inset-0 mix-blend-soft-light" style={{ backgroundColor: tint, opacity: 0.55 }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/70 to-transparent" />
          <motion.div style={{ opacity: darken }} className="absolute inset-0 bg-ink" />
        </motion.div>
      )}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={cn(
          "container-x relative flex flex-col justify-end pb-16 pt-[calc(var(--header-h)+5rem)] md:pb-24",
          hasImage ? "min-h-[88svh]" : "min-h-[62svh]",
        )}
      >
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          <ol className="t-eyebrow flex flex-wrap items-center gap-x-3 text-mist">
            <li>
              <Link href={breadcrumb.homeHref} className="inline-flex min-h-11 items-center hover:text-ivory">
                {breadcrumb.home}
              </Link>
            </li>
            <li aria-hidden className="h-px w-6 bg-gold/60" />
            {breadcrumb.parent && (
              <>
                <li>
                  <Link href={breadcrumb.parent.href} className="inline-flex min-h-11 items-center hover:text-ivory">
                    {breadcrumb.parent.label}
                  </Link>
                </li>
                <li aria-hidden className="h-px w-6 bg-gold/60" />
              </>
            )}
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

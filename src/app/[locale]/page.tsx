import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Capital } from "@/components/home/capital";
import { GlobalReach } from "@/components/home/global-reach";
import { Hero } from "@/components/home/hero";
import { HomeContact } from "@/components/home/home-contact";
import { LeadershipTeaser } from "@/components/home/leadership-teaser";
import { Partnerships } from "@/components/home/partnerships";
import { Sectors } from "@/components/home/sectors";
import { ValueInMotion } from "@/components/home/value-in-motion";
import { WhoWeAre } from "@/components/home/who-we-are";
import { WhyAurex } from "@/components/home/why-aurex";
import { getContent } from "@/content/repository";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "home", await getContent(locale));
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getContent(locale);
  const { reach } = content.home;

  return (
    <>
      <Hero locale={locale} content={content} />
      <WhoWeAre locale={locale} content={content} />
      <ValueInMotion locale={locale} content={content} />
      <GlobalReach
        locale={locale}
        content={content}
        index="03"
        heading={{ eyebrow: reach.eyebrow, title: reach.title, accent: reach.accent, intro: reach.intro }}
        footnote={reach.footnote}
        link={{ label: reach.link, route: "presence" }}
      />
      <Sectors locale={locale} content={content} />
      <Capital locale={locale} content={content} />
      <WhyAurex content={content} />
      <Partnerships locale={locale} content={content} />
      <LeadershipTeaser locale={locale} content={content} />
      <HomeContact locale={locale} content={content} />
    </>
  );
}

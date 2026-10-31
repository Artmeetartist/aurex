import Image from "next/image";
import { StatusTag } from "@/components/ui/eyebrow";
import { ArrowRight } from "@/components/ui/icons";
import { mailSet } from "./mail-assets";

/** Hero vitrine for LARP & Historical Goods: the mail set on a solid ink panel, with a jump to the showcase. */
export function MailVitrine({
  name,
  status,
  caption,
  link,
}: {
  name: string;
  status: string;
  caption: string;
  link: { label: string; href: string };
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-ink-950">
      <div className="px-5 pt-5">
        <div className="flex items-start justify-between gap-4">
          <p className="t-lead font-medium text-ivory">{name}</p>
          <StatusTag className="mt-1.5 shrink-0 text-[0.875rem]">{status}</StatusTag>
        </div>
        <div className="relative mx-auto mt-2 w-full max-w-[20rem]" style={{ aspectRatio: `${mailSet.width} / ${mailSet.height}` }}>
          <Image
            src={mailSet.src}
            alt={caption}
            fill
            loading="eager"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 90vw"
            className="object-contain"
          />
        </div>
      </div>
      <a
        href={link.href}
        className="group/v flex min-h-12 items-center justify-between gap-4 bg-ink-850 px-5 py-3 text-[0.875rem] font-medium text-ivory transition-colors duration-300 hover:bg-ink-800 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold"
      >
        {link.label}
        <ArrowRight size={14} className="rotate-90 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/v:translate-y-0.5" />
      </a>
    </div>
  );
}

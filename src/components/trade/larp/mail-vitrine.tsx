import Image from "next/image";
import { StatusTag } from "@/components/ui/eyebrow";
import { ArrowRight } from "@/components/ui/icons";
import { mailSet } from "./mail-assets";

/** Hero vitrine for LARP & Historical Goods: the mail set under a warm spotlight. */
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
    <div className="glass relative overflow-hidden rounded-[1.5rem]">
      <div className="relative bg-[radial-gradient(90%_70%_at_50%_10%,rgb(226_207_152/0.22),transparent_70%)] px-5 pt-5">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[1.125rem] font-light tracking-[-0.02em] text-ivory">{name}</p>
          <StatusTag>{status}</StatusTag>
        </div>
        <div className="relative mx-auto mt-2 w-full max-w-[20rem]" style={{ aspectRatio: `${mailSet.width} / ${mailSet.height}` }}>
          <Image
            src={mailSet.src}
            alt={caption}
            fill
            loading="eager"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 90vw"
            className="object-contain drop-shadow-[0_24px_30px_rgb(0_0_0/0.6)]"
          />
        </div>
        <span aria-hidden className="absolute inset-x-10 bottom-1 h-6 rounded-[50%] bg-black/50 blur-xl" />
      </div>
      <a
        href={link.href}
        className="group/v relative flex min-h-12 items-center justify-between gap-4 border-t border-white/10 px-5 py-3 text-[0.875rem] text-ivory/85 transition-colors duration-300 hover:text-ivory"
      >
        {link.label}
        <ArrowRight size={14} className="rotate-90 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/v:translate-y-0.5" />
      </a>
    </div>
  );
}

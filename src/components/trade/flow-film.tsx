"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The AUREX footage (sea, air and land freight) as a muted loop in a frame.
 * It loads and plays only while in view; under reduced motion it rests on its
 * poster until the viewer presses play.
 */
export function FlowFilm({ labels, className }: { labels: { play: string; pause: string }; className?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(video, { margin: "200px 0px" });
  const [playing, setPlaying] = useState(false);
  /** "auto" follows view and motion preference until the viewer presses the button. */
  const [choice, setChoice] = useState<"auto" | "play" | "pause">("auto");

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const play = inView && (choice === "play" || (choice === "auto" && !reduce));
    if (play) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce, choice]);

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-ink-850", className)}>
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster="/media/hero/poster.webp"
        aria-hidden
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/media/hero/hero-854.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/media/hero/hero-1280.webm" type="video/webm" />
        <source src="/media/hero/hero-1280.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={() => setChoice(playing ? "pause" : "play")}
        aria-label={playing ? labels.pause : labels.play}
        className="absolute bottom-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-[4px] bg-ink-950 text-ivory transition-colors hover:bg-ink-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:bottom-4 md:right-4"
      >
        {playing ? (
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
            <path d="M1 0h2.5v12H1zM6.5 0H9v12H6.5z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
            <path d="M0 0l10 6-10 6z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}

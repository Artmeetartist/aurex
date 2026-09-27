#!/usr/bin/env bash
#
# Rebuilds public/media from the source hero clip (10 s, 1280×720, 24 fps).
#
#   scripts/process-media.sh <source.mp4> [out-dir]
#   FF=/path/to/ffmpeg scripts/process-media.sh source.mp4 public/media
#
# Needs an ffmpeg build with libx264, libvpx-vp9 and libwebp.
#
# Output (all paths relative to out-dir, default public/media):
#   hero/hero-1280.mp4   H.264 1280×720, seamless 9 s loop (desktop)
#   hero/hero-854.mp4    H.264 854×480, same loop (≤ 767 px viewports)
#   hero/hero-1280.webm  VP9 1280×720, same loop
#   hero/poster.webp|jpg first frame of the loop (video poster)
#   sequence/d/NNN.webp  120 frames @ 12 fps, 1280×720 (desktop scroll scrub)
#   sequence/m/NNN.webp  80 frames @ 8 fps, 720×576 centre crop (mobile scrub)
#   stills/still-*.webp|jpg  six stills used by pages (sea, air, coast, land,
#                        portland, connected)
#
# Settings are calibrated against the committed files: from the same clean
# master, ffmpeg 7.0 reproduces the H.264 renditions, posters, frame sequences
# and stills byte for byte (the WebM differs only in container UIDs). Other
# ffmpeg builds may differ in bytes, not visibly.
#
# Public media is served with an immutable, one-year Cache-Control in
# production (next.config.ts). If an output changes, publish it under a new
# file name and update the reference, or returning visitors keep the old file.

set -euo pipefail

FF="${FF:-ffmpeg}"
SRC="${1:?usage: $0 <source.mp4> [out-dir]}"
OUT="${2:-public/media}"

[[ -f "$SRC" ]] || { echo "Source not found: $SRC" >&2; exit 1; }
command -v "$FF" >/dev/null 2>&1 || { echo "ffmpeg not found (set FF=/path/to/ffmpeg)" >&2; exit 1; }

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

ff() { "$FF" -hide_banner -loglevel error -y "$@"; }
step() { printf '\n==> %s\n' "$*"; }

mkdir -p "$OUT/hero" "$OUT/sequence/d" "$OUT/sequence/m" "$OUT/stills"

# 1. Clean master: remove the generator watermark (bottom-right, 74×74 px) and
#    the audio track. Near-lossless intermediate.
step "Clean master"
ff -i "$SRC" -an -vf "delogo=x=1124:y=564:w=74:h=74" \
  -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p "$WORK/clean.mp4"

# 2. Seamless 9 s loop: play 1 s → 10 s, and cross-fade the last second into
#    the clip's first second, so the final frame flows back into frame one.
step "Seamless loop master"
ff -i "$WORK/clean.mp4" -filter_complex \
  "[0:v]split[s1][s2];[s1]trim=start=1,setpts=PTS-STARTPTS,fps=24[a];[s2]trim=0:1,setpts=PTS-STARTPTS,fps=24[b];[a][b]xfade=transition=fade:duration=1:offset=8,format=yuv420p" \
  -c:v libx264 -crf 10 -preset slow "$WORK/loop_master.mp4"

# 3. Hero loop deliverables (no audio; +faststart so playback starts early).
step "Hero video: hero-1280.mp4"
ff -i "$WORK/loop_master.mp4" -an \
  -c:v libx264 -profile:v high -crf 25 -preset veryslow -tune film -pix_fmt yuv420p \
  -movflags +faststart "$OUT/hero/hero-1280.mp4"

step "Hero video: hero-854.mp4"
ff -i "$WORK/loop_master.mp4" -an -vf "scale=854:-2:flags=lanczos" \
  -c:v libx264 -profile:v high -crf 27 -preset veryslow -pix_fmt yuv420p \
  -movflags +faststart "$OUT/hero/hero-854.mp4"

step "Hero video: hero-1280.webm"
ff -i "$WORK/loop_master.mp4" -an \
  -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p "$OUT/hero/hero-1280.webm"

step "Poster (first frame of the loop)"
ff -i "$WORK/loop_master.mp4" -frames:v 1 -c:v libwebp -quality 78 "$OUT/hero/poster.webp"
ff -i "$WORK/loop_master.mp4" -frames:v 1 -q:v 3 "$OUT/hero/poster.jpg"

# 4. Scroll-scrubbed frame sequences (drawn to a canvas by value-in-motion.tsx).
#    Stale frames are removed first so counts always match the component.
step "Frame sequence: desktop (12 fps → 120 frames)"
rm -f "$OUT"/sequence/d/*.webp
ff -i "$WORK/clean.mp4" -vf "fps=12" -c:v libwebp -quality 66 -compression_level 6 "$OUT/sequence/d/%03d.webp"

step "Frame sequence: mobile (8 fps, 900×720 centre crop → 720 wide, 80 frames)"
rm -f "$OUT"/sequence/m/*.webp
ff -i "$WORK/clean.mp4" -vf "fps=8,crop=900:720:190:0,scale=720:-2:flags=lanczos" -c:v libwebp -quality 62 -compression_level 6 "$OUT/sequence/m/%03d.webp"

# 5. Stills: one frame per travel mode, as WebP (primary) and JPEG (fallback).
step "Stills"
stills=(
  "sea 0.4"
  "air 3.9"
  "coast 6.0"
  "land 7.4"
  "portland 8.4"
  "connected 9.9"
)
for entry in "${stills[@]}"; do
  read -r name at <<<"$entry"
  ff -ss "$at" -i "$WORK/clean.mp4" -frames:v 1 -c:v libwebp -quality 82 "$OUT/stills/still-$name.webp"
  ff -ss "$at" -i "$WORK/clean.mp4" -frames:v 1 -q:v 2 "$OUT/stills/still-$name.jpg"
done

step "Done"
printf 'desktop frames: %s, mobile frames: %s\n' \
  "$(find "$OUT/sequence/d" -name '*.webp' | wc -l | tr -d ' ')" \
  "$(find "$OUT/sequence/m" -name '*.webp' | wc -l | tr -d ' ')"
du -sh "$OUT"/hero/* "$OUT"/sequence/d "$OUT"/sequence/m "$OUT"/stills 2>/dev/null || true

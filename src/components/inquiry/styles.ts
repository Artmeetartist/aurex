/**
 * Surface-aware class sets for the inquiry form.
 * "dark" sits on ink surfaces, "light" on ivory (gold-ink and stone for AA contrast).
 */
export type Surface = "dark" | "light";

export const tones = {
  dark: {
    text: "text-ivory",
    muted: "text-mist",
    faint: "text-mist-dim",
    label: "text-ivory/80",
    control:
      "border-white/15 bg-white/[0.025] text-ivory placeholder:text-mist-dim/80 hover:border-white/30 focus:border-gold focus:ring-gold/25",
    controlInvalid: "border-[#e8a292]/70 hover:border-[#e8a292]",
    error: "text-[#f0ab9c]",
    alert: "border-[#f0ab9c]/30 bg-[#f0ab9c]/[0.06] text-[#f5c1b5]",
    option: "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]",
    optionChecked: "border-gold/70 bg-gold/[0.07] hover:border-gold/70 hover:bg-gold/[0.07]",
    radio: "border-white/30",
    radioChecked: "border-gold",
    radioDot: "bg-gold",
    index: "text-mist-dim",
    indexChecked: "text-gold",
    checkbox: "border-white/35 bg-white/[0.03] checked:border-gold checked:bg-gold hover:border-white/60",
    checkboxMark: "text-ink",
    link: "text-gold-soft underline decoration-gold/40 underline-offset-4 hover:decoration-gold",
    rule: "border-white/10",
    successRing: "border-gold/40 text-gold",
  },
  light: {
    text: "text-ink",
    muted: "text-stone",
    faint: "text-stone",
    label: "text-ink/75",
    control:
      "border-ink/15 bg-white/60 text-ink placeholder:text-stone/70 hover:border-ink/30 focus:border-gold-ink focus:ring-gold-ink/15",
    controlInvalid: "border-[#9f3a2c]/60 hover:border-[#9f3a2c]",
    error: "text-[#9f3a2c]",
    alert: "border-[#9f3a2c]/25 bg-[#9f3a2c]/[0.05] text-[#8a2f22]",
    option: "border-ink/10 bg-white/40 hover:border-ink/25 hover:bg-white/70",
    optionChecked: "border-gold-ink/60 bg-gold/[0.09] hover:border-gold-ink/60 hover:bg-gold/[0.09]",
    radio: "border-ink/30",
    radioChecked: "border-gold-ink",
    radioDot: "bg-gold-ink",
    index: "text-stone",
    indexChecked: "text-gold-ink",
    checkbox: "border-ink/30 bg-white/60 checked:border-ink checked:bg-ink hover:border-ink/60",
    checkboxMark: "text-ivory",
    link: "text-gold-ink underline decoration-gold-ink/40 underline-offset-4 hover:decoration-gold-ink",
    rule: "border-ink/10",
    successRing: "border-gold-ink/40 text-gold-ink",
  },
} satisfies Record<Surface, Record<string, string>>;

export type Tone = (typeof tones)[Surface];

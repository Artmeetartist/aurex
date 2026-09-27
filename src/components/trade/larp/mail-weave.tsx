/**
 * Procedural European 4-in-1 mail: interlocking steel rings drawn as an SVG
 * pattern, draped with soft light folds. Resolution-independent backdrop for
 * the LARP & Historical Goods hero.
 */
const RINGS: [number, number, number][] = [
  [0, -4, -22],
  [6.4, -4, -22],
  [-3.2, 0, 22],
  [3.2, 0, 22],
  [9.6, 0, 22],
  [0, 4, -22],
  [6.4, 4, -22],
  [-3.2, 8, 22],
  [3.2, 8, 22],
  [9.6, 8, 22],
  [0, 12, -22],
  [6.4, 12, -22],
];

function Rings() {
  return RINGS.map(([x, y, r]) => (
    <ellipse key={`${x}:${y}`} cx={x} cy={y} rx={4.6} ry={3.7} transform={`rotate(${r} ${x} ${y})`} />
  ));
}

export function MailWeave({ scale = 6.5, className }: { scale?: number; className?: string }) {
  return (
    <svg aria-hidden className={className} width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id="aurex-mail-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2f6f5" />
          <stop offset="0.3" stopColor="#9aa6a5" />
          <stop offset="0.62" stopColor="#2c3736" />
          <stop offset="0.85" stopColor="#6d7a79" />
          <stop offset="1" stopColor="#c9d2d1" />
        </linearGradient>
        <pattern
          id="aurex-mail-weave"
          width="6.4"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform={`scale(${scale}) rotate(-6)`}
        >
          <g fill="none" stroke="#000" strokeOpacity={0.55} strokeWidth={1.9}>
            <Rings />
          </g>
          <g fill="none" stroke="url(#aurex-mail-steel)" strokeWidth={1.05}>
            <Rings />
          </g>
        </pattern>
        <linearGradient id="aurex-mail-folds" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#000" stopOpacity={0.5} />
          <stop offset="0.22" stopColor="#fff" stopOpacity={0.1} />
          <stop offset="0.4" stopColor="#000" stopOpacity={0.45} />
          <stop offset="0.62" stopColor="#fff" stopOpacity={0.16} />
          <stop offset="0.8" stopColor="#000" stopOpacity={0.4} />
          <stop offset="1" stopColor="#fff" stopOpacity={0.08} />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#050c0c" />
      <rect width="100%" height="100%" fill="url(#aurex-mail-weave)" />
      <rect width="100%" height="100%" fill="url(#aurex-mail-folds)" />
    </svg>
  );
}

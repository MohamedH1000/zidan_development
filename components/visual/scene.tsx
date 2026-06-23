import { cn } from "@/lib/utils";

type SceneVariant = "hero" | "project" | "blog" | "chairman" | "abstract";

const toneMap = {
  hero: { sky: "#1a1a1a", building: "#2b2b2b", line: "#c8a45c", window: "#d9bc7a" },
  project: { sky: "#161310", building: "#2a2622", line: "#c8a45c", window: "#d9bc7a" },
  blog: { sky: "#1c1b18", building: "#2a2723", line: "#d9bc7a", window: "#e6d2a4" },
  chairman: { sky: "#141414", building: "#262626", line: "#c8a45c", window: "#d9bc7a" },
  abstract: { sky: "#0f0f0f", building: "#1d1d1d", line: "#c8a45c", window: "#c8a45c" },
} as const;

/**
 * Self-contained architectural illustration used as premium imagery for heroes,
 * project cards and blog thumbnails. Pure inline SVG — no external requests,
 * no copyright concerns, and trivially swappable for real photography later by
 * replacing this component's body with <Image/>.
 */
export function Scene({
  variant = "project",
  accent = "#c8a45c",
  className,
  showLabel,
}: {
  variant?: SceneVariant;
  accent?: string;
  className?: string;
  showLabel?: string;
}) {
  const tone = toneMap[variant];
  const gid = `scene-${variant}`;

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label={showLabel ? `${showLabel} architectural illustration` : "Architectural illustration"}
      >
        <defs>
          <linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tone.sky} />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <linearGradient id={`${gid}-stone`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tone.building} />
            <stop offset="100%" stopColor="#15120e" />
          </linearGradient>
          <linearGradient id={`${gid}-gold`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
            <stop offset="50%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Sky + grain */}
        <rect width="800" height="600" fill={`url(#${gid}-sky)`} />
        <g opacity="0.5">
          {Array.from({ length: 26 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 97) % 800}
              cy={(i * 53) % 600}
              r={1}
              fill={accent}
              opacity={0.18}
            />
          ))}
        </g>

        {/* Distant skyline */}
        <g opacity="0.35" fill={tone.building}>
          <rect x="40" y="380" width="120" height="160" />
          <rect x="640" y="360" width="140" height="180" />
          <rect x="170" y="420" width="60" height="120" />
          <rect x="560" y="410" width="70" height="130" />
        </g>

        {/* Main building */}
        <g>
          <rect x="280" y="180" width="240" height="340" fill={`url(#${gid}-stone)`} stroke={accent} strokeOpacity="0.35" strokeWidth="1.5" />

          {/* Cornice + crown */}
          <rect x="262" y="166" width="276" height="22" fill={accent} opacity="0.18" />
          <rect x="262" y="166" width="276" height="3" fill={accent} />
          <rect x="300" y="140" width="200" height="28" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" />
          <rect x="300" y="140" width="200" height="3" fill={accent} />

          {/* Window grid */}
          <g>
            {Array.from({ length: 4 }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={300 + col * 40}
                  y={208 + row * 62}
                  width="22"
                  height="40"
                  rx="2"
                  fill={tone.window}
                  opacity={0.16 + ((row + col) % 3) * 0.12}
                  stroke={accent}
                  strokeOpacity="0.25"
                  strokeWidth="0.75"
                />
              )),
            )}
          </g>

          {/* Entrance */}
          <path d="M380 520 L380 470 Q400 440 420 470 L420 520 Z" fill={accent} opacity="0.22" stroke={accent} strokeOpacity="0.6" strokeWidth="1.5" />
          <rect x="376" y="516" width="48" height="6" fill={accent} opacity="0.5" />
        </g>

        {/* Gold horizon glow */}
        <rect x="0" y="500" width="800" height="2" fill={`url(#${gid}-gold)`} opacity="0.6" />

        {/* Ground */}
        <rect x="0" y="520" width="800" height="80" fill="#0a0a0a" />
        <rect x="0" y="520" width="800" height="1" fill={accent} opacity="0.4" />
      </svg>

      {showLabel ? (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-5">
          <span className="font-display text-lg text-cream/90">{showLabel}</span>
          <span className="h-px w-10 bg-gold-500" />
        </div>
      ) : null}
    </div>
  );
}

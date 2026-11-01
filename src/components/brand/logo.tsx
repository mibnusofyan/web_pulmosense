import { useId } from "react";

import { cn } from "@/lib/utils";

// Geometry shared with public/brand/*.svg and the app icons (64x64 grid).
const TRACHEA_PATH = "M32 11v11c0 2.6-1.6 4.4-4.2 5.6M32 22c0 2.6 1.6 4.4 4.2 5.6";
const LEFT_LUNG_PATH =
  "M28.8 22c0-2-1.5-3.3-3.4-2.8C18 21 12.2 29 11.6 39c-.4 7 2.3 11.6 7.1 12 4 .3 7.6-1.3 10.1-3.6z";
const RIGHT_LUNG_PATH =
  "M35.2 22c0-2 1.5-3.3 3.4-2.8C46 21 51.8 29 52.4 39c.4 7-2.3 11.6-7.1 12-4 .3-7.6-1.3-10.1-3.6z";
const SOUND_WAVE_PATH =
  "M6 38h7c2.5 0 3-7 5-7s2.5 13 4.5 13 2.5-9 4.5-9 2 3 4 3h4c2 0 2-3 4-3s2.5 9 4.5 9 2.5-13 4.5-13 2.5 7 5 7h7";

type LogoMarkProps = {
  className?: string;
  /** "tile": white lungs on the teal gradient tile. "glyph": lungs only, coloured by currentColor. */
  variant?: "tile" | "glyph";
  /** Accessible name; omit when the mark sits next to visible "PulmoSense" text. */
  title?: string;
};

export function LogoMark({ className, variant = "tile", title }: LogoMarkProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const gradientId = `pulmosense-tile-${id}`;
  const maskId = `pulmosense-wave-${id}`;
  const isTile = variant === "tile";
  const markColor = isTile ? "#fff" : "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={isTile ? "0 0 64 64" : "8 8 48 48"}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("shrink-0", isTile && "rounded-[25%]", className)}
    >
      <defs>
        {isTile ? (
          <linearGradient
            id={gradientId}
            x1="8"
            y1="4"
            x2="56"
            y2="60"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#2dd4bf" />
            <stop offset="1" stopColor="#0e7490" />
          </linearGradient>
        ) : null}
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="#fff" />
          <path
            d={SOUND_WAVE_PATH}
            fill="none"
            stroke="#000"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
      </defs>
      {isTile ? <rect width="64" height="64" rx="16" fill={`url(#${gradientId})`} /> : null}
      <g fill={markColor} mask={`url(#${maskId})`}>
        <path
          d={TRACHEA_PATH}
          fill="none"
          stroke={markColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d={LEFT_LUNG_PATH} />
        <path d={RIGHT_LUNG_PATH} />
      </g>
    </svg>
  );
}

type LogoTone = "light" | "dark";

/** Two-tone "PulmoSense" text; size and weight come from the parent. */
export function Wordmark({ tone = "light", className }: { tone?: LogoTone; className?: string }) {
  const isDark = tone === "dark";
  return (
    <span className={cn("tracking-tight", className)}>
      <span className={isDark ? "text-white" : "text-slate-950"}>Pulmo</span>
      <span className={isDark ? "text-teal-300" : "text-teal-600"}>Sense</span>
    </span>
  );
}

const logoSizes = {
  sm: { root: "gap-2", mark: "size-6", text: "text-sm font-semibold" },
  md: { root: "gap-3", mark: "size-10", text: "text-lg font-semibold" },
  lg: { root: "gap-3", mark: "size-12", text: "text-2xl font-bold" },
};

type LogoProps = {
  /** Background the logo sits on. */
  tone?: LogoTone;
  size?: keyof typeof logoSizes;
  className?: string;
};

export function Logo({ tone = "light", size = "md", className }: LogoProps) {
  const sizing = logoSizes[size];
  return (
    <span className={cn("inline-flex items-center", sizing.root, className)}>
      <LogoMark className={sizing.mark} />
      <Wordmark tone={tone} className={sizing.text} />
    </span>
  );
}

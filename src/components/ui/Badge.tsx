import { type ReactNode } from "react";

type Tone = "pitch" | "sky" | "neutral";

const toneClasses: Record<Tone, string> = {
  pitch: "bg-pitch-500/15 text-pitch-300 ring-1 ring-inset ring-pitch-500/30",
  sky: "bg-sky-500/15 text-sky-300 ring-1 ring-inset ring-sky-500/30",
  neutral: "bg-night-500/20 text-night-100 ring-1 ring-inset ring-night-400/30",
};

export function Badge({
  children,
  tone = "neutral",
  animateIn = false,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  animateIn?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]} ${animateIn ? "animate-badge-in" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

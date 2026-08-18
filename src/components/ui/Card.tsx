import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-night-700 bg-night-800/60 p-6 backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-pitch-500/40 hover:shadow-[0_0_30px_-12px_rgba(22,163,74,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

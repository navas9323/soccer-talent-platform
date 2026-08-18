import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-pitch-500 text-night-950 hover:bg-pitch-400 shadow-[0_0_0_1px_rgba(22,163,74,0.4)]",
  secondary:
    "bg-sky-500 text-night-950 hover:bg-sky-400 shadow-[0_0_0_1px_rgba(14,165,233,0.4)]",
  ghost:
    "bg-transparent text-night-50 border border-night-500 hover:border-pitch-400 hover:text-pitch-300",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0";

type ButtonAsLink = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = {
  href?: undefined;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", children, className = "", href, ...rest } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

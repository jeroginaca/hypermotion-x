"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type BigLinkProps = {
  label: string;
  href?: string;
  variant?: "default" | "light";
  className?: string;
  onClick?: () => void;
};

/*
  default → dark bg (#2f2f2f), hover → off-white bg
  light   → off-white bg,       hover → dark bg
  Text is always primary (#ea4062), right-aligned.
  Font: 120px on 1680px content area = 7.14vw, accounting for 24px×2 padding.
*/
export function BigLink({
  label,
  href = "#",
  variant = "default",
  className,
  onClick,
}: BigLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-start w-full border-b border-primary p-6 transition-colors duration-200",
        variant === "default"
          ? "bg-dark hover:bg-off-white"
          : "bg-off-white hover:bg-dark",
        className
      )}
    >
      <span
        className="flex-1 font-display font-normal text-primary text-right leading-none tracking-[-0.075rem]"
        style={{ fontSize: "clamp(2.5rem, calc(7.14vw - 0.214rem), 7.5rem)" }}
      >
        {label}
      </span>
    </Link>
  );
}

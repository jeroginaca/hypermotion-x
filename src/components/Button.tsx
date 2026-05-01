"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Variants mirror the Figma component (node 5022:212):
 *   solid  → Default   — #ea4062 fill, white text
 *   ghost  → Variant2  — transparent, #ea4062 border + text
 *   dark   → Variant3  — #2f2f2f fill, #ea4062 border, white text
 */
const button = cva(
  // Base — shared across all variants (exact Figma values)
  [
    "flex items-center justify-center",
    "p-[0.625rem]",               // 10px padding
    "font-display font-normal",
    "text-[3rem]",                // 48px
    "leading-[1.2]",
    "tracking-[-0.09rem]",        // -1.44px letter-spacing
    "uppercase whitespace-nowrap",
    "w-full cursor-pointer",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        // Default — solid primary fill, transitions to dark on hover
        solid: [
          "bg-primary text-off-white",
          "border border-primary",
          "hover:bg-dark hover:border-dark",
        ],
        // Variant2 — ghost, transitions to dark on hover
        ghost: [
          "bg-transparent text-primary",
          "border border-primary",
          "hover:bg-dark hover:border-dark hover:text-off-white",
        ],
        // Variant3 — dark fill with primary border
        dark: [
          "bg-dark text-off-white",
          "border border-primary",
          "hover:bg-[#3d3d3d]",
        ],
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export function Button({ variant, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(button({ variant }), className)} {...props}>
      {children}
    </button>
  );
}

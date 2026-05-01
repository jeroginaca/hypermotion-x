import { cn } from "@/lib/utils";

type CardOnlyTextProps = {
  label: string;
  className?: string;
};

/*
  Mobile  (< md): full-width, py-6, 3rem uppercase, leading 1.2, tracking -0.09rem
  Tablet  (md+):  aspect-[840/524], 4rem, not-uppercase, leading 1.2, tracking -0.12rem
  Desktop (lg+):  aspect-[840/524], 5.5rem, leading 0.9, tracking -0.165rem
*/
export function CardOnlyText({ label, className }: CardOnlyTextProps) {
  return (
    <div
      className={cn(
        "border border-primary flex items-center justify-center overflow-hidden w-full",
        "group transition-colors duration-200 hover:bg-dark cursor-pointer",
        // Mobile: padding-driven height
        "py-6",
        // Tablet+: aspect-ratio-driven height, removes padding
        "md:aspect-[840/524] md:py-0",
        className
      )}
    >
      <p
        className={cn(
          "font-display font-normal text-primary whitespace-nowrap text-center transition-colors duration-200 group-hover:text-off-white",
          // Mobile: 3rem, uppercase, leading 1.2, tracking -0.09rem (-1.44px)
          "text-[3rem] leading-[1.2] tracking-[-0.09rem] uppercase",
          // Tablet: 4rem, not-uppercase, tracking -0.12rem (-1.92px)
          "md:text-[4rem] md:tracking-[-0.12rem] md:normal-case",
          // Desktop: 5.5rem, leading 0.9, tracking -0.165rem (-2.64px)
          "lg:text-[5.5rem] lg:leading-[0.9] lg:tracking-[-0.165rem]"
        )}
      >
        {label}
      </p>
    </div>
  );
}

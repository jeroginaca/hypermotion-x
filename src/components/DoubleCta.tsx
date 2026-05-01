import { Button } from "@/components/Button";

type DoubleCtaProps = {
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
};

export function DoubleCta({
  primaryLabel = "Book Your Test Drive",
  secondaryLabel = "Explore Hyperion X",
  onPrimary,
  onSecondary,
}: DoubleCtaProps) {
  return (
    <div className="flex flex-wrap gap-2 items-start w-full">
      <Button
        variant="ghost"
        className="flex-[1_0_0] min-w-[25rem]"
        onClick={onSecondary}
      >
        {secondaryLabel}
      </Button>
      <Button
        variant="solid"
        className="flex-[1_0_0] min-w-[25rem]"
        onClick={onPrimary}
      >
        {primaryLabel}
      </Button>
    </div>
  );
}

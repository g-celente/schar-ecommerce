import { cn } from "@/lib/utils";

/**
 * Container — responsive wrapper aligned to the design system grid.
 *
 * Sizes:
 *   default → max-w-[1440px] — used for all standard page sections
 *   narrow  → max-w-3xl      — editorial content, blog, legal
 *   wide    → max-w-screen-2xl — full-bleed product grids with minimal padding
 *   full    → no max-width    — truly edge-to-edge (use sparingly)
 *
 * Padding matches the container utility in globals.css:
 *   mobile   px-4  (16px)
 *   tablet   px-6  (24px)
 *   laptop   px-10 (40px)
 *   desktop  px-12 (48px)
 */

type ContainerSize = "default" | "narrow" | "wide" | "full";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
  as?: React.ElementType;
}

const maxWidths: Record<ContainerSize, string> = {
  default: "max-w-[1440px]",
  narrow:  "max-w-3xl",
  wide:    "max-w-screen-2xl",
  full:    "max-w-none",
};

export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 md:px-6 lg:px-10 xl:px-12",
        maxWidths[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}

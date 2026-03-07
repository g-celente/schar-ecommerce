import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "success" | "destructive" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  default:
    "bg-primary text-primary-foreground",
  secondary:
    "bg-secondary text-secondary-foreground",
  success:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  destructive:
    "bg-destructive text-destructive-foreground",
  outline:
    "border border-border bg-transparent",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

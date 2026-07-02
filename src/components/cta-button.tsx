import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
  secondary:
    "bg-transparent text-foreground border border-border hover:border-primary hover:text-primary",
  ghost:
    "bg-transparent text-muted-foreground hover:text-foreground border border-transparent",
};

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

export const CtaLink = forwardRef<HTMLAnchorElement, Props>(
  ({ variant = "primary", className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-11",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  ),
);
CtaLink.displayName = "CtaLink";

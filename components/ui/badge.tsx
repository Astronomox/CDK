import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 font-heading text-xs font-semibold tracking-wide [&>svg]:size-3.5",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground",
        blue: "bg-secondary text-secondary-foreground",
        gold: "bg-gold text-ink",
        dark: "bg-ink text-white",
        light: "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur",
        outline: "border border-border text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

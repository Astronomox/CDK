import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading font-semibold transition-[background-color,color,border-color,transform,box-shadow] duration-200 outline-none active:translate-y-px focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:-translate-y-px hover:bg-purple-deep hover:shadow-[0_10px_22px_-10px_rgba(113,70,211,0.7)]",
        blue: "border-2 border-blue bg-transparent text-blue hover:bg-blue hover:text-white",
        outline: "border-2 border-blue bg-transparent text-blue hover:bg-blue hover:text-white",
        gold: "bg-gold text-black hover:bg-gold-deep",
        secondary: "bg-secondary text-secondary-foreground hover:bg-blue-soft",
        ghost: "text-blue hover:underline",
        light: "bg-white text-ink hover:bg-canvas-warm",
        "outline-light": "border-2 border-white/60 text-white hover:border-white hover:bg-white/10",
        link: "rounded-none px-0 text-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-12 px-6 text-[0.95rem]",
        sm: "min-h-11 px-5 text-[0.9375rem]",
        lg: "min-h-[52px] px-[26px] text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };

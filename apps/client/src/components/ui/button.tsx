import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const variants = {
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    primary: "bg-gradient-to-r from-[#B900B4] to-[#F50000] text-transparent bg-clip-text hover:text-primary-foreground hover:bg-clip-border"
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
};

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: variants,
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const button = (
      <Comp
        className={cn(
          variant !== 'primary' && buttonVariants({ variant, size, className }),
          variant === 'primary' && `${variants.variant.primary} transition-colors z-20 w-full h-14 rounded-full relative px-10`
        )}
        ref={ref}
        {...props}
      />
    );

    if (variant === 'primary') {
      return (
        <span className={cn(
          className,
          "inline-block h-14 rounded-full bg-gradient-to-br from-[#B900B4] to-[#F50000] relative z-0"
        )}>
          <span className={
            cn("inline-block rounded-full px-0 absolute bg-background top-[2px] bottom-[2px] right-[2px] left-[2px] z-10")
          }/>
          {button}
        </span>
      );
    }

    return button;
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

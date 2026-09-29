import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// KaiserInc Base: um tamanho de controle (32px, como no Rhea), 28px só dentro de tabela.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-colors duration-[120ms] ease-out outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:border-border disabled:bg-muted disabled:text-subtle-foreground aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        outline:
          "border-border-strong bg-transparent hover:bg-accent aria-expanded:bg-accent active:bg-border",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-border aria-expanded:bg-border",
        ghost: "hover:bg-accent aria-expanded:bg-accent active:bg-border",
        destructive:
          "border-border-strong bg-transparent text-destructive hover:bg-accent",
        link: "text-primary-text underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-control gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        sm: "h-control-sm gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-control",
        "icon-sm": "size-control-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

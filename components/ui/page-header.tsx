import { cn } from "cn"

// The page name is the largest text on screen, set directly on the page
// background with no card behind it.
function PageHeader({
  title,
  description,
  actions,
  className,
  ...props
}: Omit<React.ComponentProps<"header">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <header
      data-slot="page-header"
      className={cn("flex flex-wrap items-end justify-between gap-4", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-2">
        <h1 className="text-[28px] leading-8 font-semibold tracking-[-0.03em] text-balance sm:text-[40px] sm:leading-[44px]">
          {title}
        </h1>
        {description && (
          <p data-slot="page-header-description" className="max-w-prose text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div data-slot="page-header-actions" className="flex shrink-0 items-center gap-2">
          {actions}
        </div>
      )}
    </header>
  )
}

export { PageHeader }

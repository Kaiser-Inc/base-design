"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "cn"

import { Button } from "@/components/ui/button"

const links = [
  { href: "/", label: "Início" },
  { href: "/formulario", label: "Formulário" },
  { href: "/feedback", label: "Feedback" },
  { href: "/dados", label: "Dados" },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Alternar tema claro e escuro"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="hidden dark:block" strokeWidth={1.75} />
      <MoonIcon className="block dark:hidden" strokeWidth={1.75} />
    </Button>
  )
}

function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="border-b border-border">
      {/* Mobile: brand and theme toggle on the first row, navigation on its own row. */}
      <div className="mx-auto flex max-w-page flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2 sm:h-14 sm:flex-nowrap sm:py-0 sm:px-6">
        <Link href="/" className="mr-auto text-sm font-semibold tracking-tight sm:mr-0">
          KaiserInc Base
        </Link>
        <nav aria-label="Seções" className="order-last -mx-2.5 flex w-full min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] sm:order-none sm:mx-0 sm:w-auto sm:flex-1 [&::-webkit-scrollbar]:hidden">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-sm whitespace-nowrap text-muted-foreground transition-colors duration-[120ms] ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  active && "text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

export { SiteHeader }

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
  const next = resolvedTheme === "dark" ? "light" : "dark"
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={next === "light" ? "Usar tema claro" : "Usar tema escuro"}
      onClick={() => setTheme(next)}
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
      <div className="mx-auto flex h-14 max-w-page items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          KaiserInc Base
        </Link>
        <nav aria-label="Seções" className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
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

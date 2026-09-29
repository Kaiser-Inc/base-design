"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

function InstallCommand({ name }: { name: string }) {
  const command = `pnpm dlx shadcn add @kaiserinc/${name}`
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex min-w-0 items-center gap-2">
      <code className="min-w-0 truncate font-mono text-xs text-muted-foreground">{command}</code>
      <Button
        variant="ghost"
        size="icon"
        aria-label={copied ? "Comando copiado" : "Copiar comando de instalação"}
        onClick={copy}
      >
        {copied ? <CheckIcon strokeWidth={1.75} /> : <CopyIcon strokeWidth={1.75} />}
      </Button>
    </div>
  )
}

// One component per section, straight on the page background. A thin rule
// separates sections; no card, border or shadow around the demo.
function Showcase({
  id,
  title,
  description,
  registryName,
  children,
}: {
  id: string
  title: string
  description?: string
  registryName: string
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="flex flex-col gap-6 border-t border-border pt-8">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 id={`${id}-title`} className="text-xl leading-7 font-semibold">
            {title}
          </h2>
          {description && <p className="max-w-prose text-sm text-muted-foreground">{description}</p>}
        </div>
        <InstallCommand name={registryName} />
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  )
}

// A labelled row of states inside a Showcase ("Padrão", "Erro", "Desabilitado").
function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex flex-wrap items-start gap-3">{children}</div>
    </div>
  )
}

export { Showcase, ShowcaseRow }

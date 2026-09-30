"use client"

import { useState } from "react"
import { CheckIcon, ChevronRightIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

function useCopy(text: string) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return { copied, copy }
}

function InstallCommand({ name }: { name: string }) {
  const command = `pnpm dlx shadcn add @kaiserinc/${name}`
  const { copied, copy } = useCopy(command)

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

function ShowcaseCode({ code }: { code: string }) {
  const { copied, copy } = useCopy(code)

  return (
    <details className="group flex flex-col">
      <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 rounded-sm text-sm font-medium text-primary-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        <ChevronRightIcon
          className="size-4 transition-transform duration-[120ms] ease-out group-open:rotate-90"
          strokeWidth={1.75}
        />
        Código
      </summary>
      <div className="relative mt-3">
        <pre className="overflow-x-auto rounded-md bg-muted p-4 pr-12 font-mono text-xs leading-5">
          <code>{code}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1.5 right-1.5"
          aria-label={copied ? "Código copiado" : "Copiar código"}
          onClick={copy}
        >
          {copied ? <CheckIcon strokeWidth={1.75} /> : <CopyIcon strokeWidth={1.75} />}
        </Button>
      </div>
    </details>
  )
}

// One component per section, straight on the page background. A thin rule
// separates sections. The demo gets an "Exemplo" label and a thin rule on its
// left, so it reads as an example without becoming a card.
function Showcase({
  id,
  title,
  description,
  registryName,
  code,
  children,
}: {
  id: string
  title: string
  description?: string
  registryName: string
  /** Minimal usage snippet, shown collapsed under the demo. */
  code?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="flex scroll-mt-8 flex-col gap-6 border-t border-border pt-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 id={`${id}-title`} className="text-xl leading-7 font-semibold">
            {title}
          </h2>
          {description && <p className="max-w-[60ch] text-sm text-muted-foreground">{description}</p>}
        </div>
        <InstallCommand name={registryName} />
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium text-subtle-foreground">Exemplo</span>
        <div className="flex flex-col gap-6 sm:border-l sm:border-border sm:pl-5">{children}</div>
      </div>
      {code && <ShowcaseCode code={code} />}
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

// List of the sections of a page. The group pages keep it sticky from 1024px up.
function ShowcaseIndex({ items }: { items: { id: string; title: string }[] }) {
  return (
    <nav aria-label="Nesta página" className="flex flex-col gap-2 text-sm">
      <span className="text-xs font-medium text-subtle-foreground">Nesta página</span>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block w-fit rounded-sm py-0.5 text-muted-foreground transition-colors duration-[120ms] ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-ring"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { Showcase, ShowcaseIndex, ShowcaseRow }

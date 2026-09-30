import type { Metadata } from "next"

import { FeedbackDemos } from "@/components/site/demos/feedback"
import { ShowcaseIndex } from "@/components/site/showcase"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = { title: "Feedback" }

const sections = [
  { id: "confirm-dialog", title: "ConfirmDialog" },
  { id: "toaster", title: "Toaster" },
  { id: "skeleton", title: "Skeleton" },
  { id: "spinner", title: "Spinner" },
  { id: "empty", title: "Empty" },
]

export default function Page() {
  return (
    <>
      <PageHeader title="Feedback" description="ConfirmDialog, Toaster, Skeleton, Spinner e Empty: estados que fazem parte do layout." />
      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-start lg:gap-16">
        <div className="flex min-w-0 flex-col gap-12">
          <FeedbackDemos />
        </div>
        <aside className="hidden lg:sticky lg:top-8 lg:block">
          <ShowcaseIndex items={sections} />
        </aside>
      </div>
    </>
  )
}

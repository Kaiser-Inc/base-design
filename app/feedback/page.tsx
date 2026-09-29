import type { Metadata } from "next"

import { FeedbackDemos } from "@/components/site/demos/feedback"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = { title: "Feedback" }

export default function Page() {
  return (
    <>
      <PageHeader title="Feedback" description="ConfirmDialog, Toaster, Skeleton, Spinner e Empty: estados que fazem parte do layout." />
      <FeedbackDemos />
    </>
  )
}

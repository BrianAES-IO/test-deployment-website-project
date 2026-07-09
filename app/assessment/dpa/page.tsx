import type { Metadata } from "next";
import { AssessmentComingSoon } from "@/components/AssessmentComingSoon";
import { AssessmentQuiz } from "@/components/assessment/AssessmentQuiz";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free DPA Exposure Score",
  description:
    "A free, 3-minute, 12-question self-assessment of your exposure under Jamaica's Data Protection Act. Indicative only: not legal advice.",
  alternates: { canonical: "/assessment/dpa" },
  keywords: ["free DPA assessment Jamaica"],
};

export default function DpaAssessmentPage() {
  if (!siteConfig.assessmentsLive) {
    return (
      <AssessmentComingSoon
        eyebrow="Free Assessment"
        title="The DPA Exposure Score."
        description="12 questions, about 3 minutes. A scored, indicative read on where your firm stands under the Data Protection Act, not a substitute for the registered COMPLY assessment."
      />
    );
  }

  return <AssessmentQuiz type="dpa" />;
}

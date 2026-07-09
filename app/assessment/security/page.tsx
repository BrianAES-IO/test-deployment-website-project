import type { Metadata } from "next";
import { AssessmentComingSoon } from "@/components/AssessmentComingSoon";
import { AssessmentQuiz } from "@/components/assessment/AssessmentQuiz";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Cyber Readiness Check",
  description:
    "A free, 3-minute, 10-question self-assessment of your technical security posture. Indicative only: not a substitute for a registered security assessment.",
  alternates: { canonical: "/assessment/security" },
};

export default function SecurityAssessmentPage() {
  if (!siteConfig.assessmentsLive) {
    return (
      <AssessmentComingSoon
        eyebrow="Free Assessment"
        title="The Cyber Readiness Check."
        description="10 questions, about 3 minutes. A scored, indicative read on your technical security posture, not a substitute for the registered security assessment."
      />
    );
  }

  return <AssessmentQuiz type="security" />;
}

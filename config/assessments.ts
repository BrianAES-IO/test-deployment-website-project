/**
 * Content and scoring for the two free self-assessment tools (Phase B).
 * Single source of truth: both the client quiz UI and the server-side
 * submit route (`app/api/assessment/submit/route.ts`) import from here so
 * the score is computed the same way in both places, and the server can
 * validate a submission's shape without duplicating question data.
 *
 * Every result shown to a visitor is self-reported and indicative only,
 * never a compliance or security determination. See ResultsStep for the
 * disclaimer that always accompanies a score.
 */

export type AssessmentType = "dpa" | "security";

export type AssessmentOption = {
  label: string;
  value: number;
};

export type AssessmentQuestion = {
  id: string;
  prompt: string;
  helper?: string;
  options: AssessmentOption[];
};

export type AssessmentBand = {
  key: "higher" | "moderate" | "lower";
  min: number;
  max: number;
  label: string;
  summary: string;
};

const standardOptions: AssessmentOption[] = [
  { label: "Yes, fully", value: 2 },
  { label: "Partially or informally", value: 1 },
  { label: "No", value: 0 },
];

const incidentOptions: AssessmentOption[] = [
  { label: "No", value: 2 },
  { label: "Not sure", value: 1 },
  { label: "Yes", value: 0 },
];

export const dpaQuestions: AssessmentQuestion[] = [
  {
    id: "dpa-01",
    prompt: "Is your organization registered with the Office of the Information Commissioner, if registration applies to you?",
    options: standardOptions,
  },
  {
    id: "dpa-02",
    prompt: "Do you have a written record of what personal data you hold and where it's stored?",
    helper: "Sometimes called a data inventory or a record of processing activities.",
    options: standardOptions,
  },
  {
    id: "dpa-03",
    prompt: "Do you have a documented privacy or data-protection policy that staff can actually find and read?",
    options: standardOptions,
  },
  {
    id: "dpa-04",
    prompt: "Do you have a documented lawful basis for each category of personal data you collect?",
    helper: "For example: consent, contract, or a legal obligation.",
    options: standardOptions,
  },
  {
    id: "dpa-05",
    prompt: "Do staff who handle personal data receive any data-protection training, even informally?",
    options: standardOptions,
  },
  {
    id: "dpa-06",
    prompt: "Do you have a written procedure for responding to someone asking to access, correct, or delete their data?",
    options: standardOptions,
  },
  {
    id: "dpa-07",
    prompt: "Do you have a written data-breach response plan, including who to notify and when?",
    options: standardOptions,
  },
  {
    id: "dpa-08",
    prompt: "If third parties process personal data on your behalf, do you have written data-processing agreements with them?",
    helper: "For example: payroll providers, cloud storage, or an outsourced call center.",
    options: standardOptions,
  },
  {
    id: "dpa-09",
    prompt: "Do you have a documented retention schedule for how long you keep personal data before deleting it?",
    options: standardOptions,
  },
  {
    id: "dpa-10",
    prompt: "Have you named a Data Protection Officer or an equivalent point of contact, if required?",
    options: standardOptions,
  },
  {
    id: "dpa-11",
    prompt: "Do you apply basic technical safeguards to personal data, such as access controls or encryption for sensitive files?",
    options: standardOptions,
  },
  {
    id: "dpa-12",
    prompt: "In the last 12 months, has your organization had a suspected or confirmed data breach involving personal data?",
    options: incidentOptions,
  },
];

export const securityQuestions: AssessmentQuestion[] = [
  {
    id: "sec-01",
    prompt: "Is multi-factor authentication required for email and other critical business accounts?",
    options: standardOptions,
  },
  {
    id: "sec-02",
    prompt: "Are security patches applied to your devices and software on a regular, defined schedule?",
    options: standardOptions,
  },
  {
    id: "sec-03",
    prompt: "Do company devices run endpoint protection that's centrally monitored, not just consumer antivirus left to update itself?",
    options: standardOptions,
  },
  {
    id: "sec-04",
    prompt: "Are backups taken on a regular schedule and actually tested for recoverability?",
    options: standardOptions,
  },
  {
    id: "sec-05",
    prompt: "Is administrative or privileged access limited to the people who need it, and reviewed periodically?",
    options: standardOptions,
  },
  {
    id: "sec-06",
    prompt: "Do you have basic email security controls in place, such as spam or phishing filtering and SPF, DKIM, or DMARC?",
    options: standardOptions,
  },
  {
    id: "sec-07",
    prompt: "Is your network segmented in any way, such as separating guest Wi-Fi from internal systems?",
    options: standardOptions,
  },
  {
    id: "sec-08",
    prompt: "Do you have a written incident-response plan for a cybersecurity event?",
    options: standardOptions,
  },
  {
    id: "sec-09",
    prompt: "Do staff receive any security-awareness training, such as recognizing phishing attempts?",
    options: standardOptions,
  },
  {
    id: "sec-10",
    prompt: "In the last 12 months, has your organization had a suspected or confirmed cybersecurity incident?",
    options: incidentOptions,
  },
];

export const dpaBands: AssessmentBand[] = [
  {
    key: "higher",
    min: 0,
    max: 8,
    label: "Higher exposure",
    summary: "Based on your answers, several of the practices this check asks about don't appear to be in place yet.",
  },
  {
    key: "moderate",
    min: 9,
    max: 16,
    label: "Moderate exposure",
    summary: "Based on your answers, some of the practices this check asks about are in place, and some aren't.",
  },
  {
    key: "lower",
    min: 17,
    max: 24,
    label: "Lower exposure",
    summary: "Based on your answers, most of the practices this check asks about appear to be in place.",
  },
];

export const securityBands: AssessmentBand[] = [
  {
    key: "higher",
    min: 0,
    max: 7,
    label: "Higher exposure",
    summary: "Based on your answers, several of the practices this check asks about don't appear to be in place yet.",
  },
  {
    key: "moderate",
    min: 8,
    max: 14,
    label: "Moderate exposure",
    summary: "Based on your answers, some of the practices this check asks about are in place, and some aren't.",
  },
  {
    key: "lower",
    min: 15,
    max: 20,
    label: "Lower exposure",
    summary: "Based on your answers, most of the practices this check asks about appear to be in place.",
  },
];

export const sectorOptions = [
  "Microcredit institution",
  "Medical & dental practice",
  "Legal & accounting firm",
  "Credit union",
  "BPO subcontractor",
  "Other",
];

export const companySizeOptions = ["1–10 employees", "11–50 employees", "51–200 employees", "200+ employees"];

export type AssessmentContact = {
  name: string;
  company: string;
  role: string;
  sector: string;
  companySize: string;
  email: string;
  phone: string;
};

export function questionsFor(type: AssessmentType): AssessmentQuestion[] {
  return type === "dpa" ? dpaQuestions : securityQuestions;
}

function bandsFor(type: AssessmentType): AssessmentBand[] {
  return type === "dpa" ? dpaBands : securityBands;
}

/**
 * Recomputes a score from raw answers and throws if any question is
 * missing or holds a value that isn't one of that question's own option
 * values. Used server-side as the sole source of truth for a submission's
 * score: the client's own running total (if it keeps one for the UI) is
 * never trusted.
 */
export function scoreAssessment(type: AssessmentType, answers: Record<string, number>) {
  const questions = questionsFor(type);
  let score = 0;

  for (const question of questions) {
    const value = answers[question.id];
    const validOption = question.options.some((option) => option.value === value);
    if (typeof value !== "number" || !validOption) {
      throw new Error(`Missing or invalid answer for question "${question.id}".`);
    }
    score += value;
  }

  const maxScore = questions.length * 2;
  const band = bandsFor(type).find((b) => score >= b.min && score <= b.max);
  if (!band) {
    throw new Error("Computed score fell outside every band.");
  }

  return { score, maxScore, band };
}

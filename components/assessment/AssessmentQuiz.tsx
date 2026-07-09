"use client";

import { useState } from "react";
import { LedgerLabel } from "@/components/Ledger";
import { questionsFor, type AssessmentContact, type AssessmentType } from "@/config/assessments";
import { QuestionStep } from "./QuestionStep";
import { ContactStep } from "./ContactStep";
import { ResultsStep } from "./ResultsStep";

type Phase = "questions" | "contact" | "results";

type SubmitResult = {
  score: number;
  maxScore: number;
  band: { label: string; summary: string };
};

const copy: Record<AssessmentType, { eyebrow: string; title: string; description: string }> = {
  dpa: {
    eyebrow: "Free Assessment",
    title: "The DPA Exposure Score.",
    description:
      "12 questions, about 3 minutes. A scored, indicative read on where your firm stands under the Data Protection Act, not a substitute for the registered COMPLY assessment.",
  },
  security: {
    eyebrow: "Free Assessment",
    title: "The Cyber Readiness Check.",
    description:
      "10 questions, about 3 minutes. A scored, indicative read on your technical security posture, not a substitute for the registered security assessment.",
  },
};

export function AssessmentQuiz({ type }: { type: AssessmentType }) {
  const questions = questionsFor(type);
  const [phase, setPhase] = useState<Phase>("questions");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentQuestion = questions[stepIndex];

  function handleAnswer(value: number) {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);

    if (stepIndex + 1 < questions.length) {
      setStepIndex(stepIndex + 1);
    } else {
      setPhase("contact");
    }
  }

  function handleBack() {
    if (phase === "contact") {
      setPhase("questions");
      return;
    }
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  async function handleContactSubmit(contact: AssessmentContact, consent: boolean, honeypot: string) {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, answers, contact, consent, honeypot }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong submitting your assessment. Please try again.");
      }

      setResult({ score: data.score, maxScore: data.maxScore, band: data.band });
      setPhase("results");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="border-b border-line bg-schematic">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        {phase !== "results" && (
          <>
            <LedgerLabel>{copy[type].eyebrow}</LedgerLabel>
            <h1 className="mt-3 text-3xl font-medium text-ink sm:text-4xl">{copy[type].title}</h1>
            <p className="mt-4 text-base text-ink-muted">{copy[type].description}</p>
          </>
        )}

        {phase === "questions" && currentQuestion && (
          <QuestionStep
            question={currentQuestion}
            index={stepIndex}
            total={questions.length}
            selected={answers[currentQuestion.id]}
            onAnswer={handleAnswer}
            onBack={stepIndex > 0 ? handleBack : undefined}
          />
        )}

        {phase === "contact" && (
          <ContactStep submitting={submitting} error={submitError} onBack={handleBack} onSubmit={handleContactSubmit} />
        )}

        {phase === "results" && result && <ResultsStep type={type} result={result} />}
      </div>
    </section>
  );
}

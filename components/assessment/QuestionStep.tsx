"use client";

import type { AssessmentQuestion } from "@/config/assessments";
import { LedgerLabel } from "@/components/Ledger";

export function QuestionStep({
  question,
  index,
  total,
  selected,
  onAnswer,
  onBack,
}: {
  question: AssessmentQuestion;
  index: number;
  total: number;
  selected?: number;
  onAnswer: (value: number) => void;
  onBack?: () => void;
}) {
  return (
    <div className="mt-10">
      <LedgerLabel>{`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}</LedgerLabel>
      <h2 className="mt-3 text-xl font-medium text-ink sm:text-2xl">{question.prompt}</h2>
      {question.helper && <p className="mt-2 text-sm text-ink-muted">{question.helper}</p>}

      <div className="mt-8 space-y-3">
        {question.options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => onAnswer(option.value)}
            className={`block w-full border px-6 py-4 text-left text-base transition-colors duration-200 ease-brand ${
              selected === option.value
                ? "border-brand bg-brand text-paper"
                : "border-line bg-white/60 text-ink hover:border-brand"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-6 text-sm font-semibold text-ink-muted transition-colors duration-200 ease-brand hover:text-brand"
        >
          &larr; Back
        </button>
      )}
    </div>
  );
}

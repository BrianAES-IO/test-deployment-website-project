import type { SVGProps } from "react";

/**
 * A small set of abstract, geometric line-art icons built in-house.
 * Deliberately no padlocks, shields, or clip-art security iconography,
 * per the brand direction: precise strokes, restrained, ledger-adjacent.
 * All use currentColor so they inherit color via className (e.g. text-brand).
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Compliance / document review (COMPLY). */
export function DocumentIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
    </svg>
  );
}

/** Standing / recurring function (GUARD). */
export function CycleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12a8 8 0 1 1-2.5-5.8" />
      <path d="M20 3v4.5H15.5" />
    </svg>
  );
}

/** Continuous monitoring signal (SHIELD MSP). */
export function PulseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M6 12h2.5l1.5-4 3 8 1.5-4H18" />
    </svg>
  );
}

/** Managed cloud environment (Cloud Enclave). */
export function CloudIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7.5 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16.6 8.3 4.5 4.5 0 0 1 16 18H7.5Z" />
    </svg>
  );
}

/** Scanning / detection sweep (Security Assessment). */
export function ScanIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Score / gauge readout (assessment results). */
export function GaugeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16a8 8 0 0 1 16 0" />
      <path d="M12 16 15.2 10.5" />
      <circle cx="12" cy="16" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Scheduled session (Briefing). */
export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
    </svg>
  );
}

/** Written guidance (Insights). */
export function ArticleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 4h9l4 4v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M14.5 4v4h4" />
      <path d="M8 12.5h8M8 15.5h8M8 18h5" />
    </svg>
  );
}

/** Direct point of contact (used sparingly, e.g. About/Contact). */
export function ContactIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

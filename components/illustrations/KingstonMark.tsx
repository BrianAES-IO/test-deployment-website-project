/**
 * Original vector illustration (not a photo): an abstract map mark for
 * Kingston, Jamaica. Flat fills only, brand palette, no gradients.
 * Designed to sit on the dark IllustrationFrame background.
 */
export function KingstonMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" className={className} aria-hidden="true">
      {/* Simplified, abstract island form, not a literal cartographic outline. */}
      <path
        d="M70 190c10-22 40-30 66-28 30 2 46-16 76-18 34-2 58 14 90 10 24-2 46 6 62 22-14 18-40 22-64 26-36 6-58 26-96 28-40 2-70-8-96-16-24-8-44-6-38-24Z"
        fill="#1E2B4A"
        stroke="#6C93FF"
        strokeWidth="1.4"
        opacity="0.9"
      />

      <circle cx="260" cy="206" r="2" fill="#F7F3EA" opacity="0.4" />
      <circle cx="150" cy="184" r="2" fill="#F7F3EA" opacity="0.4" />

      {/* Location pin at Kingston, on the south-east coast. */}
      <g transform="translate(276 150)">
        <circle cx="0" cy="0" r="34" fill="none" stroke="#6C93FF" strokeWidth="1.2" opacity="0.45" />
        <circle cx="0" cy="0" r="20" fill="none" stroke="#6C93FF" strokeWidth="1.2" opacity="0.6" />
        <path
          d="M0 -18c9 0 16 7 16 16 0 11-16 30-16 30s-16-19-16-30c0-9 7-16 16-16Z"
          fill="#1450D6"
        />
        <circle cx="0" cy="-2" r="5.5" fill="#F7F3EA" />
      </g>

      <text x="200" y="330" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="2" fill="#F7F3EA" opacity="0.5">
        KINGSTON, JAMAICA
      </text>
    </svg>
  );
}

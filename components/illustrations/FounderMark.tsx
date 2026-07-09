/**
 * Original vector illustration (not a photo): a geometric avatar mark.
 * Used as an honest stand-in until a real portrait photo is supplied,
 * deliberately abstract rather than a fake likeness.
 */
export function FounderMark({ initial = "B", className = "" }: { initial?: string; className?: string }) {
  return (
    <svg viewBox="0 0 300 400" fill="none" className={className} aria-hidden="true">
      <rect x="0" y="0" width="300" height="400" fill="#16223A" />
      <circle cx="150" cy="150" r="120" fill="none" stroke="#6C93FF" strokeWidth="1" opacity="0.25" />

      {/* Shoulders: a large circle positioned mostly below the frame. */}
      <circle cx="150" cy="470" r="170" fill="#1450D6" />
      {/* Head */}
      <circle cx="150" cy="150" r="46" fill="#1450D6" />

      <text
        x="150"
        y="163"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="36"
        fill="#F7F3EA"
      >
        {initial}
      </text>
    </svg>
  );
}

/**
 * Original vector illustration (not a photo): an abstract data/compliance
 * network. Flat fills only, brand palette, no gradients, no padlocks/shields.
 */
export function DataNetwork({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 400" fill="none" className={className} aria-hidden="true">
      <circle cx="130" cy="90" r="2" fill="#6C93FF" opacity="0.5" />
      <circle cx="360" cy="70" r="2" fill="#6C93FF" opacity="0.5" />
      <circle cx="410" cy="220" r="2" fill="#6C93FF" opacity="0.5" />
      <circle cx="70" cy="260" r="2" fill="#6C93FF" opacity="0.5" />
      <circle cx="250" cy="340" r="2" fill="#6C93FF" opacity="0.5" />

      <path d="M240 190 L120 130 M240 190 L350 120 M240 190 L380 240 M240 190 L110 250 M240 190 L260 320"
        stroke="#6C93FF" strokeWidth="1.4" opacity="0.55" />

      <g>
        <rect x="90" y="98" width="42" height="52" rx="2" fill="#F7F3EA" stroke="#16223A" strokeWidth="1.4" />
        <path d="M99 114h24M99 124h24M99 134h14" stroke="#16223A" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      <g>
        <rect x="326" y="86" width="42" height="52" rx="2" fill="#F7F3EA" stroke="#16223A" strokeWidth="1.4" />
        <path d="M335 102h24M335 112h24M335 122h14" stroke="#16223A" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      <g>
        <rect x="356" y="216" width="42" height="52" rx="2" fill="#F7F3EA" stroke="#16223A" strokeWidth="1.4" />
        <path d="M365 232h24M365 242h24M365 252h14" stroke="#16223A" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      <g>
        <rect x="60" y="228" width="42" height="52" rx="2" fill="#F7F3EA" stroke="#16223A" strokeWidth="1.4" />
        <path d="M69 244h24M69 254h24M69 264h14" stroke="#16223A" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      <g>
        <rect x="228" y="300" width="42" height="52" rx="2" fill="#F7F3EA" stroke="#16223A" strokeWidth="1.4" />
        <path d="M237 316h24M237 326h24M237 336h14" stroke="#16223A" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      <circle cx="240" cy="190" r="34" fill="#1450D6" />
      <path d="M226 190 l10 10 20 -22" stroke="#F7F3EA" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

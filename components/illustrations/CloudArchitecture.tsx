/**
 * Original vector illustration (not a photo): a schematic Cloud Enclave
 * architecture diagram. Flat fills only, brand palette, no gradients.
 */
export function CloudArchitecture({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 320" fill="none" className={className} aria-hidden="true">
      <rect x="0" y="0" width="320" height="320" fill="#16223A" />
      <circle cx="160" cy="160" r="118" fill="none" stroke="#6C93FF" strokeWidth="1" opacity="0.2" />

      {/* Cloud outline */}
      <path
        d="M108 128a34 34 0 0 1 62-20 26 26 0 0 1 40 18 22 22 0 0 1-4 44H100a22 22 0 0 1 8-42Z"
        fill="none"
        stroke="#6C93FF"
        strokeWidth="2"
      />

      {/* Connection lines down to isolated nodes */}
      <path d="M130 170v34M160 170v34M190 170v34" stroke="#6C93FF" strokeWidth="1.4" opacity="0.6" />

      {/* Nodes */}
      <rect x="108" y="204" width="44" height="30" rx="2" fill="#1450D6" />
      <rect x="138" y="204" width="44" height="30" rx="2" fill="#1450D6" opacity="0" />
      <rect x="168" y="204" width="44" height="30" rx="2" fill="#1450D6" />

      <rect x="108" y="204" width="44" height="30" rx="2" fill="none" stroke="#F7F3EA" strokeWidth="1" opacity="0.35" />
      <rect x="168" y="204" width="44" height="30" rx="2" fill="none" stroke="#F7F3EA" strokeWidth="1" opacity="0.35" />

      {/* Isolation boundary */}
      <rect x="94" y="196" width="132" height="70" rx="6" fill="none" stroke="#6C93FF" strokeWidth="1.4" strokeDasharray="3 4" />

      {/* Key motif for customer-held encryption keys (not a padlock). */}
      <g transform="translate(160 272)">
        <circle cx="0" cy="0" r="9" fill="none" stroke="#F7F3EA" strokeWidth="2" />
        <path d="M7 6l14 14M17 16l5 5M22 21l5 -5" stroke="#F7F3EA" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

import type { ReactNode } from "react";

/** Framed container for the site's original SVG illustrations (see components/illustrations). */
export function IllustrationFrame({
  children,
  aspect = "video",
  className = "",
}: {
  children: ReactNode;
  aspect?: "video" | "square" | "portrait";
  className?: string;
}) {
  const aspectClass = { video: "aspect-video", square: "aspect-square", portrait: "aspect-[3/4]" }[aspect];

  return (
    <div
      className={`frame-corners relative flex ${aspectClass} items-center justify-center overflow-hidden border border-line bg-ink ${className}`}
    >
      {children}
    </div>
  );
}

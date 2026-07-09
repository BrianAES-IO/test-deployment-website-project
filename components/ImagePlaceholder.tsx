import type { ComponentType, SVGProps } from "react";

/**
 * TODO (photography): no stock-photo or image-generation tool is available
 * in this build environment, so real photography couldn't be sourced. This
 * component is a styled, correctly-sized placeholder, not a real image, so
 * real photos can be dropped in later without touching layout. Replace the
 * <div> below with a Next.js <Image src="..." /> once real photography
 * (office, team, or architecture shots, no stock hoodie-hacker or padlock
 * imagery) is supplied.
 */
export function ImagePlaceholder({
  label,
  aspect = "video",
  icon: Icon,
  className = "",
}: {
  label: string;
  aspect?: "video" | "square" | "portrait";
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}) {
  const aspectClass = { video: "aspect-video", square: "aspect-square", portrait: "aspect-[3/4]" }[aspect];

  return (
    <div
      className={`frame-corners bg-schematic-dark relative flex ${aspectClass} items-center justify-center overflow-hidden border border-line bg-ink ${className}`}
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        {Icon && <Icon className="h-8 w-8 text-brand-light" />}
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper/50">{label}</span>
      </div>
    </div>
  );
}

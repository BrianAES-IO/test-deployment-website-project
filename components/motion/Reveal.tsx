"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

export function Reveal({
  children,
  index = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  /** Position within a visual group; multiplies into a ~60ms stagger delay. */
  index?: number;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const reduceMotion = useReducedMotion();
  const Tag = m[as];

  if (reduceMotion) {
    const Static = as as keyof JSX.IntrinsicElements;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
      className={className}
    >
      {children}
    </Tag>
  );
}

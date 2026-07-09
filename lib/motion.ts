/** Shared easing curve, the one motion token used across the site. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

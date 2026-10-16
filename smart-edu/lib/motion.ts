export const motionTokens = {
  duration: { micro: 0.16, selection: 0.24, expansion: 0.36, panel: 0.42, fast: 0.16, standard: 0.28, enter: 0.48, count: 0.48 },
  ease: { standard: [0.22, 1, 0.36, 1] as const, enter: [0.16, 1, 0.3, 1] as const },
  distance: { small: 6, medium: 16, large: 24 },
  stagger: { children: 0.065, delay: 0.04 },
} as const;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: motionTokens.distance.medium },
  visible: { opacity: 1, y: 0, transition: { duration: motionTokens.duration.enter, ease: motionTokens.ease.enter } },
};

export const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: motionTokens.stagger.children, delayChildren: motionTokens.stagger.delay } },
};

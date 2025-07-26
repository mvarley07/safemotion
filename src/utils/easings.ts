export const EASING_PRESETS = {
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  linear: 'linear',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.25, 0.46, 0.45, 1.4)'
} as const

export type EasingType = keyof typeof EASING_PRESETS
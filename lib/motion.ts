import type { Variants } from 'motion/react'

// Signature easing — a smooth "expo out" feel used across the site.
export const EASE = [0.16, 1, 0.3, 1] as const
export const EASE_INOUT = [0.65, 0, 0.35, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
}

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

export const lineReveal: Variants = {
  hidden: { y: '110%' },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 0.9, ease: EASE, delay: i * 0.09 },
  }),
}

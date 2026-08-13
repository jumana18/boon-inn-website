'use client'

import { motion, useScroll, useSpring } from 'motion/react'

/** Extremely thin brass progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[65] h-[2px] origin-left bg-brass"
      style={{ scaleX }}
    />
  )
}

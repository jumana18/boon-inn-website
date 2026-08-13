'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type ParallaxProps = {
  children: ReactNode
  className?: string
  /** how far (in px) the element drifts across the scroll range */
  amount?: number
}

/**
 * Moves its child slightly slower/faster than the page as it scrolls through
 * the viewport, creating a subtle depth effect.
 */
export function Parallax({ children, className, amount = 80 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount])

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div style={reduced ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}

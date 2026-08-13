'use client'

import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import { fadeUp, stagger } from '@/lib/motion'
import { cn } from '@/lib/utils'

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}

/** Single element that fades + rises into view. */
export function FadeIn({ children, className, delay = 0, once = true }: FadeInProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  )
}

/** Wrapper that staggers its FadeInItem children into view. */
export function FadeInGroup({ children, className, once = true }: FadeInProps) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  )
}

export function FadeInItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={cn(className)} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

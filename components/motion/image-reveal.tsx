'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'

type Direction = 'left' | 'right' | 'bottom'

const clipFrom: Record<Direction, string> = {
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
  bottom: 'inset(100% 0 0 0)',
}

type ImageRevealProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  direction?: Direction
  priority?: boolean
  sizes?: string
  delay?: number
}

/**
 * Cinematic image reveal: the container wipes open via clip-path while the
 * image scales down from 1.15 to 1.
 */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  direction = 'left',
  priority = false,
  delay = 0,
}: ImageRevealProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      initial={reduced ? undefined : { clipPath: clipFrom[direction] }}
      whileInView={reduced ? undefined : { clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      <motion.img
        src={src || '/placeholder.svg'}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        crossOrigin="anonymous"
        className={cn('h-full w-full object-cover', imgClassName)}
        style={{ willChange: 'transform' }}
        initial={reduced ? undefined : { scale: 1.15 }}
        whileInView={reduced ? undefined : { scale: 1 }}
        viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
        transition={{ duration: 1.4, ease: EASE, delay }}
      />
    </motion.div>
  )
}

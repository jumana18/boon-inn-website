'use client'

import { type ElementType, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { lineReveal } from '@/lib/motion'

type RevealTextProps = {
  /** Each string is one masked line. */
  lines: string[]
  as?: ElementType
  className?: string
  lineClassName?: string
  delay?: number
  once?: boolean
}

/**
 * Masked, line-by-line text reveal. Each line slides up from behind a clip.
 */
export function RevealText({
  lines,
  as = 'div',
  className,
  lineClassName,
  delay = 0,
  once = true,
}: RevealTextProps) {
  const reduced = useReducedMotion()
  const Wrapper = motion[as as 'div']

  if (reduced) {
    const Static = as as ElementType
    return (
      <Static className={className}>
        {lines.map((line, i) => (
          <span key={i} className={lineClassName} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </Static>
    )
  }

  return (
    <Wrapper
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={lineClassName}
          style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}
        >
          <motion.span
            style={{ display: 'block', willChange: 'transform' }}
            variants={lineReveal}
            custom={i + delay}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  )
}

type RevealWordsProps = {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
}

/** Word-by-word reveal used for the hero headline. */
export function RevealWords({ text, className, wordClassName, delay = 0 }: RevealWordsProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <motion.span
            className={wordClassName}
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.09 }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

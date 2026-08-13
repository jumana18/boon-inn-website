'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Logo } from '@/components/logo'
import { EASE } from '@/lib/motion'

/**
 * Cinematic intro overlay. Fades the Boon Inn wordmark in, holds briefly, then
 * lifts the panel away to reveal the site. Total runtime kept under ~2s.
 */
export function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (reduced) {
      setShow(false)
      onComplete()
      return
    }
    const hold = setTimeout(() => {
      setShow(false)
      // Start the hero choreography as the panel begins lifting.
      onComplete()
    }, 1200)
    return () => clearTimeout(hold)
  }, [reduced, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-pine-deep"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-center text-cream"
          >
            <Logo className="text-4xl md:text-5xl" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
              className="mx-auto mt-4 h-px w-24 origin-left bg-brass/60"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-4 font-sans text-xs uppercase tracking-[0.35em] text-cream/70"
            >
              A Boutique Retreat
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

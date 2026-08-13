'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'

type CursorState = {
  variant: 'default' | 'view' | 'arrow' | 'link'
  label: string
}

/**
 * Minimal premium cursor. A small dot by default that expands into a labelled
 * disc when hovering elements marked with `data-cursor="view|arrow|link"`.
 * Desktop (fine pointer) only.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<CursorState>({ variant: 'default', label: '' })
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      if (target) {
        const variant = (target.dataset.cursor as CursorState['variant']) || 'link'
        setState({
          variant,
          label: target.dataset.cursorLabel || (variant === 'view' ? 'View' : ''),
        })
      } else {
        setState({ variant: 'default', label: '' })
      }
    }

    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  const isActive = state.variant !== 'default'

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-brass text-pine-deep font-sans font-medium"
        style={{ translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isActive ? 68 : 10,
          height: isActive ? 68 : 10,
          backgroundColor: isActive
            ? 'oklch(0.68 0.09 75)'
            : 'oklch(0.68 0.09 75)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {isActive && state.label && (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-xs uppercase tracking-wider"
            >
              {state.variant === 'arrow' ? '\u2192' : state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
